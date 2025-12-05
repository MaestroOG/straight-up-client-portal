import ChangePasswordForm from "@/components/change-password-form";
import Container from "@/components/dashboardComponents/Container";


const ChangePassword = async () => {
    return (
        <Container className={'p-4 bg-white'}>
            <h1 className="text-2xl md:text-4xl mb-4">Change Password</h1>
            <ChangePasswordForm />
        </Container>
    )
}

export default ChangePassword