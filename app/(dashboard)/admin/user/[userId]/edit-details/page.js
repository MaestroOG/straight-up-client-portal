import Container from "@/components/dashboardComponents/Container";
import EditUserDetailForm from "@/components/edit-user-detail-form";
import { getUserById } from "@/lib/admin";

const EditDetailsPage = async ({ params }) => {
    const { userId } = await params;
    const user = await getUserById(userId);
    return (
        <Container className={'bg-white p-2 md:p-4'}>
            <h1 className="text-2xl md:text-4xl font-bold">Edit User Details</h1>
            <EditUserDetailForm user={user} userId={userId} />
        </Container>
    )
}

export default EditDetailsPage