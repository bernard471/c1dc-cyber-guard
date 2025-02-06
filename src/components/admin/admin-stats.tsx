"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

interface AdminStatsProps {
  totalReports: number;
  activeReports: number;
  totalUsers: number;
  
}

export function AdminStats({ 
  totalReports, 
  activeReports, 
  totalUsers, 
  
}: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Total Reports</CardTitle>
          <CardDescription>All time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalReports}</div>
        </CardContent>
      </Card>

      <Card className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Active Reports</CardTitle>
          <CardDescription>Currently open</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeReports}</div>
        </CardContent>
      </Card>

      <Card className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
          <CardDescription>Registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUsers}</div>
        </CardContent>
      </Card>
    </div>
  );
}
