"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const FilterCommentsForm = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const filter = searchParams.get("filter") || "all";

    const handleValueChange = (value) => {
        const params = new URLSearchParams(searchParams)
        params.set("filter", value)
        router.replace(`${pathname}?${params.toString()}`)
    }
    return (
        <Select value={filter} onValueChange={handleValueChange}>
            <SelectTrigger className="w-full border max-w-[300px] border-gray-200">
                <SelectValue placeholder="Filter By" />
            </SelectTrigger>
            <SelectContent>

                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='unread'>Unread</SelectItem>

            </SelectContent>
        </Select>
    )
}

export default FilterCommentsForm