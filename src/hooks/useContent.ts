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

  const addContent = useCallback(async (item: { image_url: string; category?: string }) => {
    try {
      const { data, error } = await supabase
        .from('miniatures')
        .insert([{ 
          image_url: item.image_url, 
          title: `${item.category || 'miniature'} - ${Date.now()}`,
          category: item.category || 'miniatures'
        }])
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
    refetch: fetchContent
  };
};