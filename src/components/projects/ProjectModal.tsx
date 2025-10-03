import React, { useState } from 'react';
import { Project, User, Role, Status } from '@/types';
import StatusBadge from '../ui/StatusBadge';
import StarRating from '../ui/StarRating';
import Timeline from '../ui/Timeline';
import { GithubIcon, EyeIcon, ProblemIcon, CodeIcon, ImpactIcon } from '../../../constants';
import CommentForm from '../comments/CommentForm';
import CommentThread from '../comments/CommentThread';

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
    currentUser: User | null;
    onUpdateStatus: (projectId: number, newStatus: Status) => void;
    onRateProject: (projectId: number, rating: number) => void;
    onSelectAuthor: (authorName: string) => void;
    onAddNewComment: (projectId: number, text: string, parentId?: string) => void;
}

const AdminActions: React.FC<{ project: Project, onUpdateStatus: (projectId: number, newStatus: Status) => void }> = ({ project, onUpdateStatus }) => {
    const [selectedStatus, setSelectedStatus] = useState<Status>(project.status);

    const handleStatusChange = () => {
        if (selectedStatus !== project.status) {
            onUpdateStatus(project.id, selectedStatus);
        }
    };

    return (
        <div className="mt-6 p-4 border-2 border-dashed border-blue-400 dark:border-blue-600 bg-blue-50 dark:bg-gray-700/50 rounded-lg">
            <h4 className="text-lg font-bold mb-3 text-blue-800 dark:text-blue-300">Acciones de Administrador</h4>
            <div className="flex items-center gap-4">
                <div className="flex-grow">
                     <label htmlFor="status-select" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Cambiar estado del proyecto:</label>
                    <select
                        id="status-select"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value as Status)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {Object.values(Status).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <button
                    onClick={handleStatusChange}
                    disabled={selectedStatus === project.status}
                    className="self-end px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Guardar
                </button>
            </div>
        </div>
    );
};


const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, currentUser, onUpdateStatus, onRateProject, onSelectAuthor, onAddNewComment }) => {
    
    const [hasRated, setHasRated] = useState(false);

    const handleRate = (rating: number) => {
        if (!hasRated) {
            onRateProject(project.id, rating);
            setHasRated(true);
        }
    };

    const handleAuthorClick = () => {
        onClose(); // Cierra el modal de proyecto
        onSelectAuthor(project.author); // Abre el modal de perfil
    };

    const handleCommentSubmit = (text: string) => {
        onAddNewComment(project.id, text);
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col relative"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                <div className="p-8">
                    <header className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                             <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase">{project.category} - {project.campus}</p>
                             <StatusBadge status={project.status} />
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{project.title}</h2>
                        <p className="text-md text-gray-600 dark:text-gray-400 mt-1">
                            por <button onClick={handleAuthorClick} className="font-semibold text-teal-600 dark:text-teal-400 hover:underline">{project.author}</button>
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-sm text-gray-700 dark:text-gray-300">
                        <div className={`flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg ${hasRated ? 'opacity-70' : ''}`}>
                            <StarRating 
                                rating={project.rating} 
                                count={project.ratingsCount} 
                                isLarge={true} 
                                onRate={!hasRated ? handleRate : undefined} 
                            />
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                            <EyeIcon /> 
                            <div>
                                <span className="font-bold text-lg">{project.views.toLocaleString()}</span>
                                <span className="text-xs block">Visualizaciones</span>
                            </div>
                        </div>
                         <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors">
                            <GithubIcon />
                            <span className="font-semibold">Ver en GitHub</span>
                        </a>
                    </div>
                     {hasRated && <p className="text-center text-sm text-green-600 dark:text-green-400 mb-4 -mt-4">¡Gracias por tu calificación!</p>}

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-bold mb-2 flex items-center text-gray-800 dark:text-gray-100"><ProblemIcon />Problemática</h4>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.problem}</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-2 flex items-center text-gray-800 dark:text-gray-100"><ImpactIcon />Impacto Esperado</h4>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.expectedImpact}</p>
                        </div>
                         <div>
                            <h4 className="text-lg font-bold mb-2 flex items-center text-gray-800 dark:text-gray-100"><CodeIcon />Tecnologías Utilizadas</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map(tech => (
                                    <span key={tech} className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-teal-900 dark:text-teal-300">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">Descripción del Proyecto</h4>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.description}</p>
                        </div>
                         <div>
                            <h4 className="text-lg font-bold mb-3 text-gray-800 dark:text-gray-100">Línea de Tiempo de Aprobación</h4>
                            <Timeline history={project.approvalHistory} />
                        </div>

                         <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Comentarios y Discusión</h3>
                            <div className="space-y-4">
                               <CommentForm onSubmit={handleCommentSubmit} />
                               <CommentThread 
                                 comments={project.comments || []}
                                 onAddNewComment={onAddNewComment}
                                 projectId={project.id}
                                 currentUser={currentUser}
                               />
                            </div>
                        </div>
                        
                        {currentUser?.role === Role.Admin && (
                           <AdminActions project={project} onUpdateStatus={onUpdateStatus} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;