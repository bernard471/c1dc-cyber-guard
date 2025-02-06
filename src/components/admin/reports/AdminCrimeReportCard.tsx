import { CrimeReport } from '@/services/reports/types';
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Calendar, ChevronRight, MapPin, Phone, User, Shield, Download } from 'lucide-react';
import { useState } from 'react';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import { EvidenceDisplay } from '@/components/EvidenceDisplay';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {Dialog,DialogContent,DialogHeader,DialogTitle,} from "@/components/ui/dialog"



interface CrimeReportCardProps {
  report: CrimeReport;
  isExpanded: boolean;
  onToggle: () => void;
  getStatusColor: (status: string) => string;
  onStatusUpdate: (reportId: string, newStatus: string, statusMessage: string) => Promise<void>;
}

export const CrimeReportCard = ({   report, 
  isExpanded, 
  onToggle,
  getStatusColor,
  onStatusUpdate,
}: CrimeReportCardProps) => {
  const [showEvidence, setShowEvidence] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const handleStatusChange = (newStatus: string) => {
    setSelectedStatus(newStatus);
    setIsDialogOpen(true);
  };

  const handleSubmitStatus = async () => {
    try {
      await onStatusUpdate(report.caseNumber, selectedStatus, statusMessage);
      setIsDialogOpen(false);
      setStatusMessage('');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };


  return (
    <>
    <Card className="overflow-hidden border-l-4 border-l-black hover:shadow-lg transition-all duration-200">
      <CardContent className="p-0">
        <div
          className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          onClick={onToggle}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold flex items-center gap-2 text-gray-800">
              <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <h3>Case {report.caseNumber}</h3>
                </div>
                <Select onValueChange={handleStatusChange} defaultValue={report.status}>
                  <SelectTrigger className={`w-[140px] h-7 ${getStatusColor(report.status)}`}>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <span className={`px-3 py-1 rounded-full text-xs font-medium 
                  ${report.severity === 'critical' ? 'bg-red-100 text-red-700' :
                    report.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                    report.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'}`}>
                  {report.severity}
                </span>
                </div>
              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {new Date(report.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
          </div>
        </div>


        {isExpanded && (
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium mb-4 text-gray-800 flex items-center gap-2">
                  <User className="w-4 h-4 text-red-500" />
                  Contact Information
                </h4>
                <dl className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-gray-600">
                    <User className="w-4 h-4 flex-shrink-0" />
                    <span className="break-words">{report.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span className="break-words">{report.contact}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="break-words">
                      {`${report.location.latitude.toFixed(6)}, ${report.location.longitude.toFixed(6)}`}
                    </span>
                  </div>
                </dl>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium mb-4 text-gray-800 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-orange-500" />
                  Emergency Details
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">{report.description}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-800">Evidence Files</h4>
                  <button
                    onClick={() => setShowEvidence(!showEvidence)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-full transition-colors duration-200"
                  >
                    <Download className="w-4 h-4" />
                    {showEvidence ? 'Hide Evidence' : 'View Evidence'}
                  </button>
                    </div>
                    {showEvidence && (
                      <EvidenceDisplay reportId={report.caseNumber} />
                  )}

              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Status Message</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">New Status: {selectedStatus}</p>
              <Textarea
                placeholder="Enter status update message for the user..."
                value={statusMessage}
                onChange={(e) => setStatusMessage(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitStatus} disabled={!statusMessage.trim()}>
              Update Status
            </Button>
          </div>
        </DialogContent>
        </Dialog>
</>
  );
};
