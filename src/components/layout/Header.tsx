import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="h-16 border-b border-dashboard-border bg-background px-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="bg-primary text-primary-foreground border-primary">
          May 2022
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </header>
  );
}