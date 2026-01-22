"use client";

import { Search } from "lucide-react";
import { ColorPicker } from "./color-picker";
import { UserProfileDropdown } from "./user-profile";
import { NoteColor } from "@/types/note";

interface NotesHeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onColorSelect: (color: NoteColor) => void;
}

export function NotesHeader({ searchQuery, setSearchQuery, onColorSelect }: NotesHeaderProps) {
    return (
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

                    <ColorPicker onColorSelect={onColorSelect} />

                    <UserProfileDropdown />
                </div>
            </div>
        </header>
    );
}
