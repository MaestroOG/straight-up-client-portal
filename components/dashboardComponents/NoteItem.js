import React, { useEffect, useRef } from 'react'
import Image from "next/image";
import parse from "html-react-parser";
import { timeAgo, formatTo12HourTime } from "@/utils/formUtils";
import { EllipsisVertical } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button';
import DeleteCommentForm from '../delete-comment-form';
import EditCommentForm from '../edit-comment-form';

const NoteItem = ({ note, isUnread, onMarkAsRead, user }) => {
    const noteRef = useRef(null);
    const hasMarkedRef = useRef(false); // ✅ Prevent multiple triggers

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasMarkedRef.current) {
                        const alreadyRead = note.readBy.includes(user?._id);
                        if (!alreadyRead) {
                            hasMarkedRef.current = true; // ✅ Prevent re-trigger
                            onMarkAsRead(note._id);
                        }
                    }
                });
            },
            { threshold: 1 } // 50% visible
        );

        const currentRef = noteRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [note._id, note.readBy, user?._id, onMarkAsRead]);

    return (
        <li ref={noteRef} className="mb-5 transition-all duration-300">
            <div className="flex items-center justify-between">
                <div className='flex items-center gap-2'>
                    <Image
                        src={note?.createdBy?.profilePictureUrl || "/placeholder-avatar.svg"}
                        width={35}
                        height={35}
                        alt="avatar"
                        className="rounded-full"
                    />
                    <div>
                        <p className="text-sm text-gray-600">
                            <span className="font-bold">
                                {note?.createdBy === null ? "Straight Up Digital Team" : note?.createdBy?.name}
                            </span>{" "}
                            - {timeAgo(note?.createdAt)} at {formatTo12HourTime(note?.createdAt)}
                            {/* {isUnread && (
                                <span className="text-red-500 text-xl ml-2 leading-none">•</span>
                            )} */}
                        </p>
                        <span className="text-detail text-xs">
                            {note?.createdBy?.companyName}
                        </span>
                    </div>
                </div>
                {user?.role === 'superadmin' && <Popover>
                    <PopoverTrigger>
                        <EllipsisVertical className='cursor-pointer' />
                    </PopoverTrigger>
                    <PopoverContent className={'flex flex-col gap-2'}>
                        <EditCommentForm note={note?.note} id={note?._id} />
                        <DeleteCommentForm id={note?._id} />
                    </PopoverContent>
                </Popover>}
            </div>

            <div className="font-montserrat md:max-w-5xl w-full text-base sm:text-lg ml-0 sm:ml-11 font-medium text-content break-words whitespace-pre-wrapoverflow-hidden"
            >
                {parse(note?.note)}
            </div>
        </li>
    );
};

export default NoteItem;
