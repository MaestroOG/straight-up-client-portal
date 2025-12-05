import Container from "@/components/dashboardComponents/Container";
import { getDiscussionById, getOpinionsByDiscussionId } from "@/lib/discussions";
import { Separator } from "@/components/ui/separator"
import DiscussionCommentBox from "@/components/superadminComponents/DiscussionCommentBox";
import parse from "html-react-parser";
import { formatTo12HourTime, timeAgo } from "@/utils/formUtils";
import Image from "next/image";
import MarkAllReadButton from "@/components/opinion-mark-read";
import { getUserFromDB } from "@/lib/user";

const DiscussionPage = async ({ params }) => {

    const { id } = await params;

    const user = await getUserFromDB();

    const discussion = await getDiscussionById(id);
    const opinions = await getOpinionsByDiscussionId(id)

    return (
        <Container className={'bg-white p-4 rounded-lg'}>
            <div className="flex flex-col gap-4">
                <h1 className="text-xl font-semibold">{discussion?.topic} - {discussion?.title}</h1>
                <p>{discussion?.subtitle}</p>
            </div>
            <Separator className={'my-6'} />
            <div className='flex items-center justify-between'>
                <h1 className='text-4xl font-bold'>Messages</h1>
                <MarkAllReadButton discussionId={id} userId={user?._id} />
            </div>

            <DiscussionCommentBox id={id} />
            <div className="mt-6">
                <ul>
                    {opinions.length === 0 && <p className="text-gray-500">No opinions yet.</p>}
                    {opinions && opinions.length > 0 && opinions.map((opinion, index) => (
                        <li key={index} className="mb-5 transition-all duration-300">
                            <div className="flex items-center gap-2">
                                <Image
                                    src={opinion?.createdBy?.profilePictureUrl || "/placeholder-avatar.svg"}
                                    width={35}
                                    height={35}
                                    alt="avatar"
                                    className="rounded-full"
                                />                <div>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-bold">
                                            {opinion?.createdBy?.name}
                                        </span>{" "}
                                        - {timeAgo(opinion?.createdAt)} at {formatTo12HourTime(opinion?.createdAt)}
                                    </p>
                                    <span className="text-detail text-xs">
                                        {opinion?.createdBy?.companyName}
                                    </span>
                                </div>
                            </div>

                            <div className="max-w-5xl text-lg ml-11 font-medium prose prose-a:text-blue-500 prose-a:underline text-content">
                                {parse(opinion?.opinion)}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Container>
    )
}

export default DiscussionPage