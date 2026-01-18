---
title: 如何玩ww2.1测试私服
author: jiang068
type: post
date: 2025-01-21T20:20:14+00:00
url: /t/16
featured_image: /wp-content/uploads/phb.jpg
views:
  - 885
argon_hide_readingtime:
  - 'false'
argon_meta_simple:
  - 'false'
argon_first_image_as_thumbnail:
  - default
argon_show_post_outdated_info:
  - default
categories:
  - 鸣潮

---
 

# 私服作者也做了一个视频教程，请访问Youtube： {.wp-block-heading}

<https://www.youtube.com/watch?v=jGISWOXrZks>

## 测试服来源于：https://git.xeondev.com/wickedwaifus/wicked-waifus-rs/ {.wp-block-heading}

## 我只是写了一个教程，我不是这个软件的作者 {.wp-block-heading}

## If you cannot read Chinese，please use translation softwares or plugins to help yourself. {.wp-block-heading}

## 如果你在Discord里找我问这篇教程能帮你解决的问题，我一概看不见； {.wp-block-heading}

## 如果有新问题欢迎来讨论 {.wp-block-heading}

## 1、下载测试服启动器： {.wp-block-heading}

<pre class="wp-block-code"><code>https:&#47;&#47;pcdownload-huoshan.aki-game.com/pcstarter/prod/starter/10008_Pa0Q0EMFxukjEqX33pF9Uyvdc8MaGPSz/G152/1.7.1.0/cDKioEuJvj9zCC9Q04iF3pNG2JBm9rhj/installer.exe</code></pre>

## 2、安装启动器； {.wp-block-heading}

## 3、下载破解的launcher.exe： {.wp-block-heading}

<pre class="wp-block-code"><code>https:&#47;&#47;github.com/jiang0681/wwbeta/releases/download/1/launcher.exe</code></pre>

## 4、用后下载的launcher.exe，替换掉刚才安装的启动器目录下的launcher.exe。 {.wp-block-heading}

启动器目录就像“D:\Wuthering Waves(Beta)\”这种；

## 5、双击launcher.exe，打开测试服启动器，下载2.1游戏本体，大概需要30G； {.wp-block-heading}

## 6、下载私服搭建需要的文件： {.wp-block-heading}

### a)PostgreSQL {.wp-block-heading}

<pre class="wp-block-code"><code>https:&#47;&#47;sbp.enterprisedb.com/getfile.jsp?fileid=1259337</code></pre>

下载好之后安装到你知道的位置，一路默认就行，但是要记住你的密码和data文件夹在哪；

然后在环境变量里添加你安装的SQL的文件夹\bin的位置，比如我的就是“D:\PostgreSQL\bin”。

（如何添加？右键“此电脑”，属性，高级系统设置，环境变量，用户的环境变量中双击“path”，新建，框里填\你安装的文件夹所在位置，比如PostgreSQL\bin，确定，确定，确定）

### b)Rust {.wp-block-heading}

<pre class="wp-block-code"><code>https:&#47;&#47;static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe</code></pre>

下载好后安装即可；

### c)Protoc {.wp-block-heading}

<pre class="wp-block-code"><code>https:&#47;&#47;github.com/protocolbuffers/protobuf/releases/download/v29.3/protoc-29.3-win64.zip</code></pre>

解压文件夹到一个你看着顺眼的位置，然后把&#8221;\你解压的文件夹所在位置\protoc-29.3-win64\bin&#8221;添加到环境变量的path。

添加环境变量同上；

### d)wicked-waifus-rs(https://git.xeondev.com/wickedwaifus/wicked-waifus-rs) {.wp-block-heading}

在你要接收文件的文件夹里右键&#8211;>在终端中打开，输入：

<pre class="wp-block-code"><code>git clone --recursive https://git.xeondev.com/wickedwaifus/wicked-waifus-rs.git</code></pre>

等待克隆完成后，你需要确认一下它有没有漏记住这个文件夹的位置，等下回来要用；  
（这里不推荐直接去网页下载zip包，因为会漏两个文件夹。

===============================================

## 很多人都遇到的问题：I/O error {.wp-block-heading}

I/O error: 根据经验，是因为你文件没下载完。

如果git clone不好使, 你可以直接下载源码的zip包但是，你要做一点修补工作，

#### a)wicked-waifus-rs {.wp-block-heading}

<pre class="wp-block-code"><code>https:&#47;&#47;git.xeondev.com/wickedwaifus/wicked-waifus-rs/archive/master.zip</code></pre>

下载好后解压, 然后你还要去两个地方下载缺省的两个文件夹放在对应的位置。

#### b)wicked-waifus-config-server-files {.wp-block-heading}

<pre class="wp-block-code"><code>https:&#47;&#47;git.xeondev.com/wickedwaifus/wicked-waifus-config-server-files/archive/main.zip</code></pre>

解压后放在\wicked-waifus-rs\data\assets\config-server\文件夹里面，

config-server文件夹里应该直接有bpIWdherKqwfYUO5gIE5fnMfOL4PmBty文件夹，不要在外面再套一层文件夹；

最后确保有\wicked-waifus-rs\data\assets\config-server\bpIWdherKqwfYUO5gIE5fnMfOL4PmBty\就行；

#### c)wicked-waifus-data {.wp-block-heading}

<pre class="wp-block-code"><code>https:&#47;&#47;git.xeondev.com/wickedwaifus/wicked-waifus-data/archive/master.zip</code></pre>

解压后放在\wicked-waifus-rs\data\assets\game-data\文件夹里，

最后\game-data\里应该有BinData, CustomData等等文件夹和一些文件，外面也不要套壳；

然后wicked-waifus-rs才算完整的下载完毕。。。

===================================================

## 7、找到开始菜单里的pgAdmin4并打开 {.wp-block-heading}

(或者直接去你“安装PostgreSQL的文件夹\pgAdmin4\runtime\”下，找到pgAdmin4.exe双击打开)，  
等待pgAdmin4打开后，在左边的边栏选中Servers&#8211;>PostgreSQL&#8211;>Databases，  
在”Databases“文字上右键&#8211;>create&#8211;>Database…，  
第一栏填写它的名字为wicked\_waifus\_db，  
save就行了。

## 8、进入wicked-waifus-rs文件夹， {.wp-block-heading}

在空白处右键选“在终端中打开”，  
输入：

<pre class="wp-block-code"><code>cargo run --bin wicked-waifus-config-server</code></pre>

第一次需要一点时间编译。出现大大的“WICKED WAIFUS PS&#8221;标志，  
且终端没有爆红或者退出之后，不要关终端，  
依然在wicked-waifus-rs文件夹内右键空白处选“在终端中打开”，  
输入：

<pre class="wp-block-code"><code>cargo run --bin wicked-waifus-hotpatch-server</code></pre>

下面三个同理：

<pre class="wp-block-code"><code>cargo run --bin wicked-waifus-login-server
cargo run --bin wicked-waifus-gateway-server
cargo run --bin wicked-waifus-game-server</code></pre>

第一次都先跑一遍，不管能不能跑通。  
如果跑不通，关注以下几个文件：

### a)gateway.toml {.wp-block-heading}

最下面一行应该为：  
db\_name = &#8220;wicked\_waifus_db&#8221;

### b)loginserver.toml {.wp-block-heading}

最下面几行应该为：

<pre class="wp-block-code"><code>user_name = "postgres"&lt;---------------这是默认的用户名，如果你没改就不要动
password = "######"&lt;----------------------这里填你自己设定的密码！！！
db_name = "wicked_waifus_db"</code></pre>

### c)gameserver.toml {.wp-block-heading}

中间有几行应该为：

<pre class="wp-block-code"><code>user_name = "postgres"
password = "######"
db_name = "wicked_waifus_db"</code></pre>

（和上面同理）

### 注：端口如果是默认的话都是5432，除非你自己改成了别的，需要自己去修改所有toml文件里的端口号。 {.wp-block-heading}

### 如果还是跑不通，去【第6步a)】的data文件夹那里（你安装PostgreSQL的位置\data\），关注以下文件： {.wp-block-heading}

### a)pg_hba.conf {.wp-block-heading}

最后面几行是你的数据库的验证方式，  
如果scram-sha-256（哈希）不行，把 所有 的scram-sha-256  
换成md5（密码明码），如果还是不行，  
换成trust（不要密码）

### b)postgresql.conf {.wp-block-heading}

找到752行~756行，如果不是以下的，直接改成和以下一模一样的：

<pre class="wp-block-code"><code>lc_messages = 'en_US.UTF-8' # locale for system error message
                # strings
lc_monetary = 'en_US.UTF-8' # locale for monetary formatting
lc_numeric = 'en_US.UTF-8' # locale for number formatting
lc_time = 'en_US.UTF-8' # locale for time formatting</code></pre>

### 注意：每次修改文件后，都需要到服务里重启PostgreSQL服务。 {.wp-block-heading}

（如何重启服务？win+r，输入services.msc，回车，找到“postgresql-x64-17 &#8211; PostgreSQL Server 17”服务，右键&#8211;>重新启动）

## =====================分界线============================= {.wp-block-heading}

如果你五个终端都跑通了，没有爆红，没有异常退出，再接着往下！

## 9、下载.pak文件 {.wp-block-heading}

<pre class="wp-block-code"><code>https:&#47;&#47;git.xeondev.com/wickedwaifus/wicked-waifus-pak/releases/download/2.1.0/rr_fixes_100_p.pak</code></pre>

放在&#8221;\Wuthering Waves(Beta)\Wuthering Waves Game\Client\Content\Paks\&#8221;目录下

## 10、下载.dll文件 {.wp-block-heading}

<pre class="wp-block-code"><code>https:&#47;&#47;github.com/jiang0681/wwbeta/releases/download/1/CrashSight64.dll</code></pre>

放在“\Wuthering Waves(Beta)\Wuthering Waves Game\Client\Binaries\Win64\&#8221;目录下，覆盖掉原来的CrashSight64.dll文件！！！

## 11、有两种防崩溃的方法 {.wp-block-heading}

（这一步如果你不做你的游戏会光速崩溃）

两种方法任选其一即可

### a)下载winhttp.dll和libraries.txt文件 {.wp-block-heading}

<pre class="wp-block-code"><code>https:&#47;&#47;github.com/jiang0681/wwbeta/releases/download/1/winhttp.dll</code></pre>

和

<pre class="wp-block-code"><code>https:&#47;&#47;github.com/jiang0681/wwbeta/releases/download/1/libraries.txt</code></pre>

和CrashSight64.dll一起，放在“\Wuthering Waves(Beta)\Wuthering Waves Game\Client\Binaries\Win64\&#8221;目录下

### b)用xavo95的launcher.exe {.wp-block-heading}

下载地址：

<pre class="wp-block-code"><code>https:&#47;&#47;git.xeondev.com/xavo95/launcher/releases</code></pre>

参考视频：

<pre class="wp-block-code"><code>https:&#47;&#47;www.youtube.com/watch?v=kLA0kONBT_s</code></pre>

## 12、在五个终端和数据库开着的情况下， {.wp-block-heading}

双击“\Wuthering Waves(Beta)\Wuthering Waves Game\Client\Binaries\Win64\&#8221;目录下的Client-Win64-Shipping.exe，开始游戏，进去的登录曲变了你就成功了。  
进去后新创角色啥的功能你就自己探索了。

## 13、怎么快速启动那五个cargo的服务 {.wp-block-heading}

(来自@Castorice的建议)  
每次打开五个服务都很麻烦。  
如果你已经配置好了并且多次运行都可以成功，可以在wicked-waifus-rs的文件夹里新建一个runall.bat文件，  
用记事本写入：

<pre class="wp-block-code"><code>@echo off
start cmd /K "cargo run -r --bin wicked-waifus-config-server"
start cmd /K "cargo run -r --bin wicked-waifus-hotpatch-server"
start cmd /K "cargo run -r --bin wicked-waifus-login-server"
start cmd /K "cargo run -r --bin wicked-waifus-gateway-server"
start cmd /K "cargo run -r --bin wicked-waifus-game-server"
exit</code></pre>

保存好后下次直接双击这个runall.bat文件就可以同时秒开5个cargo的服务了！

# 2025/01/24教程新增：获取指定角色和进入指定副本地图方法 {.wp-block-heading}

## 14、获取指定角色 {.wp-block-heading}

找到\wicked-waifus-rs\wicked-waifus-game-server\src\logic\player\mod.rs文件，第135行，

<pre class="wp-block-code"><code>let formation = vec!&#91;1506, 1206, 1606];</code></pre>

这里的三个四位数字分别代表你进去后队伍里的三个角色的唯一编号。

但是直接修改是不够的。应遵循以下步骤：

### 0、退出游戏，退出所有5个cmd终端 {.wp-block-heading}

### a)在mod.rs文件里，将三个数字修改为你想要的三个角色的编号。 {.wp-block-heading}

（角色及对应编号在

<pre class="wp-block-code"><code>https:&#47;&#47;git.xeondev.com/wickedwaifus/wicked-waifus-data/src/branch/master/BinData/RoleInfo.json</code></pre>

里找。 ）

提示：看到文件后可以发现第一个id：1402是秧秧，其他角色的对应方法自己类比，没办法细讲；

修改好后记得保存文件；

### b)打开你的pgAdmin4(前面有讲)，删除你的wicked\_waifus\_db数据库，然后再重新建一个一样的 {.wp-block-heading}

(实际上不必要删除这个，但是这样最省事)

### c)重新运行那5个cargo指令，应该会重新编译的所以时间稍微长一点 {.wp-block-heading}

### d)进入游戏，点击右下角的新建一个角色账户，此时角色应该就是你改的那3个了。 {.wp-block-heading}

如果不是的话，你失败了，重新看一遍你的过程重新来。

## 15、进入指定地图 {.wp-block-heading}

找到\wicked-waifus-rs\wicked-waifus-game-server\src\logic\player\location.rs文件，第12行，

<pre class="wp-block-code"><code>const DEFAULT_INSTANCE_ID: i32 = 8;</code></pre>

这个i32等于多少你就会进入到这个编号代表的哪个地图里。当然了也不是直接改就能生效的。

地图及其对应编号在

<pre class="wp-block-code"><code>https:&#47;&#47;git.xeondev.com/wickedwaifus/wicked-waifus-data/src/branch/master/BinData/AkiMap.json</code></pre>

里。

提示：地下金库（云底藏馆）对应编号是902;

修改好 i32=几几几 之后，重复你改角色用的0、b)、c)、d)、这几个步骤，进入游戏就直接是你想要进入的地图了。

## 16、没有大招？ {.wp-block-heading}

找到\wicked-waifus-rs\data\assets\game-data\BinData\BaseProperty.json文件，

在该文件里搜索

&#8220;Id&#8221;: 1606

这里的id是你想更改的角色的代号，前面有说；

找到对应的行之后，它所在的花括号{}里就是该角色的所有数值，你可以编辑；

往下看，你会发现这一行：

&#8220;CdReduse&#8221;: 10000,

把10000改成0可以使你的角色无CD大招；

再往下找，找到这两行；

&#8220;EnergyMax&#8221;: 1xxxx,

&#8220;Energy&#8221;: 0,

改成

&#8220;EnergyMax&#8221;: 0,

&#8220;Energy&#8221;: 1,

你的大招就一直是充能满的状态，所以就可以随便放大招了。

其他角色同理。得手动一个一个修改，有点“小”麻烦。

## 17、其他功能不妨直接来Discord里问作者 {.wp-block-heading}

我只是一个搬砖的（

<https://discord.gg/626PmU85bS>