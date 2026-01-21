import React from 'react';
import { Moon, Sun } from 'lucide-react';
import useThemeStore from '../store/themeStore';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
      aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      {/* Ícone do sol (tema claro) */}
      <Sun className={`w-5 h-5 text-yellow-500 transition-all duration-300 absolute ${
        theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
      }`} />

      {/* Ícone da lua (tema escuro) */}
      <Moon className={`w-5 h-5 text-blue-400 transition-all duration-300 absolute ${
        theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
      }`} />

      {/* Efeito de brilho */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </button>
  );
};

export default ThemeToggle;
