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
function applyChoicesToCDImages() {
  const choices = getUserChoices();

  const imgElements = {
    case: document.getElementById("result-case-img"),
    cover: document.getElementById("result-cover-img"),
    keychain: document.getElementById("result-keychain-img"),
    sticker: document.getElementById("result-sticker-img"),
  };

  Object.keys(imgElements).forEach((part) => {
    const imgEl = imgElements[part];
    const style = choices[part]; // sweet / hiphop / y3k / dark

    if (!imgEl) return; // 這一頁沒有這張圖就跳過（例如有的頁面沒有 CD）

    if (style && IMAGE_MAP[part] && IMAGE_MAP[part][style]) {
      imgEl.src = IMAGE_MAP[part][style];
    } else {
      console.warn(`找不到 ${part} 的圖片風格：`, style);
    }
  });
}
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
      desc: "夢境與現實的邊界逐漸變得模糊，這首充滿夢核（Dreamcore）美學的歌像是一場粉色的夜間漫遊。輕盈的節奏帶著童話般的失真感，彷彿世界只剩下你與你的幻想。你咬下一口沾滿糖霜的雲朵，沈溺在旋律裡甜美的秘密，像是在做一場甜美又漫長的夢。",
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
      spotifyUrl:
        "https://open.spotify.com/embed/track/6uPnrBgweGOcwjFL4ItAvV?utm_source=generator",
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
      desc: "Hyperpop 是一種融合了流行、電子、嘻哈、朋克等元素的實驗音樂風格，利用多樣的音效讓歌曲變得極致豐富，打破傳統音樂框架。aldrch 的gluttony就是典型的hyperpop 曲風歌曲，講述著在一段感情中越陷越深，變得越來越瘋狂，越來越偏執，最後被吞噬的過程，這種混亂就是對Hyperpop最好的詮釋。",
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
      title: "〈Azimuth〉Danny L Harle, Caroline Polachek",
      desc: "空靈的女聲與史詩般的電子合成器，融合了 Trance 的迷幻與 Art Pop 的優雅。這首歌像是一場星際穿越，將意識抽離地表，飛向浩瀚的宇宙。如果你喜歡那種宏大、且能讓思緒飄得更遠的音樂景觀，這首作品能營造出一個暫時脫離現實瑣碎的真空時刻。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/5eLQyZ8kZKFRukO1mIAXKQ?utm_source=generator",
    },
    {
      title: "〈Bad boy〉BigBang",
      desc: "這首歌讓人感覺像在夜色中獨自前行 — 旋律柔和卻帶著一絲飄渺，聲音溫柔中藏著淡淡的憂傷。節奏不急不緩，有種在回想與釋放之間徘徊的情緒。聆聽時彷彿整個世界變得遙遠，而心裡的思緒被慢慢拉出來，柔軟而真實。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/7GLlnuHjYIKy3YR59ziaQe?utm_source=generator",
    },
    {
      title: "〈死ぬのがいいわ〉Fujii Kaze",
      desc: "節奏穩健但不急，像心跳的餘震持續在擴散。旋律柔中帶冷，讓人感到一絲疏離，像在喃喃自語又不願被看見。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0HYAsQwJIO6FLqpyTeD3l6?utm_source=generator",
    },
    {
      title: "〈Hold On〉高爾宣 & 派偉俊",
      desc: "這首歌節奏輕快、充滿推動感，彷彿逼著情緒往前走，但底層卻透出一股淡淡的憂傷與無奈。旋律明亮，情緒卻像被風吹散，輕飄卻揪著心。那種感覺像是勉強自己跟著節奏前進，卻仍帶著解不開的重量。整首歌呈現出外放與內斂交錯的矛盾氛圍，既想灑脫，也藏著寂寞。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/580BvW3DyUNoYFgQgoD2GI?utm_source=generator",
    },
  ],
  "0-0-1-3": [
    {
      title: "〈Poker Face〉Lupage, Joe Kox",
      desc: "將經典流行曲重塑為充滿攻擊性的 Phonk 風格，低沈的 Bassline 與快節奏賦予了它全新的暗黑能量。這是一種隱藏情緒的武裝，像是戴著面具在深夜的街頭疾行。若你偏好那種具有強烈壓迫感、適合夜間駕駛或高強度運動的節奏，這種冷酷的聽感會讓你感到格外過癮。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6aFUMn7oUmcHKFnx1WPcJt?utm_source=generator",
    },
    {
      title: "〈ビターチョコデコレーション〉初音ミク、syudou",
      desc: "歌詞描繪了為了合群而扼殺個性、強迫自己扮演「正常人」的痛苦過程。初音冷漠的唱腔結合中毒性旋律，完美演繹出「笑著崩潰」、在壓抑中逐漸瘋狂的心境，是獻給所有戴著假面具生存者的殘酷童話。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6JFD96zWsIdGPqLOTVE1uU?utm_source=generator",
    },
    {
      title: "〈SHEESH〉BABYMONSTER",
      desc: "陰森的鋼琴前奏轉入重型 808 Bass，營造出強烈的驚悚感與壓迫力。這是一場關於實力的炫耀，用一聲 SHEESH 讓質疑者閉嘴。這首歌氣場強大、帶點邪氣與傲慢。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/1njlnn8ZKHI77Pe9szIONR?utm_source=generator",
    },
    {
      title: "〈美好的事可不可以發生在我身上〉康士坦的變化球",
      desc: "層層堆疊的吉他音牆與撕心裂肺的吶喊，是 Post-Rock 最具爆發力的宣洩。這首歌唱出了當代青年的集體焦慮，是對命運最卑微的提問。如果你容易被音樂中的「敘事性」與「爆發力」打動，這首從壓抑到徹底釋放的編制，能精準承接你心中那些無處安放的情緒。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/1viPIivqn5vmMsFUk5CJnw?utm_source=generator",
    },
  ],
  "2-2-0-0": [
    {
      title: "〈Summer〉Keshi",
      desc: "這首歌像被陽光慢慢曬暖的午後風，吉他的清亮勾出一種輕盈的節奏感，情緒柔得像被薄棉包住。旋律在耳邊輕輕散開，不急不重，像夏日裡最剛好的微風，把心情推向透明又自在的狀態。整首歌像在記錄一段溫柔的日光旅程，優雅而輕快，帶著能讓人放鬆下來的暖意與亮度。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0LqCvXVNvcnkq78sCQsoO0?utm_source=generator",
    },
    {
      title: "〈Paris in the rain〉Lauv ",
      desc: "輕脆的吉他聲與雨聲採樣，營造出極致的 Chill Pop 氛圍。這首歌將愛情具象化為巴黎的雨夜，濕潤、溫暖且浪漫。如果你是一個注重生活情調的人，這首歌能瞬間將你周遭的空氣，染上一層昏黃而溫柔的電影濾鏡。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/2WdAV1VqmllcEznKlVOFxG?utm_source=generator",
    },
    {
      title: "〈small girl〉李泳知/D.O.",
      desc: "旋律乾淨透亮，讓情緒不自覺被拉得更輕，像在日光灑落的午後慢慢醒來。它沒有強烈的壓力，是一種讓人心房慢慢鬆開的舒適感。整體氛圍治癒、溫暖，像被輕輕拍拍肩膀。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/1AtFSBJibfaqfiOByQCwZ5?utm_source=generator",
    },
    {
      title: "〈any song〉zico",
      desc: "輕快的鋼琴 Riff 與慵懶的 Flow，是社恐在派對上的最佳解藥。歌詞道出了現代人對社交的疲憊與無聊，只想隨便放首歌跟著點頭，逃離尷尬的對話。如果你常在熱鬧的人群中感到孤單，只想沈浸在自己的小世界裡隨性搖擺，這首帶著「無所謂」態度的歌，會讓你感到無比自在與放鬆。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/1iIhGHzzrzqQfuNkFI2qAn?utm_source=generator",
    },
  ],
  "2-0-2-0": [
    {
      title: "〈Party 4 U〉Charli xcx",
      desc: "在 Bubblegum Bass 的派對節奏下，藏著一顆最卑微、最真摯的心。這首歌描寫了為了某人精心準備一切的忐忑與期待。若你喜歡那種「外殼堅硬、內核柔軟」的音樂反差，這種在人工合成的甜美音效中包裹著真實心碎的聽感，會讓你感到既浪漫又酸楚。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/2RdEC8Ff83WkX7kDVCHseE?utm_source=generator",
    },
    {
      title: "〈Girl, so confusing featuring Lorde〉Carli xcx",
      desc: "Alt-Pop 的編曲極簡卻充滿張力。在標誌性的工業電子躁動中，兩人打破了外界長年投射的女性對立劇本。歌詞赤裸地剖析了女性情誼中那些由羨慕、不安與誤解交織而成的複雜暗流。這首將私密的焦慮轉化為集體共感的作品，展現了女性之間最深刻的連結與救贖。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/7srqyRb5plksW5k65itXDB?utm_source=generator",
    },
    {
      title: "〈醉後喜歡我〉冰球樂團",
      desc: "霓虹燈閃爍的 City Pop 旋律，加上搖擺的 Funk 節奏，營造出微醺時分的曖昧氣氛。藉著酒意說出真心話，是成年人特有的浪漫與狡猾。如果你喜歡那種帶有復古韻味、且能營造出戀愛氛圍的律動，這首歌曲能完美重現那種在理智與衝動邊緣徘徊的朦朧美感。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/13FewTw13JlIFG7fb4ROsA?utm_source=generator",
    },
    {
      title: "〈I GOT YOU〉TWICE",
      desc: "疾馳的節奏與明亮的合成器音色，像是一場迎風破浪的航行。這首歌歌頌著堅不可摧的羈絆，無論世界如何動盪，只要有彼此就能穿越風暴。如果你珍視那種「無條件支持」的夥伴情誼，或正在尋找一股向前的動力，這首充滿陽光與動能的歌曲，會給你滿滿的勇氣與希望。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0mgveJEIGjcN51w4JIQtI6?utm_source=generator",
    },
  ],
  "2-0-0-2": [
    {
      title: "〈Kill Bill〉SZA",
      desc: "甜美慵懶的聲線下藏著極致的瘋狂，這首 R&B 將嫉妒與佔有慾演繹得淋漓盡致。如果你迷戀那種「愛到想毀了你」的病態浪漫，這種在絲滑旋律中訴說血腥幻想的反差感，會精準擊中你心中那個渴望極致情感的小惡魔。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/3OHfY25tqY28d16oZczHc8?utm_source=generator",
    },
    {
      title: "〈JANE DOE〉米津玄師、宇多田光",
      desc: "這首歌陰鬱而浪漫，以夢境般的意象描寫一段扭曲卻強烈的依戀。主角一邊受傷、一邊留下「請你找到我」的訊號，像在黑暗中渴求被拯救。歌詞核心是：明知是短暫的幻夢，仍想抓住彼此—哪怕要以痛苦換來靠近。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/4oE7MyJhqSD3BaHRpNs8Nl?utm_source=generator",
    },
    {
      title: "〈Plastic Love〉竹内まりや",
      desc: "City Pop 的經典，華麗的管樂與放克節奏勾勒出 80 年代繁華都市的孤寂。那種「在人群中狂歡卻依然感到孤獨」的塑膠感愛情，雖是虛幻卻又如此迷人。如果你嚮往復古的精緻感，這首歌能帶你穿梭回那個霓虹閃爍、只談氛圍不談未來的泡沫時代。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/7rU6Iebxzlvqy5t857bKFq?utm_source=generator",
    },
    {
      title: "〈You & Me〉Jennie",
      desc: "月光下的剪影，強烈的節奏與夢幻的合成器交織。這首歌描寫了兩人之間無人能介入的緊密連結。如果你嚮往那種「與世界為敵，只與你共舞」的強烈羈絆，這首歌那種既性感又帶點孤傲的氛圍，會讓你深深著迷。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6xXCn7H2Yl8SDD6jxo5SpN?utm_source=generator",
    },
  ],
  "0-2-2-0": [
    {
      title: "〈Self Love〉Metro Boomin, Coi Leray",
      desc: "從你的選擇裡浮出一種輕盈的韻律，像是把心整理得更乾淨後留下的那份明亮。情緒是往前走的，步伐輕快，帶著一點跳動的自由感。深處又隱約透著都會的冷色光，像把界線畫得剛剛好，不多、不吵，只保留自己的節奏。整體是一種清爽又帶著現代線條的氛圍，隨性、克制，而內心的力量悄悄在底部發亮。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0AAMnNeIc6CdnfNU85GwCH?utm_source=generator",
    },
    {
      title: "〈Party Jumpin'〉CID",
      desc: "乾淨俐落的鼓點與不斷循環的洗腦 Vocal，是 Tech House 最純粹的動能。這首歌沒有多餘的情緒鋪陳，只有直球對決的舞池能量。如果你喜歡那種能讓大腦放空、身體自動接管節奏的直覺式快感，這首歌是讓你瞬間切換到派對模式的開關。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6R7qT58x43pw4LemDZGMrN?utm_source=generator",
    },
    {
      title: "〈Not like us〉Kendrick Lamer",
      desc: "經典的 Mustard 節拍響起，這不僅是一首 Diss Track，更是一場關於「真實」的文化肅清。Kendrick 用最洗腦的彈跳節奏，精準狙擊了虛偽與文化挪用。如果你痛恨偽裝，堅持根源與正統，這首充滿攻擊性卻又讓人忍不住跟著搖擺的勝利宣言，絕對讓你大呼過癮。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6AI3ezQ4o3HUoP6Dhudph3?utm_source=generator",
    },
    {
      title: "〈P.Y.T.〉Ｍasiwei / Asen",
      desc: "這是都市夜晚的自信宣言，Jersey Club 節奏乾脆有力，饒舌流暢直擊胸口。歌詞裡奢華品牌、派對場景交錯，展現都市年輕人的野心與誘惑感。旋律抓耳、節奏明快，像夜色裡閃爍的霓虹，誘惑又不可捉摸，讓人一聽就被帶入這份衝動與張力。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/4BG19hfg6nz84WLqgW2DC4?utm_source=generator",
    },
  ],
  "0-2-0-2": [
    {
      title: "〈Money Buy Drugs〉Cal Scruby",
      desc: "這是一首一上來就讓人心跳跟著加速的饒舌。猛烈的鼓點、低頻像在胸腔裡推著，讓整體聽感乾、冷、直接。Cal Scruby 的饒舌帶著壓力感，語氣像在把情緒往外甩。那種靠節奏與態度正面撞過來的力量，越聽越像被拉進一條沒有出口的夜路，只能跟著節拍往前衝。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/4LxHF9sQ6KXrxZatMPV2EL?utm_source=generator",
    },
    {
      title: "〈幽霊東京〉Ayase",
      desc: "在人群中迷失、在慾望都市裡找不到真正的自己，只能像幽靈般前行，既想逃離又無法停止。節奏偏快、帶工業感與電子噪音的質地，呈現冷冽、孤獨又迷離的都市感，映照著主角在夜色與霓虹裡遊走，被空虛、迷茫與自我矛盾吞沒。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6gmwKGGuoY7NAqKI3pzMPC?utm_source=generator",
    },
    {
      title: "〈Bad Influence〉Seventeen",
      desc: "這首歌像一股緩慢卻強烈的磁場，輕輕牽動情緒深處。節奏不急，但每一下都像在敲醒心底細微的顫動。音樂中反覆堆疊的合成器與空間感效果，使情緒像被拉進一個半透明的世界，柔軟卻帶苦味",
      spotifyUrl:
        "https://open.spotify.com/embed/track/3cjHBmP0CsTGNN44gf6cID?utm_source=generator",
    },
    {
      title: "〈WAIT〉瘦子E.SO",
      desc: "這首歌帶著明確的嘻哈節奏，鼓點俐落、有彈性，像是在步伐裡打出自信的節拍。旋律簡潔直接，沒有多餘裝飾，讓整體聽起來乾淨又充滿態度，人聲的表現帶著些許挑釁與玩味。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0TYt1vngPocfkK2YHvu7Ze?utm_source=generator",
    },
  ],
  "0-0-2-2": [
    {
      title: "〈Desire〉Ian Asher",
      desc: "充滿張力的人聲採樣與重拍 Drop，營造出夏日音樂祭般的熱烈氛圍。這首歌是對慾望最直接的召喚，充滿了荷爾蒙的氣息。如果你追求那種感官被重音包圍、心跳加速的刺激感，這首充滿能量的舞曲能滿足你對熱情的渴望。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/4sMR8fuTzbUyzB0asxifV0?utm_source=generator",
    },
    {
      title: "〈HEARTBREAKER〉G-Dragon",
      desc: "旋律與聲線交織出既迷惘又渴望的情緒，好像站在邊緣卻又無法後退。整體氛圍充滿張力、情緒被放大，聽著會讓人心跳加速、胸口微微發熱，那種帶著痛苦卻心甘情願的吸引力，令人難以抵擋。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/4n5GvONt7Niv5In6awXHR7?utm_source=generator",
    },
    {
      title: "〈FANTASTIC BABY〉BigBang",
      desc: "這不只是一首歌，而是點燃腎上腺素的派對國歌。這首歌代表著一種絕對的狂歡與王者般的自信，拒絕所有沉悶與規則。如果你渴望在混亂的節奏中徹底釋放自我，享受成為聚光燈焦點的快感，這首充滿爆發力與戲劇張力的神曲，能讓你瞬間找回統治舞台的霸氣。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/26eV0R7nbqtlzh316ncU99?utm_source=generator",
    },
    {
      title: "〈HBD〉Seventeen",
      desc: "這首歌像是一場內心的風暴 — 節奏冷冽、聲音層層堆疊，把不安、掙扎、決心全帶出來。伴奏帶點暗色但不壓抑，像是面對未知時的恐懼與決定。歌聲裡有一種「破繭而出」的力量，讓人聽完心裡微微震動，像被喚醒般──即使前路不明，也願意硬著頭皮往前走。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6E0o3c4mgb7K5DB2TXg4XX?utm_source=generator",
    },
  ],
  "2-1-1-0": [
    {
      title: "〈That's so true〉Gracie abrams ",
      desc: "這首歌浮出一種細緻而安靜的層次，像柔霧在光裡慢慢散開。情緒並不張揚，卻在轉折間留下柔和的線條。步調輕盈，像被風推動的瞬間，自然地帶來一點清爽的亮度。偶爾也會透出微微的冷色光，帶著現代、簡潔的質地。整體是一種溫柔而輕巧的氛圍像悄悄保留的心緒。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/7ne4VBA60CxGM75vw0EYad?utm_source=generator",
    },
    {
      title: "〈Treasure〉Bruno Mars",
      desc: "你的選擇散發出一種明亮而講究的氣息，像光線在金色舞池上輕輕滑過。情緒帶著優雅的圓潤感，不張揚，卻在節奏裡自然地發光。輕快的律動像是在日常中悄悄加了一點跳躍，使整體氣氛更輕盈。深處則藏著新潮的亮度，是那種簡潔、俐落、帶點魅力的光澤。整體像一段輕柔又時髦的暖色脈動。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/55h7vJchibLdUkxdlX3fK7?utm_source=generator",
    },
    {
      title: "〈What is love?〉Twice",
      desc: "明亮輕快的節奏與滿溢的少女心，是對愛情最純真的憧憬。歌詞透過電影情節幻想著愛情的模樣，充滿了好奇與期待。如果你內心仍保留著一份對「完美愛情」的單純嚮往，這首歌甜美的旋律會喚醒你心中那個相信童話故事的小孩。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/54mnwt3kO0uYsy0ceg14JP?utm_source=generator",
    },
    {
      title: "〈ミスター〉YOASOBI",
      desc: "復古的搖擺節奏搭配哀愁的旋律，帶著一點機械般的冷冽與深情。這首歌探討了跨越界線的單戀，淒美而壓抑。如果你容易被那種「無聲的守護」或「無法觸及的愛」所打動，這首節奏輕快卻底色悲涼的歌會讓你深深共鳴。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/2YbNZLoiREBYZo4HeKB8Np?utm_source=generator",
    },
  ],
  "1-2-1-0": [
    {
      title: "〈Friday's High〉Penthouse",
      desc: "這是夜幕下的都會放克之歌：霓虹與節奏交織，用 Soul + Jazz 嗓音讓整個週末夜色瞬間被點亮。鼓點帶著 groove，旋律流動在城市燈火間，這首歌在邀你揮別煩憂、放縱今夜，用音樂慶祝屬於自己的Friday’s High。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/1UMM7yez5N3ums1cFsAAxY?utm_source=generator",
    },
    {
      title: "〈Unexpected Trouble〉Masiwei",
      desc: "這首歌像一場突如其來的夜航，當愛降落，你的心跳被打亂。用輕柔卻帶點壓抑的節拍包裹情緒，歌詞把對方比成飛來橫禍，也許是命運，也許是謊言。你想靠近，也怕失控，想心動，也怕受傷。就像在夜裡看不清方向，不知道前方是情感救贖或甜蜜陷阱。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/5MOeJ3kTlC1a0B4T1i6FAT?utm_source=generator",
    },
    {
      title: "〈SPAGHETTI〉LE SSERAFIM",
      desc: "充滿趣味的 Funky 律動，歌詞用義大利麵比喻混亂卻美味的生活態度，充滿了 Z 世代的幽默與鬆弛感。如果你喜歡那種不按牌理出牌、帶點怪誕卻極具感染力的快樂，這首歌會讓你忍不住跟著擺動。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/2N9miXnewVmUrgl6JSK1FI?utm_source=generator",
    },
    {
      title: "〈轉生成椅子在二手傢俱店等待邂逅的我是否搞錯了什麼〉冰球樂團",
      desc: "充滿律動感的 Funk 吉他與荒誕幽默的歌詞，展現了極致的腦洞與浪漫。將視角轉生成一張椅子，用最卑微的姿勢等待愛情。如果你是一個擁有奇特幽默感、喜歡在日常無聊中尋找樂趣的人，這種「一本正經胡說八道」的浪漫律動會讓你會心一笑。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/5Cmv9VX8BjxKELcHG3uGx9?utm_source=generator",
    },
  ],
  "1-1-2-0": [
    {
      title: "〈M2M〉CODY JON",
      desc: "曖昧的感覺就像是毒品，Cony Jon的M2M就是對這份感受最好的詮釋，歌詞描述與曖昧對象的誤會和對未來的想像，一切就像是一場夢一樣，夢幻但又虛假，這並不是什麼專一的愛，而是朋友和情人中間那若即若離的關係。M2M的編曲非常創新，融合了2000年的pop / r&b和jazz讓你猜不到接下來的節奏，副歌後的變奏和風格轉換就像這段關係一樣，捉摸不定。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/3d4WE2mXks9S6qyxUABSmv?utm_source=generator",
    },
    {
      title: "〈Come around me〉Justin Bieber",
      desc: "慵懶的節拍營造出濃厚的 R&B 臥室氛圍。這首歌是對親密關係最直白的渴望——不需要過多的言語，只需要體溫與觸碰。如果你喜歡那種黏膩卻不沈重、充滿鬆弛感的戀愛狀態，這首自帶濾鏡的歌曲，能完美重現兩人膩在一起、無所事事卻無比滿足的午後時光。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/2o9LAypwGH4ctV0i9boo6d?utm_source=generator",
    },
    {
      title: "〈Thunder〉Seventeen",
      desc: "這首歌像一道瞬間劈進身體的雷光，節奏強烈俐落，帶著逼人前進的衝勁。鼓點與低頻像電流一路竄上心臟，讓情緒不自覺被拉高。旋律乾脆、節奏感明確，整體氛圍既振奮又帶著一點緊繃，像在風暴中心奔跑。它給人的不是壓抑，而是一種被雷擊般的醒悟與爆發感。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6oeMntjclWLoguzwj5ECTo?utm_source=generator",
    },
    {
      title: "〈IS THIS LOVE〉XG",
      desc: "節奏慵懶、旋律流暢，帶些迷幻感的和聲與細緻的節拍是 XG 擅長的高質感 R&B 風格。歌詞融合自信與脆弱——既被對方牽動，又不想丟掉主導權，呈現出 XG 一貫的酷感與女性主體性。整首歌像是在問：這份電流般的吸引，是愛、上癮，還是危險？",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0dzbNEBsrs17os3jJOFLar?utm_source=generator",
    },
  ],
  "1-1-0-2": [
    {
      title: "〈I like the way you kiss me〉Artemas",
      desc: "低沈的貝斯線條與帶有侵略性的歌詞，營造出一種危險的性張力。這不是甜言蜜語，而是關於肉體吸引與情感疏離的拉扯。如果你厭倦了過度糖衣包裝的愛情，偏愛那種有點壞、有點渣，卻真實得令人上癮的氛圍，這首歌是你的最佳配樂。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/3JG1uFc40wfyrqaWC7iv0e?utm_source=generator",
    },
    {
      title: "〈Manchild〉Sabrina Carpenter",
      desc: "這首流行（Pop）歌曲結合輕快節奏與R&B元素，旋律討喜、語氣帶點玩味與嘲諷。以幽默又帶刺的方式批判「巨嬰」──外表是大人，行為卻幼稚、自我中心、不懂負責。歌曲用輕鬆的語氣吐槽對方，暗示自己已經看穿並準備離開。整體呈現一種俏皮但清醒的女性視角",
      spotifyUrl:
        "https://open.spotify.com/embed/track/42UBPzRMh5yyz0EDPr6fr1?utm_source=generator",
    },
    {
      title: "〈IRIS OUT〉米津玄師",
      desc: "這首歌以誇張的身體比喻表現「快要失控的戀愛執著」。被迷戀沖昏頭，理智在腦內尖叫卻無法阻止。血液、瞳孔放大的意象象徵壓倒性的心動與混亂，像被對方的存在擊中要害。歌詞充滿中二、暴走、甜膩又危險的情緒。核心主題是——對方的可愛，是足以毀滅人理智的致命級魅力。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/59hVbgr8rfYkDbHfr8RcGI?utm_source=generator",
    },
    {
      title: "〈一定要相信自己〉盧廣仲",
      desc: "你的選擇帶著一種安靜的克制，情緒被整理得很柔，像一句輕聲放在心底的提醒。表面平穩，深處卻泛著淡淡的悲傷，像走過疲憊後留下的陰影。其間透出的冷亮感簡潔、現代，讓整體更顯得透明。像一束微弱卻持續的光，在低落中慢慢撐著自己。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/16JnRultn7tptNHMBe94w3?utm_source=generator",
    },
  ],
  "2-0-1-1": [
    {
      title: "〈Everything is romantic featuring caroline polachek〉Charli xcx",
      desc: "Hyperpop × Dream Pop 的混合風格。節奏輕盈跳動、合成器線條柔軟飄逸，呈現超現實又甜膩的氛圍。無論是被雨淋濕、宿醉、失眠、街景或自我映照，一切看似不完美的片刻，因為愛或因為被某人牽動，而變得充滿美感。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/4cCnCDJZDLGDIdnxRfOUBn?utm_source=generator",
    },
    {
      title: "〈make you mine〉Madison Beer",
      desc: "性感的律動與極具誘惑力的聲線，展現了自信女性的主動出擊。這首歌充滿了費洛蒙與曖昧的遊戲感。如果你喜歡那種在感情中掌握主導權、大膽追求所愛的自信氛圍，這首充滿魅力的舞曲會讓你覺得自己無比耀眼。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/48vIfHaK7by6x0T6ucpODL?utm_source=generator",
    },
    {
      title: "〈skeletons〉keshi",
      desc: "你的選擇散發出一種柔和卻安靜的氣息，像藏在夜裡的微光，乾淨而不喧嘩。情緒被收得很好，線條細緻，帶著優雅的克制。其間也透著冷色質地的現代感，讓整體更顯得透明、極簡。像是一段在靜默中被看見的呼吸節奏，溫柔而內斂。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/2BuJrxYKhYky20dQqTlobO?utm_source=generator",
    },
    {
      title: "〈Love Like This〉Fujii Kaze",
      desc: "開頭節拍就很有力，像心跳被催促，鼓點有彈性、重低頻清晰，把空氣震得有重量。旋律簡潔，不刻意華麗，反而用留白讓節奏與聲線主導整個氛圍。聽著會讓人想自然晃動、身體跟著節拍起來。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/1eULGMOdkcFd3xTD1zh2f5?utm_source=generator",
    },
  ],
  "0-2-1-1": [
    {
      title: "〈so far so fake〉Pierce The Veil",
      desc: "高能量的吉他 Riffs 與撕裂般的唱腔，是千禧世代的文藝復興。那種對於虛偽人際關係的憤怒與失望，化作最直接的音牆衝撞。如果你骨子裡藏著一股不願被馴服的叛逆，或懷念那種將情緒毫無保留宣洩出來的痛快，這首歌會燃起你心中的火焰。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/3fWibgdtgIie6LKTZ2rUoI?utm_source=generator",
    },
    {
      title: "〈Snooze〉SZA",
      desc: "絲滑如綢緞般的聲線，將時間凝結在戀人相擁的午後。這首歌是對「當下」的極致貪戀，歌詞訴說著寧願犧牲睡眠也不願錯過與對方共處的每一秒。如果你追求那種靈魂與肉體高度契合、只想溺死在對方溫柔裡的親密關係，這首極度浪漫且性感的慢板情歌，會讓你感到無比酥麻。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/4iZ4pt7kvcaH6Yo8UoZ4s2?utm_source=generator",
    },
    {
      title: "〈hello miss johnson〉Jack Harlow",
      desc: "你的選擇帶著一種街頭塗鴉般的節奏感，隨性、輕巧，像在城市牆面留下半句玩笑。線條凌亂卻有自己的美感，情緒在其中跳動得很自然。深處偶爾透出冷色的光，是新潮的質地，簡潔又帶著些許距離。整體氛圍介於輕鬆與深處之間，像一段帶笑意的暗夜塗鴉。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6gH1UKDAhWS6qXzKXB4wuY?utm_source=generator",
    },
    {
      title: "〈Loser〉BigBang",
      desc: "節奏纏繞著憂鬱，旋律低沉卻讓人無法轉移視線。歌聲像深夜裏的低語，帶著對失敗、迷惘、孤立的自省。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/2vzn8usBcuNL93DnTjEK0z?utm_source=generator",
    },
  ],
  "0-1-2-1": [
    {
      title: "〈Constant Repeat〉Charli xcx",
      desc: "迷幻的合成器音色與無限循環的歌詞，營造出一種對逝去戀情的執著與回味。這是一種在舞池中央流淚的浪漫。如果你是一個念舊且感性的人，喜歡反覆咀嚼某個珍貴的回憶片段，這首歌的循環感會像漩渦一樣，溫柔地將你捲入回憶深處。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0U9ltIN4q3aBKGZDZq5cAW?utm_source=generator",
    },
    {
      title: "〈STUPID IDIOT〉Hoshi X Woozi",
      desc: "節拍跳動得像停不下來的彈跳球，整體充滿滑稽又上頭的衝勁。旋律刻意做得黏且洗腦，兩人的互動像在打鬧、吐槽。合成器音色明亮有彈性，聽起來輕快、搞怪。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/298BoO0FqEs3hfwO4K86fI?utm_source=generator",
    },
    {
      title: "〈Luxury〉KVGGLV",
      desc: "這首歌是 KVGGLV 的街頭奢華宣言，重低音節拍像加速的引擎，Rap flow 簡潔坦率，不拐彎也不客套。歌詞裡的 Prada、Maybach、Balenciaga，不只是品牌，而是態度象徵。宣告著：我是我的 style，真與偽，我自己分得清。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6HxSjcMspAG2hwrPsMjtZK?utm_source=generator",
    },
    {
      title: "〈Hot In IT(feat.Charli XCX)〉Tiësto, Charli xcx",
      desc: "自信爆棚的復仇系舞曲，節奏明亮且充滿彈性。這首歌告訴你：分手後最好的報復就是讓自己變得火辣且無法高攀。如果你喜歡那種能瞬間提升自信、讓你走路帶風的 BGM，這首充滿能量的舞曲會讓你覺得自己是世界的主角。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/5pNFibJLq7dvoDVIIcQBkn?utm_source=generator",
    },
  ],
  "0-1-1-2": [
    {
      title: "〈superstar〉Artemas",
      desc: "這首充滿黑暗美學的電子合成樂將情感和慾望以躁動的音符重擊心臟。像是將愛人化作心中完美的繆思女神，這首歌在描寫一段強烈到近乎上癮的迷戀關係，對方的觸碰、氣味、嘴唇像毒品般讓人上癮，既渴望又清醒，既沉醉又痛苦。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/2Zq3Trov36G0TtrUt4ZklL?utm_source=generator",
    },
    {
      title: "〈Just Break Up〉婁峻碩SHOU,TYSON YOSHI",
      desc: "這首歌聽起來像是在午夜用力呼吸——節奏有力卻不失靈動，像心跳忽快忽慢，被一股不可見的力量牽著走，歌聲帶著一絲哀傷與壓抑。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/3Kds30QtZgGTwvMaPqRQiU?utm_source=generator",
    },
    {
      title: "〈GO LUV URSELF〉karencici",
      desc: "這首歌聽起來像一首搖滾味的情緒發洩。讓整體多了幾分「帥」跟「不服氣」，旋律是有角度、有稜角的起伏，聽起來像一邊咬牙、一邊把話說開。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0ogcq4tghtilklBtRaxF4K?utm_source=generator",
    },
    {
      title: "〈TOMBOY〉I-DLE",
      desc: "粗糙的吉他 Riff 與直率的歌詞，狠狠撕碎了世俗對「完美女孩」的刻板印象。這不是為了討好誰而存在的旋律，而是一場拒絕被馴服的覺醒。這首充滿態度與中性魅力，渴望展現那種有點壞、不修邊幅卻帥氣爆表的真實自我。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/5L7MoCA875qqRJoKnGCxkE?utm_source=generator",
    },
  ],
  "2-1-0-1": [
    {
      title: "〈Heartbreak anniversary〉Givēon",
      desc: "你的選擇輕輕透出一種細緻的質感，像雨後殘留的霧氣，在邊緣處慢慢散開。情緒是柔的，帶著優雅的弧度，不急、不重，只留下被時間打磨過的光。其間又藏著一點清爽的氣息，像風把心事推動一小步。深處偶爾浮現暗色的紋理，並不鋒利，只是靜靜存在，讓整個氛圍多了一層深度。整體像一段輕聲的餘韻，安穩、透明，微微帶著陰影。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/3FAJ6O0NOHQV8Mc5Ri6ENp?utm_source=generator",
    },
    {
      title: "〈birds of a feather〉billie eillish",
      desc: "復古的合成器音色帶來一種溫暖的懷舊感。這首歌是對「永遠」的承諾，即便世界毀滅也要在一起的偏執。如果你相信靈魂伴侶，喜歡那種「無論生死都要黏在一起」的極致依戀，這首歌那種近乎信仰的深情會讓你感到溫暖又沈重。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6dOtVTDdiauQNBQEDOtlAB?utm_source=generator",
    },
    {
      title: "〈We fell in love in october〉girl in red",
      desc: "溫暖的吉他聲與真摯的低語，是秋日戀曲的代名詞。這首歌不追求華麗的技巧，只在乎那份想被對方看見的悸動。如果你嚮往那種純粹、溫柔，像是在落葉堆中並肩躺著的戀愛氛圍，這首歌會給你如同擁抱般的溫暖安全感。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6IPwKM3fUUzlElbvKw2sKl?utm_source=generator",
    },
    {
      title: "〈Hana〉Fujii Kaze",
      desc: "旋律柔軟又有點灰，伴隨著淡淡的憂鬱感，但鼓點與節奏線卻讓情緒不至於完全下沉。整體氛圍是安靜的動感，卻有一股持續推動的力道，讓人聽著彷彿在微微晃動的情緒裡前進。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/5RIQU2JDuXC4NkLiHNNMon?utm_source=generator",
    },
  ],
  "1-2-0-1": [
    {
      title: "〈Ditto〉NewJeans",
      desc: "冬日的霧氣與心跳般的 Baltimore Club 鼓點共振，營造出濃厚的校園懷舊感。歌詞中的 Ra-ta-ta-ta 是急促的心跳，描寫了想要確認心意卻又不敢太過張揚的青澀。如果你喜歡那種帶有空氣感、既溫暖又微涼的曖昧氛圍，這首歌能瞬間喚醒你記憶中某個冬天的心動與等待。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/5702raF31K9rvD6KZ6sCTo?utm_source=generator",
    },
    {
      title: "〈ヒッチコック〉ヨルシカ",
      desc: "聽起來輕快、明亮，像青春裡的大量問號同時被甩到天空。吉他和鼓點一路往前衝，但歌詞卻不停把人拉回那些關於生活、意義與「長大之後該怎麼辦」的執念。曲中沒有直接給答案，只把那種悶悶的無力與想逃跑的心包進旋律裡。像是在追著一個永遠抓不住的夏天。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/153lRbNmhQZVi69kbhmjY8?utm_source=generator",
    },
    {
      title: "〈vivi〉米津玄師",
      desc: "這是夜裡靜靜滑過的告別車窗，也是街燈下牢記的溫柔思念。米津玄師用細膩的旋律和稍帶沙啞的嗓音，把記憶、離別、無法言說的感情放入歌中。悲傷卻帶著美感，回憶雖殘缺但又真實。就像把過去放進行李後，坐上末班車離開，但那份心跳與淡淡溫柔，你會一直記得。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/3izOZelMZaCC0MMabvssCw?utm_source=generator",
    },
    {
      title: "〈未接來電〉莫宰羊",
      desc: "流暢的 Flow 包裹著失落的情緒，將「錯過」的遺憾具象化為那一通通未接來電。這不是聲嘶力竭的哭喊，而是淡淡的無奈。如果你曾在感情中感到無力回天，這種「想念卻無法觸及」的真實感，會刺痛你心中最柔軟的角落。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0TxUdhT7OWGLtcEgfKvMLJ?utm_source=generator",
    },
  ],
  "1-0-2-1": [
    {
      title: "〈Strangers〉Kenya Grace",
      desc: "輕盈急促的 DnB 鼓點搭配憂鬱的女聲，完美捕捉了現代速食愛情中「從親密變陌生」的失落感。節奏很快，卻讓人感到異常的孤單。若你常在夜間駕駛或獨自散步，這種如流水般滑順卻帶著涼意的節奏，能精準描繪出都市夜色中的疏離與流動。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/593knnQN4REEshx8th9zgK?utm_source=generator",
    },
    {
      title: "〈Toxic till the end〉ROSÉ",
      desc: "淒美的旋律訴說著一段互相折磨的關係。歌詞承認了關係的毒性，卻又無法割捨。這是一種清醒的沈淪。如果你曾深陷一段「相愛相殺」的感情，明知沒有結果卻消耗了最美好的年華，這首歌會像鏡子一樣映照出你最心碎的樣子。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/1z5ebC9238uGoBgzYyvGpQ?utm_source=generator",
    },
    {
      title: "〈終究還是因為愛〉TRASH",
      desc: "激昂的吉他 Solo 與嘶吼，是對生命最熱血的告白。歌詞傳達了「愛是所有痛苦與救贖的根源」。如果你是一個重感情、相信愛能戰勝一切的人，這首歌那種燃燒生命般的熱度，會讓你熱淚盈眶，感受到靈魂的共振。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/53yiHIP3ptxWtT4ambRcgb?utm_source=generator",
    },
    {
      title: "〈Only In My Mind〉Kenya Grace",
      desc: "輕盈的 DnB 節奏，這首歌強調了夢境般的沈浸感。歌詞模糊了現實與幻想的邊界，像是一場清",
      spotifyUrl:
        "https://open.spotify.com/embed/track/593knnQN4REEshx8th9zgK?utm_source=generator",
    },
  ],
  "1-0-1-2": [
    {
      title: "〈i don't use drugz〉iilliaa",
      desc: "Glitchcore 破碎的數位音效與迷離的人聲，營造出一種與現實解離的迷幻狀態。你不需要化學物質來麻痺自己，因為某個人、某段關係本身就是你最強烈的致幻劑。歌詞中那種反覆的呢喃，就像是試圖說服自己清醒，卻早已在對方的存在裡徹底淪陷。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/02nN7NRO8xZYFPaNvD7QUw?utm_source=generator",
    },
    {
      title: "〈Malibu Nights〉Lany",
      desc: "你的選擇帶著一種被夜色輕輕包住的質地，情緒安靜、克制，像在海邊聽見遠處回聲。悲傷是柔的，沒有重量地往下沉，像被霧慢慢拉開的心事。其間又透著少量冷色的光，是極簡、清透、帶點新潮感的留白。整體氛圍像是一段慢慢散去的夜晚，優雅而寂靜，在沉落與放下之間找到微弱卻真實的亮度。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/2YVa3CKE3yAyqFhfOcEre0?utm_source=generator",
    },
    {
      title: "〈你不會一輩子的愛上我〉TYSON YOSHI",
      desc: "這首歌帶著強烈節奏感，像在逼著情緒往前推，但旋律裡卻藏著一層淡淡的無力與遺憾。外表看似灑脫、動感，內裡卻像有什麼放不下的重量。聽起來既想掙脫、又有些疲憊，像在人生的高速運轉中突然意識到自己的心還在原地。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/5FbxrTeMrO3zbLe3uLbYH7?utm_source=generator",
    },
    {
      title: "〈重感情的廢物〉TRASH",
      desc: "直白粗暴的歌名，卻藏著最深情的自我剖析。用自嘲的方式承認自己的脆弱與放不下。如果你也是那個總是「愛得太深、傷得最重」的人，這首歌會是你最好的情緒出口。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/18skUiI0cqgeceCykNtK6r?utm_source=generator",
    },
  ],
  "1-1-1-1": [
    {
      title: "〈Last Christmas〉Wham!",
      desc: "你是一個很獨特的人，你不被風格定義。\n❅*⋆⍋*⋆*❅*⋆*⍋⋆*❅\n恭喜你觸發彩蛋，聖誕快樂\n❅*⋆⍋*⋆*❅*⋆*⍋⋆*❅",
      spotifyUrl:
        "https://open.spotify.com/embed/track/2FRnf9qhLbvw8fu4IBXx78?utm_source=generator",
    },
    {
      title: "〈All I Want for Christmas Is You〉Mariah Carey",
      desc: "你是一個很獨特的人，你不被風格定義。\n❅*⋆⍋*⋆*❅*⋆*⍋⋆*❅\n恭喜你觸發彩蛋，聖誕快樂\n❅*⋆⍋*⋆*❅*⋆*⍋⋆*❅",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0bYg9bo50gSsH3LtXe2SQn?utm_source=generator",
    },
    {
      title: "〈Santa Tell Me〉Ariana Grande",
      desc: "你是一個很獨特的人，你不被風格定義。\n❅*⋆⍋*⋆*❅*⋆*⍋⋆*❅\n恭喜你觸發彩蛋，聖誕快樂\n❅*⋆⍋*⋆*❅*⋆*⍋⋆*❅",
      spotifyUrl:
        "https://open.spotify.com/embed/track/0lizgQ7Qw35od7CYaoMBZb?utm_source=generator",
    },
    {
      title: "〈Mistletoe〉Justin Bieber",
      desc: "你是一個很獨特的人，你不被風格定義。\n❅*⋆⍋*⋆*❅*⋆*⍋⋆*❅\n恭喜你觸發彩蛋，聖誕快樂\n❅*⋆⍋*⋆*❅*⋆*⍋⋆*❅",
      spotifyUrl:
        "https://open.spotify.com/embed/track/7xapw9Oy21WpfEcib2ErSA?utm_source=generator",
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

function applyComboResultToResultPage() {
  // 判斷現在是不是 6-0（有沒有這個元素）
  const titleEl = document.getElementById("result-song-title");
  const iframeEl = document.getElementById("result-song-iframe");

  if (!titleEl || !iframeEl) {
    // 代表這一頁不是結果頁，就不用做下面的事
    return;
  }

  const choices = getUserChoices();
  const counts = getStyleCounts(choices);
  const result = pickResultByCombo(counts);
  if (!result) return;

  // 1. 換結果頁上的歌名
  titleEl.textContent = result.title;

  // 2. 換結果頁上的介紹
  const descEl = document.getElementById("result-song-desc");
  if (descEl) {
    descEl.textContent = result.desc;
  }

  // 3. 改 Spotify iframe src
  iframeEl.src = result.spotifyUrl;

  // 4. ✅ 把結果存到 localStorage，給紀念頁用
  localStorage.setItem("result_comboKey", buildComboKey(counts));
  localStorage.setItem("result_songTitle", result.title);
  localStorage.setItem("result_songDesc", result.desc);
  localStorage.setItem("result_spotifyUrl", result.spotifyUrl);
}

function applyComboResultToResultPage() {
  // 只在 6-0 結果頁執行
  const resultPage = document.getElementById("page-result");
  if (!resultPage) return;

  const titleEl = document.getElementById("result-song-title");
  const descEl = document.getElementById("result-song-desc");
  const iframeEl = document.getElementById("result-song-iframe");

  if (!titleEl || !descEl || !iframeEl) return;

  // 1. 讀使用者這一輪的選擇 → 算出風格數量
  const choices = getUserChoices(); // { case, cover, keychain, sticker }
  const counts = getStyleCounts(choices); // { sweet: ?, hiphop: ?, y3k: ?, dark: ? }

  // 2. 從這個組合對應的 RESULT_POOL 裡，隨機抽一首
  const result = pickResultByCombo(counts);
  if (!result) {
    console.warn("pickResultByCombo 沒有回傳結果");
    return;
  }

  // 3. 把這次抽到的結果顯示在 6-0
  titleEl.textContent = result.title || "";
  descEl.textContent = result.desc || ""; // 純文字先這樣，有需要再處理換行
  iframeEl.src = result.spotifyUrl || "";

  // 4. 同時存進 localStorage，給 7-0 紀念頁用
  const comboKey = buildComboKey(counts); // e.g. "4-0-0-0"
  localStorage.setItem("result_comboKey", comboKey);
  localStorage.setItem("result_songTitle", result.title || "");
  localStorage.setItem("result_songDesc", result.desc || "");
  localStorage.setItem("result_spotifyUrl", result.spotifyUrl || "");
}

function applySongResultToMemoryPage() {
  // 只在 7-0 紀念頁執行
  const memoryPage = document.getElementById("page-memory");
  if (!memoryPage) return;

  // 1. 把 6-0 存的結果讀出來
  const savedTitle = localStorage.getItem("result_songTitle");
  const savedDesc = localStorage.getItem("result_songDesc");
  const savedSpotifyUrl = localStorage.getItem("result_spotifyUrl");

  // 2. 抓頁面上的元素
  const nameEl = document.getElementById("memory-song-name");
  const descEl = document.getElementById("memory-song-desc"); // 如果有這個就塞
  const iframeEl = document.getElementById("memory-song-iframe");

  // 3. 塞回去
  if (nameEl && savedTitle) {
    nameEl.textContent = savedTitle;
  }

  if (descEl && savedDesc) {
    descEl.textContent = savedDesc;
  }

  if (iframeEl && savedSpotifyUrl) {
    iframeEl.src = savedSpotifyUrl;
  }
}

// =============================
// 7. DOM 載入完之後，一次統一呼叫
// =============================
document.addEventListener("DOMContentLoaded", function () {
  console.log("choices.js DOM ready");

  // 兩個頁面都要：CD 圖片疊起來
  applyChoicesToCDImages();

  // 只有 6-0 有 result-song-title / iframe，這裡才會真的做事
  applyComboResultToResultPage();

  // 只有 7-0 有 memory-song-name，這裡才會真的做事
  applySongResultToMemoryPage();
});
