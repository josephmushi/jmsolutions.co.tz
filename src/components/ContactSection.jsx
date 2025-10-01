import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const ContactSection = ({ handleContactSubmit }) => {
  return (
    <section id="contact" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to secure your property or go solar? Contact us for a free consultation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold">Phone</div>
                  <div className="text-muted-foreground">+255 767 583 682</div>
                  <div className="text-muted-foreground">+255 716 992 161</div>
                  <div className="text-muted-foreground">+255 754 557 744</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold">Email</div>
                  <div className="text-muted-foreground">info@jmsolutions.co.tz</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold">Location 1 (Dar es Salaam)</div>
                  <div className="text-muted-foreground">P. O. Box 34529</div>
                  <div className="text-muted-foreground">Kinondoni, Dar es Salaam</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold">Location 2 (Tabora)</div>
                  <div className="text-muted-foreground">P. O. Box 259</div>
                  <div className="text-muted-foreground">Kizota, Igunga, Tabora</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="space-y-6"
            onSubmit={handleContactSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input 
                  type="tel" 
                  className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none transition-colors"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Service Interest</label>
              <select className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none transition-colors">
                <option>CCTV Installation</option>
                <option>Solar Devices</option>
                <option>Security Systems</option>
                <option>Consultation</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea 
                rows="4" 
                className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none transition-colors"
                required
              ></textarea>
            </div>
            
            <Button type="submit" size="lg" className="w-full pulse-glow">
              Send Message
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;