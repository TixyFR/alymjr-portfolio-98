import { useState } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationProps {
  onAdminClick: () => void;
}

const Navigation = ({ onAdminClick }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 liquid-glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold gradient-text">AlymJr</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => navigateTo('/')}
                className={`transition-colors duration-200 ${
                  isActive('/') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
                }`}
              >
                Accueil
              </button>
              <button
                onClick={() => navigateTo('/miniatures')}
                className={`transition-colors duration-200 ${
                  isActive('/miniatures') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
                }`}
              >
                Miniatures
              </button>
              <button
                onClick={() => navigateTo('/affiches')}
                className={`transition-colors duration-200 ${
                  isActive('/affiches') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
                }`}
              >
                Affiches
              </button>
              <button
                onClick={() => navigateTo('/autres')}
                className={`transition-colors duration-200 ${
                  isActive('/autres') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
                }`}
              >
                Autres
              </button>
            </div>
          </div>

          {/* Admin Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onAdminClick}
              className="hidden md:flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Admin</span>
            </Button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground hover:text-primary p-2"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => navigateTo('/')}
                className={`block w-full text-left px-3 py-2 transition-colors ${
                  isActive('/') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
                }`}
              >
                Accueil
              </button>
              <button
                onClick={() => navigateTo('/miniatures')}
                className={`block w-full text-left px-3 py-2 transition-colors ${
                  isActive('/miniatures') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
                }`}
              >
                Miniatures
              </button>
              <button
                onClick={() => navigateTo('/affiches')}
                className={`block w-full text-left px-3 py-2 transition-colors ${
                  isActive('/affiches') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
                }`}
              >
                Affiches
              </button>
              <button
                onClick={() => navigateTo('/autres')}
                className={`block w-full text-left px-3 py-2 transition-colors ${
                  isActive('/autres') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
                }`}
              >
                Autres
              </button>
              <button
                onClick={onAdminClick}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary transition-colors flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;