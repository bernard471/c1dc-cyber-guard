"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {Shield,PhoneCall, Phone ,ShieldAlert,Building2,Siren,Flame,BadgeAlert} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';



const EmergencySupport = () => {
    const [activeTab, setActiveTab] = useState('local-authorities');
  
  // Emergency service contacts
  const emergencyServices = [
    {
      id: 'police',
      name: 'Ghana Police Service',
      icon: <Shield className="h-5 w-5 text-blue-500" />,
      contact: '191',
      description: 'Law enforcement and criminal cases',
      available: true
    },
    {
      id: 'csa',
      name: 'Cyber Security Authority',
      icon: <ShieldAlert className="h-5 w-5 text-green-500" />,
      contact: '292',
      description: 'Cybercrime and digital security',
      available: true
    },
    {
      id: 'bni',
      name: 'Bureau of National Investigation',
      icon: <BadgeAlert className="h-5 w-5 text-purple-500" />,
      contact: 'Confidential',
      description: 'National security matters',
      available: false
    },
    {
      id: 'army',
      name: 'Ghana Armed Forces',
      icon: <Siren className="h-5 w-5 text-red-500" />,
      contact: 'Emergency Only',
      description: 'Military assistance and national security',
      available: false
    },
    {
      id: 'eoco',
      name: 'Economic & Organized Crime Office',
      icon: <Building2 className="h-5 w-5 text-orange-500" />,
      contact: '233',
      description: 'Financial crimes and corruption',
      available: false
    },
    {
      id: 'fire',
      name: 'Ghana Fire Service',
      icon: <Flame className="h-5 w-5 text-red-500" />,
      contact: '192',
      description: 'Fire emergencies and rescue',
      available: true
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
      <DashboardHeader />
    <div className="container mx-auto p-4 max-w-6xl">
      <div defaultValue="services" className="mb-6">
        <div className="flex items-center text-green-500 justify-center gap-4 bg-white rounded-lg border border-2 border-green-500 text-2xl p-3 mb-4">
          <Phone  />
          <h2>Emergency Services</h2>
          </div>
          <div >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {emergencyServices.map((service) => (
                <Card key={service.id} className={`border-l-4 ${
                  service.available ? 'border-l-green-500' : 'border-l-gray-300'
                }`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {service.icon}
                      {service.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <div className="flex justify-between items-center">
                        <Badge variant={service.available ? 'default' : 'secondary'}>
                          {service.available ? 'Available' : 'Unavailable'}
                        </Badge>
                        <a href={`tel:${service.contact}`}>
                        <Button variant="outline" className="gap-2" disabled={!service.available}>
                          <PhoneCall className="h-4 w-4" />
                          {service.contact}
                        </Button>
                      </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div> 
        </div>
    </div>
    </div>
    </div>
  );
};

export default EmergencySupport;
