import { useState } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {}

const Navigation = ({}: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">AlymJr</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium link-underline transition-colors duration-200 ${
                  isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Accueil
              </Link>
              <Link
                to="/miniatures"
                className={`text-sm font-medium link-underline transition-colors duration-200 ${
                  isActive('/miniatures') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Miniatures
              </Link>
              <Link
                to="/affiches"
                className={`text-sm font-medium link-underline transition-colors duration-200 ${
                  isActive('/affiches') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Affiches
              </Link>
              <Link
                to="/autres"
                className={`text-sm font-medium link-underline transition-colors duration-200 ${
                  isActive('/autres') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Autres
              </Link>
              <Link
                to="/entrainement"
                className={`text-sm font-medium link-underline transition-colors duration-200 ${
                  isActive('/entrainement') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Entrainement
              </Link>
              <Link
                to="/contact"
                className={`text-sm font-medium link-underline transition-colors duration-200 ${
                  isActive('/contact') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Admin Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
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
              <Link
                to="/"
                onClick={closeMenu}
                className={`block w-full text-left px-4 py-3 text-sm transition-colors ${
                  isActive('/') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Accueil
              </Link>
              <Link
                to="/miniatures"
                onClick={closeMenu}
                className={`block w-full text-left px-4 py-3 text-sm transition-colors ${
                  isActive('/miniatures') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Miniatures
              </Link>
              <Link
                to="/affiches"
                onClick={closeMenu}
                className={`block w-full text-left px-4 py-3 text-sm transition-colors ${
                  isActive('/affiches') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Affiches
              </Link>
              <Link
                to="/autres"
                onClick={closeMenu}
                className={`block w-full text-left px-4 py-3 text-sm transition-colors ${
                  isActive('/autres') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Autres
              </Link>
              <Link
                to="/entrainement"
                onClick={closeMenu}
                className={`block w-full text-left px-4 py-3 text-sm transition-colors ${
                  isActive('/entrainement') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Entrainement
              </Link>
              <Link
                to="/contact"
                onClick={closeMenu}
                className={`block w-full text-left px-4 py-3 text-sm transition-colors ${
                  isActive('/contact') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;