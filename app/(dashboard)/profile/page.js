import { getUserFromDB } from '@/lib/user'
import Container from '@/components/dashboardComponents/Container';
import { Mail, Phone, Globe, MapPin, Link as LinkIcon, Pencil } from "lucide-react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProfilePicture from '@/components/dashboardComponents/ProfilePicture';


const ProfilePage = async () => {
    const userDetail = await getUserFromDB();

    console.log(userDetail)

    return (
        <Container className="bg-white p-6 max-w-4xl mx-auto space-y-10">
            {/* Header */}
            <ProfilePicture />
            <header className="border-b pb-6">
                <h1 className="text-3xl font-bold">
                    {userDetail?.name}{" "}
                    <span className="text-lg font-light text-gray-600">
                        ({userDetail?.position})
                    </span>
                </h1>
                <p className="text-gray-500">{userDetail?.companyName}</p>
            </header>

            {/* Contact Info */}
            <section className="space-y-2">
                <h2 className="text-xl font-semibold border-b pb-1">Contact Information</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2"><Mail size={16} /> {userDetail?.email} <Link href={'/change-email'}><Pencil size={16} /></Link></li>
                    <li className="flex items-center gap-2"><Phone size={16} /> {userDetail?.phoneNum}</li>
                    <li className="flex items-center gap-2"><Mail size={16} /> {userDetail?.contactEmail}</li>
                    <li className="flex items-center gap-2"><Globe size={16} /> <a href={userDetail?.companyWebsite} target="_blank" className="text-blue-600 underline">Website</a></li>
                    <li className="flex items-center gap-2"><MapPin size={16} /> {userDetail?.businessAddress}</li>
                </ul>
            </section>

            {/* Company Details */}
            <section>
                <h2 className="text-xl font-semibold border-b pb-1">Company Details</h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div><dt className="font-semibold">ABN</dt><dd>{userDetail?.abn}</dd></div>
                    <div><dt className="font-semibold">Years in Business</dt><dd>{userDetail?.yearsInBiz}</dd></div>
                    <div><dt className="font-semibold">Active Clients</dt><dd>{userDetail?.numOfActiveClients}</dd></div>
                    <div><dt className="font-semibold">Structure</dt><dd>{userDetail?.companyStructure}</dd></div>
                    <div><dt className="font-semibold">Primary Services</dt><dd>{userDetail?.primaryServices}</dd></div>
                    <div><dt className="font-semibold">Industries</dt><dd>{userDetail?.industriesWorkWith}</dd></div>
                    <div><dt className="font-semibold">Regions</dt><dd>{userDetail?.regionsServe}</dd></div>
                    <div><dt className="font-semibold">Service Model</dt><dd>{userDetail?.serviceModel}</dd></div>
                    <div><dt className="font-semibold">Monthly Projects</dt><dd>{userDetail?.monthlyProjectVolume}</dd></div>
                    <div><dt className="font-semibold">Using White Label Provider</dt><dd>{userDetail?.isUsingWhiteLabelProvider}</dd></div>
                </dl>
            </section>

            {/* Business Challenge */}
            <section>
                <h2 className="text-xl font-semibold border-b pb-1">Business Challenge</h2>
                <p className="text-gray-700 mt-2">{userDetail?.challengeDetail}</p>
            </section>

            {/* Social Media */}
            <section>
                <h2 className="text-xl font-semibold border-b pb-1">Social Media</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                    {userDetail?.socialMediaLinks?.map((link, i) => (
                        <a key={i} href={link} target="_blank" className="px-3 py-1 bg-blue-100 rounded-full hover:bg-blue-200 flex items-center gap-1 text-sm">
                            <LinkIcon size={14} /> {link.split("//")[1]}
                        </a>
                    ))}
                </div>
            </section>

            {/* Actions */}
            <section>
                <h2 className="text-xl font-semibold border-b pb-1">Profile Actions</h2>
                <div className="flex flex-col md:flex-row flex-wrap gap-2 mt-4">
                    <Link href="/change-email"><Button>Change Email</Button></Link>
                    <Link href="/change-password"><Button>Change Password</Button></Link>
                    <Link href="/enable-two-factor"><Button>Enable Two-Factor Authentication</Button></Link>
                </div>
            </section>
        </Container>

    )
}

export default ProfilePage