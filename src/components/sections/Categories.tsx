"use client";

import { motion } from "framer-motion";

const cybercrimeCategories = [
  { name: "Momo Fraud", icon: "💳" },
  { name: "WhatsApp Hacks", icon: "📱" },
  { name: "Social Account Hacks", icon: "🔓" },
  { name: "Sextortion/Blackmail", icon: "⚠️" },
  { name: "Email Hacks", icon: "📧" },
  { name: "Tracking/Stalking", icon: "👁️" },
  { name: "Identity Theft", icon: "🎭" },
  { name: "Shopping Scams", icon: "🛍️" },
  { name: "Cryptocurrency Scams", icon: "₿" },
  { name: "Employment Scams", icon: "💼" },
  { name: "Financial Frauds", icon: "💰" },
  { name: "Other Fraud Activities", icon: "❗" },
];

export function Categories() {
  return (
    <section className="px-4 bg-[#001233] sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#0466c8' }}>
            Report Any Type of Cybercrime
          </h2>
          <p style={{ color: '#979dac' }} className="text-base sm:text-lg max-w-2xl mx-auto">
            We handle all types of cyber threats and digital crimes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {cybercrimeCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              style={{ 
                backgroundColor: '#002855',
                border: '2px solid #023e7d',
              }}
              className="p-4 sm:p-4 rounded-xl flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-4xl sm:text-3xl mb-1 transform transition-transform duration-300 hover:scale-110">
                {category.icon}
              </div>
              <h3 
                className="font-semibold text-center text-base sm:text-lg transform transition-transform duration-300 hover:scale-110"
                style={{ color: '#7d8597' }}
              >
                {category.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
