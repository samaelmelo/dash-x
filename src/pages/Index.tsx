import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { InteractiveCharts } from '@/components/dashboard/InteractiveCharts';
import { MetricsCards } from '@/components/dashboard/MetricsCards';
import { WebsiteVisitorsChart } from '@/components/dashboard/WebsiteVisitorsChart';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { ProductsTable } from '@/components/dashboard/ProductsTable';
import { TasksChart } from '@/components/dashboard/TasksChart';
import { OrdersTable } from '@/components/dashboard/OrdersTable';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Dashboard Filters */}
        <DashboardFilters onRefresh={handleRefresh} isLoading={isLoading} />
        
        {/* Metrics Cards */}
        <MetricsCards />
        
        {/* Quick Actions and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <QuickActions />
          </div>
          <ActivityFeed />
        </div>
        
        {/* Interactive Charts */}
        <InteractiveCharts />
        
        {/* Original Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <WebsiteVisitorsChart />
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
        </div>
        
        {/* Products and Tasks Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProductsTable />
          <div className="lg:col-span-2">
            <TasksChart />
          </div>
        </div>
        
        {/* Orders Table */}
        <OrdersTable />
      </div>
    </DashboardLayout>
  );
};

export default Index;
