import React from 'react';
import { Project, Status, Campus, Category } from '../../types';
import { ClipboardListIcon, ClockIcon, BuildingOfficeIcon, ChartPieIcon, ChartBarIcon } from '../../constants';

interface DashboardStatsProps {
    projects: Project[];
}

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number; description: string; }> = ({ icon, title, value, description }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center gap-4">
        <div className="bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{description}</p>
        </div>
    </div>
);


const DonutChart: React.FC<{ data: { label: string, value: number, color: string }[], title: string, icon: React.ReactNode }> = ({ data, title, icon }) => {
    const total = data.reduce((acc, item) => acc + item.value, 0);
    if (total === 0) {
        return (
             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md col-span-1 md:col-span-1">
                <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    {icon} {title}
                </h3>
                <div className="flex items-center justify-center h-48 text-sm text-gray-500 dark:text-gray-400">
                    No hay datos disponibles.
                </div>
            </div>
        );
    }

    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md col-span-1 md:col-span-1">
            <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                {icon} {title}
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-40 h-40">
                    <svg className="w-full h-full" viewBox="0 0 120 120">
                        <circle
                            className="text-gray-200 dark:text-gray-700"
                            strokeWidth="16"
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx="60"
                            cy="60"
                        />
                        {data.map((item, index) => {
                            const dash = (item.value / total) * circumference;
                            const slice = (
                                <circle
                                    key={index}
                                    strokeWidth="16"
                                    strokeDasharray={`${dash} ${circumference}`}
                                    strokeDashoffset={-offset}
                                    strokeLinecap="round"
                                    className={item.color}
                                    stroke="currentColor"
                                    fill="transparent"
                                    r={radius}
                                    cx="60"
                                    cy="60"
                                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                                />
                            );
                            offset += dash;
                            return slice;
                        })}
                         <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="fill-current text-gray-800 dark:text-white text-2xl font-bold">
                            {total}
                        </text>
                    </svg>
                </div>
                <div className="w-full md:w-1/2">
                    <ul className="space-y-2 text-sm">
                        {data.map((item, index) => (
                            <li key={index} className="flex items-center justify-between">
                                <span className="flex items-center">
                                    <span className={`w-3 h-3 rounded-full mr-2 ${item.color.replace('text-', 'bg-')}`}></span>
                                    {item.label}
                                </span>
                                <span className="font-medium">{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};


const DashboardStats: React.FC<DashboardStatsProps> = ({ projects }) => {
    const totalProjects = projects.length;
    const pendingProjects = projects.filter(p => p.status === Status.InReview || p.status === Status.Uploaded).length;
    
    const calculateAvgApprovalTime = () => {
        const approvedProjects = projects.filter(p => p.status === Status.Approved && p.approvalHistory.length >= 2);
        if (approvedProjects.length === 0) return 0;
        
        const totalDays = approvedProjects.reduce((acc, p) => {
            const submissionDate = new Date(p.approvalHistory[0].date);
            const approvalDateEntry = p.approvalHistory.find(h => h.status === Status.Approved);
            if(approvalDateEntry) {
                 const approvalDate = new Date(approvalDateEntry.date);
                 const diffTime = Math.abs(approvalDate.getTime() - submissionDate.getTime());
                 const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                 return acc + diffDays;
            }
            return acc;
        }, 0);
        
        return Math.round(totalDays / approvedProjects.length);
    };

    const avgApprovalTime = calculateAvgApprovalTime();
    
    const campusColors = ['text-teal-500', 'text-blue-500', 'text-indigo-500', 'text-purple-500', 'text-pink-500'];
    const projectsByCampus = Object.values(Campus).map((campus, i) => ({
        label: campus.replace('Sede ', ''),
        value: projects.filter(p => p.campus === campus).length,
        color: campusColors[i % campusColors.length]
    })).filter(d => d.value > 0);

    const categoryColors = ['text-sky-500', 'text-emerald-500', 'text-amber-500'];
     const projectsByCategory = Object.values(Category).map((category, i) => ({
        label: category.replace(' General', ''),
        value: projects.filter(p => p.category === category).length,
        color: categoryColors[i % categoryColors.length]
    })).filter(d => d.value > 0);

    const submissionsByMonth = [...projects]
        .sort((a,b) => new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime())
        .reduce((acc, p) => {
        const date = new Date(p.submissionDate);
        const month = date.toLocaleString('es-ES', { month: 'short' });
        const year = date.getFullYear().toString().slice(-2);
        const key = `${month.charAt(0).toUpperCase() + month.slice(1)}-${year}`;
        
        if (!acc[key]) {
            acc[key] = { label: key, value: 0 };
        }
        acc[key].value += 1;
        return acc;
    }, {} as Record<string, { label: string; value: number }>);
    
    const monthlyData = Object.values(submissionsByMonth);
    const maxMonthlySubmissions = Math.max(...monthlyData.map(d => d.value), 1);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard 
                icon={<ClipboardListIcon />} 
                title="Total de Proyectos" 
                value={totalProjects} 
                description="Proyectos en el repositorio" 
            />
            <StatCard 
                icon={<ClockIcon />} 
                title="Pendientes de Revisión" 
                value={pendingProjects} 
                description="Proyectos esperando aprobación" 
            />
             <StatCard 
                icon={<ClockIcon />} 
                title="Aprobación Promedio" 
                value={`${avgApprovalTime} días`}
                description="Tiempo desde envío a aprobación" 
            />
             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center text-center col-span-1 md:col-span-2 xl:col-span-1 text-gray-500 dark:text-gray-400">
                 <p>Análisis detallado del rendimiento y la participación de la comunidad académica.</p>
            </div>
            
            <DonutChart data={projectsByCampus} title="Proyectos por Sede" icon={<BuildingOfficeIcon />} />
            <DonutChart data={projectsByCategory} title="Distribución por Categoría" icon={<ChartPieIcon />} />

             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
                <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <ChartBarIcon /> Envíos de Proyectos por Mes
                </h3>
                {monthlyData.length > 0 ? (
                    <div className="flex justify-around items-end h-64 gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {monthlyData.map(item => (
                            <div key={item.label} className="flex flex-col items-center justify-end h-full w-full">
                                <div 
                                    className="w-3/4 bg-teal-500 rounded-t-md hover:bg-teal-400 transition-colors group relative"
                                    style={{ height: `${(item.value / maxMonthlySubmissions) * 100}%` }}
                                >
                                    <span className="absolute bottom-full mb-1 w-max px-2 py-1 text-xs text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                        {item.value} {item.value === 1 ? 'proyecto' : 'proyectos'}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.label}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-10">No hay suficientes datos para mostrar la tendencia mensual.</p>
                )}
            </div>
        </div>
    );
};

export default DashboardStats;