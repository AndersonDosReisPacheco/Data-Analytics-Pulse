import { create } from "zustand";
import api from "../lib/axios";

const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  registrationSuccess: false, // Novo estado para controle de sucesso no registro
  registrationData: null, // Dados do registro bem-sucedido

  initializeAuth: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ token });
      get().fetchUser();
    }
  },

  fetchUser: async () => {
    try {
      const res = await api.get("/auth/me");
      set({ user: res.data.user || res.data });
    } catch (err) {
      console.error("Error fetching user:", err);
      localStorage.removeItem("token");
      set({ user: null, token: null });
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null, registrationSuccess: false });
    try {
      const res = await api.post("/auth/register", userData);
      const { token, user } = res.data;

      // NÃO salva o token no localStorage - usuário precisa fazer login separadamente
      set({
        loading: false,
        registrationSuccess: true,
        registrationData: { user, token },
        error: null
      });

      return {
        success: true,
        data: { user, token },
        message: "Registration successful! Please login to continue."
      };
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      set({
        error: message,
        loading: false,
        registrationSuccess: false,
        registrationData: null
      });
      return { success: false, error: message };
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null, registrationSuccess: false });
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      // Salva o token e faz login
      localStorage.setItem("token", token);
      set({ token, user, loading: false, registrationSuccess: false });

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      set({ error: message, loading: false });
      return { success: false, error: message };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      user: null,
      token: null,
      registrationSuccess: false,
      registrationData: null
    });
  },

  // Função para limpar o estado de sucesso do registro
  clearRegistrationSuccess: () => {
    set({
      registrationSuccess: false,
      registrationData: null
    });
  },

  forgotPassword: async (email) => {
    try {
      await api.post("/auth/forgot-password", { email });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Request failed";
      return { success: false, error: message };
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      await api.post("/auth/reset-password", { token, newPassword });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Reset failed";
      return { success: false, error: message };
    }
  }
}));

export default useAuthStore;
