import { EmploymentScamReport } from '@/services/reports/types';
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar, ChevronRight, Upload, AlertCircle, Shield, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface EmploymentScamReportCardProps {
  report: EmploymentScamReport;
  isExpanded: boolean;
  onToggle: () => void;
  getStatusColor: (status: string) => string;
}

export const EmploymentScamReportCard = ({ 
  report, 
  isExpanded, 
  onToggle,
  getStatusColor 
}: EmploymentScamReportCardProps) => {
  const router = useRouter();

  const handleEvidenceUpload = () => {
    router.push(`/evidence-page`);
  };

  return (
    <Card className="overflow-hidden border-l-4 border-l-teal-500 hover:shadow-lg transition-all duration-200">
      <CardContent className="p-0">
      <div className="p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200" onClick={onToggle}>
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div className="space-y-4 w-full">
    <h3 className="lg:text-lg font-semibold flex flex-wrap items-center gap-2 text-gray-800">
               <Briefcase className="w-5 h-5 text-teal-500" />
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
                  {report.companyDetails.companyName} - {report.companyDetails.jobTitle}
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
                  <AlertCircle className="w-4 h-4 text-teal-500" />
                  Company Details
                </h4>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: 'Company Name', value: report.companyDetails.companyName },
                    { label: 'Job Title', value: report.companyDetails.jobTitle },
                    { label: 'Website', value: report.companyDetails.websiteURL },
                    { label: 'Platform', value: report.companyDetails.jobPostingPlatform },
                    { label: 'Promised Salary', value: `GH₵${report.companyDetails.promisedSalary.toLocaleString()}` }
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
                  <AlertTriangle className="w-4 h-4 text-teal-500" />
                  Scam Indicators
                </h4>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: 'Interview Conducted', value: report.scamIndicators.interviewConducted ? 'Yes' : 'No' },
                    { label: 'Payment Requested', value: report.scamIndicators.paymentRequested ? 'Yes' : 'No' },
                    { label: 'Documents Requested', value: report.scamIndicators.documentsRequested ? 'Yes' : 'No' },
                    { label: 'Personal Info Shared', value: report.scamIndicators.personalInfoShared ? 'Yes' : 'No' },
                    { label: 'Bank Details Shared', value: report.scamIndicators.bankDetailsShared ? 'Yes' : 'No' },
                    { label: 'Contract Received', value: report.scamIndicators.contractReceived ? 'Yes' : 'No' }
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
                    { label: 'Email', value: report.scammerDetails.email },
                    { label: 'Phone', value: report.scammerDetails.phone },
                    { label: 'Position', value: report.scammerDetails.position }
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <dt className="text-gray-500">{label}:</dt>
                      <dd className="font-medium text-gray-800">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium mb-4 text-gray-800">Financial Details</h4>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: 'Amount Lost', value: `GH₵${report.financialDetails.amountLost.toLocaleString()}` },
                    { label: 'Recruitment Fees', value: `GH₵${report.financialDetails.recruitmentFees.toLocaleString()}` },
                    { label: 'Payment Method', value: report.financialDetails.paymentMethod }
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <dt className="text-gray-500">{label}:</dt>
                      <dd className="font-medium text-gray-800">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium mb-4 text-gray-800">Documents Submitted</h4>
                <div className="space-y-3">
                  {report.documentsSubmitted.map((doc, index) => (
                    <div key={index} className="text-sm p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{doc.documentType}</span>
                        <span className="text-gray-500">{new Date(doc.submissionDate).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-600">{doc.details}</p>
                    </div>
                  ))}
                </div>
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
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-teal-600 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-full transition-colors duration-200"
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
