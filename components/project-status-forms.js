'use client'

import { ApproveProject, changeProjectStatus, RejectProject } from "@/action/project.actions"
import { useActionState, useState } from "react"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const ProjectStatusForms = ({ projectId, status }) => {

    const [approveState, approveFormAction, approveIsPending] = useActionState(ApproveProject.bind(null, projectId), {})
    const [rejectState, rejectFormAction, rejectIsPending] = useActionState(RejectProject.bind(null, projectId), {})
    const [projectState, projectFormAction, projectIsPending] = useActionState(changeProjectStatus.bind(null, projectId), {});

    const [projectStatus, setProjectStatus] = useState("");

    return (
        <>

            {status === 'Pending' && (
                <>
                    <form action={approveFormAction}>
                        <Button type='submit' disabled={approveIsPending}>Approve</Button>
                    </form>

                    <form action={rejectFormAction}>
                        <Button type='submit' disabled={rejectIsPending} variant={'outline'}>Reject</Button>
                    </form>
                </>
            )
            }

            {status !== 'Pending' && (
                <form action={projectFormAction} className="flex items-center gap-2">
                    <Select onValueChange={(value) => setProjectStatus(value)}>
                        <SelectTrigger className="w-[190px] ring ring-red">
                            <SelectValue placeholder="Change Project Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Complete</SelectItem>
                            <SelectItem value="rejected">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>

                    <input type="hidden" name="status" value={projectStatus} />

                    <Button size={'sm'} disabled={projectIsPending} type='submit'>Change Status</Button>
                </form>
            )}

            {/* Approve */}
            <Dialog open={!!approveState.message} onOpenChange={() => window.location.reload()} className='bg-white'>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {approveState.success ? 'Project Approved 🎉' : 'Error ⚠️'}
                        </DialogTitle>
                        <DialogDescription>{approveState.message}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => window.location.reload()}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Reject */}

            <Dialog open={!!rejectState.message} onOpenChange={() => window.location.reload()} className='bg-white'>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {rejectState.success ? 'Project Rejected 😢' : 'Error ⚠️'}
                        </DialogTitle>
                        <DialogDescription>{rejectState.message}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => window.location.reload()}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Change */}

            <Dialog open={!!projectState.message} onOpenChange={() => window.location.reload()} className='bg-white'>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {projectState.success ? 'Project Status Updated ✔' : 'Error ⚠️'}
                        </DialogTitle>
                        <DialogDescription>{projectState.message}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => window.location.reload()}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProjectStatusForms