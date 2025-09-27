import { useState } from 'react';
import { Mail, MailOpen, Trash2, Clock, User, AtSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useContactMessages } from '@/hooks/useContactMessages';

const ContactMessagesManager = () => {
  const { messages, isLoading, unreadCount, markAsRead, markAsUnread, deleteMessage } = useContactMessages();
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="w-8 h-8 bg-muted rounded-full"></div>
          <p className="text-muted-foreground">Chargement des messages...</p>
        </div>
      </div>
    );
  }

  const selectedMsg = messages.find(msg => msg.id === selectedMessage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Messages de Contact</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {messages.length} message{messages.length > 1 ? 's' : ''} total
        </p>
      </div>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Mail className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              Aucun message de contact pour le moment
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Liste des messages */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Tous les messages
            </h3>
            <ScrollArea className="h-[500px] pr-3">
              {messages.map((message) => (
                <Card 
                  key={message.id} 
                  className={`mb-3 cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedMessage === message.id ? 'ring-2 ring-primary' : ''
                  } ${!message.is_read ? 'border-primary/50 bg-primary/5' : ''}`}
                  onClick={() => setSelectedMessage(message.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {message.is_read ? (
                          <MailOpen className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Mail className="w-4 h-4 text-primary" />
                        )}
                        <span className="font-medium text-sm">{message.name}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {new Date(message.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{message.email}</p>
                    <p className="text-sm font-medium mb-1">
                      {message.subject || 'Sans sujet'}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {message.message}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </div>

          {/* Détail du message sélectionné */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Détail du message
            </h3>
            {selectedMsg ? (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>{selectedMsg.name}</span>
                      {!selectedMsg.is_read && (
                        <Badge variant="destructive" className="text-xs">Non lu</Badge>
                      )}
                    </CardTitle>
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (selectedMsg.is_read) {
                            markAsUnread(selectedMsg.id);
                          } else {
                            markAsRead(selectedMsg.id);
                          }
                        }}
                      >
                        {selectedMsg.is_read ? (
                          <>
                            <Mail className="w-4 h-4 mr-1" />
                            Marquer non lu
                          </>
                        ) : (
                          <>
                            <MailOpen className="w-4 h-4 mr-1" />
                            Marquer lu
                          </>
                        )}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          deleteMessage(selectedMsg.id);
                          setSelectedMessage(null);
                        }}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <AtSign className="w-4 h-4 text-muted-foreground" />
                    <a 
                      href={`mailto:${selectedMsg.email}`}
                      className="text-primary hover:underline"
                    >
                      {selectedMsg.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(selectedMsg.created_at).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Sujet</h4>
                    <p className="text-sm p-3 bg-muted/50 rounded-md">
                      {selectedMsg.subject || 'Aucun sujet spécifié'}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Message</h4>
                    <ScrollArea className="max-h-60">
                      <div className="text-sm p-3 bg-muted/50 rounded-md whitespace-pre-wrap">
                        {selectedMsg.message}
                      </div>
                    </ScrollArea>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Mail className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    Sélectionnez un message pour voir les détails
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMessagesManager;