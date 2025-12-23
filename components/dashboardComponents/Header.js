'use client';

import { CircleDollarSign, FolderCog, House, Shield, Video, MessageCircle, Receipt, Files, Menu, X, Settings, MessageCircleQuestionMark, Users, ClipboardCheck, SearchCheck } from "lucide-react";
import Image from 'next/image'
import React, { useActionState, useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button'
import { signOutUser } from '@/action/user';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NotificationBtn from './NotificationBtn';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { countUnreadNotifications } from '@/utils/notificationUtils';
import Linkify from 'linkify-react';
import Loader from '../Loader';
import { useCountry } from "@/hooks/useCountry";

const Header = ({ userFromDB, pfpLink }) => {
    const pathname = usePathname();
    const [notifications, setNotifications] = useState(null);


    const [state, formAction, isPending] = useActionState(signOutUser, "")

    const { countryCode, loading, error } = useCountry();

    const [count, setCount] = useState(0)
    const getNotifications = async () => {
        const res = await fetch("/api/get-notifications");
        const data = await res.json();
        console.log(data)
        setNotifications(data);
    }

    const handleOpen = async () => {
        if (count > 0) {
            await fetch('/api/notifications/mark-read', { method: 'POST' });
            setCount(0)
        }
    }

    useEffect(() => {
        const fetchUnread = async () => {
            const res = await fetch("/api/notifications/unread");
            const data = await res.json();
            console.log(data)
            const unreadNotifs = countUnreadNotifications(data.notifications, userFromDB?._id);
            setCount(unreadNotifs);
        };
        fetchUnread();
    }, [userFromDB]);



    useEffect(() => {
        getNotifications();
    }, []);


    const links = [
        {
            icon: <House />,
            title: "Dashboard",
            href: "/",
        },
        ...(userFromDB?.role !== "manager"
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
        // {
        //     icon: <CircleDollarSign />,
        //     title: "Pricing",
        //     href: "/pricing"
        // },
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
        ...(userFromDB?.role === "superadmin"
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
    ];


    return (
        <header className='bg-primary w-full px-8 py-0 md:py-9 flex items-center justify-between md:justify-end gap-4 sticky top-0 z-50'>

            <Link href={'/'} className='md:hidden'><Image src='/straight-up.png' alt="Straight Up Digital logo" width={135} height={37} priority /></Link>
            <div className='flex items-center gap-4'>
                <div className="flex items-center gap-4">
                    {userFromDB?.credit > 0 && <div className="max-sm:hidden flex items-center gap-2 p-2 border border-primary">
                        <CircleDollarSign className="text-foreground" />
                        <p className="text-foreground">AUD {userFromDB?.credit}.00</p>
                    </div>}
                    <div className="flex items-center">
                        {loading && <Loader size="h-4 w-4" />}
                        {!loading && !error && countryCode && <Image
                            src={countryCode.trim() === 'ZA' ? '/south-africa.svg' : "/australia.svg"}
                            width={32}
                            height={32}
                            alt="country_flag"
                            className="cursor-pointer hidden md:block"
                        />
                        }

                    </div>
                    <Popover onOpenChange={handleOpen}>
                        <PopoverTrigger> <NotificationBtn length={count} /></PopoverTrigger>
                        <PopoverContent className={'w-[400px] h-96 overflow-y-auto'}>
                            <div className='flex items-center justify-between'>
                                <h4 className='font-semibold'>Notifications</h4>
                            </div>
                            <div className='mt-2'>
                                {notifications?.length === 0 && <div className='p-4 text-center'>No Notifications For Now.</div>}
                                {notifications?.length > 0 && notifications?.map(notification => (
                                    <div key={notification?._id} className='mt-2'>
                                        <Alert variant="default" key={notification?._id}>
                                            <AlertTitle>{notification?.title}</AlertTitle>
                                            <AlertDescription>
                                                <Linkify options={{ target: '_blank', className: 'text-blue-500 underline' }}>{notification?.description}</Linkify>
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                ))}
                            </div>

                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex items-center">
                    <Popover>
                        <PopoverTrigger>
                            <div className='relative w-10 h-10'>
                                {userFromDB && <Image src={pfpLink || '/placeholder-avatar.svg'} fill className='rounded-full cursor-pointer object-cover' priority alt='avatar' />}
                            </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Link href={'/profile'}><Button variant={'outline'} className={'mb-2 w-full'}>Profile</Button></Link>
                            <form action={formAction}>
                                <Button disabled={isPending} type="submit" className={'w-full flex items-center justify-center gap-2'}>
                                    {isPending && <Loader size='h-4 w-4' />}
                                    <span>Sign Out</span>
                                </Button>
                            </form>
                            {state && <span>{state}</span>}
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center md:hidden">
                    <Drawer direction="left" >
                        <DrawerTrigger className='md:hidden'><Menu className='text-white' size={23}></Menu></DrawerTrigger>
                        <DrawerContent className={'overflow-y-auto max-h-screen'}>
                            <DrawerHeader>
                                <DrawerClose>
                                    <X className='text-primary' />
                                </DrawerClose>
                                <div className='mt-8'>
                                    {/* {userFromDB?.role !== 'manager' && <DrawerClose asChild>
                                        <Link href={'/projects/new-project'} className={`bg-white flex items-center gap-2.5 p-2 rounded-full cursor-pointer`}>
                                            <Image src={'/addIcon.png'} width={34} height={34} alt="Add_Icon" />
                                            <p className="font-medium text-sm">Create new project</p>
                                        </Link>
                                    </DrawerClose>} */}

                                    <div className="sidebar-menu">
                                        {links.map((link, i) => (
                                            <DrawerClose asChild key={i}>
                                                <Link href={link.href} className={`${pathname === link.href ? 'bg-primary text-white' : 'text-primary'} sidebar-link`}>
                                                    <div className="flex items-center gap-2">
                                                        {link.icon}
                                                        <span className="text-lg font-bold">{link.title}</span>
                                                    </div>
                                                </Link>
                                            </DrawerClose>
                                        ))}
                                    </div>
                                </div>
                            </DrawerHeader>
                            <DrawerFooter className={'w-full'}>
                                <DrawerClose asChild>
                                    <Link href="/profile">
                                        <Button className="flex items-center gap-2 w-full">
                                            <Settings size={32} />
                                            <span className="text-white text-lg font-semibold">
                                                Profile Setting
                                            </span>
                                        </Button>
                                    </Link>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </header>
    )
}

export default Header