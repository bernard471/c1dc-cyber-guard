import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Clock, SendHorizontal } from 'lucide-react';
import { ConfirmationPopup } from './ConfirmationPopup';
import { TrackingDetailsPopup } from './TrackingDetailsPopup';


interface Location {
    latitude: number;
    longitude: number;
  }
  interface FormField {
    name: string;
    value: string;
  }


const severityLevels = [
    { value: 'critical', label: 'Critical - Immediate Response Needed', color: 'text-red-500' },
    { value: 'high', label: 'High - Urgent Attention Required', color: 'text-orange-500' },
    { value: 'medium', label: 'Medium - Priority Response', color: 'text-yellow-500' },
    { value: 'low', label: 'Low - Standard Response', color: 'text-blue-500' }
  ];
  

export const CrimeReportTabs = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isTracking, setIsTracking] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [location, setLocation] = useState<Location | null>(null);
    const [, setLocationError] = useState('');
    const [caseNumber, setCaseNumber] = useState('');
    const [activeTab, setActiveTab] = useState('report');
    const [trackingId, setTrackingId] = useState('');
    const [showTrackingDetails, setShowTrackingDetails] = useState(false);
    const [trackingDetails, setTrackingDetails] = useState(null);
    const [formData, setFormData] = useState({
      name: '',
      contact: '',
      description: '',
      severity: '',
      files: [] as File[],
      localAuthorities: false,
      useLocation: 'no' // Add this new field
    });
    
  const handleSeverityChange = (value: string): void => {
    setFormData(prev => ({
      ...prev,
      severity: value
    }));
  };
  
  const generateCaseNumber = () => {
    const date = new Date();
    const timestamp = date.getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `EM${timestamp}${random}`;
  };

   // Get user's location
   const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error: GeolocationPositionError) => {
          const errorMessage = error.code === 1 
            ? 'Location permission denied'
            : 'Unable to get your location. Please try again.';
          setLocationError(errorMessage);
        }
      );
    }
  };
  
  

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value }: FormField = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };

      const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
        });
      };

      const handleEmergencySubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const newCaseNumber = generateCaseNumber();
        setCaseNumber(newCaseNumber);
        
          try {
            // Process files before sending
            const processedFiles = await Promise.all(
              formData.files.map(async (file) => {
                const base64Data = await convertToBase64(file);
                return {
                  fileName: file.name,
                  fileData: base64Data,
                  fileType: file.type,
                  uploadDate: new Date()
                };
              })
            );
      

            const reportData = {
              caseNumber: newCaseNumber,
              name: formData.name,
              contact: formData.contact,
              severity: formData.severity,
              description: formData.description,
              files: processedFiles,
              // Only include location if user consented
              ...(formData.useLocation === 'yes' && location && { location })
            };
        
            const response = await fetch('/api/crime-reports', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(reportData),
            });
              
        
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Failed to submit emergency report');
            }
        
            setShowConfirmation(true);
            setFormData({
              name: '',
              contact: '',
              description: '',
              severity: '',
              files: [],
              localAuthorities: false,
              useLocation: 'no' // Add this new field
            });
          } catch (error) {
            console.error('Error submitting emergency report:', error);
          } finally {
            setIsSubmitting(false);
          }
      };

      const handleTrackCase = async () => {
        if (!trackingId) return;
        
        setIsTracking(true);
        
        try {
          const response = await fetch('/api/track-case', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
          },
            body: JSON.stringify({ caseNumber: trackingId })
          });
      
          const result = await response.json();
          
          // Set tracking details even if case not found
          setTrackingDetails(result.data);
          setShowTrackingDetails(true);
      
        } catch (error) {
          console.error('Error fetching case details:', error);
          // Show popup with null data to trigger NotFoundMessage
          setTrackingDetails(null);
          setShowTrackingDetails(true);
        } finally {
          setIsTracking(false);
        }
      };
      
      

  return (
  <>
  <section id="report-crime">
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-10 text-center backdrop-blur-lg max-w-2xl mx-auto rounded-lg p-8 shadow-lg"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex space-x-4 mt-8 lg:max-w-2xl mx-auto"
      >
        <button
          onClick={() => setActiveTab('report')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'report' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          Report Crime
        </button>
        <button
          onClick={() => setActiveTab('track')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'track' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          Track Case
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
       
      {activeTab === 'report' ? (
          <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
            className="space-y-4 mt-6 lg:max-w-2xl mx-auto"
          >
             <form onSubmit={handleEmergencySubmit} className="space-y-4">
            <Input 
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-gray-700 backdrop-blur-lg border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500"
            />
             <Input 
            placeholder="Contact Number"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-gray-700 backdrop-blur-lg border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500"
          />
          
          <Select 
            onValueChange={handleSeverityChange} 
            value={formData.severity}
            required
            >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Severity Level" />
            </SelectTrigger>
            <SelectContent>
                {severityLevels.map(level => (
                <SelectItem 
                    key={level.value} 
                    value={level.value}
                    className={level.color}
                >
                    {level.label}
                </SelectItem>
                ))}
            </SelectContent>
            </Select>


            <div className="flex flex-col space-y-2">
  <label className="text-gray-300">Include Your Location?</label>
  <div className="flex space-x-4">
    <label className="flex items-center space-x-2">
      <input
        type="radio"
        name="useLocation"
        value="yes"
        checked={formData.useLocation === 'yes'}
        onChange={(e) => {
          setFormData(prev => ({
            ...prev,
            useLocation: e.target.value
          }));
          if (e.target.value === 'yes') {
            getLocation();
          } else {
            setLocation(null);
          }
        }}
        className="text-blue-600"
      />
      <span className="text-gray-300">Yes</span>
    </label>
    <label className="flex items-center space-x-2">
      <input
        type="radio"
        name="useLocation"
        value="no"
        checked={formData.useLocation === 'no'}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          useLocation: e.target.value
        }))}
        className="text-blue-600"
      />
      <span className="text-gray-300">No</span>
    </label>
  </div>
</div>


          <Textarea
            placeholder="Describe the emergency situation..."
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-gray-700 backdrop-blur-lg border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500"
            rows={4}
          />

          <div className="flex items-center gap-2 text-sm text-yellow-500">
            <Clock className="h-4 w-4" />
            Typical response time: 24 hours
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
            <SendHorizontal className="h-4 w-4 mr-2" />
            Submit Report
            {isSubmitting ? "Sending..." : "Send Emergency Alert"}
          </Button>
            </form>
          </motion.div>      
          ) : (
            <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 mt-6 lg:max-w-2xl mx-auto"
          >
            <Input
              type="text"
              className="w-full p-3 bg-gray-700 border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500"
              placeholder="Enter Case ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <Button 
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              onClick={handleTrackCase}
              disabled={isTracking}
            >
              {isTracking ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Tracking...</span>
                </div>
              ) : (
                'Track Case'
              )}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
    <ConfirmationPopup 
        showConfirmation={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        caseNumber={caseNumber}
        location={location}
        />
<TrackingDetailsPopup 
  isOpen={showTrackingDetails}
  onClose={() => setShowTrackingDetails(false)}
  caseDetails={trackingDetails}
/>

</section>
    </>
  );
};