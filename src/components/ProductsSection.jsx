import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const ProductsSection = ({ products }) => {
  const featuredProducts = products.slice(0, 6); 

  return (
    <section id="products" className="py-20 bg-custom">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-primary">Featured Products</h2>
          <p className="text-xl text-foreground max-w-3xl mx-auto">
            High-quality security and solar devices available for purchase across Tanzania
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.name}
              className="glass-effect rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 bg-background/30"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <img    
                class="w-full h-48 object-cover"
                alt={`${product.name} - ${product.description}`}
               src="https://images.unsplash.com/photo-1671376354106-d8d21e55dddd" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground">{product.name}</h3>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <Button 
                    asChild
                    className="pulse-glow bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Link to={`/inquire/${encodeURIComponent(product.name)}`}>Inquire Now</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {products.length > 6 && (
          <div className="text-center mt-16">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 pulse-glow">
              <Link to="/all-products">
                <ShoppingBag className="mr-2 h-5 w-5" />
                More Products...
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;