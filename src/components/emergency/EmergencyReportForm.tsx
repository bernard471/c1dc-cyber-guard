import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, SendHorizontal, MapPin } from 'lucide-react';
import { FileUpload } from './FileUpload';

// Update the interface in EmergencyReportForm.tsx
interface EmergencyReportFormProps {
    formData: {
      name: string;
      contact: string;
      description: string;
      severity: string;
    };
    location: { latitude: number; longitude: number; } | null;
    locationError: string;
    isSubmitting: boolean;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSeverityChange: (value: string) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onFileUploadComplete: (fileData: {
      fileName: string;
      fileUrl: string;
      uploadDate: Date;
      fileType: string;
      fileData: string;
    }) => void;
  }
  


const severityLevels = [
  { value: 'critical', label: 'Critical - Immediate Response Needed', color: 'text-red-500' },
  { value: 'high', label: 'High - Urgent Attention Required', color: 'text-orange-500' },
  { value: 'medium', label: 'Medium - Priority Response', color: 'text-yellow-500' },
  { value: 'low', label: 'Low - Standard Response', color: 'text-blue-500' }
];

export const EmergencyReportForm = ({
    formData,
    location,
    locationError,
    isSubmitting,
    onInputChange,
    onSeverityChange,
    onSubmit,
    onFileUploadComplete
  }: EmergencyReportFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input 
        placeholder="Your Name"
        name="name"
        value={formData.name}
        onChange={onInputChange}
        required
        className="mb-3"
      />
      <Input 
        placeholder="Contact Number"
        name="contact"
        value={formData.contact}
        onChange={onInputChange}
        required
        className="mb-3"
      />
      
      <Select 
        onValueChange={onSeverityChange} 
        value={formData.severity}
        required
      >
        <SelectTrigger className="mb-3">
          <SelectValue placeholder="Select Severity Level" />
        </SelectTrigger>
        <SelectContent>
          {severityLevels.map(level => (
            <SelectItem 
              key={level.value} 
              value={level.value}
              className={level.color}
            >
              {level.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
        <MapPin className="h-4 w-4" />
        {location ? (
          <span>Location detected</span>
        ) : (
          <span>{locationError || 'Detecting location...'}</span>
        )}
      </div>

      <Textarea 
        placeholder="Describe the emergency situation..."
        name="description"
        value={formData.description}
        onChange={onInputChange}
        required
        className="mb-3"
      />

<FileUpload onUploadComplete={onFileUploadComplete} />

      <div className="items-center">
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          Typical response time: 5 minutes
        </div>
        <Button type="submit" variant="destructive" disabled={isSubmitting}>
          <SendHorizontal className="h-4 w-4 mr-2" />
          {isSubmitting ? "Sending..." : "Send Emergency Alert"}
        </Button>
      </div>
    </form>
  );
};
