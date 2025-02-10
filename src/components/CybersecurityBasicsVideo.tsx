import { motion } from 'framer-motion';
import { X, Play, Clock, ListChecks } from 'lucide-react';
import { VideoPopupProps } from '../types/resources';

export const CybersecurityBasicsVideo = ({ content, onClose }: VideoPopupProps) => {
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
                        <Play className="w-6 h-6 mr-2 text-[#0466c8]" />
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
                    <p className="text-[#979dac] text-lg">{content.description}</p>

                    <div className="aspect-video bg-[#001233] rounded-lg">
                        <iframe
                            src={content.videoUrl}
                            className="w-full h-[680px] rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>


                    <div className="flex items-center text-[#979dac]">
                        <Clock className="w-5 h-5 mr-2" />
                        Duration: {content.duration}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#001233] p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-3">Chapters</h3>
                            <ul className="space-y-2">
                                {content.chapters.map((chapter, index) => (
                                    <li key={index} className="text-[#979dac] flex justify-between">
                                        <span>{chapter.title}</span>
                                        <span className="text-[#0466c8]">{chapter.timestamp}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-[#001233] p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-3 flex items-center">
                                <ListChecks className="w-5 h-5 text-[#0466c8] mr-2" />
                                Key Takeaways
                            </h3>
                            <ul className="space-y-2 text-[#979dac]">
                                {content.keyTakeaways.map((takeaway, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>{takeaway}</span>
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
