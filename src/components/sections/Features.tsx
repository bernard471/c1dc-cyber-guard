"use client";

import { Shield, Users, AlertTriangle, Clock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure Reporting",
    description: "Your reports are encrypted and handled with utmost confidentiality",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Expert Support",
    description: "Our team of cybersecurity experts is here to help",
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: "Quick Response",
    description: "Fast-track handling of urgent cybercrime cases",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "24/7 Availability",
    description: "Report incidents anytime, anywhere",
  },
];

export function Features() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
          <p className="text-muted-foreground">We provide comprehensive support for cybercrime victims</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary/10 p-4 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
