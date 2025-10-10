import Layout from '@/components/Layout';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { useContent } from '@/hooks/useContent';

const Entrainement = () => {
  const { content, isLoading } = useContent('entrainement');

  // Filter items with before/after images
  const beforeAfterItems = content
    .filter(item => item.before_image_url && item.after_image_url)
    .map(item => ({
      id: item.id,
      before_image_url: item.before_image_url!,
      after_image_url: item.after_image_url!,
      title: item.title
    }));

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
      <div className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Entrainement</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mes exercices et projets d'entrainement en design graphique. 
              Faites glisser le curseur pour voir l'évolution avant/après.
            </p>
          </div>
          <BeforeAfterSlider items={beforeAfterItems} />
        </div>
      </div>
    </Layout>
  );
};

export default Entrainement;
