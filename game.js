(function () {
  'use strict';

  /* 内置备用题库：当浏览器禁止直接读取本地 zis.json（file:// 打开）时使用。
     正常情况下以 zis.json 为准。 */
  var FALLBACK = [
    ['虹', '虫', '工'], ['进', '辶', '井'], ['时', '日', '寸'], ['村', '木', '寸'],
    ['妈', '女', '马'], ['好', '女', '子'], ['她', '女', '也'], ['妹', '女', '未'],
    ['姐', '女', '且'], ['姓', '女', '生'], ['明', '日', '月'], ['朋', '月', '月'],
    ['林', '木', '木'], ['森', '木', '木', '木'], ['河', '氵', '可'], ['清', '氵', '青'],
    ['晴', '日', '青'], ['请', '讠', '青'], ['情', '忄', '青'], ['睛', '目', '青'],
    ['眼', '目', '艮'], ['拍', '扌', '白'], ['怕', '忄', '白'], ['苗', '艹', '田'],
    ['花', '艹', '化'], ['草', '艹', '早'], ['苦', '艹', '古'], ['苹', '艹', '平'],
    ['药', '艹', '约'], ['说', '讠', '兑'], ['语', '讠', '吾'], ['休', '亻', '木'],
    ['你', '亻', '尔'], ['位', '亻', '立'], ['伴', '亻', '半'], ['伙', '亻', '火'],
    ['松', '木', '公'], ['校', '木', '交'], ['枝', '木', '支'], ['机', '木', '几'],
    ['李', '木', '子'], ['杏', '木', '口'], ['朵', '几', '木'], ['沙', '氵', '少'],
    ['江', '氵', '工'], ['汗', '氵', '干'], ['池', '氵', '也'], ['地', '土', '也'],
    ['城', '土', '成'], ['跑', '足', '包'], ['抱', '扌', '包'], ['泡', '氵', '包'],
    ['饱', '饣', '包'], ['饭', '饣', '反'], ['唱', '口', '昌'], ['吃', '口', '乞'],
    ['吗', '口', '马'], ['蚊', '虫', '文'], ['蚂', '虫', '马'], ['男', '田', '力'],
    ['界', '田', '介'], ['思', '田', '心'], ['忙', '忄', '亡'], ['忘', '亡', '心'],
    ['张', '弓', '长'], ['钟', '钅', '中'], ['针', '钅', '十'], ['铁', '钅', '失'],
    ['灯', '火', '丁'], ['炒', '火', '少'], ['烟', '火', '因'], ['秋', '禾', '火'],
    ['种', '禾', '中'], ['和', '禾', '口'], ['的', '白', '勺'], ['肚', '月', '土'],
    ['脸', '月', '佥'], ['码', '石', '马'], ['破', '石', '皮'], ['硬', '石', '更'],
    ['站', '立', '占'], ['章', '立', '早'], ['尖', '小', '大'], ['尘', '小', '土'],
    ['甜', '舌', '甘'], ['鲜', '鱼', '羊'], ['边', '辶', '力'], ['过', '辶', '寸'],
    ['远', '辶', '元'], ['送', '辶', '关'], ['道', '辶', '首'], ['迷', '辶', '米'],
    ['想', '木', '目', '心'], ['意', '音', '心'], ['拿', '合', '手']
  ];

  var els = {
    home: document.getElementById('screen-home'),
    game: document.getElementById('screen-game'),
    over: document.getElementById('screen-over'),
    start: document.getElementById('btn-start'),
    restart: document.getElementById('btn-restart'),
    cards: document.getElementById('cards'),
    answer: document.getElementById('answer'),
    count: document.getElementById('hud-count'),
    hint: document.getElementById('hud-hint'),
    overSub: document.getElementById('over-sub'),
    stage: document.getElementById('stage')
  };

  var phase = 'home';       // home | loading | playing | over
  var deck = [];            // 本轮题目（已打乱、不重复）
  var index = 0;
  var revealed = false;
  var poolCache = null;

  /* ---------- 题库读取 ---------- */

  function normalize(raw) {
    var arr = [];
    if (Array.isArray(raw)) {
      arr = raw;
    } else if (raw && Array.isArray(raw.zis)) {
      arr = raw.zis;
    }

    return arr.map(function (item) {
      if (Array.isArray(item)) {
        return { zi: String(item[0] || '').trim(), parts: item.slice(1).map(String) };
      }
      var parts = item && Array.isArray(item.pianpangs) ? item.pianpangs : [];
      return {
        zi: String((item && item.zi) || '').trim(),
        parts: parts.map(function (p) { return String(p).trim(); })
      };
    }).map(function (item) {
      item.parts = item.parts.filter(function (p) { return p.length > 0; });
      return item;
    }).filter(function (item) {
      return item.zi.length > 0 && item.parts.length > 0;
    });
  }

  function loadPool() {
    if (poolCache) return Promise.resolve(poolCache);

    return fetch('zis.json', { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        var list = normalize(data);
        if (!list.length) throw new Error('题库为空');
        return list;
      })
      .catch(function (err) {
        console.warn('未能读取 zis.json，改用内置题库：', err);
        return normalize(FALLBACK);
      })
      .then(function (list) {
        poolCache = list;
        return list;
      });
  }

  /* ---------- 工具 ---------- */

  function shuffle(list) {
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = list[i];
      list[i] = list[j];
      list[j] = tmp;
    }
    return list;
  }

  function showScreen(name) {
    els.home.hidden = name !== 'home';
    els.game.hidden = name !== 'game';
    els.over.hidden = name !== 'over';
  }

  function setHint(text) {
    els.hint.textContent = text;
  }

  /* ---------- 流程 ---------- */

  function beginGame() {
    if (phase === 'loading' || phase === 'playing') return;

    phase = 'loading';
    els.start.disabled = true;
    els.restart.disabled = true;
    els.start.textContent = '加载中…';

    loadPool().then(function (list) {
      els.start.textContent = '开始游戏';
      els.start.disabled = false;
      els.restart.disabled = false;

      deck = shuffle(list.slice());
      index = 0;
      phase = 'playing';
      showScreen('game');
      renderQuestion();
      if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
      }
    });
  }

  function renderQuestion() {
    var item = deck[index];
    revealed = false;

    els.cards.textContent = '';
    item.parts.forEach(function (part, i) {
      var card = document.createElement('div');
      card.className = 'card';
      card.textContent = part;
      card.style.animationDelay = (i * 90) + 'ms';
      els.cards.appendChild(card);
    });

    els.answer.textContent = '';
    els.answer.classList.remove('is-visible');

    els.count.textContent = (index + 1) + ' / ' + deck.length;
    setHint('按空格键 显示汉字');
  }

  function revealAnswer() {
    revealed = true;
    els.answer.textContent = deck[index].zi;
    // 触发重排，保证过渡动画生效
    void els.answer.offsetWidth;
    els.answer.classList.add('is-visible');
    setHint('再按空格键 下一题');
  }

  function nextQuestion() {
    index += 1;
    if (index >= deck.length) {
      endGame();
      return;
    }
    renderQuestion();
  }

  function endGame() {
    phase = 'over';
    els.cards.textContent = '';
    els.answer.textContent = '';
    els.overSub.textContent = '本轮共 ' + deck.length + ' 题';
    showScreen('over');
  }

  function handleAdvance() {
    if (phase !== 'playing') return;
    if (!revealed) {
      revealAnswer();
    } else {
      nextQuestion();
    }
  }

  /* ---------- 事件 ---------- */

  bindEvents();

  function bindEvents() {
    els.start.addEventListener('click', beginGame);
    els.restart.addEventListener('click', beginGame);
    els.stage.addEventListener('click', handleAdvance);

    document.addEventListener('keydown', function (e) {
      if (e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar') {
        if (phase === 'playing') {
          e.preventDefault();
          if (e.repeat) return;
          handleAdvance();
        }
      }
    });

    // 键盘空格会触发获得焦点的按钮，避免重复开始
    document.addEventListener('keyup', function (e) {
      if (e.code === 'Space' || e.key === ' ') {
        if (phase === 'playing') e.preventDefault();
      }
    });
  }
})();
