import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-3 glass-card hover:bg-card/50 transition-all rounded-2xl hover:scale-110 group">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 neon-glow-cyan" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 neon-glow-magenta" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-card border-border/50 z-[100] bg-card/90 backdrop-blur-xl">
        <DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer text-sm font-bold uppercase tracking-wider">
          <Sun className="mr-2 h-4 w-4 neon-glow-cyan" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer text-sm font-bold uppercase tracking-wider">
          <Moon className="mr-2 h-4 w-4 neon-glow-magenta" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className="cursor-pointer text-sm font-bold uppercase tracking-wider">
          <Monitor className="mr-2 h-4 w-4 neon-glow-primary" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}