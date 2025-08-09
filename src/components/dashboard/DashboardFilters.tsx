import { useState } from 'react';
import { Calendar, Filter, Download, RefreshCw, Settings, Search, Bell, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface DashboardFiltersProps {
  onRefresh: () => void;
  isLoading?: boolean;
}

export function DashboardFilters({ onRefresh, isLoading }: DashboardFiltersProps) {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2024, 0, 1),
    to: new Date()
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('last30days');
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const { toast } = useToast();

  const handleExport = (format: string) => {
    toast({
      title: `Exportando dados...`,
      description: `Download do arquivo ${format} iniciado.`,
    });
  };

  const handleDateRangeSelect = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range);
    toast({
      title: "Período atualizado",
      description: `Dados filtrados para ${range.from ? format(range.from, 'dd/MM/yyyy') : ''} - ${range.to ? format(range.to, 'dd/MM/yyyy') : ''}`,
    });
  };

  return (
    <div className="bg-dashboard-card border border-dashboard-border rounded-lg p-4 space-y-4">
      {/* Primary Filter Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Date Range Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="min-w-[250px] justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                {dateRange.from && dateRange.to ? (
                  `${format(dateRange.from, 'dd/MM/yyyy')} - ${format(dateRange.to, 'dd/MM/yyyy')}`
                ) : (
                  "Selecionar período"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={handleDateRangeSelect}
                numberOfMonths={2}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          {/* Quick Period Selector */}
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="yesterday">Ontem</SelectItem>
              <SelectItem value="last7days">Últimos 7 dias</SelectItem>
              <SelectItem value="last30days">Últimos 30 dias</SelectItem>
              <SelectItem value="last90days">Últimos 90 dias</SelectItem>
              <SelectItem value="thisyear">Este ano</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>

          {/* Search Input */}
          <div className="relative min-w-[200px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          {/* Notification Toggle */}
          <div className="flex items-center gap-2">
            <Bell className={cn("h-4 w-4", notifications ? "text-primary" : "text-muted-foreground")} />
            <Switch 
              checked={notifications} 
              onCheckedChange={setNotifications}
            />
          </div>

          {/* Real-time Toggle */}
          <div className="flex items-center gap-2">
            {realTimeUpdates ? <Eye className="h-4 w-4 text-primary" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
            <Switch 
              checked={realTimeUpdates} 
              onCheckedChange={setRealTimeUpdates}
            />
          </div>

          {/* Refresh Button */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
          </Button>

          {/* Export Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Formatos disponíveis</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleExport('PDF')}>
                Relatório PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('Excel')}>
                Planilha Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('CSV')}>
                Dados CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('JSON')}>
                Dados JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Advanced Filters */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filtros avançados</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Por categoria
              </DropdownMenuItem>
              <DropdownMenuItem>
                Por status
              </DropdownMenuItem>
              <DropdownMenuItem>
                Por usuário
              </DropdownMenuItem>
              <DropdownMenuItem>
                Por região
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dashboard Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Configurações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Layout do dashboard
              </DropdownMenuItem>
              <DropdownMenuItem>
                Widgets visíveis
              </DropdownMenuItem>
              <DropdownMenuItem>
                Alertas e notificações
              </DropdownMenuItem>
              <DropdownMenuItem>
                Temas e aparência
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || selectedPeriod !== 'last30days') && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Filtros ativos:</span>
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Busca: {searchQuery}
              <button 
                onClick={() => setSearchQuery('')}
                className="ml-1 text-xs hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {selectedPeriod !== 'last30days' && (
            <Badge variant="secondary" className="gap-1">
              Período: {selectedPeriod}
              <button 
                onClick={() => setSelectedPeriod('last30days')}
                className="ml-1 text-xs hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}