import type { Note } from '../types/note';

type ToolbarProps = {
  note: Note | null;
  onDelete: () => void;
};

const countWords = (content: string) => {
  return content.trim() ? content.trim().length : 0;
};

export const Toolbar = ({ note, onDelete }: ToolbarProps) => {
  return (
    <footer className="flex h-12 shrink-0 items-center justify-between border-t border-line bg-ink px-8 font-mono text-xs text-zinc-500">
      <div className="flex gap-6">
        <span>UTF-8</span>
        <span>Markdown</span>
      </div>

      <div className="flex items-center gap-5">
        <span>字数：{note ? countWords(note.content) : 0}</span>
        <span>{note ? '已保存' : '未选择'}</span>
        <button
          type="button"
          onClick={onDelete}
          disabled={!note}
          className="border border-line px-4 py-2 text-zinc-300 transition hover:border-red-500 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          删除
        </button>
      </div>
    </footer>
  );
};
