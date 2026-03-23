---
title: "Clash for Windows无缝移植mihomo内核指南"
author: jiang068
type: post
date: 2026-03-22T22:07:28+08:00
draft: false
url: /t/166
featured_image: 
argon_hide_readingtime:
  - 'false'
argon_meta_simple:
  - 'false'
argon_first_image_as_thumbnail:
  - default
argon_show_post_outdated_info:
  - default
views:
  - 95
categories:
  - demo

tags:
  - Clash
  - Mihomo
  - 逆向

---

Clash for Windows (CFW) 虽然已经停止维护，但其经典的 UI 和交互依然被许多用户偏爱。如今社区的主力内核已经转向 **Mihomo (原 Clash.Meta)**，直接替换内核文件会导致各种“水土不服”（连不上、显示 Unknown、日志乱码等）。

本教程将通过拆解和修改 CFW 的底层渲染代码 (`renderer.js`)，教你如何从代码层面完美根治这些排异反应，实现 100% 的无缝融合。

## 🛠️ 准备工作

1. **环境要求**：需要 Node.js 环境。当然也可以使用 winasar 程序解压、打包 asar 文件，就不用 Node.js 了，也行。
2. **安装 asar 工具**：
   ```bash
   npm install -g asar
   ```
3. **代码编辑器**：推荐 VS Code（因为 `renderer.js` 是压缩成一行的，建议在 VS Code 中格式化后操作，或直接使用正则/关键字搜索）。
4. **解包 CFW**：
   进入 CFW 安装目录的 `resources` 文件夹，将 `app.asar` 解包：
   ```bash
   asar extract app.asar ./temp_app
   ```
   后续所有的修改，都在 `temp_app/dist/electron/renderer.js` 中进行。

---

## 💉 一：物理替换内核

1. 前往 [Mihomo GitHub Releases](https://github.com/MetaCubeX/mihomo/releases) 下载对应系统架构的内核。
2. 进入 CFW 的内核目录（Windows 下通常为 `resources/static/files/win/x64/`，Linux 视安装方式而定）。
3. **替换文件**：将原版的 `clash-win64.exe`（或 `clash-linux-amd64`）备份，将下载的 Mihomo 内核重命名替换进去。
4. **删除签名验证**：删除同目录下的 `.sign` 结尾的签名文件（如 `clash-win64.exe.sign`），防止原版 CFW 校验内核签名失败。

---

## 💉 二：根治配置文件目录偏移

**问题症状**：Mihomo 默认读取 `~/.config/mihomo` 目录，而 CFW 生成的配置在 `~/.config/clash`，导致内核找不到配置，无法代理。

**代码手术**：强制 CFW 在启动内核时，永远带上 `-d` 参数指定正确的配置目录。

1. 在 `renderer.js` 中搜索：
   ```javascript
   l=[],e.portableMode&&(l=["-d",e.clashPath])
   ```
2. **修改为**：
   ```javascript
   l=["-d",e.clashPath]
   ```
*(原理：去掉了便携模式的判断条件，一刀切地把 CFW 的配置路径喂给内核。无需再用系统 mklink 软链接打补丁。)*

---

## 💉 三：UI 身份正名（修复内核显示 Unknown）

**问题症状**：CFW 左下角内核版本显示 `Unknown`。
**原因**：CFW 请求 `/version` API 时，死板地要求返回的 JSON 必须同时包含 `version` 和 `premium` 两个字段。Mihomo 没有 `premium` 字段，只有 `meta: true`。

1. 在 `renderer.js` 中搜索版本解析逻辑：
   ```javascript
   e.clashCoreVersion=void 0!==o&&void 0!==s?"".concat(s," ").concat(o?"Premium":""):"Unknown"
   ```
2. **修改为（引入 Mihomo 专属标识）**：
   ```javascript
   e.clashCoreVersion=s?s+(n.meta?" Mihomo":o?" Premium":""):"Unknown"
   ```
*(效果：重启后 CFW 内核版本将显示类似 `v1.18.3 Mihomo` 的字样。)*

---

## 💉 四：重塑日志解析器（修复日志错位与乱码）

**问题症状**：Mihomo 的日志把规则、节点和时间戳全揉成了一句话（Logrus 格式），导致 CFW 的日志面板失去彩色标签，且由于长度过长导致排版强行换行。

此阶段需要动两处刀子：**实时日志**和**历史日志**。

### 1. 实时日志净化 (WebSocket 推送)
将 Mihomo 揉在一起的日志重新肢解为 `msg`、`rule` 和 `proxy` 键值对，以适配 CFW 的彩色标签渲染。
1. 替换 `parseLog`  

   在 `renderer.js` 中精确搜索搜索这段原代码（完全匹配）：
   ```javascript
   parseLog:function(e){var t=this,i=e.level,n=e.message,o=e.time,s=e.fields;this.listData=[].concat(l()(this.listData),[{type:i,msg:n,time:o||p()().format("HH:mm:ss"),fields:s.filter((function(e){var i=e.key,n=e.value;return"mode"!==i&&n!==t.mode})),id:(0,v.uniqueId)()}])}
   ```
   将整个解析模块完整替换为：
   ```javascript
   parseLog:function(e){var t=this,i=(e.level||"").toLowerCase(),n=e.message||e.payload||"",o=e.time,s=e.fields||[];"warning"===i&&(i="warn"),"err"===i&&(i="error");var m=n.match(/^(\[.*?\])\s+(.*?)\s+match\s+(.*?)\s+using\s+(.*)$/),me=n.match(/^(\[.*?\])\s*dial\s+(.*?)\s*\(match\s+(.*?)\)\s+(.*?)\s+error:\s*(.*)$/);if(m){n=m[1].trim()+" "+m[2].trim();s=[{key:"rule",value:m[3].trim()},{key:"proxy",value:m[4].trim()},{key:"rAddr",value:m[2].split("-->")[1]?m[2].split("-->")[1].trim():""}]}else if(me){var rl=me[3].replace(/\/$/,"").trim();n=me[1].trim()+" "+me[4].trim()+" error: "+me[5].trim(),i="error",s=[{key:"rule",value:rl},{key:"proxy",value:me[2].trim()},{key:"rAddr",value:me[4].split("-->")[1]?me[4].split("-->")[1].trim():""}]}this.listData=[].concat(l()(this.listData),[{type:i,msg:n,time:o||p()().format("HH:mm:ss"),fields:s.filter((function(e){var i=e.key,n=e.value;return"mode"!==i&&n!==t.mode})),id:(0,v.uniqueId)()}])}
   ```
2. 替换 `parseStringLog`  

   在代码里搜索这段原代码（完全匹配）：
   ```javascript
   parseStringLog:function(e){var t=this,i=e.payload,n=e.type,o=e.time,s="";new RegExp("^([^=]+)( .+=|$)").test(i)&&(s=RegExp.$1.trim());var a=l()(i.matchAll(/([^\s]+?)=([^=]+)(?= .+=|$)/g)).reduce((function(e,i){var n=r()(i,3),o=n[1],s=n[2];return"mode"===o&&s===t.mode?e:[].concat(l()(e),[{key:o.trim(),value:s.trim().replace(/^"|"$/g,"")}])}),[]);return{msg:s,id:(0,v.uniqueId)(),type:n,fields:a,time:o||p()().format("HH:mm:ss")}}
   ```
   将整个解析模块完整替换为：
   ```javascript
   parseStringLog:function(e){var t=this,i=String(e.payload||"").replace(/^time=.*?msg="?/i,"").replace(/"$/,""),n=(e.type||"").toLowerCase(),o=e.time,s="",a=[];"warning"===n&&(n="warn"),"err"===n&&(n="error");var m=i.match(/^(\[.*?\])\s+(.*?)\s+match\s+(.*?)\s+using\s+(.*)$/),me=i.match(/^(\[.*?\])\s*dial\s+(.*?)\s*\(match\s+(.*?)\)\s+(.*?)\s+error:\s*(.*)$/);if(m){s=m[1].trim()+" "+m[2].trim();a=[{key:"rule",value:m[3].trim()},{key:"proxy",value:m[4].trim()},{key:"rAddr",value:m[2].split("-->")[1]?m[2].split("-->")[1].trim():""}]}else if(me){var rl=me[3].replace(/\/$/,"").trim();s=me[1].trim()+" "+me[4].trim()+" error: "+me[5].trim(),n="error",a=[{key:"rule",value:rl},{key:"proxy",value:me[2].trim()},{key:"rAddr",value:me[4].split("-->")[1]?me[4].split("-->")[1].trim():""}]}else{new RegExp("^([^=]+)( .+=|$)").test(i)&&(s=RegExp.$1.trim());a=l()(i.matchAll(/([^\s]+?)=([^=]+)(?= .+=|$)/g)).reduce((function(e,i){var n=r()(i,3),o=n[1],s=n[2];return"mode"===o&&s===t.mode?e:[].concat(l()(e),[{key:o.trim(),value:s.trim().replace(/^"|"$/g,"")}])}),[])}return{msg:s,id:(0,v.uniqueId)(),type:n,fields:a,time:o||p()().format("HH:mm:ss")}}
   ```
3. 替换历史日志切页的读取逻辑  

   在代码里搜索这段原代码（完全匹配）：
   ```javascript
   case 7:e.sent.split("\n").forEach((function(e){/^(.*?) (.*?) (.+)$/.test(e)&&(t.listData=[].concat(l()(t.listData),[t.parseStringLog({payload:RegExp.$3.trim(),type:{ERR:"error",WRN:"warn",INF:"info",DBG:"debug",TRC:"trace",FTL:"fatal"}[RegExp.$2.trim()],time:RegExp.$1.trim()})]))})),e.next=13;break;
   ```
   将整个解析模块完整替换为：
   ```javascript
   case 7:e.sent.split("\n").forEach((function(e){var m=e.match(/^(?:time="?(.*?)"?\s+level=([a-zA-Z]+)\s+msg=(.*)|([^ ]+) ([^ ]+) (.+))$/);if(m){var i=m[1]||m[4],n=i.match(/T(\d{2}:\d{2}:\d{2})/),rl=(m[2]||m[5]||"").trim().toLowerCase(),pt=rl||{ERR:"error",WRN:"warn",INF:"info",DBG:"debug",TRC:"trace",FTL:"fatal"}[m[5]?m[5].trim():""];t.listData=[].concat(l()(t.listData),[t.parseStringLog({payload:(m[3]||m[6]).trim().replace(/^"|"$/g,""),type:pt,time:(n?n[1]:i).trim()})])}})),e.next=13;break;
   ```
   **总结**：做了哪些事？  

   **统一级别转换**：无论 `WebSockets` 推送的日志，还是读取文件的日志，都对 `warning` 做了重定向（`warning` -> `warn`）。

   **强制高亮异常**：一旦正则匹配到了 `error: context deadline exceeded` 等等拨号失败的日志结构，即使 `Mihomo` 输出的是 `warning`，我们也将其 `type` 强行置为 `error`，确保 CFW 会用你的 `❌ Emoji` 和红色字体渲染它。

   **修复 Rule 标签解析**：原错误日志中 `Rule` 会附带一个斜杠 (`match Match/`)，我加了 `.replace(/\/$/, ""`) 帮你把它去掉了，现在标签页会干干净净地显示 `RULE -> Match` 和 `PROXY -> 各种代理` 了。

---

## 📦 完结：重新打包并享用

完成上述所有外科手术级别的修改后，用 winasar 或 asar pack 将文件夹重新打包回 `.asar` 文件：

```bash
asar pack ./temp_app app.asar
```

将生成的 `app.asar` 覆盖回 CFW 的 `resources` 目录。

**重启 Clash for Windows。**
现在，你拥有了一个从配置加载、核心通信、UI 显示到底层日志解析，100% 完美拥抱 Mihomo 的满血版客户端！