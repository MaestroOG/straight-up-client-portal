import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const NotificationBtn = ({ length }) => {
    return (
        <div className="relative cursor-pointer">
            <Avatar className={'flex items-center justify-center'}>
                <AvatarImage className={'max-sm:w-[24px] max-sm:h-[24px]'} src="/bell.svg" alt="Notification Bell Icon" />
                <AvatarFallback>3</AvatarFallback>
            </Avatar>
            {length > 0 && <Badge className="border-background absolute -top-1.5 left-full min-w-5 -translate-x-3.5 px-1">
                {length}
            </Badge>}
        </div>
    )
}

export default NotificationBtn