import { Shield, Users, Zap, CheckCircle } from 'lucide-react';
import { motion } from "framer-motion";

interface StatsCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  index: number;
}

const StatsCard = ({ label, value, icon: Icon, index }: StatsCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden bg-white p-6 rounded-lg shadow-lg group hover:shadow-xl transition-all duration-300"
    >
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        className="absolute -right-10 -top-16 w-32 h-32 bg-blue-500/30 rounded-full group-hover:scale-110 transition-transform" 
      />
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        className="absolute -left-8 -bottom-16 w-32 h-32 bg-blue-500/30 rounded-full group-hover:scale-110 transition-transform" 
      />
      <div className="flex items-center justify-between">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-8 h-8 text-blue-600 mb-4" />
        </motion.div>
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0.5 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-105 transition-transform"
          >
            {value}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
            className="text-gray-600"
          >
            {label}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const StatsSection = () => {
  const statsData = [
    { label: 'Cases Resolved', value: '1000+', icon: Shield },
    { label: 'Support Available', value: '24/7', icon: Users },
    { label: 'Response Time', value: '45s', icon: Zap },
    { label: 'Success Rate', value: '98%', icon: CheckCircle }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-5 bg-[#001233] backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};
