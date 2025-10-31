import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Trophy, Target, Users, BarChart3, Shield, Smartphone, Zap, CheckCircle, Star, GraduationCap, ChevronRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
const Product = () => {
  const features = [{
    icon: <BookOpen className="h-8 w-8" />,
    title: "Interactive Learning Modules",
    description: "Engage with educational content through videos, articles, and quizzes designed for grades 3-8.",
    highlight: "Comprehensive curriculum"
  }, {
    icon: <Trophy className="h-8 w-8" />,
    title: "Achievement System",
    description: "Earn badges, unlock levels, and compete on leaderboards as you master budgeting, investing, and financial planning.",
    highlight: "50+ achievements"
  }, {
    icon: <Target className="h-8 w-8" />,
    title: "Personal Goal Tracking",
    description: "Set financial goals and track your progress with visual indicators, milestone celebrations, and personalized recommendations.",
    highlight: "Smart goal AI"
  }, {
    icon: <Users className="h-8 w-8" />,
    title: "Community Challenges",
    description: "Join group challenges, share progress with friends, and learn from a community of like-minded financial climbers.",
    highlight: "Active community"
  }, {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Real-Time Analytics",
    description: "Track your learning progress with detailed analytics, performance metrics, and personalized insights to optimize your financial education journey.",
    highlight: "Smart insights"
  }, {
    icon: <Shield className="h-8 w-8" />,
    title: "Security & Privacy",
    description: "Bank-level encryption protects your data. We never ask for real financial account information or passwords.",
    highlight: "256-bit encryption"
  }];
  const gameFeatures = ["Interactive video lessons", "Comprehensive articles", "10-question quizzes", "XP-based progress tracking", "Achievement badges", "Teacher dashboard", "Classroom management", "Progress reporting"];
  const gameModules = [{
    title: "Money Basics",
    description: "Understanding money, needs vs wants, and simple budgeting",
    grades: "3"
  }, {
    title: "Smart Spending",
    description: "Making wise spending decisions and comparison shopping",
    grades: "4"
  }, {
    title: "Banking & Saving",
    description: "Bank accounts, savings goals, and compound interest",
    grades: "5"
  }, {
    title: "Budgeting & Goals",
    description: "Creating budgets, tracking expenses, and smart financial goals",
    grades: "6"
  }, {
    title: "Credit & Debt",
    description: "Understanding credit scores, loans, and responsible borrowing",
    grades: "7"
  }, {
    title: "Investment Basics",
    description: "Introduction to investing, risk, and building wealth",
    grades: "8"
  }];
  return <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Learn Finance Through 
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Education</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Master personal finance with our comprehensive educational platform designed for grades 3-8. Build real-world money skills through structured learning!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/game">
                    Start Learning Today
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Levels Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete <span className="bg-gradient-primary bg-clip-text text-transparent">6 Grade Level Courses</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive financial education curriculum covering grades 3-8 with age-appropriate content for each level.
            </p>
            
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameModules.map((module, index) => <Card key={index} className="hover:scale-105 transition-all duration-300 border-border/50 hover:border-primary/50 hover:shadow-glow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge variant="secondary" className="mb-2">
                      Grade {module.grades}
                    </Badge>
                    <h3 className="text-lg font-semibold">{module.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">{module.description}</p>
                  
                  <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                    <Link to="/game">
                      Start Course
                    </Link>
                  </Button>
                </CardContent>
              </Card>)}
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
            {features.map((feature, index) => <Card key={index} className="group hover:scale-105 transition-all duration-300 border-border/50 hover:border-primary/50 hover:shadow-glow">
                <CardContent className="p-6">
                  <div className="flex justify-start mb-4">
                    <div className="bg-gradient-primary p-3 rounded-lg group-hover:animate-float">
                      <div className="text-primary-foreground">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Game Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Educational <span className="bg-gradient-gold bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Cash Climb provides comprehensive educational tools designed specifically for classroom and individual learning.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {gameFeatures.map((feature, index) => <div key={index} className="flex items-center space-x-2 p-3 bg-background/50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>)}
          </div>
        </div>
      </section>

      {/* What Others Are Saying Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Others Are <span className="bg-gradient-primary bg-clip-text text-transparent">Saying</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Real feedback from parents and teachers using Cash Climb
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-muted-foreground mb-4">
                  "My daughter has learned so much about saving and spending wisely. The videos make complex concepts easy to understand. She's actually excited to learn about money now!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Sarah M.</div>
                    <div className="text-sm text-muted-foreground">Parent, Grade 4 Student</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Cash Climb has been amazing for my classroom! The structured curriculum and engaging quizzes keep my students motivated. The progress tracking helps me see exactly where each student stands."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Mr. Johnson</div>
                    <div className="text-sm text-muted-foreground">5th Grade Teacher</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The age-appropriate content is perfect. My 3rd grader understands money basics now, and my 7th grader is learning about credit responsibly. Both love earning badges!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Lisa R.</div>
                    <div className="text-sm text-muted-foreground">Parent, Multiple Grades</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Finally, a financial literacy program that works! My students are more engaged with money concepts than ever before. The quiz system provides excellent feedback for both students and parents."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Ms. Garcia</div>
                    <div className="text-sm text-muted-foreground">Middle School Teacher</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-muted-foreground mb-4">
                  "My son went from having no interest in money management to asking me about our family budget! The interactive videos and real-world examples really clicked with him."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">David K.</div>
                    <div className="text-sm text-muted-foreground">Parent, Grade 6 Student</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The curriculum is comprehensive and well-structured. It's made financial education accessible for all my students, regardless of their background. The support materials are excellent too!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Mrs. Thompson</div>
                    <div className="text-sm text-muted-foreground">Elementary Teacher</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Level Up Your <span className="bg-gradient-gold bg-clip-text text-transparent">Financial Education</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your journey to financial literacy today! Master essential money skills through our comprehensive educational platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/auth">
                Start Learning Today
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default Product;