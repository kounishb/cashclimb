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
      highlight: "Active community"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile-Friendly Design",
      description: "Play anywhere, anytime on any device. Our responsive design ensures a seamless experience across phones, tablets, and computers.",
      highlight: "Cross-platform"
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

  const gameModules = [
    { 
      title: "Money Basics", 
      description: "Understanding money, needs vs wants, and simple budgeting",
      grades: "4"
    },
    { 
      title: "Banking & Saving", 
      description: "Bank accounts, savings goals, and compound interest",
      grades: "5"
    },
    { 
      title: "Budgeting & Goals", 
      description: "Creating budgets, tracking expenses, and smart financial goals",
      grades: "6"
    },
    { 
      title: "Credit & Debt", 
      description: "Understanding credit scores, loans, and responsible borrowing",
      grades: "7"
    },
    { 
      title: "Spending Wisely", 
      description: "Comparison shopping, unit prices, and avoiding impulse buying",
      grades: "8"
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

      {/* Game Modules Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete <span className="bg-gradient-primary bg-clip-text text-transparent">5 Learning Modules</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              One engaging game with 5 comprehensive modules covering all essential financial skills - one module per grade level (4-8).
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameModules.map((module, index) => (
              <Card key={index} className="hover:scale-105 transition-all duration-300 border-border/50 hover:border-primary/50 hover:shadow-glow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge variant="secondary" className="mb-2">
                      Module {index + 1}
                    </Badge>
                    <Badge variant="outline" className="mb-2 ml-2">
                      Grade {module.grades}
                    </Badge>
                    <h3 className="text-lg font-semibold">{module.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">{module.description}</p>
                  
                  <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                    <Link to="/game-start">
                      Play Module
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Real <span className="bg-gradient-gold bg-clip-text text-transparent">Gaming</span> Elements
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              One comprehensive game with 5 progressive modules. Cash Climb is built from the ground up as a game that happens to teach finance.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {gameFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-background/50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
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
            Start your journey to financial success today! Master essential money skills through our engaging game-based platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="animate-glow" asChild>
              <Link to="/auth">
                Play Now - It's Free!
                <Gamepad2 className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;