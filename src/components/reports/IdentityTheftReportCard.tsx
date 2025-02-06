import { IdentityTheftReport } from '@/services/reports/types';
import { Card, CardContent } from "@/components/ui/card";
import { UserX, Calendar, ChevronRight, Upload, AlertCircle, Shield, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface IdentityTheftReportCardProps {
  report: IdentityTheftReport;
  isExpanded: boolean;
  onToggle: () => void;
  getStatusColor: (status: string) => string;
}

export const IdentityTheftReportCard = ({ 
  report, 
  isExpanded, 
  onToggle,
  getStatusColor 
}: IdentityTheftReportCardProps) => {
  const router = useRouter();

  const handleEvidenceUpload = () => {
    router.push(`/evidence-page`);
  };

  return (
    <Card className="overflow-hidden border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-200">
      <CardContent className="p-0">
      <div className="p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200" onClick={onToggle}>
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div className="space-y-4 w-full">
    <h3 className="lg:text-lg font-semibold flex flex-wrap items-center gap-2 text-gray-800">
               <UserX className="w-5 h-5 text-purple-500" />
                Report {report.reportId}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)} shadow-sm`}>
                  {report.status}
                </span>
              </h3>
              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {new Date(report.dateDiscovered).toLocaleDateString()}
                </p>
                <p className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  {report.typeOfTheft}
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
                  <AlertCircle className="w-4 h-4 text-purple-500" />
                  Theft Details
                </h4>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: 'Type of Theft', value: report.typeOfTheft },
                    { label: 'Suspected Method', value: report.suspectedMethod },
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
                  <AlertTriangle className="w-4 h-4 text-purple-500" />
                  Impact Assessment
                </h4>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: 'Credit Cards Fraud', value: report.creditCardsFraud ? 'Yes' : 'No' },
                    { label: 'Bank Accounts Fraud', value: report.bankAccountsFraud ? 'Yes' : 'No' },
                    { label: 'Loans Created', value: report.loansCreated ? 'Yes' : 'No' },
                    { label: 'Government Documents', value: report.governmentDocuments ? 'Yes' : 'No' },
                    { label: 'Social Media Impersonation', value: report.socialMediaImpersonation ? 'Yes' : 'No' },
                    { label: 'Business Impersonation', value: report.businessImpersonation ? 'Yes' : 'No' },
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
                <h4 className="font-medium mb-4 text-gray-800">Compromised Documents</h4>
                <div className="space-y-3">
                  {report.documentsCompromised.map((doc, index) => (
                    <div key={index} className="text-sm p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{doc.documentType}</span>
                        <span className="text-gray-500">{new Date(doc.dateCompromised).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-600">{doc.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium mb-4 text-gray-800">Actions Taken</h4>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: 'Police Reported', value: report.policeReported ? 'Yes' : 'No' },
                    { label: 'Credit Bureau Notified', value: report.creditBureauNotified ? 'Yes' : 'No' },
                    { label: 'Bank Notified', value: report.bankNotified ? 'Yes' : 'No' }
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <dt className="text-gray-500">{label}:</dt>
                      <dd className="font-medium text-gray-800">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-sm text-gray-600">{report.actionsTaken}</p>
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
                    onClick={handleEvidenceUpload}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-full transition-colors duration-200"
                  >
                    <Upload className="w-4 h-4" />
                    Add Evidence
                  </button>
                </div>
                <div className="space-y-2">
                  {report.evidenceFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <span className="font-medium text-gray-700">{file.fileName}</span>
                      <span className="text-gray-500">
                        {new Date(file.uploadDate).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
