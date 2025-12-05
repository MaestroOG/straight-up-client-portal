import Image from 'next/image'
import React from 'react'

const BudgetCard = () => {
    return (
        <div className='bg-white min-w-[367px] rounded-lg'>
            <div className='border-b w-full border-b-gray-200 pb-2 py-4 px-5'>
                <h1 className='text-lg font-semibold'>Budget</h1>
            </div>

            <div className='bg-dark-gray py-4 px-5 flex items-center justify-between mx-5 mt-4 max-w-[325px]'>
                <div>
                    <span className='text-detail text-sm'>Budget Spent</span>
                    <h1 className='text-detail text-xl font-medium'>$ 681,945.00</h1>
                </div>
                <Image src={'/cards.png'} alt='cards' width={80} height={80} />
            </div>

            <div className='py-4 px-5'>
                <div className='py-3 flex flex-col gap-3'>
                    <div className='flex items-center gap-2'>
                        <Image src={'/square-overlay.png'} width={40} height={40} alt='square-overlay' />
                        <div>
                            <h3 className='font-semibold'>Design</h3>
                            <p>$45,456.00</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Image src={'/square-overlay.png'} width={40} height={40} alt='square-overlay' />
                        <div>
                            <h3 className='font-semibold'>Development</h3>
                            <p>$45,456.00</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Image src={'/square-overlay.png'} width={40} height={40} alt='square-overlay' />
                        <div>
                            <h3 className='font-semibold'>UI/UX design</h3>
                            <p>$45,456.00</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BudgetCard