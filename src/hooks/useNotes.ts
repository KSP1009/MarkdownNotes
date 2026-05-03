import { useEffect, useMemo, useState } from 'react';
import type { Note } from '../types/note';
import { loadNotes, saveNotes } from '../utils/storage';

const starterContent = `# Vibe Coding 学习笔记

## 什么是 Vibe Coding?

Vibe Coding 是一种利用 AI 辅助编程的新型开发方式。通过与 AI 对话，快速实现功能，大幅提升开发效率。

## 核心优势

- **快速开发**：从想法到实现，只需几分钟
- **降低门槛**：不需要精通所有技术细节
- **持续学习**：在实践中学习新技术

## 开发流程

1. 明确需求
2. 编写 PRD 文档
3. 与 AI 对话开发
4. 测试和优化

## 代码示例

\`\`\`ts
type Note = {
  id: string;
  title: string;
  content: string;
};
\`\`\`
`;

const createNote = (title = '未命名笔记', content = ''): Note => {
  const now = Date.now();

  return {
    id: crypto.randomUUID(),
    title,
    content,
    createdAt: now,
    updatedAt: now,
  };
};

const createStarterNote = () => createNote('Vibe Coding 学习笔记', starterContent);

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const storedNotes = loadNotes();
    return storedNotes.length > 0 ? storedNotes : [createStarterNote()];
  });
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(() => notes[0]?.id ?? null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const selectedNote = useMemo(
    () => notes.find((note) => note.id === selectedNoteId) ?? null,
    [notes, selectedNoteId],
  );

  const filteredNotes = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();
    if (!keyword) {
      return notes;
    }

    return notes.filter((note) => note.title.toLowerCase().includes(keyword));
  }, [notes, searchText]);

  const addNote = () => {
    const nextNote = createNote('新建笔记', '# 新建笔记\n\n开始记录你的想法。');
    setNotes((currentNotes) => [nextNote, ...currentNotes]);
    setSelectedNoteId(nextNote.id);
    setSearchText('');
  };

  const updateNote = (id: string, updates: Pick<Note, 'title' | 'content'>) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              ...updates,
              updatedAt: Date.now(),
            }
          : note,
      ),
    );
  };

  const deleteNote = (id: string) => {
    setNotes((currentNotes) => {
      const nextNotes = currentNotes.filter((note) => note.id !== id);
      if (selectedNoteId === id) {
        setSelectedNoteId(nextNotes[0]?.id ?? null);
      }
      return nextNotes;
    });
  };

  return {
    notes,
    selectedNote,
    selectedNoteId,
    filteredNotes,
    searchText,
    setSearchText,
    setSelectedNoteId,
    addNote,
    updateNote,
    deleteNote,
  };
};
