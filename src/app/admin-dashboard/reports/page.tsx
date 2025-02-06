"use client"

import { useState, useEffect } from 'react';
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminMomoReportCard } from "@/components/admin/reports/AdminMomoReportCard";
import { AdminWhatsAppReportCard } from "@/components/admin/reports/AdminWhatsAppReportCard";
import { AdminCryptoScamReportCard } from '@/components/admin/reports/AdminCryptoScamReportCard';
import { AdminEmailHackReportCard } from '@/components/admin/reports/AdminEmailHackReportCard';
import { AdminEmploymentScamReportCard } from '@/components/admin/reports/AdminEmploymentScamReportCard';
import { AdminEmergencyReportCard } from '@/components/admin/reports/AdminEmergencyReportCard';
import { CrimeReportCard } from '@/components/admin/reports/AdminCrimeReportCard';
import { AdminFinancialFraudReportCard } from '@/components/admin/reports/AdminFinancialFraudReportCard';
import { AdminIdentityTheftReportCard } from '@/components/admin/reports/AdminIdentityTheftReportCard';
import { AdminLocationTrackingReportCard } from '@/components/admin/reports/AdminLocationTrackingReportCard';
import { AdminOtherFraudReportCard } from '@/components/admin/reports/AdminOtherFraudReportCard';
import { AdminSextortionReportCard } from '@/components/admin/reports/AdminSextortionReportCard';
import { AdminShoppingScamReportCard } from '@/components/admin/reports/AdminShoppingScamReportCard';
import { AdminSocialAccountReportCard } from '@/components/admin/reports/AdminSocialAccountReportCard';

import { fetchAdminMomoReports, updateReportStatus } from '@/services/reports/MomoReports';
import { fetchAdminWhatsAppReports, updatewhatsappReportStatus } from '@/services/reports/WhatsAppReports';
import { fetchAdminCryptoScamReports, updateCryptoScamReportStatus } from '@/services/reports/CryptoScamReports';
import { fetchAdminEmailHackReports, updateEmailHackReportStatus } from '@/services/reports/EmailHackReports';
import { fetchAdminEmploymentScamReports, updateEmploymentScamReportStatus } from '@/services/reports/EmploymentScamReports';
import { fetchAdminEmergencyReports, updateEmergencyReportStatus } from '@/services/reports/EmergencyReports';
import { fetchAdminCrimeReports, updateCrimeReportStatus } from '@/services/reports/CrimeReports';
import { fetchAdminFinancialFraudReports, updateFinancialFraudReportStatus } from '@/services/reports/FinancialFraudReports';
import { fetchAdminIdentityTheftReports, updateIdentityTheftReportStatus } from '@/services/reports/IdentityTheftReports';
import { fetchAdminLocationTrackingReports, updateLocationTrackingReportStatus } from '@/services/reports/LocationTrackingReports';
import { fetchAdminOtherFraudReports, updateOtherFraudReportStatus } from '@/services/reports/OtherFraudReports';
import { fetchAdminSextortionReports, updateSextortionReportStatus } from '@/services/reports/SextortionReports';
import { fetchAdminShoppingScamReports, updateShoppingScamReportStatus } from '@/services/reports/ShoppingScamReports';
import { fetchAdminSocialAccountReports, updateSocialAccountReportStatus } from '@/services/reports/SocialAccountReports';
import { 
  MomoReport, 
  WhatsAppReport, 
  CryptoScamReport, 
  EmailHackReport, 
  EmploymentScamReport, 
  EmergencyReport,
  CrimeReport,
  FinancialFraudReport, 
  IdentityTheftReport, 
  LocationTrackingReport, 
  OtherFraudReport, 
  SextortionReport, 
  ShoppingScamReport, 
  SocialAccountReport } from '@/services/reports/types';

export default function AdminReports() {
  const [momoReports, setMomoReports] = useState<MomoReport[]>([]);
  const [whatsappReports, setWhatsappReports] = useState<WhatsAppReport[]>([]);
  const [cryptoScamReports, setCryptoScamReports] = useState<CryptoScamReport[]>([]);
  const [emailHackReports, setEmailHackReports] = useState<EmailHackReport[]>([]);
  const [employmentScamReports, setEmploymentScamReports] = useState<EmploymentScamReport[]>([]);
  const [financialFraudReports, setFinancialFraudReports] = useState<FinancialFraudReport[]>([]);
  const [identityTheftReports, setIdentityTheftReports] = useState<IdentityTheftReport[]>([]);
  const [locationTrackingReports, setLocationTrackingReports] = useState<LocationTrackingReport[]>([]);
  const [otherFraudReports, setOtherFraudReports] = useState<OtherFraudReport[]>([]);
  const [sextortionReports, setSextortionReports] = useState<SextortionReport[]>([]);
  const [shoppingScamReports, setShoppingScamReports] = useState<ShoppingScamReport[]>([]);
  const [socialAccountReports, setSocialAccountReports] = useState<SocialAccountReport[]>([]);
  const [emergencyReports, setEmergencyReports] = useState<EmergencyReport[]>([]);
  const [crimeReport, setCrimeReports] = useState<CrimeReport[]>([]);

  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  useEffect(() => {
    loadAllReports();
  }, []);

  const loadAllReports = async () => {
    try {
      const [
        momoData,
        whatsappData,
        cryptoScamData,
        emailHackData,
        employmentScamData,
        financialFraudData,
        identityTheftData,
        locationTrackingData,
        otherFraudData,
        sextortionData,
        shoppingScamData,
        socialAccountData,
        emergencyData,
        crimeData 
      ] = await Promise.all([
        fetchAdminMomoReports(),
        fetchAdminWhatsAppReports(),
        fetchAdminCryptoScamReports(),
        fetchAdminEmailHackReports(),
        fetchAdminEmploymentScamReports(),
        fetchAdminFinancialFraudReports(),
        fetchAdminIdentityTheftReports(),
        fetchAdminLocationTrackingReports(),
        fetchAdminOtherFraudReports(),
        fetchAdminSextortionReports(),
        fetchAdminShoppingScamReports(),
        fetchAdminSocialAccountReports(),
        fetchAdminEmergencyReports(),
        fetchAdminCrimeReports() 
      ]);
  
      setMomoReports(momoData);
      setWhatsappReports(whatsappData);
      setCryptoScamReports(cryptoScamData);
      setEmailHackReports(emailHackData);
      setEmploymentScamReports(employmentScamData);
      setFinancialFraudReports(financialFraudData);
      setIdentityTheftReports(identityTheftData);
      setLocationTrackingReports(locationTrackingData);
      setOtherFraudReports(otherFraudData);
      setSextortionReports(sextortionData);
      setShoppingScamReports(shoppingScamData);
      setSocialAccountReports(socialAccountData);
      setEmergencyReports(emergencyData);
      setCrimeReports(crimeData);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleMomoStatusUpdate = async (reportId: string, newStatus: string, statusMessage: string) => {
    const success = await updateReportStatus(reportId, newStatus, statusMessage);
    if (success) {
      await loadAllReports();
    }
  };
  

  const handleWhatsAppStatusUpdate = async (reportId: string, newStatus: string , statusMessage: string) => {
    const success = await updatewhatsappReportStatus(reportId, newStatus, statusMessage);
    if (success) {
      await loadAllReports();
    }
  };

  const handleCryptoScamStatusUpdate = async (reportId: string, newStatus: string, statusMessage: string) => {
    const success = await updateCryptoScamReportStatus(reportId, newStatus, statusMessage);
    if (success) {
      await loadAllReports();
    }
  };
  
  const handleEmailHackStatusUpdate = async (reportId: string, newStatus: string, statusMessage: string) => {
    const success = await updateEmailHackReportStatus(reportId, newStatus, statusMessage);
    if (success) {
      await loadAllReports();
    }
  };
  
  const handleEmploymentScamStatusUpdate = async (reportId: string, newStatus: string, statusMessage: string) => {
    const success = await updateEmploymentScamReportStatus(reportId, newStatus, statusMessage);
    if (success) {
      await loadAllReports();
    }
  };
  
  const handleFinancialFraudStatusUpdate = async (reportId: string, newStatus: string, statusMessage: string) => {
    const success = await updateFinancialFraudReportStatus(reportId, newStatus, statusMessage);
    if (success) {
      await loadAllReports();
    }
  };
  
  const handleIdentityTheftStatusUpdate = async (reportId: string, newStatus: string, statusMessage: string) => {
    const success = await updateIdentityTheftReportStatus(reportId, newStatus, statusMessage);
    if (success) {
      await loadAllReports();
    }
  };
  
  const handleLocationTrackingStatusUpdate = async (reportId: string, newStatus: string, statusMessage: string) => {
    const success = await updateLocationTrackingReportStatus(reportId, newStatus, statusMessage);
    if (success) {
      await loadAllReports();
    }
  };
  
  const handleOtherFraudStatusUpdate = async (reportId: string, newStatus: string, statusMessage: string) => {
    const success = await updateOtherFraudReportStatus(reportId, newStatus, statusMessage);
    if (success) {
      await loadAllReports();
    }
  };
  
  const handleSextortionStatusUpdate = async (reportId: string, newStatus: string, statusMessage: string) => {
    const success = await updateSextortionReportStatus(reportId, newStatus, statusMessage);
    if (success) {
      await loadAllReports();
    }
  };
  
  const handleShoppingScamStatusUpdate = async (reportId: string, newStatus: string, statusMessage: string) => {
    const success = await updateShoppingScamReportStatus(reportId, newStatus, statusMessage);
    if (success) {
      await loadAllReports();
    }
  };
  
  const handleSocialAccountStatusUpdate = async (reportId: string, newStatus: string, statusMessage: string) => {
    const success = await updateSocialAccountReportStatus(reportId, newStatus, statusMessage);
    if (success) {
      await loadAllReports();
    }
  };
  
  const handleEmergencyStatusUpdate = async (caseNumber: string, newStatus: string, statusMessage: string) => {
    const success = await updateEmergencyReportStatus(caseNumber, newStatus, statusMessage);
    if (success) {
      await loadAllReports();
    }
  };

  const handleCrimeStatusUpdate = async (reportId: string, newStatus: string, statusMessage: string) => {
    const success = await updateCrimeReportStatus(reportId, newStatus, statusMessage);
    if (success) {
      await loadAllReports();
    }
  };



  const filterEmergencyReports = (reports: EmergencyReport[]) => {
    return reports.filter(report => {
      const dateCreated = new Date(report.createdAt);
      const today = new Date();
      
      const matchesType = filterType === 'all' || filterType === 'emergency';
      const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
      
      let matchesDate = true;
      if (filterDate === 'today') {
        matchesDate = dateCreated.toDateString() === today.toDateString();
      } else if (filterDate === 'week') {
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        matchesDate = dateCreated >= lastWeek;
      } else if (filterDate === 'month') {
        matchesDate = dateCreated.getMonth() === today.getMonth() && 
                      dateCreated.getFullYear() === today.getFullYear();
      }
      
      return matchesType && matchesStatus && matchesDate;
    });
  };

  const filterCrimeReports = (reports: CrimeReport[]) => {
    return reports.filter(report => {
      const dateCreated = new Date(report.createdAt);
      const today = new Date();

      const matchesType = filterType === 'all' || filterType === 'crime';
      const matchesStatus = filterStatus === 'all' || report.status === filterStatus;

      let matchesDate = true;
      if (filterDate === 'today') {
        matchesDate = dateCreated.toDateString() === today.toDateString();
      } else if (filterDate === 'week') {
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        matchesDate = dateCreated >= lastWeek;
      } else if (filterDate === 'month') {
        matchesDate = dateCreated.getMonth() === today.getMonth() &&
                      dateCreated.getFullYear() === today.getFullYear();
      }

      return matchesType && matchesStatus && matchesDate;
    });
  };
  
  const filterReports = (reports: (MomoReport | WhatsAppReport | CryptoScamReport | EmailHackReport | EmploymentScamReport | FinancialFraudReport | IdentityTheftReport | LocationTrackingReport | OtherFraudReport | SextortionReport | ShoppingScamReport | SocialAccountReport )[], type: string) => {
    return reports.filter(report => {
      const dateCreated = new Date(report.createdAt);
      const today = new Date();
      
      const matchesType = filterType === 'all' || filterType === type;
      const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
      
      let matchesDate = true;
      if (filterDate === 'today') {
        matchesDate = dateCreated.toDateString() === today.toDateString();
      } else if (filterDate === 'week') {
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        matchesDate = dateCreated >= lastWeek;
      } else if (filterDate === 'month') {
        matchesDate = dateCreated.getMonth() === today.getMonth() && 
                      dateCreated.getFullYear() === today.getFullYear();
      }
      
      return matchesType && matchesStatus && matchesDate;
    });
  };
  
  


  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800',
      under_review: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-purple-100 text-purple-800',
      resolved: 'bg-green-100 text-green-800'
    };
    return colors[status.toLowerCase()] || colors.pending;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
              <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              {sidebarOpen && (
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
                  onClick={() => setSidebarOpen(false)}
                />
              )}
              <div className="flex-1 flex flex-col overflow-hidden ">
                <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        <div className="flex-1 overflow-auto p-6">
        <div className="mb-6 flex gap-4 flex-wrap">
  <select 
    className="p-2 border rounded"
    value={filterType}
    onChange={(e) => setFilterType(e.target.value)}
  >
    <option value="all">All Types</option>
    <option value="momo">Mobile Money</option>
    <option value="emergency">Emergency</option>
    <option value="crime">Quick Reports</option>
    <option value="whatsapp">WhatsApp</option>
    <option value="crypto">Crypto Scam</option>
    <option value="email">Email Hack</option>
    <option value="employment">Employment Scam</option>
    <option value="financial">Financial Fraud</option>
    <option value="identity">Identity Theft</option>
    <option value="location">Location Tracking</option>
    <option value="other"> Other Fraud</option>
    <option value="sextortion">Sextortion</option>
    <option value="shopping">Shopping Scam</option>
    <option value="social">Social Account</option>
    {/* Add other types */}
  </select>

  <select 
    className="p-2 border rounded"
    value={filterStatus} 
    onChange={(e) => setFilterStatus(e.target.value)}
  >
    <option value="all">All Status</option>
    <option value="pending">Pending</option>
    <option value="under_review">Under Review</option>
    <option value="in_progress">In Progress</option>
    <option value="resolved">Resolved</option>
  </select>

  <select
    className="p-2 border rounded"
    value={filterDate}
    onChange={(e) => setFilterDate(e.target.value)}
  >
    <option value="all">All Time</option>
    <option value="today">Today</option>
    <option value="week">This Week</option>
    <option value="month">This Month</option>
  </select>
</div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
            ) : (
              <div className="grid gap-8">
                <div>
                  <div className="grid gap-6">
                    {filterEmergencyReports(emergencyReports).map(report => (
                      <AdminEmergencyReportCard
                        key={report.caseNumber}
                        report={report}
                        isExpanded={expandedReport === report.caseNumber}
                        onToggle={() => setExpandedReport(
                          expandedReport === report.caseNumber ? null : report.caseNumber
                        )}
                        getStatusColor={getStatusColor}
                        onStatusUpdate={handleEmergencyStatusUpdate}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="grid gap-6">
                    {filterCrimeReports(crimeReport).map(report => (
                      <CrimeReportCard
                      key={report.caseNumber}
                      report={report}
                      isExpanded={expandedReport === report.caseNumber}
                      onToggle={() => setExpandedReport(
                        expandedReport === report.caseNumber ? null : report.caseNumber
                      )}
                        getStatusColor={getStatusColor}
                        onStatusUpdate={handleCrimeStatusUpdate}
                      />
                    ))}
                  </div>
                </div>
                <div>
                <div className="grid gap-6">
                {filterReports(momoReports, 'momo').map((report) => (
                    <AdminMomoReportCard
                      key={report.reportId}
                      report={report as MomoReport}
                      isExpanded={expandedReport === report.reportId}
                      onToggle={() => setExpandedReport(
                        expandedReport === report.reportId ? null : report.reportId
                      )}
                      getStatusColor={getStatusColor}
                      onStatusUpdate={handleMomoStatusUpdate}
                    />
                  ))}
                  </div>
                </div>
                  
                <div>
                <div className="grid gap-6">
                {filterReports(whatsappReports, 'whatsapp').map(report => (
                  <AdminWhatsAppReportCard
                    key={report.reportId}
                    report={report as WhatsAppReport}
                    isExpanded={expandedReport === report.reportId}
                    onToggle={() => setExpandedReport(
                      expandedReport === report.reportId ? null : report.reportId
                    )}
                    getStatusColor={getStatusColor}
                    onStatusUpdate={handleWhatsAppStatusUpdate}
                  />
                ))}
              </div>
                </div>
                <div>
                <div className="grid gap-6">
                  {filterReports(cryptoScamReports, 'crypto').map(report => (
                    <AdminCryptoScamReportCard
                      key={report.reportId}
                      report={report as CryptoScamReport}
                      isExpanded={expandedReport === report.reportId}
                      onToggle={() => setExpandedReport(
                        expandedReport === report.reportId ? null : report.reportId
                      )}
                      getStatusColor={getStatusColor}
                      onStatusUpdate={handleCryptoScamStatusUpdate}
                    />
                  ))}
                </div>

                  <div>
                  <div className="grid gap-6">
                    {filterReports(locationTrackingReports, 'location').map(report => (
                      <AdminLocationTrackingReportCard
                        key={report.reportId}
                        report={report as LocationTrackingReport}
                        isExpanded={expandedReport === report.reportId}
                        onToggle={() => setExpandedReport(
                          expandedReport === report.reportId ? null : report.reportId
                        )}
                        getStatusColor={getStatusColor}
                        onStatusUpdate={handleLocationTrackingStatusUpdate}
                      />
                    ))}
                  </div>

                  </div>
                  <div>
                  <div className="grid gap-6">
                    {filterReports(shoppingScamReports, 'shopping').map(report => (
                      <AdminShoppingScamReportCard
                        key={report.reportId}
                        report={report as ShoppingScamReport}
                        isExpanded={expandedReport === report.reportId}
                        onToggle={() => setExpandedReport(
                          expandedReport === report.reportId ? null : report.reportId
                        )}
                        getStatusColor={getStatusColor}
                        onStatusUpdate={handleShoppingScamStatusUpdate}
                      />
                    ))}
                  </div>

                  </div>
                  <div>
                  <div className="grid gap-6">
                    {filterReports(identityTheftReports, 'identity').map(report => (
                      <AdminIdentityTheftReportCard
                        key={report.reportId}
                        report={report as IdentityTheftReport}
                        isExpanded={expandedReport === report.reportId}
                        onToggle={() => setExpandedReport(
                          expandedReport === report.reportId ? null : report.reportId
                        )}
                        getStatusColor={getStatusColor}
                        onStatusUpdate={handleIdentityTheftStatusUpdate}
                      />
                    ))}
                  </div>

                  </div>
                  <div>
                  <div className="grid gap-6">
                    {filterReports(emailHackReports, 'email').map(report => (
                      <AdminEmailHackReportCard
                        key={report.reportId}
                        report={report as EmailHackReport}
                        isExpanded={expandedReport === report.reportId}
                        onToggle={() => setExpandedReport(
                          expandedReport === report.reportId ? null : report.reportId
                        )}
                        getStatusColor={getStatusColor}
                        onStatusUpdate={handleEmailHackStatusUpdate}
                      />
                    ))}
                  </div>

                  </div>
                  <div>
                  <div className="grid gap-6">
                    {filterReports(employmentScamReports, 'employment').map(report => (
                      <AdminEmploymentScamReportCard
                        key={report.reportId}
                        report={report as EmploymentScamReport}
                        isExpanded={expandedReport === report.reportId}
                        onToggle={() => setExpandedReport(
                          expandedReport === report.reportId ? null : report.reportId
                        )}
                        getStatusColor={getStatusColor}
                        onStatusUpdate={handleEmploymentScamStatusUpdate}
                      />
                    ))}
                  </div>

                  </div>
                  <div>
                  <div className="grid gap-6">
                    {filterReports(sextortionReports, 'sextortion').map(report => (
                      <AdminSextortionReportCard
                        key={report.reportId}
                        report={report as SextortionReport}
                        isExpanded={expandedReport === report.reportId}
                        onToggle={() => setExpandedReport(
                          expandedReport === report.reportId ? null : report.reportId
                        )}
                        getStatusColor={getStatusColor}
                        onStatusUpdate={handleSextortionStatusUpdate}
                      />
                    ))}
                  </div>

                  </div>
                  <div>
                  <div className="grid gap-6">
                      {filterReports(financialFraudReports, 'financial').map(report => (
                        <AdminFinancialFraudReportCard
                          key={report.reportId}
                          report={report as FinancialFraudReport}
                          isExpanded={expandedReport === report.reportId}
                          onToggle={() => setExpandedReport(
                            expandedReport === report.reportId ? null : report.reportId
                          )}
                          getStatusColor={getStatusColor}
                          onStatusUpdate={handleFinancialFraudStatusUpdate}
                        />
                      ))}
                    </div>

                  </div>
                  <div>
                  <div className="grid gap-6">
                  {filterReports(otherFraudReports, 'other').map(report => (
                    <AdminOtherFraudReportCard
                      key={report.reportId}
                      report={report as OtherFraudReport}
                      isExpanded={expandedReport === report.reportId}
                      onToggle={() => setExpandedReport(
                        expandedReport === report.reportId ? null : report.reportId
                      )}
                      getStatusColor={getStatusColor}
                      onStatusUpdate={handleOtherFraudStatusUpdate}
                    />
                  ))}
                </div>

                  </div>
                  <div>
                  <div className="grid gap-6">
                      {filterReports(socialAccountReports, 'social').map(report => (
                        <AdminSocialAccountReportCard
                          key={report.reportId}
                          report={report as SocialAccountReport}
                          isExpanded={expandedReport === report.reportId}
                          onToggle={() => setExpandedReport(
                            expandedReport === report.reportId ? null : report.reportId
                          )}
                          getStatusColor={getStatusColor}
                          onStatusUpdate={handleSocialAccountStatusUpdate}
                        />
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
