import api from '../../config/api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, LogIn, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { Input, Label } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await api.post('/auth/login', formData);

      const { access_token, full_name, role } = response.data;
      setAuth(access_token, { full_name, role });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-2xl overflow-hidden border-none">
        <div className="bg-primary p-10 text-white text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md">
              <img src="/resources/icons/icon.png" alt="SAD Logo" className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tight">MediCore</h1>
          <p className="text-blue-300 text-xs mt-2 uppercase font-black tracking-[0.2em]">Success Above Dreams</p>
        </div>

        <div className="p-10 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start rounded-r-xl">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                <p className="text-sm text-red-700 font-bold">{error}</p>
              </div>
            )}

            <div className="space-y-1">
              <Label><User className="w-3 h-3 inline mr-1" /> Username</Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="space-y-1">
              <Label><Lock className="w-3 h-3 inline mr-1" /> Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full h-14 text-lg rounded-2xl"
              loading={loading}
            >
              {!loading && <><span className="mr-2">Login to Dashboard</span> <LogIn className="w-5 h-5" /></>}
            </Button>
          </form>

          <div className="mt-10 pt-6 border-t border-gray-50 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              © 2025 Success Above Dreams. All rights reserved.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
