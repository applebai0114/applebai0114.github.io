function getUserChoices() {
  return {
    case: localStorage.getItem("userChoice_case"), // e.g. "sweet"
    cover: localStorage.getItem("userChoice_cover"), // e.g. "hiphop"
    keychain: localStorage.getItem("userChoice_keychain"), // e.g. "sweet"
    sticker: localStorage.getItem("userChoice_sticker"), // e.g. "dark"
  };
}

// 2. 不同部位 + 不同風格 對應的圖片路徑
const IMAGE_MAP = {
  case: {
    sweet: "./img/result_case_cute.png",
    hiphop: "./img/result_case_hiphop.png",
    y3k: "./img/result_case_y3k.png",
    dark: "./img/result_case_dark.png",
  },
  cover: {
    sweet: "./img/result_cover_cute.png",
    hiphop: "./img/result_cover_hiphop.png",
    y3k: "./img/result_cover_y3k.png",
    dark: "./img/result_cover_dark.png",
  },
  keychain: {
    sweet: "./img/result_keychain_cute.png",
    hiphop: "./img/result_keychain_hiphop.png",
    y3k: "./img/result_keychain_y3k.png",
    dark: "./img/result_keychain_dark.png",
  },
  sticker: {
    sweet: "./img/result_stickers_cute.png",
    hiphop: "./img/result_stickers_hiphop.png",
    y3k: "./img/result_stickers_y3k.png",
    dark: "./img/result_stickers_dark.png",
  },
};

// 3. 把使用者選擇套到 6-0 結果頁的四張圖上
function applyChoicesToResultPageImages() {
  const resultPage = document.getElementById("page-result");
  if (!resultPage) return; // 不在結果頁就直接結束

  const choices = getUserChoices();

  // 各部位對應到 HTML 裡的 img id
  const imgElements = {
    case: document.getElementById("result-case-img"),
    cover: document.getElementById("result-cover-img"),
    keychain: document.getElementById("result-keychain-img"),
    sticker: document.getElementById("result-sticker-img"),
  };

  // 依序套用圖片
  Object.keys(imgElements).forEach((part) => {
    const style = choices[part]; // sweet / hiphop / y3k / dark
    const imgEl = imgElements[part];

    if (!imgEl) return; // 這個 img 沒在頁面上，就跳過

    // 如果有選到這個部位的風格，而且在 IMAGE_MAP 裡有對應圖片，就換圖
    if (style && IMAGE_MAP[part] && IMAGE_MAP[part][style]) {
      imgEl.src = IMAGE_MAP[part][style];
    } else {
      // 如果沒有選到或沒對應圖，就可以保留原本 placeholder
      console.warn(`找不到 ${part} 的圖片風格：`, style);
    }
  });

  console.log("使用者的選擇：", choices);
}

// 4. 等 DOM 載入完成後自動執行
document.addEventListener("DOMContentLoaded", function () {
  applyChoicesToResultPageImages();
});

// 這裡底下都是算歌曲的

// 計數
function getStyleCounts(choices) {
  const counts = {
    sweet: 0,
    hiphop: 0,
    y3k: 0,
    dark: 0,
  };

  Object.values(choices).forEach((style) => {
    if (style && counts[style] !== undefined) {
      counts[style] += 1;
    }
  });

  // 例如：{ sweet: 1, hiphop: 0, y3k: 0, dark: 3 }
  return counts;
}
// 計數

// 固定順序：sweet - hiphop - y3k - dark
function buildComboKey(counts) {
  const s = counts.sweet || 0;
  const h = counts.hiphop || 0;
  const y = counts.y3k || 0;
  const d = counts.dark || 0;

  return `${s}-${h}-${y}-${d}`;
}

// result_pool
// 每一種「風格數量組合」對應的一組候選歌曲（最多 4 個）
const RESULT_POOL = {
  "4-0-0-0": [
    {
      title: "〈Midnight Fiction〉ILLIT",
      desc: "夢境與現實的邊界逐漸變得模糊，這首充滿夢核（Dreamcore）美學的歌像是一場粉色的夜間漫遊。輕盈的節奏帶著童話般的失真感，彷彿世界只剩下你與你的幻想。你咬下一口沾滿糖霜的雲朵，探索並沈溺在旋律裡甜美的秘密，像是在做一場甜美又漫長的夢。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6QqrxJe1iQxwLY6he6FLFo?utm_source=generator",
    },
    {
      title: "〈Lover〉Taylor Swift",
      desc: "復古的華爾滋節拍與帶有殘響的鼓點，營造出 Indie Folk 特有的朦朧與親密感。這首歌將愛情的永恆濃縮在一個溫暖的客廳裡，拒絕了速食愛情的喧囂。你是個浪漫、重視儀式感的人。你嚮往的不只是那些轟轟烈烈的瞬間，更多的是堅定不移的陪伴。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/1dGr1c8CrMLDpV6mPbImSI?utm_source=generator",
    },
    {
      title: "〈Bubble Gum〉New Jeans",
      desc: "輕盈與清爽的節奏，吹起了一陣微風。這首歌像是在夏日午後吹出的肥皂泡，折射著七彩的光芒卻輕盈無負擔。你可能是一個追求「自然感」的人，討厭複雜與刻意。在人際關係中，你喜歡那種相處起來毫不費力、乾淨且純粹的氛圍。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/19D8LNpWwIPpi6hs9BG7dq?utm_source=generator",
    },
    {
      title: "〈可愛くなりたい〉成海聖奈(雨宮天)",
      desc: "急促的鋼琴與管弦樂編制，是 Kawaii Pop 最經典的少女心事。旋律裡充滿了為了喜歡的人而努力變可愛的焦急與決心。你內心深處或許藏著一份不服輸的倔強，願意為了目標付出百分之百的努力。雖然偶爾會因為不自信而焦慮，但你那份想讓自己變得更好的心意，本身就是最閃閃發光的存在。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0vyCacgRipkx3OTq392TEy?utm_source=generator",
    },
  ],
  "0-4-0-0": [
    {
      title: "〈The Spins〉Mac Miller",
      desc: "採樣自經典迷幻名曲，這首 Party Rap 捕捉了青春最狂妄、最無憂無慮的瞬間。在那種「管他的，我只想活在當下」的歌詞背後，是一種對快樂近乎執著的追求。你或許是個享樂主義者，或者渴望從現實的壓力中短暫逃離。你深知青春有限，所以選擇用最盡興的方式，揮霍每一個當下。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/2QGVKiAGTa1YcDqPMhAzF7?utm_source=generator",
    },
    {
      title: "〈VSOP〉Masiwei",
      desc: "流暢的 Flow 搭配大氣的 beat，展現了 Luxury Trap 那種自信且優雅的成功者姿態。這不是逞兇鬥狠，而是游刃有餘的實力展示。你可能是一個對生活品質有要求、且極具野心的人。你清楚自己的價值，不屑於與人爭辯，因為你知道，實力與成果才是讓質疑者閉嘴最好的方式。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/2ZZfMXI72NgTFzqIHlujeu?utm_source=generator",
    },
    {
      title: "〈Go〉CORTIS",
      desc: "帶有粗糙質感的 Lo-fi 音色與少年感的饒舌，營造出一種 Alternative K-Pop 的獨特氛圍。這首歌像是一場沒有目的地的公路旅行，充滿了未完成的粗糙美感與自由。你可能討厭被框架束縛，喜歡探索未知的領域。比起完美的結果，你更享受那個「正在路上」、充滿可能性的過程。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6OWWZtNQORY1McaZmOrwhc?utm_source=generator",
    },
    {
      title: "〈MHOW 2 GET AWAY WITH MURDER〉South Arcade",
      desc: "爆裂的鼓點是Pop Punk最直率的標誌，躁動的旋律是腎上腺素的具象化。這首歌帶著千禧年的叛逆與無所畏懼的混亂，像是一場精心策劃的逃脫。你的骨子裡藏著不安分的靈魂，討厭被定義，更討厭無趣的規則。在喧囂中，你享受著那份能掌控混亂的快感。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/2VoU7RnUBTp3mxFJBhUIPX?utm_source=generator",
    },
  ],
  "0-0-4-0": [
    {
      title: "〈Yukon〉Justin Bieber",
      desc: "這首歌像一段深夜自駕的影像，冷色調的節奏在窗外劃出一道道光痕，把情緒收進極簡的線條裡。低頻若有似無地推著，讓人落入一種安靜卻帶點距離的流動感。聽著聽著，彷彿能察覺你對世界保持的微妙留白——不急著說破、不需要喧鬧，只讓最真實的部分在暗處自然地浮現。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/29iva9idM6rFCPUlu7Rhxl?utm_source=generator",
    },
    {
      title: "〈Whiplash〉aespa",
      desc: "冷酷的金屬感節拍與極簡的 Techno 編曲，打造出一條專屬於你的時尚伸展台。這首歌充滿了不可一世的自信，如果你享受那種自帶氣場、行事俐落且不在乎他人眼光的帥氣感，這首充滿速度與衝擊力的舞曲，將是你展現絕對主導權的戰歌。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6uPnrBgweGOcwjFL4ItAvV?utm_source=generator",
    },
    {
      title: "〈WICKED〉ALLDAY PROJECT",
      desc: "融合了 Brazilian Funk 的野性與 Trap 的重擊。歌詞充滿了「打破規則」的狂妄與自由，像是對平庸生活的宣戰。如果你喜歡那種能讓腎上腺素飆升、在混亂中釋放壓力的音樂，這首充滿攻擊性的舞曲會是你的最佳燃料。",
      spotifyUrl: "",
    },
    {
      title: "〈Fashion〉CORTIS",
      desc: "這首歌像午夜城市冷光下的一條霓虹線，節拍俐落、節奏直接，聲音像金屬般清硬卻不失磨砂質感。旋律與節奏交錯，像是在城市街頭穿梭——是潮流，也是宣告。它不需要誇張的情緒，也不想被定義。只是用最簡練的聲音語言，讓你感受到一種屬於自己的節奏，一種不被規則框住的姿態。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/4ecdsGz3Hg6TKPwQ0ZOdJz?utm_source=generator",
    },
  ],
  "0-0-0-4": [
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "強勁的低音重擊心臟，這是標準的 Techno 語言，電子訊號如同電流般竄流全身，這不是為了討好誰而存在的旋律。在霓虹閃爍的節奏裡，一切都不再需要言語，只需要那個能讓你徹底釋放、跟著本能舞動的瞬間。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/2h4zp76tI5Sbl3BNspNBuG?utm_source=generator",
    },
    {
      title: "〈305〉Jordan Adetunji, Bryson Tiller",
      desc: "絲滑的 Trapsoul 聲線，完美融合了陷阱音樂的節奏與靈魂樂的感性，像是夏夜微熱的晚風。節奏慵懶卻精準地擊中感官，營造出一種毫不費力的性感氛圍。比起激烈的衝撞，更多的是流動的曖昧與質感。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/494f07w2ArJNlkwnWWZViK?utm_source=generator",
    },
    {
      title: "〈southbound〉Artemas",
      desc: "粗糙的顆粒感與迷幻的旋律交織，散發著 Dark Pop 特有的危險吸引力。這首歌是在午夜時分對慾望的赤裸告白，帶著一點毀滅性的浪漫。歌詞描述著那些既危險又令人沉醉的吸引力，讓人甘願放下主導權，甚至讓對方「摧毀」和「控制」自己。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/4jiwz2tQZo21Z4NQwz4zUt?utm_source=generator",
    },
    {
      title: "〈The Hills〉The Weeknd",
      desc: "沉重的低頻像是心跳的共鳴，Alternative R&B 那種特有的陰鬱與迷幻，在這首歌裡散發著令人窒息的性感。破碎的嘶吼中，隱藏著對禁忌的渴望。這是一種毀滅式的美學，屬於那些深知「愛與痛」總是相伴而生的人。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/7fBv7CLKzipRk6EC6TWHOB?utm_source=generator",
    },
  ],
};

//抽其中一個結果的函式
function pickResultByCombo(counts) {
  const comboKey = buildComboKey(counts);
  const pool = RESULT_POOL[comboKey];

  if (!pool || pool.length === 0) {
    console.warn("這個組合目前沒有設定結果：", comboKey);
    return null;
  }

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex]; // { title, desc, spotifyId }
}
//抽其中一個結果的函式

//隨機結果
function applyComboResultToResultPage() {
  const resultPage = document.getElementById("page-result");
  if (!resultPage) return; // 不在 6-0 結果頁就直接結束

  const choices = getUserChoices();
  const counts = getStyleCounts(choices);
  const result = pickResultByCombo(counts);

  if (!result) return;

  // 1. 改歌名
  const titleEl = document.getElementById("result-song-title");
  if (titleEl) {
    titleEl.textContent = result.title;
  }

  // 2. 改介紹文字
  const descEl = document.getElementById("result-song-desc");
  if (descEl) {
    descEl.textContent = result.desc; // 如果之後要 <br> 再來進階處理
  }

  const iframeEl = document.getElementById("result-song-iframe");
  if (iframeEl && result.spotifyUrl) {
    iframeEl.src = result.spotifyUrl;
  }

  // （可選）存起來給 7-0 紀念頁用
  localStorage.setItem("result_comboKey", buildComboKey(counts));
  localStorage.setItem("result_songTitle", result.title);
  localStorage.setItem("result_songDesc", result.desc);
  localStorage.setItem("result_spotifyId", result.spotifyId);
}
//隨機結果

document.addEventListener("DOMContentLoaded", function () {
  applyChoicesToResultPageImages(); // 四格圖片
  applyComboResultToResultPage(); // 歌名 + 介紹 + iframe
});
