import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricsCards } from '@/components/dashboard/MetricsCards';
import { WebsiteVisitorsChart } from '@/components/dashboard/WebsiteVisitorsChart';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { ProductsTable } from '@/components/dashboard/ProductsTable';
import { TasksChart } from '@/components/dashboard/TasksChart';
import { OrdersTable } from '@/components/dashboard/OrdersTable';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Metrics Cards */}
        <MetricsCards />
        
        {/* Charts Row */}
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
