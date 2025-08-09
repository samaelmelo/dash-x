import { useState } from 'react';
import { 
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  ReferenceLine
} from 'recharts';
import { 
  Maximize2, 
  Minimize2, 
  Download, 
  Share2, 
  TrendingUp,
  Calendar,
  Filter,
  RefreshCw
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const chartData = {
  sales: [
    { month: 'Jan', vendas: 4000, lucro: 2400, despesas: 1600 },
    { month: 'Fev', vendas: 3000, lucro: 1398, despesas: 1602 },
    { month: 'Mar', vendas: 2000, lucro: 2800, despesas: 1200 },
    { month: 'Abr', vendas: 2780, lucro: 3908, despesas: 872 },
    { month: 'Mai', vendas: 1890, lucro: 4800, despesas: 1090 },
    { month: 'Jun', vendas: 2390, lucro: 3800, despesas: 1290 },
    { month: 'Jul', vendas: 3490, lucro: 4300, despesas: 1190 }
  ],
  categories: [
    { name: 'Eletrônicos', value: 400, color: 'hsl(var(--chart-primary))' },
    { name: 'Roupas', value: 300, color: 'hsl(var(--chart-secondary))' },
    { name: 'Casa', value: 200, color: 'hsl(var(--chart-tertiary))' },
    { name: 'Livros', value: 100, color: 'hsl(var(--chart-quaternary))' }
  ],
  performance: [
    { day: 'Seg', usuarios: 120, sessoes: 250, conversoes: 45 },
    { day: 'Ter', usuarios: 98, sessoes: 180, conversoes: 32 },
    { day: 'Qua', usuarios: 156, sessoes: 320, conversoes: 67 },
    { day: 'Qui', usuarios: 187, sessoes: 410, conversoes: 89 },
    { day: 'Sex', usuarios: 203, sessoes: 450, conversoes: 95 },
    { day: 'Sab', usuarios: 145, sessoes: 290, conversoes: 54 },
    { day: 'Dom', usuarios: 89, sessoes: 170, conversoes: 28 }
  ]
};

interface InteractiveChartProps {
  type: 'bar' | 'line' | 'pie';
  title: string;
  data: any[];
  dataKeys: string[];
  className?: string;
}

function InteractiveChart({ type, title, data, dataKeys, className }: InteractiveChartProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [showBrush, setShowBrush] = useState(false);
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Exportando gráfico",
      description: "Download do gráfico em PNG iniciado.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Link copiado",
      description: "Link do gráfico copiado para área de transferência.",
    });
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={isFullscreen ? 500 : 300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              {dataKeys.map((key, index) => (
                <Bar 
                  key={key} 
                  dataKey={key} 
                  fill={`hsl(var(--chart-${['primary', 'secondary', 'tertiary', 'quaternary'][index]}))`}
                  radius={[4, 4, 0, 0]}
                />
              ))}
              {showBrush && <Brush dataKey="month" height={30} stroke="hsl(var(--primary))" />}
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={isFullscreen ? 500 : 300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              {dataKeys.map((key, index) => (
                <Line 
                  key={key}
                  type="monotone" 
                  dataKey={key} 
                  stroke={`hsl(var(--chart-${['primary', 'secondary', 'tertiary'][index]}))`}
                  strokeWidth={3}
                  dot={{ fill: `hsl(var(--chart-${['primary', 'secondary', 'tertiary'][index]}))`, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: `hsl(var(--chart-${['primary', 'secondary', 'tertiary'][index]}))`, strokeWidth: 2 }}
                />
              ))}
              <ReferenceLine y={100} stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" />
              {showBrush && <Brush dataKey="day" height={30} stroke="hsl(var(--primary))" />}
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={isFullscreen ? 500 : 300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={isFullscreen ? 180 : 120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <Card className={`bg-dashboard-card border-dashboard-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <Badge variant="outline">
            {selectedPeriod === '7d' ? 'Últimos 7 dias' : 
             selectedPeriod === '30d' ? 'Últimos 30 dias' : 'Último ano'}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 dias</SelectItem>
              <SelectItem value="30d">30 dias</SelectItem>
              <SelectItem value="1y">1 ano</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowBrush(!showBrush)}
          >
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4" />
          </Button>
          
          <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  {title}
                  <Button variant="outline" size="sm" onClick={() => setIsFullscreen(false)}>
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                </DialogTitle>
              </DialogHeader>
              {renderChart()}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {renderChart()}
      
      {showBrush && (
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground">
            💡 Use a barra de navegação abaixo do gráfico para fazer zoom em períodos específicos
          </p>
        </div>
      )}
    </Card>
  );
}

export function InteractiveCharts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveChart
          type="bar"
          title="Vendas e Lucro"
          data={chartData.sales}
          dataKeys={['vendas', 'lucro', 'despesas']}
        />
        
        <InteractiveChart
          type="line"
          title="Performance Semanal"
          data={chartData.performance}
          dataKeys={['usuarios', 'sessoes', 'conversoes']}
        />
      </div>
      
      <InteractiveChart
        type="pie"
        title="Vendas por Categoria"
        data={chartData.categories}
        dataKeys={['value']}
        className="lg:col-span-2"
      />
    </div>
  );
}