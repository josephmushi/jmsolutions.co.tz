import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Filter, Search, ShoppingCart } from 'lucide-react';

const LOGO_URL_ALL_PRODUCTS = "https://storage.googleapis.com/hostinger-horizons-assets-prod/ca2aaa45-7d53-480b-8775-3b2d1e94564d/ab11aa3a68340f873746b07770fb857d.jpg";

const AllProductsPage = ({ allProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'CCTV', 'Solar', 'Security Systems', 'Accessories'];

  const filteredProducts = allProducts
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product => 
      filterCategory === 'All' || (product.category && product.category === filterCategory)
    );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-custom">
      <Navbar companyName="JMSolutions" logoUrl={LOGO_URL_ALL_PRODUCTS} />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-center text-primary">Our Full Product Catalog</h1>
          <p className="text-xl text-foreground text-center mb-12 max-w-3xl mx-auto">
            Explore our wide range of CCTV, solar electronics, and security solutions.
          </p>

          <div className="mb-10 p-6 bg-card rounded-xl shadow-lg flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <div className="relative flex-grow w-full md:w-auto">
               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id || product.name}
                  className="glass-effect rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 bg-background/40 flex flex-col"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <img 
                    class="w-full h-56 object-cover"
                    alt={`${product.name} - ${product.description}`}
                   src="https://images.unsplash.com/photo-1646193186132-7976c1670e81" />
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-foreground">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3 flex-grow">{product.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-2xl font-bold text-primary">{product.price}</span>
                      <Button 
                        asChild
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Link to={`/inquire/${encodeURIComponent(product.name)}`}>
                          <ShoppingCart className="mr-2 h-4 w-4" /> Inquire
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <img  class="mx-auto mb-6 h-40 w-40 text-muted-foreground" alt="No products found illustration" src="https://images.unsplash.com/photo-1696744404432-d829841194f4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">No Products Found</h2>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </motion.div>
      </main>
      <Footer companyName="JMSolutions" logoUrl={LOGO_URL_ALL_PRODUCTS} />
    </div>
  );
};

export default AllProductsPage;