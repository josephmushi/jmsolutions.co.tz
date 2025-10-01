import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Loader2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const { toast } = useToast();
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [placeholderUrl, setPlaceholderUrl] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchPlaceholder = async () => {
      const { data, error } = await supabase
        .from('placeholder')
        .select('content_url')
        .eq('location', 'login_page')
        .single();
      if (data) {
        setPlaceholderUrl(data.content_url);
      }
    };
    fetchPlaceholder();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(formData.identifier, formData.password);
    if (!error) {
      toast({
        title: "Login Successful!",
        description: "Redirecting to your dashboard...",
      });
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
    <section className="min-h-screen flex items-center justify-center pt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto glass-effect rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center" style={{ minHeight: 'calc(100% * 0.8)' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Sign In</h1>
                <p className="text-gray-600 mb-8">Access your JM Solutions dashboard.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="identifier"
                      placeholder="Phone no./Email Address"
                      value={formData.identifier}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      required
                      autoFocus
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="PIN no./Password"
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

                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('forgot')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover-lift"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
                  </Button>
                </form>

                <div className="my-6 flex items-center">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-4 text-gray-500 text-sm">or</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700">
                    Register here
                  </Link>
                </p>
              </motion.div>
            </div>
            <motion.div 
              className="hidden md:block bg-cover bg-center"
              style={{ backgroundImage: `url(${placeholderUrl})`, minHeight: 'calc(100% * 0.8)' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-full h-full bg-black/30"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;