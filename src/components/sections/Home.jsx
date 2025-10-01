import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FileText, ShoppingCart, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const handleButtonClick = path => {
    if (path) {
      navigate(path);
    } else {
      toast({
        title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
        duration: 4000
      });
    }
  };
  return <section className="h-[calc(92vh-6rem)] flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 h-full">
        <div className="grid md:grid-cols-2 gap-8 items-center h-full">
          
          <motion.div className="text-left" initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 text-shadow">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                JMSolutions
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-lg">Leading Digital Security & Solar-based Street-lights Solutions in Tanzania that Guarantee Effective & Affordable Protection of Neighborhoods, Public and Private Premises Across the Country. Our Systems Operate on Clean, Renewable Energy, Helping Communities Reduce Energy Bills and Carbon Emissions for Long-term Impact.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => handleButtonClick('/services')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base font-semibold rounded-full shadow-lg hover-lift">
                <Info className="mr-2 w-5 h-5" />
                Services
              </Button>
              <Button onClick={() => handleButtonClick('/products')} variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-6 py-3 text-base font-semibold rounded-full shadow-lg hover-lift">
                <ShoppingCart className="mr-2 w-5 h-5" />
                Products
              </Button>
              <Button onClick={() => handleButtonClick('/quotation')} className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-3 text-base font-semibold rounded-full shadow-lg hover-lift">
                <FileText className="mr-2 w-5 h-5" />
                Get Quote
              </Button>
            </div>
          </motion.div>

          
          <div className="relative w-full h-full flex items-center justify-center">
             <motion.div className="w-full max-w-md" initial={{
            opacity: 0,
            scale: 0.8,
            rotate: -10
          }} animate={{
            opacity: 1,
            scale: 1,
            rotate: 3
          }} transition={{
            type: 'spring',
            stiffness: 100,
            damping: 10,
            delay: 0.2
          }}>
                <div className="p-4 bg-white/30 rounded-2xl shadow-2xl backdrop-blur-md transform transition-transform duration-300 hover:scale-105">
                     <img class="w-full object-contain rounded-xl shadow-lg" alt="Technicians installing CCTV security cameras on a modern building exterior" src="https://horizons-cdn.hostinger.com/7cae5046-15e2-41d9-a00a-2e6dad7000c2/jmfense02-Q97jM.png" />
                </div>
              </motion.div>
          </div>
        </div>
      </div>
    </section>;
};
export default Home;