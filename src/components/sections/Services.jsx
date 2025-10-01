import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Video, Sun, Zap, ClipboardCheck, MapPin, Settings, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import Breadcrumb from '@/components/Breadcrumb';

const Services = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('services').select('*').order('created_at');
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error fetching services',
          description: error.message
        });
      } else {
        setServices(data);
      }
      setLoading(false);
    };
    fetchServices();
  }, [toast]);

  const serviceIcons = {
    'Video': <Video className="w-10 h-10" />,
    'Sun': <Sun className="w-10 h-10" />,
    'Zap': <Zap className="w-10 h-10" />,
    'ClipboardCheck': <ClipboardCheck className="w-10 h-10" />,
    'MapPin': <MapPin className="w-10 h-10" />,
    'Settings': <Settings className="w-10 h-10" />
  };

  const serviceColors = [
    'text-blue-500',
    'text-yellow-500',
    'text-red-500',
    'text-purple-500',
    'text-green-500',
    'text-indigo-500',
  ];

  return (
    <section className="min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        <Breadcrumb />
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <motion.div className="text-left" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-shadow">
                    Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
                </h1>
                <p className="text-lg text-gray-700 max-w-xl">JMSolutions delivers smart, secure, and sustainable digital solutions designed to streamline operations, reduce overhead costs, and elevate profitability. By integrating energy-efficient technologies and carbon-conscious strategies, we empower businesses to thrive financially while contributing to a greener future, driving long-term impact through innovation and responsibility. Below are some of the solutions offered by our company for your consideration, Karibu!</p>
            </motion.div>
             <motion.div className="flex justify-center items-center" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <div className="p-3 bg-white/30 rounded-2xl shadow-2xl backdrop-blur-md">
                     <img className="w-[500px] h-[300px] object-cover rounded-xl shadow-lg" alt="JMSolutions staff working on troubleshooting a CCTV camera system" src="https://horizons-cdn.hostinger.com/7cae5046-15e2-41d9-a00a-2e6dad7000c2/jmsolutions-technicians-installing-cctv-cameras-UZRir.png" />
                </div>
            </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={service.id} 
                className="glass-effect rounded-2xl p-6 hover-lift flex flex-col" 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`mb-4 ${serviceColors[index % serviceColors.length]}`}>
                  {serviceIcons[service.icon] || <Settings className="w-10 h-10" />}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {service.name}
                </h3>
                
                <p className="text-gray-600 mb-4 flex-grow">
                  {service.short_description}
                </p>
                
                <Link to={`/services/${service.service_id}`} className="group mt-auto text-blue-600 hover:text-purple-600 font-semibold inline-flex items-center transition-colors">
                  Read More...
                  <ArrowRight className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div 
          className="text-center mt-16" 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.5 }}
        >
            <Button onClick={() => navigate('/more-services')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg">
              More Services...
            </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;