import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Breadcrumb from '@/components/Breadcrumb';

const ClientsPartners = () => {
  const { toast } = useToast();

  const handleBecomePartner = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 4000,
    });
  };

  const clients = [
    {
      name: "TechCorp Industries",
      logo: "TC",
      industry: "Manufacturing",
      project: "Enterprise Resource Planning System",
      result: "40% increase in operational efficiency"
    },
    {
      name: "Global Finance Solutions",
      logo: "GFS",
      industry: "Financial Services",
      project: "Digital Banking Platform",
      result: "2M+ users onboarded successfully"
    },
    {
      name: "HealthCare Plus",
      logo: "HC+",
      industry: "Healthcare",
      project: "Patient Management System",
      result: "60% reduction in administrative tasks"
    },
    {
      name: "EduTech Academy",
      logo: "ETA",
      industry: "Education",
      project: "Learning Management Platform",
      result: "500K+ students engaged globally"
    },
    {
      name: "RetailMax Chain",
      logo: "RM",
      industry: "Retail",
      project: "E-commerce & Inventory System",
      result: "300% growth in online sales"
    },
    {
      name: "GreenEnergy Corp",
      logo: "GE",
      industry: "Energy",
      project: "Smart Grid Management",
      result: "25% improvement in energy efficiency"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechCorp Industries",
      role: "CTO",
      rating: 5,
      text: "JM Solutions transformed our entire operation. Their expertise and dedication to our success was evident from day one. The ERP system they built has revolutionized how we work."
    },
    {
      name: "Michael Chen",
      company: "Global Finance Solutions",
      role: "Head of Digital Innovation",
      rating: 5,
      text: "Working with JM Solutions was a game-changer. They delivered a robust, secure banking platform that exceeded our expectations and helped us reach millions of users."
    },
    {
      name: "Dr. Emily Rodriguez",
      company: "HealthCare Plus",
      role: "Chief Medical Officer",
      rating: 5,
      text: "The patient management system has streamlined our operations significantly. JM Solutions understood our complex requirements and delivered a solution that truly works."
    }
  ];

  const partners = [
    {
      name: "Microsoft",
      type: "Technology Partner",
      description: "Certified Azure solutions provider"
    },
    {
      name: "Amazon Web Services",
      type: "Cloud Partner",
      description: "Advanced consulting partner"
    },
    {
      name: "Google Cloud",
      type: "Technology Partner",
      description: "Premier partner for cloud solutions"
    },
    {
      name: "Salesforce",
      type: "Implementation Partner",
      description: "Certified implementation specialist"
    }
  ];

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
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Clients & Partners</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We're proud to work with industry leaders and innovative companies across various sectors, delivering exceptional results together.
          </p>
        </motion.div>

        {/* Clients Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Clients</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client, index) => (
              <div key={index} className="glass-effect rounded-2xl p-6 hover-lift">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {client.logo}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.industry}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <h4 className="font-medium text-gray-800 mb-1">Project:</h4>
                  <p className="text-gray-600 text-sm">{client.project}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="font-medium text-green-800 mb-1">Result:</h4>
                  <p className="text-green-700 text-sm font-medium">{client.result}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-effect rounded-2xl p-6 hover-lift">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-blue-600 mr-3" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-blue-600">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Partners Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Technology Partners</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="glass-effect rounded-2xl p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {partner.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{partner.name}</h3>
                <p className="text-blue-600 font-medium text-sm mb-2">{partner.type}</p>
                <p className="text-gray-600 text-sm">{partner.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-gray-700 mb-6">
              Whether you're looking to transform your business or explore partnership opportunities, 
              we'd love to discuss how we can work together to achieve extraordinary results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleBecomePartner}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg"
              >
                Start Your Project
              </Button>
              <Button 
                onClick={handleBecomePartner}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 text-lg font-semibold rounded-full"
              >
                Become a Partner
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsPartners;