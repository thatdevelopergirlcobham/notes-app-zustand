"use client";

import { Note, NoteColor } from "@/types/note";
import { EditNote } from "./EditNote";

interface NoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (title: string, description: string) => void;
    initialColor: NoteColor;
    initialData?: Note; // For editing
}

export function NoteModal({ isOpen, onClose, onSave, initialColor, initialData }: NoteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <EditNote
                onClose={onClose}
                onSave={onSave}
                initialColor={initialColor}
                initialData={initialData}
            />
        </div>
    );
}
