import React from 'react';
import { Project } from '../types';
import StatusBadge from './StatusBadge';
import StarRating from './StarRating';
import { EyeIcon, TrophyIcon } from '../constants';

interface ProjectCardProps {
    project: Project;
    onSelectProject: (project: Project) => void;
    onSelectAuthor: (authorName: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelectProject, onSelectAuthor }) => {
    
    const isOutstanding = project.rating > 4.8 && project.views > 2000;

    const handleAuthorClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelectAuthor(project.author);
    };
    
    return (
        <div
            onClick={() => onSelectProject(project)}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden flex flex-col h-full relative ${isOutstanding ? 'ring-2 ring-amber-400' : ''}`}
        >
            {isOutstanding && (
                <div className="absolute top-2 right-2 bg-amber-400 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10">
                    <TrophyIcon />
                    <span>Destacado</span>
                </div>
            )}
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase">{project.category}</span>
                    <StatusBadge status={project.status} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <button onClick={handleAuthorClick} className="hover:underline font-semibold text-teal-600 dark:text-teal-400">
                        {project.author}
                    </button>
                     - <span className="font-medium">{project.campus}</span>
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {project.problem}
                </p>
                 <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                     <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <StarRating rating={project.rating} count={project.ratingsCount} />
                        <div className="flex items-center gap-2">
                            <EyeIcon />
                            <span>{project.views.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;