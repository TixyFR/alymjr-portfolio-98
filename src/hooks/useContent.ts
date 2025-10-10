import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Optimized hook with category support and performance improvements
export const useContent = (category?: string) => {
  const [content, setContent] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      let query = supabase
        .from('miniatures')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      // Server-side filtering for better performance
      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      const filteredData = (data as any[]) || [];
      setContent(filteredData);
    } catch (error) {
      console.error('Error fetching content:', error);
      setError('Erreur lors du chargement');
      toast.error('Erreur lors du chargement');
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  const addContent = useCallback(async (item: { 
    image_url?: string; 
    category?: string;
    before_image_url?: string;
    after_image_url?: string;
  }) => {
    try {
      // Get max order for this category
      const { data: maxOrderData } = await supabase
        .from('miniatures')
        .select('display_order')
        .eq('category', item.category || 'miniatures')
        .order('display_order', { ascending: false })
        .limit(1)
        .maybeSingle();

      const newOrder = (maxOrderData?.display_order || 0) + 1;

      const insertData: any = {
        title: `${item.category || 'miniature'} - ${Date.now()}`,
        category: item.category || 'miniatures',
        display_order: newOrder,
      };

      // Add regular image or before/after images
      if (item.image_url) {
        insertData.image_url = item.image_url;
      } else {
        insertData.image_url = item.before_image_url || ''; // Fallback for required field
      }

      if (item.before_image_url) {
        insertData.before_image_url = item.before_image_url;
      }
      
      if (item.after_image_url) {
        insertData.after_image_url = item.after_image_url;
      }

      const { data, error } = await supabase
        .from('miniatures')
        .insert([insertData])
        .select()
        .single();

      if (error) throw error;
      
      // Only add to local state if it matches current category filter
      if (!category || data.category === category) {
        setContent(prev => [data, ...prev]);
      }
      
      toast.success('Contenu ajouté avec succès');
      return data;
    } catch (error) {
      console.error('Error adding content:', error);
      toast.error('Erreur lors de l\'ajout');
      throw error;
    }
  }, [category]);

  const deleteContent = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('miniatures')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Optimistically update UI
      setContent(prev => prev.filter(item => item.id !== id));
      toast.success('Contenu supprimé');
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Erreur lors de la suppression');
      // Refetch to restore state on error
      fetchContent();
      throw error;
    }
  }, [fetchContent]);

  const reorderContent = useCallback(async (items: Array<{ id: string; display_order: number }>) => {
    try {
      // Update all items in parallel
      const updates = items.map(item =>
        supabase
          .from('miniatures')
          .update({ display_order: item.display_order })
          .eq('id', item.id)
      );

      await Promise.all(updates);
      
      // Refetch to get updated order
      await fetchContent();
      toast.success('Ordre mis à jour');
    } catch (error) {
      console.error('Erreur lors de la réorganisation:', error);
      toast.error('Erreur lors de la mise à jour de l\'ordre');
      throw error;
    }
  }, [fetchContent]);

  // Memoize content processing
  const processedContent = useMemo(() => {
    return content.filter(item => {
      if (!category) return true;
      return item.category === category || (!item.category && category === 'miniatures');
    });
  }, [content, category]);

  useEffect(() => {
    fetchContent();

    // Real-time updates with optimized category filtering
    const channelName = `content_changes_${category || 'all'}`;
    const subscription = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'miniatures',
          ...(category && { filter: `category=eq.${category}` })
        },
        (payload) => {
          const itemCategory = (payload.new as any)?.category || (payload.old as any)?.category;
          
          // Only process if matches current category filter
          if (!category || itemCategory === category) {
            if (payload.eventType === 'INSERT') {
              setContent(prev => {
                // Avoid duplicates
                if (prev.some(item => item.id === (payload.new as any).id)) {
                  return prev;
                }
                return [payload.new as any, ...prev];
              });
            } else if (payload.eventType === 'UPDATE') {
              setContent(prev => prev.map(item => 
                item.id === (payload.new as any).id ? payload.new as any : item
              ));
            } else if (payload.eventType === 'DELETE') {
              setContent(prev => prev.filter(item => item.id !== (payload.old as any).id));
            }
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [category, fetchContent]);

  return {
    content: processedContent,
    isLoading,
    error,
    addContent,
    deleteContent,
    reorderContent,
    refetch: fetchContent
  };
};