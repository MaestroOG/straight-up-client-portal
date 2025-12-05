import CreateDiscussionForm from '@/components/create-discussion-form'
import Container from '@/components/dashboardComponents/Container'

const CreateDiscussionPage = () => {
    return (
        <Container className={'bg-white p-4 rounded-lg'}>
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Create New Discussion</h1>
            </div>
            <div className='mt-6'>
                {/* TODO: Discussion Creation Form */}
                <CreateDiscussionForm />
            </div>
        </Container>
    )
}

export default CreateDiscussionPage