module.exports = {
  title: "不露声色丶",
  description: "个人网站",
  // base: "/note/default/",
  base: "/",
  markdown: {
    lineNumbers: true, // 代码块显示行号
  },
  theme: "reco",
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  themeConfig: {
    type: 'blog',
    authorAvatar: 'https://images-1300779496.cos.ap-shanghai.myqcloud.com/WechatIMG4.jpeg',
    subSidebar: "auto",
    lastUpdated: '最后更新时间',
    // nextLinks: '下一篇',
    // prevLinks: '上一篇',
    record: '鄂ICP备2022009490号',
    recordLink: 'https://beian.miit.gov.cn',
    displayAllHeaders: true,
    nav: [
      {
        text: "笔记",
        link: "/notes/",
      },
      {
        text: "面试题",
        link: "/questions/",
      },
      {
        text: "服务器",
        link: "/service/",
      },
      {
        text: "常用mac",
        link: "/mac/",
      },
      {
        text: "typescrpt学习",
        link: "/tsNotes/",
      },

      { text: "GitHub", link: "https://github.com/GuoweiYangGitHub" },
    ],
    sidebar: {
      "/notes/": [
        {
          path: "/notes/css/commonUsed",
          title: "CSS",
          collapsable: false,
          children: [
            { title: "常见样式", path: "/notes/css/commonUsed" },
            { title: "常见布局", path: "/notes/css/layout" },
            { title: "兼容性问题", path: "/notes/css/compatibility" },
          ],
        },
        {
          path: "/notes/js/knowledge",
          title: "JS",
          collapsable: false,
          children: [
            { title: "JS基础知识点", path: "/notes/js/knowledge" },
            { title: "Map数据类型", path: "/notes/js/setmap" },
            { title: "设计模式", path: "/notes/js/designMode/pattern" },
            { title: "设计模型", path: "/notes/js/designMode/model" },
          ],
        },
        {
          path: "/notes/vue/vue",
          title: "Vue",
          collapsable: false,
          children: [{ title: "基础", path: "/notes/vue/vue" }],
        },
        {
          path: "/notes/wxapp/basics",
          title: "小程序",
          collapsable: false,
          children: [
            { title: "基础知识", path: "/notes/wxapp/basics" },
            { title: "常见问题", path: "/notes/wxapp/scene" },
            { title: "小程序扫码", path: "/notes/wxapp/scan" },
            { title: "兼容性问题", path: "/notes/wxapp/compatibility" },
            { title: "使用Taro开发小程序", path: "/notes/wxapp/taroUsed" },
          ],
        },
        {
          path: "/notes/others/npm",
          title: "其他",
          collapsable: false,
          children: [
            { title: "表单提交类型", path: "/notes/others/contentType" },
            { title: "NPM", path: "/notes/others/npm" },
          ],
        },
      ],
      "/questions/": [
        {
          title: "前端基础",
          path: "/questions/fontEndBasic/html",
          collapsable: false,
          children: [
            { title: "HTML", path: "/questions/fontEndBasic/HTML" },
            { title: "CSS", path: "/questions/fontEndBasic/CSS" },
            { title: "JS", path: "/questions/fontEndBasic/JS" },
            { title: "Vue", path: "/questions/fontEndBasic/Vue" },
            { title: "React", path: "/questions/fontEndBasic/React" },
            { title: "小程序", path: "/questions/fontEndBasic/WXApp" },
            { title: "Webpack", path: "/questions/fontEndBasic/Webpack" },
            { title: "性能优化", path: "/questions/fontEndBasic/PerformanceOptimization" },
            { title: "跨终端", path: "/questions/fontEndBasic/CrossTerminal" },
            // { title: "速背知识点", path: "/questions/速背知识点" },
          ],
        },
        {
          title: "计算机基础",
          path: "/questions/computer/ComputerNetWork",
          collapsable: false,
          children: [
            { title: "浏览器基础与http协议", path: "/questions/computer/ComputerNetWork" },
            { title: "网络安全", path: "/questions/computer/SecurityNote" },
          ]
        },
        {
          title: "数据类型与算法",
          path: "/questions/dataStructure/Concept",
          collapsable: false,
          children: [
            { title: "数据结构", path: "/questions/dataStructure/Concept" },
            { title: "常见排序算法", path: "/questions/dataStructure/Sort" },
            { title: "算法题", path: "/questions/dataStructure/Algorithm" },

          ]
        },
        {
          title: "Typescript",
          path: "/questions/typescript/TypeScript",
          collapsable: false,
          children: [
            { title: "Typescript", path: "/questions/typescript/TypeScript" },
          ]
        },
        {
          title: "自动化测试",
          path: "/questions/autoTesting/AutoTesting",
          collapsable: false,
          children: [
            { title: "自动化测试", path: "/questions/autoTesting/AutoTesting" },
          ]
        },
        {
          title: "手写题",
          path: "/questions/written/Written",
          collapsable: false,
          children: [
            { title: "常见笔试题", path: "/questions/written/Written" },
            { title: "Axios", path: "/questions/written/Axios" },
            { title: "Promise", path: "/questions/written/Promise" },
            { title: "深拷贝", path: "/questions/written/DeepClone" },
            { title: "数组对象去重", path: "/questions/written/ArrayObject" },
            { title: "判断程序输出的结果", path: "/questions/written/GetOutputResults" },
          ],
        },
        {
          title: "面试记录",
          path: "/questions/questionHistory/2022.10",
          collapsable: false,
          children: [
            { title: "2022.10", path: "/questions/questionHistory/2022.10" },
            { title: "2021.04", path: "/questions/questionHistory/2021.04"},
            { title: "2021.01", path: "/questions/questionHistory/2021.01" },
            { title: "2020.12", path: "/questions/questionHistory/2020.12" },
            { title: "2020.11", path: "/questions/questionHistory/2020.11" },
            { title: "2019.06", path: "/questions/questionHistory/2019.06" },
          ],
        },
      ],
      "/service/": [
        {
          path: "/service/nginx",
          title: "服务器",
          collapsable: false,
          children: [
            { title: "Nginx", path: "/service/nginx" },
            { title: "常见配置", path: "/service/own" },
          ],
        },
      ],
      "/mac/": [
        {
          path: "/mac/command",
          title: "MAC常用",
          collapsable: false,
          children: [{ title: "mac常用", path: "/mac/command" }],
        },
      ],
      "/tsNotes/": [
        {
          path: "/tsNotes/README",
          title: "typescript笔记",
          collapsable: false,
          children:[
            { title: "typescript笔记", path: "/tsNotes/README" },
          ]
        },
        {
          path: "/tsNotes/Normal",
          title: "基础",
          // collapsable: false,
          // children:[
          //   { title: "基础", path: "/tsNotes/Normal" },
          // ]
        },
        {
          path: "/tsNotes/ObjectType",
          title: "对象类型",
          // collapsable: false,
          // children:[
          //   { title: "对象类型", path: "/tsNotes/ObjectType" },
          // ]
        },
        {
          path: "/tsNotes/Generics",
          title: "泛型",
          // collapsable: false,
          // children: [
          //   { title: "泛型", path: "/tsNotes/Generics" },
          // ]
        },
        {
          path: "/tsNotes/Keyof",
          title: "keyof操作符",
          // collapsable: false,
          // children:[
          //   { title: "keyof操作符", path: "/tsNotes/Keyof" },
          // ]
        },
        {
          path: "/tsNotes/IndexAccess",
          title: "索引访问类型",
          // collapsable: false,
          // children:[
          //   { title: "索引访问类型", path: "/tsNotes/IndexAccess" },
          // ]
        },
        {
          path: "/tsNotes/ConditionalTypes",
          title: "条件类型",
          // collapsable: false,
          // children:[
          //   { title: "条件类型", path: "/tsNotes/ConditionalTypes" },
          // ]
        }
      ],
    },
  },

  plugins: [
    [
      "vuepress-plugin-nuggets-style-copy",
      {
        copyText: "复制代码",
        tip: {
          content: "复制成功",
        },
      },
    ],
    [
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        theme: [
          "blackCat",
          "whiteCat",
          "haru1",
          "haru2",
          "haruto",
          "koharu",
          "izumi",
          "shizuku",
          "wanko",
          "miku",
          "z16",
        ],
      },
    ],
    [
      "cursor-effects",
      {
        size: 2, // size of the particle, default: 2
        shape: "star", // ['star' | 'circle'], // shape of the particle, default: 'star'
        zIndex: 999999999, // z-index property of the canvas, default: 999999999
      },
    ],
    [
      "dynamic-title",
      {
        showIcon: "https://clouds.guowei.link/blog/favicon-current-32x32.png",
        showText: "客官欢迎回来~",
        hideIcon: "https://clouds.guowei.link/blog/favicon-32x32.png",
        hideText: "客官不要走嘛~",
        recoverTime: 2000,
      },
    ],
    [
      "@vuepress-reco/comments",
      {
        solution: "vssue",
        options: {
          title: "vuepress-theme-reco",
          platform: "github",
          owner: "GuoweiYangGitHub",
          repo: "blog-collection",
          clientId: "3676f0f704ec8a80",
          clientSecret: "3685d77834f6777e5f76306f06ea42fcfa289920",
        },
      },
    ],
  ],
};
