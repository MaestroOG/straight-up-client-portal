import Container from '@/components/dashboardComponents/Container';
import EditProjectDetailForm from '@/components/edit-project-details-form';
import { getProjectById } from '@/lib/projects';
import { formConfig } from '@/utils/formConfig';

const EditProjectDetailsPage = async ({ params }) => {
    const { id } = await params;
    const projectDetails = await getProjectById(id);

    const fields = formConfig[projectDetails?.service];

    return (
        <Container className={'bg-white rounded p-4'}>
            <div className='flex items-center gap-2'>
                <h1 className='text-2xl md:text-4xl font-bold whitespace-nowrap'>Edit {projectDetails?.projectTitle}</h1>
            </div>

            <div className='mt-6'>
                <EditProjectDetailForm projectDetails={projectDetails} fields={fields} />
            </div>
        </Container>
    )
}

export default EditProjectDetailsPage