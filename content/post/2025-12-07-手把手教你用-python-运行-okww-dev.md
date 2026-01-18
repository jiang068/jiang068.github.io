---
title: 手把手教你用 python 运行 okww-dev
author: jiang068
type: post
date: 2025-12-07T07:59:59+00:00
url: /t/136
featured_image: /wp-content/uploads/okww-dev-sample.png
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
  - 鸣潮
tags:
  - okww
  - python
  - 鸣潮

---
本文将手把手教你如何在 Windows 上克隆、用 python 安装、配置并启动 okww-dev 以规避下号风险。无需编程基础，只需按照步骤复制粘贴即可运行。

## 一、准备工作 {.wp-block-heading}

你需要准备：

  * 已安装 Git（用于拉取项目）
  * 已安装 Python 3.12（推荐版本）
  * Windows 系统
  * 大约 1G 空余存储空间

准备好后即可进行下一步。

## 二、安装 okww-dev  {.wp-block-heading}

新建文件夹 okww-dev，进入后空白处右键 → **在终端中打开（CMD）**，然后按顺序一行一行执行以下命令：

    // 从 GitHub 克隆项目源代码（已用 gh-proxy 加速）
    git clone https://gh-proxy.org/https://github.com/ok-oldking/ok-wuthering-waves.git
    
    // 进入项目目录
    cd ok-wuthering-waves
    
    // 检查 python 版本（推荐 3.12）
    python --version
    
    // 创建名为 okwwvenv 的 Python 虚拟环境
    python -m venv okwwvenv
    
    // 激活虚拟环境
    okwwvenv\Scripts\activate
    
    // 安装 requirements.txt 中的所有依赖（使用中科大镜像源）
    pip install -r requirements.txt -i https://pypi.mirrors.ustc.edu.cn/simple
    
    // 看到 “Successfully installed ...” 说明依赖安装成功
    

安装成功后可以关闭终端 CMD。

## 三、设置 Python 以管理员身份运行（必需！） {.wp-block-heading}

okww 需要对鸣潮游戏进行截图识别，不以管理员方式运行将无法捕获窗口。

操作步骤：

  * 进入文件夹：`ok-wuthering-waves\okwwvenv\Scripts`
  * 找到 **python.exe**
  * 右键 → 属性 → **兼容性**
  * 勾选：**以管理员身份运行此程序**
  * 点击“应用” → “确定”

## 四、如何启动 okww-dev？ {.wp-block-heading}

安装完成后，新建以下两个文件，直接双击即可，注意运行目录：

  * **启动 okww-dev.bat** → 启动程序
  * **更新 okww-dev.bat** → 拉取最新版

启动okww-dev.bat 内容如下：

    cd ok-wuthering-waves
    okwwvenv\Scripts\python.exe -m pip install -U -r requirements.txt -i https://mirrors.ustc.edu.cn/pypi/simple
    okwwvenv\Scripts\python.exe main.py
    pause
    

更新okww-dev.bat 内容如下：

    cd ok-wuthering-waves
    git stash
    git pull https://gh-proxy.org/https://github.com/ok-oldking/ok-wuthering-waves.git
    git stash pop
    pause
    

最终目录应该像这样：

    okww-dev/
    ├─ ok-wuthering-waves/              # 项目主目录（Git 拉取的仓库）
    │   ├─ okwwvenv/                     # Python 虚拟环境目录
    ├─ 启动okww-dev.bat                   # ★ 一键启动脚本
    └─ 更新okww-dev.bat                   # ★ 一键更新脚本
    

以后启动 okww-dev 双击 “启动okww-dev.bat” 即可，更新 okww-dev 双击 “更新okww-dev.bat” 即可。

## 五、如何验证是否启动成功？ {.wp-block-heading}

看到终端窗口连续输出内容、并能识别鸣潮游戏窗口，就说明运行成功。关闭所有黑窗口即可退出。

如有不懂的欢迎随时请教ai.