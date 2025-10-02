import React from 'react';
import { PlusIcon, UserIcon, LogoutIcon } from '../constants';
import { User } from '../types';

interface HeaderProps {
    currentUser: User;
    onLogout: () => void;
    onOpenSubmitModal: () => void;
    onOpenProfile: () => void;  // 👈 nuevo prop
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout, onOpenSubmitModal, onOpenProfile }) => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                        Eureka
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tu Repositorio de Proyectos Académicos</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={onOpenSubmitModal}
                        className="hidden sm:flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                        <PlusIcon />
                        Subir Proyecto
                    </button>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={onOpenProfile}
                            className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                                {currentUser.avatarUrl ? (
                                    <img src={currentUser.avatarUrl} alt="Perfil" className="w-full h-full object-cover" />
                                ) : (
                                    <UserIcon />
                                )}
                            </div>
                            <div className="text-right hidden md:block pr-2">
                                <p className="font-semibold text-sm text-gray-800 dark:text-white">{currentUser.username}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser.role}</p>
                            </div>
                        </button>
                        <button 
                            onClick={onLogout} 
                            title="Cerrar Sesión" 
                            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        >
                            <LogoutIcon />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;