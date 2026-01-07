import Container from "@/components/dashboardComponents/Container";
import TaskListItem from "@/components/dashboardComponents/TaskListItem";
import { getAllCompletedTasks, getUserCompletedTasks } from "@/lib/task";
import { getUser } from "@/lib/user"

const CompletedTaskPage = async () => {
    const user = await getUser();
    let tasks = [];

    if (user?.role === 'superadmin') {
        tasks = await getAllCompletedTasks();
    } else {
        tasks = await getUserCompletedTasks(user?._id)
    }
    return (
        <Container className={'bg-white p-4 rounded-lg'}>
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-medium">Create a Task</h1>
            </div>
            <div className="mt-6">
                {tasks.length === 0 ? (
                    <p className="text-muted-foreground">No completed tasks found.</p>
                ) : (
                    <ul className="space-y-4">
                        {tasks?.map((task) => (
                            <TaskListItem key={task?._id} task={task} />
                        ))}
                    </ul>
                )}
            </div>
        </Container>
    )
}

export default CompletedTaskPage