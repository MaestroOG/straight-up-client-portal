import React from 'react'
import Container from './dashboardComponents/Container'
import { getUser } from '@/lib/user'

const IntroText = async () => {
    const user = await getUser();
    return (
        <Container className={'bg-white p-4 rounded-lg max-sm:mt-0'}>
            <div className="max-w-2xl">
                <h1 className="font-bold text-2xl md:text-4xl">
                    Welcome to the Straight Up Digital
                    <br />
                    {user?.name} - {user?.agency || user?.companyName}
                </h1>
                <p className="mt-3">This isn’t just a portal. It’s your direct line to projects, performance, and priority support, all built to keep your agency moving forward without friction.</p>

                <ul className='list-disc marker:text-primary ml-6'>
                    <li className='mt-3 text-2xl font-medium text-heading text-indent-[-0.5em]'>Launch Projects Instantly</li>
                    <p className="mt-1">Submit client campaigns in minutes. Our team picks it up and gets you moving within hours.</p>
                    <li className='mt-3 text-2xl font-medium text-heading text-indent-[-0.5em]'>Explore Services</li>
                    <p className="mt-1">From SEO and Google Ads to web development, dive into clear service breakdowns designed to scale your agency.</p>
                    <li className='mt-3 text-2xl font-medium text-heading text-indent-[-0.5em]'>Support on Demand</li>
                    <p className="mt-1">Our live chat means no waiting around. Get answers, updates, and next steps whenever you need them.</p>
                    <li className='mt-3 text-2xl font-medium text-heading text-indent-[-0.5em]'>Fast-Tracked Delivery</li>
                    <p className="mt-1">Every new project is picked up by Operations fast. No lag, no downtime, just momentum.</p>

                </ul>

                <p className="mt-4">We can’t wait to support your agency and it’s success.</p>
            </div>
        </Container>
    )
}

export default IntroText