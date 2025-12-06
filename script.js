// --- Data Configuration ---
        const NAV_LINKS = [
            { title: "首页 Main", url: "https://www.wavetransformer.ink/" },
            { title: "资源站 Alist", url: "https://alist.wavetransformer.ink/" },
            { title: "博客 Blog", url: "https://blog.wavetransformer.ink/" },
            { title: "实验报告", url: "https://jiang068.github.io/ds/" },
            { title: "Github", url: "https://github.com/jiang068?tab=repositories" },
        ];

        const CATEGORIES = [
            {
                id: "main",
                title: "咱喵的导航页",
                icon: "home",
                colorTheme: "purple",
                links: [
                    { title: "首页 Main", url: "https://www.wavetransformer.ink/", description: "进入主站" },
                    { title: "资源站 Alist", url: "https://alist.wavetransformer.ink/", description: "文件与资源存储" },
                    { title: "博客 Blog", url: "https://blog.wavetransformer.ink/", description: "记录点滴生活" },
                    { title: "实验报告", url: "https://jiang068.github.io/ds/", description: "学习资料分享" },
                    { title: "仓库 Github", url: "https://github.com/jiang068?tab=repositories", description: "开源项目代码" },
                ]
            },
            {
                id: "bot",
                title: "QQbot 搭建教程",
                icon: "bot",
                colorTheme: "blue",
                links: [
                    { title: "koishi4vlab 教程", url: "https://github.com/jiang068/koishi4vlab", description: "机器人搭建指南" },
                ]
            },
            {
                id: "galgame",
                title: "Galgame 专区",
                icon: "gamepad-2",
                colorTheme: "pink",
                links: [
                    { title: "Galgame梓澪の妙妙屋", url: "https://zi6.cc/" },
                    { title: "失落小站", url: "https://www.shinnku.com/", description: "Galgame资源站" },
                    { title: "鲲 Galgame 论坛", url: "https://www.kungal.com/zh-cn/", description: "开源 Galgame 网站" },
                    { title: "Touchgal", url: "https://www.touchgal.io/", description: "一站式gal社区" },
                    { title: "星野のAList", url: "https://a.0v0.io/Rec仓库/" },
                    { title: "Gal图库", url: "https://gelbooru.com/index.php" },
                ]
            },
            {
                id: "favorites",
                title: "收藏页",
                icon: "heart",
                colorTheme: "red",
                links: [
                    { title: "Sekai 贴纸", url: "https://sekai.wavetransformer.ink/", description: "表情包生成站 (无广)" },
                    { title: "Koishi 面板", url: "https://koishi.wavetransformer.ink/", description: "配置面板 (需权限)" },
                    { title: "Gscore 面板", url: "https://gscore.wavetransformer.ink/", description: "早柚配置 (需权限)" },
                    { title: "Waves 面板", url: "https://wave.wavetransformer.ink/", description: "鸣潮Bot登录 (需特征码)" },
                    { title: "幻影坦克制作", url: "https://jiang0681.github.io/" },
                    { title: "萌！萝莉", url: "https://www.hellowindows.cn/", description: "blivechat弹幕抓取" },
                    { title: "肥猫云", url: "https://fatcatcloud.cc/", description: "目前在用" },
                    { title: "大航海", url: "https://dhh.bar", description: "目前最便宜" },
                ]
            },
            {
                id: "resources",
                title: "常用资源",
                icon: "save",
                colorTheme: "green",
                links: [
                    { title: "蜗壳学社", url: "https://ot.ustc.edu.cn/" },
                    { title: "VRC模型", url: "forum.ripper.store" },
                    { title: "m0nkrus", url: "https://w14.monkrus.ws/", description: "Adobe 资源" },
                    { title: "Adobe全家桶", url: "https://docs.qq.com/doc/DSkFFcUR3bmV2ZXlo/", description: "231103版本" },
                    { title: "Synthesizer V", url: "https://synthv.me/", description: "Voice Archive" },
                    { title: "HelloWindows", url: "https://www.hellowindows.cn/", description: "系统下载仓储" },
                    { title: "Adobe全套", url: "https://www.yuque.com/qianxun-nzpyh/kb" },
                    { title: "STEAMUNLOCKED", url: "https://steamunlocked.net/", description: "Free Pre-installed Games" },
                ]
            },
            {
                id: "drive",
                title: "开车喵~",
                icon: "car",
                colorTheme: "yellow",
                links: [
                    { title: "子不语", url: "https://www.eporner.com/gallery/M5kuhggMiZI/NO-074-90P2V-2-98G/" },
                    { title: "Sukebei", url: "https://sukebei.nyaa.si/" },
                    { title: "毒奶", url: "https://limbopro.com/archives/1903.html" },
                    { title: "Imgbb", url: "https://jiang0682.imgbb.com/following" },
                    { title: "Cosblay", url: "https://cosblay.com/" },
                ]
            },
            {
                id: "friends",
                title: "友链",
                icon: "link",
                colorTheme: "cyan",
                links: [
                    { title: "荼蘼博客", url: "https://blog.tomys.top/" },
                    { title: "Argon Theme", url: "https://github.com/solstice23/argon-theme/" },
                    { title: "Freecho", url: "https://www.liveout.cn/25/" },
                    { title: "Pinpe的云端", url: "https://blog.pinpe.top/" },
                    { title: "NieR:Automata", url: "https://nier.moovoo.xyz/", description: "[E]nding" },
                ]
            }
        ];

        // --- Helpers ---
        function getThemeColors(theme) {
            const map = {
                purple: 'hover:border-purple-500 hover:shadow-purple-500/20 group-hover:text-purple-400 text-purple-400',
                blue: 'hover:border-blue-500 hover:shadow-blue-500/20 group-hover:text-blue-400 text-blue-400',
                pink: 'hover:border-pink-500 hover:shadow-pink-500/20 group-hover:text-pink-400 text-pink-400',
                red: 'hover:border-red-500 hover:shadow-red-500/20 group-hover:text-red-400 text-red-400',
                green: 'hover:border-green-500 hover:shadow-green-500/20 group-hover:text-green-400 text-green-400',
                yellow: 'hover:border-yellow-500 hover:shadow-yellow-500/20 group-hover:text-yellow-400 text-yellow-400',
                cyan: 'hover:border-cyan-500 hover:shadow-cyan-500/20 group-hover:text-cyan-400 text-cyan-400',
            };
            return map[theme] || map.purple;
        }

        // --- Rendering ---
        
        // 1. Render Navbar Links
        const desktopMenu = document.getElementById('desktop-menu');
        const mobileMenuLinks = document.getElementById('mobile-menu-links');
        
        NAV_LINKS.forEach(link => {
            // Desktop
            const a = document.createElement('a');
            a.href = link.url;
            a.textContent = link.title;
            a.target = link.url.startsWith('http') ? '_blank' : '_self';
            a.className = "relative group px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors";
            a.innerHTML = `${link.title} <span class="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>`;
            desktopMenu.appendChild(a);

            // Mobile
            const ma = document.createElement('a');
            ma.href = link.url;
            ma.textContent = link.title;
            ma.target = link.url.startsWith('http') ? '_blank' : '_self';
            ma.className = "block px-3 py-4 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all";
            ma.onclick = () => toggleMobileMenu(false);
            mobileMenuLinks.appendChild(ma);
        });

        // 2. Render Categories
        const container = document.getElementById('categories-container');
        
        CATEGORIES.forEach((cat, index) => {
            const section = document.createElement('div');
            section.className = "mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out";
            section.style.transitionDelay = `${index * 100}ms`; // Staggered fade in
            
            // Header
            const themeClass = getThemeColors(cat.colorTheme);
            const iconColorClass = themeClass.split(' ').pop(); // simple hack to get text color class
            
            const header = `
                <div class="flex items-center space-x-3 mb-6 pl-2">
                    <div class="p-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 ${iconColorClass}">
                        <i data-lucide="${cat.icon}" class="w-6 h-6"></i>
                    </div>
                    <h2 class="text-2xl md:text-3xl font-bold text-white tracking-wide">${cat.title}</h2>
                    <div class="flex-grow h-px bg-gradient-to-r from-white/20 to-transparent ml-4"></div>
                </div>
            `;
            
            // Grid
            let gridContent = '';
            cat.links.forEach(link => {
                const activeClass = getThemeColors(cat.colorTheme).replace('text-', 'group-hover:text-'); // adjust class string
                
                gridContent += `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer" 
                       class="group relative flex flex-col justify-between p-4 h-full bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 ${activeClass}">
                        <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-50 transition-opacity">
                            <i data-lucide="external-link" class="w-3.5 h-3.5 text-gray-400"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-100 group-hover:text-white transition-colors line-clamp-1">${link.title}</h3>
                            ${link.description ? `<p class="mt-2 text-sm text-gray-400 group-hover:text-gray-300 line-clamp-2 leading-relaxed">${link.description}</p>` : ''}
                        </div>
                        <div class="mt-4 flex items-center text-xs font-medium text-gray-500 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                            <span>Visit Site</span>
                            <i data-lucide="arrow-right" class="w-3 h-3 ml-1"></i>
                        </div>
                    </a>
                `;
            });

            section.innerHTML = header + `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">${gridContent}</div>`;
            container.appendChild(section);
        });

        // 3. Initialize Icons
        lucide.createIcons();
        document.getElementById('year').textContent = new Date().getFullYear();

        // --- Interactivity ---

        // Navbar Scroll Effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('glass-nav', 'py-2');
                navbar.classList.remove('py-4');
            } else {
                navbar.classList.remove('glass-nav', 'py-2');
                navbar.classList.add('py-4');
            }
        });

        // Mobile Menu
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        let isMenuOpen = false;

        function toggleMobileMenu(forceState) {
            isMenuOpen = forceState !== undefined ? forceState : !isMenuOpen;
            
            // Toggle Menu
            if (isMenuOpen) {
                mobileMenu.classList.add('mobile-menu-enter-active');
            } else {
                mobileMenu.classList.remove('mobile-menu-enter-active');
            }

            // Toggle Icon: Replace innerHTML because Lucide transforms <i> to <svg>
            const iconName = isMenuOpen ? 'x' : 'menu';
            mobileMenuBtn.innerHTML = `<i data-lucide="${iconName}"></i>`;
            lucide.createIcons();
        }

        mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());

        // Scroll to Top
        const scrollTopBtn = document.getElementById('scroll-top-btn');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
            } else {
                scrollTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
            }
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Intersection Observer for Fade-in Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.getElementById('hero-section').classList.remove('opacity-0', 'translate-y-8'); // Immediate show for hero
        
        // Observe category sections
        Array.from(container.children).forEach(child => {
            observer.observe(child);
        });