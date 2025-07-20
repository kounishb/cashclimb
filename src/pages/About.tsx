import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Users, Lightbulb, Heart, TrendingUp } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Purpose-Driven",
      description: "We believe financial literacy should be accessible to everyone, regardless of background or experience level."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community-Focused",
      description: "Learning together makes us stronger. We foster a supportive environment where everyone can succeed."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation-Led",
      description: "We constantly evolve our platform with cutting-edge gamification and educational methodologies."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Empathy-First",
      description: "We understand that money can be stressful. Our approach is gentle, encouraging, and judgment-free."
    }
  ];

  const team = [
    {
      name: "Alex Rivera",
      role: "CEO & Co-Founder",
      bio: "Former fintech executive with 10+ years experience. Passionate about democratizing financial education.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Sarah Kim",
      role: "CTO & Co-Founder",
      bio: "Gaming industry veteran and full-stack developer. Expert in creating engaging user experiences.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b3bd?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Marcus Thompson",
      role: "Head of Education",
      bio: "Certified Financial Planner and former educator. Designs our curriculum and learning pathways.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Lisa Chen",
      role: "Head of Product",
      bio: "UX design specialist with background in behavioral psychology. Creates intuitive, engaging interfaces.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Cash Climb</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to revolutionize financial education by making it engaging, accessible, and effective through the power of gamification.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="bg-gradient-gold bg-clip-text text-transparent">Mission</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Traditional financial education is broken. It's boring, intimidating, and often disconnected from real life. We're changing that.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Cash Climb transforms learning about money into an engaging adventure. Through gamification, we make complex financial concepts simple, fun, and memorable.
              </p>
              <p className="text-lg text-muted-foreground">
                Our goal is to empower a generation of financially literate individuals who can make informed decisions, build wealth, and achieve their dreams.
              </p>
            </div>
            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
              <CardContent className="p-8">
                <div className="bg-gradient-primary p-4 rounded-lg inline-flex mb-4">
                  <TrendingUp className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">The Problem We Solve</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• 66% of Americans can't pass a basic financial literacy test</li>
                  <li>• Traditional education methods have 23% retention rates</li>
                  <li>• Young adults graduate without practical money skills</li>
                  <li>• Financial stress affects 72% of adults regularly</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="bg-gradient-primary bg-clip-text text-transparent">Core Values</span>
            </h2>
            <p className="text-xl text-muted-foreground">These principles guide everything we do at Cash Climb.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:scale-105 transition-all duration-300 border-border/50 hover:border-primary/50 hover:shadow-glow">
                <CardContent className="p-6">
                  <div className="bg-gradient-primary p-3 rounded-lg inline-flex mb-4">
                    <div className="text-primary-foreground">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our <span className="bg-gradient-gold bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground">The passionate people behind Cash Climb's mission.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:scale-105 transition-all duration-300 border-border/50 hover:border-secondary/50 hover:shadow-gold">
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-secondary/20">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-secondary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="bg-gradient-gold bg-clip-text text-transparent">Story</span>
            </h2>
          </div>
          
          <Card className="border-border/50">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-6">
                  Cash Climb was born from a simple observation: people learn better when they're having fun. Our founders, Alex and Sarah, met at a fintech conference where they were both frustrated by the same problem.
                </p>
                <p className="mb-6">
                  "Why is financial education so boring?" Alex asked during a particularly dry presentation about compound interest. Sarah, who had spent years creating engaging gaming experiences, knew the answer wasn't in the content—it was in the delivery.
                </p>
                <p className="mb-6">
                  That conversation sparked an idea that would eventually become Cash Climb. What if learning about money could be as engaging as playing your favorite game? What if achieving financial goals felt like leveling up a character?
                </p>
                <p className="mb-6">
                  After months of research, prototyping, and testing with users, Cash Climb launched with a simple premise: make financial education so engaging that people actually want to learn.
                </p>
                <p>
                  Today, we're proud to serve thousands of users who are climbing their way to financial freedom, one level at a time.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our <span className="bg-gradient-primary bg-clip-text text-transparent">Mission</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Whether you're looking to learn, invest, or join our team, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Start Learning
            </Button>
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;