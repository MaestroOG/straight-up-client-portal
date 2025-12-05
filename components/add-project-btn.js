import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AddProjectButton = ({ className, href }) => {
    return (
        <Link href={href || ""} className={`bg-white flex items-center gap-2.5 p-2 rounded-full cursor-pointer ${className ?? className}`}>
            <Image src={'/addIcon.png'} width={34} height={34} alt="Add_Icon" />
            <p className="font-medium text-sm">Create new project</p>
        </Link>
    )
}

export default AddProjectButton