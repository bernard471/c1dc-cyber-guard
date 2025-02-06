import React, { useEffect, useState } from 'react';
import { EmergencyEvidenceCard } from './EmergencyEvidenceCard';
import { FileX } from 'lucide-react';

interface EmergencyEvidenceDisplayProps {
  caseNumber: string;
}

export const EmergencyEvidenceDisplay = ({ caseNumber }: EmergencyEvidenceDisplayProps) => {
  const [evidence, setEvidence] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        const response = await fetch(`/api/admin/emergency-reports/evidence?caseNumber=${caseNumber}`);
        const data = await response.json();
        console.log('Evidence data:', data);
        if (data.success) {
          setEvidence(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch evidence:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvidence();
  }, [caseNumber]);

  if (loading) {
    return <div className="text-center py-4">Loading evidence...</div>;
  }

  if (!evidence) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <FileX className="w-12 h-12 mb-2" />
        <p className="text-lg font-medium">No evidence available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <EmergencyEvidenceCard evidence={{ files: evidence }} />
    </div>
  );
};
