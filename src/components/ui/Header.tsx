import React from "react";
import { PlusIcon, UserIcon, LogoutIcon } from "../../../constants";
import { User } from "../../../types";

interface HeaderProps {
  currentUser: User;
  onLogout: () => void;
  onOpenSubmitModal: () => void;
  onOpenProfile: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentUser,
  onLogout,
  onOpenSubmitModal,
  onOpenProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/70 dark:bg-gray-900/60 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Eureka */}
        <div className="flex items-center gap-2">
          <svg
            className="w-8 h-8 text-orange-500 drop-shadow-md"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <div>
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 drop-shadow-lg">
              Eureka
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Repositorio Académico UTP
            </p>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          {/* Subir Proyecto */}
          <button
            onClick={onOpenSubmitModal}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105"
          >
            <PlusIcon />
            Subir Proyecto
          </button>

          {/* Perfil */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-full pr-3 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-600">
              {currentUser.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt="Perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon />
              )}
            </div>
            <div className="hidden md:block text-left">
              <p className="font-semibold text-sm text-gray-800 dark:text-white">
                {currentUser.username}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {currentUser.role}
              </p>
            </div>
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            title="Cerrar Sesión"
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;