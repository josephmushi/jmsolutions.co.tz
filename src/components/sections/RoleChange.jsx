import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

const RoleChange = () => {
  const { toast } = useToast();
  const location = useLocation();
  const requestedRole = location.state?.requestedRole;

  const showToast = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 4000,
    });
  };

  return (
    <>
      <Helmet>
        <title>Request Role Change | JMSolutions</title>
        <meta name="description" content="Request a change to your user role at JMSolutions." />
      </Helmet>
      <section className="min-h-screen flex items-center justify-center pt-8 pb-16">
        <motion.div
          className="max-w-md w-full mx-auto glass-effect rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Request Role Change</h1>
          {requestedRole && <p className="text-lg text-gray-700 mb-4">You are requesting to change your role to: <span className="font-bold capitalize">{requestedRole}</span></p>}
          <p className="text-gray-600 mb-6">This page is under construction. You'll soon be able to submit and track role change requests here.</p>
          <Button onClick={showToast}>Submit Request</Button>
        </motion.div>
      </section>
    </>
  );
};

export default RoleChange;