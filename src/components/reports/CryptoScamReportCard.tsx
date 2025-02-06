import { CryptoScamReport } from '@/services/reports/types';
import { Card, CardContent } from "@/components/ui/card";
import { Bitcoin, Calendar, ChevronRight, Upload, AlertCircle, Shield, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CryptoScamReportCardProps {
  report: CryptoScamReport;
  isExpanded: boolean;
  onToggle: () => void;
  getStatusColor: (status: string) => string;
}

export const CryptoScamReportCard = ({ 
  report, 
  isExpanded, 
  onToggle,
  getStatusColor 
}: CryptoScamReportCardProps) => {
  const router = useRouter();

  const handleEvidenceUpload = () => {
    router.push(`/evidence-page`);
  };

  return (
    <Card className="overflow-hidden border-l-4 border-l-indigo-500 hover:shadow-lg transition-all duration-200">
      <CardContent className="p-0">
        <div
          className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          onClick={onToggle}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                <Bitcoin className="w-5 h-5 text-indigo-500" />
                Report {report.reportId}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)} shadow-sm`}>
                  {report.status}
                </span>
              </h3>
              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {new Date(report.dateOfIncident).toLocaleDateString()}
                </p>
                <p className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  {report.scamType} - {report.cryptoType}
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
                  <AlertCircle className="w-4 h-4 text-indigo-500" />
                  Transaction Details
                </h4>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: 'Amount Lost', value: `GH₵${report.transactionDetails.amountLost.toLocaleString()}` },
                    { label: 'Investment Promised', value: `GH₵${report.transactionDetails.investmentPromised.toLocaleString()}` },
                    { label: 'Website URL', value: report.transactionDetails.websiteURL },
                    { label: 'Communication Method', value: report.transactionDetails.communicationMethod }
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
                  <AlertTriangle className="w-4 h-4 text-indigo-500" />
                  Scam Indicators
                </h4>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: 'Fake Website', value: report.scamIndicators.fakeWebsite ? 'Yes' : 'No' },
                    { label: 'Fake Investment', value: report.scamIndicators.fakeInvestment ? 'Yes' : 'No' },
                    { label: 'Ponzi Scheme', value: report.scamIndicators.ponziScheme ? 'Yes' : 'No' },
                    { label: 'Mining Scam', value: report.scamIndicators.miningScam ? 'Yes' : 'No' },
                    { label: 'Wallet Compromised', value: report.scamIndicators.walletCompromised ? 'Yes' : 'No' },
                    { label: 'Exchange Compromised', value: report.scamIndicators.exchangeCompromised ? 'Yes' : 'No' }
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <dt className="text-gray-500">{label}:</dt>
                      <dd className="font-medium text-gray-800">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium mb-4 text-gray-800">Scammer Details</h4>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: 'Name', value: report.scammerDetails.name },
                    { label: 'Platform', value: report.scammerDetails.platform },
                    { label: 'Contact Info', value: report.scammerDetails.contactInfo },
                    { label: 'Wallet Address', value: report.scammerDetails.walletAddress }
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <dt className="text-gray-500">{label}:</dt>
                      <dd className="font-medium text-gray-800">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium mb-4 text-gray-800">Actions Taken</h4>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: 'Bank Informed', value: report.actionsStatus.bankInformed ? 'Yes' : 'No' },
                    { label: 'Police Reported', value: report.actionsStatus.policeReported ? 'Yes' : 'No' }
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
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-full transition-colors duration-200"
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
