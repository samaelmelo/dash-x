import { Card } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const products = [
  {
    id: '#524',
    name: 'iPhone 14 Pro Max',
    stock: '324 in stock',
    price: '$1,099.00'
  },
  {
    id: '',
    name: 'Apple Watch S8',
    stock: '320 in stock',
    price: '$799.00'
  }
];

export function ProductsTable() {
  return (
    <Card className="bg-dashboard-card border-dashboard-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Products</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Price</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-primary rounded"></div>
            </div>
            
            <div className="flex-1">
              <div className="font-medium text-foreground">{product.name}</div>
              <div className="text-sm text-muted-foreground">{product.stock}</div>
            </div>
            
            <div className="text-right">
              <div className="font-medium text-foreground">{product.price}</div>
              {product.id && (
                <div className="text-sm text-muted-foreground">{product.id}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}