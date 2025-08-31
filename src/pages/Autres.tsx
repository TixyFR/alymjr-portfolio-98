import Gallery from '@/components/Gallery';
import Layout from '@/components/Layout';

const Autres = () => {
  const autres = [
    "https://i.imgur.com/qnd1D2P.png",
    "https://i.imgur.com/MS4deQ7.jpeg"
  ];

  return (
    <Layout>
      <div className="pt-20">
        <Gallery
          id="autres-page"
          title="Autres Créations"
          description="Découvrez mes autres projets graphiques variés : logos, designs web, illustrations et créations artistiques diverses."
          images={autres}
          columns={3}
        />
      </div>
    </Layout>
  );
};

export default Autres;