import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useMiniatures, type Miniature } from '@/hooks/useMiniatures';

const MiniaturesAdmin = () => {
  const { miniatures, isLoading, addMiniature, updateMiniature, deleteMiniature } = useMiniatures();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    description: ''
  });

  const handleSave = async () => {
    if (!formData.title || !formData.image_url) return;

    try {
      if (editingId) {
        await updateMiniature(editingId, formData);
        setEditingId(null);
      } else {
        await addMiniature(formData);
        setShowAddForm(false);
      }
      setFormData({ title: '', image_url: '', description: '' });
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleEdit = (miniature: Miniature) => {
    setEditingId(miniature.id);
    setFormData({
      title: miniature.title,
      image_url: miniature.image_url,
      description: miniature.description || ''
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ title: '', image_url: '', description: '' });
  };

  if (isLoading) {
    return <div className="text-center">Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gestion des Miniatures</h3>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-primary"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter
        </Button>
      </div>

      {(showAddForm || editingId) && (
        <Card className="glass">
          <CardContent className="p-4 space-y-3">
            <Input
              placeholder="Titre"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
            <Input
              placeholder="URL de l'image"
              value={formData.image_url}
              onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
            />
            <Input
              placeholder="Description (optionnelle)"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
            <div className="flex space-x-2">
              <Button onClick={handleSave} size="sm">
                <Save className="w-4 h-4 mr-2" />
                {editingId ? 'Modifier' : 'Ajouter'}
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="w-4 h-4 mr-2" />
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {miniatures.map((miniature) => (
          <Card key={miniature.id} className="glass">
            <CardContent className="p-3">
              <div className="flex items-center space-x-3">
                <img
                  src={miniature.image_url}
                  alt={miniature.title}
                  className="w-16 h-12 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{miniature.title}</h4>
                  {miniature.description && (
                    <p className="text-sm text-muted-foreground truncate">
                      {miniature.description}
                    </p>
                  )}
                </div>
                <div className="flex space-x-1">
                  <Button
                    onClick={() => handleEdit(miniature)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => deleteMiniature(miniature.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MiniaturesAdmin;