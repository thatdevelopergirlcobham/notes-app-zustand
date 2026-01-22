"use client";

import { Note } from "@/types/note";
import { ViewNote } from "./ViewNote";

interface ViewNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    note: Note | undefined;
}

export function ViewNoteModal({ isOpen, onClose, note }: ViewNoteModalProps) {
    if (!isOpen || !note) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <ViewNote note={note} onClose={onClose} />
            {/* Click backdrop to close */}
            <div className="absolute inset-0 -z-10" onClick={onClose}></div>
        </div>
    );
}
