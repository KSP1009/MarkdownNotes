import type { Note } from '../types/note';

type NoteHeaderProps = {
  note: Note | null;
  onTitleChange: (title: string) => void;
};

export const NoteHeader = ({ note, onTitleChange }: NoteHeaderProps) => {
  return (
    <header className="flex h-[76px] shrink-0 items-center border-b border-line bg-ink px-5 sm:px-8">
      {note ? (
        <input
          value={note.title}
          onChange={(event) => onTitleChange(event.target.value)}
          className="w-full bg-transparent font-mono text-xl font-black text-zinc-100 outline-none placeholder:text-zinc-600 sm:text-2xl"
          placeholder="输入笔记标题"
        />
      ) : (
        <p className="font-mono text-xl font-black text-zinc-600 sm:text-2xl">
          请选择或新建一篇笔记
        </p>
      )}
    </header>
  );
};
