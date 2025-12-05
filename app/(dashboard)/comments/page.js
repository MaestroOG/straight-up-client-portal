import Container from "@/components/dashboardComponents/Container"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { getUser } from "@/lib/user"
import { getAllComments, getAllCommentsOnUserProjects, getAllUnreadComments } from "@/lib/admin"
import { formatReadableDate, formatTo12HourTime, isoDateToLocal12HourTime, timeAgo } from "@/utils/formUtils";
import CommentFilterForm from "@/components/comment-filter-form";

const CommentsPage = async ({ searchParams }) => {

    const user = await getUser();

    const { filter } = await searchParams
    if (!user) {
        return (
            <Container className="bg-white p-2 md:p-4">
                <p className="text-red-500">User not found.</p>
            </Container>
        );
    }

    let data;

    if (user.role !== 'superadmin') {
        data = await getAllCommentsOnUserProjects(user._id);
    } else {
        if (filter === 'unread') {
            data = await getAllUnreadComments(user._id); // returns array of unread notes
        } else {
            data = await getAllComments(1, 10); // returns paginated notes object
        }
    }

    const notes = filter === 'unread' || user.role !== 'superadmin' ? data : data?.notes || [];
    return (
        <Container className="bg-white p-2 md:p-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl md:text-4xl font-bold">Project Comments</h1>
                {user?.role === "superadmin" && <CommentFilterForm />}
            </div>

            {/* Comments Section */}
            <div className="flex flex-col gap-4 mt-4 w-full">
                {notes?.length === 0 ? (
                    <p className="text-gray-500 text-center p-6">No comments found.</p>
                ) : (
                    <div className="flex flex-col gap-4 w-full">
                        {notes.map((note, index) => {
                            const isUnread = !(note?.readBy ?? []).includes(user?._id);
                            return (
                                <Link
                                    key={note._id || index}
                                    href={`/projects/${note.projectId?._id}`}
                                    className="block w-full"
                                >
                                    <Alert
                                        variant="default"
                                        className="relative w-full rounded-xl border border-border hover:shadow-md transition-all duration-200"
                                    >
                                        {isUnread && (
                                            <span className="absolute top-4 right-4 h-3 w-3 rounded-full bg-red" />
                                        )}
                                        <AlertTitle className="font-semibold text-base md:text-lg break-words pr-8">
                                            {note?.createdBy?.name} –{" "}
                                            {formatReadableDate(note?.createdAt)} –{" "}
                                            {timeAgo(note?.createdAt)} at{" "}
                                            {formatTo12HourTime(note?.createdAt)}
                                        </AlertTitle>
                                        <AlertDescription className="mt-1 break-words">
                                            <span className="font-bold">
                                                on {note.projectId?.projectTitle}
                                            </span>
                                        </AlertDescription>
                                    </Alert>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </Container>

    )
}

export default CommentsPage