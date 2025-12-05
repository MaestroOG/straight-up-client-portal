import ChangeEmailForm from "@/components/change-email-form";
import Container from "@/components/dashboardComponents/Container";

import { getUser } from "@/lib/user"


const ChangeEmail = async () => {
    const user = await getUser();
    return (
        <Container className={'p-4 bg-white'}>
            <h1 className="text-2xl md:text-4xl mb-4">Change Email</h1>
            <ChangeEmailForm email={user?.email} />
        </Container>
    )
}

export default ChangeEmail