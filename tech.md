# tech.md

## 本次 MVP 涉及的技术范围

本次只围绕个人网站 MVP：原生 HTML + CSS。JavaScript 尚未深入，部署只到 Git/GitHub，GitHub Pages 未操作。暂不引入框架、后台、登录、数据库。

## HTML

HTML 先解决“这是什么”，不是“长什么样”。网页可看成页面树：`head` 放页面信息和基础 SEO，`body` 放用户看到的内容。

本次用到：`header` 顶部，`nav` 导航，`main` 主体，`section` 板块，`article` 卡片或文章，`footer` 底部。`div` 是普通容器。`h1/h2/p/ul/li/a` 是标题、段落、列表、链接。`id` 用于定位和跳转，`class` 用于复用样式。

## CSS

CSS 的基本模型是：选择器、属性、值，即控制谁、控制什么、怎么控制。需要后续补例子。

本次理解：先问元素是谁，是容器还是内容，子元素怎么排，间距多少，小屏幕怎么变。接触了 Flex、Grid、`@media`：Flex 用在导航、按钮、标签；Grid 用在首屏分栏和项目卡片。CSS 仍需补对照例子。

## JavaScript

本轮暂未深入。下一步从暗黑模式切换开始，理解 DOM、事件监听、`class` 切换。

## Git / 部署

已完成 Git 初始化、提交、绑定 GitHub 私有仓库、推送。Git 是本地版本记录，GitHub 是远程仓库。

部署理解：最小版本应尽早部署，先打通本地到公网闭环。GitHub Pages 部署需要后续补步骤。

## 仍然不清楚的问题

- CSS 选择器影响范围。
- Flex 和 Grid 的适用场景。
- 响应式断点怎么选。
- JS 如何操作 DOM。
- GitHub Pages 部署步骤。
