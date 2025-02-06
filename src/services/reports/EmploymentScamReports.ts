import { EmploymentScamReport } from './types';

// Admin function to fetch all reports
export const fetchAdminEmploymentScamReports = async (): Promise<EmploymentScamReport[]> => {
    const response = await fetch('/api/admin/employment-scam');
    const data = await response.json();
    
    if (data.success) {
      return data.data.map((report: EmploymentScamReport) => ({
        ...report,
        type: 'employment-scam'
      }));
    }
    return [];
};

// Admin function to update report status
export const updateEmploymentScamReportStatus = async (
  reportId: string, 
  newStatus: string,
  statusMessage: string
): Promise<boolean> => {
  const response = await fetch(`/api/employment-scam/status`, {
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
