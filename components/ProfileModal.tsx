import React from 'react';
import { Author, Project } from '../types';
import { EyeIcon, TrophyIcon, DownloadIcon, ShareIcon, StarIcon } from '../constants';

// 🔥 Helpers para rangos
const getProjectRank = (views: number, rating: number) => {
    if (views > 5000 || rating >= 4.5) return { label: 'Diamond', color: 'bg-purple-600', icon: '💎' };
    if (views > 2500 || rating >= 4) return { label: 'Platinum', color: 'bg-blue-600', icon: '🏆' };
    if (views > 1000 || rating >= 3.5) return { label: 'Gold', color: 'bg-yellow-500', icon: '🥇' };
    if (views > 500 || rating >= 3) return { label: 'Silver', color: 'bg-gray-400', icon: '🥈' };
    if (views > 100 || rating >= 2.5) return { label: 'Bronze', color: 'bg-amber-700', icon: '🥉' };
    return { label: 'Basic', color: 'bg-gray-300', icon: '📌' };
};

const getAuthorRank = (projects: Project[]) => {
    const totalViews = projects.reduce((s, p) => s + p.views, 0);
    const avgRating = projects.length ? (projects.reduce((s, p) => s + p.rating, 0) / projects.length) : 0;

    if (totalViews > 20000 || avgRating >= 4.7) return { label: 'Elite Mentor', color: 'bg-purple-700', icon: '👑' };
    if (totalViews > 10000 || avgRating >= 4.5) return { label: 'Mastermind', color: 'bg-blue-700', icon: '🧠' };
    if (totalViews > 5000 || avgRating >= 4.3) return { label: 'Innovador Platinum', color: 'bg-yellow-600', icon: '⚡' };
    if (totalViews > 2000 || avgRating >= 4.0) return { label: 'Colaborador Avanzado', color: 'bg-green-600', icon: '🚀' };
    if (totalViews > 500 || avgRating >= 3.5) return { label: 'Creador Activo', color: 'bg-gray-500', icon: '🔥' };
    return { label: 'Nuevo Explorador', color: 'bg-gray-400', icon: '🌱' };
};

interface ProfileModalProps {
    author: Author;
    projects: Project[];
    onClose: () => void;
    onSelectProject: (project: Project) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ author, projects, onClose, onSelectProject }) => {
    const totalViews = projects.reduce((s, p) => s + p.views, 0);
    const avgRating = projects.length ? (projects.reduce((s, p) => s + p.rating, 0) / projects.length).toFixed(2) : '0.00';
    const rank = getAuthorRank(projects);
    const topProject = [...projects].sort((a, b) => b.views - a.views)[0];

    const handleProjectClick = (p: Project) => {
        onClose();
        onSelectProject(p);
    };

    const handleDownloadCV = () => {
        alert('Funcionalidad de descarga en PDF próximamente 🚀');
        // Aquí integrarás tu herramienta PDF Generator
    };

    const handleShare = () => {
        const profileUrl = `${window.location.origin}/profile/${author.name.replace(/\s+/g, '-').toLowerCase()}`;
        navigator.clipboard.writeText(profileUrl);
        alert('¡Link copiado al portapapeles! 📋');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
                
                {/* Botón cerrar */}
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white text-3xl font-bold z-10">×</button>

                {/* Header - Perfil */}
                <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-8 text-white">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <img src={author.avatarUrl} alt={author.name} className="w-36 h-36 rounded-full object-cover ring-4 ring-white shadow-lg" />
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-4xl font-extrabold">{author.name}</h2>
                            <p className="mt-2 text-lg opacity-90">{author.description}</p>
                            <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                                <span className={`px-4 py-2 rounded-full text-white font-semibold ${rank.color} flex items-center gap-2`}>
                                    <span>{rank.icon}</span> {rank.label}
                                </span>
                            </div>
                            {/* Acciones */}
                            <div className="mt-6 flex gap-3 justify-center md:justify-start">
                                <button onClick={handleDownloadCV} className="flex items-center gap-2 px-4 py-2 bg-white text-teal-600 rounded-lg hover:bg-gray-100 font-semibold shadow-md">
                                    <DownloadIcon /> Descargar CV
                                </button>
                                <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 font-semibold shadow-md">
                                    <ShareIcon /> Compartir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard de métricas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-slate-50 dark:bg-slate-800">
                    <div className="text-center bg-white dark:bg-slate-700 rounded-xl p-6 shadow">
                        <p className="text-4xl font-bold text-teal-600">{projects.length}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Proyectos</p>
                    </div>
                    <div className="text-center bg-white dark:bg-slate-700 rounded-xl p-6 shadow">
                        <p className="text-4xl font-bold text-blue-600">{totalViews.toLocaleString()}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Visualizaciones</p>
                    </div>
                    <div className="text-center bg-white dark:bg-slate-700 rounded-xl p-6 shadow">
                        <p className="text-4xl font-bold text-yellow-500">{avgRating}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Rating Promedio</p>
                    </div>
                    <div className="text-center bg-white dark:bg-slate-700 rounded-xl p-6 shadow">
                        <p className="text-2xl font-bold">{rank.icon}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{rank.label}</p>
                    </div>
                </div>

                {/* Proyecto Estrella */}
                {topProject && (
                    <div className="p-8 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                            <TrophyIcon /> Proyecto Estrella
                        </h3>
                        <div onClick={() => handleProjectClick(topProject)} className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-700 rounded-xl cursor-pointer hover:ring-4 hover:ring-teal-400 transition shadow-lg">
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white">{topProject.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{topProject.category} • {topProject.campus}</p>
                            <p className="text-sm mt-2 text-gray-700 dark:text-gray-400 line-clamp-2">{topProject.problem}</p>
                            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                                <span className="flex items-center gap-1"><EyeIcon /> {topProject.views.toLocaleString()} views</span>
                                <span className="flex items-center gap-1"><StarIcon className="h-4 w-4 text-yellow-500" /> {topProject.rating.toFixed(1)}</span>
                                <span className={`px-3 py-1 rounded-full text-white font-semibold ${getProjectRank(topProject.views, topProject.rating).color}`}>
                                    {getProjectRank(topProject.views, topProject.rating).icon} {getProjectRank(topProject.views, topProject.rating).label}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Lista de Proyectos */}
                <div className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Todos los Proyectos</h3>
                    <div className="space-y-4">
                        {projects.map(p => {
                            const pRank = getProjectRank(p.views, p.rating);
                            return (
                                <div key={p.id} onClick={() => handleProjectClick(p)} className="p-5 bg-white dark:bg-slate-800 rounded-xl hover:ring-2 hover:ring-teal-400 cursor-pointer shadow transition">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg text-gray-900 dark:text-white">{p.title}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{p.category} • {p.campus}</p>
                                            <div className="flex gap-4 mt-2 text-xs text-gray-600 dark:text-gray-300">
                                                <span className="flex items-center gap-1"><EyeIcon /> {p.views.toLocaleString()}</span>
                                                <span className="flex items-center gap-1"><StarIcon className="h-4 w-4 text-yellow-500" /> {p.rating.toFixed(1)}</span>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${pRank.color} flex items-center gap-1`}>
                                            <span>{pRank.icon}</span> {pRank.label}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;