import Container from '@/components/dashboardComponents/Container';
import { getAuditById, getAuditCommentsbyAuditId } from '@/lib/audits';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { camelToNormal, formatTo12HourTime, timeAgo } from '@/utils/formUtils';
import DeleteAuditForm from '@/components/delete-audit-form';
import { getUser } from '@/lib/user';
import AuditCommentBox from '@/components/superadminComponents/AuditCommentBox';
import Image from 'next/image';
import parse from 'html-react-parser';

const AuditDetailPage = async ({ params }) => {
    const user = await getUser();
    const { id } = await params;

    const audit = await getAuditById(id);

    const fields = Object.entries(audit?.fields || {}).filter(
        ([key]) => key !== "selectedPackage"
    );

    const auditComments = await getAuditCommentsbyAuditId(id);
    return (
        <>
            <Container className={'bg-white max-sm:max-w-[430px] p-4 overflow-x-hidden'}>
                <div className='flex md:flex-row flex-col items-start md:items-end justify-between'>
                    <div>
                        <div className='flex items-center justify-between gap-4'>
                            <h1 className='text-2xl md:text-4xl font-bold whitespace-nowrap'>{audit?.auditTitle}</h1>
                            {user?.role === 'superadmin' && (
                                <DeleteAuditForm user={user} id={id} />
                            )}
                        </div>
                        <h3 className='mt-2'>by {audit?.createdBy?.companyName ?? ""}</h3>
                        {audit?.byAdmin ? <p className='text-sm mt-2'>Created By Admin</p> : ''}

                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full">
                    {/* Render all fields except selectedPackage */}
                    {fields.map(([key, value]) => {
                        const displayValue =
                            value && value.toString().trim() !== "" ? camelToNormal(value) : "Not provided";

                        return (
                            <Card
                                key={key}
                                className="rounded-2xl shadow-sm border border-border hover:shadow-md transition-all duration-200"
                            >
                                <CardHeader>
                                    <CardTitle className="text-sm text-muted-foreground tracking-wide">
                                        {camelToNormal(key)}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p
                                        className={`text-lg font-medium ${displayValue === "Not provided" ? "text-muted-foreground italic" : "text-foreground"
                                            } wrap-break-word`}
                                    >
                                        {displayValue}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <AuditCommentBox id={id} />

                <div className="mt-6">
                    <ul>
                        {auditComments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
                        {auditComments && auditComments.length > 0 && auditComments.map((comment, index) => (
                            <li key={index} className="mb-5 transition-all duration-300">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={comment?.createdBy?.profilePictureUrl || "/placeholder-avatar.svg"}
                                        width={35}
                                        height={35}
                                        alt="avatar"
                                        className="rounded-full"
                                    />                <div>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-bold">
                                                {comment?.createdBy?.name}
                                            </span>{" "}
                                            - {timeAgo(comment?.createdAt)} at {formatTo12HourTime(comment?.createdAt)}
                                        </p>
                                        <span className="text-detail text-xs">
                                            {comment?.createdBy?.companyName}
                                        </span>
                                    </div>
                                </div>

                                <div className="max-w-5xl text-lg ml-11 font-medium prose prose-a:text-blue-500 prose-a:underline text-content">
                                    {parse(comment?.auditComment)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </>
    )
}

export default AuditDetailPage