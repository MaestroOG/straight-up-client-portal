'use client';

import slugify from "slugify";
import { useState } from "react"
import { yourProjects } from "@/constants"
import Link from "next/link";
import { Button } from "../ui/button";

const FaqGrid = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProjects = yourProjects.filter(project =>
        project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-4">
            {filteredProjects.length > 0 ? (
                filteredProjects.map(project => (
                    <div
                        key={project.id}
                        className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {project.projectTitle}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {project.desc}
                        </p>
                        <Link href={`/faqs/${slugify(project.projectTitle, { lower: true, strict: true })}`}>
                            <Button variant="default">See FAQs</Button>
                        </Link>
                    </div>
                ))
            ) : (
                <p className="col-span-4 text-center text-gray-500">No results found.</p>
            )}
        </div>
    )
}

export default FaqGrid