import Gallery from '@/components/Gallery';
import Layout from '@/components/Layout';
import { useContent } from '@/hooks/useContent';

const Miniatures = () => {
  const { content, isLoading } = useContent('miniatures');

  // Fallback images for miniatures
  const fallbackMiniatures = [
    "https://i.imgur.com/xuzJAal.jpeg",
    "https://i.imgur.com/87YPfsX.jpeg",
    "https://i.imgur.com/0GC8OVi.jpeg", 
    "https://i.imgur.com/wdC2AZp.png",
    "https://i.imgur.com/SUU9T3i.png",
    "https://i.imgur.com/SlPHPIU.png",
    "https://i.imgur.com/VEEOan5.png",
    "https://i.imgur.com/tY3LzGE.jpeg",
    "https://i.imgur.com/BRjjMBD.jpeg",
    "https://i.imgur.com/VvsTs5m.jpeg",
    "https://i.imgur.com/GAq9uPd.jpeg",
    "https://i.imgur.com/RyW1zt9.jpeg",
    "https://i.imgur.com/inenxOt.png",
    "https://i.imgur.com/krcDOBd.png",
    "https://i.imgur.com/EZQduv4.jpeg",
    "https://i.imgur.com/1hks5NY.jpeg",
    "https://i.imgur.com/bCAAAWM.png",
    "https://i.imgur.com/wwiwKAh.png",
    "https://i.imgur.com/D5da0wH.jpeg"
  ];

  const dbImages = content.map(item => item.image_url);
  const displayImages = [...dbImages, ...fallbackMiniatures];

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-20 flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Chargement des miniatures...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-20">
        <Gallery
          id="miniatures-page"
          title="Mes Miniatures YouTube"
          description="Collection complète de mes miniatures YouTube créées pour différents clients et projets personnels. Chaque miniature est conçue pour maximiser l'engagement et attirer l'attention des viewers."
          images={displayImages}
          columns={4}
        />
      </div>
    </Layout>
  );
};

export default Miniatures;
