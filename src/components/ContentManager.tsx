import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useContent } from '@/hooks/useContent';

const ContentManager = () => {
  const { content, isLoading, addContent, deleteContent } = useContent();
  const [newItem, setNewItem] = useState({
    image_url: '',
    category: 'miniatures'
  });

  const handleAdd = async () => {
    if (!newItem.image_url) return;

    try {
      await addContent({ 
        image_url: newItem.image_url, 
        category: newItem.category 
      });
      setNewItem({ image_url: '', category: 'miniatures' });
    } catch (error) {
      // Error handled in hook
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  // Filter content by category
  const miniatures = content.filter(item => item.category === 'miniatures');
  const affiches = content.filter(item => item.category === 'affiches');
  const autres = content.filter(item => item.category === 'autres');

  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Ajouter une image</h3>
          <div className="space-y-4">
            <Input
              placeholder="URL de l'image"
              value={newItem.image_url}
              onChange={(e) => setNewItem(prev => ({ ...prev, image_url: e.target.value }))}
            />
            <Select
              value={newItem.category}
              onValueChange={(value) => setNewItem(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir une catégorie" />
              </SelectTrigger>
              <SelectContent className="bg-card border z-50">
                <SelectItem value="miniatures">Miniatures</SelectItem>
                <SelectItem value="affiches">Affiches</SelectItem>
                <SelectItem value="autres">Autres</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAdd} className="w-full bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories sections */}
      <div className="grid gap-6">
        <Card className="glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Miniatures ({miniatures.length})</h3>
            <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto">
              {miniatures.map((item) => (
                <div key={item.id} className="relative group">
                  <img 
                    src={item.image_url} 
                    alt="Miniature"
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

        <Card className="glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Affiches ({affiches.length})</h3>
            <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto">
              {affiches.map((item) => (
                <div key={item.id} className="relative group">
                  <img 
                    src={item.image_url} 
                    alt="Affiche"
                    className="w-full h-32 object-cover rounded"
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

        <Card className="glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Autres ({autres.length})</h3>
            <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto">
              {autres.map((item) => (
                <div key={item.id} className="relative group">
                  <img 
                    src={item.image_url} 
                    alt="Autre"
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
    </div>
  );
};

export default ContentManager;