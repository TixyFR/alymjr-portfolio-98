import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/miniatures', label: 'Miniatures' },
    { path: '/affiches', label: 'Affiches' },
    { path: '/autres', label: 'Autres' },
    { path: '/entrainement', label: 'Entrainement' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-lg font-semibold tracking-tight text-foreground hover:text-primary transition-colors">
              AlymJr
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-light tracking-wide link-underline transition-colors ${
                  isActive(link.path) 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`block px-4 py-3 text-sm font-light transition-colors ${
                  isActive(link.path)
                    ? 'text-primary font-normal'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
