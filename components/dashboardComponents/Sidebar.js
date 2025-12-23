"use client";

import { CircleDollarSign, FolderCog, House, Shield, Video, MessageCircle, Receipt, Files, MessageCircleQuestionMark, Users, ClipboardCheck, SearchCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddProjectButton from "../add-project-btn";
import { useEffect, useState } from "react";

const Sidebar = () => {

    const pathname = usePathname();
    const [user, setUser] = useState(null);


    useEffect(() => {
        // Get "user" cookie value
        const cookieValue = document.cookie
            .split("; ")
            .find(row => row.startsWith("user="))
            ?.split("=")[1];

        if (cookieValue) {
            try {
                setUser(JSON.parse(decodeURIComponent(cookieValue)));
            } catch (err) {
                console.error("Invalid user cookie", err);
            }
        }
    }, []);

    const links = [
        {
            icon: <House />,
            title: "Dashboard",
            href: "/",
        },
        ...(user?.role !== "manager"
            ? [
                {
                    icon: <FolderCog />,
                    title: "Projects",
                    href: "/projects",
                },
            ]
            : []),
        {
            icon: <Video />,
            title: "How-To",
            href: '/how-to'
        },
        {
            icon: <Files />,
            title: "Resources",
            href: '/resources'
        },
        {
            icon: <MessageCircleQuestionMark />,
            title: "FAQs",
            href: '/faqs'
        },
        {
            icon: <CircleDollarSign />,
            title: "Pricing",
            href: "/pricing"
        },
        {
            icon: <MessageCircle />,
            title: "Comments",
            href: "/comments"
        },
        {
            icon: <SearchCheck />,
            title: "Audits",
            href: "/audits"
        },
        ...(user?.role === "superadmin"
            ? [
                {
                    icon: <Receipt />,
                    title: "Invoices",
                    href: "/invoices",
                },
                {
                    icon: <ClipboardCheck />,
                    title: "Tasks",
                    href: "/tasks",
                },
                {
                    icon: <Users />,
                    title: "Discussions",
                    href: "/discussions"
                },
                {
                    icon: <Shield />,
                    title: "Admin Panel",
                    href: "/admin",
                },
            ]
            : []),
    ]


    return (
        <aside className="hidden md:flex w-[85px] md:w-3xs bg-background min-h-screen md:h-screen fixed inset-y-0 left-0 flex-col items-center p-5">
            <Link href={'/'} className="relative w-60 h-32 mb-8 hidden md:flex">
                <Image
                    src="/logo.png"
                    alt="Straight Up Digital"
                    fill
                    className="object-contain"
                />
            </Link>

            {/* {user?.role !== 'manager' && <AddProjectButton href={'/projects/new-project'} className={'md:w-full'} />} */}

            <div className="sidebar-menu overflow-y-auto">
                {links.map((link, i) => {
                    const isActive =
                        pathname === link.href || pathname.startsWith(link.href + "/")
                    return (
                        <Link key={i} href={link.href} className={`${isActive ? "bg-primary text-white" : ""} sidebar-link`}>
                            <div className="flex items-center gap-2">
                                {link.icon}
                                <span className="text-lg font-bold hidden md:block">{link.title}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>


            {/* <Link href={'/profile'} className="max-w-3xs p-4 rounded-sm flex items-center gap-2 justify-center bg-red text-white fixed bottom-5 cursor-pointer">
                <Settings size={"32px"} />
                <span className="text-white text-lg font-semibold hidden md:block">Profile Setting</span>
            </Link> */}

        </aside>
    );
};

export default Sidebar;
