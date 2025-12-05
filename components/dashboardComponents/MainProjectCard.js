import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { camelToNormal, capitalizeFirst } from "@/utils/formUtils"
import Link from "next/link"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"

const MainProjectCard = ({ project }) => {
    return (
        <Card className="flex flex-col justify-between max-w-sm border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
                <Badge variant="secondary" className="mb-2 w-fit">
                    {camelToNormal(project?.service)}
                </Badge>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {project?.projectTitle}
                </CardTitle>
                <CardDescription className="font-medium">
                    By: {project?.createdBy?.companyName ?? "Unknown"}
                </CardDescription>
                <p className="font-medium text-red animate-pulse">
                    • {capitalizeFirst(project?.status) || ""}
                </p>
            </CardHeader>

            <CardFooter className="mt-auto">
                <Link href={`/projects/${project?._id}`} className="w-full">
                    <Button variant="default" className="w-full">
                        Project Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default MainProjectCard