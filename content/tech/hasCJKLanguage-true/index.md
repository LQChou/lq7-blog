---
title: "文章預估閱讀時間異常"
date: 2026-01-07T11:00:00+08:00
tags: ["技術"]
cover:
  image: "image 1.png"
  relative: true
  hidden: true
---

　　我目前 Blog 的架構是 Hugo + Papermod，然後使用 Github Pages 發布。我的 hugo.toml 的「文章預估閱讀時間」（ShowReadingTime = true）一直都有開著，但在剛剛終於發現不對勁，原因是那個時間不管怎樣都是1分鐘，我那篇[八千字的長文](/thinking/magicians/)，居然也給我寫2分鐘。

　　於是我就問了我的助理一號（ChatGPT）：「我這篇文章大概8000多字，但他卻顯示2分鐘，想請問問題出在哪。」

　　結果，他跟我喇了一堆：

![image.png](image.png)

　　真的假的啦，怎麼想都覺得不可能這麼麻煩，於是立刻跑去和助理二號（Gemini）求證，結果：

![image.png](image%201.png)

　　這才對嘛。hasCJKLanguage = true，我的所有文章預估閱讀時間都正常了。

　　回去罵了助理一號後，助理一號道歉了。沒關係，下次不要再犯就好，~~我也沒辦法扣你薪水~~。XD