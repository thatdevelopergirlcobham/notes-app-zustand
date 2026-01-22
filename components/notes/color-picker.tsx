"use client";

import { Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { NoteColor } from "@/types/note";

interface ColorPickerProps {
    onColorSelect: (color: NoteColor) => void;
}

export function ColorPicker({ onColorSelect }: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const colors: { value: NoteColor; class: string; label: string }[] = [
        { value: "yellow", class: "bg-yellow-200 hover:bg-yellow-300", label: "Yellow" },
        { value: "orange", class: "bg-orange-200 hover:bg-orange-300", label: "Orange" },
        { value: "lemon", class: "bg-lime-300 hover:bg-lime-400", label: "Lemon Green" },
        { value: "sky", class: "bg-sky-200 hover:bg-sky-300", label: "Sky Blue" },
        { value: "grey", class: "bg-gray-200 hover:bg-gray-300", label: "Grey" },
        { value: "purple", class: "bg-purple-200 hover:bg-purple-300", label: "Light Purple" },
    ];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative z-50" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isOpen ? "bg-red-50 text-red-500 rotate-45" : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
            >
                <Plus size={24} />
            </button>

            {isOpen && (
                <div className="absolute top-16 left-1/2 -translate-x-1/2 p-2 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-2 animate-fade-in-up">
                    {colors.map((color) => (
                        <button
                            key={color.value}
                            onClick={() => {
                                onColorSelect(color.value);
                                setIsOpen(false);
                            }}
                            className={`w-8 h-8 rounded-full border border-gray-100/50 transition-transform hover:scale-110 ${color.class}`}
                            title={color.label}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
