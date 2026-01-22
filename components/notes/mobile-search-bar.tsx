"use client";

import { Search } from "lucide-react";

interface MobileSearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function MobileSearchBar({ searchQuery, setSearchQuery }: MobileSearchBarProps) {
    return (
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
    );
}
