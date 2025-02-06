import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Shield, PhoneCall, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export const EmergencyContactsCard = () => {
  return (
    <Card className="border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-red-500" />
          Emergency Contacts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <EmergencyHotline />
        <LocalAuthorities />
      </CardContent>
    </Card>
  );
};

const EmergencyHotline = () => (
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
);

const LocalAuthorities = () => (
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
);
