import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, BarChart2, DollarSign, Users, Truck, Smartphone, Settings, CreditCard, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: 'Sales Management',
    description: 'Track sales, manage orders, and generate invoices with ease.',
    color: 'text-blue-500',
    demo: 'Sales Dashboard showing charts and recent orders.'
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: 'Inventory Control',
    description: 'Keep track of stock levels and get low-stock alerts.',
    color: 'text-green-500',
    demo: 'Inventory list with stock levels, product images, and statuses.'
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: 'Financial Tracking',
    description: 'Monitor revenue, costs, and overall financial health.',
    color: 'text-yellow-500',
    demo: 'Financial report with income statements and expense tracking.'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Customer Relations',
    description: 'Manage customer data and track interactions.',
    color: 'text-purple-500',
    demo: 'Customer database with contact info and purchase history.'
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: 'Partner Management',
    description: 'Collaborate with partners and track referrals.',
    color: 'text-red-500',
    demo: 'Partner portal showing referral stats and commission payouts.'
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Mobile Banking',
    description: 'Integrate with mobile payment gateways.',
    color: 'text-indigo-500',
    demo: 'Mobile payment integration settings and transaction logs.'
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: 'POS Integration',
    description: 'Connect with common Point-of-Sale devices.',
    color: 'text-pink-500',
    demo: 'POS device connection status and synchronization options.'
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: 'API Access',
    description: 'Utilize our robust APIs for third-party services.',
    color: 'text-cyan-500',
    demo: 'API documentation and key management interface.'
  },
];

const SMECrm = () => {
  const [selectedFeature, setSelectedFeature] = useState(features[0]);
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>SME CRM - Business Management Suite | JMSolutions</title>
        <meta name="description" content="A powerful, all-in-one CRM and business management tool for micro, small, and medium entrepreneurs in emerging economies." />
      </Helmet>
      <section className="min-h-screen flex flex-col">
        <div className="container mx-auto px-4 pt-8 pb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3 text-shadow-lg">
                Empower Your Business with SME CRM
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                The all-in-one solution for growing economies. Manage sales, inventory, finances, and more.
              </p>
            </motion.div>
        </div>

        <div className="flex-grow container mx-auto px-4 pb-16 flex flex-col md:flex-row gap-8">
          {/* Left Panel */}
          <motion.div 
            className="w-full md:w-1/4 lg:w-1/5 space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {features.map((feature) => (
              <button
                key={feature.title}
                onClick={() => setSelectedFeature(feature)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center gap-4 ${
                  selectedFeature.title === feature.title
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'hover:bg-gray-200/60'
                }`}
              >
                <span className={selectedFeature.title === feature.title ? 'text-white' : feature.color}>{feature.icon}</span>
                <span className="font-semibold">{feature.title}</span>
              </button>
            ))}
             <div className="pt-6">
                <Button size="lg" className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white" onClick={() => navigate('/crm-app')}>
                  Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
          </motion.div>

          {/* Right Panel */}
          <motion.div 
            className="w-full md:w-3/4 lg:w-4/5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-effect rounded-2xl p-8 h-full flex flex-col justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFeature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className={`inline-flex p-4 rounded-full bg-gray-200/80 mb-6 ${selectedFeature.color}`}>
                    {React.cloneElement(selectedFeature.icon, { className: 'w-12 h-12' })}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">{selectedFeature.title}</h2>
                  <p className="text-gray-600 text-lg max-w-xl mx-auto mb-6">{selectedFeature.description}</p>
                  <div className="bg-gray-100 border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">System Demo</h3>
                    <p className="text-gray-500">{selectedFeature.demo}</p>
                    <div className="mt-4 h-48 w-full bg-gray-200 rounded-md flex items-center justify-center">
                      <p className="text-gray-400">Visual representation of the feature</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SMECrm;