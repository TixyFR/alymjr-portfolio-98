import { useState } from 'react';
import { Settings } from 'lucide-react';
import Navigation from '@/components/Navigation';
import AdminModal from '@/components/AdminModal';
import BackToTop from '@/components/BackToTop';
import DynamicBackground from '@/components/DynamicBackground';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <DynamicBackground />
      <Navigation />
      
      {/* Theme Toggle - Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Hidden Admin Button - Bottom Right */}
      <Button
        onClick={() => setIsAdminModalOpen(true)}
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 z-40 opacity-20 hover:opacity-100 transition-opacity duration-300 glass"
        aria-label="Admin"
      >
        <Settings className="h-4 w-4" />
      </Button>
      
      {children}

      <BackToTop />
      
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};

export default Layout;