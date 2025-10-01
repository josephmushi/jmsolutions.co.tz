import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, ShoppingCart, Users, BarChart } from 'lucide-react';

const CrmApp = () => {
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
        <title>SME CRM Application | JMSolutions</title>
        <meta name="description" content="The main dashboard for the SME CRM application." />
      </Helmet>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <motion.div 
          className="w-64 bg-white shadow-md flex flex-col"
          initial={{ x: -256 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6 text-2xl font-bold text-gray-800 border-b">SME CRM</div>
          <nav className="flex-grow p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start text-lg" onClick={showToast}><LayoutDashboard className="mr-4" /> Dashboard</Button>
            <Button variant="ghost" className="w-full justify-start text-lg" onClick={showToast}><ShoppingCart className="mr-4" /> Sales</Button>
            <Button variant="ghost" className="w-full justify-start text-lg" onClick={showToast}><Users className="mr-4" /> Customers</Button>
            <Button variant="ghost" className="w-full justify-start text-lg" onClick={showToast}><BarChart className="mr-4" /> Reports</Button>
          </nav>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm p-4">
            <h1 className="text-2xl font-semibold text-gray-700">Dashboard</h1>
          </header>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Your CRM!</h2>
              <p className="text-gray-600 mb-8 text-xl">This is the beginning of your powerful new business tool. What would you like to build first?</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-xl mb-2">Manage Products</h3>
                  <p className="text-gray-600 mb-4">Add, edit, and track your product inventory.</p>
                  <Button onClick={showToast}>Build Product Manager</Button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-xl mb-2">Track Sales</h3>
                  <p className="text-gray-600 mb-4">Record new sales and view your sales history.</p>
                  <Button onClick={showToast}>Build Sales Tracker</Button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-xl mb-2">View Reports</h3>
                  <p className="text-gray-600 mb-4">Generate reports on sales, customers, and more.</p>
                  <Button onClick={showToast}>Build Reporting</Button>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
};

export default CrmApp;