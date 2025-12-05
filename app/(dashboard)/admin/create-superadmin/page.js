import CreateSuperAdminForm from '@/components/create-superadmin-form'
import Container from '@/components/dashboardComponents/Container'
import { getAllSimpleUsers } from '@/lib/admin'

const CreateSuperAdminPage = async () => {
    const allUsers = await getAllSimpleUsers();

    if (!allUsers || allUsers.length === 0) {
        return (
            <Container className={'bg-white px-2 pr-4 md:pr-0 md:px-4 py-3'}>
                <h1 className="font-bold text-2xl md:text-4xl">Assign a new superadmin</h1>
                <p className="text-red-600 mt-4">Failed to load users. Please try again later.</p>
            </Container>
        );
    }

    return (
        <Container className={'bg-white px-2 pr-4 md:pr-0 md:px-4 py-3'}>
            <h1 className="font-bold text-2xl md:text-4xl">Assign a new superadmin</h1>
            <CreateSuperAdminForm users={allUsers} />
        </Container>
    )
}

export default CreateSuperAdminPage