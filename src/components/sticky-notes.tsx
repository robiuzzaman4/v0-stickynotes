import { useRef } from "react";
import { useNoteStore } from "../store/notes-store";
import DraggableNote from "./draggable-note";

const StickyNotes = () => {
  const {
    notes,
    updateNote,
    deleteNote,
    updateNotePosition,
    updateNoteColor,
    updateNoteZIndex,
  } = useNoteStore();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="min-h-[calc(100vh-64px)] mt-16 relative overflow-hidden"
    >
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
    </section>
  );
};

export default StickyNotes;
