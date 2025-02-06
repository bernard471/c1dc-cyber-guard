import { OtherFraudReport } from './types';

// Admin function to fetch all reports
export const fetchAdminOtherFraudReports = async (): Promise<OtherFraudReport[]> => {
    const response = await fetch('/api/admin/other-fraud');
    const data = await response.json();
    
    if (data.success) {
      return data.data.map((report: OtherFraudReport) => ({
        ...report,
        type: 'other-fraud'
      }));
    }
    return [];
};

// Admin function to update report status
export const updateOtherFraudReportStatus = async (
  reportId: string, 
  newStatus: string,
  statusMessage: string
): Promise<boolean> => {
  const response = await fetch(`/api/other-fraud/status`, {
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
