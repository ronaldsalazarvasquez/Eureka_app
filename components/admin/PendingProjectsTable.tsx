import React from 'react';
import { Project, Status } from '../../types';
import StatusBadge from '../StatusBadge';

interface PendingProjectsTableProps {
    projects: Project[];
    onSelectProject: (project: Project) => void;
}

const PendingProjectsTable: React.FC<PendingProjectsTableProps> = ({ projects, onSelectProject }) => {
    const pendingProjects = projects
        .filter(p => p.status === Status.Uploaded || p.status === Status.InReview)
        .sort((a, b) => new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime());

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Proyectos Pendientes de Aprobación</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Título del Proyecto</th>
                            <th scope="col" className="px-6 py-3">Autor</th>
                            <th scope="col" className="px-6 py-3">Sede</th>
                            <th scope="col" className="px-6 py-3">Fecha de Envío</th>
                            <th scope="col" className="px-6 py-3">Estado</th>
                            <th scope="col" className="px-6 py-3">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingProjects.length > 0 ? pendingProjects.map(project => (
                            <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {project.title}
                                </th>
                                <td className="px-6 py-4">{project.author}</td>
                                <td className="px-6 py-4">{project.campus}</td>
                                <td className="px-6 py-4">
                                    {new Date(project.submissionDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={project.status} />
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => onSelectProject(project)}
                                        className="font-medium text-teal-600 dark:text-teal-500 hover:underline"
                                    >
                                        Revisar
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    ¡Excelente trabajo! No hay proyectos pendientes de revisión.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingProjectsTable;
