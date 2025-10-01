import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TestimonialsSection = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerPage = 3; 
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const nextTestimonials = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevTestimonials = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };
  
  const getVisibleTestimonials = () => {
    const start = currentIndex * testimonialsPerPage;
    const end = start + testimonialsPerPage;
    return testimonials.slice(start, end);
  };

  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-20 bg-custom">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl text-foreground">No testimonials yet. Be the first to share your experience!</p>
          <Link to="/share-testimony">
            <Button variant="outline" size="lg" className="mt-8 pulse-glow text-primary border-primary hover:bg-primary hover:text-primary-foreground">
              <Edit3 className="mr-2 h-5 w-5" /> Share Your Testimony
            </Button>
          </Link>
        </div>
      </section>
    );
  }


  return (
    <section className="py-20 bg-custom">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-primary">What Our Clients Say</h2>
          <p className="text-xl text-foreground max-w-3xl mx-auto">
            Trusted by hundreds of satisfied customers across Tanzania
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8 overflow-hidden">
            <AnimatePresence mode="wait">
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={`${currentIndex}-${testimonial.name}`}
                  className="glass-effect rounded-2xl p-6 flex flex-col bg-background/30"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 flex-grow">"{testimonial.text}"</p>
                  <div>
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {totalPages > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-4 z-10 bg-card hover:bg-primary hover:text-primary-foreground"
                onClick={prevTestimonials}
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-4 z-10 bg-card hover:bg-primary hover:text-primary-foreground"
                onClick={nextTestimonials}
                aria-label="Next testimonials"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>
        <div className="text-center mt-12">
          <Link to="/share-testimony">
            <Button variant="outline" size="lg" className="pulse-glow text-primary border-primary hover:bg-primary hover:text-primary-foreground">
              <Edit3 className="mr-2 h-5 w-5" /> Share Your Testimony
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;