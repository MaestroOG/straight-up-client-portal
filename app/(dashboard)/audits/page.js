import Container from '@/components/dashboardComponents/Container'
import { Button } from '@/components/ui/button'
import { getAllAudits, getAllUserAudits } from '@/lib/audits'
import { getUser } from '@/lib/user'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { camelToNormal, capitalizeFirst } from "@/utils/formUtils"
import { Badge } from "@/components/ui/badge"

const AuditPage = async () => {
    const user = await getUser();
    let audits = [];

    if (user?.role === 'superadmin') {
        audits = await getAllAudits();
    } else {
        audits = await getAllUserAudits(user?._id);
    }

    return (
        <Container className={'bg-white p-4 rounded-lg'}>
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-xl font-medium">Your Audits</h1>
                <Link href={'/audits/new'}>
                    <Button>Create Audit</Button>
                </Link>
            </div>

            <div className='mt-4'>
                {audits.length === 0 ? (
                    <p>No audits found.</p>
                ) : (
                    <ul className="space-y-2">
                        {audits.map((audit) => (
                            <Card key={audit?._id} className="flex flex-col justify-between max-w-sm border-gray-200 shadow-sm">
                                <CardHeader>
                                    <Badge variant="secondary" className="mb-2 w-fit">
                                        {camelToNormal(audit?.service)}
                                    </Badge>
                                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white break-all">
                                        {audit?.auditTitle}
                                    </CardTitle>
                                    <CardDescription className="font-medium">
                                        By: {audit?.createdBy?.companyName ?? "Unknown"}
                                    </CardDescription>

                                </CardHeader>

                                <CardFooter className="mt-auto">
                                    <Link href={`/audits/${audit?._id}`} className="w-full">
                                        <Button variant="default" className="w-full">
                                            Audit Details
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </ul>
                )}
            </div>
        </Container>
    )
}

export default AuditPage