import { CryptoScamReport } from './types';

// Admin function to fetch all reports
export const fetchAdminCryptoScamReports = async (): Promise<CryptoScamReport[]> => {
    const response = await fetch('/api/admin/crypto-scam');
    const data = await response.json();
    
    if (data.success) {
      return data.data.map((report: CryptoScamReport) => ({
        ...report,
        type: 'crypto-scam'
      }));
    }
    return [];
};

// Admin function to update report status
export const updateCryptoScamReportStatus = async (
  reportId: string, 
  newStatus: string,
  statusMessage: string
): Promise<boolean> => {
  const response = await fetch(`/api/crypto-scam/status`, {
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