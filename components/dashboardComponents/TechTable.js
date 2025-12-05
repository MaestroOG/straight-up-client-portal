import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"

const TechTable = () => {

    const invoices = [
        {
            invoice: "React",
            paymentStatus: "Paid",
            totalAmount: "Dec 07, 2024",
            paymentMethod: "Keith",
            startDate: 'Dec 07, 2024'
        },
        {
            invoice: "Node",
            paymentStatus: "Pending",
            totalAmount: "Dec 07, 2024",
            paymentMethod: "Merline",
            startDate: 'Dec 07, 2024'
        },
        {
            invoice: "HTML",
            paymentStatus: "Unpaid",
            totalAmount: "Dec 07, 2024",
            paymentMethod: "K Fred",
            startDate: 'Dec 07, 2024'
        },
        {
            invoice: "Tailwind",
            paymentStatus: "Paid",
            totalAmount: "Dec 07, 2024",
            paymentMethod: "Genevra",
            startDate: 'Dec 07, 2024'
        },
        {
            invoice: "Vue",
            paymentStatus: "Paid",
            totalAmount: "Dec 07, 2024",
            paymentMethod: "Murazik",
            startDate: 'Dec 07, 2024'
        },
        {
            invoice: "Python",
            paymentStatus: "Pending",
            totalAmount: "Dec 07, 2024",
            paymentMethod: "Fleta",
            startDate: 'Dec 07, 2024'
        },
        {
            invoice: "Xd",
            paymentStatus: "Unpaid",
            totalAmount: "Dec 07, 2024",
            paymentMethod: "Bette",
            startDate: 'Dec 07, 2024'
        },
    ]

    return (
        <div className='min-w-5xl bg-white px-4 py-6 rounded-lg'>
            <div className='flex items-center justify-between border-b border-b-gray-200 pb-2'>
                <div className='flex items-center gap-2'>
                    <p className='text-sm'>Show </p>
                    <input type="text" value={10} className='w-16 p-2' />
                    <p> entries</p>
                </div>
                <div className='flex items-center gap-2'>
                    <p>Search:</p>
                    <input type="text" className='max-w-[297px] p-1' />
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><Checkbox className={'data-[state=checked]:bg-red data-[state=checked]:text-white'} /></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Leader</TableHead>
                        <TableHead className="text-right">Start Date</TableHead>
                        <TableHead className="text-right">End Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.invoice}>
                            <TableCell><Checkbox className={'data-[state=checked]:bg-red data-[state=checked]:text-white'} /></TableCell>
                            <TableCell className="font-medium flex items-center gap-2">
                                <Image src={'/react.png'} width={30} height={30} alt='react' />
                                <div>
                                    <h1>{invoice.invoice}</h1>
                                    <p>23 Jun 2024</p>
                                </div>
                            </TableCell>
                            <TableCell className={'text-red'}>
                                <Badge variant={'destructive'}>{invoice.paymentStatus}</Badge>
                            </TableCell>
                            <TableCell>{invoice.paymentMethod}</TableCell>
                            <TableCell className="text-right text-success">{invoice.totalAmount}</TableCell>
                            <TableCell className="text-right text-red">Dec 26, 2024</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TechTable