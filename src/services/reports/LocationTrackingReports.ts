import { LocationTrackingReport } from './types';

// Admin function to fetch all reports
export const fetchAdminLocationTrackingReports = async (): Promise<LocationTrackingReport[]> => {
    const response = await fetch('/api/admin/location-tracking');
    const data = await response.json();
    
    if (data.success) {
      return data.data.map((report: LocationTrackingReport) => ({
        ...report,
        type: 'location-tracking'
      }));
    }
    return [];
};

// Admin function to update report status
export const updateLocationTrackingReportStatus = async (
  reportId: string, 
  newStatus: string,
  statusMessage: string
): Promise<boolean> => {
  const response = await fetch(`/api/location-tracking/status`, {
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