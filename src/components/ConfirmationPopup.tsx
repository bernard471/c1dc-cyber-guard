import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, MapPin, X } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import Link from 'next/link';

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
            <span className="font-mono font-bold text-primary">{caseNumber}</span>
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
          <Link href={`/evidence-page?caseNumber=${caseNumber}`} className="block">
            <Button variant="secondary" className="w-full">
              Submit Additional Evidence
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};
