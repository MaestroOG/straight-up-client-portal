'use client';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import TaskListItem from "@/components/dashboardComponents/TaskListItem"
import { useState } from "react";
import { ChevronDown } from "lucide-react"

function TaskSection({ title, tasks }) {
    const [open, setOpen] = useState(true)

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <div className="space-y-2">
                <CollapsibleTrigger asChild>
                    <button className="flex w-full items-center justify-between">
                        <h2 className="text-xl font-bold">{title}</h2>
                        <ChevronDown
                            className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""
                                }`}
                        />
                    </button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    {tasks && tasks.length > 0 ? (
                        <div className="space-y-3 mt-2">
                            {tasks.map(task => (
                                <TaskListItem key={task?._id} task={task} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-sm mt-2">
                            No {title.toLowerCase()} tasks
                        </p>
                    )}
                </CollapsibleContent>
            </div>
        </Collapsible>
    )
}

export default TaskSection;