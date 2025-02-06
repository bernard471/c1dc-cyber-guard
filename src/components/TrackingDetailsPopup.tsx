import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, AlertCircle, Clock, Phone, User, FileText } from 'lucide-react';

interface CaseDetails {
  _id: string;
  caseNumber: string;
  name: string;
  contact: string;
  severity: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  };
  status: string;
  statusMessage: string;
  createdAt: string;
  updatedAt: string;
}

interface TrackingDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  caseDetails: CaseDetails | null;
}

export const TrackingDetailsPopup = ({ isOpen, onClose, caseDetails }: TrackingDetailsPopupProps) => {
  if (!isOpen || !caseDetails) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'under_review':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'in_progress':
        return 'bg-blue-500/10 text-blue-500';
      case 'resolved':
        return 'bg-green-500/10 text-green-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'text-red-500';
      case 'high':
        return 'text-orange-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-gray-800/95 rounded-xl p-6 max-w-2xl w-full relative shadow-xl border border-gray-700"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-12 text-gray-400 hover:text-white transition-colors"
        >
          <X size={30} />
        </button>

        <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Case Details</h2>
            <p className="text-gray-400 text-sm">Tracking information for your case</p>
          </div>

          <div className="grid gap-6">
            <div className="space-y-1">
              <p className="text-gray-400 text-sm">Case Number</p>
              <p className="text-white font-medium tracking-wide">{caseDetails.caseNumber}</p>
            </div>

            <div className="flex items-start gap-4 border-t border-gray-700 pt-2">
              <div className="flex-1 space-y-1">
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <User size={16} />
                  Reported By
                </p>
                <p className="text-white">{caseDetails.name}</p>
              </div>
              <div className="flex-1 space-y-1 ">
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <Phone size={16} />
                  Contact
                </p>
                <p className="text-white">{caseDetails.contact}</p>
              </div>
            </div>

            <div className="space-y-2 border-t border-gray-700 pt-2">
              <div className="space-y-1">
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <AlertCircle size={16} />
                  Status
                </p>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(caseDetails.status)}`}>
                  {caseDetails.status.replace('_', ' ').toUpperCase()}
                </div>
              </div>
              {caseDetails.statusMessage && (
                <p className="text-sm text-gray-400 italic">
                  {caseDetails.statusMessage}
                </p>
              )}
            </div>

            <div className="space-y-1 border-t border-gray-700 pt-2">
              <p className="text-gray-400 text-sm">Severity</p>
              <p className={`font-medium ${getSeverityColor(caseDetails.severity)} capitalize`}>
                {caseDetails.severity}
              </p>
            </div>

            <div className="space-y-1 border-t border-gray-700 pt-2">
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <FileText size={16} />
                Description
              </p>
              <p className="text-white text-sm break-words">
                {caseDetails.description}
              </p>
            </div>

            <div className="space-y-1 border-t border-gray-700 pt-2">
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <MapPin size={16} />
                Location
              </p>
              <div className="text-white text-sm">
                <p>Latitude: {caseDetails.location.latitude.toFixed(6)}</p>
                <p>Longitude: {caseDetails.location.longitude.toFixed(6)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-700">
              <div className="space-y-1">
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <Clock size={16} />
                  Submitted
                </p>
                <p className="text-white text-sm">{formatDate(caseDetails.createdAt)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <Clock size={16} />
                  Last Updated
                </p>
                <p className="text-white text-sm">{formatDate(caseDetails.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
