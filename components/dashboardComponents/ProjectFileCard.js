import Image from 'next/image'
import React from 'react'

const ProjectFileCard = () => {
    return (
        <div className='min-w-[497px] bg-white rounded-lg'>
            <div className='border-b w-full border-b-gray-200 pb-2 py-4 px-5'>
                <h1 className='text-lg font-semibold'>Project Files</h1>
            </div>

            <div className='mt-2 py-4 px-5 flex flex-col gap-2'>
                <div className='flex items-center justify-between py-3'>
                    <div className='flex items-center gap-2'>
                        <Image src={'/folder.png'} width={35} height={35} alt='folder' />
                        <div>
                            <h2 className='font-semibold'>Admin</h2>
                            <p>1GB</p>
                        </div>
                    </div>
                    <div className='w-9 h-9 bg-[#74788D33]' />
                </div>
                <div className='flex items-center justify-between py-3'>
                    <div className='flex items-center gap-2'>
                        <Image src={'/pdf.png'} width={35} height={35} alt='folder' />
                        <div>
                            <h2 className='font-semibold'>Project Design</h2>
                            <p>278MB</p>
                        </div>
                    </div>
                    <div className='w-9 h-9 bg-[#74788D33]' />
                </div>
                <div className='flex items-center justify-between py-3'>
                    <div className='flex items-center gap-2'>
                        <Image src={'/pdf.png'} width={35} height={35} alt='folder' />
                        <div>
                            <h2 className='font-semibold'>PDF</h2>
                            <p>10MB</p>
                        </div>
                    </div>
                    <div className='w-9 h-9 bg-[#74788D33]' />
                </div>
            </div>
        </div>
    )
}

export default ProjectFileCard