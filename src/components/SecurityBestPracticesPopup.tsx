import { motion } from 'framer-motion';
import { X, Shield, AlertCircle, CheckCircle, Link, ArrowRight } from 'lucide-react';
import { SecurityBestPracticesPopupProps } from '../types/resources';

export const SecurityBestPracticesPopup = ({ content, onClose }: SecurityBestPracticesPopupProps) => {
    const getImportanceColor = (importance: string) => {
        switch (importance) {
            case 'Critical': return 'text-red-500';
            case 'High': return 'text-yellow-500';
            case 'Medium': return 'text-blue-500';
            default: return 'text-green-500';
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
                className="bg-[#002855] rounded-lg p-6 max-w-6xl w-full max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                        <Shield className="w-6 h-6 mr-2 text-green-400 animate-pulse" />
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
                    <div className="bg-[#001233] p-4 rounded-lg border-l-4 border-green-500">
                        <div className="text-[#979dac] flex items-center gap-4">
                            <span>By {content.author}</span>
                            <span>|</span>
                            <span>{content.publishDate}</span>
                        </div>
                        <p className="text-[#979dac] mt-4">{content.introduction}</p>
                    </div>

                    {content.sections.map((section, index) => (
                        <div key={index} className="bg-[#001233] p-4 rounded-lg border-l-4 border-blue-500">
                            <h3 className="text-white font-semibold mb-3 flex items-center">
                                <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />
                                {section.title}
                            </h3>
                            <ul className="space-y-2">
                                {section.content.map((point, idx) => (
                                    <li key={idx} className="flex items-start text-[#979dac] hover:bg-[#002855] p-2 rounded-lg transition-colors">
                                        <ArrowRight className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-blue-500" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {content.bestPracticeDetails.map((practice, index) => (
                            <div key={index} className="bg-[#001233] p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-white font-semibold">{practice.practice}</h4>
                                    <span className={`px-2 py-1 rounded text-sm ${getImportanceColor(practice.importance)}`}>
                                        {practice.importance}
                                    </span>
                                </div>
                                <p className="text-[#979dac]">{practice.description}</p>
                            </div>
                        ))}
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
                                        <AlertCircle className="w-4 h-4 mr-2" />
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
