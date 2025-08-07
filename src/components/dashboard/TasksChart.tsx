import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const data = [
  { date: 'Jan 1', tasks: 300 },
  { date: 'Jan 8', tasks: 280 },
  { date: 'Jan 16', tasks: 320 },
  { date: 'Jan 24', tasks: 350 },
  { date: 'Jan 31', tasks: 340 },
  { date: 'Feb 1', tasks: 320 }
];

export function TasksChart() {
  return (
    <Card className="bg-dashboard-card border-dashboard-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-chart-secondary"></div>
            <span className="text-sm text-muted-foreground">Completed tasks over time</span>
          </div>
          <div className="text-2xl font-bold text-foreground">257</div>
          <div className="text-sm text-status-success">+18.8%</div>
        </div>
        <Button variant="outline" size="sm">
          Jan 2024
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </div>
      
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              hide
            />
            <YAxis hide />
            <Line 
              type="monotone" 
              dataKey="tasks" 
              stroke="#06B6D4" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}