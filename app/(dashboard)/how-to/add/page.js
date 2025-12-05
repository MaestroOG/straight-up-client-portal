import AddHowToVideoForm from "@/components/add-how-to-video-form"
import Container from "@/components/dashboardComponents/Container"

const HowToVideoAddPage = () => {
    return (
        <Container className={'bg-white p-2 md:p-4'}>
            <h1 className="text-2xl md:text-4xl font-bold">Add A How-To Video</h1>
            <AddHowToVideoForm />
        </Container>
    )
}

export default HowToVideoAddPage