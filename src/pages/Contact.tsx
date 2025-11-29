import { useState } from 'react';
import { Mail, Send, User, Zap } from 'lucide-react';
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

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending:', error);
      toast.error('Error sending message');
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
              <span className="gradient-neon">Contact</span>
            </h1>
            <div className="flex items-center justify-center gap-6">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
              <p className="text-sm text-muted-foreground tracking-[0.2em] uppercase font-bold">
                Let's Work Together
              </p>
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-neon-magenta to-transparent" />
            </div>
            <p className="text-base md:text-lg text-foreground/70 max-w-xl mx-auto font-medium">
              Have a project in mind? Let's create something amazing
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2 uppercase tracking-wider">
                    Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="glass-card border-border/50 focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2 uppercase tracking-wider">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="glass-card border-border/50 focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2 uppercase tracking-wider">
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="glass-card border-border/50 focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={6}
                    required
                    className="glass-card border-border/50 focus:border-primary transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="neon-button w-full inline-flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Zap className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-card p-8 space-y-6 hover-3d">
                <h3 className="text-xl font-black uppercase tracking-wider">Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-neon-cyan neon-glow-cyan flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Email</p>
                      <p className="text-foreground font-bold">contact@alymjr.fr</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <User className="w-6 h-6 text-neon-magenta neon-glow-magenta flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Designer</p>
                      <p className="text-foreground font-bold">AlymJr</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 space-y-4 hover-3d">
                <h3 className="text-xl font-black uppercase tracking-wider">Services</h3>
                <ul className="space-y-2 text-sm font-medium text-foreground/70">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-cyan rounded-full neon-glow-cyan" />
                    YouTube Thumbnails
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-magenta rounded-full neon-glow-magenta" />
                    Creative Posters
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full neon-glow-primary" />
                    Visual Identity
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    Social Media Designs
                  </li>
                </ul>
              </div>

              <div className="glass-card p-8 space-y-4 hover-3d">
                <h3 className="text-xl font-black uppercase tracking-wider">Response Time</h3>
                <p className="text-sm font-medium text-foreground/70 leading-relaxed">
                  I typically respond within 24h. For urgent projects, please mention it in your message.
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
