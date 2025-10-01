import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Star, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer';

const LOGO_URL_SHARE_TESTIMONY = "https://storage.googleapis.com/hostinger-horizons-assets-prod/ca2aaa45-7d53-480b-8775-3b2d1e94564d/ab11aa3a68340f873746b07770fb857d.jpg";


const ShareTestimonyPage = ({ addTestimonial }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !location || rating === 0 || !text) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all fields and provide a rating.",
        variant: "destructive",
      });
      return;
    }
    addTestimonial({ name, location, rating, text });
    toast({
      title: "Testimony Submitted!",
      description: "Thank you for your feedback! It will be reviewed shortly.",
    });
    navigate('/'); 
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar companyName="JMSolutions" logoUrl={LOGO_URL_SHARE_TESTIMONY} />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto bg-card p-8 rounded-xl shadow-2xl"
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-center text-primary">Share Your Experience</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1">Location (e.g., City, Region)</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-8 w-8 cursor-pointer transition-colors ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="testimony" className="block text-sm font-medium mb-1">Your Testimony</label>
              <textarea
                id="testimony"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows="5"
                className="w-full p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary outline-none transition-colors"
                required
              ></textarea>
            </div>
            <Button type="submit" size="lg" className="w-full pulse-glow">
              Submit Testimony <Send className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </motion.div>
      </main>
      <Footer companyName="JMSolutions" logoUrl={LOGO_URL_SHARE_TESTIMONY} />
    </div>
  );
};

export default ShareTestimonyPage;