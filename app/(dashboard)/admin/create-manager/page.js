import CreateManagerForm from "@/components/create-manager-form"
import Container from "@/components/dashboardComponents/Container"
import { getAllSimpleUsers } from "@/lib/admin"

const CreateManagerPage = async () => {
    const users = await getAllSimpleUsers();
    return (
        <Container className={'bg-white p-2 md:p-4'}>
            <h1 className="text-2xl md:text-4xl font-bold">Assign a Manager</h1>
            <CreateManagerForm users={users} />
        </Container>
    )
}

export default CreateManagerPage