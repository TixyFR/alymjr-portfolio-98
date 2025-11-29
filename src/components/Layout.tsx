import { useState } from 'react';
import { Settings } from 'lucide-react';
import Navigation from '@/components/Navigation';
import AdminModal from '@/components/AdminModal';
import BackToTop from '@/components/BackToTop';
import DynamicBackground from '@/components/DynamicBackground';
import { ThemeToggle } from '@/components/ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <DynamicBackground />
      <Navigation />
      
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      {/* Hidden Admin Button */}
      <button
        onClick={() => setIsAdminModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3 glass-card opacity-20 hover:opacity-100 transition-all rounded-2xl hover:scale-110"
        aria-label="Admin"
      >
        <Settings className="h-5 w-5" />
      </button>
      
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
