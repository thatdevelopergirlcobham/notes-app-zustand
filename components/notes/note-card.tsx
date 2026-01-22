"use client";

import { Note, NoteColor } from "@/types/note";
import { Edit2, Eye, Pin, Trash2 } from "lucide-react";

interface NoteCardProps {
    note: Note;
    onEdit: (note: Note) => void;
    onView: (note: Note) => void;
    onDelete: (id: string) => void;
    onPin: (id: string) => void;
}

export function NoteCard({ note, onEdit, onView, onDelete, onPin }: NoteCardProps) {
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
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        }).format(date);
    };

    return (
        <div
            className={`rounded-3xl p-6 relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${getColorClass(note.color)} min-h-[220px] flex flex-col`}
        >
            <div className="absolute top-4 right-4 flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                    onClick={(e) => { e.stopPropagation(); onPin(note.id); }}
                    className={`p-2 rounded-full transition-colors ${note.isPinned ? "bg-black/10 text-black" : "bg-black/5 hover:bg-black/10 text-gray-700"}`}
                    title="Pin Note"
                >
                    <Pin size={16} className={note.isPinned ? "fill-current" : ""} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onView(note); }}
                    className="p-2 bg-black/5 hover:bg-black/10 rounded-full text-gray-700 transition-colors"
                    title="View Note"
                >
                    <Eye size={16} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onEdit(note); }}
                    className="p-2 bg-black/5 hover:bg-black/10 rounded-full text-gray-700 transition-colors"
                    title="Edit Note"
                >
                    <Edit2 size={16} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-full text-red-600 transition-colors"
                    title="Delete Note"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            {note.isPinned && <div className="absolute top-4 left-6 text-xs font-bold uppercase tracking-wider opacity-50 flex items-center gap-1"><Pin size={10} className="fill-current" /> Pinned</div>}

            <div className={note.isPinned ? "mt-5" : ""}>
                <h3 className="text-xl font-bold text-gray-900 mb-3 pr-24 truncate">
                    {note.title}
                </h3>

                <p className="text-gray-800 leading-relaxed mb-6 flex-grow break-words whitespace-pre-wrap line-clamp-4">
                    {note.description}
                </p>
            </div>

            <div className="mt-auto text-xs font-medium text-gray-500/80">
                {formatDate(note.createdAt)}
                {note.isEdited && <span className="italic ml-1">(edited)</span>}
            </div>
        </div>
    );
}
