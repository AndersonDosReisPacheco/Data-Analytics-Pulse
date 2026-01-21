import { create } from "zustand";
import api from "../lib/axios";

// Dados de exemplo que serão carregados AUTOMATICAMENTE
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
  },
  {
    id: 6,
    name: "Email Open Rate",
    category: "Marketing",
    metricValue: 28.5,
    value: 28.5,
    description: "Percentage of emails opened",
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    date: new Date(Date.now() - 432000000).toISOString()
  },
  {
    id: 7,
    name: "Conversion Rate",
    category: "Sales",
    metricValue: 3.2,
    value: 3.2,
    description: "Visitor to customer conversion",
    createdAt: new Date(Date.now() - 518400000).toISOString(),
    date: new Date(Date.now() - 518400000).toISOString()
  },
  {
    id: 8,
    name: "Active Users",
    category: "Product",
    metricValue: 1540,
    value: 1540,
    description: "Daily active users",
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    date: new Date(Date.now() - 604800000).toISOString()
  }
];

const useAnalyticsStore = create((set, get) => ({
  // Inicia com os dados de exemplo automaticamente
  data: [...INITIAL_SAMPLE_DATA],
  loading: false,
  error: null,
  addingMetric: false,
  categories: ["Marketing", "Sales", "Support", "Product", "Finance", "Operations"],

  // Esta função verifica se há dados da API, mas mantém os dados de exemplo como fallback
  fetchData: async () => {
    set({ loading: true, error: null });

    // SEMPRE começa com dados de exemplo para garantir que algo seja mostrado
    let finalData = [...INITIAL_SAMPLE_DATA];

    try {
      // Tenta buscar dados da API
      const res = await api.get("/analytics");
      console.log(" API Analytics data received:", res.data);

      // Se a API retornar dados válidos, usa eles
      if (res.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
        console.log(" Using API data");
        finalData = res.data.data;
      } else if (Array.isArray(res.data) && res.data.length > 0) {
        console.log(" Using direct array from API");
        finalData = res.data;
      } else {
        console.log(" API returned empty data, using sample data");
        // Mantém os dados de exemplo
      }
    } catch (err) {
      console.log(" API error, using sample data:", err.message);
      // Em caso de erro, usa os dados de exemplo
    }

    // Atualiza o estado com os dados (sejam da API ou de exemplo)
    set({ data: finalData, loading: false });
  },

  // Função para adicionar uma nova métrica (real)
  addMetric: async (metric) => {
    set({ addingMetric: true });
    try {
      // Cria a métrica com todos os campos necessários
      const newMetric = {
        ...metric,
        id: Date.now(), // ID único baseado no timestamp
        createdAt: new Date().toISOString(),
        date: new Date().toISOString(),
        metricValue: parseFloat(metric.metricValue) || parseFloat(metric.value) || 0,
        value: parseFloat(metric.value) || parseFloat(metric.metricValue) || 0,
        description: metric.description || ""
      };

      console.log(" Adding new metric to dashboard:", newMetric);

      // Tenta salvar na API (opcional)
      try {
        await api.post("/analytics", newMetric);
        console.log(" Metric saved to API");
      } catch (apiError) {
        console.log("ℹ Metric saved locally only:", apiError.message);
      }

      // Adiciona ao estado local (IMEDIATAMENTE atualiza o dashboard)
      set((state) => ({
        data: [newMetric, ...state.data], // Adiciona no início do array
        addingMetric: false
      }));

      return { success: true, data: newMetric };
    } catch (err) {
      console.error(" Error adding metric:", err);
      set({ addingMetric: false });
      return {
        success: false,
        error: "Failed to add metric. Please try again."
      };
    }
  },

  // Função para gerar dados de exemplo adicionais (opcional)
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

  // Funções auxiliares
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
