import { IdentityTheftReport } from './types';

// Admin function to fetch all reports
export const fetchAdminIdentityTheftReports = async (): Promise<IdentityTheftReport[]> => {
    const response = await fetch('/api/admin/identity-theft');
    const data = await response.json();
    
    if (data.success) {
      return data.data.map((report: IdentityTheftReport) => ({
        ...report,
        type: 'identity-theft'
      }));
    }
    return [];
};

// Admin function to update report status
export const updateIdentityTheftReportStatus = async (
  reportId: string, 
  newStatus: string,
  statusMessage: string
): Promise<boolean> => {
  const response = await fetch(`/api/identity-theft/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      reportId,
      status: newStatus,
      statusMessage 
    }),
  });

  const data = await response.json();
  return data.success;
};