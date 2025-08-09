import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface DashboardWidget {
  id: string;
  title: string;
  component: React.ReactNode;
  visible: boolean;
  size: 'sm' | 'md' | 'lg' | 'xl';
  category: 'metrics' | 'charts' | 'tables' | 'other';
}

interface SortableWidgetProps {
  widget: DashboardWidget;
  onToggleVisibility: (id: string) => void;
  onSizeChange: (id: string, size: DashboardWidget['size']) => void;
}

function SortableWidget({ widget, onToggleVisibility, onSizeChange }: SortableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const sizeClasses = {
    sm: 'col-span-1 row-span-1',
    md: 'col-span-2 row-span-1',
    lg: 'col-span-3 row-span-1',
    xl: 'col-span-4 row-span-2'
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group',
        sizeClasses[widget.size],
        isDragging && 'opacity-50 z-50',
        !widget.visible && 'opacity-40'
      )}
    >
      <Card className={cn(
        "h-full bg-dashboard-card border-dashboard-border transition-all duration-200",
        isDragging && "shadow-lg scale-105 border-primary",
        !widget.visible && "bg-muted/50"
      )}>
        {/* Widget Header */}
        <div className="flex items-center justify-between p-3 border-b border-dashboard-border">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity p-1"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
            <h3 className="font-medium text-foreground">{widget.title}</h3>
            <Badge variant="outline" className="text-xs">
              {widget.size.toUpperCase()}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Switch
              checked={widget.visible}
              onCheckedChange={() => onToggleVisibility(widget.id)}
            />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Tamanho do Widget</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onSizeChange(widget.id, 'sm')}>
                  Pequeno (1x1)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSizeChange(widget.id, 'md')}>
                  Médio (2x1)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSizeChange(widget.id, 'lg')}>
                  Grande (3x1)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSizeChange(widget.id, 'xl')}>
                  Extra Grande (4x2)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Widget Content */}
        <div className={cn(
          "p-4",
          !widget.visible && "pointer-events-none"
        )}>
          {widget.visible ? widget.component : (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <div className="text-center">
                <EyeOff className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Widget oculto</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export function DragDropLayout({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  
  // Mock widgets - in a real app, this would come from props or context
  const [widgets, setWidgets] = useState<DashboardWidget[]>([
    {
      id: 'metrics',
      title: 'Métricas',
      component: <div className="h-32 bg-gradient-primary/10 rounded-lg flex items-center justify-center">Métricas Cards</div>,
      visible: true,
      size: 'xl',
      category: 'metrics'
    },
    {
      id: 'visitors-chart',
      title: 'Visitantes',
      component: <div className="h-32 bg-chart-primary/10 rounded-lg flex items-center justify-center">Chart Visitantes</div>,
      visible: true,
      size: 'md',
      category: 'charts'
    },
    {
      id: 'revenue-chart',
      title: 'Receita',
      component: <div className="h-32 bg-chart-secondary/10 rounded-lg flex items-center justify-center">Chart Receita</div>,
      visible: true,
      size: 'lg',
      category: 'charts'
    },
    {
      id: 'products-table',
      title: 'Produtos',
      component: <div className="h-32 bg-chart-tertiary/10 rounded-lg flex items-center justify-center">Tabela Produtos</div>,
      visible: true,
      size: 'md',
      category: 'tables'
    },
    {
      id: 'tasks-chart',
      title: 'Tarefas',
      component: <div className="h-32 bg-chart-quaternary/10 rounded-lg flex items-center justify-center">Chart Tarefas</div>,
      visible: true,
      size: 'lg',
      category: 'charts'
    },
    {
      id: 'orders-table',
      title: 'Pedidos',
      component: <div className="h-32 bg-status-success/10 rounded-lg flex items-center justify-center">Tabela Pedidos</div>,
      visible: true,
      size: 'xl',
      category: 'tables'
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);
        
        toast({
          title: "Layout atualizado",
          description: "A ordem dos widgets foi alterada.",
        });
        
        return newItems;
      });
    }
  };

  const handleToggleVisibility = (id: string) => {
    setWidgets(widgets.map(widget => 
      widget.id === id 
        ? { ...widget, visible: !widget.visible }
        : widget
    ));
    
    const widget = widgets.find(w => w.id === id);
    toast({
      title: widget?.visible ? "Widget ocultado" : "Widget exibido",
      description: `${widget?.title} ${widget?.visible ? "foi ocultado" : "está visível"}.`,
    });
  };

  const handleSizeChange = (id: string, size: DashboardWidget['size']) => {
    setWidgets(widgets.map(widget => 
      widget.id === id 
        ? { ...widget, size }
        : widget
    ));
    
    toast({
      title: "Tamanho alterado",
      description: `Widget redimensionado para ${size.toUpperCase()}.`,
    });
  };

  const visibleWidgets = widgets.filter(widget => widget.visible);
  const hiddenCount = widgets.length - visibleWidgets.length;

  return (
    <div className="space-y-6">
      {/* Layout Controls */}
      <Card className="bg-dashboard-card border-dashboard-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Layout do Dashboard</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{visibleWidgets.length} widgets visíveis</Badge>
            {hiddenCount > 0 && (
              <Badge variant="secondary">{hiddenCount} ocultos</Badge>
            )}
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          💡 Arraste os widgets para reorganizar o layout. Use os controles no canto superior direito para ajustar tamanho e visibilidade.
        </div>
      </Card>

      {/* Draggable Grid */}
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={widgets.map(w => w.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-4 gap-6 auto-rows-fr">
            {widgets.map((widget) => (
              <SortableWidget
                key={widget.id}
                widget={widget}
                onToggleVisibility={handleToggleVisibility}
                onSizeChange={handleSizeChange}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Original children as fallback */}
      <div className="hidden">
        {children}
      </div>
    </div>
  );
}