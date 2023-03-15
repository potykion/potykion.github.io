---
hide:
  - navigation
title: Выпуск 11 от 2023-03-20
---

# [📰](../index.md) / выпуск 11

## 👨‍💻 Чистка почты в одну строку

```javascript
function cleanGmail() {
  GmailApp.getUserLabelByName("label").getThreads().forEach(t => t.moveToTrash());
}
```

Спасибо [Apps Script](../../notes/apps-script/index.md) за это
