import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Target, Trophy, Users, Star, ChevronRight, BookOpen, Shield, Clock, Gamepad2, DollarSign, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero-bg-clean.jpg";
const Home = () => {
  const features = [{
    icon: <Target className="h-8 w-8" />,
    title: "Goal-Based Learning",
    description: "Set financial goals and achieve them through interactive challenges and real-world scenarios."
  }, {
    icon: <Trophy className="h-8 w-8" />,
    title: "Achievement System",
    description: "Earn badges, unlock levels, and climb the leaderboard as you master financial concepts."
  }, {
    icon: <Trophy className="h-8 w-8" />,
    title: "Interactive Learning",
    description: "Engage with educational content through videos, articles, and quizzes that make financial education effective and engaging."
  }];
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-hero bg-cover bg-center" style={{
      backgroundImage: `url(${heroImage})`
    }}>
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
              Master personal finance through interactive education. Build wealth, achieve goals, and unlock your financial potential with Cash Climb.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/game">
                  Start Your Climb
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
            {features.map((feature, index) => <Card key={index} className="group hover:scale-105 transition-all duration-300 border-border/50 hover:border-primary/50 hover:shadow-glow">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-primary p-3 rounded-lg inline-flex mb-4 group-hover:animate-float">
                    <div className="text-primary-foreground">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Making <span className="bg-gradient-primary bg-clip-text text-transparent">Financial Education</span> Accessible
            </h2>
            <p className="text-xl text-muted-foreground">
              Empowering young learners with essential financial skills through interactive education.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">6</div>
              <div className="text-sm text-muted-foreground">Grade Levels</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">3-8</div>
              <div className="text-sm text-muted-foreground">Grades</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Free to Play</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How <span className="bg-gradient-primary bg-clip-text text-transparent">Cash Climb</span> Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple steps to start your financial education journey through our interactive learning platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-gradient-primary p-4 rounded-full inline-flex mb-6">
                  <Gamepad2 className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">1. Start Learning</h3>
                <p className="text-muted-foreground">
                  Create your account and jump into our interactive financial education platform designed specifically for grades 3-8.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-gradient-primary p-4 rounded-full inline-flex mb-6">
                  <BookOpen className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">2. Learn & Progress</h3>
                <p className="text-muted-foreground">
                  Complete comprehensive courses for each grade level covering money basics, banking, budgeting, credit, and smart spending habits.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-gradient-primary p-4 rounded-full inline-flex mb-6">
                  <Trophy className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">3. Master Skills</h3>
                <p className="text-muted-foreground">
                  Earn achievements, track progress, and apply your newfound financial knowledge in real-world scenarios.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Learning Benefits Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why <span className="bg-gradient-primary bg-clip-text text-transparent">Financial Education</span> Matters
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Building essential money skills early sets the foundation for lifelong financial success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Build Money Confidence</h3>
                  <p className="text-muted-foreground">Learn to make smart financial decisions early, building confidence with money management.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Develop Life Skills</h3>
                  <p className="text-muted-foreground">Master budgeting, saving, and spending wisely - skills that benefit you for life.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Avoid Common Pitfalls</h3>
                  <p className="text-muted-foreground">Learn about credit, debt, and financial traps before they become real-world problems.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Set & Achieve Goals</h3>
                  <p className="text-muted-foreground">Learn the power of goal setting and tracking progress toward financial objectives.</p>
                </div>
              </div>
            </div>

            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-4">Safe Learning Environment</h3>
                  <p className="text-muted-foreground">
                    Practice with virtual scenarios - no real money, no real risk, just real learning.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Learning Progress</span>
                    <span className="text-primary font-semibold">Grades 3-8</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-3">
                    <div className="bg-gradient-primary h-3 rounded-full w-[75%]"></div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    Progress through age-appropriate financial concepts
                  </div>
                </div>
              </CardContent>
            </Card>
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
            Join now to climb your way to financial success. Your future self will thank you.
          </p>
          <Button variant="gold" size="lg" asChild>
            <Link to="/auth">
              Join Cash Climb Today
            </Link>
          </Button>
        </div>
      </section>
    </div>;
};
export default Home;