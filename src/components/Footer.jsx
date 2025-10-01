import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = ({ companyName, logoUrl }) => {
  return (
    <footer className="py-12 bg-custom border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 items-start text-foreground">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src={logoUrl} 
                alt={`${companyName} Logo`} 
                className="h-24 mr-3" 
                style={{ backgroundColor: 'transparent' }} 
              />
            </div>
            <p className="text-muted-foreground mb-4">
              Tanzania's trusted partner for security and solar solutions.
            </p>
            <div className="flex space-x-4">
              <a href="tel:+255767583682" className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors" aria-label="Call us">
                <Phone className="h-5 w-5" />
              </a>
              <a href="mailto:info@jmsolutions.co.tz" className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors" aria-label="Email us">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <span className="font-bold mb-4 block text-lg text-primary">Services</span>
            <ul className="space-y-2 text-muted-foreground">
              <li>CCTV Installation</li>
              <li>Security Systems</li>
              <li>Solar Electronics</li>
              <li>Smart Devices</li>
            </ul>
          </div>
          
          <div>
            <span className="font-bold mb-4 block text-lg text-primary">Products</span>
            <ul className="space-y-2 text-muted-foreground">
              <li>Security Cameras</li>
              <li>Solar Panels</li>
              <li>LED Lighting</li>
              <li>Power Banks</li>
            </ul>
          </div>
          
          <div>
            <span className="font-bold mb-4 block text-lg text-primary">Contact</span>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="tel:+255767583682" className="hover:text-primary">+255 767 583 682</a></li>
              <li><a href="tel:+255716992161" className="hover:text-primary">+255 716 992 161</a></li>
              <li><a href="tel:+255754557744" className="hover:text-primary">+255 754 557 744</a></li>
              <li><a href="mailto:info@jmsolutions.co.tz" className="hover:text-primary">info@jmsolutions.co.tz</a></li>
              <li className="mt-2">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary shrink-0" />
                  <span>P. O. Box 34529, Kinondoni, Dar es Salaam</span>
                </span>
              </li>
              <li>
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary shrink-0" />
                  <span>P. O. Box 259, Kizota, Igunga, Tabora</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;