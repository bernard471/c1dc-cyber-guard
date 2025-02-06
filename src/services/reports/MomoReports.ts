import { MomoReport } from './types';

// New admin function
export const fetchAdminMomoReports = async (): Promise<MomoReport[]> => {
    const response = await fetch('/api/admin/momo-fraud');
    const data = await response.json();
    
    if (data.success) {
      return data.data.map((report: MomoReport) => ({
        ...report,
        type: 'momo'
      }));
    }
    return [];
  };
  


  export const updateReportStatus = async (
    reportId: string, 
    newStatus: string,
    statusMessage: string
  ): Promise<boolean> => {
    const response = await fetch(`/api/momo-fraud/status`, { // <-- No reportId in URL
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        reportId, // <-- Send reportId in the request body
        status: newStatus,
        statusMessage 
      }),
    });
  
    const data = await response.json();
    return data.success;
  };
  


