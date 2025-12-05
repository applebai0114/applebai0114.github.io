// =========================================================
// 【打字動畫核心函式 - 全域可呼叫】
// =========================================================

/**
 * 實現打字機動畫效果 (已優化 <br> 標籤處理)
 */
function typeWriter(element, rawHTML, delay, callback) {
  let charIndex = 0;
  const brTag = "<br>";
  element.innerHTML = ""; // 確保動畫前清空

  const timer = setInterval(() => {
    if (charIndex >= rawHTML.length) {
      clearInterval(timer);
      if (callback) {
        callback();
      }
      return;
    }

    // 檢查是否遇到 <br> 標籤
    if (rawHTML.substring(charIndex, charIndex + brTag.length) === brTag) {
      element.innerHTML += brTag;
      charIndex += brTag.length; // 跳過 <br> 標籤
    } else {
      // 添加普通字符
      element.innerHTML += rawHTML.charAt(charIndex);
      charIndex++;
    }
  }, delay);
}

// --- 3. 啟動打字動畫 (針對 1-0 介紹頁) ---
const topTextBlockElement = document.querySelector(".text-block-top h2");
const middleTextBlockElement = document.querySelector(".text-block-middle p");

if (topTextBlockElement && middleTextBlockElement) {
  let h2RawText = topTextBlockElement.textContent.trim();
  let pRawHTML = middleTextBlockElement.innerHTML.trim();

  // 啟動前清空元素
  topTextBlockElement.textContent = "";
  middleTextBlockElement.innerHTML = "";

  // 序列 A: 標題動畫
  typeWriter(topTextBlockElement, h2RawText, 80, function () {
    // 標題動畫完成後，延遲一小段時間再開始內文動畫
    setTimeout(function () {
      // 序列 B: 內文動畫
      typeWriter(middleTextBlockElement, pRawHTML, 60);
    }, 500);
  });
}

// ---  GSAP 動畫 (通常只在首頁/入場頁需要) ---
const screenW = window.innerWidth;

// ===============================
// 左邊大字（cover_text）
// ===============================
const leftText = document.querySelector(".cover_text");
if (leftText) {
  gsap.set(leftText, { x: -screenW }); // 起始位置在左外側

  let tlLeft = gsap.timeline({ repeat: -1 });

  tlLeft
    .to(leftText, { x: 0, duration: 1.2, ease: "power2.out" }) // 左 → 中
    .to({}, { duration: 1 }) // 中停
    .to(leftText, { x: screenW, duration: 1.2, ease: "power2.in" }) // 中 → 右外
    .to({}, { duration: 0.5 }) // 出畫面後停留時間
    .set(leftText, { x: screenW })
    .to(leftText, { x: 0, duration: 1.2, ease: "power2.out" }) // 右 → 中
    .to({}, { duration: 1 }) // 中停
    .to(leftText, { x: -screenW, duration: 1.2, ease: "power2.in" }) // 中 → 左外
    .to({}, { duration: 0.5 }); // 出畫面後停留時間
}

// ===============================
// 右邊大字（cover_text_two）
// ===============================
const rightText = document.querySelector(".cover_text_two");
if (rightText) {
  gsap.set(rightText, { x: screenW }); // 起始位置在右外側

  let tlRight = gsap.timeline({ repeat: -1 });

  tlRight
    .to(rightText, { x: 0, duration: 1.2, ease: "power2.out" }) // 右 → 中
    .to({}, { duration: 1 }) // 中停
    .to(rightText, { x: -screenW, duration: 1.2, ease: "power2.in" }) // 中 → 左外
    .to({}, { duration: 0.5 }) // 出畫面後停留
    .set(rightText, { x: -screenW })
    .to(rightText, { x: 0, duration: 1.2, ease: "power2.out" }) // 左 → 中
    .to({}, { duration: 1 }) // 中停
    .to(rightText, { x: screenW, duration: 1.2, ease: "power2.in" }) // 中 → 右外
    .to({}, { duration: 0.5 }); //  出畫面後停留
}
