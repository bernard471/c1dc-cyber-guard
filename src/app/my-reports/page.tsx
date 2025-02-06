"use client"

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { fetchMomoReports,
  fetchWhatsAppReports, 
  fetchSocialAccountReports, 
  fetchSextortionReports, 
  fetchEmailHackReports,
  fetchEmergencyReports, 
  fetchLocationTrackingReports, 
  fetchIdentityTheftReports, 
  fetchShoppingScamReports, 
  fetchCryptoScamReports, 
  fetchEmploymentScamReports, 
  fetchFinancialFraudReports,
  fetchOtherFraudReports } from '@/services/reports/Reports';
import { MomoReportCard } from '@/components/reports/MomoReportCard';
 import { EmergencyReportCard } from '@/components/reports/EmergencyReportCard';  // This is a placeholder for future reports.  // This is a placeholder for future reports.  // This is a placeholder for future reports.  // This is a placeholder for future reports.  // This is a placeholder for future reports.  // This is a placeholder for future reports.  // This is a placeholder for future reports.  // This is a placeholder for future reports.
import { WhatsAppReportCard } from '@/components/reports/WhatsAppReportCard';
import { SocialAccountReportCard } from '@/components/reports/SocialAccountReportCard';
import { FinancialFraudReportCard } from '@/components/reports/FinancialFraudReportCard';
import { SextortionReportCard } from '@/components/reports/SextortionReportCard';
import { EmailHackReportCard } from '@/components/reports/EmailHackReportCard';
import { LocationTrackingReportCard } from '@/components/reports/LocationTrackingReportCard';
import { IdentityTheftReportCard } from '@/components/reports/IdentityTheftReportCard';
import { ShoppingScamReportCard } from '@/components/reports/ShoppingScamReportCard';
import { CryptoScamReportCard } from '@/components/reports/CryptoScamReportCard';
import { EmploymentScamReportCard } from '@/components/reports/EmploymentScamReportCard';
import { OtherFraudReportCard } from '@/components/reports/OtherFraudReportCard';

import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { MomoReport, 
  WhatsAppReport, 
  SocialAccountReport, 
  EmailHackReport,
  EmergencyReport,  // This is a placeholder for future reports. 
  SextortionReport, 
  LocationTrackingReport, 
  IdentityTheftReport, 
  ShoppingScamReport,
  CryptoScamReport,
  EmploymentScamReport, 
  FinancialFraudReport,
  OtherFraudReport } from '@/services/reports/types';

export default function ReportsPage() {
  const [momoReports, setMomoReports] = useState<MomoReport[]>([]);
  const [whatsappReports, setWhatsappReports] = useState<WhatsAppReport[]>([]);
  const [socialReports, setSocialReports] = useState<SocialAccountReport[]>([]);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [sextortionReports, setSextortionReports] = useState<SextortionReport[]>([]);
const [emailHackReports, setEmailHackReports] = useState<EmailHackReport[]>([]);
const [locationReports, setLocationReports] = useState<LocationTrackingReport[]>([]);
const [identityReports, setIdentityReports] = useState<IdentityTheftReport[]>([]);
const [shoppingReports, setShoppingReports] = useState<ShoppingScamReport[]>([]);
const [cryptoReports, setCryptoReports] = useState<CryptoScamReport[]>([]);
const [employmentReports, setEmploymentReports] = useState<EmploymentScamReport[]>([]);
const [financialReports, setFinancialReports] = useState<FinancialFraudReport[]>([]);
const [otherReports, setOtherReports] = useState<OtherFraudReport[]>([]);
const [emergencyReports, setEmergencyReports] = useState<EmergencyReport[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('reports');

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const [
        emergencyData,
        momoData, 
        whatsappData, 
        socialData,
        sextortionData,
        emailData,
        locationData,
        identityData,
        shoppingData,
        cryptoData,
        employmentData,
        financialData,
        otherData
      ] = await Promise.all([
        fetchEmergencyReports(),
        fetchMomoReports(),
        fetchWhatsAppReports(),
        fetchSocialAccountReports(),
        fetchSextortionReports(),
        fetchEmailHackReports(),
        fetchLocationTrackingReports(),
        fetchIdentityTheftReports(),
        fetchShoppingScamReports(),
        fetchCryptoScamReports(),
        fetchEmploymentScamReports(),
        fetchFinancialFraudReports(),
        fetchOtherFraudReports()
      ]);
      
      setEmergencyReports(emergencyData);
      setMomoReports(momoData);
      setWhatsappReports(whatsappData);
      setSocialReports(socialData);
      setSextortionReports(sextortionData);
      setEmailHackReports(emailData);
      setLocationReports(locationData);
      setIdentityReports(identityData);
      setShoppingReports(shoppingData);
      setCryptoReports(cryptoData);
      setEmploymentReports(employmentData);
      setFinancialReports(financialData);
      setOtherReports(otherData);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      under_review: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-gray-100 text-gray-800'
    };
    return colors[status.toLowerCase()] || colors.closed;
  };

  const allReports = [
    ...momoReports, 
    ...whatsappReports, 
    ...socialReports,
    ...sextortionReports,
    ...emailHackReports,
    ...locationReports,
    ...identityReports,
    ...shoppingReports,
    ...cryptoReports,
    ...employmentReports,
    ...financialReports,
    ...otherReports
  ].sort((a, b) => {
    // Enhanced date comparison to handle different date field names
    const getDate = (report: Report | OtherFraudReport | MomoReport | WhatsAppReport | SocialAccountReport | SextortionReport | EmailHackReport | LocationTrackingReport | IdentityTheftReport | ShoppingScamReport | CryptoScamReport | EmploymentScamReport | FinancialFraudReport) => {
      return new Date(
        (report as { dateOfTransaction?: string }).dateOfTransaction || 
        (report as { dateOfHack?: string }).dateOfHack || 
        (report as { dateCreated?: string }).dateCreated || 
        (report as { reportDate?: string }).reportDate ||
        new Date(0) // Fallback to epoch time if no valid date is found
      );
    };
    return getDate(b).getTime() - getDate(a).getTime();
  });

  const filteredReports = [
    ...emergencyReports.filter(report => 
      report.caseNumber.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    ...allReports.filter(report =>
      report.reportId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ];
  

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab}/>
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">My Reports</h1>
            <div className="flex gap-4">
              <Input
                type="search"
                placeholder="Search reports by ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
                
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          ) : (
            <div className="space-y-4">
             {filteredReports.map(report => {
                if ('caseNumber' in report) {
                  return (
                    <EmergencyReportCard
                      key={report._id}
                      report={report as EmergencyReport}
                      isExpanded={expandedReport === report.caseNumber}
                      onToggle={() => setExpandedReport(
                        expandedReport === report.caseNumber ? null : report.caseNumber
                      )}
                      getStatusColor={getStatusColor}
                    />
                  );
                }
                switch(report.type) {
                  case 'momo':
                    return (
                      <MomoReportCard
                        key={report.reportId}
                        report={report as MomoReport}
                        isExpanded={expandedReport === report.reportId}
                        onToggle={() => setExpandedReport(
                          expandedReport === report.reportId ? null : report.reportId
                        )}
                        getStatusColor={getStatusColor}
                      />
                    );
                  case 'whatsapp':
                    return (
                      <WhatsAppReportCard
                        key={report.reportId}
                        report={report as WhatsAppReport}
                        isExpanded={expandedReport === report.reportId}
                        onToggle={() => setExpandedReport(
                          expandedReport === report.reportId ? null : report.reportId
                        )}
                        getStatusColor={getStatusColor}
                      />
                    );
                  case 'social-account':
                    return (
                      <SocialAccountReportCard
                        key={report.reportId}
                        report={report as SocialAccountReport}
                        isExpanded={expandedReport === report.reportId}
                        onToggle={() => setExpandedReport(
                          expandedReport === report.reportId ? null : report.reportId
                        )}
                        getStatusColor={getStatusColor}
                      />
                    );
                    case 'sextortion':
                      return (
                        <SextortionReportCard
                          key={report.reportId}
                          report={report as SextortionReport}
                          isExpanded={expandedReport === report.reportId}
                          onToggle={() => setExpandedReport(
                            expandedReport === report.reportId? null : report.reportId
                          )}
                          getStatusColor={getStatusColor}
                        />
                      );
                  case 'email-hack':
                    return (
                        <EmailHackReportCard
                          key={report.reportId}
                          report={report as EmailHackReport}
                          isExpanded={expandedReport === report.reportId}
                          onToggle={() => setExpandedReport(
                            expandedReport === report.reportId? null : report.reportId
                          )}
                          getStatusColor={getStatusColor}
                        />
                      );
                  case 'location-tracking':
                    return (
                        <LocationTrackingReportCard
                          key={report.reportId}
                          report={report as LocationTrackingReport}
                          isExpanded={expandedReport === report.reportId}
                          onToggle={() => setExpandedReport(
                            expandedReport === report.reportId? null : report.reportId
                          )}
                          getStatusColor={getStatusColor}
                        />
                      );
                  case 'identity-theft':
                    return (
                        <IdentityTheftReportCard
                          key={report.reportId}
                          report={report as IdentityTheftReport}
                          isExpanded={expandedReport === report.reportId}
                          onToggle={() => setExpandedReport(
                            expandedReport === report.reportId? null : report.reportId
                          )}
                          getStatusColor={getStatusColor}
                        />
                      );
                      case'shopping-scam':
                      return (
                        <ShoppingScamReportCard
                          key={report.reportId}
                          report={report as ShoppingScamReport}
                          isExpanded={expandedReport === report.reportId}
                          onToggle={() => setExpandedReport(
                            expandedReport === report.reportId? null : report.reportId
                          )}
                          getStatusColor={getStatusColor}
                          />
                        );
                        case 'crypto-scam':
                          return (
                        <CryptoScamReportCard
                        key={report.reportId}
                        report={report as CryptoScamReport}
                        isExpanded={expandedReport === report.reportId}
                        onToggle={() => setExpandedReport(
                            expandedReport === report.reportId? null : report.reportId
                        )}
                        getStatusColor={getStatusColor}
                        />
                        );
                        case 'employment-scam':
                          return (
                            <EmploymentScamReportCard
                            key={report.reportId}
                            report={report as EmploymentScamReport}
                            isExpanded={expandedReport === report.reportId}
                            onToggle={() => setExpandedReport(
                                expandedReport === report.reportId? null : report.reportId
                            )}
                            getStatusColor={getStatusColor}
                            />
                            );
                            case 'financial-fraud':
                              return (
                            <FinancialFraudReportCard
                            key={report.reportId}
                            report={report as FinancialFraudReport}
                            isExpanded={expandedReport === report.reportId}
                            onToggle={() => setExpandedReport(
                                expandedReport === report.reportId? null : report.reportId
                            )}
                            getStatusColor={getStatusColor}
                            />
                            ); 
                        case 'other-fraud':
                          return (
                            <OtherFraudReportCard
                            key={report.reportId}
                            report={report as OtherFraudReport}
                            isExpanded={expandedReport === report.reportId}
                            onToggle={() => setExpandedReport(
                                expandedReport === report.reportId? null : report.reportId
                            )}
                            getStatusColor={getStatusColor}
                            />
                            );
                  default:
                    return null;
                }
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
