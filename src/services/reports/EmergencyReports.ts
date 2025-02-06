import { EmergencyReport } from './types';

// Admin function to fetch all emergency reports
export const fetchAdminEmergencyReports = async (): Promise<EmergencyReport[]> => {
    const response = await fetch('/api/admin/emergency-reports');
    const data = await response.json();
    
    if (data.success) {
      return data.data.map((report: EmergencyReport) => ({
        ...report,
        type: 'emergency'
      }));
    }
    return [];
};

// Admin function to update emergency report status
export const updateEmergencyReportStatus = async (
  caseNumber: string, 
  newStatus: string,
  statusMessage: string
): Promise<boolean> => {
  const response = await fetch(`/api/emergency-reports/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      caseNumber,
      status: newStatus,
      statusMessage 
    }),
  });

  const data = await response.json();
  return data.success;
};
