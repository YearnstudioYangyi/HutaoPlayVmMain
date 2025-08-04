import { defineConfig } from "vitepress"

export default defineConfig({
    lang: "zh-Hans",
    title: "胡桃玩VM",
    description: "Hutao0S",
    lastUpdated: true,
    cleanUrls: true,
    themeConfig: {
        logo: "/favicon.png",
        nav: [
            {
                text: "友链",
                items: [
                    { text: "Yearnstudio资源站", link: "https://alist.yearnstudio.cn" }
                ]
            },
            { text: "关于", link: "/about" },
        ],
        sidebar: [
            { text: "关于", link: "/about" },
            {
                text: "作品", link: "/project", items: [
                    { text: "Windows Hutao OS 10", link: "/project/os10" },
                    { text: "旧Hutao OS 10", link: "/project/old-os10" },
                    { text: "Hutao OS 11", link: "/project/os11" }
                ], collapsed: false
            },
            { text: "好友", link: "/friends" }
        ],
        socialLinks: [
            { icon: "bilibili", link: "https://b23.tv/lzwZxIV" }
        ],
        externalLinkIcon: true,
        langMenuLabel: "切换语言",
        darkModeSwitchLabel: "主题",
        lightModeSwitchTitle: "切换到浅色模式",
        darkModeSwitchTitle: "切换到深色模式",
        sidebarMenuLabel: "菜单",
        outline: { level: [2, 3], label: "目录" },
        returnToTopLabel: "返回顶部",
        docFooter: { prev: "上一篇", next: "下一篇" },
        footer: {
            message: "",
            copyright: `© 2022-${new Date().getFullYear()} 胡桃玩VM`,
        },
    },
    head: [
        ["link", { rel: "icon", href: "/favicon.png" }],
        ["link", { rel: "stylesheet", href: "https://lib.baomitu.com/font-awesome/6.5.1/css/all.min.css", media: "none", onload: "media=\"all\"" }],
    ],
})