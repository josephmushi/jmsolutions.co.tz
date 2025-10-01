import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Home from '@/components/sections/Home';
import Services from '@/components/sections/Services';
import DetailedService from '@/components/sections/DetailedService';
import MoreServices from '@/components/sections/MoreServices';
import Products from '@/components/sections/Products';
import ProductDetail from '@/components/sections/ProductDetail';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Login from '@/components/sections/Login';
import Register from '@/components/sections/Register';
import UserDash from '@/components/sections/UserDash';
import EditProfile from '@/components/sections/EditProfile';
import Quotation from '@/components/sections/Quotation';
import Vacancies from '@/components/sections/Vacancies';
import ClientProject from '@/components/sections/ClientProject';
import SMECrm from '@/components/sections/SMECrm';
import CrmApp from '@/components/sections/CrmApp';
import ChangePassword from '@/components/sections/ChangePassword';
import RoleChange from '@/components/sections/RoleChange';
import Settings from '@/components/sections/Settings';
import Support from '@/components/sections/Support';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { AnimatePresence, motion } from 'framer-motion';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { loading, user } = useAuth();

  return (
    <Router>
      <AnimatePresence mode="wait">
        {loading && !user && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-lg font-semibold text-gray-700">Connecting to JMDbase...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="min-h-screen gradient-bg">
        <Helmet>
          <title>JMSolutions - Your Technology Partner</title>
          <meta name="description" content="JMSolutions provides cutting-edge technology solutions for businesses. Discover our services, products, and expertise." />
        </Helmet>
        
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<DetailedService />} />
            <Route path="/more-services" element={<MoreServices />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/quotation" element={<Quotation />} />
            <Route path="/about" element={<About />} />
            <Route path="/vacancies" element={<Vacancies />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/client-project/:clientId" element={<ClientProject />} />
            <Route path="/dashboard" element={<PrivateRoute><UserDash /></PrivateRoute>} />
            <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
            <Route path="/sme-crm" element={<PrivateRoute><SMECrm /></PrivateRoute>} />
            <Route path="/crm-app" element={<PrivateRoute><CrmApp /></PrivateRoute>} />
            <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
            <Route path="/role-change" element={<PrivateRoute><RoleChange /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route path="/support" element={<PrivateRoute><Support /></PrivateRoute>} />
          </Routes>
        </main>
        
        <Toaster />
      </div>
    </Router>
  );
}

export default App;