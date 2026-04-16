import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "NOTES";

export type Note = {
  id: string;
  title: string;
  content: string;
};

// 🔹 GET
export const getNotes = async (): Promise<Note[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// 🔹 SAVE ALL
export const saveNotes = async (notes: Note[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

// 🔹 ADD
export const addNote = async (note: Note) => {
  const notes = await getNotes();
  const updated = [note, ...notes];
  await saveNotes(updated);
  return updated;
};

// 🔹 UPDATE
export const updateNote = async (updatedNote: Note) => {
  const notes = await getNotes();
  const updated = notes.map((n) =>
    n.id === updatedNote.id ? updatedNote : n
  );
  await saveNotes(updated);
  return updated;
};

// 🔹 DELETE
export const deleteNote = async (id: string) => {
  const notes = await getNotes();
  const updated = notes.filter((n) => n.id !== id);
  await saveNotes(updated);
  return updated;
};