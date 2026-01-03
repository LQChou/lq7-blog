---
title: "做一個留言板"
date: 2026-01-03T20:59:00+08:00
---

　　起因是看到[資工小廢物JN](https://blog.giveanornot.com/)裡面的留言板[誰來我家](https://blog.giveanornot.com/guestbook/)，覺得讓 Blog 有一個大家可以留下足跡的地方也是不錯（自古以來留言板就有一種魔力），所以就開始 survey 留言板要怎麼搞。我的需求和 JN 差不多：

- 輕量化好維護
- 不需要登入好留言
- 簡潔美觀

　　但最大差異是我不想自架。所以靠著以上幾點和我聘僱的各大助理（ＡＩ）來回溝通了一陣後，得到的結論是不自架很難，助理們推薦我以下兩個方案：

- **開放式**（任何人都能留言）→ Cusdis
- **技術圈友善**（需 GitHub 登入但功能更好）→ giscus

　　所以一開始我用 Cusdis 搞了一個不用登入的留言板，但立刻發現它只能 iframe 嵌入，不管怎麼調都無法通過我的審美，於是只好退而求其次使用依附在 Github 下的 giscus。但需要有 Github帳號這點也讓我很不舒服（雖然許多 Blog 主應該都有，但把路人排除在外還是有違我的初衷）。

　　就在我快要放棄的時候，居然在[廢文小天地](https://trashposts.com/)（一點都不廢！）看到了[ＤＩＹ網站留言簿](https://trashposts.com/blog/build-my-own-guestbook/)這篇文章！

　　它使用了 Google Sheets 當後台 + GitHub Gist 當快取，不需要登入就能留言，也不需要自己架服務，流程是這樣：

- 訪客讀取留言 → 直接從 GitHub Gist（JSON 檔）抓資料
- 訪客提交留言 → 送到 Google Apps Script
- Apps Script → 存入 Google 試算表
- 你審核 → 在 Google 試算表標記「通過」
- Apps Script → 把通過的留言同步到 GitHub Gist

　　在我立刻跟我那群助理說這個好消息後，它們立刻同意了這個架構，折騰了一陣就在剛剛終於搞定了！

　　感謝[廢文小天地](https://trashposts.com/)與[資工小廢物JN](https://blog.giveanornot.com/)，兩個廢字輩的 Blog（XD？）卻提供了我一點也不廢的靈感，讓我的網站也有[乾淨快速的留言板了](/guestbook/)！謝謝兩位！

　　有空的話我會再請助理詳細發一篇文章告訴各位詳細步驟，但其實只要有上面的流程，大家如果也有聘請助理的話，應該也就能幫各位完成類似的留言板了 XD