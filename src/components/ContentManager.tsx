import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useContent } from '@/hooks/useContent';

const ContentManager = () => {
  const { content, isLoading, addContent, deleteContent } = useContent();
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleAdd = async () => {
    if (!newImageUrl) return;

    try {
      await addContent({ image_url: newImageUrl });
      setNewImageUrl('');
    } catch (error) {
      // Error handled in hook
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Ajouter une image</h3>
          <div className="space-y-4">
            <Input
              placeholder="URL de l'image"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
            />
            <Button onClick={handleAdd} className="w-full bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Images ({content.length})</h3>
          <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {content.map((item) => (
              <div key={item.id} className="relative group">
                <img 
                  src={item.image_url} 
                  alt="Image"
                  className="w-full h-24 object-cover rounded"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteContent(item.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManager;