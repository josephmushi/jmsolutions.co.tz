import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck, Zap, ArrowRight, Video, Sun } from "lucide-react";

const HeroSection = ({ companyName }) => {
  return (
    <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden hero-pattern min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/30 opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h4
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-shadow"
              style={{
                background:
                  "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Secure Your Future with <br className="hidden md:block" />{" "}
              {companyName}
            </motion.h4>
            <p className="text-xl md:text-2xl text-foreground max-w-xl mx-auto lg:mx-0 mb-12">
              Leading CCTV & Solar Electronics solutions in Tanzania.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="pulse-glow bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl"
                >
                  <Link to="/all-products">
                    Explore Products <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-primary border-primary hover:bg-primary hover:text-primary-foreground shadow-xl"
                >
                  <Link to="/proforma-invoice">
                    Get Free Quote <ShieldCheck className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="hidden lg:flex flex-col items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 1, -1, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="w-full max-w-lg p-2 bg-card/50 backdrop-blur-sm rounded-2xl shadow-2xl"
            >
              <img
                className="w-full h-auto object-contain rounded-xl"
                alt="Professionals installing CCTV cameras"
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/ca2aaa45-7d53-480b-8775-3b2d1e94564d/dc7fd06698b1c885ce5c2d6e9c91ed00.png"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {[
            {
              icon: Video,
              title: "Trusted Security",
              desc: "Advanced CCTV and alarm systems.",
            },
            {
              icon: Sun,
              title: "Solar Power",
              desc: "Efficient and sustainable solar solutions.",
            },
            {
              icon: Zap,
              title: "Expert Installation",
              desc: "Professional setup and support.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="glass-effect p-6 rounded-xl text-center bg-card/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
            >
              <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
