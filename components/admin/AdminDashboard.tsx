import React, { useState } from 'react';
import { Project } from '../../types';
import DashboardStats from './DashboardStats';
import ProjectManagement from './ProjectManagement';

interface AdminDashboardProps {
    projects: Project[];
    onSelectProject: (project: Project) => void;
    onSelectAuthor: (authorName: string) => void;
}

type AdminTab = 'stats' | 'projects';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ projects, onSelectProject, onSelectAuthor }) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('stats');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'stats':
                return <DashboardStats projects={projects} />;
            case 'projects':
                return <ProjectManagement projects={projects} onSelectProject={onSelectProject} onSelectAuthor={onSelectAuthor} />;
            default:
                return null;
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Panel de Administrador</h2>
                <p className="text-md text-gray-500 dark:text-gray-400">Bienvenido. Aquí puedes analizar y gestionar los proyectos del repositorio.</p>
            </div>

            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2">
                        <button
                            onClick={() => setActiveTab('stats')}
                            className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${
                                activeTab === 'stats'
                                ? 'text-teal-600 border-teal-600 dark:text-teal-500 dark:border-teal-500'
                                : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                            }`}
                        >
                           Dashboard de Estadísticas
                        </button>
                    </li>
                    <li className="mr-2">
                         <button
                            onClick={() => setActiveTab('projects')}
                            className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${
                                activeTab === 'projects'
                                ? 'text-teal-600 border-teal-600 dark:text-teal-500 dark:border-teal-500'
                                : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                            }`}
                        >
                           Gestión de Proyectos
                        </button>
                    </li>
                </ul>
            </div>
            
            <div>
                {renderTabContent()}
            </div>
            
        </main>
    );
};

export default AdminDashboard;