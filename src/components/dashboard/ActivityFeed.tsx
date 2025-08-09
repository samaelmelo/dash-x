import { useState, useEffect } from 'react';
import { 
  User, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  UserPlus, 
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ActivityItem {
  id: string;
  type: 'user' | 'sale' | 'product' | 'system' | 'report';
  title: string;
  description: string;
  timestamp: Date;
  user?: {
    name: string;
    avatar?: string;
    initials: string;
  };
  status: 'success' | 'warning' | 'error' | 'info';
  metadata?: {
    value?: string;
    count?: number;
    location?: string;
  };
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'sale',
    title: 'Nova venda registrada',
    description: 'iPhone 14 Pro Max vendido para João Silva',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    user: { name: 'João Silva', initials: 'JS' },
    status: 'success',
    metadata: { value: 'R$ 1.099,00' }
  },
  {
    id: '2',
    type: 'user',
    title: 'Novo usuário cadastrado',
    description: 'Maria Santos criou uma conta',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    user: { name: 'Maria Santos', initials: 'MS' },
    status: 'info'
  },
  {
    id: '3',
    type: 'product',
    title: 'Estoque atualizado',
    description: 'Apple Watch S8 - 50 unidades adicionadas',
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    user: { name: 'Sistema', initials: 'SY' },
    status: 'success',
    metadata: { count: 50 }
  },
  {
    id: '4',
    type: 'system',
    title: 'Alerta de estoque baixo',
    description: 'MacBook Pro M2 com apenas 3 unidades restantes',
    timestamp: new Date(Date.now() - 18 * 60 * 1000),
    status: 'warning',
    metadata: { count: 3 }
  },
  {
    id: '5',
    type: 'report',
    title: 'Relatório gerado',
    description: 'Relatório mensal de vendas concluído',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    user: { name: 'Admin', initials: 'AD' },
    status: 'success'
  },
  {
    id: '6',
    type: 'sale',
    title: 'Venda cancelada',
    description: 'Pedido #1248 foi cancelado pelo cliente',
    timestamp: new Date(Date.now() - 35 * 60 * 1000),
    status: 'error',
    metadata: { value: 'R$ 799,00' }
  }
];

const getActivityIcon = (type: ActivityItem['type'], status: ActivityItem['status']) => {
  const iconClass = "h-4 w-4";
  
  switch (type) {
    case 'sale':
      return <ShoppingCart className={cn(iconClass, 
        status === 'success' ? 'text-status-success' : 
        status === 'error' ? 'text-status-error' : 'text-foreground'
      )} />;
    case 'user':
      return <UserPlus className={cn(iconClass, 'text-primary')} />;
    case 'product':
      return <Package className={cn(iconClass, 'text-chart-secondary')} />;
    case 'system':
      return status === 'warning' ? 
        <AlertCircle className={cn(iconClass, 'text-status-warning')} /> :
        <Activity className={cn(iconClass, 'text-muted-foreground')} />;
    case 'report':
      return <FileText className={cn(iconClass, 'text-chart-tertiary')} />;
    default:
      return <Clock className={cn(iconClass, 'text-muted-foreground')} />;
  }
};

const getStatusBadge = (status: ActivityItem['status']) => {
  switch (status) {
    case 'success':
      return <CheckCircle className="h-3 w-3 text-status-success" />;
    case 'warning':
      return <AlertCircle className="h-3 w-3 text-status-warning" />;
    case 'error':
      return <AlertCircle className="h-3 w-3 text-status-error" />;
    default:
      return <Clock className="h-3 w-3 text-primary" />;
  }
};

const getTimeAgo = (timestamp: Date) => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  
  if (hours > 0) return `${hours}h atrás`;
  if (minutes > 0) return `${minutes}m atrás`;
  return 'Agora';
};

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivities);
  const [filter, setFilter] = useState<string>('all');

  // Simulate real-time activity updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance every 15 seconds
        const newActivity: ActivityItem = {
          id: Date.now().toString(),
          type: ['sale', 'user', 'product', 'system'][Math.floor(Math.random() * 4)] as any,
          title: 'Nova atividade detectada',
          description: 'Uma nova ação foi registrada no sistema',
          timestamp: new Date(),
          status: ['success', 'info', 'warning'][Math.floor(Math.random() * 3)] as any,
          user: { name: 'Sistema', initials: 'SY' }
        };
        
        setActivities(prev => [newActivity, ...prev.slice(0, 19)]); // Keep only 20 items
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  const filterOptions = [
    { value: 'all', label: 'Todas' },
    { value: 'sale', label: 'Vendas' },
    { value: 'user', label: 'Usuários' },
    { value: 'product', label: 'Produtos' },
    { value: 'system', label: 'Sistema' }
  ];

  return (
    <Card className="bg-dashboard-card border-dashboard-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Atividades Recentes
        </h3>
        <Badge variant="outline" className="text-xs">
          Tempo real
        </Badge>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filterOptions.map((option) => (
          <Button
            key={option.value}
            variant={filter === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(option.value)}
            className="text-xs"
          >
            {option.label}
          </Button>
        ))}
      </div>

      <ScrollArea className="h-96">
        <div className="space-y-4">
          {filteredActivities.map((activity, index) => (
            <div 
              key={activity.id} 
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors",
                index === 0 && "bg-muted/20 border border-primary/20"
              )}
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                  {getActivityIcon(activity.type, activity.status)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">
                    {activity.title}
                  </p>
                  {getStatusBadge(activity.status)}
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">
                  {activity.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {activity.user && (
                      <>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={activity.user.avatar} />
                          <AvatarFallback className="text-xs">
                            {activity.user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          {activity.user.name}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {activity.metadata?.value && (
                      <Badge variant="secondary" className="text-xs">
                        {activity.metadata.value}
                      </Badge>
                    )}
                    {activity.metadata?.count && (
                      <Badge variant="secondary" className="text-xs">
                        {activity.metadata.count} items
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {getTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="mt-4 pt-4 border-t border-dashboard-border">
        <Button variant="outline" className="w-full" size="sm">
          Ver todas as atividades
        </Button>
      </div>
    </Card>
  );
}