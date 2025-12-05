import Image from 'next/image'
import React from 'react'

const ProjectTeamTable = () => {
    return (
        <div className='min-w-[758px] bg-white py-4 px-5 rounded-lg'>
            <h2 className='text-lg font-semibold'>Project Team</h2>

            {/* Table */}


            <div className="relative overflow-x-auto mt-4">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs text-gray-700 uppercase">
                        <tr>
                            <th scope="col" className="py-3 font-medium">
                                Members
                            </th>
                            <th scope="col" className="py-3 font-medium">
                                Task
                            </th>
                            <th scope="col" className="py-3 font-medium">
                                Status
                            </th>
                            <th scope="col" className="py-3 font-medium">
                                Hours
                            </th>
                        </tr>
                    </thead>
                    <tbody className='-mt-2'>
                        <tr className="border-b border-b-gray-200">
                            <th scope="row" className="py-4 font-medium whitespace-nowrap">
                                <div className='flex items-center gap-2'>
                                    <Image src={'/team-avatar.png'} width={35} height={35} alt='team-avatar' />
                                    <div>
                                        <h3 className='font-semibold'>Mark McKenzie</h3>
                                        <p className='text-xs text-detail'>Full Stack Developer</p>
                                    </div>
                                </div>
                            </th>
                            <td className="py-4 font-extrabold text-heading">
                                21
                            </td>
                            <td className="py-4">
                                <div className='border border-red text-red rounded-md w-fit px-2 font-semibold py-1'>
                                    • Pending
                                </div>
                            </td>
                            <td className="py-4 font-medium text-detail">
                                3H 09M
                            </td>
                        </tr>
                        <tr className="border-b border-b-gray-200">
                            <th scope="row" className="py-4 font-medium whitespace-nowrap">
                                <div className='flex items-center gap-2'>
                                    <Image src={'/team-avatar.png'} width={35} height={35} alt='team-avatar' />
                                    <div>
                                        <h3 className='font-semibold'>Mark McKenzie</h3>
                                        <p className='text-xs text-detail'>Full Stack Developer</p>
                                    </div>
                                </div>
                            </th>
                            <td className="py-4 font-extrabold text-heading">
                                21
                            </td>
                            <td className="py-4">
                                <div className='border border-red text-red rounded-md w-fit px-2 font-semibold py-1'>
                                    • Pending
                                </div>
                            </td>
                            <td className="py-4 font-medium text-detail">
                                3H 09M
                            </td>
                        </tr>
                        <tr className="border-b border-b-gray-200">
                            <th scope="row" className="py-4 font-medium whitespace-nowrap">
                                <div className='flex items-center gap-2'>
                                    <Image src={'/team-avatar.png'} width={35} height={35} alt='team-avatar' />
                                    <div>
                                        <h3 className='font-semibold'>Mark McKenzie</h3>
                                        <p className='text-xs text-detail'>Full Stack Developer</p>
                                    </div>
                                </div>
                            </th>
                            <td className="py-4 font-extrabold text-heading">
                                21
                            </td>
                            <td className="py-4">
                                <div className='border border-red text-red rounded-md w-fit px-2 font-semibold py-1'>
                                    • Pending
                                </div>
                            </td>
                            <td className="py-4 font-medium text-detail">
                                3H 09M
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" className="py-4 font-medium whitespace-nowrap">
                                <div className='flex items-center gap-2'>
                                    <Image src={'/team-avatar.png'} width={35} height={35} alt='team-avatar' />
                                    <div>
                                        <h3 className='font-semibold'>Mark McKenzie</h3>
                                        <p className='text-xs text-detail'>Full Stack Developer</p>
                                    </div>
                                </div>
                            </th>
                            <td className="py-4 font-extrabold text-heading">
                                21
                            </td>
                            <td className="py-4">
                                <div className='border border-red text-red rounded-md w-fit px-2 font-semibold py-1'>
                                    • Pending
                                </div>
                            </td>
                            <td className="py-4 font-medium text-detail">
                                3H 09M
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ProjectTeamTable