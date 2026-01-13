import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const AuthContainer = () => {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (mode === 'register' && !formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register') {
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        name: formData?.name || formData?.email?.split('@')?.[0],
        email: formData?.email
      };

      navigate('/main-dashboard', { state: { user: userData } });
    } catch (error) {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Icon name="CheckSquare" size={32} color="#FFFFFF" />
          </div>
          <h1 className="auth-title">TaskFlow</h1>
          <p className="auth-subtitle">
            {mode === 'login' ?'Welcome back! Sign in to continue' :'Create your account to get started'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your name"
              value={formData?.name}
              onChange={(e) => handleChange('name', e?.target?.value)}
              error={errors?.name}
              required
              disabled={isSubmitting}
            />
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={(e) => handleChange('email', e?.target?.value)}
            error={errors?.email}
            required
            disabled={isSubmitting}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={(e) => handleChange('password', e?.target?.value)}
            error={errors?.password}
            required
            disabled={isSubmitting}
          />

          {mode === 'register' && (
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              required
              disabled={isSubmitting}
            />
          )}

          {errors?.submit && (
            <div className="text-sm text-error bg-error/10 px-4 py-3 rounded-xl">
              {errors?.submit}
            </div>
          )}

          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isSubmitting}
            iconName={mode === 'login' ? 'LogIn' : 'UserPlus'}
            iconPosition="left"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="auth-toggle">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span className="auth-toggle-link" onClick={toggleMode}>
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;