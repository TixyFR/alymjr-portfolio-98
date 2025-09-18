import Gallery from '@/components/Gallery';
import Layout from '@/components/Layout';
import { useContent } from '@/hooks/useContent';

const Miniatures = () => {
  const { content, isLoading } = useContent('miniatures');

  const dbImages = content.map(item => item.image_url);

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
          images={dbImages}
          columns={4}
        />
      </div>
    </Layout>
  );
};

export default Miniatures;
