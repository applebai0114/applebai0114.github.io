// soundeffect.js

document.addEventListener("DOMContentLoaded", function () {
  // =========================================================
  // 【全域配置】
  // =========================================================
  // 固定的音效文件路徑 (請確認您的檔案在這個位置)
  const SOUND_SRC = "./audio/btn_sound_start.mp3";
  // 設定音效播放完成後，延遲多久再跳轉 (單位：毫秒/ms)
  const DELAY_BEFORE_REDIRECT_MS = 600;

  // 獲取音效元素
  const startSound = document.getElementById("startSound");
  const optionSound = document.getElementById("optionSound");
  const errorSound = document.getElementById("errorSound");

  /**
   * 播放錯誤音效 (用於 NEXT 按鈕的檢查失敗時)
   */
  function playErrorSound() {
    if (errorSound) {
      errorSound.currentTime = 0;
      errorSound.play().catch((e) => console.warn("錯誤音效播放失敗:", e));
    }
  }

  /**
   * 處理音效播放、阻止其他事件，並延遲跳轉 (用於無條件按鈕)
   * @param {Event} event - 點擊事件物件
   * @param {string} targetUrl - 目標跳轉 URL
   */
  function handleSoundJump(event, targetUrl) {
    // **關鍵步驟：阻止所有其他點擊事件和默認行為**
    // 阻止 main.js 中為這個按鈕設定的立即跳轉邏輯執行
    event.stopImmediatePropagation();
    event.preventDefault();

    if (startSound) {
      startSound.currentTime = 0;
      startSound.play().catch((error) => {
        console.warn("音效播放失敗或被瀏覽器阻止:", error);
      });
    }

    // 延遲跳轉
    setTimeout(function () {
      window.location.href = targetUrl;
    }, DELAY_BEFORE_REDIRECT_MS);
  }

  // =========================================================
  // 【無條件按鈕處理 (音效播完再跳轉)】
  // 這些按鈕會使用 event.stopImmediatePropagation() 阻止 main.js 立即跳轉
  // =========================================================

  // 1. 0-0 首頁（start_btn）-> 1-0介紹頁.html
  const startButton = document.getElementById("start_btn");
  if (startButton) {
    // 使用 capture 階段確保比 main.js 中的事件更早執行
    startButton.addEventListener(
      "click",
      function (event) {
        handleSoundJump(event, "1-0介紹頁.html");
      },
      true
    );
  }

  // 2. 1-0 介紹頁（start_decorate_btn）-> 2-0選擇外殼.html
  const startDecorateBtn = document.getElementById("start_decorate_btn");
  if (startDecorateBtn) {
    startDecorateBtn.addEventListener(
      "click",
      function (event) {
        handleSoundJump(event, "2-0選擇外殼.html");
      },
      true
    );
  }

  // 3. 6-0 結果頁（memory_btn）-> 7-0紀念頁.html
  const memoryBtn = document.getElementById("memory_btn");
  if (memoryBtn) {
    memoryBtn.addEventListener(
      "click",
      function (event) {
        handleSoundJump(event, "7-0紀念頁.html");
      },
      true
    );
  }

  // 4. 7-0 紀念頁（fp_btn）-> index.html
  const fpBtn = document.getElementById("fp_btn");
  if (fpBtn) {
    fpBtn.addEventListener(
      "click",
      function (event) {
        handleSoundJump(event, "index.html");
      },
      true
    );
  }

  // =========================================================
  // 【有條件按鈕處理 (錯誤音效)】
  // 這些按鈕只負責播放錯誤音效，讓 main.js 決定是否跳轉
  // =========================================================

  // 由於這些按鈕在 main.js 中有檢查 radio 的邏輯，我們只添加錯誤音效的判斷。

  // 輔助函式：檢查 radio 是否被選中
  function isRadioChecked() {
    // 這是您在 main.js 中檢查的 selector，通用於所有選擇頁
    return document.querySelector(".carousel-item input[type='radio']:checked");
  }

  // 1. 2-0 選擇外殼 (next_btn_first)
  const nextBtnFirst = document.getElementById("next_btn_first");
  if (nextBtnFirst) {
    nextBtnFirst.addEventListener("click", function () {
      if (!isRadioChecked()) {
        playErrorSound();
      }
    });
  }

  // 2. 3-0 選擇封面 (next_btn_secondary)
  const nextBtnSecondary = document.getElementById("next_btn_secondary");
  if (nextBtnSecondary) {
    nextBtnSecondary.addEventListener("click", function () {
      if (!isRadioChecked()) {
        playErrorSound();
      }
    });
  }

  // 3. 4-0 選擇鑰匙圈 (next_btn_third)
  const nextBtnThird = document.getElementById("next_btn_third");
  if (nextBtnThird) {
    nextBtnThird.addEventListener("click", function () {
      if (!isRadioChecked()) {
        playErrorSound();
      }
    });
  }

  // 4. 5-0 選擇貼紙 (next_btn_forth)
  const nextBtnForth = document.getElementById("next_btn_forth");
  if (nextBtnForth) {
    nextBtnForth.addEventListener("click", function () {
      if (!isRadioChecked()) {
        playErrorSound();
      }
    });
  }
});
