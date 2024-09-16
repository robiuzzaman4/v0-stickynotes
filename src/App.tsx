import { PlusIcon } from "@heroicons/react/24/outline";
import StickyNotes from "./components/sticky-notes";
import { useNoteStore } from "./store/notes-store";
import { useState } from "react";

const App = () => {
  const { addNote } = useNoteStore();
  const [lastYPosition, setLastYPosition] = useState(20);
  const handleAddNote = () => {
    const x = 20;
    const y = lastYPosition;
    addNote(x, y);
    setLastYPosition(lastYPosition + 20);
  };

  return (
    <main>
      <nav className="h-16 w-full fixed top-0 px-4 z-[10000] flex items-center justify-between gap-4 bg-[#18181b]">
        <button
          onClick={handleAddNote}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center"
        >
          <PlusIcon className="mr-2 size-6" />
          Add Note
        </button>
        <a href="https://github.com/robiuzzaman4/v0-stickynotes" target="_blank" rel="noopener noreferrer">
          <img src="./github.svg" alt="github icon" className="size-6" />
        </a>
      </nav>
      <StickyNotes />
    </main>
  );
};

export default App;
