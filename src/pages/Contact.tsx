import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send,
  Users,
  Briefcase,
  HelpCircle
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
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      content: "hello@cashclimb.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri, 9am-6pm EST"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      content: "123 Innovation Drive, Suite 100",
      description: "San Francisco, CA 94105"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Support Hours",
      content: "Monday - Friday",
      description: "9:00 AM - 6:00 PM EST"
    }
  ];

  const contactReasons = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "General Inquiries",
      description: "Questions about Cash Climb, partnerships, or general information.",
      email: "hello@cashclimb.com"
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Business & Partnerships",
      description: "Interested in partnering with us or enterprise solutions.",
      email: "business@cashclimb.com"
    },
    {
      icon: <HelpCircle className="h-8 w-8" />,
      title: "Customer Support",
      description: "Need help with your account or have technical issues.",
      email: "support@cashclimb.com"
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Feedback & Suggestions",
      description: "Share your ideas to help us improve the platform.",
      email: "feedback@cashclimb.com"
    }
  ];

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

      {/* Contact Form and Info Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
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

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="grid gap-6">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:shadow-gold">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-gradient-primary p-3 rounded-lg">
                            <div className="text-primary-foreground">
                              {info.icon}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{info.title}</h3>
                            <p className="text-foreground mb-1">{info.content}</p>
                            <p className="text-muted-foreground text-sm">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Reasons Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Can We <span className="bg-gradient-gold bg-clip-text text-transparent">Help</span>?
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the right contact method for your specific needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactReasons.map((reason, index) => (
              <Card key={index} className="text-center hover:scale-105 transition-all duration-300 border-border/50 hover:border-primary/50 hover:shadow-glow">
                <CardContent className="p-6">
                  <div className="bg-gradient-primary p-3 rounded-lg inline-flex mb-4">
                    <div className="text-primary-foreground">
                      {reason.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{reason.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{reason.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    {reason.email}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
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
                  Yes! We offer a comprehensive free tier that includes access to basic learning modules, achievements, and community features. Premium features are available for users who want advanced analytics and personalized coaching.
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
          <Button variant="gold" size="lg">
            Contact Our Team
            <MessageCircle className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;