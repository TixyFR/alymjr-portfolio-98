import Gallery from '@/components/Gallery';
import Layout from '@/components/Layout';
import { useContent } from '@/hooks/useContent';

const Affiches = () => {
  const { content, isLoading } = useContent('affiches');

  const dbImages = content.map(item => item.image_url).reverse();

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
          images={dbImages}
          columns={6}
        />
      </div>
    </Layout>
  );
};

export default Affiches;