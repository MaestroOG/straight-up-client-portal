import Container from '@/components/dashboardComponents/Container'
import TwoFactorForm from '@/components/two-factor-form'
import { getOTPForComparison } from '@/lib/two-fa';
import { getUserFromDB } from '@/lib/user'

const EnableTwoFactorAuth = async () => {
    const user = await getUserFromDB();
    const otp = await getOTPForComparison(user?._id);
    console.log(otp)

    return (
        <Container className={'bg-white p-2 md:p-4'}>
            <h1 className='text-2xl md:text-4xl font-bold'>Enable Two-Factor Authentication</h1>
            <TwoFactorForm userId={user?._id} checked={user?.useTwoFactor} />
        </Container>
    )
}

export default EnableTwoFactorAuth