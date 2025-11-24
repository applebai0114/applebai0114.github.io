// 【全域設定】
const STYLES = ["sweet", "hiphop", "y3k", "dark"]; // 風格名稱，用於儲存
let currentOptionIndex = 0; // 當前輪播選中的索引 (0, 1, 2, 3)

// =========================================================
// 【跨頁面資料儲存】
// =========================================================

/**
 * 將使用者選擇的樣式儲存到瀏覽器的 localStorage。
 * @param {string} type - 選擇的類別 (e.g., "case", "cover", "keychain", "sticker")
 * @param {number} choiceIndex - STYLES 陣列中的索引 (0-3)
 */
function saveChoice(type, choiceIndex) {
  const choiceValue = STYLES[choiceIndex];
  localStorage.setItem(`userChoice_${type}`, choiceValue);
  console.log(`已儲存 ${type}: ${choiceValue}`);
}

// =========================================================
// 【輪播操作函式】
// 這些函式必須是全域的，因為 HTML 中的 onclick 依賴它們。
// =========================================================

/**
 * 根據方向切換輪播項目 (左右箭頭)。
 * @param {number} direction - 1 (下一張) 或 -1 (上一張)
 */
window.changeOption = function (direction) {
  // 獲取當前頁面 ID (例如 "page-select-case")
  const activePage = document.querySelector(".page.active");
  if (!activePage) return;

  const count = STYLES.length;

  // 更新索引 (循環邏輯)
  currentOptionIndex = (currentOptionIndex + direction + count) % count;

  updateCarouselState(activePage.id);
};

/**
 * 跳轉到特定的輪播索引 (圓點指示器)。
 * @param {number} index - 目標索引 (0-3)
 */
window.jumpToOption = function (index) {
  const activePage = document.querySelector(".page.active");
  if (!activePage) return;

  currentOptionIndex = index;
  updateCarouselState(activePage.id);
};

/**
 * 更新轉盤狀態：根據 currentOptionIndex 套用 CSS class。
 * @param {string} pageId - 當前頁面的 ID (e.g., "page-select-case")
 */
function updateCarouselState(pageId) {
  const activePage = document.getElementById(pageId);
  if (!activePage) return;

  const items = activePage.querySelectorAll(".carousel-item");
  const dots = activePage.querySelectorAll(".dot");
  const count = STYLES.length;

  // 1. 更新圖片位置 (CSS class)
  items.forEach((item, index) => {
    item.className = "carousel-item"; // 重置所有 class

    let diff = (index - currentOptionIndex + count) % count;

    if (diff === 0) item.classList.add("pos-center");
    else if (diff === 1) item.classList.add("pos-right");
    else if (diff === 2) item.classList.add("pos-hidden");
    else if (diff === 3) item.classList.add("pos-left");
  });

  // 2. 更新圓點 Active 狀態
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentOptionIndex);
  });
}

// =========================================================
// 【初始化與頁面跳轉 (DOMContentLoaded)】
// =========================================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("我是阿呆");

  // --- 1. 確保當前頁面內容顯示 ---
  const currentPage = document.querySelector(".page");
  if (currentPage) {
    // 在多頁應用中，確保頁面載入時內容是可見的
    currentPage.classList.add("active");

    // --- 2. 輪播頁面初始化 ---
    // 只有當頁面包含輪播容器時才執行初始化
    if (currentPage.querySelector(".carousel-3d-wrapper")) {
      // 載入時執行一次，顯示第一張圖
      updateCarouselState(currentPage.id);
    }
  }

  // --- 3. GSAP 動畫 (通常只在首頁/入場頁需要) ---
  const coverText = document.querySelector(".cover_text");
  if (coverText) {
    let tl = gsap.timeline();
    tl.fromTo(
      coverText,
      { x: -2393.8953, y: 0 },
      { x: 0, y: 0, duration: 1.17 }
    );
  }

  const cover_text_two = document.querySelector(".cover_text_two");
  if (cover_text_two) {
    let tl = gsap.timeline();
    tl.fromTo(
      cover_text_two,
      { x: 2393.8953, y: 0 },
      { x: 0, y: 0, duration: 1.17 }
    );
  }

  // --- 4. 所有的按鈕事件處理 (MPA 邏輯) ---

  // 0.0 首頁（START!按鈕）
  const start_btn = document.getElementById("start_btn");
  if (start_btn) {
    start_btn.addEventListener("click", function () {
      window.location.href = "1-0介紹頁.html";
    });
  }

  // 1-0 介紹頁（開始裝飾按鈕）
  const start_decorate_btn = document.getElementById("start_decorate_btn");
  if (start_decorate_btn) {
    start_decorate_btn.addEventListener("click", function () {
      window.location.href = "2-0選擇外殼.html";
    });
  }

  // 2-0 選擇外殼 (NEXT 按鈕)
  const next_btn_first = document.getElementById("next_btn_first");
  if (next_btn_first) {
    next_btn_first.addEventListener("click", function () {
      saveChoice("case", currentOptionIndex); // 儲存選擇的外殼
      window.location.href = "3-0選擇封面.html";
    });
  }

  // 3-0 選擇封面 (NEXT 按鈕)
  const next_btn_secondary = document.getElementById("next_btn_secondary");
  if (next_btn_secondary) {
    next_btn_secondary.addEventListener("click", function () {
      saveChoice("cover", currentOptionIndex); // 儲存選擇的封面
      window.location.href = "4-0選擇鑰匙圈.html";
    });
  }

  // 4-0 選擇鑰匙圈 (NEXT 按鈕)
  const next_btn_third = document.getElementById("next_btn_third");
  if (next_btn_third) {
    next_btn_third.addEventListener("click", function () {
      saveChoice("keychain", currentOptionIndex); // 儲存選擇的鑰匙圈
      window.location.href = "5-0選擇貼紙.html";
    });
  }

  // 5-0 選擇貼紙 (NEXT 按鈕)
  const next_btn_forth = document.getElementById("next_btn_forth");
  if (next_btn_forth) {
    next_btn_forth.addEventListener("click", function () {
      saveChoice("sticker", currentOptionIndex); // 儲存選擇的貼紙
      window.location.href = "6-0結果頁.html";
    });
  }

  // 6-0 結果頁 (紀念頁按鈕)
  const memory_btn = document.getElementById("memory_btn");
  if (memory_btn) {
    memory_btn.addEventListener("click", function () {
      // 注意：這裡應該先執行 calculateResult()
      // 由於 calculateResult 函式邏輯在舊程式碼中依賴 DOM 元素，
      // 這裡假設結果已經在 6-0 頁面載入時計算完畢
      window.location.href = "7-0紀念頁.html";
    });
  }

  // 7-0 紀念頁 (回首頁按鈕)
  const fp_btn = document.getElementById("fp_btn");
  if (fp_btn) {
    fp_btn.addEventListener("click", function () {
      window.location.href = "index.html";
    });
  }
});
