---
title: wuwa2.4-PS教程  
author: jiang068
type: post
date: 2025-05-17T09:43:58+00:00
url: /t/79
featured_image: /wp-content/uploads/lupa.jpg
argon_hide_readingtime:
  - 'false'
argon_meta_simple:
  - 'false'
argon_first_image_as_thumbnail:
  - default
argon_show_post_outdated_info:
  - default
views:
  - 595
categories:
  - 鸣潮

---
## [PS官方Discord频道-Reversed Rooms][1] {.wp-block-heading}

欢迎来玩！ 

本人不是很有时间更新教程，所以就算PS更新也可看老教程凑合用。 

但由于2.4PS的部署和原2.1PS差距较大，故重构一次。（2025.05.17） 

测试系统：win11 22H2专业版（22621.4317） 

[原2.1PS链接][2] 

除了此教程，还有其他大佬的优秀教程也可借鉴，可自行食用： 

[sunset的博客：wuwa-ps][3] 

[频道御用视频教程-from youtube][4] 

本文可能部分借鉴了上述大佬们的经验，再次致以感谢。 

[PS来源：wickedwaifus][5] 

我只是写了一个教程，我不是PS的作者。 

If you cannot read Chinese，please use translation softwares or plugins to help yourself. 

本教程宗旨：最清晰、最简单。 

偏口语化，像碎碎念，但仍希望读者有基本的技术经验。 

下面开始。 

## 1、安装必需软件和环境（如有可跳过） {.wp-block-heading}

点击标题即可下载。 

### 1.1 [PostgreSQL][6] {.wp-block-heading}

建议下载16版本，安装，一路默认就行，记住安装时设定的密码。 

找到开始菜单里的pgAdmin4并打开 

（或者直接去你“安装PostgreSQL的文件夹\pgAdmin4\runtime\”下，找到pgAdmin4.exe双击打开）， 

等待pgAdmin4打开后，在左边的边栏选中Servers&#8211;>PostgreSQL&#8211;>Databases， 

在“Databases”文字上右键&#8211;>create&#8211;>Database&#8230;， 

第一栏填写它的名字为（示例）`wicked_waifus_db`，这将是你的数据库名，save就行了。 

### 1.2 [rust][7] {.wp-block-heading}

下载最新版本，安装，一路默认就行。

### 1.3 [protoc][8] {.wp-block-heading}

下载最新版本，解压，把`\你解压的文件夹所在位置\protoc-31.0-win64\bin`添加到系统环境变量的path。 

（如何添加到系统环境变量？右键“此电脑”，属性，高级系统设置，环境变量，用户的环境变量中双击“path”，新建，框里填如：`protoc-31.0-win64/bin`，确定，确定，确定） 

## 2、下载游戏本体 {.wp-block-heading}

2.4版本后kuro官方launcher对游戏包体的下载增加了鉴权，故弃用。 

新下载器：[wuwa-downloader][9] 

by: yuhkix@github 

这个下载器可能需要全局代理，也可能直链，如果下不动请切换网络。 

找release，下载最新exe，双击，出现：

<pre class="wp-block-code"><code>[*] Available versions:
1. Live - OS
2. Live - CN
3. Beta - OS
4. Beta - CN
[?] Select version:</code></pre>

这里选4，回车出现：

<pre class="wp-block-code"><code>[*] Fetching download configuration...
[*] Using default.config
[?] Enter download directory (Enter for current):</code></pre>

这里写你希望游戏包体（约47G）下载到的位置。 

回车后耐心等待下载完成即可。我下了约40min。 

如果有下载失败重新打开这个exe即可，他会自动识别你还缺了那些文件，重新给你下载。

## 3、给游戏本体打补丁 {.wp-block-heading}

### 3.1 pak补丁 {.wp-block-heading}

[点击下载2.4 pak补丁][10] 

放到 

`Wuthering Waves (Beta) Game\Client\Content\Paks` 目录下 

### 3.2 dll补丁 {.wp-block-heading}

[点击下载2.4 dll补丁][11] 

解压后找到 `_\regular\wicked-waifus-win-cn_beta_2_4_0-regular.dll`，放到 

`Wuthering Waves (Beta) Game\Client\Binaries\Win64` 目录下 

### 3.3 启动补丁 {.wp-block-heading}

[点击下载xavo95的launcher.exe][12] 

回到 

[master/samples/][13] 

下载 `ww.toml` 文件，重命名为 `config.toml`，并与 `launcher.exe` 一起放到：

`Wuthering Waves (Beta) Game\Client\Binaries\Win64` 目录下。

打开 `config.toml` 文件，修改以下两个值为你的绝对路径：

<pre class="wp-block-code"><code>current_dir = 'F:\example\Wuthering Waves (Beta) Game\Client\Binaries\Win64'
dll_list = ['F:\example\Wuthering Waves (Beta) Game\Client\Binaries\Win64\wicked-waifus-win-cn_beta_2_4_0-regular.dll']</code></pre>

修改完成后保存。其中 `F:\example\` 仅为示例路径，请替换为你下载游戏时所在的实际路径。

新建文件命名为 `run_xavo_launcher.bat`，用记事本打开，写入：

<pre class="wp-block-code"><code>@echo off
:: 检查是否管理员
net session &gt;nul 2&gt;&1
if %errorlevel% neq 0 (
    echo 正在尝试以管理员权限重新运行...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit
)
cd &#47;d "F:\example\Wuthering Waves(Beta)\Wuthering Waves (Beta) Game\Client\Binaries\Win64"
launcher.exe
pause</code></pre>

保存即可。其中 `F:\example\` 仅为示例路径，请替换为你下载游戏时所在的实际路径。 

参考视频： 

https://www.youtube.com/watch?v=kLA0kONBT_s

## 4、下载PS并配置 {.wp-block-heading}

### 4.1 下载PS {.wp-block-heading}

[wicked-waifus-rs][14] 

在你要接收文件的文件夹里右键&#8211;>在终端中打开，输入：

<pre class="wp-block-code"><code>git clone --recursive https:&#47;&#47;git.xeondev.com&#47;wickedwaifus&#47;wicked-waifus-rs.git
</code></pre>

等待主仓库克隆完成后，可以拉取推荐的自动buff分支（by:Ruuby@Discord） 

<pre class="wp-block-code"><code>cd wicked-waifus-rs
git fetch origin refs&#47;pull&#47;6&#47;head:pr-6-test</code></pre>

如果没有git也可以手动下载zip包。

### 4.2 编译PS {.wp-block-heading}

目录下打开cmd，一次性粘贴下面的指令：

<pre class="wp-block-code"><code>cargo build -r --bin wicked-waifus-config-server ^
             --bin wicked-waifus-hotpatch-server ^
             --bin wicked-waifus-login-server ^
             --bin wicked-waifus-gateway-server ^
             --bin wicked-waifus-game-server</code></pre>

第一次编译可能需要一点时间，如有报错请自行询问AI助手解决。 

（将这次cmd的输入内容做成一个buildPS.bat备用）

### 4.3 配置PS {.wp-block-heading}

目录下打开cmd，输入：

<pre class="wp-block-code"><code>start cmd &#47;K "target\release\wicked-waifus-config-server.exe"
start cmd &#47;K "target\release\wicked-waifus-hotpatch-server.exe"
start cmd &#47;K "target\release\wicked-waifus-login-server.exe"
start cmd &#47;K "target\release\wicked-waifus-gateway-server.exe"
start cmd &#47;K "target\release\wicked-waifus-game-server.exe"
exit</code></pre>

（将这次cmd的输入内容做成一个runPS.bat备用）

将会打开5个终端server窗口。 

第一次运行将会生成5个配置文件：

  * gameserver.toml 

  * gateway.toml 

  * loginserver.toml 

  * hotpatch.toml 

  * configserver.toml 

在 `gameserver.toml`、`gateway.toml`、`loginserver.toml` 中，找到：

<pre class="wp-block-code"><code>[database]
host = "localhost:5432"
user_name = "postgres"
password = ""
db_name = "wicked_waifus_db"</code></pre>

将密码`password`和数据库名`db_name`写为你设置的值，保存。三个文件记得都要修改。

### 4.4 启动PS {.wp-block-heading}

运行runPS.bat，打开五个窗口且不报错即为成功。 

如有报错建议检查数据库名称和密码是否错误，或询问AI助手。

## 5、启动 {.wp-block-heading}

每次启动仅需双击 `runPS.bat` 后双击 `run_xavo_launcher.bat` 即可。 

PostgreSQL数据库是一个服务, 可以通过cmd管理员关启：

  * 启动：`net start postgresql-x64-16` 

  * 关闭：`net stop postgresql-x64-16`

## 6、其他配置 {.wp-block-heading}

注意：如果修改了rs文件，需退出所有PS相关程序后重新编译（运行 `buildPS.bat` 即可），然后重新创建新账户登录PS后才能生效。

### 6.1 获取指定角色 {.wp-block-heading}

打开 `wicked-waifus-rs\wicked-waifus-game-server\src\logic\role\formation.rs` 

第12行：

<pre class="wp-block-code"><code>const DEFAULT_FORMATION: &[i32] = &[1205, 1207, 1409];</code></pre>

这些数字分别对应角色编号：1205（长离）、1207（露帕）、1409（卡提希亚）。 

编号参考：[wuwa-ids by:yuhkix@github/discord][15]

### 6.2 进入指定地图 {.wp-block-heading}

打开 `wicked-waifus-game-server\src\logic\player\location.rs` 

第12行：

<pre class="wp-block-code"><code>const DEFAULT_INSTANCE_ID: i32 = 8;</code></pre>

修改 i32 值即可。地图编号参考： 

[地图 JSON][16] 

提示：地下金库（云底藏馆）编号为902

### 6.3 没有大招？ {.wp-block-heading}

打开 `data\assets\game-data\BinData\BaseProperty.json`， 

全文替换以下字段：

<pre class="wp-block-code"><code>"CdReduse": 10000, ==&gt; "CdReduse": 0,
"EnergyMax": 12500, ==&gt; "EnergyMax": 0,
"Energy": 0, ==&gt; "Energy": 1,</code></pre>

如需修改指定角色，请搜索角色 ID（例如 `"Id": 1606`）， 

在其对应位置修改数值，如：

<pre class="wp-block-code"><code>"CdReduse": 10000,   -&gt; 改为 0
"EnergyMax": 12500,  -&gt; 改为 0
"Energy": 0,         -&gt; 改为 1</code></pre>

即可实现无CD大招和满能量状态。 

### 6.4 新衣服呢？ {.wp-block-heading}

方法by: Xx-wpc@discord 

找到 

<pre class="wp-block-code"><code>wicked-waifus-rs\data\assets\game-data\BinData\RoleInfo.json</code></pre>

搜索角色id后找到对应SkinId，长离和珂莱塔的SkinId的第四位0改成1即可切换成泳装。 

同理如果想换手上的武器，修改InitWeaponItemId即可。 

提示：lupa武器 21010036 小卡武器 21020056  如果不显示，再进入 

<pre class="wp-block-code"><code>wicked-waifus-rs\wicked-waifus-game-server\src\logic\role\mod.rs</code></pre> 在131行(帮助你定位): 

<pre class="wp-block-code"><code>let base_stats = &get_role_props_by_level(role_id, level, breakthrough);</code></pre> 后面加代码（方法by：BOT@discord）： 

<pre class="wp-block-code"><code>        //for changli
        let skin_id = if role_id == 1205 {
            81011205
        }else {
            data.skin_id
        };
        //for catxy
        let equip_weapon = if role_id == 1409 {
            21020056
        }else {
            data.init_weapon_item_id
        };
        //for lupa
        let equip_weapon = if role_id == 1207 {
            21010036
        }else {
            data.init_weapon_item_id
        };</code></pre> 这个是硬编码进去了，需要重编译才能看到结果。

 [1]: https://discord.gg/gJgefeJJ
 [2]: https://blog.fufultd.asia/t/16
 [3]: https://blog.sunmkt.uk/article/wuwa-ps/
 [4]: https://youtu.be/AUeqUA60lwI
 [5]: https://git.xeondev.com/wickedwaifus
 [6]: https://www.postgresql.org/download/
 [7]: https://www.rust-lang.org/tools/install
 [8]: https://github.com/protocolbuffers/protobuf/releases
 [9]: https://github.com/yuhkix/wuwa-downloader
 [10]: https://git.xeondev.com/wickedwaifus/wicked-waifus-pak/releases/tag/2.4.0
 [11]: https://git.xeondev.com/wickedwaifus/wicked-waifus-win-patch/releases/tag/2.4.0
 [12]: https://git.xeondev.com/xavo95/launcher/releases
 [13]: https://git.xeondev.com/ReversedRoomsMisc/process-launcher-rs/src/branch/master/samples/
 [14]: https://git.xeondev.com/wickedwaifus/wicked-waifus-rs
 [15]: https://github.com/yuhkix/wuwa-ids/blob/main/characters.md
 [16]: https://git.xeondev.com/wickedwaifus/wicked-waifus-data/src/branch/master/BinData/AkiMap.json