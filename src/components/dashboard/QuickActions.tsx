import { useState } from 'react';
import { 
  Plus, 
  Upload, 
  UserPlus, 
  FileText, 
  Package, 
  Calculator,
  Zap,
  Target,
  TrendingUp,
  ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  color: string;
  category: 'create' | 'analyze' | 'manage';
  description: string;
  onClick: () => void;
}

export function QuickActions() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const quickActions: QuickAction[] = [
    {
      id: 'new-product',
      label: 'Novo Produto',
      icon: <Plus className="h-4 w-4" />,
      shortcut: 'Ctrl+N',
      color: 'bg-chart-primary',
      category: 'create',
      description: 'Adicionar um novo produto ao catálogo',
      onClick: () => handleAction('Produto criado com sucesso!')
    },
    {
      id: 'add-user',
      label: 'Adicionar Usuário',
      icon: <UserPlus className="h-4 w-4" />,
      shortcut: 'Ctrl+U',
      color: 'bg-chart-secondary',
      category: 'create',
      description: 'Convidar novo usuário para o sistema',
      onClick: () => handleAction('Usuário adicionado com sucesso!')
    },
    {
      id: 'upload-file',
      label: 'Upload de Arquivo',
      icon: <Upload className="h-4 w-4" />,
      color: 'bg-chart-tertiary',
      category: 'manage',
      description: 'Fazer upload de documentos ou imagens',
      onClick: () => handleAction('Arquivo enviado com sucesso!')
    },
    {
      id: 'generate-report',
      label: 'Gerar Relatório',
      icon: <FileText className="h-4 w-4" />,
      shortcut: 'Ctrl+R',
      color: 'bg-chart-quaternary',
      category: 'analyze',
      description: 'Criar relatório personalizado',
      onClick: () => handleAction('Relatório sendo gerado...')
    },
    {
      id: 'manage-inventory',
      label: 'Gerenciar Estoque',
      icon: <Package className="h-4 w-4" />,
      color: 'bg-status-warning',
      category: 'manage',
      description: 'Atualizar inventário de produtos',
      onClick: () => handleAction('Abrindo gerenciador de estoque...')
    },
    {
      id: 'calculate-metrics',
      label: 'Calcular Métricas',
      icon: <Calculator className="h-4 w-4" />,
      color: 'bg-primary',
      category: 'analyze',
      description: 'Executar cálculos avançados',
      onClick: () => handleAction('Métricas calculadas!')
    },
    {
      id: 'quick-sale',
      label: 'Venda Rápida',
      icon: <ShoppingCart className="h-4 w-4" />,
      shortcut: 'Ctrl+S',
      color: 'bg-status-success',
      category: 'create',
      description: 'Registrar uma nova venda',
      onClick: () => handleAction('Venda registrada!')
    },
    {
      id: 'performance-boost',
      label: 'Otimizar Sistema',
      icon: <Zap className="h-4 w-4" />,
      color: 'bg-chart-primary',
      category: 'manage',
      description: 'Executar otimizações de performance',
      onClick: () => handleAction('Sistema otimizado!')
    }
  ];

  const handleAction = (message: string) => {
    toast({
      title: "Ação executada",
      description: message,
    });
    setDialogOpen(false);
  };

  const categories = {
    create: { label: 'Criar', icon: <Plus className="h-4 w-4" /> },
    analyze: { label: 'Analisar', icon: <TrendingUp className="h-4 w-4" /> },
    manage: { label: 'Gerenciar', icon: <Target className="h-4 w-4" /> }
  };

  // Keyboard shortcuts
  useState(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key.toLowerCase()) {
          case 'n':
            event.preventDefault();
            quickActions.find(a => a.id === 'new-product')?.onClick();
            break;
          case 'u':
            event.preventDefault();
            quickActions.find(a => a.id === 'add-user')?.onClick();
            break;
          case 'r':
            event.preventDefault();
            quickActions.find(a => a.id === 'generate-report')?.onClick();
            break;
          case 's':
            event.preventDefault();
            quickActions.find(a => a.id === 'quick-sale')?.onClick();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  });

  return (
    <Card className="bg-dashboard-card border-dashboard-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Ações Rápidas</h3>
        <Badge variant="outline" className="text-xs">
          Use Ctrl + tecla para atalhos
        </Badge>
      </div>
      
      <div className="space-y-4">
        {Object.entries(categories).map(([key, category]) => (
          <div key={key}>
            <div className="flex items-center gap-2 mb-3">
              {category.icon}
              <span className="text-sm font-medium text-muted-foreground">
                {category.label}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {quickActions
                .filter(action => action.category === key)
                .map((action) => (
                  <Dialog key={action.id} open={dialogOpen && selectedAction === action.id} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-start gap-2 hover:scale-105 transition-transform"
                        onClick={() => setSelectedAction(action.id)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${action.color}`}>
                            {action.icon}
                          </div>
                          {action.shortcut && (
                            <Badge variant="secondary" className="text-xs">
                              {action.shortcut}
                            </Badge>
                          )}
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-sm">{action.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {action.description}
                          </div>
                        </div>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${action.color}`}>
                            {action.icon}
                          </div>
                          {action.label}
                        </DialogTitle>
                        <DialogDescription>
                          {action.description}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="action-name">Nome</Label>
                          <Input id="action-name" placeholder="Digite o nome..." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="action-description">Descrição</Label>
                          <Textarea id="action-description" placeholder="Adicione uma descrição..." />
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button onClick={action.onClick} className="flex-1">
                            Executar
                          </Button>
                          <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-3 bg-muted/30 rounded-lg">
        <div className="text-xs text-muted-foreground text-center">
          💡 Dica: Use os atalhos de teclado para executar ações rapidamente
        </div>
      </div>
    </Card>
  );
}