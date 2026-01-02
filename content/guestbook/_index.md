---
title: "留言板"
date: 2026-01-02
layout: "page"
---

如果想對我說些什麼，歡迎使用[意見表單](https://forms.gle/y8tJ5kNVEyk9V1BN7)或[寫信給我](mailto:lpseven@gmail.com)

但我完全能理解留言顯示在別人網站上的樂趣，所以這裡弄了一個~~簡陋的~~留言板，歡迎隨意留言（需要 GitHub 帳號登入），如果我們有共同興趣，也歡迎交個朋友 XD

<script src="https://giscus.app/client.js"
        data-repo="LQChou/guestbook"
        data-repo-id="R_kgDOQymMCQ"
        data-category="Announcements"
        data-category-id="DIC_kwDOQymMCc4C0ftk"
        data-mapping="specific"
        data-term="guestbook"
        data-strict="0"
        data-reactions-enabled="0"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="https://lq7.tw/css/giscus-custom.css"
        data-lang="zh-TW"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>

<script>
function getGiscusTheme() {
  const theme = localStorage.getItem('pref-theme');
  return theme === 'light' 
    ? 'light' 
    : 'https://lq7.tw/css/giscus-custom.css';
}

function setGiscusTheme(theme) {
  const iframe = document.querySelector('iframe.giscus-frame');
  if (iframe) {
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: theme } } },
      'https://giscus.app'
    );
  }
}

window.addEventListener('storage', () => {
  setGiscusTheme(getGiscusTheme());
});

const toggle = document.getElementById('theme-toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    setTimeout(() => setGiscusTheme(getGiscusTheme()), 50);
  });
}
</script>