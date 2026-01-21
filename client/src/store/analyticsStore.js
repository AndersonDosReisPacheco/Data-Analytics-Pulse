import { create } from "zustand";
import api from "../lib/axios";

// Dados de exemplo (fallback automático)
const INITIAL_SAMPLE_DATA = [
  {
    id: 1,
    name: "Website Traffic",
    category: "Marketing",
    metricValue: 12500,
    value: 12500,
    description: "Monthly website visitors",
    createdAt: new Date().toISOString(),
    date: new Date().toISOString()
  },
  {
    id: 2,
    name: "Sales Revenue",
    category: "Sales",
    metricValue: 25430,
    value: 25430,
    description: "Total sales for the month",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    date: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 3,
    name: "Customer Satisfaction",
    category: "Support",
    metricValue: 4.8,
    value: 4.8,
    description: "Average customer rating",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    date: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: 4,
    name: "Social Media Engagement",
    category: "Marketing",
    metricValue: 3200,
    value: 3200,
    description: "Likes, shares, and comments",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    date: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: 5,
    name: "Product Downloads",
    category: "Product",
    metricValue: 890,
    value: 890,
    description: "Total app downloads",
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    date: new Date(Date.now() - 345600000).toISOString()
  }
];

const useAnalyticsStore = create((set, get) => ({
  data: [...INITIAL_SAMPLE_DATA],
  loading: false,
  error: null,
  addingMetric: false,
  categories: ["Marketing", "Sales", "Support", "Product", "Finance", "Operations"],

  // Busca dados da API com fallback automático
  fetchData: async () => {
    set({ loading: true, error: null });

    let finalData = [...INITIAL_SAMPLE_DATA];

    try {
      const res = await api.get("/api/analytics");
      console.log(" Analytics API response:", res.data);

      if (Array.isArray(res.data?.data) && res.data.data.length > 0) {
        finalData = res.data.data;
      } else if (Array.isArray(res.data) && res.data.length > 0) {
        finalData = res.data;
      } else {
        console.log("ℹ API retornou vazio, usando dados de exemplo");
      }
    } catch (err) {
      console.warn(" Erro ao buscar analytics, usando fallback:", err.message);
    }

    set({ data: finalData, loading: false });
  },

  // Adiciona nova métrica
  addMetric: async (metric) => {
    set({ addingMetric: true });

    try {
      const newMetric = {
        ...metric,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        date: new Date().toISOString(),
        metricValue: Number(metric.metricValue ?? metric.value ?? 0),
        value: Number(metric.value ?? metric.metricValue ?? 0),
        description: metric.description || ""
      };

      console.log("➕ Nova métrica:", newMetric);

      try {
        await api.post("/api/analytics", newMetric);
        console.log(" Métrica salva na API");
      } catch (apiError) {
        console.log("ℹ Métrica salva apenas localmente:", apiError.message);
      }

      set((state) => ({
        data: [newMetric, ...state.data],
        addingMetric: false
      }));

      return { success: true, data: newMetric };
    } catch (err) {
      console.error(" Erro ao adicionar métrica:", err);
      set({ addingMetric: false });
      return {
        success: false,
        error: "Failed to add metric. Please try again."
      };
    }
  },

  addMoreSampleData: () => {
    const newSample = {
      id: Date.now(),
      name: `Sample Metric ${Math.floor(Math.random() * 1000)}`,
      category: ["Marketing", "Sales", "Product"][Math.floor(Math.random() * 3)],
      metricValue: Math.floor(Math.random() * 5000) + 1000,
      value: Math.floor(Math.random() * 5000) + 1000,
      description: "Sample metric for demonstration",
      createdAt: new Date().toISOString(),
      date: new Date().toISOString()
    };

    set((state) => ({
      data: [newSample, ...state.data]
    }));

    return { success: true, data: newSample };
  },

  removeMetric: (id) => {
    set((state) => ({
      data: state.data.filter(item => item.id !== id)
    }));
  },

  clearData: () => set({ data: [], error: null }),

  refreshData: () => {
    set({ loading: true });
    return get().fetchData();
  }
}));

export default useAnalyticsStore;
