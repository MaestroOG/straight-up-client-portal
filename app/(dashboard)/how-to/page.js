import Container from '@/components/dashboardComponents/Container'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/user'
import { getAllHowToVideos } from '@/lib/admin'
import DeleteHowToForm from '@/components/delete-howto-form'
import EditHowToForm from '@/components/edit-howto-form'

const HowToPage = async () => {
    const user = await getUser();
    const videos = await getAllHowToVideos();
    return (
        <>
            {user?.role === 'superadmin' && <Container className={'bg-white px-2 pr-4 md:pr-0 md:px-4 py-3 flex items-center gap-2'}>
                <Link href={'/how-to/add'}><Button variant={'link'}>Add a video</Button></Link>
            </Container>}
            <Container className={'bg-white p-4 grid grid-cols-1 md:grid-cols-3 gap-4'}>
                {videos?.length === 0 && <p className='p-4 text-center'>No Videos For Now</p>}
                {videos?.length > 0 && videos?.map(video => (
                    <Card key={video?._id}>
                        <CardHeader className={'flex items-center justify-between'}>
                            <CardTitle>{video?.title}</CardTitle>
                            {user?.role === 'superadmin' && <div className='flex items-center gap-1'>
                                <DeleteHowToForm videoId={video?._id} />
                                <EditHowToForm video={video} />
                            </div>}
                        </CardHeader>
                        <CardContent>
                            <div className="w-full max-w-xl mx-auto aspect-video">
                                <iframe
                                    className="w-full h-full rounded-lg"
                                    src={video?.videoLink}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </Container>
        </>
    )
}

export default HowToPage