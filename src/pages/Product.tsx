import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Gamepad2, 
  Trophy, 
  Target, 
  Users, 
  BarChart3, 
  Shield, 
  Smartphone, 
  Zap,
  CheckCircle,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const Product = () => {
  const features = [
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: "Interactive Learning Modules",
      description: "Engage with financial concepts through story-driven scenarios, mini-games, and practical simulations that make learning stick.",
      highlight: "90% retention rate"
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Achievement System",
      description: "Earn badges, unlock levels, and compete on leaderboards as you master budgeting, investing, and financial planning.",
      highlight: "50+ achievements"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Personal Goal Tracking",
      description: "Set financial goals and track your progress with visual indicators, milestone celebrations, and personalized recommendations.",
      highlight: "Smart goal AI"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Challenges",
      description: "Join group challenges, share progress with friends, and learn from a community of like-minded financial climbers.",
      highlight: "10K+ active users"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Portfolio Simulator",
      description: "Practice investing with virtual money, test strategies, and learn market dynamics without financial risk.",
      highlight: "Real market data"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security & Privacy",
      description: "Bank-level encryption protects your data. We never ask for real financial account information or passwords.",
      highlight: "256-bit encryption"
    }
  ];

  const gameFeatures = [
    "Level-based progression system",
    "Daily challenges and quests",
    "Virtual currency rewards",
    "Customizable avatars",
    "Multiplayer competitions",
    "Boss battles (financial scenarios)",
    "Skill trees for different topics",
    "Seasonal events and tournaments"
  ];

  const learningPaths = [
    {
      title: "Beginner Budgeter",
      description: "Master the basics of budgeting and expense tracking",
      duration: "2-3 weeks",
      modules: 8,
      difficulty: "Beginner"
    },
    {
      title: "Investment Explorer",
      description: "Learn stocks, bonds, and portfolio management",
      duration: "4-6 weeks", 
      modules: 12,
      difficulty: "Intermediate"
    },
    {
      title: "Debt Destroyer",
      description: "Strategies to eliminate debt and build credit",
      duration: "3-4 weeks",
      modules: 10,
      difficulty: "Beginner"
    },
    {
      title: "Wealth Builder",
      description: "Advanced investing and wealth accumulation",
      duration: "6-8 weeks",
      modules: 16,
      difficulty: "Advanced"
    }
  ];

  const testimonials = [
    {
      name: "Jamie Park",
      role: "Marketing Manager",
      content: "The investment simulator helped me understand portfolio diversification before I started investing real money. Saved me from costly mistakes!",
      rating: 5,
      feature: "Portfolio Simulator"
    },
    {
      name: "Carlos Rodriguez", 
      role: "College Student",
      content: "The budgeting game made me actually excited to track my expenses. I've saved $2,000 in just 3 months!",
      rating: 5,
      feature: "Budgeting Game"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                🎮 Gamified Learning Platform
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Learn Finance Through 
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Gaming</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Master personal finance with our interactive platform that combines education with entertainment. Level up your money skills while having fun!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="animate-glow" asChild>
                  <Link to="/game">
                    Start Playing Free
                    <Gamepad2 className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>
            </div>
            
            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
              <CardContent className="p-8">
                <div className="bg-muted/50 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Your Progress</h3>
                    <Badge variant="secondary">Level 7</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Budgeting Master</span>
                      <span className="text-primary">850/1000 XP</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="bg-gradient-primary h-2 rounded-full w-[85%]"></div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">Achievements</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-secondary">$5,420</div>
                    <div className="text-sm text-muted-foreground">Saved</div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground italic">
                  "This is what your dashboard could look like after just a few weeks!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful <span className="bg-gradient-primary bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to master personal finance in an engaging, game-like environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 border-border/50 hover:border-primary/50 hover:shadow-glow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-primary p-3 rounded-lg group-hover:animate-float">
                      <div className="text-primary-foreground">
                        {feature.icon}
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.highlight}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Game Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Real <span className="bg-gradient-gold bg-clip-text text-transparent">Gaming</span> Elements
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We don't just add points to boring content. Cash Climb is built from the ground up as a game that happens to teach finance.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {gameFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:shadow-gold">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Zap className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">Level Up Your Skills</h3>
                  <p className="text-muted-foreground">Complete challenges to unlock new abilities and knowledge areas.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Budget Ninja</span>
                    <Badge className="bg-secondary/20 text-secondary">Unlocked</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Investment Wizard</span>
                    <Badge variant="outline">Level 5 Required</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Debt Slayer</span>
                    <Badge variant="outline">Complete Quest</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your <span className="bg-gradient-primary bg-clip-text text-transparent">Learning Path</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Structured courses designed to take you from beginner to expert in specific financial areas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPaths.map((path, index) => (
              <Card key={index} className="hover:scale-105 transition-all duration-300 border-border/50 hover:border-primary/50 hover:shadow-glow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge 
                      variant={path.difficulty === 'Beginner' ? 'secondary' : path.difficulty === 'Intermediate' ? 'default' : 'destructive'}
                      className="mb-2"
                    >
                      {path.difficulty}
                    </Badge>
                    <h3 className="text-lg font-semibold">{path.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">{path.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{path.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Modules:</span>
                      <span className="font-medium">{path.modules}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Start Path
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Success <span className="bg-gradient-gold bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-xl text-muted-foreground">See how our users have transformed their financial lives.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:scale-105 transition-all duration-300 border-border/50 hover:border-secondary/50 hover:shadow-gold">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                      ))}
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      {testimonial.feature}
                    </Badge>
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
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Level Up Your <span className="bg-gradient-gold bg-clip-text text-transparent">Financial Game</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of players who are already climbing their way to financial success. Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="animate-glow">
              Play Now - It's Free!
              <Gamepad2 className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg">
              Schedule Demo
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-primary mr-2" />
              Free to start
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-primary mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-primary mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;