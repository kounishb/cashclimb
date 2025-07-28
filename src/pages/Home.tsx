import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Target, Trophy, Users, Star, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero-bg.jpg";

const Home = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Goal-Based Learning",
      description: "Set financial goals and achieve them through interactive challenges and real-world scenarios."
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Achievement System",
      description: "Earn badges, unlock levels, and climb the leaderboard as you master financial concepts."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Learning",
      description: "Connect with peers, join challenges, and learn from a supportive community of financial climbers."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "College Student",
      content: "Cash Climb made budgeting fun! I learned more in a month than in my entire economics class.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Young Professional",
      content: "The investment challenges helped me understand the stock market without risking real money.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Recent Graduate",
      content: "Finally, a platform that doesn't make finance boring. The gamification keeps me engaged!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-gradient-hero bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/70"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Climb Your Way
              </span>
              <br />
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                To Financial Freedom
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Master personal finance through gamified learning. Build wealth, achieve goals, and unlock your financial potential with Cash Climb.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="animate-float" asChild>
                <Link to="/game">
                  Start Your Climb
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/product">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">Cash Climb</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We combine the excitement of gaming with practical financial education to help you build real-world skills.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 border-border/50 hover:border-primary/50 hover:shadow-glow">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-primary p-3 rounded-lg inline-flex mb-4 group-hover:animate-float">
                    <div className="text-primary-foreground">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="animate-slide-up">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">10K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="animate-slide-up">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-2">50M+</div>
              <div className="text-muted-foreground">Goals Achieved</div>
            </div>
            <div className="animate-slide-up">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="animate-slide-up">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-2">4.9★</div>
              <div className="text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="bg-gradient-gold bg-clip-text text-transparent">Climbers</span> Say
            </h2>
            <p className="text-xl text-muted-foreground">Real stories from real users who've transformed their financial lives.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:scale-105 transition-all duration-300 border-border/50 hover:border-secondary/50 hover:shadow-gold">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your <span className="bg-gradient-gold bg-clip-text text-transparent">Financial Journey</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already climbing their way to financial success. Your future self will thank you.
          </p>
          <Button variant="gold" size="lg" className="animate-glow">
            Join Cash Climb Today
            <TrendingUp className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;