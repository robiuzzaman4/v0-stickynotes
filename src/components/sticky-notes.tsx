/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useNoteStore } from "../store/notes-store";
import DraggableNote from "./draggable-note";
import { PlusIcon } from "@heroicons/react/24/outline";

const StickyNotes = () => {
  const {
    notes,
    addNote,
    updateNote,
    deleteNote,
    updateNotePosition,
    updateNoteColor,
    updateNoteZIndex,
  } = useNoteStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (notes.length === 0) {
      handleAddNote();
    }
  }, [notes]);

  const handleAddNote = () => {
    const x = 20;
    const y = 80;
    addNote(x, y);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
    >
      <button
        onClick={handleAddNote}
        className="fixed top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center"
      >
        <PlusIcon className="mr-2 size-6" />
        Add Note
      </button>
      {notes.map((note, index) => (
        <DraggableNote
          key={note.id}
          note={note}
          updateNote={updateNote}
          deleteNote={deleteNote}
          updateNoteColor={updateNoteColor}
          updateNotePosition={updateNotePosition}
          updateNoteZIndex={updateNoteZIndex}
          index={index}
        />
      ))}
    </div>
  );
};

export default StickyNotes;
