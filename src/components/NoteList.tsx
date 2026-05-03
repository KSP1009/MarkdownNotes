import type { Note } from '../types/note';

type NoteListProps = {
  notes: Note[];
  selectedNoteId: string | null;
  searchText: string;
  onSearchChange: (value: string) => void;
  onSelectNote: (id: string) => void;
  onCreateNote: () => void;
};

const formatSize = (content: string) => {
  const size = new Blob([content]).size;
  return size >= 1024 ? `${(size / 1024).toFixed(1)} KB` : `${size} B`;
};

const formatTime = (timestamp: number) => {
  const diff = Date.now() - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) {
    return '刚刚';
  }
  if (diff < hour) {
    return `${Math.floor(diff / minute)} 分钟前`;
  }
  if (diff < day) {
    return `${Math.floor(diff / hour)} 小时前`;
  }
  if (diff < day * 7) {
    return `${Math.floor(diff / day)} 天前`;
  }

  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
  }).format(timestamp);
};

export const NoteList = ({
  notes,
  selectedNoteId,
  searchText,
  onSearchChange,
  onSelectNote,
  onCreateNote,
}: NoteListProps) => {
  return (
    <aside className="flex h-[280px] shrink-0 flex-col border-b border-line bg-ink lg:h-full lg:w-[300px] lg:border-b-0 lg:border-r">
      <div className="border-b border-line px-5 py-4 lg:py-5">
        <p className="font-mono text-lg font-black uppercase tracking-normal text-glow">
          Markdown Notes
        </p>
        <p className="mt-1 text-sm text-zinc-500">我的笔记本</p>
      </div>

      <div className="px-4 py-4 lg:py-5">
        <input
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
          className="h-12 w-full border border-line bg-panel px-4 font-mono text-sm text-zinc-100 outline-none transition focus:border-glow"
          placeholder="按标题搜索笔记..."
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
        {notes.length === 0 ? (
          <div className="px-3 py-8 text-sm text-zinc-500">没有匹配的笔记</div>
        ) : (
          <div className="space-y-2">
            {notes.map((note) => {
              const isSelected = note.id === selectedNoteId;

              return (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => onSelectNote(note.id)}
                  className={[
                    'w-full border px-4 py-4 text-left transition',
                    isSelected
                      ? 'border-glow bg-panelSoft'
                      : 'border-transparent bg-transparent hover:border-line hover:bg-panel',
                  ].join(' ')}
                >
                  <span className="block truncate font-mono text-base font-bold text-zinc-100">
                    {note.title || '未命名笔记'}
                  </span>
                  <span className="mt-2 flex gap-3 font-mono text-xs text-zinc-500">
                    <span>{formatSize(note.content)}</span>
                    <span>{formatTime(note.updatedAt)}</span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-line p-4">
        <button
          type="button"
          onClick={onCreateNote}
          className="h-12 w-full bg-glow font-mono text-sm font-black text-black transition hover:bg-emerald-300"
        >
          + 新建笔记
        </button>
      </div>
    </aside>
  );
};
