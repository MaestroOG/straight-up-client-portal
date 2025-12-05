import CreateTaskCommentForm from '@/components/create-task-comment-form';
import Container from '@/components/dashboardComponents/Container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { getTaskById, getTaskCommentByTaskId } from '@/lib/task';
import { formatTo12HourTime, timeAgo } from '@/utils/formUtils';
import Image from 'next/image';
import EditTaskForm from '@/components/edit-task-form';
import { TaskDetailComments, TaskDetailDescription } from '@/components/dashboardComponents/TaskDetailParts';

const TaskDetailPage = async ({ params }) => {

    const { id } = await params;
    const task = await getTaskById(id);

    const taskComments = await getTaskCommentByTaskId(id)

    return (
        <Container className={'bg-white p-4 rounded-lg'}>

            <div className="p-6 space-y-6 bg-white rounded-2xl shadow-md">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-2xl font-bold">{task?.title}</h1>
                    <Badge
                        variant={
                            task?.status === "completed"
                                ? "success"
                                : task?.status === "in-progress"
                                    ? "secondary"
                                    : task?.status === 'to-do'
                                        ? 'todo'
                                        : "outline"
                        }
                        className="capitalize"
                    >
                        {task?.status}
                    </Badge>
                </div>

                {/* Description */}
                {task?.description && (
                    <TaskDetailDescription description={task?.description} />
                )}

                {/* Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                        <Label>Due Date</Label>
                        <p>{task?.dueDate ? (new Date(task.dueDate).toString() !== 'Invalid Date' ? new Date(task.dueDate).toLocaleDateString() : "Invalid date") : "No due date"}</p>
                    </div>
                    <div>
                        <Label>Created By</Label>
                        <p>{task?.createdBy?.name || "Unknown"}</p>
                    </div>
                    <div className="sm:col-span-2">
                        <Label>Assignees</Label>
                        {task?.assignees?.length > 0 ? (
                            <ul className="list-disc pl-5 mt-2">
                                {task?.assignees.map(user => (
                                    <li key={user._id}>{user.name}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Not assigned</p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-6">
                    <EditTaskForm task={task} />
                </div>
            </div>

            <div className='mt-6'>
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-medium">Task Comments</h1>
                </div>

                <CreateTaskCommentForm id={id} />

                <div className="mt-6">
                    <ul>
                        {taskComments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
                        {taskComments && taskComments.length > 0 && taskComments.map((taskComment, index) => (
                            <li key={taskComment?._id} className="mb-5 transition-all duration-300">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={taskComment?.createdBy?.profilePictureUrl || "/placeholder-avatar.svg"}
                                        width={35}
                                        height={35}
                                        alt="avatar"
                                        className="rounded-full"
                                    />                <div>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-bold">
                                                {taskComment?.createdBy?.name}
                                            </span>{" "}
                                            - {timeAgo(taskComment?.createdAt)} at {formatTo12HourTime(taskComment?.createdAt)}
                                        </p>
                                        <span className="text-detail text-xs">
                                            {taskComment?.createdBy?.companyName}
                                        </span>
                                    </div>
                                </div>


                                <TaskDetailComments commentText={taskComment?.commentText} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Container>
    )
}

export default TaskDetailPage