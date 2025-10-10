import { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useContent } from '@/hooks/useContent';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  id: string;
  imageUrl: string;
  onDelete: () => void;
}

const SortableItem = ({ id, imageUrl, onDelete }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group"
    >
      <div className="flex items-center gap-2 p-2 bg-card rounded border">
        <button
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-accent rounded"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <img 
          src={imageUrl} 
          alt="Content"
          className="w-16 h-16 object-cover rounded"
        />
        <Button
          size="sm"
          variant="destructive"
          className="ml-auto"
          onClick={onDelete}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

const DraggableContentManager = () => {
  const { content, isLoading, addContent, deleteContent, reorderContent } = useContent();
  const [newItem, setNewItem] = useState({
    image_url: '',
    category: 'miniatures'
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = (event: DragEndEvent, category: string) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const categoryItems = content.filter(item => item.category === category);
    const oldIndex = categoryItems.findIndex((item) => item.id === active.id);
    const newIndex = categoryItems.findIndex((item) => item.id === over.id);

    const reorderedItems = arrayMove(categoryItems, oldIndex, newIndex);
    
    // Update display_order for all items
    const updates = reorderedItems.map((item, index) => ({
      id: item.id,
      display_order: index + 1,
    }));

    reorderContent(updates);
  };

  if (isLoading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  // Filter content by category
  const miniatures = content.filter(item => item.category === 'miniatures');
  const affiches = content.filter(item => item.category === 'affiches');
  const autres = content.filter(item => item.category === 'autres');
  const entrainement = content.filter(item => item.category === 'entrainement');

  const renderCategory = (categoryItems: typeof content, categoryName: string, categoryKey: string) => (
    <Card className="glass">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">{categoryName} ({categoryItems.length})</h3>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(event) => handleDragEnd(event, categoryKey)}
        >
          <SortableContext
            items={categoryItems.map(item => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {categoryItems.map((item) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.image_url}
                  onDelete={() => deleteContent(item.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );

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
                <SelectItem value="entrainement">Entrainement</SelectItem>
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
        {renderCategory(miniatures, 'Miniatures', 'miniatures')}
        {renderCategory(affiches, 'Affiches', 'affiches')}
        {renderCategory(autres, 'Autres', 'autres')}
        {renderCategory(entrainement, 'Entrainement', 'entrainement')}
      </div>
    </div>
  );
};

export default DraggableContentManager;
