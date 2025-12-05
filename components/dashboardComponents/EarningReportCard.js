import Image from 'next/image'
import React from 'react'

const EarningReportCard = () => {
    return (
        <div className='min-w-[497px] bg-white rounded-lg'>
            <div className='border-b w-full border-b-gray-200 pb-2 py-4 px-5'>
                <h1 className='text-lg font-semibold'>Total Earning Reports</h1>
            </div>

            <div className='flex items-center gap-3 py-4 px-5'>
                <div className='bg-green text-white px-4 py-1.5 rounded-lg'>Week</div>
                <div className='text-green px-4 py-1.5 rounded-lg'>Month</div>
                <div className='text-green px-4 py-1.5 rounded-lg'>Year</div>
            </div>

            <div className='relative w-[450px] h-[450px] py-4 px-5'>
                <Image src={'/tabpanel.png'} alt='tabpanel' fill />
            </div>
        </div>
    )
}

export default EarningReportCard