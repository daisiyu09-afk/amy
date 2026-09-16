# 进度记录

最后更新：2026-09-16

## 当前状态

已完成四步计划中的第一步实现：整体框架、首页、三个入口预览页、中英文切换。浏览器本地预览自检通过，等待作者查看画风与文案。下一步是第二步：港口故事、物种图鉴与正式地图。

本项目当前主题为 **Te Ara Tukutuku · Kelp restoration（海藻林修复）**。本轮采用 `DECISION.md` 中合并后的四步计划，不按旧文档的 Stage 1 静态首页范围判断进度。

## 已完成

- 按参考图制作海洋蓝绿色视觉、圆角入口卡片、海港与海藻林背景。
- 首页三个入口：Play & Discover、Explore & Learn、Map。
- 儿童探索、探索学习、地图三个预览页；均可返回或回首页。
- 英文为默认语言；中文切换更新页面文字、图片说明和浏览器标题，并保留当前页面。
- 1920×1080 舞台整体等比缩放、居中，不产生页面滚动条。
- 所有当前按钮使用原生按钮，支持点击和键盘；键盘选中有清楚边框。
- 图片与界面文字集中在 `data/ui-text.js`，另外三个数据文件留待第二步补充。
- 全部图片、脚本和样式位于仓库；没有外部字体、第三方库或联网数据。

## 打开与验收

- 文件入口：`index.html`。可在电脑上用 Chrome 双击打开。
- 本次已验证的预览地址：[本机预览](http://127.0.0.1:8765/index.html)。此地址仅适用于当前电脑，预览服务停止后将不可访问。
- 建议查看路线：首页 → 儿童探索 → 中文 → 返回 → 探索与学习 → 回首页 → 地图 → 英文。
- 第一阶段的内容项为非点击的预览说明，明确标注正在准备；故事、游戏、物种详情和地图图钉尚未实现。

## 本次自检结果

- 四个页面在中英文下正常显示；没有未翻译键或断图。
- 三个入口实际点击通过，返回与回首页实际点击通过。
- 中英文切换后页面保持不变，毛利语专有名称保持原样。
- 实际使用 Tab 选中首页卡片，看到焦点边框，并用 Enter 成功进入儿童页。
- 在 1920×1080、1024×768、600×900、1600×450 预览尺寸下，缩放完成后均保持 16:9、居中，无页面溢出。
- 实际渲染检查了 `Tāmure Kūtai Tākapu Tarāpunga`、`ā ē ī ō ū` 和中文，显示正常。
- 浏览器控制台未出现错误或警告；所有 JavaScript 文件语法检查通过。
- HTML 引用的本地文件全部存在，无远程资源链接。

## 尚未验证与已知限制

- 预览工具的安全策略拒绝直接访问 `file://`，因此本次通过仅提供本项目文件的本机 HTTP 预览完成检查；没有绕过浏览器的本地文件限制。实际 Chrome 双击、断网和 iPad Safari 仍需设备端核验。
- 当前未在真实触摸屏、轮椅使用情境或辅助阅读设备上测试；不能将本次检查等同于全面无障碍验证。
- 狭窄或竖屏窗口按原要求整体缩小，内容会变小；明早建议使用电脑或 iPad 横屏展示。
- 图片是 AI 生成的示意插画，不是场地照片或物种鉴定图；示意地图不是实际平面图。
- 待机页、180 秒复位和音视频暂停的实际播放检查留在第四步。目前页面没有音视频、自动动画或游戏进度。
- 尚未发布 GitHub Pages。

## 等待作者查看

- 首页画风与配色。
- 中文文案草稿：海面之下，住着谁？／玩一玩，找一找／探索与学习／园区地图／海藻林修复。已在对话中提出可选确认；未答复前保留草稿。

## 后续需要的素材

- 园区平面图以及已确认的地点信息。
- 可核实的物种介绍和配图。
- 五章故事的正式图片或视频；目前参考资料和故事方向已记入 `DECISION.md`。

## 素材生成记录

使用内置 **ImageGen**，没有使用 CLI 或额外 API 密钥。原始 PNG 留在工具生成目录，交付副本转换为 JPG 后放入仓库。首页背景约 439 KB；两张插画约 516 KB、554 KB，分别在原背景 500 KB 和插画 800 KB 上限内。

地图预览与波浪标识为本地 SVG 图形，地图仅为抽象占位示意。界面文字和按钮均为独立页面元素，没有画进图片。

### 首页背景

- 保存位置：`assets/images/harbour-hero.jpg`
- 提示词：

```text
Use case: illustration-story. Asset type: full-bleed 16:9 background for an accessible museum touch exhibit, Te Ara Tukutuku kelp restoration in Auckland. Create one polished wide 1920x1080 landscape illustration, no text or UI. Style: warm hand-painted digital children's nature-book illustration, softly textured gouache, detailed but calm, rounded organic shapes, luminous turquoise, sea glass cyan, rich deep teal and olive kelp greens. Scene: a poetic cutaway from Auckland harbour above to a lush underwater kelp forest below. Very thin strip of soft sky and distant Auckland skyline with slender Sky Tower at the top quarter, gently rippling sea surface. Below, turquoise water with soft sunbeams and small blue fish; tall broad ribbon kelp framing the far left and right edges, smooth rocks at the bottom. The central upper middle is uncluttered deep teal blue water with no objects, reserved for a large white headline added separately in HTML. At least 60 percent of the middle and lower scene is quiet enough to put three large UI cards over it. Underwater plants are native-looking kelp, no tropical coral, no scuba divers, no scientific labels, no logo, no words, no numbers, no border. Mood inviting, wondrous and beautiful for families, suitable for an educational prototype; not claiming an actual photograph or exact current site.
```

### 儿童探索插画

- 保存位置：`assets/images/play-discover.jpg`
- 提示词：

```text
Use case: illustration-story. Asset type: 3:2 landscape card illustration for a preschool marine museum touchscreen. Create a beautiful finished digital gouache children's picture-book illustration in luminous aqua, pale seafoam, kelp olive and orange. A friendly rounded orange sea star rests on a smooth dark rock in the lower right, three small expressive blue fish swim across the center-left, with flowing broad-leaf kelp along the edges, a few bubbles, sandy sea floor, soft underwater sun rays. Cute but sophisticated, subtly painterly texture with confident clean rounded outlines, joyful friendly atmosphere. Rich composition fills the rectangle edge to edge, not an isolated icon. Leave breathing room around the starfish and fish. Illustrative imagined scene only, not a species identification chart. No tropical coral, no text, no lettering, no labels, no logo, no border or UI.
```

### 海藻林插画

- 保存位置：`assets/images/kelp-forest.jpg`
- 提示词：

```text
Use case: illustration-story. Asset type: 3:2 landscape card illustration for Te Ara Tukutuku kelp restoration museum exhibit. Hand-painted digital gouache with elegant rounded organic shapes, soft visible brush texture and luminous water; same visual language as a sophisticated children's ocean storybook. A thriving imagined temperate kelp forest fills the scene, long broad olive and golden green kelp ribbons reaching upward, two softly rendered blue fish swimming between the leaves, pale aqua sunbeams pouring down from the turquoise surface. Foreground kelp richly detailed, deeper blue-green silhouettes add depth. Inviting and wondrous, suitable for children and adults, vivid without garishness. Composition focuses on the beauty of kelp rather than fish, no tropical corals, no claims about an exact real site or species, no words, no logos, no interface, no border.
```

