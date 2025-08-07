import { 
  BarChart3, 
  Users, 
  Package, 
  Settings, 
  FileText, 
  Star,
  ChevronDown,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigationItems = [
  { name: 'All pages', icon: FileText, isActive: false },
  { name: 'Reports', icon: BarChart3, isActive: true },
  { name: 'Products', icon: Package, isActive: false },
  { name: 'Task', icon: FileText, isActive: false },
];

const featureItems = [
  { name: 'Features', icon: Star, hasChevron: true },
  { name: 'Users', icon: Users, hasChevron: true },
  { name: 'Pricing', icon: Package, hasChevron: true },
  { name: 'Integrations', icon: Settings, hasChevron: true },
  { name: 'Settings', icon: Settings, hasChevron: true },
  { name: 'Template pages', icon: FileText, hasChevron: true },
];

export function Sidebar() {
  return (
    <div className="w-60 bg-dashboard-sidebar border-r border-dashboard-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-dashboard-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <span className="font-semibold text-foreground">Dash-x</span>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for..."
            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 space-y-1">
        <div className="flex items-center gap-2 px-3 py-2 text-sm text-primary font-medium">
          <BarChart3 className="w-4 h-4" />
          Dashboard
        </div>

        {navigationItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            size="sm"
            className={`w-full justify-start gap-2 text-sm ${
              item.isActive 
                ? 'bg-muted text-foreground' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </Button>
        ))}

        <div className="pt-4">
          {featureItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              size="sm"
              className="w-full justify-between text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              <div className="flex items-center gap-2">
                <item.icon className="w-4 h-4" />
                {item.name}
              </div>
              {item.hasChevron && <ChevronDown className="w-4 h-4" />}
            </Button>
          ))}
        </div>
      </div>

      {/* Get template button */}
      <div className="p-4">
        <Button className="w-full bg-gradient-primary text-white border-0 shadow-glow-primary">
          Get template →
        </Button>
      </div>

      {/* User profile */}
      <div className="p-4 border-t border-dashboard-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground">John Carter</div>
            <div className="text-xs text-muted-foreground">Account settings</div>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}