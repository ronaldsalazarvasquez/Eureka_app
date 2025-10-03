import React from 'react';
import { Project } from '../../../types';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
    projects: Project[];
    onSelectProject: (project: Project) => void;
    onSelectAuthor: (authorName: string) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onSelectProject, onSelectAuthor }) => {
    if (projects.length === 0) {
        return <div className="text-center py-12 text-gray-500 dark:text-gray-400">No se encontraron proyectos con los filtros seleccionados.</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
                <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onSelectProject={onSelectProject} 
                    onSelectAuthor={onSelectAuthor}
                />
            ))}
        </div>
    );
};

export default ProjectGrid;