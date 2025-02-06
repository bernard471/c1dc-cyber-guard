import { LocationTrackingReport } from '@/services/reports/types';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, ChevronRight, Download, AlertCircle, Shield, AlertTriangle } from 'lucide-react';
import { EvidenceDisplay } from '@/components/EvidenceDisplay';
import { useState } from 'react';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import {Dialog,DialogContent,DialogHeader,DialogTitle,} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface AdminLocationTrackingReportCardProps {
  report: LocationTrackingReport;
  isExpanded: boolean;
  onToggle: () => void;
  getStatusColor: (status: string) => string;
  onStatusUpdate: (reportId: string, newStatus: string, statusMessage: string) => Promise<void>;
}

export const AdminLocationTrackingReportCard = ({ 
  report, 
  isExpanded, 
  onToggle,
  getStatusColor,
  onStatusUpdate
}: AdminLocationTrackingReportCardProps) => {
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
      await onStatusUpdate(report.reportId, selectedStatus, statusMessage);
      setIsDialogOpen(false);
      setStatusMessage('');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <>
    <Card className="overflow-hidden mb-6 border-l-4 border-l-amber-500 hover:shadow-lg transition-all duration-200">
      <CardContent className="p-0">
        <div
          className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          onClick={onToggle}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold flex flex-1 items-center gap-2 text-gray-800">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-500" />
                  <h3>Report #{report.reportId}</h3>
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
              </div>
              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {new Date(report.dateDiscovered).toLocaleDateString()}
                </p>
                <p className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  {report.trackingMethod}
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
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  Tracking Details
                </h4>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: 'Method', value: report.trackingMethod },
                    { label: 'Duration', value: report.duration },
                    { label: 'Location Affected', value: report.locationAffected },
                    { label: 'Suspected Perpetrator', value: report.suspectedPerpetrator }
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <dt className="text-gray-500">{label}:</dt>
                      <dd className="font-medium text-gray-800">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium mb-4 text-gray-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Impact Assessment
                </h4>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: 'Physical Stalking', value: report.physicalStalking ? 'Yes' : 'No' },
                    { label: 'Online Stalking', value: report.onlineStalking ? 'Yes' : 'No' },
                    { label: 'Threats Received', value: report.threatsReceived ? 'Yes' : 'No' },
                    { label: 'Police Reported', value: report.policeReported ? 'Yes' : 'No' },
                    { label: 'Restraining Order', value: report.restrainingOrder ? 'Yes' : 'No' },
                    { label: 'Financial Loss', value: report.financialLoss ? `GH₵${report.financialLoss.toLocaleString()}` : 'None' }
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <dt className="text-gray-500">{label}:</dt>
                      <dd className="font-medium text-gray-800">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium mb-4 text-gray-800">Affected Devices</h4>
                <div className="space-y-3">
                  {report.devicesAffected.map((device, index) => (
                    <div key={index} className="text-sm p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{device.deviceType}</span>
                        <span className="text-gray-500">{device.deviceName}</span>
                      </div>
                      <div className="text-gray-600">
                        Affected: {new Date(device.affectedDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium mb-4 text-gray-800">Safety Measures</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{report.safetyMeasures}</p>
              </div>

              <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium mb-3 text-gray-800">Incident Description</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{report.description}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium mb-4 text-gray-800">Contact Information</h4>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: 'Name', value: report.contactInfo.name },
                    { label: 'Email', value: report.contactInfo.email },
                    { label: 'Phone', value: report.contactInfo.phone }
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <dt className="text-gray-500">{label}:</dt>
                      <dd className="font-medium text-gray-800">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-800">Evidence Files</h4>
                  <button
                    onClick={() => setShowEvidence(!showEvidence)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-full transition-colors duration-200"
                  >
                    <Download className="w-4 h-4" />
                    {showEvidence ? 'Hide Evidence' : 'View Evidence'}
                  </button>
                </div>
                {showEvidence && (
                  <div className="mt-4">
                    <EvidenceDisplay reportId={report.reportId} />
                  </div>
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
