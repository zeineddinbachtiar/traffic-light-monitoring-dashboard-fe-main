import { useState, useEffect } from 'react';
import PageHead from '@/components/shared/page-head.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, CheckCircle, AlertCircle, XCircle, Heart } from 'lucide-react'; // Import Heart icon for ECG
import DeviceList from './components/device-list';
import { Badge } from '@/components/ui/badge';
import { dashboard } from '@/api/dashboard';
import type { ResultType } from '@/api/dashboard';
import { Skeleton } from '@/components/ui/skeleton';
import { auth } from '@/api/auth';
import RoleProvider from '@/providers/role-provider';
import ECGChart from './components/ECGCharts';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [ecgData, setEcgData] = useState<{ heartRate: number; timestamp: string }[]>([]);

  const { checkRole } = auth();

  useEffect(() => {
    const fetchRoleAndData = async () => {
      try {
        const [role] = await Promise.all([checkRole()]);
        setRole(role);
      } catch (error) {
        console.error('Failed to fetch role or statistics:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoleAndData();
    const intervalId = setInterval(fetchRoleAndData, 1000 * 4);
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <div className="p-5">
        <Skeleton />
      </div>
    );
  }
  return (
    <RoleProvider allowedRole="technician">
      <PageHead title="User Page" />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8"> 
        <div className="mb-2 flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back User!
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          
        {/* <Card className="p-4">
            <h3 className="text-xl font-semibold">Heart Beat</h3>
            <p className="text-lg">{ecgData.length > 0 ? ${ecgData[0].heartRate} BPM : 'No data available'}</p>
          </Card> */}

        <Card className="col-span-2 md:col-span-5 w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ECG Monitoring</CardTitle>
              <Heart />
            </CardHeader>
            <CardContent>
              <ECGChart /> {/* Integrating ECGChart here */}
            </CardContent>
          </Card>
        </div>
      </div>
    </RoleProvider>
  );
}
