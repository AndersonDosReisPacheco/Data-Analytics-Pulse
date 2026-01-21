import { create } from "zustand";
import api from "../lib/axios";

const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  registrationSuccess: false,
  registrationData: null,

  initializeAuth: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ token });
      get().fetchUser();
    }
  },

  fetchUser: async () => {
    try {
      const res = await api.get("/api/auth/me");
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
      const res = await api.post("/api/auth/register", userData);
      const { token, user } = res.data;

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
      const res = await api.post("/api/auth/login", { email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      set({ token, user, loading: false });

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

  clearRegistrationSuccess: () => {
    set({
      registrationSuccess: false,
      registrationData: null
    });
  },

  forgotPassword: async (email) => {
    try {
      await api.post("/api/auth/forgot-password", { email });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Request failed";
      return { success: false, error: message };
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      await api.post("/api/auth/reset-password", { token, newPassword });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Reset failed";
      return { success: false, error: message };
    }
  }
}));

export default useAuthStore;
