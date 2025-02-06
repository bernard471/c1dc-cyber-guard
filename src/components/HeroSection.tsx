import { AlertTriangle, ArrowRight, CheckCircle, Radio, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

const PulsingRings = () => {
    return (
      <div className="relative">
        <div className="absolute -inset-4 opacity-75">
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-cyan-300 blur-lg animate-pulse" />
        </div>
      </div>
    );
  };


  const ThreatRadare = () => {
    interface Dot {
      id: number;
      x: number;
      y: number;
      type: 'threat' | 'safe';
    }
    
    const [dots, setDots] = useState<Dot[]>([]);
   
    useEffect(() => {
      const interval = setInterval(() => {
        setDots(prev => {
          const newDots = [...prev];
          if (newDots.length > 15) newDots.shift();
          newDots.push({
            id: Date.now(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            type: Math.random() > 0.5 ? 'threat' : 'safe'
          });
          return newDots;
        });
      }, 1000);
     
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="relative h-48 bg-black rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-ping" />
          {dots.map(dot => (
            <div
              key={dot.id}
              className={`absolute w-2 h-2 rounded-full ${
                dot.type === 'threat' ? 'bg-red-500' : 'bg-green-500'
              } animate-pulse`}
              style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Radio className="w-12 h-12 text-blue-500 animate-spin" style={{ animationDuration: '2s' }} />
        </div>
      </div>
    );
  };

   // Live Security Feed
   const SecurityFeed = () => {
    interface Activity {
      id: number;
      event: string;
      status: string;
      timestamp: string;
    }
    
    const [activities, setActivities] = useState<Activity[]>([]);
     
      useEffect(() => {
        const events = [
          'WhatappHack Resolved',
          'MomoFraud Detected',
          'Identity Theft Detected',
          'Email Hack Detected',
          'ShoppingScam Resolved'
        ];
       
        const interval = setInterval(() => {
          setActivities(prev => {
            const newActivities = [...prev];
            if (newActivities.length > 4) newActivities.shift();
            newActivities.push({
              id: Date.now(),
              event: events[Math.floor(Math.random() * events.length)],
              status: Math.random() > 0.8 ? 'warning' : 'success',
              timestamp: new Date().toLocaleTimeString()
            });
            return newActivities;
          });
        }, 2000);
       
        return () => clearInterval(interval);
      }, []);
    
      return (
        <div className="bg-gray-900 p-4 rounded-lg space-y-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Live Security Feed</h3>
            <Terminal className="w-4 h-4 text-blue-500" />
          </div>
          {activities.map(activity => (
            <div
              key={activity.id}
              className="flex items-center space-x-3 text-sm animate-fade-in"
            >
              {activity.status === 'warning' ? (
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
              ) : (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
              <span className="text-gray-400">{activity.timestamp}</span>
              <span className="text-white">{activity.event}</span>
            </div>
          ))}
        </div>
      );
    };
  

export const HeroSection = () => {
  return (
<section className="relative pt-32 pb-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:gap-12 lg:flex-row items-center justify-between">
    <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-full lg:w-1/2 mb-10 lg:mb-0 relative"
          >     
<motion.h1 
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-9xl md:text-9xl text-center font-bold text-white leading-tight mb-6"
            >                     👮‍♂️
                  </motion.h1>
            <PulsingRings />
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl tracking-tight font-extrabold text-white md:text-center sm:text-5xl md:text-5xl"
            >
                  <span className="block ">Report Cybercrime</span>
                  <span className="block font-serif text-[#0466c8]">Protect Your Digital Life</span>
                  </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-3 text-base text-white md:text-center sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 mb-10 md:text-xl lg:mx-0"
            >
              Take action against cyber threats. Our platform provides a secure way to report cybercrimes and get immediate assistance from experts.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }} className="flex flex-col md:justify-center sm:flex-row gap-4">
                    <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 flex items-center justify-center group">
                      Report Incident
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400/10">
                      Learn More
                    </button>
                    </motion.div>
                    </motion.div>
               
                 <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-full lg:w-1/2"
          >
            <motion.div 
              initial={{ scale: 0.65 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-gray-700"
            >
                    <ThreatRadare />
                    <SecurityFeed />
                   
                    
                             </motion.div>
                             </motion.div>
                             
              </div>
             
            </div>
          </section>
    
         
  );
};
