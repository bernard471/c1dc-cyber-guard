import React, { useEffect, useState } from 'react';
import { EvidenceCard } from './EvidenceCard';
import { FileX } from 'lucide-react';

interface EvidenceDisplayProps {
    reportId: string;
  }

  export const EvidenceDisplay = ({ reportId }: EvidenceDisplayProps) => {
    const [evidences, setEvidences] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchEvidence = async () => {
        try {
          const response = await fetch(`/api/upload-evidence?reportId=${reportId}`);
          const data = await response.json();
          if (data.success) {
            setEvidences(data.data);
          }
        } catch (error) {
          console.error('Failed to fetch evidence:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchEvidence();
    }, [reportId]);
  
    if (loading) {
      return <div className="text-center py-4">Loading evidence...</div>;
    }
  
    if (!evidences || evidences.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <FileX className="w-12 h-12 mb-2" />
          <p className="text-lg font-medium">No evidence available</p>
          <p className="text-sm">No evidence has been uploaded for this report yet.</p>
        </div>
      );
    }
  
    return (
      <div className="container mx-auto px-4 py-8">
        {evidences.map((evidence, index) => (
          <EvidenceCard key={index} evidence={evidence} />
        ))}
      </div>
    );
  };
  