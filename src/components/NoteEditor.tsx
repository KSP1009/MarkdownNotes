import type { Note } from '../types/note';

type NoteEditorProps = {
  note: Note | null;
  onContentChange: (content: string) => void;
};

export const NoteEditor = ({ note, onContentChange }: NoteEditorProps) => {
  if (!note) {
    return (
      <section className="flex min-h-[420px] min-w-0 flex-1 items-center justify-center border-b border-line bg-panel text-sm text-zinc-500 xl:border-b-0 xl:border-r">
        请选择或新建一篇笔记
      </section>
    );
  }

  return (
    <section className="flex min-h-[520px] min-w-0 flex-1 flex-col border-b border-line bg-panel xl:min-h-0 xl:border-b-0 xl:border-r">
      <textarea
        value={note.content}
        onChange={(event) => onContentChange(event.target.value)}
        className="min-h-[420px] flex-1 resize-none overflow-y-auto bg-panel px-5 py-6 font-mono text-base leading-8 text-zinc-200 outline-none placeholder:text-zinc-600 sm:px-8 sm:py-8 xl:min-h-0"
        placeholder="开始输入 Markdown 内容..."
        spellCheck={false}
      />
    </section>
  );
};
