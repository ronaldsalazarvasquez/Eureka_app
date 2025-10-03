
import React from 'react';
import { Category, Campus } from '../../../types';

interface FilterBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedCategory: Category | 'all';
    setSelectedCategory: (category: Category | 'all') => void;
    selectedCampus: Campus | 'all';
    setSelectedCampus: (campus: Campus | 'all') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedCampus,
    setSelectedCampus
}) => {
    return (
        <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full md:w-auto">
                <input
                    type="text"
                    placeholder="Buscar por título, autor o tecnología..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
                className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
                <option value="all">Todas las Categorías</option>
                {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value as Campus | 'all')}
                className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
                <option value="all">Todas las Sedes</option>
                {Object.values(Campus).map(campus => <option key={campus} value={campus}>{campus}</option>)}
            </select>
        </div>
    );
};

export default FilterBar;
