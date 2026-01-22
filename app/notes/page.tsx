"use client";

import { useState } from "react";
import { ColorPicker } from "@/components/notes/color-picker";
import { NoteModal } from "@/components/notes/note-modal";
import { ViewNoteModal } from "@/components/notes/view-note-modal";
import { NoteCard } from "@/components/notes/note-card";
import { UserProfileDropdown } from "@/components/notes/user-profile";
import { useNotesStore } from "@/store/useNotesStore";
import { Note, NoteColor } from "@/types/note";
import { Search } from "lucide-react";
import { useEffect } from "react";

export default function NotesPage() {
    const { notes, searchQuery, addNote, updateNote, deleteNote, togglePin, setSearchQuery, initializeAuthListener } = useNotesStore();

    useEffect(() => {
        const unsubscribe = initializeAuthListener();
        return () => unsubscribe();
    }, [initializeAuthListener]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState<NoteColor>("yellow");
    const [editingNote, setEditingNote] = useState<Note | undefined>(undefined);
    const [viewingNote, setViewingNote] = useState<Note | undefined>(undefined);

    const handleColorSelect = (color: NoteColor) => {
        setSelectedColor(color);
        setEditingNote(undefined);
        setIsModalOpen(true);
    };

    const handleSaveNote = async (title: string, description: string) => {
        if (editingNote) {
            await updateNote(editingNote.id, { title, description });
        } else {
            await addNote(title, description, selectedColor);
        }
    };

    const handleEditClick = (note: Note) => {
        setEditingNote(note);
        setSelectedColor(note.color);
        setIsModalOpen(true);
    };

    const handleViewClick = (note: Note) => {
        setViewingNote(note);
        setIsViewModalOpen(true);
    };

    const filteredNotes = notes.filter(
        (n) =>
            n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
        // Sort by pinned then date
        if (a.isPinned === b.isPinned) return 0; // Maintain date sort order from store or add strict date sort here
        return a.isPinned ? -1 : 1;
    });

    return (
        <div className="min-h-screen bg-white text-gray-900 pb-20">
            {/* Header / Navbar */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold tracking-tight">My Notes</h1>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search notes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all w-64"
                            />
                        </div>

                        <ColorPicker onColorSelect={handleColorSelect} />

                        <UserProfileDropdown />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* Mobile Search */}
                <div className="md:hidden mb-8 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-100 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                    />
                </div>

                {filteredNotes.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                            <Search size={40} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No notes found</h3>
                        <p className="text-gray-500">Try creating a new one with the + button above!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredNotes.map((note) => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                onEdit={handleEditClick}
                                onView={handleViewClick}
                                onDelete={deleteNote}
                                onPin={togglePin}
                            />
                        ))}
                    </div>
                )}
            </main>

            <NoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveNote}
                initialColor={selectedColor}
                initialData={editingNote}
            />

            <ViewNoteModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                note={viewingNote}
            />
        </div>
    );
}
