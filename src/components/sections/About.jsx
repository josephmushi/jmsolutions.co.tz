import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Breadcrumb from '@/components/Breadcrumb';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, ArrowRight, Briefcase, MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
const About = () => {
  const {
    toast
  } = useToast();
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);
  useEffect(() => {
    const fetchClients = async () => {
      setLoadingClients(true);
      const {
        data,
        error
      } = await supabase.from('clients').select('id, name, logo_text, industry, project_description, location, viewstatus').eq('viewstatus', true).limit(6);
      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching clients",
          description: "Could not load client information. Please try again later."
        });
      } else {
        setClients(data);
      }
      setLoadingClients(false);
    };
    fetchClients();
  }, [toast]);
  
  const partners = [{
    name: "Microsoft",
    type: "Technology Partner",
    description: "Certified Azure solutions provider"
  }, {
    name: "Amazon Web Services",
    type: "Cloud Partner",
    description: "Advanced consulting partner"
  }, {
    name: "Google Cloud",
    type: "Technology Partner",
    description: "Premier partner for cloud solutions"
  }, {
    name: "Salesforce",
    type: "Implementation Partner",
    description: "Certified implementation specialist"
  }];
  return <section className="min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        <Breadcrumb />
        
        <motion.div className="my-16" initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-shadow">
                About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">JMSolution</span>
              </h1>
              <p className="text-gray-700 mb-4">Founded in 2022, JMSolutions began as a small digital branding project with a vision of "helping businesses harness the power of technology to achieve their goals". What started as a passion project has grown into a trusted technology partner.</p>
              <p className="text-gray-700 mb-6">Today, we combine technical expertise with business understanding to deliver solutions that not only meet current needs but also prepare our clients for future challenges and opportunities in the digital landscape.</p>
              <Link to="/vacancies">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full">
                  Join Our Team
                </Button>
              </Link>
            </div>
            <div className="p-3 bg-white/30 rounded-2xl shadow-2xl backdrop-blur-md w-[500px] h-[300px]">
              <img className="rounded-xl shadow-lg object-cover w-full h-full" alt="Fancy office space with innovative cubicles and African decent staff working on laptops" src="https://images.unsplash.com/photo-1594732832278-abd644401426" />
            </div>
          </div>
        </motion.div>

        <motion.div className="mb-20" initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.6
      }}>
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Clients</h2>
          {loadingClients ? <div className="flex justify-center items-center h-40">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            </div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clients.map((client, index) => <motion.div key={client.id} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }}>
                  <Card className="bg-white/60 backdrop-blur-sm border-gray-200/80 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                    <CardHeader className="flex-row items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        {client.logo_text}
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-800">{client.name}</CardTitle>
                        <p className="text-sm text-gray-600">{client.industry}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex items-start gap-3 mb-3">
                        <Briefcase className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                        <p className="text-gray-700 text-sm">{client.project_description}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{client.location || 'Not specified'}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <Link to={`/client-project/${client.id}`}>
                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          View Project <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                      <Link to="/login">
                        <Button size="sm" className="bg-gray-700 hover:bg-gray-800 text-white rounded-full">
                          Client Login
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>)}
            </div>}
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.8
      }}>
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Technology Partners</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner, index) => <div key={index} className="glass-effect rounded-2xl p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {partner.name ? partner.name.charAt(0) : ''}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{partner.name}</h3>
                <p className="text-blue-600 font-medium text-sm mb-2">{partner.type}</p>
                <p className="text-gray-600 text-sm">{partner.description}</p>
              </div>)}
          </div>
        </motion.div>
      </div>
    </section>;
};
export default About;