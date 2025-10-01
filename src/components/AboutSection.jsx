import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Clock } from "lucide-react";

const AboutSection = ({ companyName }) => {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              About {companyName}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We are Tanzania's provider of solar-based security solutions,
              combining cutting-edge technology with local expertise to protect
              while power communities across the country.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  1000+
                </div>
                <div className="text-muted-foreground">Installations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Support</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <Award className="h-5 w-5 text-primary mr-2" />
                <span>Certified Technicians</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-primary mr-2" />
                <span>Local Team</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <span>Quick Response</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              alt={`${companyName} team installing solar panels in Tanzania`}
              src="https://images.unsplash.com/photo-1692578919818-8418a9390759"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
