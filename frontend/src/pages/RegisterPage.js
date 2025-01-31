import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { UserPlus } from 'lucide-react';
import '../index.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.error || 'Registration failed');
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
      <Card className="w-full max-w-md">
        <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 p-8 rounded-t-xl">
          <CardTitle className="text-3xl font-bold text-white text-center flex items-center justify-center gap-3">
            <UserPlus className="h-8 w-8" />
            Register
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Username</label>
              <Input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="input-futuristic"
                required
                disabled={loading}
                minLength={3}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-futuristic"
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
                required
                disabled={loading}
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="input-futuristic"
                required
                disabled={loading}
                minLength={6}
              />
            </div>
            <Button type="submit" className="btn-futuristic w-full flex items-center gap-1 color-blue" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
          <div className="text-center">
            <Link to="/login" className="text-sm text-indigo-600 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default RegisterPage;
