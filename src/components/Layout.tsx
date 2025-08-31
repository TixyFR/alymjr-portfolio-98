import { useState } from 'react';
import Navigation from '@/components/Navigation';
import AdminModal from '@/components/AdminModal';
import BackToTop from '@/components/BackToTop';
import DynamicBackground from '@/components/DynamicBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <DynamicBackground />
      <Navigation onAdminClick={() => setIsAdminModalOpen(true)} />
      
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