import { motion } from 'framer-motion';
import { X, AlertTriangle, Shield, Eye, AlertCircle } from 'lucide-react';
import { ScamPreventionPopupProps } from '../types/resources';

export const ScamPreventionPopup = ({ content, onClose }: ScamPreventionPopupProps) => {
    // Rest of your component code stays the same
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
                        <AlertTriangle className="w-6 h-6 mr-2 text-[#0466c8]" />
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

                    <div className="bg-[#001233] p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-4 flex items-center">
                            <Eye className="w-5 h-5 text-[#0466c8] mr-2" />
                            Common Scam Types
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {content.scamTypes.map((scam, index) => (
                                <div key={index} className="border border-[#0466c8]/20 rounded p-3">
                                    <h4 className="text-[#0466c8] font-semibold mb-1">{scam.name}</h4>
                                    <p className="text-[#979dac] text-sm">{scam.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#001233] p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-3 flex items-center">
                                <AlertCircle className="w-5 h-5 text-[#0466c8] mr-2" />
                                Red Flags to Watch
                            </h3>
                            <ul className="space-y-2 text-[#979dac]">
                                {content.redFlags.map((flag, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>{flag}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-[#001233] p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-3 flex items-center">
                                <Shield className="w-5 h-5 text-[#0466c8] mr-2" />
                                Protection Measures
                            </h3>
                            <ul className="space-y-2 text-[#979dac]">
                                {content.protectionMeasures.map((measure, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>{measure}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-[#001233] p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-3 flex items-center">
                            <AlertTriangle className="w-5 h-5 text-[#0466c8] mr-2" />
                            If You&apos;ve Been Scammed
                        </h3>
                        <ul className="space-y-2 text-[#979dac]">
                            {content.responseSteps.map((step, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="mr-2">{index + 1}.</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
