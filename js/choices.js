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
    dark: "./img/result_stickers_dark.png/",
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
      title: "〈Midnight Fiction〉ILLIT",
      desc: "夢境與現實的邊界逐漸變得模糊，這首充滿夢核（Dreamcore）美學的歌像是一場粉色的夜間漫遊。輕盈的節奏帶著童話般的失真感，彷彿世界只剩下你與你的幻想。你咬下一口沾滿糖霜的雲朵，探索並沈溺在旋律裡甜美的秘密，像是在做一場甜美又漫長的夢。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6QqrxJe1iQxwLY6he6FLFo?utm_source=generator",
    },
    {
      title: "〈Midnight Fiction〉ILLIT",
      desc: "夢境與現實的邊界逐漸變得模糊，這首充滿夢核（Dreamcore）美學的歌像是一場粉色的夜間漫遊。輕盈的節奏帶著童話般的失真感，彷彿世界只剩下你與你的幻想。你咬下一口沾滿糖霜的雲朵，探索並沈溺在旋律裡甜美的秘密，像是在做一場甜美又漫長的夢。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6QqrxJe1iQxwLY6he6FLFo?utm_source=generator",
    },
    {
      title: "〈Midnight Fiction〉ILLIT",
      desc: "夢境與現實的邊界逐漸變得模糊，這首充滿夢核（Dreamcore）美學的歌像是一場粉色的夜間漫遊。輕盈的節奏帶著童話般的失真感，彷彿世界只剩下你與你的幻想。你咬下一口沾滿糖霜的雲朵，探索並沈溺在旋律裡甜美的秘密，像是在做一場甜美又漫長的夢。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6QqrxJe1iQxwLY6he6FLFo?utm_source=generator",
    },
  ],

  "0-4-0-0": [
    {
      title: "〈Midnight Fiction〉ILLIT",
      desc: "夢境與現實的邊界逐漸變得模糊，這首充滿夢核（Dreamcore）美學的歌像是一場粉色的夜間漫遊。輕盈的節奏帶著童話般的失真感，彷彿世界只剩下你與你的幻想。你咬下一口沾滿糖霜的雲朵，探索並沈溺在旋律裡甜美的秘密，像是在做一場甜美又漫長的夢。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6QqrxJe1iQxwLY6he6FLFo?utm_source=generator",
    },
    {
      title: "〈Midnight Fiction〉ILLIT",
      desc: "夢境與現實的邊界逐漸變得模糊，這首充滿夢核（Dreamcore）美學的歌像是一場粉色的夜間漫遊。輕盈的節奏帶著童話般的失真感，彷彿世界只剩下你與你的幻想。你咬下一口沾滿糖霜的雲朵，探索並沈溺在旋律裡甜美的秘密，像是在做一場甜美又漫長的夢。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6QqrxJe1iQxwLY6he6FLFo?utm_source=generator",
    },
    {
      title: "〈Midnight Fiction〉ILLIT",
      desc: "夢境與現實的邊界逐漸變得模糊，這首充滿夢核（Dreamcore）美學的歌像是一場粉色的夜間漫遊。輕盈的節奏帶著童話般的失真感，彷彿世界只剩下你與你的幻想。你咬下一口沾滿糖霜的雲朵，探索並沈溺在旋律裡甜美的秘密，像是在做一場甜美又漫長的夢。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6QqrxJe1iQxwLY6he6FLFo?utm_source=generator",
    },
    {
      title: "〈Midnight Fiction〉ILLIT",
      desc: "夢境與現實的邊界逐漸變得模糊，這首充滿夢核（Dreamcore）美學的歌像是一場粉色的夜間漫遊。輕盈的節奏帶著童話般的失真感，彷彿世界只剩下你與你的幻想。你咬下一口沾滿糖霜的雲朵，探索並沈溺在旋律裡甜美的秘密，像是在做一場甜美又漫長的夢。",
      spotifyUrl:
        "https://open.spotify.com/embed/track/6QqrxJe1iQxwLY6he6FLFo?utm_source=generator",
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
