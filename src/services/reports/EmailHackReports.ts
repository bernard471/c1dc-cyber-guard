import { EmailHackReport } from './types';

// Admin function to fetch all reports
export const fetchAdminEmailHackReports = async (): Promise<EmailHackReport[]> => {
    const response = await fetch('/api/admin/email-hack');
    const data = await response.json();
    
    if (data.success) {
      return data.data.map((report: EmailHackReport) => ({
        ...report,
        type: 'email-hack'
      }));
    }
    return [];
};

// Admin function to update report status
export const updateEmailHackReportStatus = async (
  reportId: string, 
  newStatus: string,
  statusMessage: string
): Promise<boolean> => {
  const response = await fetch(`/api/email-hack/status`, {
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