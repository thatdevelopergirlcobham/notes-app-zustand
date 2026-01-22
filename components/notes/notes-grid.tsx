"use client";

import { Search } from "lucide-react";
import { Note } from "@/types/note";
import { NoteCard } from "./note-card";

interface NotesGridProps {
    notes: Note[];
    onEdit: (note: Note) => void;
    onView: (note: Note) => void;
    onDelete: (id: string) => Promise<void>; // Assuming async from store
    onPin: (id: string) => Promise<void>;    // Assuming async from store
}

export function NotesGrid({ notes, onEdit, onView, onDelete, onPin }: NotesGridProps) {
    if (notes.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                    <Search size={40} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No notes found</h3>
                <p className="text-gray-500">Try creating a new one with the + button above!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={onEdit}
                    onView={onView}
                    onDelete={onDelete}
                    onPin={onPin}
                />
            ))}
        </div>
    );
}
