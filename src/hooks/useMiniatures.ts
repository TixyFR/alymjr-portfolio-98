import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Miniature {
  id: string;
  title: string;
  image_url: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export const useMiniatures = () => {
  const [miniatures, setMiniatures] = useState<Miniature[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMiniatures = async () => {
    try {
      const { data, error } = await supabase
        .from('miniatures')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMiniatures(data || []);
    } catch (error) {
      console.error('Error fetching miniatures:', error);
      toast.error('Erreur lors du chargement des miniatures');
    } finally {
      setIsLoading(false);
    }
  };

  const addMiniature = async (miniature: Omit<Miniature, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('miniatures')
        .insert([miniature])
        .select()
        .single();

      if (error) throw error;
      setMiniatures(prev => [data, ...prev]);
      toast.success('Miniature ajoutée avec succès');
      return data;
    } catch (error) {
      console.error('Error adding miniature:', error);
      toast.error('Erreur lors de l\'ajout de la miniature');
      throw error;
    }
  };

  const updateMiniature = async (id: string, updates: Partial<Omit<Miniature, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      const { data, error } = await supabase
        .from('miniatures')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setMiniatures(prev => prev.map(m => m.id === id ? data : m));
      toast.success('Miniature mise à jour avec succès');
      return data;
    } catch (error) {
      console.error('Error updating miniature:', error);
      toast.error('Erreur lors de la mise à jour de la miniature');
      throw error;
    }
  };

  const deleteMiniature = async (id: string) => {
    try {
      const { error } = await supabase
        .from('miniatures')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMiniatures(prev => prev.filter(m => m.id !== id));
      toast.success('Miniature supprimée avec succès');
    } catch (error) {
      console.error('Error deleting miniature:', error);
      toast.error('Erreur lors de la suppression de la miniature');
      throw error;
    }
  };

  useEffect(() => {
    fetchMiniatures();
  }, []);

  return {
    miniatures,
    isLoading,
    addMiniature,
    updateMiniature,
    deleteMiniature,
    refetch: fetchMiniatures
  };
};