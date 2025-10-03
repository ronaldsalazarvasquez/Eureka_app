import React, { useState } from 'react';
import { Author, Project } from '../../../types';
import { EyeIcon, TrophyIcon, DownloadIcon, ShareIcon, StarIcon } from '../../../constants';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';

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

        if (totalViews > 20000 || avgRating >= 4.7) 
            return { label: '👑 Elite Mentor', color: 'from-purple-500 via-pink-500 to-red-500', glow: 'shadow-[0_0_30px_rgba(168,85,247,0.8)]', icon: '👑' };
        if (totalViews > 10000 || avgRating >= 4.5) 
            return { label: '🧠 Mastermind', color: 'from-blue-500 via-cyan-400 to-teal-400', glow: 'shadow-[0_0_25px_rgba(14,165,233,0.7)]', icon: '🧠' };
        if (totalViews > 5000 || avgRating >= 4.3) 
            return { label: '⚡ Innovador Platinum', color: 'from-yellow-400 via-orange-400 to-red-500', glow: 'shadow-[0_0_25px_rgba(251,191,36,0.8)]', icon: '⚡' };
        if (totalViews > 2000 || avgRating >= 4.0) 
            return { label: '🚀 Colaborador Avanzado', color: 'from-green-400 via-emerald-500 to-teal-600', glow: 'shadow-[0_0_25px_rgba(34,197,94,0.7)]', icon: '🚀' };
        if (totalViews > 500 || avgRating >= 3.5) 
            return { label: '🔥 Creador Activo', color: 'from-gray-500 via-slate-500 to-gray-700', glow: 'shadow-[0_0_25px_rgba(156,163,175,0.7)]', icon: '🔥' };
        return { label: '🌱 Nuevo Explorador', color: 'from-gray-300 via-slate-200 to-gray-400', glow: 'shadow-[0_0_25px_rgba(75,85,99,0.6)]', icon: '🌱' };
};

interface ProfileModalProps {
    author: Author;
    projects: Project[];
    onClose: () => void;
    onSelectProject: (project: Project) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ author, projects, onClose, onSelectProject }) => {
    const [showStats, setShowStats] = useState(false);

    const totalViews = projects.reduce((s, p) => s + p.views, 0);
    const avgRating = projects.length ? (projects.reduce((s, p) => s + p.rating, 0) / projects.length).toFixed(2) : '0.00';
    const rank = getAuthorRank(projects);
    const topProject = [...projects].sort((a, b) => b.views - a.views)[0];

    // Datos para gráficas
    const projectViewsData = [...projects].sort((a, b) => b.views - a.views).slice(0, 5).map(p => ({
        title: p.title.length > 15 ? p.title.substring(0, 15) + '...' : p.title,
        views: p.views,
        rating: p.rating
    }));

    const categoryData = Object.entries(
        projects.reduce((acc, p) => {
            acc[p.category] = (acc[p.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>)
    ).map(([name, value]) => ({ name, value }));

    const campusData = Object.entries(
        projects.reduce((acc, p) => {
            acc[p.campus] = (acc[p.campus] || 0) + 1;
            return acc;
        }, {} as Record<string, number>)
    ).map(([name, value]) => ({ name, value }));

    // Radar de habilidades (simulado basado en métricas)
    const skillsData = [
        { skill: 'Innovación', value: Math.min(100, (avgRating as any) * 20) },
        { skill: 'Popularidad', value: Math.min(100, (totalViews / 100)) },
        { skill: 'Consistencia', value: Math.min(100, projects.length * 15) },
        { skill: 'Calidad', value: Math.min(100, (avgRating as any) * 22) },
        { skill: 'Diversidad', value: Math.min(100, categoryData.length * 25) },
    ];

    const COLORS = ['#14b8a6', '#facc15', '#f97316', '#3b82f6', '#9333ea', '#ec4899'];

    const handleProjectClick = (p: Project) => {
        onClose();
        onSelectProject(p);
    };

    const handleDownloadCV = () => {
        alert('Funcionalidad de descarga en PDF próximamente 🚀');
    };

    const handleShare = () => {
        const profileUrl = `${window.location.origin}/profile/${author.name.replace(/\s+/g, '-').toLowerCase()}`;
        navigator.clipboard.writeText(profileUrl);
        alert('¡Link copiado al portapapeles! 📋');
    };

    // Logros dinámicos
    const achievements = [
        { condition: totalViews > 1000, icon: '🥇', title: '+1000 Visualizaciones', desc: 'Has alcanzado más de mil vistas', color: 'from-yellow-400 to-yellow-600' },
        { condition: projects.length >= 5, icon: '🚀', title: 'Más de 5 Proyectos', desc: 'Creador activo y consistente', color: 'from-green-400 to-green-600' },
        { condition: parseFloat(avgRating) >= 4.5, icon: '💡', title: 'Rating Promedio 4.5+', desc: 'Excelencia en calidad', color: 'from-purple-400 to-purple-600' },
        { condition: categoryData.length >= 3, icon: '🎨', title: 'Multidisciplinario', desc: 'Proyectos en múltiples áreas', color: 'from-blue-400 to-blue-600' },
        { condition: campusData.length >= 2, icon: '🌍', title: 'Multi-Campus', desc: 'Impacto en varios campus', color: 'from-pink-400 to-pink-600' },
        { condition: topProject && topProject.views > 5000, icon: '🔥', title: 'Proyecto Viral', desc: 'Más de 5000 vistas en un proyecto', color: 'from-orange-400 to-red-600' },
    ].filter(a => a.condition);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
                
                {/* Botón cerrar */}
                <button 
                    onClick={onClose} 
                    className="absolute top-6 right-6 text-gray-400 hover:text-white bg-black/20 hover:bg-black/40 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold z-20 transition backdrop-blur-sm"
                >
                    ×
                </button>

                {/* 🔥 HERO SECTION - Header Impactante */}
                <div className="relative bg-gradient-to-br from-teal-500 via-blue-600 to-purple-700 p-12 text-white overflow-hidden">
                    {/* Patrón de fondo animado */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse delay-700"></div>
                    </div>

                    <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 z-10">
                        {/* Avatar con efecto glow */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
                            <img 
                                src={author.avatarUrl} 
                                alt={author.name} 
                                className="relative w-44 h-44 rounded-full object-cover ring-4 ring-white shadow-2xl"
                            />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-5xl font-black drop-shadow-2xl">{author.name}</h1>
                            <p className="mt-3 text-xl opacity-95 font-light">{author.description}</p>
                            
                            {/* 🌟 RANGO DESTACADO con estilo medalla */}
                            <div className="mt-8 flex justify-center md:justify-start">
                                <div 
                                    className={`relative px-10 py-6 bg-gradient-to-r ${rank.color} text-white font-extrabold text-2xl rounded-2xl flex items-center gap-4 ${rank.glow} animate-pulse`}
                                >
                                    {/* Icono estilo medalla */}
                                    <span className="text-5xl drop-shadow-lg">{rank.icon}</span>
                                    
                                    {/* Texto del rango */}
                                    <div className="flex flex-col">
                                        <span className="uppercase text-sm tracking-wide opacity-80">Rango Actual</span>
                                        <span className="text-2xl md:text-3xl">{rank.label.replace(/^[^\s]+\s/, '')}</span>
                                    </div>

                                    {/* Glow animado detrás */}
                                    <div className="absolute inset-0 rounded-2xl bg-white/10 blur-2xl animate-ping"></div>
                                </div>
                            </div>

                            {/* Acciones CTA */}
                            <div className="mt-8 flex gap-4 justify-center md:justify-start flex-wrap">
                                <button 
                                    onClick={handleDownloadCV} 
                                    className="group flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl hover:bg-yellow-400 hover:text-black font-bold shadow-xl transition-all hover:scale-105"
                                >
                                    <DownloadIcon /> 
                                    <span>Descargar CV</span>
                                </button>
                                <button 
                                    onClick={handleShare} 
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 font-bold shadow-xl transition-all hover:scale-105"
                                >
                                    <ShareIcon /> 
                                    <span>Compartir Perfil</span>
                                </button>
                                <button 
                                    onClick={() => setShowStats(!showStats)} 
                                    className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 backdrop-blur-md text-white rounded-xl hover:bg-slate-700 font-bold shadow-xl transition-all hover:scale-105"
                                >
                                    {showStats ? "📉 Ocultar Stats" : "📊 Estadistica"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 📊 Dashboard de métricas principales */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                    <div className="group text-center bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                        <p className="text-5xl font-black text-teal-600 group-hover:scale-110 transition">{projects.length}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 font-semibold">Proyectos</p>
                    </div>
                    <div className="group text-center bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                        <p className="text-5xl font-black text-blue-600 group-hover:scale-110 transition">{totalViews.toLocaleString()}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 font-semibold">Visualizaciones</p>
                    </div>
                    <div className="group text-center bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                        <p className="text-5xl font-black text-yellow-500 group-hover:scale-110 transition">{avgRating}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 font-semibold">Rating Promedio</p>
                    </div>
                    <div className="group text-center bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                        <p className="text-5xl group-hover:scale-110 transition">{rank.icon}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 font-semibold">{rank.label.replace(/^[^\s]+\s/, '')}</p>
                    </div>
                </div>

                {/* 🔥 SECCIÓN COLAPSABLE: GRÁFICAS ESTADÍSTICAS */}
                <div className={`transition-all duration-700 ease-in-out overflow-hidden ${showStats ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="p-8 bg-white dark:bg-slate-900">
                        <h3 className="text-3xl font-black mb-8 text-gray-800 dark:text-white flex items-center gap-3">
                            📊 Análisis de Desempeño
                        </h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            
                            {/* Popularidad de Proyectos */}
                            <div className="lg:col-span-2 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 shadow-xl">
                                <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">Top 5 Proyectos por Vistas</h4>
                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={projectViewsData}>
                                        <XAxis dataKey="title" tick={{ fontSize: 12 }} />
                                        <YAxis />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                                        />
                                        <Bar dataKey="views" fill="#14b8a6" radius={[10, 10, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Distribución por Categorías */}
                            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 shadow-xl">
                                <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">Categorías</h4>
                                <ResponsiveContainer width="100%" height={280}>
                                    <PieChart>
                                        <Pie 
                                            data={categoryData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={90}
                                            label={(entry) => entry.name}
                                            labelLine={false}
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Radar de Habilidades */}
                            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 shadow-xl">
                                <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">Perfil de Habilidades</h4>
                                <ResponsiveContainer width="100%" height={280}>
                                    <RadarChart data={skillsData}>
                                        <PolarGrid stroke="#94a3b8" />
                                        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: '#64748b' }} />
                                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                                        <Radar name="Nivel" dataKey="value" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.6} />
                                        <Tooltip />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Distribución por Campus */}
                            <div className="lg:col-span-2 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 shadow-xl">
                                <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">Proyectos por Campus</h4>
                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={campusData} layout="vertical">
                                        <XAxis type="number" />
                                        <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                                        />
                                        <Bar dataKey="value" fill="#3b82f6" radius={[0, 10, 10, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                        </div>
                    </div>
                </div>

                {/* 🏅 Logros Desbloqueados - GRID con Glassmorphism */}
                <div className="p-8 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                    <h3 className="text-3xl font-black text-gray-800 dark:text-white mb-8 flex items-center gap-3">
                        🏅 Logros Desbloqueados
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {achievements.map((achievement, idx) => (
                            <div 
                                key={idx}
                                className={`group relative p-6 bg-gradient-to-br ${achievement.color} rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden`}
                            >
                                {/* Efecto glow */}
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition blur-xl"></div>
                                
                                <div className="relative z-10">
                                    <p className="text-6xl mb-3 group-hover:scale-110 transition">{achievement.icon}</p>
                                    <h4 className="font-black text-white text-xl mb-2">{achievement.title}</h4>
                                    <p className="text-sm text-white/90">{achievement.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🏆 Proyecto Estrella */}
                {topProject && (
                    <div className="p-8 bg-white dark:bg-slate-900">
                        <h3 className="text-3xl font-black mb-6 text-gray-800 dark:text-white flex items-center gap-3">
                            <TrophyIcon /> Proyecto Estrella
                        </h3>
                        <div 
                            onClick={() => handleProjectClick(topProject)} 
                            className="group relative p-8 bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl cursor-pointer hover:ring-4 hover:ring-yellow-400 transition-all shadow-xl hover:shadow-2xl overflow-hidden"
                        >
                            {/* Efecto de brillo */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300/30 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
                            
                            <div className="relative z-10">
                                <h4 className="text-2xl font-black text-gray-900 dark:text-white">{topProject.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{topProject.category} • {topProject.campus}</p>
                                <p className="text-sm mt-3 text-gray-700 dark:text-gray-400 line-clamp-2">{topProject.problem}</p>
                                <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                                    <span className="flex items-center gap-2 bg-white/50 dark:bg-slate-600/50 px-3 py-1 rounded-full"><EyeIcon /> {topProject.views.toLocaleString()} views</span>
                                    <span className="flex items-center gap-2 bg-white/50 dark:bg-slate-600/50 px-3 py-1 rounded-full"><StarIcon className="h-4 w-4 text-yellow-500" /> {topProject.rating.toFixed(1)}</span>
                                    <span className={`px-4 py-1 rounded-full text-white font-bold ${getProjectRank(topProject.views, topProject.rating).color}`}>
                                        {getProjectRank(topProject.views, topProject.rating).icon} {getProjectRank(topProject.views, topProject.rating).label}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 💼 Portafolio Visual - Estilo Behance */}
                <div className="p-8 bg-slate-50 dark:bg-slate-900">
                    <h3 className="text-3xl font-black mb-8 text-gray-800 dark:text-white flex items-center gap-3">
                        💼 Portafolio de Proyectos
                    </h3>
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map(p => {
                            const pRank = getProjectRank(p.views, p.rating);
                            return (
                                <div
                                    key={p.id}
                                    onClick={() => handleProjectClick(p)}
                                    className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2"
                                >
                                    {/* Imagen de preview con overlay */}
                                    <div className="relative overflow-hidden h-56 bg-gradient-to-br from-teal-400 to-blue-500">
                                        <img 
                                            src={`https://placehold.co/600x400/0f172a/14b8a6?text=${encodeURIComponent(p.title)}`} 
                                            alt={p.title} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {/* Overlay oscuro en hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                                            <button className="px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-yellow-400 transition">
                                                Ver Detalles →
                                            </button>
                                        </div>
                                        
                                        {/* Badges */}
                                        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-800 text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                                            Case Study
                                        </span>
                                        <span className={`absolute top-4 right-4 ${pRank.color} text-white text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1 shadow-lg`}>
                                            {pRank.icon} {pRank.label}
                                        </span>
                                    </div>
                                    
                                    <div className="p-6">
                                        <h4 className="text-xl font-black text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-teal-600 transition">{p.title}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{p.category} • {p.campus}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 line-clamp-2">{p.problem}</p>
                                        
                                        <div className="flex gap-4 text-xs mt-4 text-gray-600 dark:text-gray-300">
                                            <span className="flex items-center gap-1"><EyeIcon /> {p.views.toLocaleString()}</span>
                                            <span className="flex items-center gap-1"><StarIcon className="h-4 w-4 text-yellow-500" /> {p.rating.toFixed(1)}</span>
                                        </div>

                                        {/* Tecnologías */}
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {p.technologies.slice(0, 3).map((tech, idx) => (
                                                <span key={idx} className="text-xs bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 px-2.5 py-1 rounded-full font-semibold">
                                                    {tech}
                                                </span>
                                            ))}
                                            {p.technologies.length > 3 && (
                                                <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full font-semibold">
                                                    +{p.technologies.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 📅 Historial de Proyectos - GRID tipo CV */}
                <div className="p-8 bg-white dark:bg-slate-900">
                    <h3 className="text-3xl font-black mb-8 text-gray-800 dark:text-white flex items-center gap-3">
                        📅 Historial de Proyectos
                    </h3>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                        {projects.map((p, idx) => (
                            <div 
                                key={idx} 
                                className="group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-l-4 border-teal-500 hover:-translate-y-1" 
                                onClick={() => handleProjectClick(p)}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-110 transition">
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-black text-gray-900 dark:text-white group-hover:text-teal-600 transition">{p.title}</h4>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{p.submissionDate}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{p.category} • {p.campus}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">{p.problem}</p>
                                        <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-300 mt-3">
                                            <span className="flex items-center gap-1"><EyeIcon /> {p.views.toLocaleString()}</span>
                                            <span className="flex items-center gap-1"><StarIcon className="h-4 w-4 text-yellow-400" /> {p.rating.toFixed(1)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer con info adicional */}
                <div className="p-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white text-center">
                    <p className="text-sm opacity-75">
                        Perfil generado automáticamente • Comparte este CV digital en tus redes 🚀
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ProfileModal;