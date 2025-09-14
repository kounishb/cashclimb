import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Send,
  MessageCircle
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) {
        throw error;
      }

      toast({
        title: "Message sent successfully!",
        description: "We've received your message and will get back to you soon.",
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error('Error saving contact message:', error);
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get in <span className="bg-gradient-primary bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about Cash Climb? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this about?"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="bg-gradient-primary bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions about Cash Climb.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Is Cash Climb really free?</h3>
                <p className="text-muted-foreground">
                  Yes! Cash Climb is completely free. There are no paid tiers, premium features, or hidden costs. We believe financial education should be accessible to all young learners.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Do I need to connect my bank accounts?</h3>
                <p className="text-muted-foreground">
                  Not at all! Cash Climb is entirely educational and uses simulated scenarios. We never ask for your real banking information or passwords. You can practice and learn in a completely safe environment.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">How long does it take to see results?</h3>
                <p className="text-muted-foreground">
                  Most users report improved financial awareness within the first week and start implementing new habits within a month. The gamified approach helps maintain engagement and accelerates learning compared to traditional methods.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Is Cash Climb suitable for beginners?</h3>
                <p className="text-muted-foreground">
                  Absolutely! Our platform is designed to meet users wherever they are in their financial journey. We have dedicated beginner paths and the adaptive learning system adjusts to your knowledge level.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">What age group is Cash Climb designed for?</h3>
                <p className="text-muted-foreground">
                  Cash Climb is specifically designed for students in grades 4-8 (ages 9-14). Each module is grade-appropriate and builds progressively on financial concepts suitable for young learners.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Can teachers use Cash Climb in their classrooms?</h3>
                <p className="text-muted-foreground">
                  Yes! Cash Climb is perfect for classroom use. Teachers can track student progress, assign specific modules, and use our educational content to supplement their financial literacy curriculum.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">How do I track my child's progress?</h3>
                <p className="text-muted-foreground">
                  There's a built-in progress tracking feature within the game that shows your child's advancement through modules, achievements earned, and learning milestones. Parents can view this progress directly in the game interface.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">What devices can I use to play Cash Climb?</h3>
                <p className="text-muted-foreground">
                  Cash Climb works on any device with a web browser - computers, tablets, and smartphones. The game is fully responsive and adapts to different screen sizes for the best experience.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Are there any technical requirements?</h3>
                <p className="text-muted-foreground">
                  Just a stable internet connection and a modern web browser. No downloads or installations required. Cash Climb runs entirely in your browser for maximum accessibility.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">How often is new content added?</h3>
                <p className="text-muted-foreground">
                  We regularly update Cash Climb with new challenges, seasonal events, and educational content. Our development team releases updates monthly to keep the experience fresh and engaging.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Still Have <span className="bg-gradient-gold bg-clip-text text-transparent">Questions</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            We're here to help! Reach out to us and we'll get back to you as soon as possible.
          </p>
          <Button 
            variant="gold" 
            size="lg"
            onClick={() => {
              const formSection = document.querySelector('h2');
              if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Contact Our Team
            <MessageCircle className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;