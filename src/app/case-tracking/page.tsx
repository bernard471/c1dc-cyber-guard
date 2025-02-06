"use client"

import React, { useState } from 'react';
import { 
  Search,
 
  ChevronDown,
  ChevronUp,
  Eye,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  
  MessageSquare
} from 'lucide-react';


const CaseTracker = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  interface Case {
    id: string;
    type: string;
    status: string;
    priority: string;
    dateSubmitted: string;
    lastUpdated: string;
    description: string;
    updates: { date: string; message: string; }[];
  }
  
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  // Sample data - replace with actual API call
  const cases = [
    {
      id: 'CR-2025-001',
      type: 'Social Media Account Hack',
      status: 'in_progress',
      priority: 'high',
      dateSubmitted: '2025-01-20',
      lastUpdated: '2025-01-22',
      description: 'Facebook account compromised, unauthorized posts being made',
      updates: [
        { date: '2025-01-22', message: 'Investigation ongoing with platform security team' },
        { date: '2025-01-21', message: 'Case assigned to cybersecurity specialist' },
        { date: '2025-01-20', message: 'Case received and under initial review' }
      ]
    },
    {
      id: 'CR-2025-002',
      type: 'Mobile Money Fraud',
      status: 'pending',
      priority: 'medium',
      dateSubmitted: '2025-01-19',
      lastUpdated: '2025-01-19',
      description: 'Unauthorized transaction of GHS 2000 from MTN Mobile Money account',
      updates: [
        { date: '2025-01-19', message: 'Case received and under initial review' }
      ]
    },
    {
      id: 'CR-2025-003',
      type: 'Email Hack',
      status: 'resolved',
      priority: 'high',
      dateSubmitted: '2025-01-15',
      lastUpdated: '2025-01-18',
      description: 'Corporate email account compromised, sensitive data at risk',
      updates: [
        { date: '2025-01-18', message: 'Account secured, new security measures implemented' },
        { date: '2025-01-17', message: 'Working with IT department on security protocols' },
        { date: '2025-01-16', message: 'Investigation reveals breach point' },
        { date: '2025-01-15', message: 'Case received and marked as high priority' }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'in_progress':
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'closed':
        return <XCircle className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending Review';
      case 'in_progress':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
      case 'closed':
        return 'Closed';
      default:
        return status;
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const filteredCases = cases
    .filter(case_ => 
      (filterStatus === 'all' || case_.status === filterStatus) &&
      (case_.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
       case_.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
       case_.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      const order = sortOrder === 'asc' ? 1 : -1;
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * order;
      }
      return aValue > bValue ? order : -order;
    });
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Case Tracking</h2>
      
      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by case ID, type, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Case List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="min-w-full divide-y divide-gray-200">
          <div className="bg-gray-50">
            <div className="flex divide-x divide-gray-200">
              <div className="w-32 px-6 py-3 text-left">
                <button
                  onClick={() => {
                    setSortBy('id');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                  className="flex items-center text-xs font-medium text-gray-500 uppercase"
                >
                  Case ID
                  {sortBy === 'id' && (
                    sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </button>
              </div>
              <div className="flex-1 px-6 py-3">
                <button
                  onClick={() => {
                    setSortBy('type');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                  className="flex items-center text-xs font-medium text-gray-500 uppercase"
                >
                  Type
                  {sortBy === 'type' && (
                    sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </button>
              </div>
              <div className="w-32 px-6 py-3">
                <span className="text-xs font-medium text-gray-500 uppercase">Status</span>
              </div>
              <div className="w-32 px-6 py-3">
                <button
                  onClick={() => {
                    setSortBy('dateSubmitted');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                  className="flex items-center text-xs font-medium text-gray-500 uppercase"
                >
                  Date
                  {sortBy === 'dateSubmitted' && (
                    sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </button>
              </div>
              <div className="w-24 px-6 py-3">
                <span className="text-xs font-medium text-gray-500 uppercase">Actions</span>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredCases.map(case_ => (
              <div key={case_.id} className="hover:bg-gray-50">
                <div className="flex divide-x divide-gray-200">
                  <div className="w-32 px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{case_.id}</span>
                  </div>
                  <div className="flex-1 px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{case_.type}</span>
                      <span className="text-sm text-gray-500">{case_.description}</span>
                    </div>
                  </div>
                  <div className="w-32 px-6 py-4">
                    <div className="flex items-center">
                      {getStatusIcon(case_.status)}
                      <span className="ml-2 text-sm text-gray-900">{getStatusText(case_.status)}</span>
                    </div>
                  </div>
                  <div className="w-32 px-6 py-4">
                    <div className="flex flex-col text-sm text-gray-500">
                      <span>Submitted:</span>
                      <span>{case_.dateSubmitted}</span>
                    </div>
                  </div>
                  <div className="w-24 px-6 py-4">
                    <button
                      onClick={() => setSelectedCase(case_)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Details Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gray-900">{selectedCase.type}</h3>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Case ID:</span>
                  <span className="text-sm text-gray-900">{selectedCase.id}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <div className="flex items-center">
                    {getStatusIcon(selectedCase.status)}
                    <span className="ml-2 text-sm text-gray-900">
                      {getStatusText(selectedCase.status)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Priority:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityClass(selectedCase.priority)}`}>
                    {selectedCase.priority.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Description:</h4>
                  <p className="text-sm text-gray-900">{selectedCase.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Case Updates:</h4>
                  <div className="space-y-4">
                    {selectedCase.updates.map((update: { date: string; message: string }, index: number) => (
                      <div key={index} className="flex space-x-4 text-sm">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                            <MessageSquare className="w-4 h-4 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{update.date}</div>
                          <div className="mt-1 text-gray-700">{update.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseTracker;
