---
title: JS 压缩工具
date: 2021-05-21 16:06:40
tags: [Node]
category: Deploy
---

安装uglifyjs

```Bash
npm install uglify-js -g
```

压缩

```Bash
uglifyjs file.js -m -o file.min.js  //-m 代表将参数简化一次
```
