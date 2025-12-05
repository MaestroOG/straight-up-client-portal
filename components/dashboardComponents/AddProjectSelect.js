"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { yourProjects } from '@/constants'
import { useRouter, useSearchParams } from 'next/navigation';


export default function AddProjectSelect() {
    const router = useRouter();
    const searchParams = useSearchParams()

    const service = searchParams.get("service") || "";

    const handleValueChange = (value) => {
        const params = new URLSearchParams(searchParams)
        params.set("service", value)
        router.replace(`?${params.toString()}`)
    }

    return (
        <Select value={service} onValueChange={handleValueChange}>
            <SelectTrigger className="w-full border border-gray-200">
                <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent>
                {yourProjects.map(project => (
                    <SelectItem key={project.projectTitle} value={project.projectTitle}>{project.projectTitle}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}