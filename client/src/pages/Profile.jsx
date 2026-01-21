// client/src/pages/Profile.jsx
import { useState } from 'react';
import useAuthStore from '../store/authStore';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Profile() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">My Profile</h1>
      <div className="card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">{user.email}</p>
          </div>
        </div>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">
          Your profile page will be fully functional soon with edit capabilities.
        </p>
      </div>
    </div>
  );
}
