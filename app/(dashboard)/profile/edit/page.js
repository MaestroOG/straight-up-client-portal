import Container from '@/components/dashboardComponents/Container'
import EditUserDetailForm from '@/components/edit-user-detail-form';
import { getUserFromDB } from '@/lib/user';

const EditProfilePage = async () => {
    const user = await getUserFromDB();
    console.log(user);
    return (
        <Container className={'bg-white p-2 md:p-4'}>
            <h1 className="text-2xl md:text-4xl font-bold">Edit User Details</h1>
            <EditUserDetailForm user={user} userId={user?._id} />
        </Container>
    )
}

export default EditProfilePage