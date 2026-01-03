import CreateTaskForm from '@/components/create-task-form'
import Container from '@/components/dashboardComponents/Container'
import { getAllAdminAndManagers, getAllProjects } from '@/lib/admin'
import { getAllUserProjects } from '@/lib/projects'
import { getCompanyMembers } from '@/lib/task'
import { getUser } from '@/lib/user'

const CreateTaskPage = async () => {
    const user = await getUser();
    let allManagingUsers = await getAllAdminAndManagers();

    let projects = [];

    if (user?.role === 'superadmin') {
        projects = await getAllProjects();
    }

    if (user?.role === 'user') {
        projects = await getAllUserProjects(user?._id);
        allManagingUsers = await getCompanyMembers(user?.companyName);
    } else if (user?.role === 'team-member') {
        allManagingUsers = [];
    }
    return (
        <Container className={'bg-white p-4 rounded-lg'}>
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-medium">Create a Task</h1>
            </div>

            <div className='mt-6'>
                <CreateTaskForm users={allManagingUsers || []} projects={projects} />
            </div>
        </Container>
    )
}

export default CreateTaskPage