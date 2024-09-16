import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getRandomColor } from "../utils/getRandomColor";

export interface Note {
  id: string;
  text: string;
  x: number;
  y: number;
  color: "yellow" | "green" | "blue" | "purple" | "pink";
  zIndex: number;
}

export interface NoteStore {
  notes: Note[];
  addNote: (x: number, y: number) => void;
  updateNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
  updateNotePosition: (id: string, x: number, y: number) => void;
  updateNoteColor: (id: string, color: Note["color"]) => void;
  updateNoteZIndex: (id: string, zIndex: number) => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (x, y) =>
        set((state) => ({
          notes: [
            ...state.notes,
            {
              id: Date.now().toString(),
              text: "",
              x,
              y,
              color: getRandomColor(),
              zIndex: state.notes.length + 1,
            },
          ],
        })),
      updateNote: (id, text) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, text } : note
          ),
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
      updateNotePosition: (id, x, y) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, x, y } : note
          ),
        })),
      updateNoteColor: (id, color) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, color } : note
          ),
        })),
      updateNoteZIndex: (id, zIndex) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, zIndex }
              : { ...note, zIndex: Math.max(note.zIndex - 1, 0) }
          ),
        })),
    }),
    {
      name: "sticky-notes-storage",
    }
  )
);
