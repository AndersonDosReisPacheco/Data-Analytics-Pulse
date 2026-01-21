import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await forgotPassword(email);
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      alert(result.error || 'Something went wrong. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background-light dark:bg-background-dark">
        <div className="w-full max-w-md card p-8 text-center slide-up">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
            Check Your Email
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
            If your email is registered, you'll receive a password reset link shortly.
          </p>
          <Button onClick={() => navigate('/login')} className="w-full">
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-md card p-8 slide-up">
        <h2 className="text-2xl font-bold text-center text-text-primary-light dark:text-text-primary-dark mb-2">
          Forgot Password?
        </h2>
        <p className="text-center text-text-secondary-light dark:text-text-secondary-dark mb-6">
          Enter your email to receive a reset link
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
