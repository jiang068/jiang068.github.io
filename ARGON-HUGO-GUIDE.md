# Argon Hugo 内容与配置约定

## 主题配置

博客的主题配置在 `hugo.yaml` 的 `params` 下。`themeColor` 是博客主人指定的默认主题色，例如当前的 `#f8b5ff`；开启 `showCustomizeThemeColorPicker` 后，访客仍可在右下角设置面板临时换色，颜色会保存在浏览器本地。

常用设置：

```yaml
params:
  themeColor: "#f8b5ff"
  showCustomizeThemeColorPicker: true
  articleMeta: "time|views|categories"
  firstImageAsThumbnail: true
  showThumbnailInBannerInContentPage: false
  enableCodeHighlight: true
  codeHighlightStyle: "vs2015"
```

`codeHighlightStyle` 使用 `static/assets/vendor/highlight/styles/` 中的 Highlight.js 配色文件名，不带 `.css`。默认 `vs2015` 与原 WordPress Argon 的默认设置一致。

## 新文章写法

推荐使用页面资源包，让头图和文章一起管理：

```sh
hugo new post/my-article/index.md
```

然后把 `cover.jpg` 放在同一个目录，并写：

```yaml
---
title: "文章标题"
date: 2026-09-11T12:00:00+08:00
lastmod: 2026-09-11T12:00:00+08:00
draft: false
type: post
description: "首页卡片和 SEO 摘要"
image: cover.jpg
categories: [分类]
tags: [标签]
views: 0
---
```

也可以把图片放在正文第一张，并依赖 `firstImageAsThumbnail: true` 自动作为缩略图。WordPress 导出的旧文章仍兼容 `featured_image`、`thumbnail`、数组形式的 `views` 以及 `argon_*` 字段。旧文章中的旧图片地址保持原样，不由主题猜测或改写；长期维护的新文章应改用 `image` 和页面资源包。

正文使用标准 Markdown 围栏代码块：

````markdown
```powershell
Get-ChildItem
```
````

主题会自动进行 Highlight.js 高亮、行号、复制、折行和全屏；需要原样显示某一块时，可给 `pre`/`code` 加 `no-hljs`。

## WordPress 字段对照

| WordPress/旧导出 | Hugo Argon 写法 |
| --- | --- |
| 特色图片 | `image`；旧 `featured_image` 仍可用 |
| 浏览量初始值 | `views: 123`；旧数组 `views: [123]` 也可用 |
| 分类/标签 | `categories` / `tags` |
| 摘要 | `description` 或正文中的 `<!--more-->` |
| 首图作为缩略图 | `firstImageAsThumbnail`，文章级可用 `argon_first_image_as_thumbnail` |
| 顶部头图 | `showThumbnailInBannerInContentPage` |

## 阅读量

主题仓库的 `cloudflare/view-counter/` 中已经提供 Worker、D1 schema、已有浏览量导入脚本和部署说明。Cloudflare 的正式产品名是 D1，不是 D2。先执行 `schema.sql` 和一次 `seed.sql`，再部署并把 endpoint、前端密钥写入 `params.viewCounter`；文章页会原子增加一次计数，首页/分类页读取计数。Worker 或密钥未配置、请求失败时，主题会隐藏阅读量，不影响静态站点。
