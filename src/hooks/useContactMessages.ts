import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export const useContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Erreur lors du chargement des messages');
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === id ? { ...msg, is_read: true } : msg
        )
      );
      toast.success('Message marqué comme lu');
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const markAsUnread = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: false })
        .eq('id', id);

      if (error) throw error;
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === id ? { ...msg, is_read: false } : msg
        )
      );
      toast.success('Message marqué comme non lu');
    } catch (error) {
      console.error('Error marking message as unread:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setMessages(prev => prev.filter(msg => msg.id !== id));
      toast.success('Message supprimé');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  useEffect(() => {
    fetchMessages();

    // Real-time subscription for new messages
    const channel = supabase
      .channel('contact_messages_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_messages'
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const unreadCount = messages.filter(msg => !msg.is_read).length;

  return {
    messages,
    isLoading,
    unreadCount,
    markAsRead,
    markAsUnread,
    deleteMessage,
    refetch: fetchMessages
  };
};