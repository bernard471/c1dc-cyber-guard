import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Calendar, ChevronRight, Upload, MapPin, Phone, User, } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { EmergencyReport } from '@/services/reports/types';

interface EmergencyReportCardProps {
  report: EmergencyReport;
  isExpanded: boolean;
  onToggle: () => void;
  getStatusColor: (status: string) => string;
}


export const EmergencyReportCard = ({ 
  report, 
  isExpanded, 
  onToggle,
  getStatusColor 
}: EmergencyReportCardProps) => {
  const router = useRouter();

  const handleFileUpload = () => {
    router.push(`/evidence-page?caseNumber=${report.caseNumber}`);
  };

  return (
    <Card className="overflow-hidden border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-200">
      <CardContent className="p-0">
<div className="p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200" onClick={onToggle}>
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div className="space-y-4 w-full">
      {/* Make the header more responsive */}
      <h3 className="text-lg font-semibold flex flex-wrap items-center gap-2 text-gray-800">
        <AlertCircle className="w-5 h-5 text-red-500" />
        <span>Case {report.caseNumber}</span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)} shadow-sm`}>
          {report.status}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium 
          ${report.severity === 'critical' ? 'bg-red-100 text-red-700' :
            report.severity === 'high' ? 'bg-orange-100 text-orange-700' :
            report.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-green-100 text-green-700'}`}>
          {report.severity}
        </span>
      </h3>

      {/* Adjust grid for better mobile layout */}
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <User className="w-4 h-4 flex-shrink-0" />
          <span className="break-words">{report.name}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span className="break-words">{new Date(report.createdAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
  </div>
</div>

{/* Expanded section improvements */}
{isExpanded && (
  <div className="border-t border-gray-100 p-4 sm:p-6 bg-gray-50">
    <div className="grid grid-cols-2 gap-4 sm:gap-6">
    <div className="flex items-center gap-3 text-sm text-gray-600">
          <Phone className="w-4 h-4 flex-shrink-0" />
          <span className="break-words">{report.contact}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="break-words">{`${report.location.latitude.toFixed(6)}, ${report.location.longitude.toFixed(6)}`}</span>
        </div>
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
        <h4 className="font-medium mb-2 sm:mb-3 text-gray-800">Emergency Description</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{report.description}</p>
      </div>

      <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h4 className="font-medium text-gray-800">Attached Files</h4>
          <button
            onClick={handleFileUpload}
            className="flex items-center justify-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-full transition-colors duration-200"
          >
            <Upload className="w-4 h-4" />
            Add evidence Files
          </button>
        </div>
        <div className="space-y-2">
          {report.files.map((file, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <span className="font-medium text-gray-700 break-words">{file.fileName}</span>
              <span className="text-gray-500">
                {new Date(file.uploadDate).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {report.statusMessage && (
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
          <h4 className="font-medium mb-2 sm:mb-3 text-gray-800">Status Message</h4>
          <p className="text-sm text-gray-600">{report.statusMessage}</p>
        </div>
      )}
    </div>
  </div>
)}
      </CardContent>
    </Card>
  );
};
