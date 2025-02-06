import { ShoppingScamReport } from './types';

// Admin function to fetch all reports
export const fetchAdminShoppingScamReports = async (): Promise<ShoppingScamReport[]> => {
    const response = await fetch('/api/admin/shopping-scam');
    const data = await response.json();
    
    if (data.success) {
      return data.data.map((report: ShoppingScamReport) => ({
        ...report,
        type: 'shopping-scam'
      }));
    }
    return [];
};

// Admin function to update report status
export const updateShoppingScamReportStatus = async (
  reportId: string, 
  newStatus: string,
  statusMessage: string
): Promise<boolean> => {
  const response = await fetch(`/api/shopping-scam/status`, {
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
