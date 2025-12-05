import Container from '@/components/dashboardComponents/Container'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { getRunningProjectsThisMonth } from '@/lib/projects';
import { getUser } from '@/lib/user';
import { getAllRunningProjectsThisMonth, getTotalExpenditureForUser, getTotalExpenditure } from '@/lib/admin';

const ExpenditurePage = async () => {

    const user = await getUser();

    let runningProjectsThisMonth;
    let totalSpent;

    if (user?.role === 'user') {
        runningProjectsThisMonth = await getRunningProjectsThisMonth();
        totalSpent = await getTotalExpenditureForUser(user?._id);
    } else {
        runningProjectsThisMonth = await getAllRunningProjectsThisMonth();
        totalSpent = await getTotalExpenditure();
    }


    return (
        <Container className={'bg-white p-4 rounded-lg'}>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-semibold">Total {user?.role === 'superadmin' ? 'Revenue' : 'Spending'}</h1>

                <div className="flex items-center gap-2">

                    {/* Project Filter */}
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="All Projects" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Projects</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Total {user?.role === 'superadmin' ? 'Revenue' : 'Spent'}</p>
                        <p className="text-2xl font-semibold">$ {totalSpent.toLocaleString()}.00</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Total Running Projects</p>
                        <p className="text-2xl font-semibold">{runningProjectsThisMonth}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Month</p>
                        <p className="text-lg font-medium">
                            {new Date().toLocaleString('default', { month: 'long' })}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}

export default ExpenditurePage