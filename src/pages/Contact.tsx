import { useState } from 'react';
import { Mail, Send, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }
      });

      if (error) throw error;

      toast.success('Message envoyé avec succès !');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast.error('Erreur lors de l\'envoi du message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Layout>
      <div className="pt-32 pb-24 min-h-screen px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              Contact
            </h1>
            <div className="h-px w-16 bg-border mx-auto" />
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
              Vous avez un projet ? N'hésitez pas à me contacter
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="zen-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-light text-muted-foreground mb-2">
                    Nom
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                    className="bg-muted/50 border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-muted-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                    className="bg-muted/50 border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-muted-foreground mb-2">
                    Sujet
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Sujet du message"
                    className="bg-muted/50 border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-muted-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Votre message..."
                    rows={6}
                    required
                    className="bg-muted/50 border-border resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 group"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                      <span>Envoi en cours...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Envoyer</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="zen-card p-8 space-y-6">
                <h3 className="text-xl font-normal">Informations</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground font-light">Email</p>
                      <p className="text-foreground">contact@alymjr.fr</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground font-light">Designer</p>
                      <p className="text-foreground">AlymJr</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="zen-card p-8 space-y-4">
                <h3 className="text-xl font-normal">Services</h3>
                <ul className="space-y-2 text-sm font-light text-muted-foreground">
                  <li>Miniatures YouTube</li>
                  <li>Affiches créatives</li>
                  <li>Identité visuelle</li>
                  <li>Designs pour réseaux sociaux</li>
                </ul>
              </div>

              <div className="zen-card p-8 space-y-4">
                <h3 className="text-xl font-normal">Réponse</h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  Je réponds généralement sous 24h. Pour les projets urgents, mentionnez-le dans votre message.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
