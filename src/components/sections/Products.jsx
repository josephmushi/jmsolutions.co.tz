import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Download, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import Breadcrumb from '@/components/Breadcrumb';
const Products = () => {
  const {
    toast
  } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const {
        data,
        error
      } = await supabase.from('products').select('*').order('created_at');
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error fetching products',
          description: error.message
        });
      } else {
        setProducts(data);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [toast]);
  const handleMoreProducts = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 4000
    });
  };
  return <section className="min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        <Breadcrumb />
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-shadow">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Products</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-xl">JMSolutions delivers a powerful suite of software products crafted to elevate your business through precision-tailored technology. Whether you're optimizing operations, enhancing customer engagement, or scaling sustainably, our solutions adapt to your unique goals—empowering you to lead with innovation, agility, and impact.</p>
          </motion.div>
          <motion.div className="flex justify-center items-center" initial={{
          opacity: 0,
          x: 30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            <div className="p-3 bg-white/30 rounded-2xl shadow-2xl backdrop-blur-md">
              <img class="w-[500px] h-[300px] object-cover rounded-xl shadow-lg" alt="Combo image of CCTV cameras, a DVR machine, and tools for fixing CCTV" src="https://horizons-cdn.hostinger.com/7cae5046-15e2-41d9-a00a-2e6dad7000c2/jmusers_dashboard-1-9lTrf.png" />
            </div>
          </motion.div>
        </div>

        {loading ? <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          </div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => <motion.div key={product.id} className="glass-effect rounded-2xl p-6 hover-lift flex flex-col" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: index * 0.1
        }}>
                <div className="mb-4 flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">{product.downloads}</span>
                    </div>
                  </div>
                </div>

                 <Link to={`/products/${product.product_id}`} className="group mt-auto text-blue-600 hover:text-purple-600 font-semibold inline-flex items-center transition-colors self-start">
                  Read More...
                  <ArrowRight className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>)}
          </div>}

        <motion.div className="text-center mt-16" initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.8
      }}>
          <Button onClick={handleMoreProducts} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg">
            More Products...
          </Button>
        </motion.div>
      </div>
    </section>;
};
export default Products;