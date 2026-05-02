import type { Note } from '../types/note';

const STORAGE_KEY = 'markdown-notes';

const isNote = (value: unknown): value is Note => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const note = value as Record<string, unknown>;
  return (
    typeof note.id === 'string' &&
    typeof note.title === 'string' &&
    typeof note.content === 'string' &&
    typeof note.createdAt === 'number' &&
    typeof note.updatedAt === 'number'
  );
};

export const loadNotes = (): Note[] => {
  try {
    const rawNotes = localStorage.getItem(STORAGE_KEY);
    if (!rawNotes) {
      return [];
    }

    const parsedNotes: unknown = JSON.parse(rawNotes);
    return Array.isArray(parsedNotes) ? parsedNotes.filter(isNote) : [];
  } catch {
    return [];
  }
};

export const saveNotes = (notes: Note[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};
