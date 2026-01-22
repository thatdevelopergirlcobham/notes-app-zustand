"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, Edit2, Check, UserCircle } from "lucide-react";
import { useNotesStore } from "@/store/useNotesStore";
import { auth } from "@/app/lib/firebase";

export function UserProfileDropdown() {
    const { user, updateUsername } = useNotesStore();
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState(user?.username || "");
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (user?.username) {
            setNewUsername(user.username);
        }
    }, [user]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setIsEditing(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSaveUsername = () => {
        if (newUsername.trim()) {
            updateUsername(newUsername);
            setIsEditing(false);
        }
    };

    const getGreeting = () => {
        const hours = new Date().getHours();
        if (hours < 12) return "Good Morning";
        if (hours < 18) return "Good Afternoon";
        return "Good Evening";
    };

    if (!user) return null; // Don't render if not logged in

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-xl transition-all"
            >
                <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-400 font-medium">{getGreeting()}</p>
                    <p className="text-sm font-bold text-gray-800">{user.name}</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    <UserCircle size={24} />
                </div>
            </button>

            {isOpen && (
                <div className="absolute top-16 right-0 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up z-50">
                    <div className="bg-purple-600 p-6 text-white text-center">

                        <h3 className="font-bold text-lg">{user.name}</h3>
                        <p className="text-purple-200 text-sm">{user.email}</p>
                    </div>

                    <div className="p-6 space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Username</label>
                            <div className="flex items-center gap-2">
                                {isEditing ? (
                                    <div className="flex-1 flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={newUsername}
                                            onChange={(e) => setNewUsername(e.target.value)}
                                            className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500"
                                            autoFocus
                                        />
                                        <button onClick={handleSaveUsername} className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                                            <Check size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex items-center justify-between group">
                                        <span className="text-gray-700 font-medium">@{user.username}</span>
                                        <button onClick={() => setIsEditing(true)} className="p-1.5 text-gray-400 hover:text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Edit2 size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-50">
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <Calendar size={16} />
                                <span>Joined {user.joinedDate}</span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                onClick={async () => {
                                    try {
                                        await auth.signOut();
                                        window.location.href = "/login";
                                    } catch (error) {
                                        console.error("Error signing out", error);
                                    }
                                }}
                                className="block w-full py-2.5 text-center text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
