export type NoteColor = 
  | "yellow"
  | "orange"
  | "lemon"
  | "sky"
  | "grey"
  | "purple";

export interface Note {
  id: string;
  userId: string; // Owner of the note
  title: string;
  description: string;
  color: NoteColor;
  createdAt: string; // ISO string for easier serialization
  updatedAt?: string;
  isEdited?: boolean;
  isPinned?: boolean;
}
