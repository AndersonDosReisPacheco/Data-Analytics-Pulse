import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { resetPassword } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    const result = await resetPassword(token, password);
    setLoading(false);
    if (result.success) {
      alert('s Password updated successfully! You can now log in.');
      navigate('/login');
    } else {
      setError(result.error || 'Failed to reset password. The link may have expired.');
    }
  };

  if (!token) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-md card p-8 slide-up">
        <h2 className="text-2xl font-bold text-center text-text-primary-light dark:text-text-primary-dark mb-2">
          Reset Your Password
        </h2>
        <p className="text-center text-text-secondary-light dark:text-text-secondary-dark mb-6">
          Enter a new password for your account
        </p>

        {error && <div className="mb-5 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <Input
            label="New Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
          <Input
            label="Confirm New Password"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? 'Updating...' : 'Reset Password'}
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
