import Container from '@/components/dashboardComponents/Container'
import DeletedUserTable from '@/components/superadminComponents/DeletedUserTable';
import PendingUserTable from '@/components/superadminComponents/PendingUserTable';
import UserTable from '@/components/superadminComponents/UserTable';
import { Button } from '@/components/ui/button';

import { getAllDeletedUsers, getAllPendingUsers, getAllUsers } from '@/lib/admin'
import { getUser } from '@/lib/user';
import Link from 'next/link';

export const metadata = {
    title: "SuperAdmin Panel - Straight Up Digital Client Portal"
}

const SuperAdminPage = async () => {
    const user = await getUser();
    const pendingUsers = await getAllPendingUsers();
    const allUsers = await getAllUsers();
    const deletedUser = await getAllDeletedUsers();

    return (
        <main className='h-screen'>
            <Container className="bg-white px-2 md:px-4 py-3 flex flex-wrap items-center gap-2">
                <Link href="/admin/projects">
                    <Button variant="link">See All Projects</Button>
                </Link>

                <Link href="/admin/create-notification">
                    <Button variant="link">Create a Notification</Button>
                </Link>

                <Link href="/admin/create-manager">
                    <Button variant="link">Assign a Manager</Button>
                </Link>

                <Link href="/admin/assign-credit">
                    <Button variant="link">Assign Credit</Button>
                </Link>

                {user?.name === "Muneeb Ur Rehman" && (
                    <Link href="/admin/create-superadmin">
                        <Button variant="link">Assign a Superadmin</Button>
                    </Link>
                )}
            </Container>

            <Container className="bg-white px-2 md:px-4 py-3 rounded-lg shadow-sm overflow-hidden">
                <h1 className="font-bold text-2xl md:text-4xl">Pending User Requests</h1>

                <div className="mt-6">
                    {pendingUsers?.length === 0 ? (
                        <div className="text-center p-6 text-gray-500">No Pending Users</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <PendingUserTable pendingUsers={pendingUsers} />
                        </div>
                    )}
                </div>
            </Container>


            <Container className={'bg-white px-2 pr-4 md:pr-0 md:px-4 py-3'}>
                <h1 className="font-bold text-2xl md:text-4xl">All Agencies</h1>
                <div className='mt-6'>
                    {allUsers?.length === 0 && <div className='text-center p-6'>No Users Registered!</div>}
                    {allUsers?.length > 0 && <UserTable users={allUsers} />}
                </div>
            </Container>

            <Container className={'bg-white px-2 pr-4 md:pr-0 md:px-4 py-3'}>
                <h1 className="font-bold text-2xl md:text-4xl">Deleted Agencies</h1>
                <div className='mt-6'>
                    {deletedUser?.length === 0 && <div className='text-center p-6'>No Deleted Users</div>}
                    {deletedUser?.length > 0 && <DeletedUserTable users={deletedUser} />}
                </div>
            </Container>
        </main>
    )
}

export default SuperAdminPage