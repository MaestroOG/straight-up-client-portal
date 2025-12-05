'use client';

import { changeProfilePicture } from "@/action/profile.actions";
import Container from "@/components/dashboardComponents/Container"
import { Button } from "@/components/ui/button";
import { useActionState } from "react";

const ChangePicturePage = () => {
    const [state, formAction, isPending] = useActionState(changeProfilePicture, {})
    return (
        <Container className={'bg-white p-2 md:p-4'}>
            <h1 className="text-2xl md:text-4xl font-bold">Change Profile Picture</h1>
            <form className="mt-4" action={formAction}>
                <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-4"
                    type="file"
                    accept="image/png, image/jpeg"
                    id="image"
                    name="image"
                />
                <Button type='submit' className={'mt-2'} disabled={isPending}>Submit</Button>
            </form>

        </Container>
    )
}

export default ChangePicturePage