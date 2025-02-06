import { SocialAccountReport } from '@/services/reports/types';
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, ChevronRight, Download, AlertCircle, Shield, AlertTriangle } from 'lucide-react';
import { EvidenceDisplay } from '@/components/EvidenceDisplay';
import { useState } from 'react';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import {Dialog,DialogContent,DialogHeader,DialogTitle,} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface AdminSocialAccountReportCardProps {
  report: SocialAccountReport;
  isExpanded: boolean;
  onToggle: () => void;
  getStatusColor: (status: string) => string;
  onStatusUpdate: (reportId: string, newStatus: string, statusMessage: string) => Promise<void>;
}

export const AdminSocialAccountReportCard = ({ 
  report, 
  isExpanded, 
  onToggle,
  getStatusColor,
  onStatusUpdate,
}: AdminSocialAccountReportCardProps) => {
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
    <Card className="overflow-hidden mb-6 border-l-4 border-l-black hover:shadow-lg transition-all duration-200">
      <CardContent className="p-0">
        <div
          className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          onClick={onToggle}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold flex flex-1 items-center gap-2 text-gray-800">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  <h3>Report {report.reportId}</h3>
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
                  {new Date(report.dateOfHack).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  {report.platform} - @{report.username}
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
                  <AlertCircle className="w-4 h-4 text-blue-500" />
                  Account Details
                </h4>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: 'Platform', value: report.platform },
                    { label: 'Username', value: report.username },
                    { label: 'Email', value: report.accountEmail },
                    { label: 'Phone', value: report.accountPhone },
                    { label: 'Hack Method', value: report.hackMethod },
                    { label: 'Account Status', value: report.accountStatus }
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
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  Impact Assessment
                </h4>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: 'Posts Compromised', value: report.postsCompromised ? 'Yes' : 'No' },
                    { label: 'Messages Accessed', value: report.messagesAccessed ? 'Yes' : 'No' },
                    { label: 'Recovery Attempted', value: report.recoveryAttempted ? 'Yes' : 'No' },
                    { label: 'Followers Lost', value: report.followersLost ? report.followersLost.toLocaleString() : '0' },
                    { label: 'Financial Loss', value: report.financialLoss ? `GH₵${report.financialLoss.toLocaleString()}` : 'None' },
                    { label: '2FA Enabled', value: report.twoFactorEnabled ? 'Yes' : 'No' },
                    { label: 'Email Compromised', value: report.emailCompromised ? 'Yes' : 'No' }
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <dt className="text-gray-500">{label}:</dt>
                      <dd className="font-medium text-gray-800">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium mb-3 text-gray-800">Description</h4>
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
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors duration-200"
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
