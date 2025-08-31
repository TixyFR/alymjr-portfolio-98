import Gallery from '@/components/Gallery';
import Layout from '@/components/Layout';

const Miniatures = () => {
  const miniatures = [
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

  return (
    <Layout>
      <div className="pt-20">
        <Gallery
          id="miniatures-page"
          title="Mes Miniatures YouTube"
          description="Collection complète de mes miniatures YouTube créées pour différents clients et projets personnels. Chaque miniature est conçue pour maximiser l'engagement et attirer l'attention des viewers."
          images={miniatures}
          columns={4}
        />
      </div>
    </Layout>
  );
};

export default Miniatures;