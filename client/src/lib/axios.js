import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor: adiciona token se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log(" Token no localStorage:", token ? "Presente" : "Ausente");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(" Token adicionado ao header:", config.headers.Authorization.substring(0, 20) + "...");
  } else {
    console.log(" Nenhum token encontrado, requisição sem autenticação");
  }

  console.log(" Enviando requisição para:", config.url);
  return config;
}, (error) => {
  console.error(" Erro no request interceptor:", error);
  return Promise.reject(error);
});

// Response interceptor: trata erros globais
api.interceptors.response.use(
  (response) => {
    console.log(" Resposta recebida de:", response.config.url, "Status:", response.status);
    return response;
  },
  (error) => {
    console.error(" Erro na resposta de:", error.config?.url);
    console.error("Status:", error.response?.status);
    console.error("Mensagem:", error.response?.data?.message);

    if (error.response?.status === 403 || error.response?.status === 401) {
      console.log(" Token expirado/inválido, removendo do localStorage");
      localStorage.removeItem("token");

      // Verifica se já está na página de login para evitar loop
      if (window.location.pathname !== "/login") {
        console.log(" Redirecionando para /login");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
