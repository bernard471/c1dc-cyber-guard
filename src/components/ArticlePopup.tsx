import { motion } from 'framer-motion';
import { X, Link, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { ArticlePopupProps } from '../types/resources';

export const ArticlePopup = ({ content, onClose }: ArticlePopupProps) => {
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
                className="bg-[#002855] rounded-lg p-6 max-w-5xl w-full max-h-[80vh] overflow-y-auto border-t-4 border-[#0466c8]"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                        <AlertTriangle className="w-6 h-6 mr-2 text-yellow-400 animate-pulse" />
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
                    <div className="text-[#979dac] flex items-center gap-4 bg-[#001233] p-3 rounded-lg border-l-4 border-yellow-400">
                        <span>By {content.author}</span>
                        <span>|</span>
                        <span>{content.publishDate}</span>
                    </div>

                    <p className="text-[#979dac] text-lg">{content.introduction}</p>

                    {content.sections.map((section, index) => (
                        <div key={index} className="bg-[#001233] p-4 rounded-lg border-l-4 border-red-500">
                            <h3 className="text-white font-semibold mb-3 flex items-center">
                                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                                {section.title}
                            </h3>
                            <ul className="space-y-2 text-[#979dac]">
                                {section.content.map((point, idx) => (
                                    <li key={idx} className="flex items-start hover:bg-[#002855] p-2 rounded-lg transition-colors">
                                        <span className="mr-2 text-red-500">•</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="bg-[#001233] p-4 rounded-lg border-l-4 border-green-500">
                        <h3 className="text-white font-semibold mb-3 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            Tips for Mitigating Cyber Threats
                        </h3>
                        <ul className="space-y-2 text-[#979dac]">
                            {content.tips.map((tip, index) => (
                                <li key={index} className="flex items-start hover:bg-[#002855] p-2 rounded-lg transition-colors">
                                    <span className="mr-2 text-green-500">✓</span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-[#001233] p-4 rounded-lg border-l-4 border-yellow-400">
                        <h3 className="text-white font-semibold mb-3 flex items-center">
                            <Link className="w-5 h-5 text-yellow-400 mr-2" />
                            Learn More
                        </h3>
                        <ul className="space-y-2 text-[#979dac]">
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
