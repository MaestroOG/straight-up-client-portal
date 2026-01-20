"use client";

import { useState } from "react";
import NoteBox from "../superadminComponents/NoteBox";
import ProjectNotesList from "../ProjectNotesList";

export default function CommentsClient({ user, projectId, initialNotes = [] }) {
    const [notes, setNotes] = useState(initialNotes);

    const addNewNote = (note) => {
        setNotes(prev => {
            if (prev.some(n => n._id === note._id)) return prev; // prevent duplicates
            return [note, ...prev]; // add to top
        });
    };

    return (
        <>
            <NoteBox user={user} id={projectId} onNewNote={addNewNote} />
            <div className="mt-6">
                {notes.length > 0 ? (
                    <ProjectNotesList
                        user={user}
                        projectId={projectId}
                        initialNotes={notes}
                    />
                ) : (
                    <p className="p-4 text-center">No Comments For Now.</p>
                )}
            </div>
        </>
    );
}

