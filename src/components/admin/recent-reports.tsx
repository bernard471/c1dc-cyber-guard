"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

interface Report {
  id: string;
  type: string;
  status: string;
  date: string;
}

interface RecentReportProps {
  reports: Report[];
}

export function RecentReports({ reports }: RecentReportProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((reportItem) => (
                <tr key={reportItem.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reportItem.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reportItem.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reportItem.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reportItem.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
