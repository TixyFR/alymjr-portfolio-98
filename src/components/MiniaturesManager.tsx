import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Miniature {
  id: string;
  title: string;
  image_url: string;
  description?: string;
}

const MiniaturesManager = () => {
  const [miniatures, setMiniatures] = useState<Miniature[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newMiniature, setNewMiniature] = useState({
    title: '',
    image_url: '',
    description: ''
  });

  const fetchMiniatures = async () => {
    try {
      const { data, error } = await supabase
        .from('miniatures')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setMiniatures(data || []);
    } catch (error) {
      toast.error('Erreur lors du chargement des miniatures');
    } finally {
      setLoading(false);
    }
  };

  const addMiniature = async () => {
    if (!newMiniature.title || !newMiniature.image_url) {
      toast.error('Titre et URL requis');
      return;
    }

    try {
      const { error } = await supabase
        .from('miniatures')
        .insert([newMiniature]);
      
      if (error) throw error;
      
      toast.success('Miniature ajoutée !');
      setNewMiniature({ title: '', image_url: '', description: '' });
      fetchMiniatures();
    } catch (error) {
      toast.error('Erreur lors de l\'ajout');
    }
  };

  const deleteMiniature = async (id: string) => {
    try {
      const { error } = await supabase
        .from('miniatures')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Miniature supprimée !');
      fetchMiniatures();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const updateMiniature = async (id: string, updates: Partial<Miniature>) => {
    try {
      const { error } = await supabase
        .from('miniatures')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Miniature mise à jour !');
      setEditingId(null);
      fetchMiniatures();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  useEffect(() => {
    fetchMiniatures();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Add new miniature */}
      <Card className="glass">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Ajouter une miniature</h3>
          <div className="space-y-4">
            <Input
              placeholder="Titre"
              value={newMiniature.title}
              onChange={(e) => setNewMiniature(prev => ({ ...prev, title: e.target.value }))}
            />
            <Input
              placeholder="URL de l'image"
              value={newMiniature.image_url}
              onChange={(e) => setNewMiniature(prev => ({ ...prev, image_url: e.target.value }))}
            />
            <Input
              placeholder="Description (optionnelle)"
              value={newMiniature.description}
              onChange={(e) => setNewMiniature(prev => ({ ...prev, description: e.target.value }))}
            />
            <Button onClick={addMiniature} className="w-full bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Existing miniatures */}
      <Card className="glass">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Miniatures ({miniatures.length})</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {miniatures.map((miniature) => (
              <div key={miniature.id} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                <img 
                  src={miniature.image_url} 
                  alt={miniature.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  {editingId === miniature.id ? (
                    <div className="space-y-2">
                      <Input
                        defaultValue={miniature.title}
                        onBlur={(e) => updateMiniature(miniature.id, { title: e.target.value })}
                        className="text-sm"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="font-medium truncate">{miniature.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{miniature.image_url}</p>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingId(editingId === miniature.id ? null : miniature.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteMiniature(miniature.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MiniaturesManager;
