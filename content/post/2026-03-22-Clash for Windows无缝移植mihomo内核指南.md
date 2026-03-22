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

## 💉 第一阶段：物理替换内核

1. 前往 [Mihomo GitHub Releases](https://github.com/MetaCubeX/mihomo/releases) 下载对应系统架构的内核。
2. 进入 CFW 的内核目录（Windows 下通常为 `resources/static/files/win/x64/`，Linux 视安装方式而定）。
3. **替换文件**：将原版的 `clash-win64.exe`（或 `clash-linux-amd64`）备份，将下载的 Mihomo 内核重命名替换进去。
4. **删除签名验证**：删除同目录下的 `.sign` 结尾的签名文件（如 `clash-win64.exe.sign`），防止原版 CFW 校验内核签名失败。

---

## 💉 第二阶段：根治配置文件目录偏移

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

## 💉 第三阶段：打通控制台通信（修复 UI 连不上内核）

**问题症状**：内核已启动，但 CFW 左下角一直转圈或显示无法连接。
**原因**：CFW 通过正则匹配内核日志来获取随机 API 端口。Mihomo 底层日志带有不可见的 ANSI 颜色代码（如 `\x1b[0m`），导致 CFW 原本严丝合缝的正则匹配失败。

1. 在 `renderer.js` 中搜索匹配规则：
   ```javascript
   /INF \[API\] listening addr=/
   ```
2. **修改为（削弱正则，绕过颜色代码）**：
   ```javascript
   /listening addr=/
   ```

---

## 💉 第四阶段：UI 身份正名（修复内核显示 Unknown）

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
*(效果：重启后 CFW 左下角将骄傲地显示类似 `v1.18.3 Mihomo` 的字样。)*

---

## 💉 第五阶段：重塑日志解析器（修复日志错位与乱码）

**问题症状**：Mihomo 的日志把规则、节点和时间戳全揉成了一句话（Logrus 格式），导致 CFW 的日志面板失去彩色标签，且由于长度过长导致排版强行换行。

此阶段需要动两处刀子：**实时日志**和**历史日志**。

### 1. 实时日志净化 (WebSocket 推送)
将 Mihomo 揉在一起的日志重新肢解为 `msg`、`rule` 和 `proxy` 键值对，以适配 CFW 的彩色标签渲染。

1. 在 `renderer.js` 中精确搜索原本的 `parseLog` 到 `parseStringLog` 的代码块（很长，建议从 `parseLog:function(e){` 开始搜）：
   ```javascript
   parseLog:function(e){var t=this,i=e.level.../* 中间省略 */...time:o||p()().format("HH:mm:ss")}}
   ```
2. **将整个解析模块完整替换为**：
   ```javascript
   parseLog:function(e){var t=this,i=e.level,n=e.message||e.payload||"",o=e.time,s=e.fields||[];var m=n.match(/^(.*?)\s+match\s+(.*?)\s+using\s+(.*)$/);if(m){n=m[1].trim();s=[{key:"rule",value:m[2].trim()},{key:"proxy",value:m[3].trim()}]}this.listData=[].concat(l()(this.listData),[{type:i,msg:n,time:o||p()().format("HH:mm:ss"),fields:s.filter((function(e){var i=e.key,n=e.value;return"mode"!==i&&n!==t.mode})),id:(0,v.uniqueId)()}])},openLogStream:function(){var e=this,t=this.clashWSClient("logs",["level=".concat(["info","debug"][this.logLevel]),"format=structured"]);t&&(t.on("message",(function(t){try{e.parseLog(JSON.parse(t))}catch(e){console.error("failed to parse log",t)}})),this.client=t)},closeLogStream:function(){this.client&&this.client.terminate(),this.client=null},handleItemClick:function(e){var t=e.id,i=this.showDetailItemIDs.findIndex((function(e){return e===t}));i>-1?this.showDetailItemIDs.splice(i,1):this.showDetailItemIDs.push(t)},handleItemRightClick:function(e,t){var i=this;this.isAutoScroll=!1;var n=t.fields.find((function(e){return"rAddr"===e.key}));this.$menu([{text:(null==n?void 0:n.value)||"Unknown",disabled:!0,icon:"title"},{text:"复制",icon:"content_copy",click:function(){i.copyPayload(t)}}],e)},handleBtnClick:function(){this.client?this.closeLogStream():this.openLogStream()},handleClear:function(){this.listData=[]},handleWindwEvent:function(e){e?this.openLogStream():this.closeLogStream()},handleScroll:function(e){var t=e.target;if(t){var i=t.scrollTop,n=t.scrollHeight,o=t.clientHeight;this.isAutoScroll=Math.abs(n-i-o)<1}},parseStringLog:function(e){var t=this,i=String(e.payload||"").replace(/^time=.*?msg="?/i,"").replace(/"$/,""),n=e.type,o=e.time,s="",a=[];var m=i.match(/^(.*?)\s+match\s+(.*?)\s+using\s+(.*)$/);if(m){s=m[1].trim();a=[{key:"rule",value:m[2].trim()},{key:"proxy",value:m[3].trim()}]}else{new RegExp("^([^=]+)( .+=|$)").test(i)&&(s=RegExp.$1.trim());a=l()(i.matchAll(/([^\s]+?)=([^=]+)(?= .+=|$)/g)).reduce((function(e,i){var n=r()(i,3),o=n[1],s=n[2];return"mode"===o&&s===t.mode?e:[].concat(l()(e),[{key:o.trim(),value:s.trim().replace(/^"|"$/g,"")}])}),[])}return{msg:s,id:(0,v.uniqueId)(),type:n,fields:a,time:o||p()().format("HH:mm:ss")}}
   ```

### 2. 历史日志净化 (页面切换加载)
修复切换页面时，从本地 `.log` 文件读取日志引发的崩溃。引入双擎正则，兼容原版并精准裁切 Mihomo 冗长的时间戳。

1. 紧接着上面的代码，往下搜索历史文件解析部分：
   ```javascript
   e.sent.split("\n").forEach((function(e){/^(.*?) (.*?) (.+)$/.test(e)&&(t.listData=.../* 略 */...)]))}))
   ```
2. **将其替换为高精度双擎解析代码**：
   ```javascript
   e.sent.split("\n").forEach((function(e){var m=e.match(/^(?:time="?(.*?)"?\s+level=([a-zA-Z]+)\s+msg=(.*)|([^ ]+) ([^ ]+) (.+))$/);if(m){var i=m[1]||m[4],n=i.match(/T(\d{2}:\d{2}:\d{2})/);t.listData=[].concat(l()(t.listData),[t.parseStringLog({payload:(m[3]||m[6]).trim().replace(/^"|"$/g,""),type:m[2]||{ERR:"error",WRN:"warn",INF:"info",DBG:"debug",TRC:"trace",FTL:"fatal"}[m[5].trim()],time:(n?n[1]:i).trim()})])}}))
   ```

---

## 📦 完结：重新打包并享用

完成上述所有外科手术级别的修改后，用 winasar 或 asar pack 将文件夹重新打包回 `.asar` 文件：

```bash
asar pack ./temp_app app.asar
```

将生成的 `app.asar` 覆盖回 CFW 的 `resources` 目录。

**重启 Clash for Windows。**
现在，你拥有了一个从配置加载、核心通信、UI 显示到底层日志解析，100% 完美拥抱 Mihomo 的满血版客户端！