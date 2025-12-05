import Container from "@/components/dashboardComponents/Container"
import TaskListItem from "@/components/dashboardComponents/TaskListItem"
import { Button } from "@/components/ui/button"
import { getTasks, getUserAssignedTasks } from "@/lib/task"
import { getUser } from "@/lib/user"
import Link from "next/link"

const TasksPage = async () => {
    const user = await getUser();
    let tasks = await getUserAssignedTasks(user?._id);
    // if (user?.role === 'manager') {
    //     tasks = await getTasks();
    // }
    const today = tasks.filter(t => new Date(t.dueDate).toDateString() === new Date().toDateString())
    const upcoming = tasks.filter(t => {
        const dueDate = new Date(t.dueDate);
        return dueDate > new Date() && dueDate.toDateString() !== new Date().toDateString();
    })
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const overdue = tasks.filter(t => {
        const due = new Date(t.dueDate);
        due.setHours(0, 0, 0, 0); // strip time
        return due < now && t.status !== "completed";
    });

    return (
        <Container className={'bg-white p-4 rounded-lg'}>
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-medium">Tasks</h1>
                <Link href={'/tasks/new'}>
                    <Button>
                        Create Task
                    </Button>
                </Link>
            </div>

            <div className="space-y-6 mt-6">
                <Section title="Today" tasks={today} />
                <Section title="Upcoming" tasks={upcoming} />
                <Section title="Overdue" tasks={overdue} />
            </div>
        </Container>
    )
}

export default TasksPage


function Section({ title, tasks }) {
    return (
        <div className="space-y-2">
            <h2 className="text-xl font-bold">{title}</h2>
            {tasks.length > 0 ? (
                <div className="space-y-3">
                    {tasks.map(task => <TaskListItem key={task.id} task={task} />)}
                </div>
            ) : (
                <p className="text-muted-foreground text-sm">No {title.toLowerCase()} tasks</p>
            )}
        </div>
    )
}