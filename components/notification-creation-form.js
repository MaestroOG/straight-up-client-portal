'use client';
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useActionState, useState } from 'react';
import { createNotification } from '@/action/notifications.actions';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Select } from './ui/select';
import { Checkbox } from './ui/checkbox';

const NotificationCreationForm = ({ users }) => {
    const [state, formAction, isPending] = useActionState(createNotification, {})
    const [selectedUsers, setSelectedUsers] = useState([])
    const [sendToAll, setSendToAll] = useState(false)


    const toggleUser = (userId, checked) => {
        setSelectedUsers((prev) =>
            checked ? [...prev, userId] : prev.filter((id) => id !== userId)
        )
    }
    return (
        <>
            <form action={formAction} className='grid gap-4 mt-6'>
                <div className='grid gap-2'>
                    <Label className={'text-detail'}>Enter Notification Title</Label>
                    <Input name='title' type={'text'} className={'max-w-2xl'} />
                </div>
                <div className='grid gap-2'>
                    <Label className={'text-detail'}>Enter Notification Description</Label>
                    <Textarea name='description' className={'max-w-2xl'} />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="sendToAll"
                        checked={sendToAll}
                        onCheckedChange={(checked) => setSendToAll(!!checked)}
                    />
                    <Label htmlFor="sendToAll">Send to all</Label>

                    {/* Hidden input so value goes in formData */}
                    <input type="hidden" name="sendToAll" value={sendToAll} />
                </div>

                {!sendToAll && <div className="grid gap-2">
                    <Label>Select Users</Label>
                    <div className="grid gap-2 max-h-64 overflow-y-auto border rounded p-3">
                        {users.map((user) => (
                            <div key={user._id} className="flex items-center gap-2">
                                <Checkbox
                                    id={user._id}
                                    checked={selectedUsers.includes(user._id)}
                                    onCheckedChange={(checked) => toggleUser(user._id, checked)}
                                />
                                <label htmlFor={user._id} className="text-sm">
                                    {user.name || user.email}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Hidden inputs so formData works on submit */}
                    {selectedUsers.map((id) => (
                        <input key={id} type="hidden" name="recipients" value={id} />
                    ))}
                </div>}
                <Button disabled={isPending} type='submit' className={'mt-4 max-w-2xl'}>Create Notification</Button>
            </form>
            <Dialog open={!!state.message} onOpenChange={() => window.location.reload()} className='bg-white'>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? 'Notification Created 🎉' : 'Error ⚠️'}
                        </DialogTitle>
                        <DialogDescription>{state.message}</DialogDescription>
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

export default NotificationCreationForm