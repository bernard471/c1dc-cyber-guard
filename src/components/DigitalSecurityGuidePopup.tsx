import { motion } from 'framer-motion';
import { X, BookOpen, Shield, HardHat } from 'lucide-react';
import { DigitalSecurityGuideProps } from '../types/resources';

export const DigitalSecurityGuidePopup = ({ content, onClose }: DigitalSecurityGuideProps) => {
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
                        <BookOpen className="w-6 h-6 mr-2" />
                        {content.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-6">
                    <p className="text-[#979dac] text-lg">{content.introduction}</p>

                    <div className="space-y-8">
                        {content.chapters.map((chapter, index) => (
                            <div key={index} className="bg-[#001233] p-4 rounded-lg">
                                <h3 className="text-white font-semibold text-xl mb-3 flex items-center">
                                    <Shield className="w-5 h-5 text-[#0466c8] mr-2" />
                                    {chapter.title}
                                </h3>
                                <ul className="space-y-2 text-[#979dac]">
                                    {chapter.content.map((point, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#001233] p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-3 flex items-center">
                                <Shield className="w-5 h-5 text-[#0466c8] mr-2" />
                                Key Recommendations
                            </h3>
                            <ul className="space-y-2 text-[#979dac]">
                                {content.recommendations.map((rec, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>{rec}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-[#001233] p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-3 flex items-center">
                                <HardHat className="w-5 h-5 text-[#0466c8] mr-2" />
                                Recommended Tools
                            </h3>
                            <ul className="space-y-2 text-[#979dac]">
                                {content.tools.map((tool, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>{tool}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
