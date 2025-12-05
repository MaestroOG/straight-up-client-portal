import Container from '@/components/dashboardComponents/Container'
import EditPackageForm from '@/components/edit-package-form';
import { getProjectById } from '@/lib/projects';

const EditPackagePage = async ({ params }) => {

    const { id } = await params;
    const projectDetails = await getProjectById(id);

    return (
        <Container className={'bg-white p-4 rounded-lg'}>
            <h1 className='text-2xl md:text-4xl font-bold whitespace-nowrap'>Edit Package</h1>
            <div className='mt-6'>
                <EditPackageForm projectId={id} projectDetails={projectDetails} />
            </div>
        </Container>
    )
}

export default EditPackagePage