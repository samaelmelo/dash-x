import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, Edit, Trash2 } from 'lucide-react';

const orders = [
  {
    id: '#592',
    order: '#592',
    client: 'John Carter',
    email: 'hello@johncarter.com',
    date: 'Jan 30, 2024',
    status: 'Delivered',
    statusColor: 'bg-status-success',
    country: 'United States',
    total: '$1,099.24'
  },
  {
    id: '#531',
    order: '#531',
    client: 'Sophie Moore',
    email: 'contact@sophiemoore.com',
    date: 'Jan 27, 2024',
    status: 'Canceled',
    statusColor: 'bg-status-error',
    country: 'United Kingdom',
    total: '$3,870.32'
  },
  {
    id: '#530',
    order: '#530',
    client: 'Matt Cannon',
    email: 'info@mattcannon.com',
    date: 'Jan 24, 2024',
    status: 'Delivered',
    statusColor: 'bg-status-success',
    country: 'Australia',
    total: '$10,899.48'
  },
  {
    id: '#529',
    order: '#529',
    client: 'Graham Hills',
    email: 'hi@grahamhills.com',
    date: 'Jan 21, 2024',
    status: 'Pending',
    statusColor: 'bg-status-warning',
    country: 'India',
    total: '$1,699.12'
  },
  {
    id: '#528',
    order: '#528',
    client: 'Sandy Houston',
    email: 'contact@sandyhouston.com',
    date: 'Jan 18, 2024',
    status: 'Delivered',
    statusColor: 'bg-status-success',
    country: 'Canada',
    total: '$895.16'
  },
  {
    id: '#527',
    order: '#527',
    client: 'Andy Smith',
    email: 'hello@andysmith.com',
    date: 'Jan 16, 2024',
    status: 'Pending',
    statusColor: 'bg-status-warning',
    country: 'United States',
    total: '$2,249.64'
  }
];

export function OrdersTable() {
  return (
    <Card className="bg-dashboard-card border-dashboard-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Orders Status</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Jan 2024
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground border-primary">
            Create order
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dashboard-border">
              <th className="text-left text-sm font-medium text-muted-foreground py-3">Order</th>
              <th className="text-left text-sm font-medium text-muted-foreground py-3">Client</th>
              <th className="text-left text-sm font-medium text-muted-foreground py-3">Date</th>
              <th className="text-left text-sm font-medium text-muted-foreground py-3">Status</th>
              <th className="text-left text-sm font-medium text-muted-foreground py-3">Country</th>
              <th className="text-left text-sm font-medium text-muted-foreground py-3">Total</th>
              <th className="w-20"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-dashboard-border/50">
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm text-foreground">{order.order}</span>
                  </div>
                </td>
                <td className="py-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">{order.client}</div>
                    <div className="text-xs text-muted-foreground">{order.email}</div>
                  </div>
                </td>
                <td className="py-4">
                  <span className="text-sm text-foreground">{order.date}</span>
                </td>
                <td className="py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${order.statusColor}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4">
                  <span className="text-sm text-foreground">{order.country}</span>
                </td>
                <td className="py-4">
                  <span className="text-sm font-medium text-foreground">{order.total}</span>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}