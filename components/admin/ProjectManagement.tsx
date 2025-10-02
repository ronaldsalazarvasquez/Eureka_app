import React, { useState, useEffect, useCallback } from 'react';
import { Project, Category, Campus } from '../../types';
import FilterBar from '../FilterBar';
import ProjectGrid from '../ProjectGrid';
import PendingProjectsTable from './PendingProjectsTable';

interface ProjectManagementProps {
    projects: Project[];
    onSelectProject: (project: Project) => void;
    onSelectAuthor: (authorName: string) => void;
}

type ManagementView = 'pending' | 'all';

const ProjectManagement: React.FC<ProjectManagementProps> = ({ projects, onSelectProject, onSelectAuthor }) => {
    const [view, setView] = useState<ManagementView>('pending');
    
    const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
    const [selectedCampus, setSelectedCampus] = useState<Campus | 'all'>('all');

    const filterProjects = useCallback(() => {
        let tempProjects = [...projects];

        if (searchTerm) {
            tempProjects = tempProjects.filter(project =>
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (selectedCategory !== 'all') {
            tempProjects = tempProjects.filter(project => project.category === selectedCategory);
        }

        if (selectedCampus !== 'all') {
            tempProjects = tempProjects.filter(project => project.campus === selectedCampus);
        }
        
        setFilteredProjects(tempProjects.sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()));
    }, [projects, searchTerm, selectedCategory, selectedCampus]);

    useEffect(() => {
        filterProjects();
    }, [filterProjects]);
    
    return (
        <div>
            <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        type="button"
                        onClick={() => setView('pending')}
                        className={`px-6 py-2 text-sm font-medium ${
                            view === 'pending'
                                ? 'bg-teal-500 text-white z-10 ring-2 ring-teal-500'
                                : 'bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                        } border border-gray-200 dark:border-gray-600 rounded-l-lg transition-colors`}
                    >
                        Pendientes de Revisión
                    </button>
                    <button
                        type="button"
                        onClick={() => setView('all')}
                        className={`px-6 py-2 text-sm font-medium ${
                            view === 'all'
                                ? 'bg-teal-500 text-white z-10 ring-2 ring-teal-500'
                                : 'bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                        } border border-gray-200 dark:border-gray-600 rounded-r-md transition-colors`}
                    >
                        Todos los Proyectos
                    </button>
                </div>
            </div>

            {view === 'pending' && <PendingProjectsTable projects={projects} onSelectProject={onSelectProject} />}
            
            {view === 'all' && (
                <div>
                    <FilterBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedCampus={selectedCampus}
                        setSelectedCampus={setSelectedCampus}
                    />
                    <ProjectGrid projects={filteredProjects} onSelectProject={onSelectProject} onSelectAuthor={onSelectAuthor} />
                </div>
            )}
        </div>
    );
};

export default ProjectManagement;