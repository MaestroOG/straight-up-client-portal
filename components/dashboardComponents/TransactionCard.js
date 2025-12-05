import Image from 'next/image'
import React from 'react'

const TransactionCard = () => {
    return (
        <div className='min-w-[497px] bg-white rounded-lg'>
            <div className='border-b w-full border-b-gray-200 pb-2 py-4 px-5'>
                <h1 className='text-lg font-semibold'>Transactions</h1>
            </div>

            <div className='mt-2 py-4 px-5 flex flex-col gap-2'>
                <div className='flex items-center justify-between py-3'>
                    <div className='flex items-center gap-2'>
                        <Image src={'/success-overlay.png'} width={40} height={40} alt='overlay' />
                        <div>
                            <h2 className='font-semibold'>Gideon</h2>
                            <p>Wallet</p>
                        </div>
                    </div>
                    <div>
                        <p className='text-success'>+500.00$</p>
                        <p className='text-sm text-right'>01:35 PM</p>
                    </div>
                </div>
                <div className='flex items-center justify-between py-3'>
                    <div className='flex items-center gap-2'>
                        <Image src={'/success-overlay.png'} width={40} height={40} alt='overlay' />
                        <div>
                            <h2 className='font-semibold'>Gideon</h2>
                            <p>Wallet</p>
                        </div>
                    </div>
                    <div>
                        <p className='text-success'>+500.00$</p>
                        <p className='text-sm text-right'>01:35 PM</p>
                    </div>
                </div>
                <div className='flex items-center justify-between py-3'>
                    <div className='flex items-center gap-2'>
                        <Image src={'/success-overlay.png'} width={40} height={40} alt='overlay' />
                        <div>
                            <h2 className='font-semibold'>Gideon</h2>
                            <p>Wallet</p>
                        </div>
                    </div>
                    <div>
                        <p className='text-success'>+500.00$</p>
                        <p className='text-sm text-right'>01:35 PM</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionCard