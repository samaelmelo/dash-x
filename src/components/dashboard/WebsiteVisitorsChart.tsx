import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const data = [
  { name: 'Organic', value: 30, color: '#8B5CF6' },
  { name: 'Social', value: 50, color: '#06B6D4' },
  { name: 'Direct', value: 20, color: '#10B981' }
];

export function WebsiteVisitorsChart() {
  return (
    <Card className="bg-dashboard-card border-dashboard-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Website Visitors</h3>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          Export
          <Download className="w-4 h-4 ml-2" />
        </Button>
      </div>
      
      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">150k</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 mt-6">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}