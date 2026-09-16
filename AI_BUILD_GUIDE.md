# AI 执行文档 — Te Ara Tukutuku 互动展示台

> **给 AI 的第一条指令：读完本文档之前，不要写任何代码。**
>
> 阅读顺序：`REQUIREMENTS.md` → 本文档 → `PROGRESS.md`（如果存在）→ `DECISIONS.md`（如果存在）。

---

## 0. 你的身份和用户的身份

**你是**：能够读写本地文件的编码助手。

**用户是**：这个毕业设计的作者。她**完全没有技术背景**。她不会写代码，不会看代码，也无法判断你写的代码是对是错。

这意味着三件事：

1. **她能判断的只有屏幕上看到的效果。** 所以你每个阶段都必须交付"她能打开看到的东西"。
2. **她无法纠正你的技术错误。** 所以你必须自己遵守约束，不能指望她发现你越界。
3. **她能判断的是需求和设计。** 这是她的专业领域。所以关于"应该做成什么样",你必须问她;关于"用什么技术做",不要问她。

### 与她沟通的语言规则

- **用中文和她对话。**
- **代码注释用英文。**
- **不要在对话里出现技术词汇。** 不说"状态机"、"路由"、"响应式"、"重构"、"依赖"。
- 需要说明技术决定时，翻译成她能理解的后果。不说"这样会导致跨域问题",说"这样做在她的电脑上双击打开会打不开"。

---

## 1. 工作协议

这七条是硬规则，不是建议。

**1.1 一次只做一个阶段。**
完成后停下，向她汇报，等她确认，再进入下一阶段。不要连续推进多个阶段。

**1.2 每个阶段的产出必须可见。**
不允许出现"这一阶段先搭底层，下一阶段才能看到效果"。每个阶段结束时，她双击 `index.html` 必须能看到比上一阶段更多的东西。

**1.3 不重写已验收的代码。**
上一阶段她确认过的部分，除非她明确要求修改，否则不动。新增功能用新增文件或新增函数实现。你可能会觉得某处写得不够好——忍住。

**1.4 遇到缺失内容必须停下来问。**
`REQUIREMENTS.md` 和数据文件里所有标注"待补"或值为空字符串的地方，是**故意留空的**。不要填充，不要猜测，不要用占位文字蒙混。停下来告诉她缺什么。

**1.5 毛利语和生态数据绝对不许生成。**
te reo Māori 名称、拉丁学名、物种的生态习性数据，只能使用她提供的内容。这涉及文化准确性，编造是不可接受的。如果某个字段是空的，界面上显示明显的占位标记（例如 `[待补充]`），让她一眼看到哪里没填。

**1.6 不改目录结构。**
第 3 节的目录树是固定的。不要新增顶层目录，不要移动文件，不要重命名。

**1.7 每个阶段结束时更新 `PROGRESS.md`。**
格式见第 9 节。这是她开新对话时唯一的上下文来源。

---

## 2. 禁止清单

以下内容**一律不得使用**。如果你认为某项确实必要，停下来说明理由并征求她的同意，不要先斩后奏。

- ❌ TypeScript
- ❌ npm、yarn、pnpm，以及任何需要在终端里安装的东西
- ❌ Vite、Webpack、Parcel，以及任何构建或打包工具
- ❌ React、Vue、Svelte，以及任何前端框架
- ❌ 任何 CDN 链接（`<script src="https://...">`）
- ❌ ES Module（`import` / `export` 语法，以及 `<script type="module">`）
- ❌ `fetch()` 读取本地 JSON 文件
- ❌ Tailwind、Bootstrap，以及任何需要编译的 CSS 方案
- ❌ 代码压缩、混淆
- ❌ localStorage、sessionStorage、IndexedDB
- ❌ three.js 及任何 3D 功能（已确认不需要，见 `REQUIREMENTS.md` 10.1）
- ❌ 任何网络请求

**允许使用**：原生 HTML、原生 CSS、原生 JavaScript（ES2020 语法，普通 `<script>` 标签引入）。仅此而已。

### 为什么禁止 ES Module 和 fetch

她的使用方式是**双击 HTML 文件在浏览器里打开**（`file://` 协议）。在这个协议下，浏览器的跨域安全策略会拦截 ES Module 的加载和 `fetch()` 读取本地文件，页面会白屏，控制台报错，而她没有能力排查。

所以：所有脚本用普通 `<script>` 标签按顺序引入，所有数据用第 4 节的方式以 `.js` 文件形式提供。

---

## 3. 目录结构

**此结构固定，不得变更。**

```
.
├── README.md                 给作者看的操作手册（不要修改）
├── REQUIREMENTS.md           需求文档（不要修改）
├── AI_BUILD_GUIDE.md         本文档（不要修改）
├── DECISIONS.md              Stage 0 的产出，你来创建和维护
├── PROGRESS.md               进度记录，你来创建和维护
├── index.html                唯一的 HTML 文件
├── 启动展示.command           展台启动脚本（Stage 9 创建）
│
├── css/
│   ├── base.css              重置、字体、颜色变量、触控基线
│   ├── layout.css            舞台缩放、屏幕容器、通用组件
│   └── screens.css           各屏幕的具体样式
│
├── js/
│   ├── stage.js              舞台缩放适配
│   ├── router.js             屏幕切换
│   ├── i18n.js               双语切换
│   ├── idle.js               闲置自动复位
│   ├── app.js                启动入口
│   └── screens/
│       ├── home.js
│       ├── map.js
│       ├── species.js
│       ├── story.js
│       ├── games.js
│       └── attract.js
│
├── data/
│   ├── ui-text.js            界面文案（中英）
│   ├── species.js            物种数据
│   ├── story.js              港口故事五章
│   └── map.js                地图图钉
│
└── assets/
    ├── images/
    ├── video/
    ├── audio/
    └── map/
```

`index.html` 中的脚本引入顺序（顺序不能乱）：

```html
<!-- 数据 -->
<script src="data/ui-text.js"></script>
<script src="data/species.js"></script>
<script src="data/story.js"></script>
<script src="data/map.js"></script>
<!-- 核心 -->
<script src="js/stage.js"></script>
<script src="js/i18n.js"></script>
<script src="js/router.js"></script>
<script src="js/idle.js"></script>
<!-- 各屏幕 -->
<script src="js/screens/attract.js"></script>
<script src="js/screens/home.js"></script>
<script src="js/screens/map.js"></script>
<script src="js/screens/species.js"></script>
<script src="js/screens/story.js"></script>
<script src="js/screens/games.js"></script>
<!-- 启动 -->
<script src="js/app.js"></script>
```

---

## 4. 数据契约

这一节是整份文档最重要的部分。

**核心原则：所有内容与代码分离。** 她改文字、换图片、加物种，全部只动 `data/` 目录下的四个文件，永远不碰 `js/` 和 `css/`。

数据文件是 `.js` 而不是 `.json`，因为 `file://` 下无法用 `fetch()` 读取 JSON。格式是给全局变量赋值，内容本身是标准 JSON 结构，她编辑起来和 JSON 没有区别。

### 4.1 `data/ui-text.js`

界面上所有固定文案。键名用点号分层。

```javascript
window.UI_TEXT = {
  "home.title":        { en: "What lives below?",              zh: "海面之下，住着谁？" },
  "home.subtitle":     { en: "Discover the story of Te Waitematā", zh: "探索 Te Waitematā 的故事" },
  "home.play.title":   { en: "Play & Discover",                zh: "玩一玩" },
  "home.play.sub":     { en: "For young explorers",            zh: "给小小探索家" },
  "home.learn.title":  { en: "Explore & Learn",                zh: "看一看" },
  "home.learn.sub":    { en: "For all ages",                   zh: "适合所有人" },
  "home.map.title":    { en: "Map",                            zh: "地图" },
  "home.map.sub":      { en: "Find your way",                  zh: "找到方向" },
  "common.back":       { en: "Back",                           zh: "返回" },
  "common.next":       { en: "Next",                           zh: "下一个" },
  "common.skip":       { en: "Skip",                           zh: "跳过" }
  // 后续阶段按需追加
};
```

**中文译文由你起草，但必须在对话中列出来请她确认。** 她是最终裁定者。

### 4.2 `data/species.js`

```javascript
window.SPECIES = [
  {
    id: "kutai",
    nameMaori: "Kūtai",
    nameEn: "Green-lipped Mussel",
    nameZh: "",
    latin: "Perna canaliculus",
    habitat: "rocky-shore",          // rocky-shore | kelp-forest | open-water
    tagline:    { en: "", zh: "" },  // 一句话定位，例如 "The underwater forest"
    pages: [
      { en: "", zh: "" }             // 每个对象是详情页的一页，对应界面上的 1/4 分页
    ],
    didYouKnow: { en: "", zh: "" },
    image: "",                       // 例如 "assets/images/species-kutai.jpg"
    inChildGame: true                // 是否出现在儿童游戏中
  }
];
```

**规则**：

- `nameMaori` 和 `latin` 已有值的，直接用（来自她自己的剖面图，可信）
- 所有空字符串 `""` 是**合法状态**，表示内容待补。不要填写。
- 界面遇到空值时，渲染为 `[待补充]`，用醒目颜色标出，方便她定位
- 新增物种时只加数组元素，不改代码

初始数据请按 `REQUIREMENTS.md` 6.1 的表格建立全部 11 条记录。海星和 Rimurimu 的 `nameMaori`、`latin` 留空。

### 4.3 `data/story.js`

```javascript
window.STORY = [
  {
    id: "thriving",
    order: 1,
    title:     { en: "A thriving harbour", zh: "" },
    narration: { en: "", zh: "" },
    media: {
      type: "image",   // "image" 或 "video"
      src:  ""         // 例如 "assets/images/story-01.jpg" 或 "assets/video/story-01.mp4"
    }
  }
  // 共五章，见 REQUIREMENTS.md 5.4
];
```

`media.type` 是**降级开关**。视频未就绪时填 `"image"`，视频到位后改成 `"video"` 并换掉 `src`,**界面代码不需要任何改动**。你的渲染逻辑必须同时支持两种类型。

### 4.4 `data/map.js`

```javascript
window.MAP = {
  base: "assets/map/map-base.png",
  pins: [
    {
      id: "you-are-here",
      type: "you-are-here",   // you-are-here | restoration | waterfront | information | toilets | food
      x: 0.42,                // 相对坐标 0~1，相对于底图宽度
      y: 0.55,                // 相对坐标 0~1，相对于底图高度
      label:       { en: "You are here", zh: "你在这里" },
      description: { en: "", zh: "" }
    }
  ]
};
```

**图钉坐标必须用 0~1 的相对值**，不能用像素。这样换一张分辨率不同的底图时，图钉不会错位。

图钉位置由她指定。做法：你先按大致位置放好，然后在对话中告诉她"现在图钉在地图的左侧偏下，需要往哪边移动",根据她的描述调整数值。不要让她直接改坐标数字。

---

## 5. 架构规范

以下机制必须按这里的方式实现，不要用别的写法。

### 5.1 舞台缩放

所有内容放在一个固定 1920×1080 的容器里，整体缩放适配任何屏幕。这样展台和 iPad 上看到的东西完全一致，只是大小不同。

```css
html, body {
  margin: 0;
  height: 100%;
  overflow: hidden;
  background: #000;
}
#stage {
  position: absolute;
  top: 0; left: 0;
  width: 1920px;
  height: 1080px;
  transform-origin: top left;
}
```

```javascript
function fitStage() {
  const stage = document.getElementById('stage');
  const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
  const offsetX = (window.innerWidth  - 1920 * scale) / 2;
  const offsetY = (window.innerHeight - 1080 * scale) / 2;
  stage.style.transform =
    `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
}
window.addEventListener('resize', fitStage);
window.addEventListener('orientationchange', fitStage);
```

**所有 CSS 尺寸一律写 px，按 1920×1080 的绝对坐标布局。** 不要写百分比，不要写 vw/vh，不要写媒体查询。缩放由上面这套机制统一处理。

### 5.2 屏幕切换

每个屏幕是一个 `<section>`，同一时刻只有一个可见。

```html
<div id="stage">
  <section class="screen" data-screen="attract"></section>
  <section class="screen" data-screen="home"></section>
  <section class="screen" data-screen="map"></section>
  <!-- ... -->
</div>
```

```javascript
const Router = {
  current: null,
  history: [],
  go(name) { /* 隐藏当前，显示目标，压入历史，触发该屏幕的 onEnter/onLeave */ },
  back()   { /* 弹出历史，返回上一屏 */ },
  home()   { /* 清空历史，回首页 */ }
};
```

**每个屏幕模块必须提供 `onEnter()` 和 `onLeave()` 两个钩子。** `onLeave()` 里必须停止该屏幕所有正在播放的音视频和动画。这是硬要求——离开故事页时视频还在后台播声音是必现的低级 bug。

### 5.3 双语

HTML 里用属性标记，不要在 JS 里硬写文字。

```html
<h1 data-i18n="home.title"></h1>
<img data-i18n-alt="home.hero.alt" src="...">
```

```javascript
const I18n = {
  lang: 'en',
  t(key) { return (window.UI_TEXT[key] || {})[this.lang] || `[${key}]`; },
  apply(root = document) {
    root.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = this.t(el.dataset.i18n);
    });
  },
  toggle() { this.lang = this.lang === 'en' ? 'zh' : 'en'; this.apply(); }
};
```

**切换语言时不刷新页面，不跳转，不丢失当前位置和游戏进度。**

缺失的键渲染成 `[key.name]` 而不是空白，这样她能一眼看到哪里漏翻了。

**te reo Māori 名称不进 i18n 系统**，它在两种语言下都原样显示，直接从 `species.js` 的 `nameMaori` 取值。

### 5.4 闲置复位

```javascript
const Idle = {
  timeout: 180000,   // 180 秒
  timer: null,
  reset() { clearTimeout(this.timer); this.timer = setTimeout(() => Router.go('attract'), this.timeout); },
  start() { ['pointerdown','keydown'].forEach(e => document.addEventListener(e, () => this.reset())); this.reset(); }
};
```

触发复位时，必须同时停止所有音视频、清空游戏进度、把语言重置回英文。

### 5.5 触控基线

`base.css` 里必须包含：

```css
* {
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  user-select: none;
  box-sizing: border-box;
}
body {
  touch-action: manipulation;   /* 禁用双击缩放 */
  font-family: "Noto Sans", "PingFang SC", sans-serif;
}
.btn, .card, [data-action] {
  min-width: 80px;
  min-height: 80px;
  cursor: pointer;
}
.btn-back {
  min-width: 120px;
  min-height: 60px;
  position: absolute;
  top: 24px;
  left: 24px;
}
```

**字体必须支持 macron 字符（ā ē ī ō ū）。** 选定字体后，在页面上实际渲染一次 `Tāmure Kūtai Tākapu Tarāpunga` 检查，不要只看代码。

**不写任何 `:hover` 样式。** 用 `:active` 代替。

### 5.6 可点区域位置

所有可点击元素的中心点必须落在 **y ≥ 360px** 的区域内（1080 的三分之一以下）。顶部 360px 只放标题和装饰。

例外：左上角返回按钮，位置固定，儿童和轮椅使用者都熟悉这个位置。

---

## 6. Stage 0：需求访谈

**这是第一个阶段，产出不是代码，是 `DECISIONS.md` 文件。**

### 6.1 为什么要有这个阶段

她是设计专业的作者，"应该做成什么样"是她的专业判断，不是你的。`REQUIREMENTS.md` 第 10 节列了 5 个悬而未决的问题，加上访谈中会新冒出来的，这些如果你自己拍板，后面返工的代价极高。

### 6.2 提问规则

- **一次只问一个问题。** 不要列出十条让她一次性回答。
- **给具体选项，不要开放式提问。** 不问"你想要什么风格",问"A 是这样，B 是这样，你选哪个"。
- **每个选项必须说清代价**，不能只说好处。
- **不使用技术词汇。** 例：不问"返回按钮用堆栈式路由还是固定跳转",问"点返回的时候，是回到上一屏，还是直接回首页"。
- **她答不上来时，给一个默认建议并说明理由**，让她只需要说"就按你说的"。
- **总数不超过 10 个问题。** 问完必须进入实现。不要无限追问。

### 6.3 必须问到的内容

先覆盖 `REQUIREMENTS.md` 第 10 节的五项：

1. 文档里的"定期更新物种数据"功能保留还是删除（10.2）
2. 儿童模式的年龄区间（10.3）
3. 栖息地是否需要毛利语名称（10.4）
4. 地图要不要补吸烟区和便利店（10.5）
5. 界面插画是整张当背景，还是只做素材（10.6）—— **这一项影响最大，必须问清楚**

剩余名额留给你在阅读素材后产生的疑问。

### 6.4 `DECISIONS.md` 格式

```markdown
# 设计决策记录

## D-01 儿童模式年龄区间
- 提问时间：2026-xx-xx
- 问题：设计图写 1-5 岁，但游戏里有拖拽操作，低龄儿童做不到
- 作者决定：改为 3-8 岁
- 影响范围：首页卡片文案、儿童模式菜单

## D-02 ...
```

**`DECISIONS.md` 不存在时，不得进入 Stage 1。**

---

## 7. 实施阶段

每个阶段完成后停下汇报，等她确认。

| 阶段 | 内容 | 她应该看到什么 |
|---|---|---|
| **0** | 需求访谈 | `DECISIONS.md` 文件，里面是她自己的决定 |
| **1** | 目录骨架 + 舞台缩放 + 首页静态版 | 双击打开，看到完整的首页，缩放窗口时整体等比缩放，按钮还点不动 |
| **2** | 屏幕切换 + 返回 + 闲置复位 | 首页三个按钮能点进去，进入的是空白占位页，能返回，放着不动三分钟回待机 |
| **3** | 双语系统 | 右上角 EN/中文 能切，首页文字跟着变，切换后停在原地 |
| **4** | 地图 | 地图底图、图钉、图例、点击弹卡片 |
| **5** | 物种图鉴 | 物种列表 → 详情页 → 左右翻页，缺内容的地方显示 `[待补充]` |
| **6** | 港口故事 | 五章切换、进度条、跳过，图片和视频两种模式都能跑 |
| **7** | 儿童模式菜单 + Find Me + Where Do I Live | 两个游戏能完整玩通 |
| **8** | 待机屏 + 完成页 + Bring Back the Colour | 全流程闭环 |
| **9** | 展台部署 + 全面自检 | 启动脚本能双击运行，Chrome 全屏 kiosk |

**Stage 1 是关键。** 她需要尽早看到屏幕上出现真东西。哪怕按钮全是死的，视觉完成度也要做足。

---

## 8. 每阶段自检

**在告诉她"完成了"之前，你必须自己跑完这份清单。** 不允许在未自检的情况下声称完成。

- [ ] 用浏览器打开 `index.html`，控制台无红色报错
- [ ] 把窗口拉到很窄、很宽、很矮，画面始终等比缩放、始终居中、不出滚动条
- [ ] 本阶段新增的每个可点击元素都实际点过一遍
- [ ] 每个屏幕都能返回，不存在走进去出不来的死路
- [ ] 语言切换在本阶段新增的界面上正确生效（Stage 3 之后）
- [ ] 离开含音视频的屏幕后，声音确实停了
- [ ] 没有引入禁止清单里的任何东西
- [ ] 没有修改前一阶段已验收的代码
- [ ] `PROGRESS.md` 已更新

汇报时，用她能验证的语言描述，例如：

> 这一阶段做完了。你双击 index.html，应该能看到首页，上面有三个卡片。
> 试试把浏览器窗口拉窄——整个画面会等比缩小，不会变形。
> 现在点卡片还没有反应，那是下一阶段的事。
> 有两个地方我需要你确认：一是标题的中文翻译，二是三个卡片的排列顺序。

---

## 9. 会话恢复

她可能随时关掉对话窗口，第二天开新的。你必须假设自己每次都是失忆的。

### 9.1 `PROGRESS.md` 格式

每个阶段结束时更新：

```markdown
# 进度记录

最后更新：2026-xx-xx

## 当前状态
已完成到 Stage 3。下一步是 Stage 4（地图）。

## 已完成
- Stage 0：访谈完成，5 项决策已记录在 DECISIONS.md
- Stage 1：首页静态版完成，已验收
- Stage 2：屏幕切换完成，已验收
- Stage 3：双语系统完成，已验收

## 等待作者提供的素材
- [ ] 园区平面图高清版（Stage 4 需要，缺它无法开始）
- [ ] 11 个物种的配图
- [ ] 港口故事五章的插画或视频

## 等待作者确认的问题
- 物种详情页每页字数上限，她还没定

## 已知问题
- 暂无
```

### 9.2 新对话的开场

她会在新对话里粘贴这句话：

> 请先读 REQUIREMENTS.md、AI_BUILD_GUIDE.md、PROGRESS.md 和 DECISIONS.md，然后告诉我现在做到哪一步了，接下来该做什么。

**收到这句话时，先读四个文件，然后用她能理解的话复述进度，再等她指示。不要读完就自动开始写代码。**

---

## 10. 展台部署（Stage 9）

创建 `启动展示.command`：

```bash
#!/bin/bash
cd "$(dirname "$0")"
open -na "Google Chrome" --args \
  --kiosk \
  --user-data-dir="/tmp/exhibit-profile" \
  --autoplay-policy=no-user-gesture-required \
  --disable-pinch \
  --overscroll-history-navigation=0 \
  "file://$(pwd)/index.html"
```

创建后必须执行 `chmod +x 启动展示.command`，否则双击无效。

**提醒她**：macOS 第一次运行这个文件会被安全机制拦下。解法是右键点击文件，选"打开"，在弹窗里再点一次"打开"。之后就能正常双击了。

退出 kiosk 模式按 `Cmd + Q`。

---

## 11. 常见失误

以下是这类项目最容易出的问题。开工前读一遍，做完对照检查。

| 失误 | 后果 | 防范 |
|---|---|---|
| 用 `fetch()` 读 JSON | 双击打开白屏，她完全无法排查 | 数据用 `.js` 全局变量 |
| 用了 `<script type="module">` | 同上 | 普通 `<script>` 标签 |
| 写了 `:hover` 效果 | 触摸屏上完全无效，或出现按下后卡住的残留状态 | 只用 `:active` |
| 用 vw/vh 或百分比布局 | 在 iPad 上错位 | 一律 px，靠舞台缩放适配 |
| 离开页面没停视频 | 声音在后台一直响 | `onLeave()` 里必须停 |
| 字体不支持 macron | Tāmure 显示成方框 | 真机渲染验证 |
| 图钉用像素坐标 | 换底图后全部错位 | 用 0~1 相对坐标 |
| 把文字画进图片里 | 无法切换语言 | 文字一律用 HTML |
| 自作主张填了毛利语名 | 文化错误，答辩事故 | 空值就是空值，显示 `[待补充]` |
| 一次做完三个阶段 | 出问题无法定位，她也跟不上 | 一次一个，停下等确认 |
