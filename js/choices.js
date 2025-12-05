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
  "3-1-0-0": [
    {
      title: "〈Blue〉Yung Kai",
      desc: "這首歌像被月光泡過的湖面，波紋靜靜擴散，情緒在其中慢慢溶解。旋律柔軟又帶一點憂思，彷彿替那些說不出口的心事找了一個落點。每一段聲線都像輕輕擦過耳邊，留下一種安靜的溫度。聽著聽著，會讓人想起那些被好好珍藏的瞬間——不張揚、不炫目，卻在不經意間讓心變得更柔軟。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/3be9ACTxtcL6Zm4vJRUiPG?utm_source=generator",
    },
    {
      title: "〈普通朋友〉陶喆",
      desc: "乾淨清脆的木吉他前奏響起，是華語 R&B 最經典的無奈開場。旋律聽似輕鬆愜意，歌詞卻道盡了困在「朋友」界線後的酸楚。那種明明渴望靠近卻必須小心翼翼維持距離的壓抑，被包裹在絲滑的轉音裡。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/7CTitzr4eVIDCPUJi5Dr4B?utm_source=generator",
    },
    {
      title: "〈愛你但說不出口〉karencici",
      desc: "淡藍色的憂鬱與 R&B 的慵懶交織，像是深夜裡獨自對著手機螢幕的嘆息。歌詞捕捉了暗戀中最折磨人的情境，明明內心波濤洶湧，表面卻只能維持朋友的距離。如果你懂那種怕說破就失去一切的膽怯，這首小心翼翼的歌會是你最安全的樹洞，替你說出那些卡在喉嚨裡的秘密。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/5CCV2xxYnI7b1wFkP1gElh?utm_source=generator",
    },
    {
      title: "〈Midas Touchs〉KISS OF LIFE",
      desc: "自信、閃耀、無所畏懼，這首歌完美復刻了 2000年代 Y2K Pop 的那種華麗與張揚。舉手投足間都是 Diva 般的氣場，彷彿世界是你的舞台。你擁有著極高的自尊與魅力，這種由內而外散發的自信，讓你在人群中總是那個最耀眼、最無法被忽視的存在。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0vaxYDAuAO1nPolC6bQp7V?utm_source=generator",
    },
  ],
  "3-0-1-0": [
    {
      title: "〈Pocket locket〉Alaina castillo",
      desc: "甜美中帶著一絲病嬌的佔有慾，Dark R&B 的低沈貝斯將這種「想把你裝進口袋」的執著包裝得極具誘惑力。如果你喜歡那種「只屬於我一個人」的親密與危險感，這首歌那種令人窒息卻又無法抗拒的包裹感，會讓你徹底淪陷。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/7t9d2YdmD87JC72pocMtlz?utm_source=generator",
    },
    {
      title: "〈Hype Boy〉New jeans",
      desc: "清新的 Moombahton 節奏與 Y2K 美學的完美復興。這首歌沒有複雜的算計，只有選擇愛情時的直率與自信。如果你嚮往那種夏日午後般的清爽戀愛，這種不拖泥帶水、充滿少女心事卻又無比堅定的氛圍，會讓你心情瞬間明亮。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0a4MMyCrzT0En247IhqZbD?utm_source=generator",
    },
    {
      title: "〈jellyous〉ILLIT",
      desc: "像是一顆在口中爆開的跳跳糖，Bubblegum Pop 的輕快節奏將酸酸甜甜的嫉妒心包裹在粉色旋律裡。這種調皮的電子音效，捕捉了戀愛中患得患失的小劇場。你心裡藏著一份可愛的佔有慾，對於在意的人事物，這種直率的撒嬌與任性，其實是你表達在乎最真實的方式。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0wFU2pYHZi45Ws1VD6aSJX?utm_source=generator",
    },
    {
      title: "〈花園裡的流星雨〉karencici",
      desc: "迷幻的合成器與慵懶的聲線，營造出如夢似幻的浪漫空間。這首歌不講求邏輯，只在乎氛圍的流動。如果你喜歡那種微醺、曖昧，像是在粉色雲端漂浮的感覺，這首歌能帶你逃離現實，進入一個只有浪漫存在的異次元。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/5YdnjlDRpEp18LINJK222u?utm_source=generator",
    },
  ],
  "3-0-0-1": [
    {
      title: "〈モニタリング〉初音ミク",
      desc: "這首歌旋律輕快、可愛，但詞與畫面透露著不安。歌詞裡充斥著病態感。畫面上有很明顯的對比性，絢爛的世界就好似臆想的世界，與之對比的是灰暗的現實世界。歌曲畫面經常出現的疑似飛蚊症的小蟲子，加深了監視的主題，透過主角的姿態變換，營造出似真似假的朦朧感。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/1iywVk6Xx1XmJwd0rExYI3?utm_source=generator",
    },
    {
      title: "〈Drivers license〉Olivia Rodrigo",
      desc: "你的選擇流露出一種柔軟而細緻的氣息，像深夜裡緩緩亮起的街燈，光很淡，卻讓情緒有了依靠。那份優雅是安靜的，在細節處慢慢展開，不急著說破。深處藏著一點灰藍色的悲傷，像被風帶走前最後的餘溫，并不鋒利，只是悄悄停在心口。整體像一段被時間拉長的呼吸，溫和、透明，讓情感在其中輕輕沉落。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/5wANPM4fQCJwkGd4rN57mH?utm_source=generator",
    },
    {
      title: "〈太聰明〉陳綺貞",
      desc: "乾淨的吉他刷扣伴著細膩獨白，像午後陽光下的一場自我辯證。你在愛裡小心翼翼計算距離，深怕看穿謎底卻失去樂趣。你應該是個心思細膩、習慣過度思考的人。在感情中，你試圖保持理智，用「聰明」武裝脆弱，但內心其實渴望著一份無需猜測的篤定。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/4DCB1S7G6SmH9qlDpEVIzP?utm_source=generator",
    },
    {
      title: "〈玩具〉たかやん",
      desc: "輕快的旋律包裝著甘願淪為替代品的絕望。歌詞赤裸地剖析了在病態關係中，明明知道被利用卻無法抽離的卑微。這是一種「討好型人格」的悲歌。如果你曾在愛裡失去自尊，這種笑著流淚、既可愛又殘酷的違和感，會像針一樣刺痛你心中最渴望被愛的那塊傷疤。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0UvVYfQJFnELmeBfnuF3f6?utm_source=generator",
    },
  ],
  "1-3-0-0": [
    {
      title: "〈曖人〉POPO J",
      desc: "這是一首充滿甜蜜與浪漫的歌曲。Intro吉他帶出整首歌輕快的風格和節奏，搭配他具穿透力的嗓音，營造出戀愛中的俏皮感。歌詞描述對愛人的傾心與專一，彈跳的押韻和word play是這首歌最大的特色，讓歌曲中時不時出現的女和聲，讓整首歌聽起來更加有層次。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/4I5hQz3u1qzL6YXthrRBup?utm_source=generator",
    },
    {
      title: "〈Tek it〉Cafuné",
      desc: "疾馳的鼓點對比著飄渺的人聲，營造出 Shoegaze 特有的「在動盪中保持靜止」的錯覺。歌詞描寫了放手時刻的平靜與無奈。如果你曾在一段關係的盡頭感到異常的清醒，這首歌那種「看著月亮升起，接受一切結束」的冷靜浪漫，會讓你感到被撫慰。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/4K9fCsfAZmLogvDKKIRgCa?utm_source=generator",
    },
    {
      title: "〈等你會不會只是慣性〉公館青少年",
      desc: "帶著學生時代特有的青澀與遺憾，這首歌流淌著一種不知所措的溫柔。等待變成習慣，連自己都分不清是深情還是慣性。你或許是個念舊的人，對逝去的情感容易反覆咀嚼。這種在「放下」與「堅持」之間拉扯的無力感，是你青春裡最真實的註腳，也是你溫柔的證明。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/48qMlE1BtywiaYz7ehO97l?utm_source=generator",
    },
    {
      title: "〈Limbo〉haruno",
      desc: "如同在都市霓虹中漂浮，Chill R&B 的慵懶節拍模糊了時間界線，營造出一種微醺般的失重感。你可能喜歡在繁忙日常中尋找「避世」角落，享受與世界稍微脫節的疏離感。這種冷靜的浪漫，是你與喧囂保持距離的方式，在流動的音符裡，你才是自己的主宰。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/2yeVKV31JmQFH97Kok32xh?utm_source=generator",
    },
  ],
  "0-3-1-0": [
    {
      title: "〈Stone cold summer〉south arcade",
      desc: "夏日的燥熱與內心的冰冷形成對比，Pop Punk 的疾速鼓點與失真吉他築起了一座音牆，對抗著季節的無聊。這種充滿青春躁動的風格，是情緒最直接的宣洩。當世界變得沈悶時，你選擇用更強烈的節奏來喚醒自己。這是一種帶著刺的能量，尖銳卻充滿生命力。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6o8okNBgNmV2ccqNYRFzrg?utm_source=generator",
    },
    {
      title: "〈Luther〉Kendrick Lamer & SZA",
      desc: "取樣自經典靈魂樂，Kendrick 與 SZA 用近乎神聖的口吻探討愛與保護。這不只是情歌，更是一種盟約。歌詞將愛人視為「神聖的完整」，願意為其對抗世界。如果你追求的是那種精神層面高度契合、如同信仰般堅定的關係，這首歌會深深震撼你。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/45J4avUb9Ni0bnETYaYFVJ?utm_source=generator",
    },
    {
      title: "〈早安，晨之美〉盧廣仲",
      desc: "你的選擇帶著輕快的亮度，像晨光推開窗簾，讓心情慢慢變得輕盈。氣息清爽、自在，像在日常裡找到一段微小的節奏。明亮之中卻藏著一點淡淡的悲傷，像夜裡沒說完的心事，被清晨溫柔地照亮。整體是一種輕盈而帶柔影的光，安靜卻讓人想再深呼吸一下。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6OgQdKGX6MPKBJG4NDg78W?utm_source=generator",
    },
    {
      title: "〈power〉G-Dragon",
      desc: "強烈的節奏與深沉的饒舌，就像把整座城市的霓虹拉到耳邊，讓你感受到那種霸氣與不妥協的力量。這首歌不求浪漫、不講曖昧，它講的是自信與覺醒，仿佛整個人被注入能量，眼前變得清醒，世界瞬間變得鮮明。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/4XsJiRJQAK8TWcZCn0Dxlh?utm_source=generator",
    },
  ],
  "0-3-0-1": [
    {
      title: "〈Many Men (Wish Death)〉50 Cent",
      desc: "這是街頭生存的冷酷宣言。陰沉鋼琴與重低音節拍像後巷腳步聲，隨時提醒危險逼近。50 Cent 用沙啞嗓音述說背叛與敵意，每一句都像刀刃般鋒利。歌詞裡的街頭規則、信任與生存掙扎，讓整首歌充滿都市硬派氣息，態度即尊嚴，街頭的冷漠與鋒利感被刻畫得淋漓盡致。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/5STdMlrBf6pqWiNE7WqxSi?utm_source=generator",
    },
    {
      title: "〈Overdose〉natori",
      desc: "中毒般的旋律與急促節奏，展現了 Electro-Pop 華麗的數據過載感。在虛實交錯的網路世代，用一種玩世不恭的態度面對混亂。你或許是個思維跳躍、追求感官刺激的人，對於現代社會的荒謬有著獨到洞察。在看似混亂的電子舞步中，你其實清醒地享受著這份「過量」帶來的迷幻與自由。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/2Dzzhb1oV5ckgOjWZLraIB?utm_source=generator",
    },
    {
      title: "〈CROOKED〉G-Dragon",
      desc: "這首歌像把情緒推到最邊緣的吶喊。節奏快速又帶刺，像心裡的混亂一路往外衝。歌聲裡藏著失落、孤單與倔強的掙扎，像一個不想被看穿的人在夜裡不停奔跑。旋律明亮卻苦澀，讓人感受到想被理解卻又不願示弱的矛盾。聽完像把積存已久的情緒狠狠甩出去，留下輕微空洞卻更自由的呼吸",
      spotifyUrl:
        "https://open.spotify.com/embed/track/4EwNWRBWdZ6bgvxRHlZ8OO?utm_source=generator",
    },
    {
      title: "〈CRAYON〉G-Dragon",
      desc: "這首歌像一股突然爆裂的能量，把理性全部震散，只留下最原始、最奔放的情緒在跳動。狂亂的節奏與鋒利的節拍不斷推高氣氛，彷彿整個世界都在催促你放下拘束、把真實的自己釋放出來。它不講規則、不講邏輯，要你做唯一的自己",
      spotifyUrl:
        "https://open.spotify.com/embed/track/1HMbjnCFGOWd8Sqou4maxM?utm_source=generator",
    },
  ],
  "1-0-3-0": [
    {
      title: "〈Super Far〉Lany",
      desc: "這首歌像是一段被夜色拉長的銀藍色軌跡，旋律帶著 LANY 一貫的清透優雅，卻又包著冷感的城市節奏。合成器的延音像霧，把情緒推到更遠的地方，而鼓點的克制讓整首歌保持在一種時尚而疏離的流動裡。它不急著解釋什麼，只讓那份微弱的遺憾在空氣裡慢慢散開，既柔軟，又帶著潮流感的冷亮。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/15ahYSiHAIMxAnujlXVtta?utm_source=generator",
    },
    {
      title: "〈Aquamarine〉Addison Rae",
      desc: "像是潛入一片香檳色的海洋，氣泡感十足的合成器音效營造出迷離又奢華的氛圍。這首歌展現了一種流動的神秘感，Addison Rae 用氣音將「Aquamarine」演繹成一種危險又迷人的咒語，彷彿現代版的人魚傳說。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/3kDO0ttXrVCWbKCS3sQeC1?utm_source=generator",
    },
    {
      title: "〈WHISTLE〉BLACKPINK",
      desc: "口哨聲響起的瞬間，就奠定了 Minimal Trap 的高級感。這首歌不需要繁複的編曲，用最少的元素營造出最強大的氣場。如果你喜歡那種「話不多說，但我掌控全場」的酷勁，這種高冷且充滿自信的節奏，能完美襯托你的獨特格調。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6NEoeBLQbOMw92qMeLfI40?utm_source=generator",
    },
    {
      title: "〈Live My Life〉aespa",
      desc: "充滿疾走感的吉他與清爽的鼓點，像是青春電影中主角決定奔向自由的瞬間。這首歌拋開了複雜的世界觀，只剩下「活出自我」的純粹宣言。如果你正渴望逃離他人的期待與框架，這種充滿陽光氣息與動能的旋律，能給你滿滿的勇氣去主宰自己的劇本。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/1x1oCGsFUDViOvcISuoKW0?utm_source=generator",
    },
  ],
  "0-1-3-0": [
    {
      title: "〈Gluttony 〉Aldrch / Voda Fuji",
      desc: "",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6OCFifBlii2D7QN2upt6mg?utm_source=generator",
    },
    {
      title: "〈Guess featuring billie eilish〉Charli xcx",
      desc: "極致的貝斯重擊與挑逗的耳語，將 Club Pop 的享樂主義推向高潮。這首歌充滿了自信的性張力與玩世不恭的態度，像是一場關於秘密的猜謎遊戲。若你喜歡那種讓身體本能地跟隨低頻擺動的沉浸體驗，這首充滿謎題與誘惑的單曲會直擊你的感官。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0IsIY8pfu1yaGkPUD7pkDx?utm_source=generator",
    },
    {
      title: "〈HOME SWEET HOME〉G-Dragon(feat. TAEYANG & DAESUNG)",
      desc: "這首歌聽起來像一股直線衝出的能量，節奏明快、有力，帶著不想停下的氣勢。旋律亮眼卻帶點緊繃，讓人心跳不自覺被牽動",
      spotifyUrl:
        "https://open.spotify.com/embed/track/5doooVlMVRZztQbySqARMI?utm_source=generator",
    },
    {
      title: "〈jump〉BLACKPINK",
      desc: "這是一首結構瘋狂、打破常規的 Experimental Hip-Hop。歌詞充滿了對聽眾感官的挑釁，像是直接撕裂大腦的訊號。如果你厭倦了千篇一律的流行公式，喜歡那種帶有「衝擊性」與「獵奇感」的聽覺體驗，這首歌會帶給你前所未有的刺激。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/5H1sKFMzDeMtXwND3V6hRY?utm_source=generator",
    },
  ],
  "0-0-3-1": [
    {
      title: "〈Sympathy is a knife〉Charli xcx",
      desc: "尖銳的合成器音色像手術刀一樣劃開表象，Hyperpop 的混亂與焦慮在這裡展露無遺。這首歌是對自我懷疑的殘酷剖析，承認同情有時比恨更傷人。在「被理解」與「被看穿」之間掙扎。這種帶刺的坦誠，是保護內心脆弱的一種激進方式。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/5c9tBmJKbTdn1vhzXHeAwW?utm_source=generator",
    },
    {
      title: "〈Venus Fly Trap〉Brakence",
      desc: "像是一顆會自我吞噬的超新星，節奏斷裂、音色扭曲。旋律聽起來輕、亮、帶著少年氣，但每一次失真、每一句半吶喊都像從情緒邊緣被拉回來。新潮、衝動、混亂，卻又在底層藏著一絲黑暗的自我否定。聽著聽著，你會分不清是他在爆炸，還是你跟著被牽引著一起震動。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/25oJjxP1cVjghqjfwEVPG6?utm_source=generator",
    },
    {
      title: "〈UP〉KARINA",
      desc: "強烈的 Trap 節拍展現了女王般的自信與霸氣。歌詞充滿了自我肯定與對頂端的渴望，拒絕被定義。如果你正在尋求一種能讓自信心爆棚的能量，這首充滿野心與力量的歌曲，會讓你覺得自己無所不能。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/5sjnkOfTLCLNfkkchI2re2?utm_source=generator",
    },
    {
      title: "〈Hold On Tight〉aespa",
      desc: "採樣自經典俄羅斯方塊配樂，這首 Techno-Pop 充滿了遊戲般的緊張感與未來氣息。快節奏的鼓點如同在賽博龐克的城市中急速狂飆，帶來腎上腺素的飆升。你享受那種高強度的節奏推進，以及將現實像遊戲關卡般逐一突破的快感。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/1o844wI52S3TjXGBwvGcc7?utm_source=generator",
    },
  ],
  "1-0-0-3": [
    {
      title: "〈eat me alive〉Artemas",
      desc: "粗糙的失真效果與陰鬱的旋律，營造出 Dark Alt-Pop 特有的病態迷戀。這首歌是對毀滅性情感的投降，渴望被某種強烈的事物徹底吞噬。如果你厭倦了過度精緻的流行樂，轉而尋求那種帶有顆粒感、略顯危險且能觸動深層情緒的聲音，這種頹廢美學會深深吸引你。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/7DHtEW30WxZ888qxqorLSL?utm_source=generator",
    },
    {
      title: "〈Drama〉G-Dragon",
      desc: "節奏明確卻不張揚，帶著逼近情緒邊界的力量；旋律則像在胸口輕輕敲打，一下比一下更沉。整體氛圍帶著迷惘與疲倦，好像在尋找出口卻始終被困在原地。它不是大聲的悲傷，而是那種靜靜滲出的無力感，讓人越聽越陷進自己的內心深處。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/5Pixk2d6ey48MKVq5W6HWt?utm_source=generator",
    },
    {
      title: "〈才二十三〉方大同",
      desc: "你的選擇裡浮出一種靜靜的心緒，像在深夜裡對自己說的一句輕聲傾訴。情感被整理得很乾淨，帶著一點優雅的弧度，但底色仍是被歲月悄悄壓下的酸楚。那種悲傷不是劇烈的，而是被時間泡得柔軟、慢慢沉到心底的。整體氛圍像一盞孤獨卻溫暖的燈光，在疲倦與成長之間亮著，陪著那些還沒說出口的重量。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/1h1odoIBoxI1BvZUpoAGcH?utm_source=generator",
    },
    {
      title: "〈Love wins all〉IU",
      desc: "這首歌像一場緩慢降臨的夢，柔軟卻帶著刺痛。聲音輕得像要化開，卻在每一句裡藏著不願放手的深情。旋律溫柔地推動情緒，讓人彷彿被擁入一個既悲傷又美麗的世界。它說的是愛如何在混亂與恐懼中仍努力發光，像最後一束想抓住彼此的光，讓人心酸又感動。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0djkJ3iAARXRCbfbwwVc3o?utm_source=generator",
    },
  ],
  "0-1-0-3": [
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
  ],
  "0-0-1-3": [
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
  ],
  "2-2-0-0": [
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
  ],
  "2-0-2-0": [
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
  ],
  "2-0-0-2": [
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
  ],
  "0-2-2-0": [
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
  ],
  "0-2-0-2": [
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
  ],
  "0-0-2-2": [
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
  ],
  "2-1-1-0": [
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
  ],
  "1-2-1-0": [
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
  ],
  "1-1-2-0": [
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
  ],
  "1-1-0-2": [
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
  ],
  "2-0-1-1": [
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
  ],
  "0-2-1-1": [
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
  ],
  "0-1-2-1": [
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
  ],
  "0-1-1-2": [
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
  ],
  "2-1-0-1": [
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
    },
    {
      title: "〈Bad Girls〉Nicolas Julian",
      desc: "",
      spotifyUrl: "",
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
