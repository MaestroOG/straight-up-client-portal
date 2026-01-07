import Container from "@/components/dashboardComponents/Container"
import { Button } from "@/components/ui/button"
import { getTasks, getUnreadCountsForTasks, getUserAssignedTasks } from "@/lib/task"
import { getUser } from "@/lib/user"
import { toYMD } from "@/utils/formUtils"
import Link from "next/link"
import TaskSection from "@/components/dashboardComponents/TaskSection"

const TasksPage = async ({ searchParams }) => {
    const user = await getUser();
    let tasks = await getUserAssignedTasks(user?._id);

    if (user?.name === 'Muneeb Ur Rehman' || user?.name === 'Nabeel Ahmad') {
        tasks = await getTasks();
    }

    const taskIds = tasks.map(t => t._id.toString());
    const unreadCounts = await getUnreadCountsForTasks(taskIds, user?._id);

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const todayYMD = toYMD(new Date(), timeZone);


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
                    <div className="flex items-center gap-2">
                        <Link href={'/tasks/new'}>
                            <Button>
                                Create Task
                            </Button>
                        </Link>
                        <Link href={'/tasks/completed'}>
                            <Button>
                                See Completed Tasks
                            </Button>
                        </Link>
                    </div>
                )}
            </div>

            <div className="space-y-6 mt-6">
                <TaskSection unreadCounts={unreadCounts} title="Overdue" tasks={overdue} />
                <TaskSection unreadCounts={unreadCounts} title="Today" tasks={today} />
                <TaskSection unreadCounts={unreadCounts} title="Upcoming" tasks={upcoming} />
            </div>
        </Container>
    )
}

export default TasksPage