import Container from '@/components/dashboardComponents/Container'
import DeleteDiscussionForm from '@/components/delete-discussion-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getAllDiscussions, getUnreadCountsForUser } from '@/lib/discussions'
import { getUser } from '@/lib/user'
import { timeAgo, truncateToSixWords } from '@/utils/formUtils'
import Link from 'next/link'

const DiscussionPage = async () => {
    const user = await getUser();
    const discussions = await getAllDiscussions();
    const unreadCounts = await getUnreadCountsForUser(user?._id);

    if (user?.role === 'user') {
        return (
            <div className='h-screen w-full flex items-center justify-center'>
                <p className='text-center p-6'>Access Denied ❌</p>
            </div>
        )
    }
    return (
        <Container className={'bg-white p-4 rounded-lg'}>
            <div className="flex items-center justify-between">
                <h1 className="text-xl max-sm:text-lg font-semibold">Topics and Discussions</h1>
                <Link href={'/discussions/create-discussion'}>
                    <Button>
                        Create New Discussion
                    </Button>
                </Link>
            </div>
            <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {!discussions || discussions.length === 0 && (
                    <p className='text-center col-span-full'>No discussions found.</p>
                )}
                {discussions && discussions?.map((discussion) => {
                    const count = unreadCounts[discussion._id.toString()] || 0
                    return (
                        <div key={discussion?._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <div className='flex items-center justify-between'>
                                <Badge variant={"secondary"} className={'mb-2'}>{discussion?.topic}</Badge>
                                {user?.role === 'superadmin' && <DeleteDiscussionForm discussionId={discussion?._id} />}
                            </div>
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                                {discussion.title}
                                {count > 0 && (
                                    <span className="text-sm bg-destructive text-white px-2 py-0.5 rounded-full animate-pulse">
                                        {count}
                                    </span>
                                )}
                            </h2>
                            <p className="mb-3 font-medium">Created by: {discussion?.createdBy.name} • {timeAgo(discussion?.createdAt)}</p>
                            <p className="mb-3 font-medium text-destructive animate-pulse">{truncateToSixWords(discussion?.subtitle)}</p>
                            <Link href={`/discussions/${discussion?._id}`}><Button variant={"default"}>View Discussion →</Button></Link>
                        </div>
                    )
                })}
            </div>
        </Container>
    )
}

export default DiscussionPage