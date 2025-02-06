import { SextortionReport } from './types';

// Admin function to fetch all reports
export const fetchAdminSextortionReports = async (): Promise<SextortionReport[]> => {
    const response = await fetch('/api/admin/sextortion');
    const data = await response.json();
    
    if (data.success) {
      return data.data.map((report: SextortionReport) => ({
        ...report,
        type: 'sextortion'
      }));
    }
    return [];
};

// Admin function to update report status
export const updateSextortionReportStatus = async (
  reportId: string, 
  newStatus: string,
  statusMessage: string
): Promise<boolean> => {
  const response = await fetch(`/api/sextortion/status`, {
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