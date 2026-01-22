"use client";

import { useState, useEffect } from "react";
import { useNotesStore } from "@/store/useNotesStore";
import { Note, NoteColor } from "@/types/note";
import { NotesHeader } from "@/components/notes/notes-header";
import { MobileSearchBar } from "@/components/notes/mobile-search-bar";
import { NotesGrid } from "@/components/notes/notes-grid";
import { NoteModal } from "@/components/notes/note-modal";
import { ViewNoteModal } from "@/components/notes/view-note-modal";

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
        if (a.isPinned === b.isPinned) return 0;
        return a.isPinned ? -1 : 1;
    });

    return (
        <div className="min-h-screen bg-white text-gray-900 pb-20">
            <NotesHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onColorSelect={handleColorSelect}
            />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <MobileSearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <NotesGrid
                    notes={filteredNotes}
                    onEdit={handleEditClick}
                    onView={handleViewClick}
                    onDelete={deleteNote}
                    onPin={togglePin}
                />
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
