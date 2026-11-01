(function () {
  'use strict';

  /* 题库直接内置在本文件里，不再读取外部 zis.json（file:// 与 http:// 打开效果一致）。 */
  // 旧题库（正序偏旁），已弃用
  // var zisOld = [
  //   ['虹', '虫', '工'], ['进', '辶', '井'], ['时', '日', '寸'], ['村', '木', '寸'],
  //   ['妈', '女', '马'], ['好', '女', '子'], ['她', '女', '也'], ['妹', '女', '未'],
  //   ['姐', '女', '且'], ['姓', '女', '生'], ['明', '日', '月'], ['朋', '月', '月'],
  //   ['林', '木', '木'], ['森', '木', '木', '木'], ['河', '氵', '可'], ['清', '氵', '青'],
  //   ['晴', '日', '青'], ['请', '讠', '青'], ['情', '忄', '青'], ['睛', '目', '青'],
  //   ['眼', '目', '艮'], ['拍', '扌', '白'], ['怕', '忄', '白'], ['苗', '艹', '田'],
  //   ['花', '艹', '化'], ['草', '艹', '早'], ['苦', '艹', '古'], ['苹', '艹', '平'],
  //   ['药', '艹', '约'], ['说', '讠', '兑'], ['语', '讠', '吾'], ['休', '亻', '木'],
  //   ['你', '亻', '尔'], ['位', '亻', '立'], ['伴', '亻', '半'], ['伙', '亻', '火'],
  //   ['松', '木', '公'], ['校', '木', '交'], ['枝', '木', '支'], ['机', '木', '几'],
  //   ['李', '木', '子'], ['杏', '木', '口'], ['朵', '几', '木'], ['沙', '氵', '少'],
  //   ['江', '氵', '工'], ['汗', '氵', '干'], ['池', '氵', '也'], ['地', '土', '也'],
  //   ['城', '土', '成'], ['跑', '足', '包'], ['抱', '扌', '包'], ['泡', '氵', '包'],
  //   ['饱', '饣', '包'], ['饭', '饣', '反'], ['唱', '口', '昌'], ['吃', '口', '乞'],
  //   ['吗', '口', '马'], ['蚊', '虫', '文'], ['蚂', '虫', '马'], ['男', '田', '力'],
  //   ['界', '田', '介'], ['思', '田', '心'], ['忙', '忄', '亡'], ['忘', '亡', '心'],
  //   ['张', '弓', '长'], ['钟', '钅', '中'], ['针', '钅', '十'], ['铁', '钅', '失'],
  //   ['灯', '火', '丁'], ['炒', '火', '少'], ['烟', '火', '因'], ['秋', '禾', '火'],
  //   ['种', '禾', '中'], ['和', '禾', '口'], ['的', '白', '勺'], ['肚', '月', '土'],
  //   ['脸', '月', '佥'], ['码', '石', '马'], ['破', '石', '皮'], ['硬', '石', '更'],
  //   ['站', '立', '占'], ['章', '立', '早'], ['尖', '小', '大'], ['尘', '小', '土'],
  //   ['甜', '舌', '甘'], ['鲜', '鱼', '羊'], ['边', '辶', '力'], ['过', '辶', '寸'],
  //   ['远', '辶', '元'], ['送', '辶', '关'], ['道', '辶', '首'], ['迷', '辶', '米'],
  //   ['想', '木', '目', '心'], ['意', '音', '心'], ['拿', '合', '手']
  // ];

  /* 新题库：107 个字（81 个两部件字 + 26 个三部件字）。偏旁默认逆序摆放（如 ['联','关','耳']）
     以提高辨识难度，其中约 1/3 的条目（下文以注释标出）保持正序，使难度错落有致。 */
  var zis = [
    ['联', '关', '耳'], ['聪', '耳', '总'], ['职', '只', '耳'], ['聊', '卯', '耳'],       // 正序: 聪
    ['取', '耳', '又'], ['趣', '取', '走'], ['赶', '干', '走'], ['起', '己', '走'],       // 正序: 取
    ['赵', '走', '乂'], ['超', '召', '走'],                                        // 正序: 赵
    ['拉', '扌', '立'], ['接', '妾', '扌'], ['护', '户', '扌'], ['推', '隹', '扌'],       // 正序: 拉
    ['排', '扌', '非'], ['找', '戈', '扌'], ['叶', '十', '口'], ['吐', '口', '土'],       // 正序: 排 吐
    ['吓', '下', '口'], ['呀', '牙', '口'], ['呢', '口', '尼'], ['吧', '巴', '口'],       // 正序: 呢
    ['吹', '口', '欠'], ['叹', '又', '口'], ['咱', '自', '口'], ['响', '向', '口'],       // 正序: 吹
    ['听', '口', '斤'], ['咬', '交', '口'], ['味', '未', '口'], ['湖', '胡', '氵'],       // 正序: 听
    ['海', '氵', '每'], ['活', '舌', '氵'], ['波', '皮', '氵'], ['洋', '氵', '羊'],       // 正序: 海 洋
    ['淡', '氵', '炎'], ['滩', '氵', '难'],                                              // 正序: 淡 滩
    ['体', '本', '亻'], ['什', '亻', '十'], ['他', '也', '亻'], ['们', '门', '亻'],       // 正序: 什
    ['住', '亻', '主'], ['但', '旦', '亻'], ['伸', '亻', '申'], ['像', '象', '亻'],       // 正序: 住 伸
    ['借', '昔', '亻'], ['优', '亻', '尤'], ['作', '乍', '亻'], ['做', '故', '亻'],       // 正序: 优
    ['话', '讠', '舌'], ['诗', '寺', '讠'], ['读', '卖', '讠'], ['课', '讠', '果'],       // 正序: 话 课
    ['许', '讠', '午'], ['讲', '井', '讠'], ['试', '式', '讠'], ['桥', '乔', '木'],       // 正序: 许
    ['板', '木', '反'], ['椅', '奇', '木'], ['桃', '兆', '木'], ['梅', '木', '每'],       // 正序: 板 梅
    ['棵', '果', '木'], ['根', '艮', '木'], ['桶', '木', '甬'], ['杯', '不', '木'],       // 正序: 桶
    ['树', '木', '又', '寸'], ['银', '艮', '钅'], ['铜', '同', '钅'], ['钢', '钅', '冈'], // 正序: 树 钢
    ['钓', '勺', '钅'], ['铃', '令', '钅'], ['错', '钅', '昔'], ['镜', '竟', '钅'],       // 正序: 错
    ['钻', '占', '钅'], ['烧', '火', '尧'], ['炉', '户', '火'], ['灿', '火', '山'],       // 正序: 烧 灿
    ['烂', '兰', '火'], ['烤', '火', '考'], ['炸', '乍', '火'], ['红', '工', '纟'],       // 正序: 烤
    ['织', '纟', '只'],       
    ['理', '王', '里'], ['特','牛','寺'], ['精','米','青'], ['蛙','虫','圭'],
    ['超','走','召']

    /* 以下 26 个为三偏旁字（每字 3 个偏旁），其中 12 个逆序、14 个正序 */
    ['箱', '竹', '木', '目'], ['案', '木', '女', '宀'], ['程', '禾', '口', '王'],                        // 逆: 案
    ['露', '各', '足', '雨'], ['霜', '雨', '木', '目'], ['娶', '女', '又', '耳'], ['熟', '享', '丸', '灬'], // 逆: 露 娶
    ['最', '又', '耳', '日'], ['帽', '巾', '日', '目'], ['腰', '月', '西', '女'],                        // 逆: 最
    ['雁', '隹', '亻', '厂'], ['催', '亻', '山', '隹'], ['猫', '犭', '艹', '田'],                        // 逆: 雁
    ['数', '攵', '女', '米'], ['楼', '木', '米', '女'], ['保', '木', '口', '亻'], ['桌', '卜', '日', '木'], // 逆: 数 保
    ['茶', '木', '人', '艹'], ['摩', '手', '林', '广'], ['磨', '广', '林', '石'],                        // 逆: 茶 摩
    ['糊', '月', '古', '米'], ['蜜', '宀', '必', '虫'], // 逆: 篇 糊
    ['鞋', '革', '土', '土']                                                    
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
    if (!poolCache) {
      poolCache = normalize(zis);
    }
    return Promise.resolve(poolCache);
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

  /* ---------- 音效 ---------- */

  var audioCtx = null;

  function getAudioCtx() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!audioCtx) audioCtx = new AC();
    if (audioCtx.state === 'suspended' && audioCtx.resume) audioCtx.resume();
    return audioCtx;
  }

  /* 敲铃：用一组非谐波比例的泛音叠出金属铃身，起音极快、衰减自然 */
  function ringBell(ctx, startAt, volume, base) {
    var partials = [
      { ratio: 1.00, detune: 0, gain: 1.00, decay: 0.70 },
      { ratio: 1.00, detune: 9, gain: 0.55, decay: 0.62 },  // 微失谐，产生“晃动”的铃颤
      { ratio: 2.00, detune: 0, gain: 0.50, decay: 0.42 },
      { ratio: 2.76, detune: 0, gain: 0.32, decay: 0.30 },
      { ratio: 4.07, detune: 0, gain: 0.18, decay: 0.20 },
      { ratio: 5.43, detune: 0, gain: 0.10, decay: 0.13 },
      { ratio: 6.80, detune: 0, gain: 0.05, decay: 0.09 }
    ];

    partials.forEach(function (p) {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(base * p.ratio, startAt);
      if (p.detune) osc.detune.setValueAtTime(p.detune, startAt);

      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(volume * p.gain, startAt + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + p.decay);

      osc.connect(gain).connect(ctx.destination);
      osc.start(startAt);
      osc.stop(startAt + p.decay + 0.02);
    });

    // 铃舌撞击的极短高频“咔”，让声音更清脆
    var click = ctx.createOscillator();
    var clickGain = ctx.createGain();
    click.type = 'square';
    click.frequency.setValueAtTime(base * 9.2, startAt);
    clickGain.gain.setValueAtTime(0.0001, startAt);
    clickGain.gain.exponentialRampToValueAtTime(volume * 0.06, startAt + 0.002);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.035);
    click.connect(clickGain).connect(ctx.destination);
    click.start(startAt);
    click.stop(startAt + 0.05);
  }

  /* 揭晓汉字时敲一串清脆铃声“叮—铃”，用 Web Audio 实时合成，无需音频文件 */
  function playDing() {
    try {
      var ctx = getAudioCtx();
      if (!ctx) return;
      var start = ctx.currentTime + 0.005;
      ringBell(ctx, start, 0.14, 1245);          // 第一声：叮
      ringBell(ctx, start + 0.175, 0.10, 1245);  // 第二声：铃（稍轻）
    } catch (e) {
      /* 音效失败不影响游戏 */
    }
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
    playDing();
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
