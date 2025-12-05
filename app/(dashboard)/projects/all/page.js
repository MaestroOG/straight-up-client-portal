import Container from "@/components/dashboardComponents/Container"
import MainProjectCard from "@/components/dashboardComponents/MainProjectCard";
import { getEveryProject } from "@/lib/projects";

const AllProjectsPage = async () => {
    const projects = await getEveryProject();
    return (
        <Container className={'bg-white p-4 rounded-lg'}>
            <h1 className="text-xl font-medium">All Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-4">
                {projects?.length === 0 && <p className="text-center p-6">No projects found.</p>}
                {projects?.length > 0 && projects?.map(project => (
                    <MainProjectCard key={project?._id} project={project} />
                ))}
            </div>
        </Container>
    )
}

export default AllProjectsPage