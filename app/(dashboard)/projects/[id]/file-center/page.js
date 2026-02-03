import FileCenterForm from '@/components/upload-files-form'

const FileCenterPage = async ({ params }) => {

    const { id } = await params;

    return (
        <FileCenterForm projectId={id} />
    )
}

export default FileCenterPage