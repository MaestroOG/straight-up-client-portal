'use client';

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useActionState, useEffect, useRef, useState } from "react";
import { editTask } from "@/action/task.actions";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Checkbox } from "./ui/checkbox";


const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});

const EditTaskForm = ({ users, task }) => {

    const [editOpen, setEditOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(task?.dueDate);
    const [status, setStatus] = useState(task?.status);
    const [selectedUsers, setSelectedUsers] = useState(() => {
        const assigneeIds = new Set(
            (task?.assignees || []).map(id => id.toString())
        );

        return users
            ?.map(user => user._id.toString())
            .filter(id => assigneeIds.has(id)) || [];
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(editTask, {});
    const router = useRouter();
    const [description, setDescription] = useState(task?.description);
    const contentRef = useRef(null);

    const handleClick = () => {
        setEditOpen(true);
    }

    const handleToggle = (userId, checked) => {
        setSelectedUsers(prev =>
            checked ? [...prev, userId] : prev.filter(id => id !== userId)
        )
    }

    useEffect(() => {
        if (state?.success) {
            setEditOpen(false);
            setDialogOpen(true);

            const timer = setTimeout(() => {
                router.push("/tasks");
            }, 2000);

            return () => clearTimeout(timer);
        }

        if (state?.message && !state?.success) {
            setEditOpen(false);
            setDialogOpen(true);
        }
    }, [state, router]);


    return (
        <>
            <Button onClick={handleClick}>
                Edit
            </Button>

            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent>
                    <form action={formAction}>
                        <DialogHeader>
                            <DialogTitle>Edit task</DialogTitle>
                            <DialogDescription>
                                Make changes to your task here. Click save when you&apos;re
                                done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 mt-5">
                            <div className="grid gap-3">
                                <Label htmlFor='title'>Task Title</Label>
                                <Input type={'text'} name='title' defaultValue={task?.title} />
                            </div>
                            <div className="grid gap-3 w-full max-w-2xl">
                                <Label htmlFor="description">Task Description</Label>

                                <JoditEditor
                                    ref={contentRef}
                                    value={description}
                                    tabIndex={1}
                                    onBlur={(newContent) => setDescription(newContent)}
                                    config={{
                                        minHeight: 200,
                                        maxHeight: 300,
                                        allowResizeY: false,
                                        statusbar: false,

                                        // This is the magic
                                        iframe: false,
                                        style: {
                                            overflowY: "auto",
                                        }
                                    }}
                                />
                            </div>


                            <div className="flex flex-col gap-3">
                                <Label htmlFor="dueDate" className="px-1">
                                    Schedule Task
                                </Label>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            id="dueDate"
                                            className="justify-between font-normal"
                                        >
                                            {date ? date.toLocaleDateString() : "Select date"}
                                            <ChevronDownIcon />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            captionLayout="dropdown"
                                            onSelect={(date) => {
                                                setDate(date)
                                                setOpen(false)
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor='status'>Task Status</Label>
                                <Select value={status} onValueChange={(val) => setStatus(val)}>
                                    <SelectTrigger className={'w-full'}>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="to-do">To-Do</SelectItem>
                                        <SelectItem value="in-progress">In-Progress</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Assign Users */}
                        {users && users?.length > 0 && (
                            <div className="grid gap-3">
                                <Label className="text-xl">Assign Users</Label>
                                <div className="flex flex-col gap-2 md:max-w-2xl">
                                    {users?.map((user, index) => (
                                        <div key={user?._id || index} className="flex items-center gap-2">
                                            <Checkbox
                                                id={user?._id}
                                                checked={selectedUsers.includes(user._id.toString())}
                                                onCheckedChange={(checked) =>
                                                    handleToggle(user._id.toString(), !!checked)}
                                            />
                                            <Label htmlFor={user?._id}>{user?.name}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <DialogFooter className={'mt-4'}>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button disabled={isPending} type="submit">Save changes</Button>
                        </DialogFooter>

                        <input type="hidden" name="dueDate" value={date} />
                        <input type="hidden" name="status" value={status} />
                        <input type="hidden" name='taskId' value={task?._id} />
                        <input type="hidden" name='description' value={description} />
                        <input
                            type="hidden"
                            name="assignees"
                            value={JSON.stringify(selectedUsers)}
                        />
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader className={'flex items-center justify-center flex-col gap-3'}>
                        <DialogTitle>
                            {state.success ? 'Success ✅' : 'Error ⚠️'}
                        </DialogTitle>
                        <DialogDescription className={'text-lg'}>
                            {state?.message}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default EditTaskForm