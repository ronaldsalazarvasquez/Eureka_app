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
        <div className="mt-6 p-6 border border-teal-200 dark:border-teal-800 bg-teal-50/30 dark:bg-teal-900/10 rounded-xl">
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span className="text-xl">🛡️</span> Acciones de Administrador
            </h4>
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                <div className="flex-grow w-full">
                    <label htmlFor="status-select" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Cambiar estado del proyecto:
                    </label>
                    <select
                        id="status-select"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value as Status)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    >
                        {Object.values(Status).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <button
                    onClick={handleStatusChange}
                    disabled={selectedStatus === project.status}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Guardar Cambios
                </button>
            </div>
        </div>
    );
};

const ProjectModal: React.FC<ProjectModalProps> = ({ 
    project, 
    onClose, 
    currentUser, 
    onUpdateStatus, 
    onRateProject, 
    onSelectAuthor, 
    onAddNewComment 
}) => {
    const [hasRated, setHasRated] = useState(false);

    const handleRate = (rating: number) => {
        if (!hasRated) {
            onRateProject(project.id, rating);
            setHasRated(true);
        }
    };

    const handleAuthorClick = () => {
        onClose();
        onSelectAuthor(project.author);
    };

    const handleCommentSubmit = (text: string) => {
        onAddNewComment(project.id, text);
    };

    const getYouTubeEmbedUrl = (url?: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
    };

    //
    const videoUrl = "https://www.youtube.com/embed/ooypKDXfEuA"; 

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-y-auto"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto relative my-8"
                onClick={e => e.stopPropagation()}
            >
                {/* Botón Cerrar */}
                <button
                    onClick={onClose}
                    className="sticky top-4 right-4 float-right text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white bg-white/90 dark:bg-gray-800/90 hover:bg-gray-100 dark:hover:bg-gray-700 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center transition-all z-20 shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* 🎬 HERO SECTION - Video + Header */}
                <div className="relative bg-gradient-to-r from-teal-600 to-blue-600 p-8 md:p-12 text-white rounded-t-2xl">
                    <div className="relative z-10">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    <span className="text-xs font-semibold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                                        {project.category}
                                    </span>
                                    <span className="text-xs font-semibold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                                        {project.campus}
                                    </span>
                                    <StatusBadge status={project.status} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                                    {project.title}
                                </h2>
                                <p className="text-base opacity-90">
                                    por{' '}
                                    <button 
                                        onClick={handleAuthorClick} 
                                        className="font-semibold underline underline-offset-2 hover:text-teal-200 transition"
                                    >
                                        {project.author}
                                    </button>
                                </p>
                            </div>
                        </div>

                        {/* 🎬 Video Embed */}
                        {videoUrl && (
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl mb-6">
                                <iframe
                                    src={videoUrl}
                                    title="Project Video"
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}

                        {/* Métricas rápidas */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold">{project.rating.toFixed(1)}</p>
                                <p className="text-xs opacity-80 mt-1">Rating</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold">{project.ratingsCount}</p>
                                <p className="text-xs opacity-80 mt-1">Calificaciones</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold">{project.views.toLocaleString()}</p>
                                <p className="text-xs opacity-80 mt-1">Vistas</p>
                            </div>
                            <a 
                                href={project.githubUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="bg-gray-900 hover:bg-gray-800 rounded-lg p-4 text-center transition-all flex flex-col items-center justify-center gap-1 shadow-lg hover:shadow-xl"
                            >
                                <GithubIcon />
                                <p className="text-xs font-semibold">Ver Código</p>
                            </a>
                        </div>
                    </div>
                </div>

                {/* 📊 CONTENIDO PRINCIPAL */}
                <div className="p-6 md:p-10 space-y-6">

                    {/* ⭐ Rating Interactivo */}
                    <div className={`bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 ${hasRated ? 'opacity-60' : ''}`}>
                        <h4 className="text-base font-semibold mb-3 text-gray-800 dark:text-white flex items-center gap-2">
                            <span className="text-xl">⭐</span> Califica este proyecto
                        </h4>
                        <StarRating 
                            rating={project.rating} 
                            count={project.ratingsCount} 
                            isLarge={true} 
                            onRate={!hasRated ? handleRate : undefined} 
                        />
                        {hasRated && (
                            <p className="text-sm text-teal-600 dark:text-teal-400 mt-3 font-medium">
                                ✅ ¡Gracias por tu calificación!
                            </p>
                        )}
                    </div>

                    {/* 🔥 Secciones de Contenido */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* Problemática */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                            <h4 className="text-base font-semibold mb-3 flex items-center text-gray-800 dark:text-white gap-2">
                                <ProblemIcon /> Problemática
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {project.problem}
                            </p>
                        </div>

                        {/* Impacto Esperado */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                            <h4 className="text-base font-semibold mb-3 flex items-center text-gray-800 dark:text-white gap-2">
                                <ImpactIcon /> Impacto Esperado
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {project.expectedImpact}
                            </p>
                        </div>

                    </div>

                    {/* Tecnologías */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                        <h4 className="text-base font-semibold mb-4 flex items-center text-gray-800 dark:text-white gap-2">
                            <CodeIcon /> Tecnologías Utilizadas
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map(tech => (
                                <span 
                                    key={tech} 
                                    className="bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full dark:bg-teal-900/30 dark:text-teal-300 border border-teal-200 dark:border-teal-800"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                        <h4 className="text-base font-semibold mb-3 text-gray-800 dark:text-white">
                            📝 Descripción del Proyecto
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                        <h4 className="text-base font-semibold mb-4 text-gray-800 dark:text-white">
                            📅 Línea de Tiempo de Aprobación
                        </h4>
                        <Timeline history={project.approvalHistory} />
                    </div>

                    {/* Comentarios */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                            💬 Comentarios y Discusión
                        </h3>
                        <div className="space-y-6">
                            <CommentForm onSubmit={handleCommentSubmit} />
                            <CommentThread 
                                comments={project.comments || []}
                                onAddNewComment={onAddNewComment}
                                projectId={project.id}
                                currentUser={currentUser}
                            />
                        </div>
                    </div>

                    {/* Admin Actions */}
                    {currentUser?.role === Role.Admin && (
                        <AdminActions project={project} onUpdateStatus={onUpdateStatus} />
                    )}

                </div>
            </div>
        </div>
    );
};

export default ProjectModal;