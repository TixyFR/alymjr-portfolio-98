import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Updated hook with category support
export const useContent = (category?: string) => {
  const [content, setContent] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('miniatures')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      let filteredData = (data as any[]) || [];
      if (category) {
        filteredData = filteredData.filter((item: any) => 
          item.category === category || (!item.category && category === 'miniatures')
        );
      }
      
      setContent(filteredData);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Erreur lors du chargement');
    } finally {
      setIsLoading(false);
    }
  };

  const addContent = async (item: { image_url: string; category?: string }) => {
    try {
      const { data, error } = await supabase
        .from('miniatures')
        .insert([{ 
          image_url: item.image_url, 
          title: `${item.category || 'miniature'} - ${Date.now()}`
        }])
        .select()
        .single();

      if (error) throw error;
      // Add category info client-side for now
      const itemWithCategory = { ...data, category: item.category || 'miniatures' };
      setContent(prev => [itemWithCategory, ...prev]);
      toast.success('Contenu ajouté avec succès');
      return itemWithCategory;
    } catch (error) {
      console.error('Error adding content:', error);
      toast.error('Erreur lors de l\'ajout');
      throw error;
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('miniatures')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setContent(prev => prev.filter(item => item.id !== id));
      toast.success('Contenu supprimé');
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Erreur lors de la suppression');
      throw error;
    }
  };

  useEffect(() => {
    fetchContent();

    // Real-time updates
    const subscription = supabase
      .channel('content_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'miniatures',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setContent(prev => [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setContent(prev => prev.map(item => 
              item.id === payload.new.id ? payload.new : item
            ));
          } else if (payload.eventType === 'DELETE') {
            setContent(prev => prev.filter(item => item.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    content,
    isLoading,
    addContent,
    deleteContent,
    refetch: fetchContent
  };
};