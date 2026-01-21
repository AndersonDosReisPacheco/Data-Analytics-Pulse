import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import {
  Zap,
  User,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle,
  Shield,
  Eye,
  EyeOff,
  AlertCircle
} from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});

  const { register, loading, error, registrationSuccess, clearRegistrationSuccess } = useAuthStore();
  const navigate = useNavigate();

  // Redireciona para login após 5 segundos se o registro for bem-sucedido
  useEffect(() => {
    if (registrationSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
        clearRegistrationSuccess();
      }, 5000);

      return () => {
        clearTimeout(timer);
        clearRegistrationSuccess();
      };
    }
  }, [registrationSuccess, navigate, clearRegistrationSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Marca o campo como tocado
    setTouched(prev => ({ ...prev, [name]: true }));

    // Validação em tempo real
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const errors = { ...formErrors };

    switch (name) {
      case 'name':
        if (!value.trim()) {
          errors.name = "Nome é obrigatório";
        } else if (value.length < 2) {
          errors.name = "Nome deve ter pelo menos 2 caracteres";
        } else {
          delete errors.name;
        }
        break;

      case 'email':
        if (!value.trim()) {
          errors.email = "Email é obrigatório";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errors.email = "Email inválido";
        } else {
          delete errors.email;
        }
        break;

      case 'password':
        if (!value) {
          errors.password = "Senha é obrigatória";
        } else if (value.length < 6) {
          errors.password = "A senha deve ter pelo menos 6 caracteres";
        } else {
          delete errors.password;
        }
        break;

      case 'confirmPassword':
        if (!value) {
          errors.confirmPassword = "Confirme sua senha";
        } else if (value !== formData.password) {
          errors.confirmPassword = "As senhas não coincidem";
        } else {
          delete errors.confirmPassword;
        }
        break;
    }

    setFormErrors(errors);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Nome é obrigatório";
    }

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

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirme sua senha";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem";
    }

    setFormErrors(errors);
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  // Se o registro for bem-sucedido, mostra tela de confirmação
  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-in">
          <div className="mb-6 flex justify-center">
            <div className="bg-green-100 p-4 rounded-full animate-bounce">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Cadastro Concluído! 🎉
          </h1>

          <p className="text-gray-600 mb-2">
            Seu cadastro foi realizado com sucesso!
          </p>

          <p className="text-gray-600 mb-6">
            Redirecionando para login em <span className="font-bold text-blue-600">5 segundos</span>...
          </p>

          <div className="space-y-4">
            <button
              onClick={() => {
                navigate("/login");
                clearRegistrationSuccess();
              }}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <ArrowRight className="h-5 w-5" />
              Ir para Login Agora
            </button>

            <p className="text-sm text-gray-500">
              Ou <Link to="/login" className="text-blue-600 font-medium hover:underline" onClick={clearRegistrationSuccess}>clique aqui</Link> se não quiser esperar
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <Shield className="h-4 w-4" />
              <span className="text-sm">Seus dados estão protegidos</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
        <div className="md:flex">
          {/* Lado esquerdo - Ilustração/Info */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 p-10 flex-col justify-between text-white">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <Zap className="h-8 w-8" />
                <h1 className="text-2xl font-bold">DataPulse</h1>
              </div>

              <h2 className="text-3xl font-bold mb-4">
                Junte-se à nossa plataforma
              </h2>

              <p className="text-blue-100 mb-8">
                Cadastre-se para acessar dashboards poderosos, métricas em tempo real e insights valiosos.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <span>Análises em tempo real</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <span>Dashboards personalizáveis</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <span>Relatórios detalhados</span>
              </div>
            </div>
          </div>

          {/* Lado direito - Formulário */}
          <div className="md:w-1/2 p-8 md:p-10">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Criar Conta
              </h1>
              <p className="text-gray-600">
                Preencha os dados abaixo para começar
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 border ${formErrors.name && touched.name ? 'border-red-500' : 'border-gray-300'} rounded-xl bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="Seu nome completo"
                    disabled={loading}
                  />
                </div>
                {formErrors.name && touched.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
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
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 border ${formErrors.email && touched.email ? 'border-red-500' : 'border-gray-300'} rounded-xl bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="seu@email.com"
                    disabled={loading}
                  />
                </div>
                {formErrors.email && touched.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha *
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
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-12 py-3 border ${formErrors.password && touched.password ? 'border-red-500' : 'border-gray-300'} rounded-xl bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="Mínimo 6 caracteres"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {formErrors.password && touched.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {formErrors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Senha *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-12 py-3 border ${formErrors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-xl bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="Digite a senha novamente"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {formErrors.confirmPassword && touched.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  Concordo com os <a href="#" className="text-blue-600 hover:underline">Termos de Serviço</a> e <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Criando conta...</span>
                  </>
                ) : (
                  <>
                    <span>Criar Minha Conta</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                  Faça login aqui
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
