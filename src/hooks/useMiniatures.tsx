import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Miniature {
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
  const [error, setError] = useState<string | null>(null);

  const fetchMiniatures = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('miniatures')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setMiniatures(data || []);
    } catch (err) {
      console.error('Erreur lors du chargement des miniatures:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMiniatures();
  }, []);

  return {
    miniatures,
    isLoading,
    error,
    refetch: fetchMiniatures
  };
};