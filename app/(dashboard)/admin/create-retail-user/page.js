import CreateRetailUserForm from '@/components/create-retail-user-form'
import Container from '@/components/dashboardComponents/Container'

const CreateRetailUserPage = () => {
    return (
        <Container className="bg-white px-2 md:px-4 py-3 rounded-lg shadow-sm overflow-hidden">
            <h1 className="font-bold text-2xl md:text-4xl">Create Retail User</h1>
            <div className='mt-6'>
                <CreateRetailUserForm />
            </div>
        </Container>
    )
}

export default CreateRetailUserPage