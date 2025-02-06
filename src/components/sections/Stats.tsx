"use client";

import { motion } from "framer-motion";

export function Stats() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-5 mb-5"
    >
      {[
        ["1000+", "Cases Resolved"],
        ["24/7", "Support Available"],
        ["98%", "Success Rate"],
        ["100%", "Confidential"],
      ].map(([stat, label]) => (
        <div key={label} className="text-center">
          <div 
            className="text-3xl font-bold mb-2" 
            style={{ color: '#0466c8' }} // True Blue for numbers
          >
            {stat}
          </div>
          <div 
            style={{ color: '#979dac' }} // Cool Gray for labels
          >
            {label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
