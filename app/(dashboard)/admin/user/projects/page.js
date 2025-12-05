import Container from '@/components/dashboardComponents/Container';
import MainProjectCard from '@/components/dashboardComponents/MainProjectCard';
import { getAllUserProjects } from '@/lib/projects';

const AgencyProjects = async ({ searchParams }) => {
    const { agencyId } = await searchParams;
    const projects = await getAllUserProjects(agencyId)
    console.log(projects)
    return (
        <>
            <Container className={'bg-white px-4 py-3'}>
                <h1 className="font-bold text-2xl md:text-4xl">Agency Projects</h1>

                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-6'>
                    {projects?.map(project => (
                        <MainProjectCard key={project?._id} project={project} />
                    ))}
                </div>

            </Container>
        </>
    )
}

export default AgencyProjects