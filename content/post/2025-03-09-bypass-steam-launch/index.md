---
title: 绕过steam启动games
author: jiang068
type: post
date: 2025-03-09T07:18:23+00:00
url: /t/63
featured_image: /wp-content/uploads/stles.jpg
argon_hide_readingtime:
  - 'false'
argon_meta_simple:
  - 'false'
argon_first_image_as_thumbnail:
  - default
argon_show_post_outdated_info:
  - default
views:
  - 674
categories:
  - demo

---
  
</p> 

# unsteam

该教程仅供项目交流使用，无不良引导，旨在说明如何绕过 Steam 启动 Steam 上的游戏，以将游戏文件拷贝带到其他电脑上能无障碍启动。

下面先简单分个类。

## 一、可以直接启动的

找到：

<pre>\Steam安装目录\steamapps\common\游戏A名称\</pre>

文件夹，双击里面的游戏A.exe文件，可以在 Steam 未启动的状态下直接启动游戏A。

适用游戏：桐叶的宝石心，等。

这种就是没验证的游戏，可以直接拷贝带走。

## 二、Steamless 剥壳

下载 Steamless 的最新 Releases 并解压，得到 Steamless 程序。

<img decoding="async" src="https://github.com/user-attachments/assets/2a26f232-c9e3-4b75-a90d-07988f148a5e" alt="Steamless 界面" /> 

原仓库下载地址：

<pre>https://github.com/atom0s/Steamless/releases/latest</pre>

备份仓库下载地址：

<pre>https://github.com/jiang0681/unsteam/releases/download/paks/Steamless.v3.1.0.5.-.by.atom0s.zip</pre>

双击 steamless.exe 应用程序，导入你想要剥壳的游戏 B.exe 文件（以 Miside Demo 举例）

<img decoding="async" src="https://github.com/user-attachments/assets/ac08f9b8-fa2e-438d-a542-86acb097e02c" alt="Steamless 使用示例" /> 

点击 Unpack File 即可得到剥壳后的游戏 B_unpacked.exe，双击它即可直接启动游戏 B。

适用游戏：东方冰之勇者记，等。

附：Steamless 的原仓库地址：

<pre>https://github.com/atom0s/Steamless</pre>

## 三、steamclient_loader 套壳

下载 steamclient_loader 并解压，得到下列文件：

<img decoding="async" src="https://github.com/user-attachments/assets/f3d947ed-df63-4930-a0eb-9559fe7dff83" alt="steamclient_loader 文件" /> 

下载地址：

<pre>https://github.com/jiang0681/unsteam/releases/download/paks/steamclient_loader.zip</pre>

用记事本打开 ColdClientLoader.ini；填写 AppId，在 Steam 商店页面找得到；填写 Exe=游戏启动程序名，程序在 &#8220;\Steam安装目录\steamapps\common\游戏C名称\&#8221; 里；

这里用双影奇境演示一遍：

<img decoding="async" src="https://github.com/user-attachments/assets/831b8449-5117-4521-93db-42d656f2837c" alt="ColdClientLoader.ini 配置示例" /> 

保存 ini 文件，双击 steamclient_loader.exe 即可运行游戏 C。

适用游戏：大部分 Steam 游戏。

附：goldberg_emulator 启动器原仓库地址：

<pre>https://gitlab.com/Mr_Goldberg/goldberg_emulator</pre>

steamclient_loader.exe 即来源于此。

## 四、Steamless 剥壳后运行不了，再用 steamclient_loader 套壳后可以运行

同 &#8220;三、&#8221;，Exe=填写 Steamless 剥壳后的游戏启动程序名。

适用游戏：NieR: Automata，AIR 重制版，等。

## 五、上述都不行的，放弃。

# 一般流程

#### 1、直接双击试试。

#### 2、如果不行，用 Steamless 剥壳。

##### 2.a、Steamless 剥壳提示失败（有红字），进 3、

##### 2.b、Steamless 剥壳成功，但直接双击游戏运行报错，进 3、

#### 3、用 steamclient_loader 套壳，可以结合 &#8220;四、&#8221; 试试

</body>  
</html>