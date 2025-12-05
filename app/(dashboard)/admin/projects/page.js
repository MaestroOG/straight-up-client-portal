import Container from '@/components/dashboardComponents/Container'
import MainProjectCard from '@/components/dashboardComponents/MainProjectCard';
import { getAllProjects } from '@/lib/projects'

const AllProjectsPage = async () => {
    const allProjects = await getAllProjects();
    return (
        <Container className={'bg-white px-2 pr-4 md:pr-0 md:px-4 py-3'}>
            <h1 className='text-2xl md:text-4xl'>All Projects</h1>
            <div className='mt-4 grid grid-cols-1 md:grid-cols-4 gap-4'>
                {allProjects?.map(project => (
                    <>
                        <MainProjectCard key={project?._id} project={project} />
                    </>
                ))}
            </div>
        </Container>
    )
}

export default AllProjectsPage