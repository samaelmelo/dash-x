import { ChevronDown, Search, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NotificationCenter } from '@/components/dashboard/NotificationCenter';
import { KeyboardShortcuts } from '@/components/dashboard/KeyboardShortcuts';

export function Header() {
  return (
    <header className="h-16 border-b border-dashboard-border bg-background px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
        <div className="relative hidden lg:block">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar..." className="pl-8 w-64" />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <KeyboardShortcuts />
        <NotificationCenter />
        <Button variant="outline" size="sm">
          <Maximize className="w-4 h-4 mr-2" />
          Fullscreen
        </Button>
        <Button variant="outline" size="sm" className="bg-primary text-primary-foreground border-primary">
          May 2022
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </header>
  );
}