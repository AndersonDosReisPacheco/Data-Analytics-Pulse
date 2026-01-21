import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      darkMode: false,

      toggleTheme: () => {
        set((state) => {
          const newDarkMode = !state.darkMode;
          // Aplica a classe ao body para temas globais
          if (newDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { darkMode: newDarkMode };
        });
      },

      setDarkMode: (isDark) => {
        set({ darkMode: isDark });
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }),
    {
      name: 'theme-storage', // Nome para armazenamento local
    }
  )
);

export default useThemeStore;
