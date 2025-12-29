import CreateFaqForm from "@/components/create-faq-form"
import Container from "@/components/dashboardComponents/Container"


const CreateFaqPage = () => {
    return (
        <Container className={'bg-white p-4 rounded-lg'}>
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-xl font-medium">Create a FAQ</h1>
            </div>

            <div className="mt-6">
                {/* Form elements for creating a FAQ would go here */}
                <CreateFaqForm />
            </div>
        </Container>
    )
}

export default CreateFaqPage