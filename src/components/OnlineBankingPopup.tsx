import { motion } from 'framer-motion';
import { X, Shield, Lock, Smartphone } from 'lucide-react';
import { OnlineBankingPopupProps } from '../types/resources';

export const OnlineBankingPopup = ({ content, onClose }: OnlineBankingPopupProps) => {
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
                className="bg-[#002855] rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-white">{content.title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-6">
                    <p className="text-[#979dac]">{content.mainDescription}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#001233] p-4 rounded-lg">
                            <div className="flex items-center mb-3">
                                <Shield className="w-5 h-5 text-[#0466c8] mr-2" />
                                <h3 className="text-white font-semibold">General Guidelines</h3>
                            </div>
                            <ul className="text-[#979dac] space-y-2">
                                {content.otpGuidelines.general.map((item, index) => (
                                    <li key={index} className="text-sm">{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-[#001233] p-4 rounded-lg">
                            <div className="flex items-center mb-3">
                                <Lock className="w-5 h-5 text-[#0466c8] mr-2" />
                                <h3 className="text-white font-semibold">Security Measures</h3>
                            </div>
                            <ul className="text-[#979dac] space-y-2">
                                {content.otpGuidelines.securityMeasures.map((item, index) => (
                                    <li key={index} className="text-sm">{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-[#001233] p-4 rounded-lg">
                            <div className="flex items-center mb-3">
                                <Smartphone className="w-5 h-5 text-[#0466c8] mr-2" />
                                <h3 className="text-white font-semibold">OTP Protection</h3>
                            </div>
                            <ul className="text-[#979dac] space-y-2">
                                {content.otpGuidelines.otpProtection.map((item, index) => (
                                    <li key={index} className="text-sm">{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-2">Best Practices</h3>
                        <ul className="list-disc list-inside text-[#979dac] space-y-1">
                            {content.bestPractices.map((practice, index) => (
                                <li key={index}>{practice}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-2">Recommended Tools</h3>
                        <ul className="list-disc list-inside text-[#979dac] space-y-1">
                            {content.tools.map((tool, index) => (
                                <li key={index}>{tool}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
