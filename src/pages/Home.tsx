import DynamicBackground from '@/components/DynamicBackground';
import HeroSection from '@/components/HeroSection';

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <DynamicBackground />
      <div className="relative z-10">
        <HeroSection />
      </div>
    </div>
  );
};

export default Home;