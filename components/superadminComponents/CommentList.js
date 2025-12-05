
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDateToYMD, formatTo12HourTime } from "@/utils/formUtils";

export default function CommentsList({ initialNotes }) {
    const [notes, setNotes] = useState(initialNotes);
    const [page, setPage] = useState(2); // page 1 already loaded SSR
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const loader = useRef(null);

    const fetchMore = useCallback(async () => {
        if (!hasMore || loading) return;

        setLoading(true);
        const res = await fetch(`/api/comments?page=${page}&limit=10`, {
            cache: "no-store",
        });
        const data = await res.json();

        setNotes(prev => [...prev, ...data.notes]);
        setHasMore(data.hasMore);
        setLoading(false);
    }, [page, hasMore, loading]);

    // Observe loader div
    useEffect(() => {
        if (!hasMore) return;

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !loading) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 1 }
        );

        if (loader.current) observer.observe(loader.current);
        return () => {
            if (loader.current) observer.unobserve(loader.current);
        };
    }, [hasMore, loading]);

    // Fetch whenever page changes
    useEffect(() => {
        if (page > 1) {
            fetchMore();
        }
    }, [page]);

    return (
        <div className="space-y-4">
            {notes?.map((note, index) => (
                <Alert key={index} variant="default">
                    <AlertTitle className={'font-semibold text-lg'}>{note?.projectId?.projectTitle} - {formatDateToYMD(note?.createdAt)} - {formatTo12HourTime(note?.createdAt)}</AlertTitle>
                    <AlertDescription>
                        A comment was created by <span className="italic">{note.createdBy?.name}</span> on the project <span className="font-bold">{note.projectId?.projectTitle}</span>{" "}
                        <Link
                            href={`/projects/${note.projectId?._id}`}
                        >
                            <Button variant={'link'} className={'pl-0'}>
                                View Comment
                            </Button>
                        </Link>
                    </AlertDescription>
                </Alert>
            ))}

            {hasMore && (
                <div
                    ref={loader}
                    className="h-10 flex justify-center items-center text-gray-500"
                >
                    Loading...
                </div>
            )}
        </div>
    );
}



