import { motion } from 'framer-motion';
import { X, Shield, Users, Link, CheckCircle, AlertTriangle } from 'lucide-react';
import { DigitalHygienePopupProps } from '../types/resources';

export const DigitalHygienePopup = ({ content, onClose }: DigitalHygienePopupProps) => {
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Critical': return 'text-red-500 border-red-500';
            case 'High': return 'text-yellow-500 border-yellow-500';
            case 'Medium': return 'text-blue-500 border-blue-500';
            default: return 'text-green-500 border-green-500';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#002855] rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                        <Shield className="w-6 h-6 mr-2 text-blue-400 animate-pulse" />
                        {content.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#001233] p-4 rounded-lg border-l-4 border-blue-500">
                        <div className="text-[#979dac] flex items-center gap-4">
                            <span>By {content.author}</span>
                            <span>|</span>
                            <span>{content.publishDate}</span>
                        </div>
                        <p className="text-[#979dac] mt-4">{content.introduction}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {content.practices.map((practice, index) => (
                            <div 
                                key={index} 
                                className={`bg-[#001233] p-4 rounded-lg border-l-4 ${getPriorityColor(practice.priority)}`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-white font-semibold">{practice.title}</h3>
                                    <span className={`px-2 py-1 rounded text-sm ${getPriorityColor(practice.priority)}`}>
                                        {practice.priority}
                                    </span>
                                </div>
                                <ul className="space-y-2">
                                    {practice.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-start text-[#979dac]">
                                            <CheckCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[#001233] p-4 rounded-lg border-l-4 border-green-500">
                        <h3 className="text-white font-semibold mb-3 flex items-center">
                            <Users className="w-5 h-5 text-green-500 mr-2" />
                            Family Guidelines
                        </h3>
                        <ul className="space-y-2">
                            {content.familyGuidelines.map((guideline, index) => (
                                <li key={index} className="flex items-start text-[#979dac]">
                                    <AlertTriangle className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-green-500" />
                                    <span>{guideline}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-[#001233] p-4 rounded-lg border-l-4 border-yellow-400">
                        <h3 className="text-white font-semibold mb-3 flex items-center">
                            <Link className="w-5 h-5 text-yellow-400 mr-2" />
                            Learn More
                        </h3>
                        <ul className="space-y-2">
                            {content.references.map((ref, index) => (
                                <li key={index} className="hover:bg-[#002855] p-2 rounded-lg transition-colors">
                                    <a 
                                        href={ref.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#0466c8] hover:text-yellow-400 transition-colors flex items-center"
                                    >
                                        <span className="mr-2">→</span>
                                        {ref.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
