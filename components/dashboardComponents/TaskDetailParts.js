'use client';

import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';

export function TaskDetailDescription({ description }) {
    return (
        <p className='text-muted-foreground'>
            {parse(DOMPurify.sanitize(description || ''))}
        </p>
    )
}

export function TaskDetailComments({ commentText }) {
    return (
        <div className="max-w-5xl text-lg ml-11 font-medium prose prose-a:text-blue-500 prose-a:underline text-content">
            {parse(DOMPurify.sanitize(commentText || ''))}
        </div>
    )
}