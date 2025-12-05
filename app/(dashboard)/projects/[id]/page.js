import Container from '@/components/dashboardComponents/Container'
import ProjectStatusForms from '@/components/project-status-forms'
import NoteBox from '@/components/superadminComponents/NoteBox'
import { getNotesByProjectId, getProjectById } from '@/lib/projects'
import { getUser } from '@/lib/user'
import { camelToNormal, capitalizeFirst } from '@/utils/formUtils'
import ProjectNotesList from '@/components/ProjectNotesList'
import ProjectDeleteForm from '@/components/project-delete-form'
import { notFound } from 'next/navigation'
import ArchiveProjectForm from '@/components/archive-project-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export const metadata = {
    title: 'Project Details',
    description: 'View details of a specific project',
}

const ProjectDetailPage = async ({ params, searchParams }) => {
    const user = await getUser();
    const { id } = await params;
    const projectDetails = await getProjectById(id);
    const service = camelToNormal(projectDetails?.service);
    const status = capitalizeFirst(projectDetails?.status);
    const notesData = await getNotesByProjectId(id, 1, 10);
    const notes = notesData?.notes || [];

    const isUnread = user ? notes?.some(note => !(note?.readBy ?? []).includes(user._id)) : false;

    const fields = Object.entries(projectDetails?.fields || {}).filter(
        ([key]) => key !== "selectedPackage"
    );

    if (!projectDetails) {
        notFound();
    }

    return (
        <>
            <Container className={'bg-white max-sm:max-w-[430px] p-4 overflow-x-hidden'}>
                <div className='flex md:flex-row flex-col items-start md:items-end justify-between'>
                    <div>
                        <div className='flex items-center gap-2'>
                            <h1 className='text-2xl md:text-4xl font-bold whitespace-nowrap'>{projectDetails?.projectTitle}</h1>

                        </div>
                        <h3 className='mt-2'>{service} by {projectDetails?.createdBy?.companyName ?? ""}</h3>
                        {projectDetails?.byAdmin ? <p className='text-sm mt-2'>Created By Admin</p> : ''}
                        {user?.role === 'superadmin' &&
                            <div className='flex items-center gap-2 mt-2 max-sm:mb-2'>
                                <ProjectDeleteForm id={id} />
                                <Link href={`/projects/${id}/edit-package`}><Button>Edit Package</Button></Link>
                            </div>
                        }
                    </div>
                    <div className='flex flex-wrap items-start md:items-center md:flex-row flex-col gap-2 md:gap-4'>
                        <p className='text-red font-medium animate-pulse whitespace-nowrap'>• {status}</p>
                        {user?.role === 'superadmin' && <ProjectStatusForms status={status} projectId={id} />}
                        {user?.role === 'superadmin' && <ArchiveProjectForm projectId={id} />}
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
                                            } break-words`}
                                    >
                                        {displayValue}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}

                    {/* Selected Package Card */}
                    <Card className="rounded-2xl shadow-sm border border-border hover:shadow-md transition-all duration-200 bg-muted/30">
                        <CardHeader>
                            <CardTitle className="text-sm text-muted-foreground tracking-wide">
                                Selected Package
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-semibold text-foreground">
                                {projectDetails?.packageSelected || "Not provided"}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </Container>

            <Container className={'bg-white p-4 mt-6 max-sm:max-w-[430px] overflox-x-hidden'}>
                <div className='flex items-end justify-between'>
                    <h1 className='text-4xl font-bold'>Comments</h1>
                </div>
                <NoteBox id={id} user={user} />
                <div className="mt-6">
                    <ul>
                        {notes?.length > 0 ? (
                            <ProjectNotesList
                                user={user}
                                isUnread={isUnread}
                                projectId={id}
                                initialNotes={notes}
                            />) : (
                            <p className="p-4 text-center">No Comments For Now.</p>
                        )}
                    </ul>
                </div>
            </Container>
        </>
    )
}

export default ProjectDetailPage