/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Note } from "../store/notes-store";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface DraggableNoteProps {
  note: Note;
  addNote: (x: number, y: number) => void;
  updateNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
  updateNotePosition: (id: string, x: number, y: number) => void;
  updateNoteColor: (id: string, color: Note["color"]) => void;
  updateNoteZIndex: (id: string, zIndex: number) => void;
  index: string;
}
const colorClasses = {
  yellow: "bg-yellow-200 border-yellow-400",
  green: "bg-green-200 border-green-400",
  blue: "bg-blue-200 border-blue-400",
  purple: "bg-purple-200 border-purple-400",
  pink: "bg-pink-200 border-pink-400",
};

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
      className={`w-64 ${
        colorClasses[note.color]
      } rounded-lg shadow-md border-2 cursor-move`}
      onMouseDown={handleMouseDown}
    >
      <div
        className="flex justify-between items-center p-2 border-b-2 border-opacity-50"
        style={{ borderColor: "currentColor" }}
      >
        <span className="font-bold">Note #{index + 1}</span>
        <button
          onClick={() => deleteNote(note.id)}
          className="text-gray-600 hover:text-red-600"
        >
          <XMarkIcon className="size-6" />
        </button>
      </div>
      <div className="p-4">
        <textarea
          className="w-full h-32 p-2 mb-2 bg-transparent resize-none focus:outline-none placeholder-gray-500"
          value={note.text}
          onChange={(e) => updateNote(note.id, e.target.value)}
          placeholder="Type your note here..."
          onFocus={() => updateNoteZIndex(note.id, Date.now())}
        />
        <div className="flex space-x-2">
          {(["yellow", "green", "blue", "purple", "pink"] as const).map(
            (color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-full ${colorClasses[color]} shadow-inner`}
                onClick={() => updateNoteColor(note.id, color)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DraggableNote;
