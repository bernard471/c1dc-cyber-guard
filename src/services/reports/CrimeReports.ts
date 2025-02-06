import { CrimeReport } from './types';

// Admin function to fetch all crime reports
export const fetchAdminCrimeReports = async (): Promise<CrimeReport[]> => {
    const response = await fetch('/api/admin/crime-reports');
    const data = await response.json();
    
    if (data.success) {
      return data.data.map((report: CrimeReport) => ({
        ...report,
        type: 'crime'
      }));
    }
    return [];
};

// Admin function to update crime report status
export const updateCrimeReportStatus = async (
  caseNumber: string, 
  newStatus: string,
  statusMessage: string
): Promise<boolean> => {
  const response = await fetch(`/api/crime-reports/status`, {
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
