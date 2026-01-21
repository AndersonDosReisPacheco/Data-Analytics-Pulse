import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Mail, Shield, Clock, Sparkles } from 'lucide-react';

export default function RegistrationSuccess() {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Account",
      description: "Your data is encrypted and protected"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Verify Email",
      description: "Check your inbox for confirmation"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Unlock powerful insights"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-brand-50 dark:from-gray-900 dark:via-gray-800 dark:to-brand-900/20 p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-4">
            Registration Successful!
          </h1>
          <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
            Welcome to DataPulse Analytics! Your account has been created successfully.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fadeIn"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/30 dark:to-brand-800/30 flex items-center justify-center text-brand-500">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="card p-8 max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                    Automatic Redirect
                  </h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    You will be redirected in {countdown} seconds
                  </p>
                </div>
              </div>

              <div className="w-full md:w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 ease-out"
                  style={{ width: `${(10 - countdown) * 10}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/login')}
                className="btn-primary px-8 py-3 text-lg inline-flex items-center justify-center gap-2 group"
              >
                Go to Login
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                to="/"
                className="btn-outline px-8 py-3 text-lg text-center"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">
            <span className="animate-pulse">✨</span>
            <span>Need help? <Link to="/contact" className="text-brand-500 hover:underline">Contact Support</Link></span>
            <span className="animate-pulse">✨</span>
          </div>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="fixed top-10 left-10 w-32 h-32 bg-gradient-to-r from-green-300 to-emerald-400 rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="fixed bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="fixed top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full opacity-5 blur-3xl -z-10"></div>
      </div>
    </div>
  );
}
