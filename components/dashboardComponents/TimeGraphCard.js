import Image from 'next/image'
import React from 'react'

const TimeGraphCard = ({ title, success }) => {
    return (
        <div className='min-w-[367px] bg-white py-4 px-5 rounded-lg'>
            <h3 className='text-sm'>{title}</h3>
            <div className='flex items-center gap-2'>
                <h2 className='font-medium'>68H 60M </h2>
                <p className={`${success ? 'text-success' : 'text-red'}`}> +16.98</p>
            </div>

            <Image src={'/line-green.png'} width={342} height={193} alt='graph' />
        </div>
    )
}

export default TimeGraphCard