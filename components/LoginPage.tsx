import React, { useState } from 'react';
import { User, Role } from '../types';

interface LoginPageProps {
    onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Mock authentication
        if (email === 'admin@eureka.com' && password === 'admin123') {
            onLogin({ username: 'Admin User', role: Role.Admin });
        } else if (email === 'student@eureka.com' && password === 'student123') {
            onLogin({ username: 'John Doe', role: Role.Student });
        } else {
            setError('Credenciales inválidas. Por favor, intente de nuevo.');
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50 dark:bg-gray-900 font-sans">
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                         <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                            Eureka
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Bienvenido al Repositorio de Proyectos</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                         {error && <div className="p-3 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border border-red-300 dark:border-red-700 rounded-md text-sm">{error}</div>}
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="nombre@dominio.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" aria-label="Password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                        </div>
                         <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:focus:ring-blue-800 transition-colors">
                            Ingresar
                        </button>
                        <p className="text-xs text-center text-gray-500 dark:text-gray-400 pt-4">
                            Use <code className="font-mono bg-gray-200 dark:bg-gray-600 p-1 rounded">admin@eureka.com</code> / <code className="font-mono bg-gray-200 dark:bg-gray-600 p-1 rounded">admin123</code> para Admin, o <code className="font-mono bg-gray-200 dark:bg-gray-600 p-1 rounded">student@eureka.com</code> / <code className="font-mono bg-gray-200 dark:bg-gray-600 p-1 rounded">student123</code> para Estudiante.
                        </p>
                    </form>
                </div>
            </div>
             <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')" }}>
                <div className="w-full h-full bg-black bg-opacity-40 flex items-end p-12">
                    <div className="text-white">
                        <h2 className="text-4xl font-bold">Universidad Tecnológica del Perú</h2>
                        <p className="text-lg mt-2 opacity-90">Innovación y conocimiento para transformar el futuro.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;