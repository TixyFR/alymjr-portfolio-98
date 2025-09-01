import Gallery from '@/components/Gallery';
import Layout from '@/components/Layout';
import { useContent } from '@/hooks/useContent';

const Autres = () => {
  const { content, isLoading } = useContent();

  // Use existing static images plus database content
  const fallbackAutres = [
    "https://i.imgur.com/qnd1D2P.png",
    "https://i.imgur.com/MS4deQ7.jpeg"
  ];

  const dbImages = content.map(item => item.image_url);
  const displayImages = [...dbImages, ...fallbackAutres];

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-20 flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Chargement des créations...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-20">
        <Gallery
          id="autres-page"
          title="Autres Créations"
          description="Découvrez mes autres projets graphiques variés : logos, designs web, illustrations et créations artistiques diverses."
          images={displayImages}
          columns={3}
        />
      </div>
    </Layout>
  );
};

export default Autres;