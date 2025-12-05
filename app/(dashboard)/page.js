import Container from "@/components/dashboardComponents/Container"
import { Button } from "@/components/ui/button"
import IntroText from "@/components/IntroText"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { getUser } from "@/lib/user"
import { getAllArchivedProjects, getAllArchivedProjectsCount, getAllCompletedProjects, getAllPendingProjects, getAllRunningProjects, getAllUserFinishedProjects, getAllUserPendingProjects, getAllUserProjects, getAllUserRunningProjects, getArchivedProjectsCount, getCompletedProjectsThisMonth, getEveryProject, getEveryUserProjects, getPendingProjectsThisMonth, getRunningProjectsThisMonth } from "@/lib/projects"
import { Suspense } from "react"
import HomePageDialog from "@/components/dashboardComponents/HomePageDialog"
import { getLatestUnreadNotification } from "@/lib/notifications"
import { getAllCompletedProjectsThisMonth, getAllManagerRelatedProjects, getAllPendingProjectsThisMonth, getAllProjects, getAllRunningProjectsThisMonth } from "@/lib/admin"
import ProjectCardsGrid from "@/components/dashboardComponents/ProjectCardsGrid"
import MainProjectCard from "@/components/dashboardComponents/MainProjectCard"



export const metadata = {
  title: "Straight Up Digital Client Portal"
}

const HomePage = async ({ searchParams }) => {

  const user = await getUser();

  const { filter } = await searchParams;

  let projects;
  let completedProjectsThisMonth;
  let pendingProjectsThisMonth;
  let runningProjectsThisMonth;
  let archivedProjects;

  if (user?.role === 'user') {
    if (filter === 'all') {
      projects = await getEveryUserProjects(user?._id);
    } else if (filter === 'finished') {
      projects = await getAllUserFinishedProjects(user?._id);
    } else if (filter === 'running') {
      projects = await getAllUserRunningProjects(user?._id);
    } else if (filter === 'pending') {
      projects = await getAllUserPendingProjects(user?._id);
    } else if (filter === 'archived') {
      projects = await getAllArchivedUserProjects(user?._id);
    } else {
      projects = await getAllUserProjects(user?._id);
    }
    completedProjectsThisMonth = await getCompletedProjectsThisMonth();
    pendingProjectsThisMonth = await getPendingProjectsThisMonth();
    runningProjectsThisMonth = await getRunningProjectsThisMonth();
    archivedProjects = await getArchivedProjectsCount();
  } else if (user?.role === 'manager') {
    projects = await getAllManagerRelatedProjects();
    completedProjectsThisMonth = await getAllCompletedProjectsThisMonth();
    pendingProjectsThisMonth = await getAllPendingProjectsThisMonth();
    runningProjectsThisMonth = await getAllRunningProjectsThisMonth();
    archivedProjects = await getAllArchivedProjectsCount();
  } else {
    if (filter === 'finished') {
      projects = await getAllCompletedProjects();
    } else if (filter === 'running') {
      projects = await getAllRunningProjects();
    } else if (filter === 'all') {
      projects = await getEveryProject();
    } else if (filter === 'pending') {
      projects = await getAllPendingProjects();
    } else if (filter === 'archived') {
      projects = await getAllArchivedProjects();
    } else {
      projects = await getAllProjects();
    }
    completedProjectsThisMonth = await getAllCompletedProjectsThisMonth();
    pendingProjectsThisMonth = await getAllPendingProjectsThisMonth();
    runningProjectsThisMonth = await getAllRunningProjectsThisMonth();
    archivedProjects = await getAllArchivedProjectsCount();
  }
  const latestNotification = await getLatestUnreadNotification();


  return (
    <>

      <div className="px-11 py-7 md:hidden max-sm:bg-white">

        <div className="bg-white w-full h-12 rounded-xl flex items-center">
          <Input placeholder="Search..." className={'placeholder:text-placeholder h-full rounded-tr-none rounded-br-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none'} />
          <Button className={'h-full px-4 py-3 rounded-tl-none rounded-bl-none'}><Search className="text-white" width={25} height={25} /></Button>
        </div>

      </div>

      <IntroText />

      <ProjectCardsGrid filter={filter} archivedCount={archivedProjects} runningProjectsThisMonth={runningProjectsThisMonth} projects={projects} completedProjectsThisMonth={completedProjectsThisMonth} pendingProjectsThisMonth={pendingProjectsThisMonth} />

      <Container className="bg-white p-4 rounded-lg">
        <div className="flex items-center md:justify-between gap-4">
          <h1 className="text-xl font-medium">Your Projects</h1>
          <div className="flex items-center gap-2">
            <Link href={'/expenditure'}><Button>See {user?.role === 'superadmin' ? 'Generated Revenue' : 'Monthly Spending'}</Button></Link>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch md:grid-cols-4 mt-5 gap-4">


          {projects?.length === 0 && (
            <div className="p-6">
              {user?.role !== 'manager' && <span>No Projects For Now!</span>}
              {user?.role === 'manager' && <span>Wait for your first project to be assigned!</span>}
            </div>
          )}
          <Suspense fallback={<p>Loading...</p>}>
            {projects?.map(project => (
              <MainProjectCard key={project?._id} project={project} />
            ))}
          </Suspense>

        </div>
      </Container>

      {latestNotification && <HomePageDialog title={latestNotification?.title} description={latestNotification?.description} />}
    </>
  )
}

export default HomePage