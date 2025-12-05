'use client';

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useActionState, useEffect, useRef, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createTask } from "@/action/task.actions";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});

const CreateTaskForm = ({ users }) => {

    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(undefined)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [status, setStatus] = useState("");
    const [state, formAction, isPending] = useActionState(createTask.bind(null, selectedUsers), {});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [description, setDescription] = useState("");
    const contentRef = useRef(null);

    const handleToggle = (userId, checked) => {
        setSelectedUsers(prev =>
            checked ? [...prev, userId] : prev.filter(id => id !== userId)
        )
    }

    useEffect(() => {
        if (state?.success || state?.message) {
            setDialogOpen(true);
            if (state?.success) {
                // Reset form fields after successful submission
                setDate(undefined);
                setSelectedUsers([]);
                setStatus("");
                setDescription("")
            }
        }
    }, [state])

    return (
        <>
            <form action={formAction} className="grid gap-6">
                {/* Title */}
                <div className="grid gap-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input
                        type="text"
                        name="title"
                        id="title"
                        className="w-full md:max-w-2xl"
                        required
                    />
                </div>

                {/* Description */}
                <div className="grid gap-2">
                    <Label htmlFor="description">Task Description</Label>
                    <JoditEditor
                        ref={contentRef}
                        value={description}
                        tabIndex={1}
                        onBlur={(newContent) => setDescription(newContent)}
                        onChange={() => { }}
                        className="w-full md:max-w-2xl"
                    />
                </div>

                {/* Due Date */}
                <div className="grid gap-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                id="dueDate"
                                className="w-full md:max-w-2xl justify-between font-normal"
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
                                onSelect={(d) => {
                                    setDate(d);
                                    setOpen(false);
                                }}
                                disabled={{ before: new Date().setHours(0, 0, 0, 0) }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Status */}
                <div className="grid gap-2">
                    <Label htmlFor="status">Task Status</Label>
                    <Select value={status} onValueChange={(val) => setStatus(val)}>
                        <SelectTrigger className="w-full md:max-w-2xl">
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

                {/* Assign Users */}
                <div className="grid gap-3">
                    <Label className="text-xl">Assign Users</Label>
                    <div className="flex flex-col gap-2 md:max-w-2xl">
                        {users?.map((user, index) => (
                            <div key={user?._id || index} className="flex items-center gap-2">
                                <Checkbox
                                    id={user?._id}
                                    checked={selectedUsers.includes(user._id)}
                                    onCheckedChange={(checked) =>
                                        handleToggle(user._id, !!checked)
                                    }
                                />
                                <Label htmlFor={user?._id}>{user?.name}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Selected Users Summary */}
                <p className="text-sm text-muted-foreground mt-2 md:max-w-2xl">
                    Selected:{" "}
                    {selectedUsers.length
                        ? users
                            .filter((u) => selectedUsers.includes(u?._id))
                            .map((u) => u?.name)
                            .join(", ")
                        : "None"}
                </p>

                {/* Hidden Fields */}
                <input type="hidden" name="dueDate" value={date} />
                <input type="hidden" name="status" value={status} />
                <input type="hidden" name="description" value={description} />

                {/* Submit Button */}
                <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full md:max-w-2xl"
                >
                    Add Task
                </Button>
            </form>


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

export default CreateTaskForm