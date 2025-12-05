'use client';

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

const ResetFilterButton = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        router.push(pathname, { scroll: false });
    }
    return (
        <Button onClick={handleClick}>Reset Filters</Button>
    )
}

export default ResetFilterButton