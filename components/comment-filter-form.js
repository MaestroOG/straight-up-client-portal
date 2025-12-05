'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation";

const CommentFilterForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleFilter = (filter) => {
        const params = new URLSearchParams(searchParams);
        params.set('filter', filter);
        router.push(`?${params.toString()}`, { scroll: false });
    }


    return (
        <>
            <Select value={searchParams.get('filter') || 'all'} onValueChange={handleFilter}>
                <SelectTrigger className={'border border-primary w-[180px]'}>
                    <SelectValue placeholder="Select filter" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                </SelectContent>
            </Select>
        </>
    )
}

export default CommentFilterForm