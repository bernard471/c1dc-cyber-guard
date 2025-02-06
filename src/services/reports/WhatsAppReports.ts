import { WhatsAppReport } from './types';

// Admin function to fetch all reports
export const fetchAdminWhatsAppReports = async (): Promise<WhatsAppReport[]> => {
    const response = await fetch('/api/admin/whatsapp-hack');
    const data = await response.json();
    
    if (data.success) {
      return data.data.map((report: WhatsAppReport) => ({
        ...report,
        type: 'whatsapp'
      }));
    }
    return [];
};

// Admin function to update report status
export const updatewhatsappReportStatus = async (
  reportId: string, 
  newStatus: string,
  statusMessage: string
): Promise<boolean> => {
  const response = await fetch(`/api/whatsapp-hack/status`, {
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
