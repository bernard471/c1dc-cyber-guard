import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, MapPin, X } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';


interface ConfirmationPopupProps {
  showConfirmation: boolean;
  onClose: () => void;
  caseNumber: string;
  location: {
    latitude: number;
    longitude: number;
  } | null;
}

export const ConfirmationPopup = ({ showConfirmation, onClose, caseNumber, location }: ConfirmationPopupProps) => {
  if (!showConfirmation) return null;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(caseNumber);
    } catch (err) {
      console.error('Failed to copy text: ', err);
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
        className="bg-white rounded-lg p-6 max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <h2 className="text-2xl font-bold">Emergency Alert Sent</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-center mb-6">
          Your emergency alert has been received. Our support team will contact you immediately.
        </p>

        <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="flex items-center justify-between">
          <span className="text-gray-600">Case Number:</span>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-primary">{caseNumber}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-600"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </Button>
          </div>
          </div>
          
          {location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span>
                {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </span>
            </div>
          )}
        </div>

        <Alert className="mt-4 border-amber-200 bg-amber-50">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          <AlertDescription className="text-amber-700 font-medium">
            Please keep your phone line open and stay at your current location if safe to do so.
          </AlertDescription>
        </Alert>

        <div className="mt-6 space-y-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full"
          >
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};
