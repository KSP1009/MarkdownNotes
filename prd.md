## 核心功能

- 笔记管理：支持创建、编辑、删除 Markdown 笔记。
- 标题与内容：每篇笔记包含标题和 Markdown 正文内容。
- 笔记列表：左侧展示全部笔记，显示标题、内容大小、更新时间。
- 搜索笔记：支持按标题或内容关键字搜索笔记。
- 实时预览：编辑区输入 Markdown 内容时，右侧同步渲染预览效果。
- 代码高亮：Markdown 代码块支持语法高亮展示。
- 本地保存：笔记数据自动保存到 LocalStorage。

## 设计要求

- 整体采用深色主题，突出专业、专注的笔记编辑体验。
- 页面采用左右分栏布局：左侧为笔记列表与编辑器，右侧为 Markdown 预览。
- 左侧笔记列表包含搜索框、新建笔记按钮、笔记条目选中状态。
- 编辑器区域支持标题输入和 Markdown 正文输入。
- 预览区域需清晰展示标题、段落、列表、代码块、引用等 Markdown 内容。
- 主要操作按钮包括新建笔记、删除笔记。
- 交互反馈需明确，例如选中笔记高亮、保存状态提示、删除确认。

## 技术栈

- 前端框架：React
- 开发语言：TypeScript
- 构建工具：Vite
- Markdown 渲染：react-markdown
- 代码高亮：react-syntax-highlighter
- 样式方案：Tailwind CSS
- 数据存储：LocalStorage

## 项目结构

```text
src/
  components/
    NoteList.tsx
    NoteEditor.tsx
    MarkdownPreview.tsx
    Toolbar.tsx
  hooks/
    useNotes.ts
  types/
    note.ts
  utils/
    storage.ts
  App.tsx
  main.tsx
  index.css
```

## 数据管理

- 使用 LocalStorage 持久化保存笔记列表。
- 每篇笔记建议包含以下字段：

```ts
type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
};
```

- 新建笔记时生成唯一 `id`，并初始化标题、内容和时间。
- 编辑标题或内容时实时更新当前笔记，并同步写入 LocalStorage。
- 删除笔记时从列表中移除对应数据，并更新当前选中笔记。
- 搜索仅影响列表展示，不改变原始笔记数据。

## 开发规范

- 使用函数组件和 React Hooks 编写组件。
- 使用 TypeScript 定义清晰的数据类型，避免使用 `any`。
- 组件职责保持单一，列表、编辑器、预览区拆分为独立组件。
- LocalStorage 读写逻辑封装在 `utils/storage.ts` 或 `useNotes.ts` 中。
- 样式优先使用 Tailwind CSS 工具类，避免大量内联样式。
- Markdown 渲染和代码高亮逻辑集中在预览组件中处理。
- 删除操作需要二次确认，避免误删。

## 注意事项

- 首次进入应用时应自动创建一篇默认笔记或展示空状态。
- LocalStorage 读取失败或数据格式异常时，需要兜底为空数组。
- 笔记内容较长时，编辑区和预览区应支持独立滚动。
- 预览区需要处理空内容状态，避免页面空白。
- 搜索无结果时展示明确提示。
- 删除最后一篇笔记后，应重置当前选中状态。
- 代码高亮需支持常见语言，如 JavaScript、TypeScript、CSS、HTML、JSON、Markdown。
