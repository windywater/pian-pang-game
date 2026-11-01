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
  //   ['想', '木', '目', '心'], ['意', '音', '心'], ['拿', '合', '手'],
  //   ['联', '耳', '关'], ['聪', '耳', '总'], ['职', '耳', '只'], ['聊', '耳', '卯'],
  //   ['取', '耳', '又'], ['趣', '走', '取'], ['赶', '走', '干'], ['起', '走', '己'],
  //   ['赵', '走', '乂'], ['超', '走', '召'], ['招', '扌', '召'], ['打', '扌', '丁'],
  //   ['拉', '扌', '立'], ['指', '扌', '旨'], ['接', '扌', '妾'], ['掉', '扌', '卓'],
  //   ['技', '扌', '支'], ['护', '扌', '户'], ['拾', '扌', '合'], ['推', '扌', '隹'],
  //   ['排', '扌', '非'], ['扮', '扌', '分'], ['扛', '扌', '工'], ['捉', '扌', '足'],
  //   ['找', '扌', '戈'], ['把', '扌', '巴'], ['叶', '口', '十'], ['吐', '口', '土'],
  //   ['吓', '口', '下'], ['呀', '口', '牙'], ['呢', '口', '尼'], ['吧', '口', '巴'],
  //   ['吹', '口', '欠'], ['叹', '口', '又'], ['咱', '口', '自'], ['响', '口', '向'],
  //   ['听', '口', '斤'], ['咬', '口', '交'], ['味', '口', '未'], ['湖', '氵', '胡'],
  //   ['海', '氵', '每'], ['洗', '氵', '先'], ['活', '氵', '舌'], ['波', '氵', '皮'],
  //   ['洋', '氵', '羊'], ['泪', '氵', '目'], ['湿', '氵', '显'], ['淡', '氵', '炎'],
  //   ['洁', '氵', '吉'], ['滩', '氵', '难'], ['浪', '氵', '良'], ['漂', '氵', '票'],
  //   ['体', '亻', '本'], ['什', '亻', '十'], ['他', '亻', '也'], ['们', '亻', '门'],
  //   ['住', '亻', '主'], ['但', '亻', '旦'], ['伸', '亻', '申'], ['像', '亻', '象'],
  //   ['借', '亻', '昔'], ['优', '亻', '尤'], ['作', '亻', '乍'], ['做', '亻', '故'],
  //   ['话', '讠', '舌'], ['诗', '讠', '寺'], ['读', '讠', '卖'], ['课', '讠', '果'],
  //   ['谁', '讠', '隹'], ['许', '讠', '午'], ['讲', '讠', '井'], ['认', '讠', '人'],
  //   ['词', '讠', '司'], ['试', '讠', '式'], ['桥', '木', '乔'], ['板', '木', '反'],
  //   ['椅', '木', '奇'], ['桃', '木', '兆'], ['梅', '木', '每'], ['棵', '木', '果'],
  //   ['根', '木', '艮'], ['桶', '木', '甬'], ['杯', '木', '不'], ['树', '木', '又', '寸'],
  //   ['银', '钅', '艮'], ['铜', '钅', '同'], ['钢', '钅', '冈'], ['钓', '钅', '勺'],
  //   ['铃', '钅', '令'], ['错', '钅', '昔'], ['镜', '钅', '竟'], ['钻', '钅', '占'],
  //   ['烧', '火', '尧'], ['炉', '火', '户'], ['灿', '火', '山'], ['烂', '火', '兰'],
  //   ['烤', '火', '考'], ['炸', '火', '乍'], ['红', '纟', '工'], ['织', '纟', '只'],
  //   ['理', '王', '里'], ['特', '牛', '寺'], ['精', '米', '青'], ['蛙', '虫', '圭'],
  //   ['箱', '竹', '木', '目'], ['案', '宀', '女', '木'], ['程', '禾', '口', '王'],
  //   ['露', '雨', '足', '各'], ['霜', '雨', '木', '目'], ['娶', '耳', '又', '女'],
  //   ['熟', '享', '丸', '灬'], ['最', '日', '耳', '又'], ['帽', '巾', '日', '目'],
  //   ['腰', '月', '西', '女'], ['雁', '厂', '亻', '隹'], ['催', '亻', '山', '隹'],
  //   ['描', '扌', '艹', '田'], ['猫', '犭', '艹', '田'], ['数', '米', '女', '攵'],
  //   ['楼', '木', '米', '女'], ['保', '亻', '口', '木'], ['桌', '卜', '日', '木'],
  //   ['茶', '艹', '人', '木'], ['撑', '扌', '尚', '手'], ['摩', '广', '林', '手'],
  //   ['磨', '广', '林', '石'], ['搬', '扌', '舟', '殳'], ['篇', '竹', '户', '册'],
  //   ['编', '纟', '户', '册'], ['糊', '米', '古', '月'], ['蜜', '宀', '必', '虫'],
  //   ['螺', '虫', '田', '纟'], ['谢', '讠', '身', '寸']
  // ];

  /* 新题库：100 个字（30 个两偏旁字 + 70 个三偏旁字），与旧题库（含 zisOld）无重复。
     偏旁默认逆序摆放（如 ['联','关','耳']）以提高辨识难度；
     两偏旁字约 1/3、三偏旁字约 1/2 保持正序（下文以注释标出），使难度错落有致。 */
  var zis = [
    /* ---- 30 个两偏旁字，其中 10 个正序 ---- */
    ['值', '直', '亻'], ['份', '亻', '分'], ['仙', '山', '亻'], ['汁', '十', '氵'],       // 正序: 份
    ['沫', '氵', '末'], ['洒', '西', '氵'], ['浇', '氵', '尧'], ['泼', '发', '氵'],       // 正序: 沫 浇
    ['洞', '同', '氵'], ['消', '氵', '肖'], ['涂', '余', '氵'], ['材', '木', '才'],       // 正序: 消 材
    ['杆', '干', '木'], ['杠', '工', '木'], ['枪', '木', '仓'], ['株', '朱', '木'],       // 正序: 枪
    ['棒', '奉', '木'], ['棋', '木', '其'], ['欢', '欠', '又'], ['欣', '斤', '欠'],       // 正序: 棋 欣
    ['歪', '正', '不'], ['乱', '乚', '舌'], ['岔', '分', '山'], ['岚', '风', '山'],       // 正序: 岔
    ['崩', '朋', '山'], ['岁', '夕', '山'], ['峡', '夹', '山'], ['员', '口', '贝'],       // 正序: 员
    ['呆', '木', '口'], ['元', '儿', '二'],

    /* ---- 70 个三偏旁字，其中 35 个正序、35 个逆序 ---- */
    ['街', '彳', '圭', '亍'], ['温', '氵', '日', '皿'], ['萌', '艹', '日', '月'], ['蕉', '艹', '隹', '灬'], // 正: 街 温 萌 蕉
    ['渐', '斤', '车', '氵'], ['渣', '旦', '木', '氵'], ['懂', '重', '艹', '忄'], ['落', '各', '氵', '艹'], // 逆
    ['漏', '氵', '尸', '雨'], ['菊', '米', '勹', '艹'], ['萍', '艹', '氵', '平'], ['莫', '大', '日', '艹'], // 正: 漏 萍
    ['原', '厂', '白', '水'], ['厚', '子', '日', '厂'], ['厢', '厂', '木', '目'], ['府', '寸', '亻', '广'], // 正: 原 厢
    ['影', '日', '京', '彡'], ['琴', '今', '王', '王'], ['斑', '王', '文', '王'], ['望', '王', '月', '亡'], // 正: 影 斑
    ['壳', '士', '冖', '几'], ['痴', '口', '矢', '疒'], ['简', '竹', '门', '日'], ['符', '寸', '亻', '竹'], // 正: 壳 简
    ['链', '钅', '车', '辶'], ['锦', '巾', '白', '钅'], ['绵', '纟', '白', '巾'], ['货', '贝', '匕', '亻'], // 正: 链 绵
    ['骂', '口', '口', '马'], ['莺', '鸟', '冖', '艹'], ['蜘', '虫', '矢', '口'], ['瞄', '田', '艹', '目'], // 正: 骂 蜘
    ['瞧', '目', '隹', '灬'], ['端', '而', '山', '立'], ['操', '木', '品', '扌'], ['躁', '足', '品', '木'], // 正: 瞧 躁
    ['新', '斤', '木', '立'], ['歌', '可', '可', '欠'], ['喵', '田', '艹', '口'], ['啊', '口', '阝', '可'], // 正: 歌 啊
    ['嗅', '犬', '自', '口'], ['嘴', '口', '此', '角'], ['品', '口', '口', '口'], ['圆', '囗', '口', '贝'], // 正: 嘴 圆
    ['巫', '人', '人', '工'], ['享', '亠', '口', '子'], ['京', '小', '口', '亠'], ['密', '宀', '必', '山'], // 正: 享 密
    ['封', '寸', '土', '土'], ['婆', '氵', '皮', '女'], ['婚', '日', '氏', '女'], ['嫁', '女', '宀', '豕'], // 正: 婆 嫁
    ['娱', '天', '口', '女'], ['脚', '月', '去', '卩'], ['胸', '凶', '勹', '月'], ['掰', '手', '分', '手'], // 正: 脚 掰
    ['别', '刂', '力', '口'], ['刷', '尸', '巾', '刂'], ['卓', '十', '日', '卜'], ['崖', '山', '厂', '圭'], // 正: 刷 崖
    ['岸', '干', '厂', '山'], ['受', '爫', '冖', '又'], ['爱', '友', '冖', '爫'], ['您', '亻', '尔', '心'], // 正: 受 您
    ['焚', '火', '木', '木'], ['热', '扌', '丸', '灬'], ['船', '口', '几', '舟'], ['窟', '穴', '尸', '出'], // 正: 热 窟
    ['陶', '缶', '勹', '阝'], ['解', '角', '刀', '牛']                                                     // 正: 解
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
