import Container from "@/components/dashboardComponents/Container"
import FaqGrid from "@/components/dashboardComponents/FaqGrid"
import { Button } from "@/components/ui/button"
import { getUser } from "@/lib/user"
import Link from "next/link"



const FAQPage = async () => {
    const user = await getUser();

    return (
        <Container className={'bg-white p-4 rounded-lg'}>
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-medium">FAQs</h1>
                    {user?.role === 'superadmin' && (
                        <Link href={'/faqs/create'}>
                            <Button variant="default">Create FAQ</Button>
                        </Link>
                    )}
                </div>
                {/* <div>
                    <Input type="text" placeholder="Search FAQs..." className={''} value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)} />
                </div> */}
            </div>
            <FaqGrid />
        </Container>
    )
}

export default FAQPage