'use client';

import ProjectCard from './ProjectCard'
import Container from './Container'
import { useRouter, useSearchParams } from 'next/navigation';
import ResetFilterButton from './ResetFilterButton';

const ProjectCardsGrid = ({ filter, archivedCount, runningProjectsThisMonth, pendingProjectsThisMonth, completedProjectsThisMonth, projects }) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleFilter = (filter) => {
        const params = new URLSearchParams(searchParams);
        params.set('filter', filter);
        router.push(`?${params.toString()}`, { scroll: false });
    }

    return (
        <>
            <Container className="flex justify-between items-center px-9 md:px-2 mb-4">
                <h2 className="text-lg font-semibold">Projects Overview</h2>
                <ResetFilterButton />
            </Container>
            <Container className={'grid items-stretch place-items-center grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 px-9 md:px-0 max-sm:bg-white max-sm:mt-0 max-sm:py-7'}>
                <ProjectCard className={filter === 'all' && 'border border-primary'} onClick={() => handleFilter('all')} success={true} title="Total Projects" desc={`All Projects`} number={projects?.length} />
                <ProjectCard className={filter === 'running' && 'border border-primary'} onClick={() => handleFilter('running')} yellow={true} title={"Running Project"} desc={`${filter === 'running' ? 'All ' : ''}In-Progress Projects`} number={runningProjectsThisMonth} />
                <ProjectCard className={filter === 'pending' && 'border border-primary'} onClick={() => handleFilter('pending')} title={"Pending"} desc={`${filter === 'pending' ? 'All ' : ''}Pending Projects`} number={pendingProjectsThisMonth} />
                <ProjectCard className={filter === 'finished' && 'border border-primary'} success={true} onClick={() => handleFilter('finished')} title={"Finished Projects"} desc={`${filter === 'finished' ? 'All ' : ''}Finished Projects`} number={completedProjectsThisMonth} />
                <ProjectCard className={filter === 'archived' && 'border border-primary'} title={'Archived Projects'} onClick={() => handleFilter('archived')} yellow={true} number={archivedCount} desc={`${filter === 'archived' ? 'All ' : ''}Archived Projects`} />
            </Container>
        </>
    )
}

export default ProjectCardsGrid