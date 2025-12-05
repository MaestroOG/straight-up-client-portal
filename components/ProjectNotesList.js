"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import NoteItem from "./dashboardComponents/NoteItem";

export default function ProjectNotesList({ user, projectId, initialNotes }) {
    const [notes, setNotes] = useState(initialNotes);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const loader = useRef(null);

    // ✅ Mark note as read
    const handleMarkAsRead = async (noteId) => {
        try {
            const res = await fetch(`/api/notes/${noteId}/mark-read`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user?._id }),
            });
            if (!res.ok) throw new Error("Failed to mark as read");

            // ✅ Optimistic UI update
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note._id === noteId && user && !note.readBy.includes(user._id)
                        ? { ...note, readBy: [...note.readBy, user._id] }
                        : note
                )
            );
        } catch (err) {
            console.error("Error marking note as read:", err);
        }
    };
    // ✅ Fetch more notes for pagination
    const fetchMore = useCallback(async () => {
        if (!hasMore || loading) return;
        setLoading(true);

        const res = await fetch(`/api/projects/${projectId}/notes?page=${page}&limit=10`, {
            cache: "no-store",
        });
        const data = await res.json();

        if (data.notes.length === 0) {
            setHasMore(false);
            setLoading(false);
            return;
        }

        // 🔥 DEDUPE FIX
        setNotes((prev) => {
            const map = new Map(prev.map(note => [note._id, note]));

            data.notes.forEach((fetchedNote) => {
                const existingNote = map.get(fetchedNote._id);
                if (existingNote) {
                    // Preserve local readBy updates
                    map.set(fetchedNote._id, {
                        ...fetchedNote,
                        readBy: existingNote.readBy
                    });
                } else {
                    map.set(fetchedNote._id, fetchedNote);
                }
            });

            return Array.from(map.values());
        });
        setHasMore(data.hasMore);
        setLoading(false);
    }, [page, hasMore, loading, projectId]);

    // ✅ Observe loader for infinite scroll
    useEffect(() => {
        if (!hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 1 }
        );

        if (loader.current) observer.observe(loader.current);
        return () => {
            if (loader.current) observer.unobserve(loader.current);
        };
    }, [hasMore, loading]);

    useEffect(() => {
        if (page > 1) fetchMore();
    }, [page, fetchMore]);

    useEffect(() => {
        const handleNewNote = (e) => {
            const newNote = e.detail;
            setNotes((prev) => [newNote, ...prev]);
        };
        window.addEventListener("note-added", handleNewNote);
        return () => window.removeEventListener("note-added", handleNewNote);
    }, []);

    return (
        <ul className="max-sm:max-w-[435px]">
            {notes?.map((note, index) => {
                const isUnread = !(note?.readBy?.includes(user._id));
                return (
                    <NoteItem
                        key={note._id || index}
                        note={note}
                        index={index}
                        isUnread={isUnread}
                        user={user}
                        onMarkAsRead={handleMarkAsRead}
                    />
                );
            })}

            {hasMore && (
                <div
                    ref={loader}
                    className="h-10 flex justify-center items-center text-gray-500"
                >
                    {loading ? "Loading..." : "Scroll for more"}
                </div>
            )}
        </ul>
    );
}
