import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { useRotatingData } from '@/hooks/useRotatingData';

export function RevenueChart() {
  const revenueDatasets = [
    {
      data: [
        { month: 'Jan', current: 30, subscribers: 25, new: 20 },
        { month: 'Feb', current: 45, subscribers: 35, new: 30 },
        { month: 'Mar', current: 35, subscribers: 40, new: 25 },
        { month: 'Apr', current: 50, subscribers: 30, new: 35 },
        { month: 'May', current: 40, subscribers: 55, new: 30 },
        { month: 'Jun', current: 60, subscribers: 45, new: 40 },
        { month: 'Jul', current: 70, subscribers: 35, new: 50 },
        { month: 'Aug', current: 55, subscribers: 60, new: 45 },
        { month: 'Sep', current: 45, subscribers: 40, new: 35 },
        { month: 'Oct', current: 50, subscribers: 35, new: 40 },
        { month: 'Nov', current: 55, subscribers: 45, new: 50 },
        { month: 'Dec', current: 60, subscribers: 40, new: 45 }
      ],
      revenue: '$240.8K',
      change: '+60.2%'
    },
    {
      data: [
        { month: 'Jan', current: 25, subscribers: 30, new: 15 },
        { month: 'Feb', current: 40, subscribers: 25, new: 35 },
        { month: 'Mar', current: 30, subscribers: 45, new: 20 },
        { month: 'Apr', current: 55, subscribers: 35, new: 40 },
        { month: 'May', current: 35, subscribers: 50, new: 25 },
        { month: 'Jun', current: 65, subscribers: 40, new: 45 },
        { month: 'Jul', current: 75, subscribers: 30, new: 55 },
        { month: 'Aug', current: 50, subscribers: 65, new: 40 },
        { month: 'Sep', current: 40, subscribers: 45, new: 30 },
        { month: 'Oct', current: 55, subscribers: 30, new: 45 },
        { month: 'Nov', current: 60, subscribers: 50, new: 55 },
        { month: 'Dec', current: 65, subscribers: 35, new: 50 }
      ],
      revenue: '$285.4K',
      change: '+72.8%'
    },
    {
      data: [
        { month: 'Jan', current: 35, subscribers: 20, new: 25 },
        { month: 'Feb', current: 50, subscribers: 30, new: 25 },
        { month: 'Mar', current: 40, subscribers: 35, new: 30 },
        { month: 'Apr', current: 45, subscribers: 25, new: 30 },
        { month: 'May', current: 45, subscribers: 60, new: 35 },
        { month: 'Jun', current: 55, subscribers: 50, new: 35 },
        { month: 'Jul', current: 65, subscribers: 40, new: 45 },
        { month: 'Aug', current: 60, subscribers: 55, new: 50 },
        { month: 'Sep', current: 50, subscribers: 35, new: 40 },
        { month: 'Oct', current: 45, subscribers: 40, new: 35 },
        { month: 'Nov', current: 50, subscribers: 40, new: 45 },
        { month: 'Dec', current: 55, subscribers: 45, new: 40 }
      ],
      revenue: '$198.2K',
      change: '+45.6%'
    }
  ];

  const currentData = useRotatingData(revenueDatasets);
  return (
    <Card className="bg-dashboard-card border-dashboard-border p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground">Revenue by customer type</h3>
          <div className="text-sm text-muted-foreground">Jun 2024 - Dec 2024</div>
        </div>
        <div className="text-2xl font-bold text-foreground">{currentData.revenue}</div>
        <div className="text-sm text-status-success">{currentData.change}</div>
        
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-secondary"></div>
            <span className="text-sm text-muted-foreground">Current clients</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-sm text-muted-foreground">Subscribers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-success"></div>
            <span className="text-sm text-muted-foreground">New customers</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={currentData.data} barGap={4}>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis hide />
            <Bar dataKey="current" fill="#06B6D4" radius={[2, 2, 0, 0]} />
            <Bar dataKey="subscribers" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
            <Bar dataKey="new" fill="#10B981" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}