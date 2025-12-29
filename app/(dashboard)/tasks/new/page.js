import CreateTaskForm from '@/components/create-task-form'
import Container from '@/components/dashboardComponents/Container'
import { getAllAdminAndManagers } from '@/lib/admin'
import { getCompanyMembers } from '@/lib/task'
import { getUser } from '@/lib/user'

const CreateTaskPage = async () => {
    const user = await getUser();
    let allManagingUsers = await getAllAdminAndManagers();

    if (user?.role === 'user') {
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
                <CreateTaskForm users={allManagingUsers || []} />
            </div>
        </Container>
    )
}

export default CreateTaskPage