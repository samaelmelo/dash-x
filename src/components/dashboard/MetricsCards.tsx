import { ArrowUpIcon, ArrowDownIcon, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRotatingData } from '@/hooks/useRotatingData';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
}

function MetricCard({ title, value, change, isPositive, icon, color }: MetricCardProps) {
  return (
    <Card className="bg-dashboard-card border-dashboard-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${color}`}></div>
          <span className="text-sm text-muted-foreground">{title}</span>
        </div>
        <Button variant="ghost" size="sm" className="h-auto p-1">
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center gap-1">
          {isPositive ? (
            <ArrowUpIcon className="w-3 h-3 text-status-success" />
          ) : (
            <ArrowDownIcon className="w-3 h-3 text-status-error" />
          )}
          <span className={`text-xs font-medium ${
            isPositive ? 'text-status-success' : 'text-status-error'
          }`}>
            {change}
          </span>
        </div>
      </div>
    </Card>
  );
}

export function MetricsCards() {
  const metricsDatasets = [
    [
      {
        title: 'Save Products',
        value: '50.8K',
        change: '30.1%',
        isPositive: true,
        icon: '💜',
        color: 'bg-primary'
      },
      {
        title: 'Stock Products',
        value: '23.6K',
        change: '12.0%',
        isPositive: false,
        icon: '👥',
        color: 'bg-status-error'
      },
      {
        title: 'Sale Products',
        value: '756',
        change: '9.1%',
        isPositive: true,
        icon: '🛍️',
        color: 'bg-status-success'
      },
      {
        title: 'Average Revenue',
        value: '2.3K',
        change: '11.9%',
        isPositive: true,
        icon: '💰',
        color: 'bg-chart-secondary'
      }
    ],
    [
      {
        title: 'Save Products',
        value: '47.2K',
        change: '25.3%',
        isPositive: true,
        icon: '💜',
        color: 'bg-primary'
      },
      {
        title: 'Stock Products',
        value: '28.1K',
        change: '8.7%',
        isPositive: true,
        icon: '👥',
        color: 'bg-status-error'
      },
      {
        title: 'Sale Products',
        value: '892',
        change: '15.4%',
        isPositive: true,
        icon: '🛍️',
        color: 'bg-status-success'
      },
      {
        title: 'Average Revenue',
        value: '2.8K',
        change: '18.2%',
        isPositive: true,
        icon: '💰',
        color: 'bg-chart-secondary'
      }
    ],
    [
      {
        title: 'Save Products',
        value: '53.9K',
        change: '22.8%',
        isPositive: false,
        icon: '💜',
        color: 'bg-primary'
      },
      {
        title: 'Stock Products',
        value: '19.4K',
        change: '5.2%',
        isPositive: false,
        icon: '👥',
        color: 'bg-status-error'
      },
      {
        title: 'Sale Products',
        value: '634',
        change: '12.9%',
        isPositive: true,
        icon: '🛍️',
        color: 'bg-status-success'
      },
      {
        title: 'Average Revenue',
        value: '2.1K',
        change: '7.5%',
        isPositive: false,
        icon: '💰',
        color: 'bg-chart-secondary'
      }
    ]
  ];

  const currentMetrics = useRotatingData(metricsDatasets);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {currentMetrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}