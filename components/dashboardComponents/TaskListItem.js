'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import DeleteTaskForm from "../delete-task-form"

export default function TaskListItem({ task }) {
  const { _id, title, assignees, status, dueDate } = task

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border-b hover:bg-muted/50 transition cursor-pointer">
      <div className="flex flex-col gap-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">
          {assignees?.length > 0 ? assignees.length + ' assignee(s)' : "No assignees"} • Due {new Date(dueDate).toLocaleDateString()}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <Badge variant={
          status === "completed" ? "success" :
            status === "in-progress" ? "secondary" :
              status === 'to-do' ? 'todo' :
                "outline"
        }>
          {status}
        </Badge>
        <Link href={`/tasks/${_id}`}><Button variant="outline" size="sm">View</Button></Link>
        <DeleteTaskForm id={_id} />
      </div>
    </div>
  )
}
