import React, { useState } from 'react';
import { User, Role } from '../../../types';
import users from '../../data/users.json';

interface LoginPageProps {
    onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Buscar usuario en users.json
        const foundUser = users.find(
            u => u.email === email && u.password === password
        );

        if (foundUser) {
            onLogin({ 
                username: foundUser.username, 
                role: foundUser.role as Role 
            });
        } else {
            setError('Credenciales inválidas. Por favor, intente de nuevo.');
        }
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 font-sans">
            {/* Formulario */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
                {/* Decoración de fondo */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>

                <div className="w-full max-w-md relative z-10">
                    {/* Header */}
                    <div className="text-center mb-10 animate-fade-in">
                        <div className="inline-block p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 drop-shadow-lg mb-2">
                            Eureka
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">Repositorio de Proyectos Innovadores</p>
                    </div>

                    {/* Formulario con glassmorphism */}
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50">
                        {error && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-l-4 border-red-500 rounded-lg text-sm animate-shake">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent block w-full pl-10 p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
                                    placeholder="nombre@dominio.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Contraseña */}
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Contraseña
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent block w-full pl-10 pr-10 p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Botón */}
                        <button 
                            type="submit" 
                            className="w-full text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800 font-semibold rounded-xl text-sm px-5 py-4 text-center transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                        >
                            Ingresar
                        </button>

                        {/* Footer login */}           
                        <div className="pt-4 space-y-2">
                            <p className="text-xs text-center text-gray-500 dark:text-gray-400 font-medium">@CodeHive</p>
                        </div>
                    </form>
                </div>
            </div>

            {/* Imagen lateral */}
            <div
                className="hidden lg:block lg:w-1/2 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: "url('https://utp.edu.pe/sites/default/files/campus/Chiclayo-.webp')" }}
            >
                {/* Overlay más ligero */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600/50 via-blue-600/40 to-purple-700/40 backdrop-blur-sm"></div>

                {/* Contenido superior */}
                <div className="relative w-full h-full flex items-start p-12">
                    <div className="text-white space-y-4 animate-fade-in-down mt-6">
                        {/* Título principal */}
                        <h2 className="text-5xl font-extrabold leading-tight drop-shadow-lg">
                            UTP: El Origen de Nuevas Ideas que Transforman el Mundo
                        </h2>
                        
                        {/* Subtítulo */}
                        <p className="text-xl opacity-90 max-w-lg">
                            Proyectos que inspiran hoy, soluciones que transforman mañana.
                        </p>

                        {/* Stats con números resaltados */}
                        <div className="flex gap-4 pt-4">
                            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg">
                                <p className="text-3xl font-extrabold text-yellow-400 drop-shadow-lg">500+</p>
                                <p className="text-sm opacity-90 text-white">Proyectos</p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg">
                                <p className="text-3xl font-extrabold text-yellow-400 drop-shadow-lg">1000+</p>
                                <p className="text-sm opacity-90 text-white">Estudiantes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;