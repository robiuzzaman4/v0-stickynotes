import { PlusIcon } from "@heroicons/react/24/outline";
import StickyNotes from "./components/sticky-notes";
import { useNoteStore } from "./store/notes-store";

const App = () => {
  const { addNote } = useNoteStore();
  const handleAddNote = () => {
    const x = 20;
    const y = 80;
    addNote(x, y);
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
      </nav>
      <StickyNotes />
    </main>
  );
};

export default App;
