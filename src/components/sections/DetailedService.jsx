import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { getMockData } from '@/lib/mockData';
import { Helmet } from 'react-helmet';
import Breadcrumb from '@/components/Breadcrumb';

const DetailedService = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const { services } = getMockData();

    const service = services.find(s => s.id === serviceId);

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                 <Helmet>
                    <title>Service Not Found - JMSolutions</title>
                </Helmet>
                <h1 className="text-4xl font-bold text-red-500 mb-4">Service Not Found</h1>
                <p className="text-lg text-gray-700 mb-8">The service you are looking for does not exist.</p>
                <Button onClick={() => navigate('/services')}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
                </Button>
            </div>
        );
    }
    
    return (
        <>
            <Helmet>
                <title>{service.name} - JMSolutions Services</title>
                <meta name="description" content={service.shortDescription} />
            </Helmet>
            <section className="min-h-screen pt-8 pb-24 overflow-hidden">
                <div className="container mx-auto px-4">
                    
                    <Breadcrumb detailName={service.name} />

                    <div className="grid lg:grid-cols-5 gap-12">
                        <motion.div 
                            className="lg:col-span-3"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                {service.icon}
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-shadow">
                                    {service.name}
                                </h1>
                            </div>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                {service.longDescription}
                            </p>
                            
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2>
                            <ul className="space-y-3">
                                {service.features.map((feature, index) => (
                                    <motion.li 
                                        key={index}
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                    >
                                        {feature.icon}
                                        <span className="text-gray-700">{feature.text}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div 
                            className="lg:col-span-2"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                        >
                            <div className="sticky top-24">
                                <div className="glass-effect rounded-2xl p-6">
                                    <div className="p-3 bg-white/50 rounded-xl shadow-lg mb-6">
                                        <img class="w-[500px] h-[300px] object-cover rounded-lg" alt={service.image} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                                    </div>
                                    <Link to="/quotation">
                                        <Button size="lg" className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg hover-lift">
                                            <FileText className="mr-2 h-5 w-5" />
                                            Get a Quote
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DetailedService;