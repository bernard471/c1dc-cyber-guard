"use client"

import { useEffect, useState } from 'react'

interface Report {
  id: string
  type: string
  status: string
  date: string
}

export default function RecentReports() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentReports = async () => {
      try {
        const response = await fetch('/api/reports/recent')
        const jsonData = await response.json()
        
        if (jsonData.success && Array.isArray(jsonData.data)) {
          setReports(jsonData.data)
        } else {
          setReports([])
        }
      } catch (error) {
        console.error('Error fetching reports:', error)
        setReports([])
      } finally {
        setLoading(false)
      }
    }

    fetchRecentReports()
  }, [])

  if (loading) {
    return <div>Loading recent reports...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{report.id}</td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{report.type}</td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      report.status === 'resolved'
                        ? 'bg-green-100 text-green-800'
                        : report.status === 'in_progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : report.status === 'under_review'
                        ? 'bg-blue-100 text-blue-800'
                        : report.status === 'pending'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {report.status.replace('_', ' ').charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{report.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 sm:px-6 py-4 text-center text-sm text-gray-500">
                  No reports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
