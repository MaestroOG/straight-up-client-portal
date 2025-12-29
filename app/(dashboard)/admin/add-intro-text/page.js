import CreateIntroTextForm from '@/components/create-intro-text-form'
import Container from '@/components/dashboardComponents/Container'

const AddIntroTextPage = () => {
    return (
        <Container className="bg-white px-2 md:px-4 py-3 rounded-lg shadow-sm overflow-hidden">
            <h1 className="font-bold text-2xl md:text-4xl">Add Intro Text</h1>
            <div className='mt-6'>
                <CreateIntroTextForm />
            </div>
        </Container>
    )
}

export default AddIntroTextPage