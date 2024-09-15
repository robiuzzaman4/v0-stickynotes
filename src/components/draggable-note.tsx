/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Note } from "../store/notes-store";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { colorClasses, colors } from "../constants";

interface DraggableNoteProps {
  note: Note;
  updateNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
  updateNotePosition: (id: string, x: number, y: number) => void;
  updateNoteColor: (id: string, color: Note["color"]) => void;
  updateNoteZIndex: (id: string, zIndex: number) => void;
  index: number;
}

const DraggableNote = ({
  note,
  updateNote,
  deleteNote,
  updateNoteColor,
  updateNotePosition,
  updateNoteZIndex,
  index,
}: DraggableNoteProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const noteRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLTextAreaElement) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - note.x,
      y: e.clientY - note.y,
    });
    updateNoteZIndex(note.id, Date.now());
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && noteRef.current) {
      const parentRect = noteRef.current.parentElement!.getBoundingClientRect();
      const noteRect = noteRef.current.getBoundingClientRect();
      const maxX = parentRect.width - noteRect.width;
      const maxY = parentRect.height - noteRect.height;

      const newX = Math.min(Math.max(0, e.clientX - dragOffset.x), maxX);
      const newY = Math.min(Math.max(0, e.clientY - dragOffset.y), maxY);

      updateNotePosition(note.id, newX, newY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={noteRef}
      style={{
        position: "absolute",
        left: note.x,
        top: note.y,
        zIndex: note.zIndex,
      }}
      onMouseDown={handleMouseDown}
      className={`size-72 aspect-square rounded-xl shadow-md border-4 cursor-move flex flex-col ${
        colorClasses[note.color]
      }`}
    >
      <div className="flex justify-between items-center p-2 border-b border-opacity-50 border-zinc-500">
        <span className="font-medium">Note: {index + 1}</span>
        <button
          onClick={() => deleteNote(note.id)}
          className="text-zinc-600 hover:text-rose-600"
        >
          <XCircleIcon className="size-6" />
        </button>
      </div>

      <div className="p-2">
        <textarea
          className="w-full h-32 p-2 mb-2 bg-transparent resize-none focus:outline-none placeholder-zinc-500"
          value={note.text}
          onChange={(e) => updateNote(note.id, e.target.value)}
          placeholder="Type your note here..."
          onFocus={() => updateNoteZIndex(note.id, Date.now())}
        />
      </div>

      <div className="flex items-center justify-center gap-2 h-fit mt-auto p-2">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-6 h-6 rounded-full shadow-inner border-2 ${colorClasses[color]}`}
            onClick={() => updateNoteColor(note.id, color)}
          />
        ))}
      </div>
    </div>
  );
};

export default DraggableNote;
