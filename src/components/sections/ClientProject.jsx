import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import Breadcrumb from '@/components/Breadcrumb';
import { Loader2, ArrowLeft, CheckCircle, Clock, BarChart2, Users, Target, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ClientProject = () => {
  const { clientId } = useParams();
  const { toast } = useToast();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientProject = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', clientId)
        .single();

      if (error || !data) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load project details. Please try again.",
        });
      } else {
        setClient(data);
      }
      setLoading(false);
    };

    fetchClientProject();
  }, [clientId, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">Project Not Found</h1>
        <p className="text-gray-500 mb-8">The project you are looking for does not exist.</p>
        <Link to="/about">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to About Us
          </Button>
        </Link>
      </div>
    );
  }

  const projectProgress = Math.floor(Math.random() * (95 - 60 + 1) + 60);
  const milestones = [
    { name: 'Project Kick-off', completed: true },
    { name: 'Requirement Gathering', completed: true },
    { name: 'UI/UX Design', completed: true },
    { name: 'Development Phase 1', completed: true },
    { name: 'Development Phase 2', completed: projectProgress > 75 },
    { name: 'Testing & QA', completed: projectProgress > 90 },
    { name: 'Deployment', completed: false },
  ];

  return (
    <section className="min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        <Breadcrumb />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
              {client.logo_text}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">{client.name}</h1>
              <p className="text-lg text-gray-600">{client.industry}</p>
            </div>
          </div>

          <Card className="mb-8 glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Briefcase className="w-7 h-7 text-blue-600" />
                Project Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-lg">{client.project_description}</p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl"><BarChart2 className="w-6 h-6 text-blue-600" />Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${projectProgress}%` }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </div>
                <p className="text-center text-2xl font-bold text-gray-800 mt-3">{projectProgress}%</p>
              </CardContent>
            </Card>
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl"><Target className="w-6 h-6 text-blue-600" />Key Result</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 text-lg font-semibold bg-green-100 p-4 rounded-lg">{client.result_highlight}</p>
              </CardContent>
            </Card>
             <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl"><Users className="w-6 h-6 text-blue-600" />Client Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Registered users can log in to view their detailed dashboard.</p>
                <Link to="/login">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Login to Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Clock className="w-7 h-7 text-blue-600" />
                Project Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {milestone.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    ) : (
                      <Clock className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    )}
                    <p className={`text-lg ${milestone.completed ? 'text-gray-800' : 'text-gray-500'}`}>
                      {milestone.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientProject;