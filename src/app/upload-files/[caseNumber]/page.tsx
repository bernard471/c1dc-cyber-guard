'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';

export default function UploadFilesPage({ params }: { params: { caseNumber: string } }) {
  const router = useRouter();
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files) return;

    setUploading(true);
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch(`/api/reports/${params.caseNumber}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.push('/reports');
        router.refresh();
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Upload Files - Case {params.caseNumber}</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-600">Click to select files or drag and drop</span>
            </label>
          </div>

          {files && (
            <div className="space-y-2">
              <h3 className="font-medium">Selected Files:</h3>
              {Array.from(files).map((file, i) => (
                <div key={i} className="text-sm text-gray-600">
                  {file.name}
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={!files || uploading}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </form>
      </div>
    </div>
  );
}
