import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const Support = () => {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 4000,
    });
  };

  return (
    <>
      <Helmet>
        <title>Support | JMSolutions</title>
        <meta name="description" content="Get help and support for your JMSolutions account." />
      </Helmet>
      <section className="min-h-screen flex items-center justify-center pt-8 pb-16">
        <motion.div
          className="max-w-md w-full mx-auto glass-effect rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Support Center</h1>
          <p className="text-gray-600 mb-6">This page is under construction. Our support center with FAQs and contact options will be available soon.</p>
          <Button onClick={showToast}>Get Help</Button>
        </motion.div>
      </section>
    </>
  );
};

export default Support;