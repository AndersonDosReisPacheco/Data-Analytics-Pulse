import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { Zap, Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpa erros ao digitar
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email inválido";
    }

    if (!formData.password) {
      errors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      errors.password = "A senha deve ter pelo menos 6 caracteres";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate("/dashboard");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
        <div className="md:flex">
          {/* Lado esquerdo - Ilustração/Info */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 p-10 flex-col justify-between text-white">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <Zap className="h-8 w-8" />
                <h1 className="text-2xl font-bold">DataPulse</h1>
              </div>

              <h2 className="text-3xl font-bold mb-4">
                Bem-vindo de volta!
              </h2>

              <p className="text-blue-100 mb-8">
                Acesse sua conta para visualizar dashboards, métricas e insights valiosos para seu negócio.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Zap className="h-5 w-5" />
                </div>
                <span>Dashboard em tempo real</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Zap className="h-5 w-5" />
                </div>
                <span>Análises preditivas</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Zap className="h-5 w-5" />
                </div>
                <span>Relatórios personalizados</span>
              </div>
            </div>
          </div>

          {/* Lado direito - Formulário */}
          <div className="md:w-1/2 p-8 md:p-10">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Entrar na Conta
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Digite suas credenciais para acessar o dashboard
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${formErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="seu@email.com"
                    disabled={loading}
                  />
                </div>
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 border ${formErrors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="Sua senha"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Lembrar-me
                  </label>
                </div>

                <Link to="/forgot-password" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Entrando...</span>
                  </>
                ) : (
                  <>
                    <span>Entrar na Conta</span>
                    <LogIn className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-gray-600 dark:text-gray-400">
                Ainda não tem uma conta?{" "}
                <Link to="/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  Cadastre-se aqui
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ao entrar, você concorda com nossos{" "}
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Termos</a> e{" "}
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Política de Privacidade</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
