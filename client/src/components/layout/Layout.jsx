import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useThemeStore from '../../store/themeStore'; // Importar o store de tema
import {
  BarChart3,
  Users,
  Settings,
  LogOut,
  Home,
  Zap,
  Sun,
  Moon,
  Bell,
  HelpCircle
} from 'lucide-react';

const Layout = () => {
  const { logout } = useAuthStore();
  const { darkMode, toggleTheme } = useThemeStore(); // Obter estado do tema
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: <Home />, label: 'Dashboard', path: '/dashboard' },
    { icon: <BarChart3 />, label: 'Métricas', path: '/metrics' },
    { icon: <Users />, label: 'Perfil', path: '/profile' },
    { icon: <Settings />, label: 'Configurações', path: '/settings' },
  ];

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar */}
      <aside className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-blue-500" />
            <h1 className="text-xl font-bold">DataPulse</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    window.location.pathname === item.path
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
          {/* Botão para alternar tema */}
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors`}
          >
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
              <span>{darkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
            </div>
            <div className={`w-12 h-6 rounded-full relative ${
              darkMode ? 'bg-blue-600' : 'bg-gray-300'
            }`}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                darkMode ? 'right-1' : 'left-1'
              }`}></div>
            </div>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <HelpCircle className="h-5 w-5" />
            <span>Ajuda & Suporte</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Topbar */}
        <header className={`sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell className="h-5 w-5" />
              </button>
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Última atualização: hoje às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Indicador de tema atual */}
              <div className={`px-3 py-1 rounded-full text-sm ${
                darkMode
                  ? 'bg-blue-900/30 text-blue-400'
                  : 'bg-blue-100 text-blue-600'
              }`}>
                {darkMode ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${
                  darkMode ? 'bg-gray-700' : 'bg-blue-100'
                } flex items-center justify-center`}>
                  <span className="font-semibold">U</span>
                </div>
                <div>
                  <div className="font-medium">Usuário</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Administrador
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
