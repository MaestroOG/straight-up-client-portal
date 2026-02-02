import FileCenterForm from '@/components/upload-files-form'
import React from 'react'

const FileCenterPage = async ({ params }) => {

    const { id } = await params;

    return (
        <FileCenterForm projectId={id} />
    )
}

export default FileCenterPage