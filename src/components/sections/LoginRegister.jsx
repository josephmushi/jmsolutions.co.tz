import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import Breadcrumb from '@/components/Breadcrumb';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(formData.email, formData.password);
      if (!error) {
        toast({
          title: "Login Successful!",
          description: "Welcome back!",
        });
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        toast({
          variant: "destructive",
          title: "Passwords do not match",
        });
        setLoading(false);
        return;
      }
      const { error } = await signUp(formData.email, formData.password, {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
        }
      });
      if (!error) {
        toast({
          title: "Registration Successful!",
          description: "Please check your email to verify your account.",
        });
        setIsLogin(true); // Switch to login view after successful registration
      }
    }
    setLoading(false);
  };

  const handleSocialLogin = (provider) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 4000,
    });
  };

  return (
    <section className="min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        <Breadcrumb />
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 text-shadow">
            {isLogin ? 'Welcome Back' : 'Join Us Today'}
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            {isLogin 
              ? 'Sign in to access your account and continue your journey with JM Solutions.'
              : 'Create your account and unlock access to our premium services and solutions.'
            }
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <motion.div
            className="glass-effect rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Toggle Buttons */}
            <div className="flex mb-8 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                  isLogin 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                  !isLogin 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Registration Fields */}
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        required={!isLogin}
                      />
                    </div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      required={!isLogin}
                    />
                  </div>
                </>
              )}

              {/* Email Field */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Confirm Password Field (Registration only) */}
              {!isLogin && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required={!isLogin}
                  />
                </div>
              )}

              {/* Forgot Password Link (Login only) */}
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('forgot')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover-lift"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">or continue with</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                onClick={() => handleSocialLogin('google')}
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50 py-3"
              >
                <img className="w-5 h-5 mr-3" alt="Google logo" src="https://images.unsplash.com/photo-1678483789111-3a04c4628bd6" />
                Continue with Google
              </Button>
              
              <Button
                type="button"
                onClick={() => handleSocialLogin('microsoft')}
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50 py-3"
              >
                <img className="w-5 h-5 mr-3" alt="Microsoft logo" src="https://images.unsplash.com/photo-1658203897339-0b8c64a42fba" />
                Continue with Microsoft
              </Button>
            </div>

            {/* Terms and Privacy (Registration only) */}
            {!isLogin && (
              <p className="mt-6 text-xs text-gray-600 text-center">
                By creating an account, you agree to our{' '}
                <button 
                  onClick={() => handleSocialLogin('terms')}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Terms of Service
                </button>{' '}
                and{' '}
                <button 
                  onClick={() => handleSocialLogin('privacy')}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Privacy Policy
                </button>
              </p>
            )}
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {isLogin ? 'New to JM Solutions?' : 'Already have an account?'}
              </h3>
              <p className="text-gray-600 mb-4">
                {isLogin 
                  ? 'Join thousands of satisfied customers who trust us with their technology needs.'
                  : 'Welcome back! Sign in to access your dashboard and continue where you left off.'
                }
              </p>
              <Button
                onClick={() => setIsLogin(!isLogin)}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                {isLogin ? 'Create New Account' : 'Sign In Instead'}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LoginRegister;