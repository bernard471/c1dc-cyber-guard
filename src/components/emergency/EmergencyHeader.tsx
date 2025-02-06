import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';

export const EmergencyHeader = () => {
  return (
    <Alert variant="destructive" className="mb-6">
      <div className="flex gap-2">
        <AlertTriangle className="h-4 w-5" />
        <AlertTitle className='font-bold'>Emergency Support Center</AlertTitle>
      </div>
      <AlertDescription>
        For immediate life-threatening emergencies, always call your local emergency services first.
      </AlertDescription>
    </Alert>
  );
};
