'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSearchParams, useRouter } from "next/navigation";

const ResourceFilterSelect = ({ categories }) => {

    const router = useRouter();
    const searchParams = useSearchParams()

    const filter = searchParams.get("filter") || "";

    const handleValueChange = (value) => {
        const params = new URLSearchParams(searchParams)
        params.set("filter", value)
        router.replace(`${window.location.pathname}?${params.toString()}`)
    }
    return (
        <Select value={filter} onValueChange={handleValueChange}>
            <SelectTrigger className="w-[380px] border border-primary">
                <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
                {categories?.map((category) => (
                    <SelectItem key={category?._id} value={category?.name}>
                        {category?.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default ResourceFilterSelect