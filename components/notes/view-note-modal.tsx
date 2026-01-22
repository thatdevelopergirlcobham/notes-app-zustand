"use client";

import { X } from "lucide-react";
import { Note, NoteColor } from "@/types/note";

interface ViewNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    note: Note | undefined;
}

export function ViewNoteModal({ isOpen, onClose, note }: ViewNoteModalProps) {
    if (!isOpen || !note) return null;

    const getColorClass = (color: NoteColor) => {
        switch (color) {
            case "yellow": return "bg-yellow-200";
            case "orange": return "bg-orange-200";
            case "lemon": return "bg-lime-300";
            case "sky": return "bg-sky-200";
            case "grey": return "bg-gray-200";
            case "purple": return "bg-purple-200";
            default: return "bg-white";
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div
                className={`w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl shadow-2xl p-8 ${getColorClass(note.color)} relative animate-fade-in-up`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/5 rounded-full hover:bg-black/10 transition-colors text-gray-700"
                >
                    <X size={24} />
                </button>

                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
                        {note.title}
                    </h2>
                    <p className="text-sm font-medium text-gray-500/80">
                        {formatDate(note.createdAt)}
                        {note.isEdited && <span className="italic ml-1">(edited)</span>}
                    </p>
                </div>

                <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {note.description}
                </div>
            </div>

            {/* Click backdrop to close */}
            <div className="absolute inset-0 -z-10" onClick={onClose}></div>
        </div>
    );
}
