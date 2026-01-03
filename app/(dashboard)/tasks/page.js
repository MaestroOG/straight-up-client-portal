import Container from "@/components/dashboardComponents/Container"
import TaskListItem from "@/components/dashboardComponents/TaskListItem"
import { Button } from "@/components/ui/button"
import { getTasks, getUserAssignedTasks } from "@/lib/task"
import { getUser } from "@/lib/user"
import { toYMD } from "@/utils/formUtils"
import Link from "next/link"

const TasksPage = async ({ searchParams }) => {
    const user = await getUser();
    let tasks = await getUserAssignedTasks(user?._id);

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const todayYMD = toYMD(new Date(), timeZone);


    // if (user?.role === 'manager') {
    //     tasks = await getTasks();
    // }
    // const today = tasks.filter(t => new Date(t.dueDate).toDateString() === new Date().toDateString())
    // const upcoming = tasks.filter(t => {
    //     const dueDate = new Date(t.dueDate);
    //     return dueDate > new Date() && dueDate.toDateString() !== new Date().toDateString();
    // })
    // const now = new Date();
    // now.setHours(0, 0, 0, 0);

    // const overdue = tasks.filter(t => {
    //     const due = new Date(t.dueDate);
    //     due.setHours(0, 0, 0, 0); // strip time
    //     return due < now && t.status !== "completed";
    // });

    const today = tasks.filter(t => {
        return toYMD(t.dueDate, timeZone) === todayYMD;
    });

    const upcoming = tasks.filter(t => {
        const dueYMD = toYMD(t.dueDate, timeZone);
        return dueYMD > todayYMD;
    });

    const overdue = tasks.filter(t => {
        const dueYMD = toYMD(t.dueDate, timeZone);
        return dueYMD < todayYMD && t.status !== "completed";
    });

    return (
        <Container className={'bg-white p-4 rounded-lg'}>
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-medium">Tasks</h1>
                {(user?.role === 'user' || user?.role === 'superadmin') && (
                    <Link href={'/tasks/new'}>
                        <Button>
                            Create Task
                        </Button>
                    </Link>
                )}
            </div>

            <div className="space-y-6 mt-6">
                <Section title="Overdue" tasks={overdue} />
                <Section title="Today" tasks={today} />
                <Section title="Upcoming" tasks={upcoming} />
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