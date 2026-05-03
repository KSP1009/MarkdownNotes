import { MarkdownPreview } from './components/MarkdownPreview';
import { NoteEditor } from './components/NoteEditor';
import { NoteHeader } from './components/NoteHeader';
import { NoteList } from './components/NoteList';
import { Toolbar } from './components/Toolbar';
import { useNotes } from './hooks/useNotes';

const App = () => {
  const {
    selectedNote,
    selectedNoteId,
    filteredNotes,
    searchText,
    setSearchText,
    setSelectedNoteId,
    addNote,
    updateNote,
    deleteNote,
  } = useNotes();

  const handleContentChange = (content: string) => {
    if (!selectedNote) {
      return;
    }

    updateNote(selectedNote.id, {
      title: selectedNote.title,
      content,
    });
  };

  const handleTitleChange = (title: string) => {
    if (!selectedNote) {
      return;
    }

    updateNote(selectedNote.id, {
      title,
      content: selectedNote.content,
    });
  };

  const handleDeleteNote = () => {
    if (!selectedNote) {
      return;
    }

    const confirmed = window.confirm(`确定删除「${selectedNote.title || '未命名笔记'}」吗？`);
    if (confirmed) {
      deleteNote(selectedNote.id);
    }
  };

  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-ink text-zinc-100 lg:h-screen lg:flex-row">
      <NoteList
        notes={filteredNotes}
        selectedNoteId={selectedNoteId}
        searchText={searchText}
        onSearchChange={setSearchText}
        onSelectNote={setSelectedNoteId}
        onCreateNote={addNote}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <NoteHeader note={selectedNote} onTitleChange={handleTitleChange} />
        <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-2">
          <NoteEditor note={selectedNote} onContentChange={handleContentChange} />
          <MarkdownPreview note={selectedNote} />
        </div>
        <Toolbar note={selectedNote} onDelete={handleDeleteNote} />
      </div>
    </main>
  );
};

export default App;
