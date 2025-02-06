import { SocialAccountReport } from './types';

// Admin function to fetch all reports
export const fetchAdminSocialAccountReports = async (): Promise<SocialAccountReport[]> => {
    const response = await fetch('/api/admin/social-media-hack');
    const data = await response.json();
    
    if (data.success) {
      return data.data.map((report: SocialAccountReport) => ({
        ...report,
        type: 'social-account'
      }));
    }
    return [];
};

// Admin function to update report status
export const updateSocialAccountReportStatus = async (
  reportId: string, 
  newStatus: string,
  statusMessage: string
): Promise<boolean> => {
  const response = await fetch(`/api/social-media-hack/status`, {
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
