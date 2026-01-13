import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';

const Authentication = () => {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const mockCredentials = {
    email: 'demo@taskflow.com',
    password: 'demo123'
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (mode === 'register') {
      if (!formData?.name?.trim()) {
        newErrors.name = 'Full name is required';
      } else if (formData?.name?.trim()?.length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
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
      await new Promise(resolve => setTimeout(resolve, 1200));

      if (mode === 'login') {
        if (formData?.email !== mockCredentials?.email || formData?.password !== mockCredentials?.password) {
          setErrors({ 
            submit: `Invalid credentials. Please use: ${mockCredentials?.email} / ${mockCredentials?.password}` 
          });
          setIsSubmitting(false);
          return;
        }
      }

      const userData = {
        name: formData?.name || formData?.email?.split('@')?.[0],
        email: formData?.email
      };

      navigate('/main-dashboard', { state: { user: userData } });
    } catch (error) {
      setErrors({ submit: 'Authentication failed. Please try again.' });
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
    if (errors?.submit) {
      setErrors(prev => ({
        ...prev,
        submit: ''
      }));
    }
  };

  const handleForgotPassword = () => {
    alert('Password recovery feature coming soon!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-stone-50 to-green-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-large p-6 md:p-8 lg:p-10">
          <div className="text-center mb-6 md:mb-8">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-5 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary to-secondary shadow-medium">
              <Icon name="CheckSquare" size={32} color="#FFFFFF" className="md:w-10 md:h-10" />
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-card-foreground mb-2">
              TaskFlow
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              {mode === 'login' ?'Welcome back! Sign in to continue' :'Create your account to get started'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {mode === 'register' && (
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
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

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData?.password}
                onChange={(e) => handleChange('password', e?.target?.value)}
                error={errors?.password}
                required
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
                disabled={isSubmitting}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
              </button>
            </div>

            {mode === 'register' && (
              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData?.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e?.target?.value)}
                  error={errors?.confirmPassword}
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isSubmitting}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
                </button>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <Checkbox
                  label="Remember me"
                  checked={formData?.rememberMe}
                  onChange={(e) => handleChange('rememberMe', e?.target?.checked)}
                  disabled={isSubmitting}
                  size="sm"
                />
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-primary hover:underline font-medium"
                  disabled={isSubmitting}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {errors?.submit && (
              <div className="text-sm text-error bg-error/10 px-4 py-3 rounded-xl flex items-start gap-2">
                <Icon name="AlertCircle" size={18} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
                <span>{errors?.submit}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="default"
              fullWidth
              loading={isSubmitting}
              iconName={mode === 'login' ? 'LogIn' : 'UserPlus'}
              iconPosition="left"
              size="lg"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span>SSL Secured</span>
              </div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Icon name="Lock" size={16} color="var(--color-success)" />
                <span>Data Protected</span>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={toggleMode}
                className="text-primary font-medium hover:underline"
                disabled={isSubmitting}
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs md:text-sm text-muted-foreground">
            By continuing, you agree to TaskFlow's Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authentication;