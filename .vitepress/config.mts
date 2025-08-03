import { defineConfig } from "vitepress"

export default defineConfig({
    lang: "zh-Hans",
    title: "胡桃玩VM",
    description: "Hutao0S",
    lastUpdated: true,
    cleanUrls: true,
    themeConfig: {
        logo: "/favicon.jpg",
        nav: [
            {
                text: "友链",
                items: [
                    { text: "Yearnstudio资源站", link: "https://alist.yearnstudio.cn" },
                    { text: "陨落基围虾", link: "https://fshrimp.fun" }
                ]
            },
            { text: "关于", link: "/about" },
        ],
        sidebar: [
            { text: "关于", link: "/about" },
            {
                text: "作品", link: "/project", items: [
                    { text: "1", link: "" }
                ], collapsed: false
            },
            { text: "赞助", link: "/sponsor" },
        ],
        socialLinks: [
            { icon: "bilibili", link: "https://b23.tv/lzwZxIV" },
        ],
        externalLinkIcon: true,
        langMenuLabel: "切换语言",
        darkModeSwitchLabel: "主题",
        lightModeSwitchTitle: "切换到浅色模式",
        darkModeSwitchTitle: "切换到深色模式",
        sidebarMenuLabel: "菜单",
        outline: { level: [2, 3], label: "目录" },
        returnToTopLabel: "返回顶部",
        editLink: {
            pattern: "https://github.com/YearnstudioYangyi/YearnstudioMain/blame/main/docs/:path",
            text: "源代码",
        },
        lastUpdated: {
            text: "更新于",
            formatOptions: { dateStyle: "short", timeStyle: "medium" },
        },
        docFooter: { prev: "上一篇", next: "下一篇" },
        footer: {
            message: "欧piggod 唉忘吐和逆碰碰碰碰碰碰碰碰碰",
            copyright: `© 2020-${new Date().getFullYear()} 胡桃玩JB`,
        },
    },
    head: [
        ["link", { rel: "icon", href: "/favicon.jpg" }],
        ["link", { rel: "stylesheet", href: "https://lib.baomitu.com/font-awesome/6.5.1/css/all.min.css", media: "none", onload: "media=\"all\"" }],
    ],
})