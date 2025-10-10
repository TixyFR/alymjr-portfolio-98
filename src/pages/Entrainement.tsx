import Gallery from '@/components/Gallery';
import Layout from '@/components/Layout';
import { useContent } from '@/hooks/useContent';

const Entrainement = () => {
  const { content, isLoading } = useContent('entrainement');

  const dbImages = content.map(item => item.image_url);

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-20 flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Chargement des entrainements...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-20">
        <Gallery
          id="entrainement-page"
          title="Entrainement"
          description="Mes exercices et projets d'entrainement en design graphique, illustration et création numérique."
          images={dbImages}
          columns={4}
        />
      </div>
    </Layout>
  );
};

export default Entrainement;
