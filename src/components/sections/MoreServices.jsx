import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Video, Sun, Zap, ClipboardCheck, MapPin, Settings, CheckCircle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

const serviceIcons = {
  'Video': <Video className="w-6 h-6" />,
  'Sun': <Sun className="w-6 h-6" />,
  'Zap': <Zap className="w-6 h-6" />,
  'ClipboardCheck': <ClipboardCheck className="w-6 h-6" />,
  'MapPin': <MapPin className="w-6 h-6" />,
  'Settings': <Settings className="w-6 h-6" />
};

const serviceColors = [
  'text-blue-500',
  'text-yellow-500',
  'text-red-500',
  'text-purple-500',
  'text-green-500',
  'text-indigo-500',
];

const MoreServices = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*, service_features(feature_text)')
        .order('created_at');
      
      if (error) {
        toast({ variant: 'destructive', title: 'Error fetching services', description: error.message });
      } else {
        setServices(data);
        if (data.length > 0) {
          setSelectedService(data[0]);
        }
      }
      setLoading(false);
    };
    fetchServices();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Our Services | JMSolutions</title>
        <meta name="description" content="Explore the detailed list of services offered by JMSolutions." />
      </Helmet>
      <section className="min-h-screen pt-8 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumb />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3 text-shadow-lg">
              Explore Our Solutions
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Click on a service to see how we can help your business grow and succeed.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Panel */}
            <motion.div 
              className="w-full md:w-1/4 lg:w-1/5 space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center gap-4 ${
                    selectedService?.id === service.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'hover:bg-gray-200/60'
                  }`}
                >
                  <span className={selectedService?.id === service.id ? 'text-white' : serviceColors[index % serviceColors.length]}>
                    {serviceIcons[service.icon] || <Settings className="w-6 h-6" />}
                  </span>
                  <span className="font-semibold">{service.name}</span>
                </button>
              ))}
            </motion.div>

            {/* Right Panel */}
            <motion.div 
              className="w-full md:w-3/4 lg:w-4/5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="glass-effect rounded-2xl p-8 h-full">
                <AnimatePresence mode="wait">
                  {selectedService && (
                    <motion.div
                      key={selectedService.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`p-3 rounded-full bg-gray-200/80 ${serviceColors[services.findIndex(s => s.id === selectedService.id) % serviceColors.length]}`}>
                          {React.cloneElement(serviceIcons[selectedService.icon] || <Settings />, { className: 'w-8 h-8' })}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">{selectedService.name}</h2>
                      </div>
                      <p className="text-gray-600 text-lg mb-6">{selectedService.long_description || selectedService.short_description}</p>
                      
                      {selectedService.service_features && selectedService.service_features.length > 0 && (
                        <div>
                          <h3 className="text-xl font-semibold text-gray-700 mb-4">Key Features:</h3>
                          <ul className="space-y-3">
                            {selectedService.service_features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{feature.feature_text}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MoreServices;