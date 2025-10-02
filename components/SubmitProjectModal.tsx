import React, { useState } from 'react';
import { Category, Campus } from '../types';
import { NewProjectData } from '../App';

// FIX: Define missing props interface for SubmitProjectModal
interface SubmitProjectModalProps {
    onClose: () => void;
    onSubmit: (data: NewProjectData) => void;
}

const SubmitProjectModal: React.FC<SubmitProjectModalProps> = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        campus: Campus.Lima,
        category: Category.Technology,
        problem: '',
        technologies: '',
        expectedImpact: '',
        description: '',
        githubUrl: '',
    });
    
    const [errors, setErrors] = useState<Partial<typeof formData>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = () => {
        const newErrors: Partial<typeof formData> = {};
        if (!formData.title.trim()) newErrors.title = 'El título es requerido.';
        if (!formData.author.trim()) newErrors.author = 'El autor es requerido.';
        if (!formData.problem.trim()) newErrors.problem = 'La problemática es requerida.';
        if (!formData.expectedImpact.trim()) newErrors.expectedImpact = 'El impacto esperado es requerido.';
        if (!formData.description.trim()) newErrors.description = 'La descripción es requerida.';
        
        if (formData.githubUrl && !/^https:\/\/github.com\/.+\/.+$/.test(formData.githubUrl)) {
            newErrors.githubUrl = 'Por favor, introduce una URL de GitHub válida.';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const finalData: NewProjectData = {
                ...formData,
                technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
            };
            onSubmit(finalData);
        }
    };

    const renderInput = (name: keyof typeof formData, label: string, required = false, type = 'text', placeholder = '') => (
        <div>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className={`bg-gray-50 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            />
            {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
        </div>
    );

    const renderTextarea = (name: keyof typeof formData, label: string, required = false, rows = 4) => (
        <div>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                id={name}
                name={name}
                rows={rows}
                value={formData[name]}
                onChange={handleChange}
                className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500`}
            ></textarea>
            {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
        </div>
    );

    const renderSelect = (name: keyof typeof formData, label: string, options: object, required = false) => (
         <div>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
            >
                {Object.values(options).map(option => <option key={option} value={option}>{option}</option>)}
            </select>
        </div>
    )

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col relative" onClick={e => e.stopPropagation()}>
                <header className="flex justify-between items-center p-6 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Sube tu Proyecto</h3>
                    <button onClick={onClose} className="text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm p-1.5">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </header>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {renderInput('title', 'Título del Proyecto', true)}
                    {renderInput('author', 'Autor(es)', true)}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {renderSelect('category', 'Categoría', Category, true)}
                        {renderSelect('campus', 'Sede / Campus', Campus, true)}
                    </div>
                    {renderTextarea('problem', 'Problemática que soluciona', true, 3)}
                    {renderTextarea('expectedImpact', 'Impacto Esperado', true, 3)}
                    {renderTextarea('description', 'Descripción Completa del Proyecto', true)}
                    <div>
                        {renderInput('technologies', 'Tecnologías (separadas por coma)', false, 'text', 'Ej: React, Node.js, Python')}
                    </div>
                    <div>
                        {renderInput('githubUrl', 'URL del Repositorio en GitHub', false, 'url', 'https://github.com/usuario/repo')}
                    </div>
                    <footer className="flex items-center justify-end pt-4 space-x-2 border-t border-gray-200 dark:border-gray-600">
                        <button type="button" onClick={onClose} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                            Cancelar
                        </button>
                        <button type="submit" className="text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
                            Enviar Proyecto
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default SubmitProjectModal;