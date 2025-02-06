import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from 'lucide-react';
import { LocationDisplay } from "./LocationDisplay";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseNumber: string;
  location: { latitude: number; longitude: number; } | null;
}

export const ConfirmationDialog = ({
  open,
  onOpenChange,
  caseNumber,
  location
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            Emergency Alert Sent
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Your emergency alert has been received. Our support team will contact you immediately.
          </DialogDescription>
          
          <div className="mt-6 space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Case Number:</span>
              <span className="font-mono font-bold text-primary">{caseNumber}</span>
            </div>
            
            <LocationDisplay location={location} />
          </div>

          <Alert className="mt-4 border-amber-200 bg-amber-50">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <AlertDescription className="text-amber-700 font-medium">
              Please keep your phone line open and stay at your current location if safe to do so.
            </AlertDescription>
          </Alert>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
