import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import Link from "next/link"
import { ArchiveRestore } from "lucide-react"

const DeletedUserTable = ({ users }) => {
    return (
        <div className="overflow-x-auto w-full">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Business Name</TableHead>
                        <TableHead className="w-[150px] max-sm:hidden">Owner Name</TableHead>
                        <TableHead className="w-[250px] max-sm:hidden">Contact Email</TableHead>
                        <TableHead className="w-[100px] text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((user) => (
                        <TableRow key={user?._id}>
                            <TableCell className="font-medium">{user?.companyName}</TableCell>
                            <TableCell className={'max-sm:hidden'}>{user?.name}</TableCell>
                            <TableCell className={'max-sm:hidden'}>{user?.email}</TableCell>
                            <TableCell className="max-md:text-right flex items-center justify-end gap-2">
                                <Link href={`/admin/user/${user?._id}`}>
                                    <Button variant="secondary">
                                        <ArchiveRestore
                                            size={24}
                                            alt="view"
                                        />
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default DeletedUserTable