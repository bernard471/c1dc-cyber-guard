import { FinancialFraudReport } from './types';

// Admin function to fetch all reports
export const fetchAdminFinancialFraudReports = async (): Promise<FinancialFraudReport[]> => {
    const response = await fetch('/api/admin/financial-fraud');
    const data = await response.json();
    
    if (data.success) {
      return data.data.map((report: FinancialFraudReport) => ({
        ...report,
        type: 'financial-fraud'
      }));
    }
    return [];
};

// Admin function to update report status
export const updateFinancialFraudReportStatus = async (
  reportId: string, 
  newStatus: string,
  statusMessage: string
): Promise<boolean> => {
  const response = await fetch(`/api/financial-fraud/status`, {
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
