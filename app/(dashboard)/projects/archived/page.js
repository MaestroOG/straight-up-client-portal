import Container from "@/components/dashboardComponents/Container"
import MainProjectCard from "@/components/dashboardComponents/MainProjectCard";
import { getAllArchivedProjects, getAllArchivedUserProjects } from "@/lib/projects";
import { getUser } from "@/lib/user";
import { notFound } from "next/navigation";

const ArchivedProjects = async () => {
    const user = await getUser();
    let projects;

    if (user?.role === 'superadmin') {
        projects = await getAllArchivedProjects();
    } else if (user?.role === 'user') {
        projects = await getAllArchivedUserProjects();
    } else {
        return notFound();
    }
    return (
        <Container className={'bg-white p-4 rounded-lg'}>
            <h1 className="text-xl font-medium">Archived Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-4">
                {projects?.length === 0 && <p className="text-center p-6">No archived projects found.</p>}
                {projects?.length > 0 && projects?.map(project => (
                    <MainProjectCard key={project?._id} project={project} />
                ))}
            </div>
        </Container>
    )
}

export default ArchivedProjects