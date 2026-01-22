"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Note, NoteColor } from "@/types/note";

interface NoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (title: string, description: string) => void;
    initialColor: NoteColor;
    initialData?: Note; // For editing
}

const MAX_TITLE_LENGTH = 60; // Character limit for title

export function NoteModal({ isOpen, onClose, onSave, initialColor, initialData }: NoteModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setTitle(initialData.title);
                setDescription(initialData.description);
            } else {
                setTitle("");
                setDescription("");
            }
            setError("");
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            setError("Title is required");
            return;
        }
        if (title.length > MAX_TITLE_LENGTH) {
            setError(`Title exceeds ${MAX_TITLE_LENGTH} characters`);
            return;
        }
        // No limit on description anymore
        onSave(title, description);
        onClose();
    };

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className={`w-full max-w-lg rounded-3xl shadow-2xl p-6 ${getColorClass(initialColor)} relative animate-fade-in-up`}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/5 rounded-full hover:bg-black/10 transition-colors text-gray-700"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    {initialData ? "Edit Note" : "New Note"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-xs font-medium text-gray-500/80">Title</span>
                            <span className={`text-xs font-medium ${title.length > MAX_TITLE_LENGTH ? "text-red-500" : "text-gray-500/80"}`}>
                                {title.length}/{MAX_TITLE_LENGTH}
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-white/50 border-0 rounded-xl px-4 py-3 text-lg font-semibold placeholder:text-gray-500 focus:ring-0 focus:bg-white/80 transition-all"
                        />
                    </div>

                    <div>
                        <textarea
                            placeholder="Type your note here..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={8}
                            className="w-full bg-white/50 border-0 rounded-xl px-4 py-3 text-gray-700 placeholder:text-gray-500 focus:ring-0 focus:bg-white/80 transition-all resize-none"
                        />
                        <div className="flex justify-between mt-2 text-xs font-medium text-gray-500">
                            <span className="text-red-500">{error ? error : " "}</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-black/80 hover:bg-black text-white rounded-xl font-medium transition-colors shadow-lg"
                    >
                        {initialData ? "Save Changes" : "Create Note"}
                    </button>
                </form>
            </div>
        </div>
    );
}
