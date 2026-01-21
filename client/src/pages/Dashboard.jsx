import React, { useEffect } from "react";
import useAnalyticsStore from "../store/analyticsStore";
import useThemeStore from "../store/themeStore";
import {
  BarChart3,
  TrendingUp,
  Users,
  Download,
  Mail,
  Zap,
  PlusCircle,
  RefreshCw,
  Filter,
  DollarSign,
  Target,
  Clock
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";

// Cores para os gráficos
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const Dashboard = () => {
  const { data, loading, fetchData, addMoreSampleData } = useAnalyticsStore();
  const { darkMode } = useThemeStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Dados para gráfico de pizza por categoria
  const categoryData = data.reduce((acc, item) => {
    const existing = acc.find(cat => cat.name === item.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: item.category, value: 1 });
    }
    return acc;
  }, []);

  // Dados para gráfico de barras
  const barData = data.slice(0, 6).map(item => ({
    name: item.name.substring(0, 12) + (item.name.length > 12 ? '...' : ''),
    value: item.metricValue || item.value,
  }));

  // Dados para gráfico de linha (últimas 7 métricas)
  const lineData = data.slice(0, 7).map((item, index) => ({
    day: `Dia ${index + 1}`,
    value: item.metricValue || item.value,
  }));

  // Dados para gráfico de área (performance)
  const areaData = [
    { month: 'Jan', value: 4000 },
    { month: 'Fev', value: 3000 },
    { month: 'Mar', value: 5000 },
    { month: 'Abr', value: 2780 },
    { month: 'Mai', value: 5890 },
    { month: 'Jun', value: 4390 },
  ];

  const handleAddSampleData = () => {
    addMoreSampleData();
  };

  const handleRefresh = () => {
    fetchData();
  };

  // Calcula estatísticas
  const totalMetrics = data.length;
  const avgValue = data.length > 0
    ? (data.reduce((sum, item) => sum + (item.metricValue || item.value), 0) / data.length).toFixed(1)
    : 0;
  const categoriesCount = new Set(data.map(item => item.category)).size;
  const maxValue = data.length > 0
    ? Math.max(...data.map(item => item.metricValue || item.value))
    : 0;

  return (
    <div className="space-y-6">
      {/* Header do Dashboard */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Visão Geral do Dashboard</h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            Monitoramento em tempo real das suas métricas de analytics
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleRefresh}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors`}
          >
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </button>

          <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors`}>
            <Filter className="h-4 w-4" />
            Filtrar
          </button>

          <button
            onClick={handleAddSampleData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Nova Métrica
          </button>
        </div>
      </div>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: <BarChart3 />,
            label: "Métricas Totais",
            value: totalMetrics,
            change: "+12%",
            color: darkMode ? "bg-blue-900/30" : "bg-blue-50",
            iconColor: "text-blue-600 dark:text-blue-400",
            trend: "up"
          },
          {
            icon: <TrendingUp />,
            label: "Média de Valores",
            value: avgValue,
            change: "+8%",
            color: darkMode ? "bg-green-900/30" : "bg-green-50",
            iconColor: "text-green-600 dark:text-green-400",
            trend: "up"
          },
          {
            icon: <Users />,
            label: "Categorias",
            value: categoriesCount,
            change: "+2",
            color: darkMode ? "bg-purple-900/30" : "bg-purple-50",
            iconColor: "text-purple-600 dark:text-purple-400",
            trend: "up"
          },
          {
            icon: <Download />,
            label: "Valor Máximo",
            value: maxValue.toLocaleString(),
            change: "+15%",
            color: darkMode ? "bg-orange-900/30" : "bg-orange-50",
            iconColor: "text-orange-600 dark:text-orange-400",
            trend: "up"
          },
        ].map((stat, index) => (
          <div
            key={index}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <div className={stat.iconColor}>
                  {stat.icon}
                </div>
              </div>
              <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {stat.change}
              </span>
            </div>

            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Pizza */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Distribuição por Categoria</h2>
            <div className={`text-sm px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              {categoryData.length} Categorias
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={darkMode ? {
                  backgroundColor: '#1F2937',
                  borderColor: '#4B5563',
                  color: '#F9FAFB',
                  borderRadius: '8px'
                } : {}}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Linhas */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Tendência das Métricas</h2>
            <div className={`text-sm px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              Últimos 7 dias
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#e5e7eb"} />
              <XAxis
                dataKey="day"
                stroke={darkMode ? "#D1D5DB" : "#374151"}
              />
              <YAxis
                stroke={darkMode ? "#D1D5DB" : "#374151"}
              />
              <Tooltip
                contentStyle={darkMode ? {
                  backgroundColor: '#1F2937',
                  borderColor: '#4B5563',
                  color: '#F9FAFB',
                  borderRadius: '8px'
                } : {}}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lista de métricas recentes */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Métricas Recentes</h2>
          <button className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
            Ver todas
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className="text-left py-3 px-4">Nome</th>
                  <th className="text-left py-3 px-4">Categoria</th>
                  <th className="text-left py-3 px-4">Valor</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Data</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 5).map((item) => (
                  <tr
                    key={item.id}
                    className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}
                  >
                    <td className="py-4 px-4 font-medium">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          {item.category === 'Marketing' ? <Mail className="h-4 w-4" /> :
                           item.category === 'Sales' ? <DollarSign className="h-4 w-4" /> :
                           item.category === 'Support' ? <Users className="h-4 w-4" /> :
                           <Target className="h-4 w-4" />}
                        </div>
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.category === 'Marketing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                        item.category === 'Sales' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        item.category === 'Support' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-lg">
                      {typeof item.metricValue === 'number'
                        ? item.metricValue.toLocaleString()
                        : item.metricValue}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        (item.metricValue || item.value) > 1000
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {(item.metricValue || item.value) > 1000 ? 'Alto' : 'Médio'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {data.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Nenhuma métrica encontrada
            </div>
            <button
              onClick={handleAddSampleData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Adicionar Primeira Métrica
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
