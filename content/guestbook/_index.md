---
title: "留言板"
date: 2026-01-03
layout: "page"
---

如果想私下對我說些什麼，歡迎使用[意見表單](https://forms.gle/y8tJ5kNVEyk9V1BN7)或[寫信給我](mailto:lpseven@gmail.com)

但我完全能理解留言顯示在別人網站上的樂趣，所以弄了一個留言板，歡迎隨意留言（不需帳號登入，需審核），也歡迎對任何文章發表感想喔！

<div id="guestbook">
  <form id="guestbook-form">
    <div class="form-row">
      <input type="text" id="name" placeholder="暱稱" required>
      <input type="url" id="website" placeholder="網站（選填）">
    </div>
    <textarea id="message" placeholder="留言內容" rows="4" required></textarea>
    <button type="submit" id="submit-btn">送出留言</button>
  </form>
  <div id="form-status"></div>
  <hr>
  <div id="comments-loading">載入留言中...</div>
  <div id="comments"></div>
</div>

<style>
#guestbook {
  max-width: 100%;
  color: var(--content);
}

#guestbook-form {
  margin-bottom: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-row input {
  flex: 1;
}

#guestbook input,
#guestbook textarea {
  width: 100%;
  padding: 10px;
  background: var(--code-bg); 
  border: 1px solid var(--tertiary);
  border-radius: 6px;
  color: var(--primary);
  font-size: 1rem;
  box-sizing: border-box;
}

#guestbook input:hover,
#guestbook textarea:hover {
  border-color: var(--secondary);
}

#guestbook input:focus,
#guestbook textarea:focus {
  border-color: var(--primary);
  outline: none;
}

#guestbook textarea {
  resize: vertical;
  margin-bottom: 1rem;
}

#submit-btn {
  background: var(--tertiary);
  border: 1px solid var(--tertiary);
  color: var(--primary);
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
}

#submit-btn:hover {
  background: var(--secondary);
}

#submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

#form-status {
  margin-top: 0.5rem;
  color: var(--secondary);
}

#guestbook hr {
  border: none;
  border-top: 1px solid var(--tertiary);
  margin: 2rem 0;
}

.comment {
  background: var(--code-bg);
  border: 1px solid var(--tertiary);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.comment:hover {
  border-color: var(--secondary);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: var(--secondary);
  font-size: 0.9rem;
}

.comment-name {
  color: var(--primary);
  font-weight: bold;
}

.comment-name a {
  color: var(--primary);
  text-decoration: none;
}

.comment-name a:hover {
  text-decoration: underline;
}

.comment-message {
  color: var(--primary);
  opacity: 0.9;
  line-height: 1.6;
}

.comment-reply {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--tertiary);
}

.reply-header {
  color: var(--secondary);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.reply-content {
  color: var(--secondary);
}

#comments-loading {
  color: var(--secondary);
}
</style>

<script>
const GIST_URL = 'https://api.github.com/gists/797fb5323495c38ab414b75140c2ce65';
const API_URL = 'https://script.google.com/macros/s/AKfycbweWPet3jsnEdnhrQ5yfRaJN2FkSDOO2pOKrC0WlPQ3ZTJI3qFMaWQzE05d32dIFO6R/exec';

async function loadComments() {
  const loading = document.getElementById('comments-loading');
  const container = document.getElementById('comments');
  
  try {
    const res = await fetch(`${GIST_URL}?t=${new Date().getTime()}`);
    const gist = await res.json();
    const rawData = JSON.parse(gist.files['guestbook.json'].content);
    
    // 更加穩定的日期解析邏輯
    const parseFlexibleDate = (str) => {
      if (!str) return 0;
      // 將字串中的上午/下午提取出來並轉換為 24 小時加成
      const isPM = str.includes('下午');
      const isAM = str.includes('上午');
      
      // 移除中文標記，將日期與時間標準化
      let cleanStr = str.replace(/[上午下午]/g, ' ').replace(/\//g, '-');
      let parts = cleanStr.trim().split(/\s+/); // 分割日期與時間
      
      if (parts.length < 2) return new Date(cleanStr).getTime() || 0;

      let datePart = parts[0];
      let timePart = parts[1];
      let [h, m, s] = timePart.split(':').map(Number);

      if (isPM && h < 12) h += 12;
      if (isAM && h === 12) h = 0;

      const finalStr = `${datePart} ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      return new Date(finalStr).getTime();
    };

    // 進行逆序排序 (最新的在最上)
    const comments = rawData.sort((a, b) => {
      return parseFlexibleDate(b.timestamp) - parseFlexibleDate(a.timestamp);
    });
    
    loading.style.display = 'none';
    
    if (comments.length === 0) {
      container.innerHTML = '<p style="color: var(--secondary);">還沒有留言，來當第一個吧！</p>';
      return;
    }
    
    container.innerHTML = comments.map(c => `
      <div class="comment">
        <div class="comment-header">
          <span class="comment-name">
            ${c.website ? `<a href="${c.website}" target="_blank" rel="noopener">${escapeHtml(c.name)}</a>` : escapeHtml(c.name)}
          </span>
          <span class="comment-time">${c.timestamp}</span>
        </div>
        <div class="comment-message">${escapeHtml(c.message)}</div>
        ${c.reply ? `
          <div class="comment-reply">
            <div class="reply-header">${c.replyBy || '站長'} 回覆於 ${c.replyTime || ''}</div>
            <div class="reply-content">${escapeHtml(c.reply)}</div>
          </div>
        ` : ''}
      </div>
    `).join('');
  } catch (err) {
    loading.textContent = '載入失敗，請重新整理頁面';
    console.error(err);
  }
}

document.getElementById('guestbook-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const status = document.getElementById('form-status');
  
  btn.disabled = true;
  btn.textContent = '送出中...';
  status.textContent = '';
  
  const data = {
    name: document.getElementById('name').value.trim(),
    website: document.getElementById('website').value.trim(),
    message: document.getElementById('message').value.trim()
  };
  
  try {
    await fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    status.textContent = '留言已送出，審核後會顯示在頁面上！';
    status.style.color = '#6c6';
    document.getElementById('guestbook-form').reset();
  } catch (err) {
    status.textContent = '送出失敗，請稍後再試';
    status.style.color = '#c66';
    console.error(err);
  }
  btn.disabled = false;
  btn.textContent = '送出留言';
});

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

loadComments();
</script>