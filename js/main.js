// 【全域設定】
const STYLES = ["sweet", "hiphop", "y3k", "dark"]; // 風格名稱，用於儲存
let currentOptionIndex = 0; // 當前輪播選中的索引 (0, 1, 2, 3)
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
/** 播放成功音效並延遲跳轉 (用於 START 按鈕) */
const DELAY_BEFORE_REDIRECT_MS = 600;

function playStartSoundAndRedirect(targetUrl) {
  const startSound = document.getElementById("startSound");
  if (startSound) {
    startSound.currentTime = 0;
    startSound.play().catch(() => {});
  }

  setTimeout(function () {
    window.location.href = targetUrl;
  }, DELAY_BEFORE_REDIRECT_MS);
}
// =========================================================
// 【更新輪播畫面】
// 中間那張 = 使用者目前選到的選項
// =========================================================
function updateCarousel(index) {
  const wrapper = document.querySelector(".carousel-3d-wrapper");
  if (!wrapper) return;

  const items = wrapper.querySelectorAll(".carousel-item");
  const dots = document.querySelectorAll(".dot");
  const total = items.length;

  if (!total) return;

  // 讓索引循環
  currentOptionIndex = (index + total) % total;

  // 先清掉所有 radio
  items.forEach((item) => {
    const input = item.querySelector('input[type="radio"]');
    if (input) input.checked = false;
  });

  // 更新每一張卡片的位置
  items.forEach((item, i) => {
    item.classList.remove("pos-center", "pos-left", "pos-right", "pos-hidden");

    const input = item.querySelector('input[type="radio"]');

    if (i === currentOptionIndex) {
      item.classList.add("pos-center");
      if (input) input.checked = true;
    } else if (i === (currentOptionIndex - 1 + total) % total) {
      item.classList.add("pos-left");
    } else if (i === (currentOptionIndex + 1) % total) {
      item.classList.add("pos-right");
    } else {
      item.classList.add("pos-hidden");
    }
  });

  // 更新圓點狀態
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentOptionIndex);
  });
}

// =========================================================
// 【提供給 HTML onclick 使用的全域函式】
// =========================================================
window.changeOption = function (direction) {
  updateCarousel(currentOptionIndex + direction);
};

window.jumpToOption = function (index) {
  updateCarousel(index);
};

// =========================================================
// 【頁面載入後初始化所有事件】
// =========================================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("輪播初始化成功");

  const currentPage = document.querySelector(".page");
  if (currentPage) {
    currentPage.classList.add("active");
  }

  const wrapper = document.querySelector(".carousel-3d-wrapper");
  if (!wrapper) return;

  const items = wrapper.querySelectorAll(".carousel-item");
  const prevBtn = document.querySelector(".arrow-btn.prev");
  const nextBtn = document.querySelector(".arrow-btn.next");
  const dots = document.querySelectorAll(".dot");

  // ==============================
  // 1. 桌機左右按鈕
  // ==============================

  // ==============================
  // 2. 點圓點切換
  // ==============================
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateCarousel(index);
    });
  });

  // ==============================
  // 3. 點圖片切換
  // 中間圖：只保留選取
  // 左右圖：切到中間
  // ==============================
  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (index === currentOptionIndex) {
        const input = item.querySelector('input[type="radio"]');
        if (input) input.checked = true;
      } else {
        updateCarousel(index);
      }
    });
  });

  // ==============================
  // 4. 手機滑動
  // ==============================
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let isDragging = false;
  const swipeThreshold = 40;

  wrapper.addEventListener(
    "touchstart",
    (e) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      endX = startX;
      isDragging = true;
    },
    { passive: true },
  );

  wrapper.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;

      const touch = e.touches[0];
      endX = touch.clientX;

      const deltaX = Math.abs(touch.clientX - startX);
      const deltaY = Math.abs(touch.clientY - startY);

      // 水平滑動比較明顯時，避免整頁跟著上下亂捲
      if (deltaX > deltaY) {
        e.preventDefault();
      }
    },
    { passive: false },
  );

  wrapper.addEventListener("touchend", () => {
    if (!isDragging) return;

    const diffX = endX - startX;

    if (Math.abs(diffX) > swipeThreshold) {
      if (diffX < 0) {
        updateCarousel(currentOptionIndex + 1);
      } else {
        updateCarousel(currentOptionIndex - 1);
      }
    }

    isDragging = false;
  });

  // ==============================
  // 5. 初始化第一張
  // ==============================
  updateCarousel(0);
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
  const warningcase = document.getElementById("case-warning");
  let warningcaseTimer = null;

  if (next_btn_first) {
    next_btn_first.addEventListener("click", function () {
      // 抓目前在中間的那張圖
      const selectedItem = document.querySelector(".carousel-item.pos-center");

      console.log("selectedItem:", selectedItem);

      // 沒抓到中間圖就顯示提醒
      if (!selectedItem) {
        if (warningcase) {
          warningcase.classList.add("show");
          clearTimeout(warningcaseTimer);
          warningcaseTimer = setTimeout(() => {
            warningcase.classList.remove("show");
          }, 2000);
        }
        return;
      }

      // 抓所有 carousel item
      const items = document.querySelectorAll(".carousel-item");
      const chosenIndex = Array.from(items).indexOf(selectedItem);

      console.log("chosenIndex:", chosenIndex);

      // 如果 selectedItem 不在 items 裡，也直接停止
      if (chosenIndex === -1) {
        console.log("找不到 chosenIndex");
        return;
      }

      // 同步勾選中間那張的 radio
      const selectedRadio = selectedItem.querySelector("input[type='radio']");
      if (selectedRadio) {
        selectedRadio.checked = true;
        console.log("selected value:", selectedRadio.value);
      }

      // 儲存選擇
      saveChoice("case", chosenIndex);
      playStartSoundAndRedirect("3-0選擇封面.html");
    });
  }
  // 3-0 選擇封面 (NEXT 按鈕)
  const next_btn_secondary = document.getElementById("next_btn_secondary");
  const warningcover = document.getElementById("cover-warning");
  let warningcoverTimer = null;

  if (next_btn_secondary) {
    next_btn_secondary.addEventListener("click", function () {
      // 1. 檢查有沒有選到任一個 radio
      const checkedRadio = document.querySelector(
        ".carousel-item input[type='radio']:checked",
      );

      if (!checkedRadio) {
        // 沒有選 → 顯示小提醒 2 秒
        if (warningcover) {
          warningcover.classList.add("show");
          clearTimeout(warningcoverTimer);
          warningcoverTimer = setTimeout(() => {
            warningcover.classList.remove("show");
          }, 2000);
        }
        return; // 直接擋掉，不跳頁
      }

      //有選
      const radios = document.querySelectorAll(
        ".carousel-item input[type='radio']",
      );
      const chosenIndex = Array.from(radios).indexOf(checkedRadio);

      //封面頁 → 存成 cover
      saveChoice("cover", chosenIndex);
      playStartSoundAndRedirect("4-0選擇鑰匙圈.html");
    });
  }

  // 4-0 選擇鑰匙圈 (NEXT 按鈕)
  const next_btn_third = document.getElementById("next_btn_third");
  const warningkeychin = document.getElementById("keychin-warning");
  let warningkeychinTimer = null;

  if (next_btn_third) {
    next_btn_third.addEventListener("click", function () {
      // 1. 檢查有沒有選到任一個 radio
      const checkedRadio = document.querySelector(
        ".carousel-item input[type='radio']:checked",
      );

      if (!checkedRadio) {
        // 沒有選 → 顯示小提醒 2 秒
        if (warningkeychin) {
          warningkeychin.classList.add("show");
          clearTimeout(warningkeychinTimer);
          warningkeychinTimer = setTimeout(() => {
            warningkeychin.classList.remove("show");
          }, 2000);
        }
        return; // 直接擋掉，不跳頁
      }

      //有選
      const radios = document.querySelectorAll(
        ".carousel-item input[type='radio']",
      );
      const chosenIndex = Array.from(radios).indexOf(checkedRadio);

      // 鑰匙圈頁 → 存成 keychain
      saveChoice("keychain", chosenIndex);
      playStartSoundAndRedirect("5-0選擇貼紙.html");
    });
  }

  // 5-0 選擇貼紙 (NEXT 按鈕)
  const next_btn_forth = document.getElementById("next_btn_forth");
  const warningsticker = document.getElementById("sticker-warning");
  let warningstickerTimer = null;

  if (next_btn_forth) {
    next_btn_forth.addEventListener("click", function () {
      // 1. 檢查有沒有選到任一個 radio
      const checkedRadio = document.querySelector(
        ".carousel-item input[type='radio']:checked",
      );

      if (!checkedRadio) {
        // 沒有選 → 顯示小提醒 2 秒
        if (warningsticker) {
          warningsticker.classList.add("show");
          clearTimeout(warningstickerTimer);
          warninstickerTimer = setTimeout(() => {
            warningsticker.classList.remove("show");
          }, 2000);
        }
        return; // 直接擋掉，不跳頁
      }

      //有選
      const radios = document.querySelectorAll(
        ".carousel-item input[type='radio']",
      );
      const chosenIndex = Array.from(radios).indexOf(checkedRadio);

      // 貼紙頁 → 存成 sticker
      saveChoice("sticker", chosenIndex);
      playStartSoundAndRedirect("6-0結果頁.html");
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
