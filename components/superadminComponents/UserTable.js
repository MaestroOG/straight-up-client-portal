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
import { Eye, FolderCog, Trash } from "lucide-react"
import DeletePartnerForm from "../delete-partner-form"

const UserTable = ({ users }) => {
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
                                <DeletePartnerForm userId={user?._id} />
                                <Link href={`/admin/user/${user?._id}`}>
                                    <Button variant="secondary">
                                        <Eye
                                            size={24}
                                            alt="view"
                                        />
                                    </Button>
                                </Link>
                                <Link href={`/admin/user/projects?agencyId=${user?._id}`}>
                                    <Button variant="secondary">
                                        <FolderCog
                                            size={24}
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

export default UserTable