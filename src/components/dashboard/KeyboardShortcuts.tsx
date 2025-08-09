import { useState, useEffect } from 'react';
import { Keyboard, X } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Shortcut {
  keys: string[];
  description: string;
  category: 'navigation' | 'actions' | 'filters' | 'general';
}

const shortcuts: Shortcut[] = [
  // Navigation
  { keys: ['Ctrl', 'H'], description: 'Ir para Home', category: 'navigation' },
  { keys: ['Ctrl', 'D'], description: 'Dashboard', category: 'navigation' },
  { keys: ['Ctrl', 'P'], description: 'Produtos', category: 'navigation' },
  { keys: ['Ctrl', 'U'], description: 'Usuários', category: 'navigation' },
  
  // Actions
  { keys: ['Ctrl', 'N'], description: 'Novo Produto', category: 'actions' },
  { keys: ['Ctrl', 'S'], description: 'Venda Rápida', category: 'actions' },
  { keys: ['Ctrl', 'R'], description: 'Gerar Relatório', category: 'actions' },
  { keys: ['Ctrl', 'E'], description: 'Exportar Dados', category: 'actions' },
  
  // Filters
  { keys: ['Ctrl', 'F'], description: 'Buscar', category: 'filters' },
  { keys: ['Ctrl', 'L'], description: 'Limpar Filtros', category: 'filters' },
  { keys: ['Ctrl', 'T'], description: 'Filtro de Tempo', category: 'filters' },
  
  // General
  { keys: ['Ctrl', 'K'], description: 'Comando Rápido', category: 'general' },
  { keys: ['Ctrl', 'Shift', 'S'], description: 'Configurações', category: 'general' },
  { keys: ['Ctrl', 'Shift', 'N'], description: 'Notificações', category: 'general' },
  { keys: ['?'], description: 'Mostrar Atalhos', category: 'general' },
  { keys: ['Esc'], description: 'Fechar Modal', category: 'general' }
];

const categories = {
  navigation: { label: 'Navegação', color: 'bg-chart-primary' },
  actions: { label: 'Ações', color: 'bg-chart-secondary' },
  filters: { label: 'Filtros', color: 'bg-chart-tertiary' },
  general: { label: 'Geral', color: 'bg-chart-quaternary' }
};

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      
      // Show shortcuts dialog with '?' key
      if (key === '?' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        setIsOpen(true);
        return;
      }

      // Track pressed keys for visual feedback
      const keyCombo = [];
      if (event.ctrlKey || event.metaKey) keyCombo.push('Ctrl');
      if (event.shiftKey) keyCombo.push('Shift');
      if (event.altKey) keyCombo.push('Alt');
      if (key !== 'Control' && key !== 'Shift' && key !== 'Alt' && key !== 'Meta') {
        keyCombo.push(key.toUpperCase());
      }
      
      if (keyCombo.length > 1) {
        setPressedKeys(keyCombo);
        setTimeout(() => setPressedKeys([]), 1000);
      }

      // Handle shortcuts
      if (event.ctrlKey || event.metaKey) {
        switch (key.toLowerCase()) {
          case 'k':
            event.preventDefault();
            // Open command palette (could be implemented)
            break;
          case 'f':
            event.preventDefault();
            // Focus search input
            const searchInput = document.querySelector('input[placeholder*="Buscar"]') as HTMLInputElement;
            if (searchInput) searchInput.focus();
            break;
          case 'l':
            event.preventDefault();
            // Clear filters
            console.log('Clearing filters...');
            break;
          case 'e':
            if (!event.shiftKey) {
              event.preventDefault();
              // Export data
              console.log('Exporting data...');
            }
            break;
        }
        
        if (event.shiftKey) {
          switch (key.toLowerCase()) {
            case 's':
              event.preventDefault();
              // Open settings
              console.log('Opening settings...');
              break;
            case 'n':
              event.preventDefault();
              // Open notifications
              console.log('Opening notifications...');
              break;
          }
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const formatKeys = (keys: string[]) => {
    return keys.map((key, index) => (
      <span key={index} className="inline-flex">
        <kbd className="px-2 py-1 text-xs font-semibold bg-muted border border-border rounded">
          {key}
        </kbd>
        {index < keys.length - 1 && <span className="mx-1">+</span>}
      </span>
    ));
  };

  return (
    <>
      {/* Floating shortcut indicator */}
      {pressedKeys.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
          <Card className="p-3 bg-background/95 backdrop-blur border-primary/20">
            <div className="flex items-center gap-2">
              <Keyboard className="h-4 w-4 text-primary" />
              <div className="flex items-center gap-1">
                {formatKeys(pressedKeys)}
              </div>
            </div>
          </Card>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <Keyboard className="h-4 w-4" />
            <span className="hidden sm:inline">Atalhos</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Keyboard className="h-5 w-5" />
                Atalhos de Teclado
              </div>
              <Badge variant="outline">Pressione ? para abrir</Badge>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {Object.entries(categories).map(([key, category]) => (
              <div key={key}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                  <h3 className="font-semibold text-foreground">{category.label}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {shortcuts
                    .filter(shortcut => shortcut.category === key)
                    .map((shortcut, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-foreground">{shortcut.description}</span>
                        <div className="flex items-center gap-1">
                          {formatKeys(shortcut.keys)}
                        </div>
                      </div>
                    ))}
                </div>
                
                {key !== 'general' && <Separator className="mt-6" />}
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-muted/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Keyboard className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Dicas</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Use Ctrl (ou Cmd no Mac) + letra para ações rápidas</li>
              <li>• Pressione '?' a qualquer momento para ver os atalhos</li>
              <li>• Pressione Esc para fechar modais e dialogs</li>
              <li>• Combine Shift para ações secundárias</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}