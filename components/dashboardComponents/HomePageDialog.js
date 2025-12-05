'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";

const HomePageDialog = ({ title, description }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = async () => {
        await fetch('/api/notifications/mark-read', { method: 'POST' });
        setOpen(false)
    }

    useEffect(() => {
        setOpen(true)
    }, [])
    return (
        <Dialog open={open} onOpenChange={handleOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default HomePageDialog