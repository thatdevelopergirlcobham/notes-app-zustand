import { create } from 'zustand';
import { Note, NoteColor } from '@/types/note';
import { auth, db } from '@/app/lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { toast } from 'sonner';

interface UserProfile {
  name: string;
  username: string; 
  email: string;
  joinedDate: string;
  uid: string;
}

interface NotesState {
  notes: Note[];
  user: UserProfile | null;
  isLoading: boolean;
  searchQuery: string;
  
  // Actions
  initializeAuthListener: () => () => void; 
  addNote: (title: string, description: string, color: NoteColor) => Promise<void>;
  updateNote: (id: string, updates: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  togglePin: (id: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  updateUsername: (newUsername: string) => Promise<void>; 
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  user: null, 
  isLoading: true,
  searchQuery: "",

  initializeAuthListener: () => {
    // Listen to Auth State Changes
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
         // User is logged in
         const userProfile: UserProfile = {
             name: firebaseUser.displayName || "User",
             username: firebaseUser.displayName?.split(" ")[0]?.toLowerCase() || "user",
             email: firebaseUser.email || "",
             joinedDate: firebaseUser.metadata.creationTime ? new Date(firebaseUser.metadata.creationTime).toLocaleDateString() : "Just now",
             uid: firebaseUser.uid
         };
         
         set({ user: userProfile, isLoading: false });

         // Start Listening to Firestore Notes for this user
         const notesQuery = query(
             collection(db, "notes"), 
             where("userId", "==", firebaseUser.uid),
             // Note: You might need a composite index for userId + isPinned/createdAt sorting
             // For now, we'll sort in client or assume simple index
         );

         const unsubscribeNotes = onSnapshot(notesQuery, (snapshot) => {
             const fetchedNotes: Note[] = snapshot.docs.map(doc => {
                 const data = doc.data();
                 return {
                     id: doc.id,
                     userId: data.userId,
                     title: data.title,
                     description: data.description,
                     color: data.color,
                     isPinned: data.isPinned || false,
                     isEdited: data.isEdited || false,
                     createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
                     updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : undefined
                 };
             }).sort((a, b) => {
                // Client-side sort: Pinned first, then newest
                if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
             });
             
             set({ notes: fetchedNotes });
         });

         // We should technically unsubscribe from notes when auth changes, 
         // but for this simple app, re-running this on auth trigger is okay.
      } else {
          // User is logged out
          set({ user: null, notes: [], isLoading: false });
      }
    });

    return unsubscribeAuth;
  },

  addNote: async (title, description, color) => {
    const { user } = get();
    if (!user) return;

    try {
        await addDoc(collection(db, "notes"), {
            userId: user.uid,
            title,
            description,
            color,
            isPinned: false,
            isEdited: false,
            createdAt: serverTimestamp(), // Let server decide time
            updatedAt: serverTimestamp()
        });
        toast.success("Note created successfully!");
    } catch (error: any) {
        console.error("Error adding note:", error);
        if (error.code === 'permission-denied') {
             toast.error("Permission denied. Database rules might be locking you out.");
        } else {
             toast.error("Failed to save note. Check your connection.");
        }
    }
  },

  updateNote: async (id, updates) => {
     try {
         const noteRef = doc(db, "notes", id);
         await updateDoc(noteRef, {
             ...updates,
             isEdited: true, // Auto-flag as edited if content is touched
             updatedAt: serverTimestamp()
         });
         toast.success("Note updated");
     } catch (error) {
         console.error("Error updating note:", error);
         toast.error("Failed to update note");
     }
  },

  deleteNote: async (id) => {
    try {
        await deleteDoc(doc(db, "notes", id));
        toast.success("Note deleted");
    } catch (error) {
        console.error("Error deleting note:", error);
        toast.error("Failed to delete note");
    }
  },

  togglePin: async (id) => {
      const { notes } = get();
      const note = notes.find(n => n.id === id);
      if (!note) return;

      // Check limit if we are pinning
      if (!note.isPinned) {
          const pinnedCount = notes.filter(n => n.isPinned).length;
          if (pinnedCount >= 3) {
              toast.warning("You can only pin up to 3 notes.");
              return;
          }
      }

      try {
          // Toggle in DB
          await updateDoc(doc(db, "notes", id), {
              isPinned: !note.isPinned
          });
      } catch (error) {
          console.error("Error toggling pin:", error);
          toast.error("Failed to update pin status");
      }
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  updateUsername: async (newUsername) => {
      // For a real app, you'd update profile in Firebase Auth or a 'users' collection
      set(state => ({ user: state.user ? { ...state.user, username: newUsername } : null }));
  }
}));
