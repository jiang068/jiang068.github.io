### 咱喵的个人博客

欢迎来玩！

- **GitHub Pages 地址:** [jiang068.github.io](https://jiang068.github.io)
- **Cloudflare Pages 镜像:** [fufu.blog](https://fufu.blog)

---

### 双端部署注意事项

本文档记录了如何将 Hugo 博客同时部署到 GitHub Pages 和 Cloudflare Pages。

#### 1. 根目录 `hugo.yaml` 配置

`baseURL` 保持为空，以便在构建时通过命令行参数动态指定。

```yaml
# baseURL 留空，在构建命令中指定
baseURL: ""

# 永久链接配置
permalinks:
    post: /:slug/
    page: /:slug/

relativeURLs: false
canonifyURLs: true
```

#### 2. GitHub Pages 部署配置 (`.github/workflows/hugo.yml`)

在 GitHub Actions 工作流中，通过 `--baseURL` 参数指定站点 URL。

```yaml
# ... (其他配置)

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      # 确保 Hugo 版本一致
      HUGO_VERSION: 0.154.4
    steps:
      # ... (其他步骤)
      - name: Build with Hugo
        run: |
          hugo \
            --gc \
            --minify \
            --baseURL "https://jiang068.github.io/"
```

#### 3. Cloudflare Pages 部署配置

##### 构建设置

| 项目         | 配置                                                 |
| ------------ | ---------------------------------------------------- |
| **构建命令** | `hugo --gc --minify --baseURL "https://fufu.blog/"` |
| **构建输出** | `public`                                             |

##### 环境变量

确保 Cloudflare Pages 的构建环境使用与本地和 GitHub Actions 相同的 Hugo 版本。

| 变量名       | 值        |
| ------------ | --------- |
| `HUGO_VERSION` | `0.154.4` |

---

### 博客主题：Argon
![Argon](https://cdn.jsdelivr.net/gh/solstice23/cdn@master/argon_new_animate.svg)


- **Argon-Theme 原仓库:** [solstice23/argon-theme](https://github.com/solstice23/argon-theme)


- **Hugo的Argon移植:（正在做）** 
[jiang068/Hugo-Theme-Argon](https://github.com/jiang068/Hugo-Theme-Argon
)

---

