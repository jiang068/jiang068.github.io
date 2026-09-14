---
title: EndFieldPS 私服教程
author: jiang068
type: post
date: 2025-01-27T18:07:00+00:00
url: /t/40
featured_image: /wp-content/uploads/endf.jpeg
views:
  - 969
argon_hide_readingtime:
  - 'false'
argon_meta_simple:
  - 'false'
argon_first_image_as_thumbnail:
  - default
argon_show_post_outdated_info:
  - default
categories:
  - 终末地

---
## [作者网页][1]

### 由于Ark的仓库多次被DMCA，文章内容可能过时，请前往原作者网页或者[t.me][2]查看最新方法。

## 当前功能

  1. 登录
  2. 切换角色
  3. 切换队伍
  4. 场景切换（目前部分场景可用）
  5. 使用 MongoDB 保存数据

## 安装步骤

### 1. 安装必要组件

安装  
[.NET SDK (推荐版本 8.0.12)][3]  
（这个很多人的电脑已经有了）  
[MongoDB][4]  
（官方网站无脑安装一路点击就完了）

[Fiddler Classic][5]  
[mitmproxy][6]  
（后面这两个二选一）。

  * 安装 Fiddler Classic 时，务必启用 &#8220;Decrypt HTTPS traffic&#8221; 并安装证书。
  * 在 Fiddler Classic 中，启用以下功能： 
      1. 打开 Tools（菜单栏左上角） -> Options -> HTTPS。
      2. 勾选 &#8220;Capture HTTPS CONNECTs&#8221; 和 &#8220;Decrypt HTTPS traffic&#8221;。
      3. 通过点击 Actions（&#8221;Capture HTTPS CONNECTs&#8221;旁边） -> Trust Root Certificate 重新安装证书并选择“是”。

### 2. 下载构建文件

下载预编译的构建文件，或根据需求自行构建。地址：https://github.com/Campofinale/

### 3. 配置文件

将 Json 和 TableCfg 文件夹放入 EndFieldPS.exe 所在的文件夹（可从[这里][7]下载文件）。

### 4. 运行服务器

运行 EndFieldPS.exe。

### 5. 配置 Fiddler Classic 脚本

覆盖以下路径的脚本文件：

`C:\Users\\Documents\Fiddler2\Scripts\CustomRules.js`

若需备份默认文件，可将其重命名后新建同名文件。或者通过 Fiddler Classic 的菜单栏：

  1. 进入 Rules -> Customize Rules (Ctrl + R) 打开脚本编辑器。
  2. 保存以下内容：

    import System;
    import System.Windows.Forms;
    import Fiddler;
    import System.Text.RegularExpressions;
    
    class Handlers {
        static function OnBeforeRequest(oS: Session) {
            if (oS.host.Contains("gryphline.com") || oS.host.Contains("hg-cdn.com")) {
                if (oS.HTTPMethodIs("CONNECT")) {
                    return;
                }
                FiddlerObject.log(">>>>>>>>>>>> URL:" + oS.fullUrl);
                oS.oRequest.headers.UriScheme = "http";
                oS.oRequest["Cookie"] = (oS.oRequest["Cookie"] + ";OriginalHost=" + oS.host + ";OriginalUrl=" + oS.fullUrl);
                oS.host = "localhost:5000";
            }
        }
    };
    

### 6. 使用 mitmproxy 配置（可选）

使用以下命令运行 mitmproxy：

    mitmproxy -s ak.py

ak.py 文件内容如下：

    import mitmproxy
    from mitmproxy import ctx, http
    
    class EndFieldModifier:
        def requestheaders(self, flow: mitmproxy.http.HTTPFlow):
            if "gryphline.com" in flow.request.host or "hg-cdn.com" in flow.request.host:
                if flow.request.method == "CONNECT":
                    return
    
                flow.request.scheme = "http"
                flow.request.cookies.update({
                    "OriginalHost": flow.request.host,
                    "OriginalUrl": flow.request.url
                })
                flow.request.host = "localhost"
                flow.request.port = 5000
                ctx.log.info("URL: " + flow.request.url)
    
    addons = [
        EndFieldModifier()
    ]
    

### 7. 启动 Fiddler Classic

确认新脚本已加载（可通过 FiddlerScript 标签页检查）。

### 8. 运行游戏客户端

启动游戏并开始游玩！（注意：目前仅支持 OS 客户端）。

### 9. 创建账号

在服务器控制台输入以下命令创建账号：

    account create (用户名)

在游戏登录界面输入以下格式的邮箱登录：

    (用户名)@randomemailformathere.whatyouwant

密码字段可随意填写。

本文翻译自：  
https://github.com/Campofinale/Campofinale

 [1]: https://endfield.projektark.xyz/
 [2]: https://t.me/campofinale/1/45
 [3]: https://dotnet.microsoft.com/
 [4]: https://www.mongodb.com/try/download/community/
 [5]: https://www.telerik.com/fiddler/fiddler-classic/
 [6]: https://mitmproxy.org/
 [7]: https://github.com/PotRooms/EndFieldData/tree/main