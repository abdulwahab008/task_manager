import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { LogIn } from 'lucide-react';
import { loginSuccess } from '../features/authSlice';
import '../index.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(loginSuccess(data));
        navigate('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-100 to-purple-100">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 p-8 rounded-t-xl">
          <CardTitle className="text-3xl font-bold text-white text-center flex items-center justify-center gap-3">
            <LogIn className="h-8 w-8" />
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center border border-red-100">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-futuristic"
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-futuristic"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>
            <Button 
              type="submit" 
              className="btn-futuristic w-full flex items-center gap-1 color-blue"
              disabled={loading}
            >
              {loading ? (
                'Logging in...'
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign In
                </>
              )}
            </Button>
          </form>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            <div className="text-center">
              <Link 
                to="/register" 
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default LoginPage;
