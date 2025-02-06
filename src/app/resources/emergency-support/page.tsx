"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogFooter,} from "@/components/ui/dialog";
import {Phone,AlertTriangle,Shield,SendHorizontal,HeartPulse,PhoneCall,ShieldAlert,Clock,MapPin,AlertCircle, CheckCircle} from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';



interface Location {
  latitude: number;
  longitude: number;
}
interface FormField {
  name: string;
  value: string;
}



const EmergencySupport = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState('emergency-support');
  const [location, setLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    description: '',
    severity: '',
    files: [] as File[],
    localAuthorities: false
  });

  const [] = useState<Array<{
    file: File;
    preview: string;
  }>>([]);

  // Generate priority case number
  const generateCaseNumber = () => {
    const date = new Date();
    const timestamp = date.getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `EM${timestamp}${random}`;
  };

  // Get user's location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          setLocationError('Unable to get your location. Please enter it manually.');
          console.error(error);
        }
      );
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value }: FormField = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSeverityChange = (value: string): void => {
    setFormData(prev => ({
      ...prev,
      severity: value
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
  

  // Update the handleEmergencySubmit function
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

      const response = await fetch('/api/emergency-reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caseNumber: newCaseNumber,
          name: formData.name,
          contact: formData.contact,
          severity: formData.severity,
          description: formData.description,
          location: location,
          files: processedFiles // Send the processed files
        }),
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
        localAuthorities: false
      });
    } catch (error) {
      console.error('Error submitting emergency report:', error);
    } finally {
      setIsSubmitting(false);
    }
};

  


  const severityLevels = [
    { value: 'critical', label: 'Critical - Immediate Response Needed', color: 'text-red-500' },
    { value: 'high', label: 'High - Urgent Attention Required', color: 'text-orange-500' },
    { value: 'medium', label: 'Medium - Priority Response', color: 'text-yellow-500' },
    { value: 'low', label: 'Low - Standard Response', color: 'text-blue-500' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
      <DashboardHeader />
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Emergency Header */}
      <Alert variant="destructive" className="mb-6">
        <div className="flex gap-2">
        <AlertTriangle className="h-4 w-5" />
        <AlertTitle className='font-bold'>Emergency Support Center</AlertTitle>
        </div>
        <AlertDescription>
          For immediate life-threatening emergencies, always call your local emergency services first.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 md:grig-cols-1 gap-6 mb-6">
        {/* Emergency Contacts Card */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-red-500" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <ShieldAlert className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium">Emergency Hotline</p>
                  <p className="text-sm text-gray-500">24/7 Crisis Support</p>
                </div>
              </div>
              <a href="tel:+233243457358">
            <Button variant="destructive" className="gap-2">
              <PhoneCall className="h-4 w-4" />
              Call Now
            </Button>
          </a>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">Local Authorities</p>
                  <p className="text-sm text-gray-500">Direct Connection</p>
                </div>
              </div>
              <Link href="/resources/local-authorities">
              <Button variant="outline" className="gap-2 border-blue-500 text-blue-500 hover:bg-blue-50">
                <PhoneCall className="h-4 w-4" />
                Connect
              </Button>
            </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Report Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-red-500" />
              Quick Emergency Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmergencySubmit} className="space-y-4">
              <div>
                <Input 
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mb-3"
                />
                <Input 
                  placeholder="Contact Number"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  className="mb-3"
                />
                
                {/* Severity Level Selector */}
                <Select 
                  onValueChange={handleSeverityChange} 
                  value={formData.severity}
                  required
                >
                  <SelectTrigger className="mb-3">
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

                {/* Location Display */}
                <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  {location ? (
                    <span>Location detected</span>
                  ) : (
                    <span>{locationError || 'Detecting location...'}</span>
                  )}
                </div>

                <Textarea 
                  placeholder="Describe the emergency situation..."
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="mb-3"
                />

                
                
              </div>

              <div className="items-center">
                <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  Typical response time: 5 minutes
                </div>
                <Button type="submit" variant="destructive" disabled={isSubmitting}>
                  <SendHorizontal className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Emergency Alert"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
      <DialogContent className="max-w-md mx-auto">
      <DialogHeader className="space-y-4">
      <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
      <CheckCircle className="h-6 w-6 text-green-500" />
      Emergency Alert Sent
    </DialogTitle>
    <DialogDescription className="text-center text-base">
      Your emergency alert has been received. Our support team will contact you immediately.
    </DialogDescription>
    
    <div className="mt-6 space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Case Number:</span>
        <span className="font-mono font-bold text-primary">{caseNumber}</span>
      </div>
      
      {location && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4 text-blue-500" />
          <span>
            {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
          </span>
        </div>
      )}
    </div>

    <Alert className="mt-4 border-amber-200 bg-amber-50">
      <AlertCircle className="h-5 w-5 text-amber-600" />
      <AlertDescription className="text-amber-700 font-medium">
        Please keep your phone line open and stay at your current location if safe to do so.
      </AlertDescription>
      </Alert>
      </DialogHeader>
      <DialogFooter className="mt-6">
        <Button 
          variant="outline" 
          onClick={() => setShowConfirmation(false)}
          className="w-full"
        >
          Close
        </Button>
        <Link href={`/evidence-page?caseNumber=${caseNumber}`}>
          <Button variant="secondary" className="w-full mt-2">
            Submit Additional Evidence
          </Button>
        </Link>
      </DialogFooter>
    </DialogContent>

   
      </Dialog>

    </div>
    </div>
    </div>
  );
};

export default EmergencySupport;
