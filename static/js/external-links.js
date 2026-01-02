document.addEventListener("DOMContentLoaded", function () {
  // PaperMod 的文章內容區塊通常是 .post-content
  // 只掃描文章正文裡的連結，不影響選單、頁尾、側欄等
  const scope = document.querySelector(".post-content");
  if (!scope) return;

  const links = scope.querySelectorAll('a[href]');

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    // 排除：錨點、相對路徑、mailto、tel、javascript
    if (
      href.startsWith("#") ||
      href.startsWith("/") ||
      href.startsWith("./") ||
      href.startsWith("../") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    ) {
      return;
    }

    // 只處理 http/https 絕對連結
    if (!href.startsWith("http://") && !href.startsWith("https://")) return;

    // 用 URL 解析，判斷是否為外部網域
    let url;
    try {
      url = new URL(href);
    } catch (e) {
      return;
    }

    // hostname 不同才視為外部
    if (url.hostname !== window.location.hostname) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
});
