import { getUserFromDB } from "@/lib/user";
import Image from "next/image";
import Link from "next/link";

const ProfilePicture = async () => {
    const user = await getUserFromDB();
    return (
        <div className="relative w-[200px] h-[200px] group cursor-pointer">
            {/* Profile Image */}
            <div className="relative w-[200px] h-[200px]">
                <Image
                    src={user?.profilePictureUrl || "/placeholder-avatar.svg"}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover"
                />
            </div>

            {/* Overlay on hover */}
            <Link href={'/profile/change-picture'}
                className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
            >
                <span className="text-sm font-medium">Change</span>
            </Link>
        </div>
    )
}

export default ProfilePicture