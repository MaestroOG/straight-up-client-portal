'use client';

import Container from "@/components/dashboardComponents/Container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { yourProjects } from "@/constants"
import Link from "next/link"
import { useState } from "react"
import slugify from "slugify";

const FAQPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProjects = yourProjects.filter(project =>
        project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <Container className={'bg-white p-4 rounded-lg'}>
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-xl font-medium">FAQs</h1>
                <div>
                    <Input type="text" placeholder="Search FAQs..." className={''} value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-4">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map(project => (
                        <div
                            key={project.id}
                            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
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
        </Container>
    )
}

export default FAQPage