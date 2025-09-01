import Gallery from '@/components/Gallery';
import Layout from '@/components/Layout';
import { useContent } from '@/hooks/useContent';

const Affiches = () => {
  const { content, isLoading } = useContent();

  // Use existing static images plus database content
  const fallbackAffiches = [
    "https://i.imgur.com/JC8B9Qn.jpeg",
    "https://i.imgur.com/1Y9lMAK.jpeg", 
    "https://i.imgur.com/P34l3Kj.jpeg",
    "https://i.imgur.com/VxBiPui.jpeg",
    "https://i.imgur.com/0QT6eUc.png",
    "https://i.imgur.com/mUSQobw.png",
    "https://i.imgur.com/i2Hsfe5.png",
    "https://i.imgur.com/l3ngypK.png",
    "https://i.imgur.com/r6Hzujt.png",
    "https://i.imgur.com/fucbF6f.jpeg",
    "https://i.imgur.com/38s3zPS.png",
    "https://i.imgur.com/hjOHkcP.png",
    "https://i.imgur.com/HyT4YeO.png",
    "https://i.imgur.com/JUvzinj.jpeg"
  ];

  const dbImages = content.map(item => item.image_url);
  const displayImages = [...dbImages, ...fallbackAffiches];

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-20 flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Chargement des affiches...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-20">
        <Gallery
          id="affiches-page"
          title="Mes Affiches Créatives"
          description="Une collection d'affiches créatives dans leur format original, optimisées pour différents événements et campagnes."
          images={displayImages}
          columns={6}
        />
      </div>
    </Layout>
  );
};

export default Affiches;