import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen,
  Home,
  Star,
  Trophy,
  ArrowLeft,
  CheckCircle,
  Lock,
  Play,
  Clock,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const GradeModules = () => {
  const { gradeId } = useParams();
  const navigate = useNavigate();
  const grade = parseInt(gradeId || "3");
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [totalXP, setTotalXP] = useState(0);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        loadCompletedModules(user.id);
      }
    };
    getUser();
  }, [grade]);

  // Refresh progress when page becomes visible (user returns from completing modules)
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!document.hidden && user) {
        await loadCompletedModules(user.id);
      }
    };

    const handleFocus = async () => {
      if (user) {
        await loadCompletedModules(user.id);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [user]);

  const loadCompletedModules = async (userId: string) => {
    try {
      // Get all lessons for this grade
      const { data: lessons } = await supabase
        .from('lessons')
        .select('id, module_number')
        .eq('grade_level', grade);

      if (lessons) {
        // Get lesson progress for each lesson
        const lessonIds = lessons.map(l => l.id);
        const { data: progress } = await supabase
          .from('lesson_progress')
          .select('lesson_id, quiz_completed, xp_earned')
          .eq('user_id', userId)
          .in('lesson_id', lessonIds);

        if (progress) {
          // Map completed lessons to module numbers
          const completedLessons = progress.filter(p => p.quiz_completed);
          const completedModuleNumbers = completedLessons.map(p => {
            const lesson = lessons.find(l => l.id === p.lesson_id);
            return lesson?.module_number;
          }).filter(Boolean);

          setCompletedModules(completedModuleNumbers);
          
          // Calculate total XP
          const totalXpEarned = progress.reduce((sum, p) => sum + (p.xp_earned || 0), 0);
          setTotalXP(totalXpEarned);
          
          // Update localStorage for consistency
          updateLocalStorageProgress(grade, completedModuleNumbers, totalXpEarned);
        }
      }
    } catch (error) {
      console.error('Error loading module progress:', error);
      // Fallback to localStorage if database fails
      const savedProgress = localStorage.getItem('financialEducationProgress');
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        const gradeProgress = progress[grade] || { completedModules: [], totalXP: 0 };
        setCompletedModules(gradeProgress.completedModules);
        setTotalXP(gradeProgress.totalXP);
      }
    }
  };

  const updateLocalStorageProgress = (grade: number, completedModules: number[], totalXP: number) => {
    const savedProgress = localStorage.getItem('financialEducationProgress');
    let progress = savedProgress ? JSON.parse(savedProgress) : {};
    
    progress[grade] = { completedModules, totalXP };
    localStorage.setItem('financialEducationProgress', JSON.stringify(progress));
  };

  const gradeData = {
    3: {
      color: "bg-green-500",
      modules: [
        { id: 1, title: "What is Money?", topics: ["Coins and bills", "Money's purpose", "Different currencies"], duration: "20 min", xp: 50 },
        { id: 2, title: "Earning Money", topics: ["Jobs and work", "Allowances", "Helping others"], duration: "25 min", xp: 60 },
        { id: 3, title: "Needs vs Wants", topics: ["Basic needs", "Fun wants", "Making choices"], duration: "30 min", xp: 70 },
        { id: 4, title: "Spending Choices", topics: ["Smart spending", "Impulse buying", "Thinking before buying"], duration: "25 min", xp: 60 },
        { id: 5, title: "Saving Basics", topics: ["Why save?", "Piggy banks", "Saving goals"], duration: "30 min", xp: 70 },
        { id: 6, title: "Counting Money", topics: ["Adding coins", "Making change", "Money math"], duration: "35 min", xp: 80 },
        { id: 7, title: "Shopping Smart", topics: ["Comparing prices", "Shopping lists", "Good deals"], duration: "30 min", xp: 70 },
        { id: 8, title: "Money Safety", topics: ["Keeping money safe", "Not losing money", "Asking for help"], duration: "25 min", xp: 60 },
        { id: 9, title: "Sharing Money", topics: ["Helping others", "Charity", "Being generous"], duration: "30 min", xp: 70 },
        { id: 10, title: "Money Around the World", topics: ["Different countries", "Other currencies", "Money history"], duration: "35 min", xp: 80 },
        { id: 11, title: "Future Money Goals", topics: ["Dream purchases", "Long-term saving", "Planning ahead"], duration: "30 min", xp: 70 },
        { id: 12, title: "Money Review", topics: ["Review all concepts", "Final quiz", "Certificate"], duration: "40 min", xp: 100 }
      ]
    },
    4: {
      color: "bg-blue-500",
      modules: [
        { id: 1, title: "Money Review", topics: ["Reviewing basics", "Advanced counting", "Money confidence"], duration: "25 min", xp: 60 },
        { id: 2, title: "Making a Budget", topics: ["What is a budget?", "Income vs expenses", "Simple budgets"], duration: "30 min", xp: 70 },
        { id: 3, title: "Saving Strategies", topics: ["Saving methods", "Automatic saving", "Saving challenges"], duration: "35 min", xp: 80 },
        { id: 4, title: "Bank Basics", topics: ["What banks do", "Savings accounts", "Bank safety"], duration: "30 min", xp: 70 },
        { id: 5, title: "Interest Introduction", topics: ["Money growing", "Simple interest", "Compound basics"], duration: "35 min", xp: 80 },
        { id: 6, title: "Comparing Prices", topics: ["Unit prices", "Sale prices", "Best deals"], duration: "30 min", xp: 70 },
        { id: 7, title: "Goal Setting", topics: ["SMART goals", "Short vs long goals", "Tracking progress"], duration: "35 min", xp: 80 },
        { id: 8, title: "Entrepreneurship Basics", topics: ["Starting small businesses", "Lemonade stands", "Profit basics"], duration: "30 min", xp: 70 },
        { id: 9, title: "Digital Money", topics: ["Credit cards basics", "Online payments", "Digital safety"], duration: "35 min", xp: 80 },
        { id: 10, title: "Money Mistakes", topics: ["Learning from errors", "Common mistakes", "Problem solving"], duration: "30 min", xp: 70 },
        { id: 11, title: "Advanced Saving", topics: ["Multiple savings goals", "Priority saving", "Saving systems"], duration: "35 min", xp: 80 },
        { id: 12, title: "Consumer Awareness", topics: ["Advertising tricks", "Smart shopping", "Reading labels"], duration: "30 min", xp: 70 },
        { id: 13, title: "Money Ethics", topics: ["Honesty with money", "Fair dealing", "Money values"], duration: "35 min", xp: 80 },
        { id: 14, title: "Grade 4 Mastery", topics: ["Final review", "Comprehensive quiz", "Achievement badge"], duration: "45 min", xp: 120 }
      ]
    },
    5: {
      color: "bg-purple-500",
      modules: [
        { id: 1, title: "Financial Foundation Review", topics: ["Grade 4 concepts", "Advanced applications", "Real-world examples"], duration: "30 min", xp: 70 },
        { id: 2, title: "Career Exploration", topics: ["Different jobs", "Education requirements", "Salary concepts"], duration: "35 min", xp: 80 },
        { id: 3, title: "Advanced Budgeting", topics: ["Monthly budgets", "Expense categories", "Budget adjustment"], duration: "40 min", xp: 90 },
        { id: 4, title: "Banking Services", topics: ["Checking accounts", "ATMs", "Bank fees"], duration: "35 min", xp: 80 },
        { id: 5, title: "Interest and Growth", topics: ["Compound interest", "Investment basics", "Time value of money"], duration: "40 min", xp: 90 },
        { id: 6, title: "Credit Introduction", topics: ["What is credit?", "Good vs bad credit", "Credit responsibility"], duration: "35 min", xp: 80 },
        { id: 7, title: "Debt Awareness", topics: ["Types of debt", "Debt dangers", "Avoiding debt traps"], duration: "40 min", xp: 90 },
        { id: 8, title: "Investment Basics", topics: ["Stocks introduction", "Risk and reward", "Diversification"], duration: "35 min", xp: 80 },
        { id: 9, title: "Business Fundamentals", topics: ["Business models", "Revenue vs profit", "Business planning"], duration: "40 min", xp: 90 },
        { id: 10, title: "Economic Systems", topics: ["Supply and demand", "Market economy", "Economic cycles"], duration: "35 min", xp: 80 },
        { id: 11, title: "Financial Planning", topics: ["Long-term goals", "Life planning", "Emergency funds"], duration: "40 min", xp: 90 },
        { id: 12, title: "Consumer Protection", topics: ["Scam awareness", "Consumer rights", "Complaint processes"], duration: "35 min", xp: 80 },
        { id: 13, title: "Global Finance", topics: ["International trade", "Exchange rates", "Global economy"], duration: "40 min", xp: 90 },
        { id: 14, title: "Technology and Money", topics: ["Fintech", "Cryptocurrency basics", "Digital banking"], duration: "35 min", xp: 80 },
        { id: 15, title: "Money Psychology", topics: ["Spending habits", "Money emotions", "Behavioral economics"], duration: "40 min", xp: 90 },
        { id: 16, title: "Grade 5 Mastery Test", topics: ["Comprehensive review", "Final assessment", "Graduation ceremony"], duration: "50 min", xp: 150 }
      ]
    },
    6: {
      color: "bg-orange-500",
      modules: [
        { id: 1, title: "Financial Literacy Foundation", topics: ["Grade 5 review", "Advanced concepts preview", "Goal setting"], duration: "35 min", xp: 80 },
        { id: 2, title: "Advanced Career Planning", topics: ["Career paths", "Education costs", "ROI on education"], duration: "40 min", xp: 90 },
        { id: 3, title: "Complex Budgeting", topics: ["Variable income", "Percentage budgeting", "Budget optimization"], duration: "45 min", xp: 100 },
        { id: 4, title: "Banking Mastery", topics: ["Bank products", "Interest rates", "Banking strategies"], duration: "40 min", xp: 90 },
        { id: 5, title: "Credit Systems", topics: ["Credit scores", "Credit reports", "Credit building"], duration: "45 min", xp: 100 },
        { id: 6, title: "Debt Management", topics: ["Debt strategies", "Debt consolidation", "Debt payoff plans"], duration: "40 min", xp: 90 },
        { id: 7, title: "Investment Strategies", topics: ["Portfolio basics", "Asset allocation", "Risk management"], duration: "45 min", xp: 100 },
        { id: 8, title: "Entrepreneurship", topics: ["Business startup", "Funding sources", "Business growth"], duration: "40 min", xp: 90 },
        { id: 9, title: "Insurance Basics", topics: ["Types of insurance", "Risk protection", "Insurance decisions"], duration: "45 min", xp: 100 },
        { id: 10, title: "Tax Introduction", topics: ["Income taxes", "Tax brackets", "Tax planning"], duration: "40 min", xp: 90 },
        { id: 11, title: "Economic Analysis", topics: ["Market analysis", "Economic indicators", "Financial news"], duration: "45 min", xp: 100 },
        { id: 12, title: "Digital Finance", topics: ["Online banking", "Payment apps", "Cybersecurity"], duration: "40 min", xp: 90 },
        { id: 13, title: "Financial Ethics", topics: ["Ethical investing", "Social responsibility", "Fair practices"], duration: "45 min", xp: 100 },
        { id: 14, title: "Global Economics", topics: ["World markets", "International investing", "Currency exchange"], duration: "40 min", xp: 90 },
        { id: 15, title: "Future Finance", topics: ["Emerging trends", "Technology impact", "Future planning"], duration: "45 min", xp: 100 },
        { id: 16, title: "Real World Application", topics: ["Case studies", "Problem solving", "Decision making"], duration: "40 min", xp: 90 },
        { id: 17, title: "Financial Communication", topics: ["Money conversations", "Financial advice", "Teaching others"], duration: "45 min", xp: 100 },
        { id: 18, title: "Grade 6 Capstone", topics: ["Final project", "Comprehensive exam", "Certification"], duration: "60 min", xp: 180 }
      ]
    },
    7: {
      color: "bg-red-500",
      modules: [
        { id: 1, title: "Advanced Financial Review", topics: ["Grade 6 mastery check", "Complex scenarios", "Strategic thinking"], duration: "40 min", xp: 90 },
        { id: 2, title: "College Financial Planning", topics: ["College costs", "Financial aid", "Student loans"], duration: "45 min", xp: 100 },
        { id: 3, title: "Advanced Investment", topics: ["Stock analysis", "Bonds", "Mutual funds"], duration: "50 min", xp: 110 },
        { id: 4, title: "Tax Strategy", topics: ["Tax optimization", "Deductions", "Tax-advantaged accounts"], duration: "45 min", xp: 100 },
        { id: 5, title: "Insurance Strategy", topics: ["Insurance portfolio", "Risk assessment", "Cost-benefit analysis"], duration: "50 min", xp: 110 },
        { id: 6, title: "Advanced Credit", topics: ["Credit optimization", "Credit products", "Credit repair"], duration: "45 min", xp: 100 },
        { id: 7, title: "Business Finance", topics: ["Business loans", "Cash flow", "Financial statements"], duration: "50 min", xp: 110 },
        { id: 8, title: "Real Estate Basics", topics: ["Property investment", "Mortgages", "Real estate markets"], duration: "45 min", xp: 100 },
        { id: 9, title: "Retirement Planning", topics: ["401k basics", "Retirement accounts", "Long-term planning"], duration: "50 min", xp: 110 },
        { id: 10, title: "Economic Policy", topics: ["Government finance", "Monetary policy", "Fiscal policy"], duration: "45 min", xp: 100 },
        { id: 11, title: "International Finance", topics: ["Global investing", "Foreign exchange", "International trade"], duration: "50 min", xp: 110 },
        { id: 12, title: "Financial Technology", topics: ["Robo-advisors", "AI in finance", "Blockchain basics"], duration: "45 min", xp: 100 },
        { id: 13, title: "Behavioral Finance", topics: ["Investment psychology", "Bias recognition", "Decision frameworks"], duration: "50 min", xp: 110 },
        { id: 14, title: "Risk Management", topics: ["Portfolio risk", "Hedging strategies", "Risk models"], duration: "45 min", xp: 100 },
        { id: 15, title: "Financial Planning Process", topics: ["Comprehensive planning", "Goal prioritization", "Strategy implementation"], duration: "50 min", xp: 110 },
        { id: 16, title: "Advanced Economics", topics: ["Macroeconomics", "Market efficiency", "Economic forecasting"], duration: "45 min", xp: 100 },
        { id: 17, title: "Ethical Finance", topics: ["ESG investing", "Corporate responsibility", "Sustainable finance"], duration: "50 min", xp: 110 },
        { id: 18, title: "Financial Communication", topics: ["Professional presentations", "Financial writing", "Advisory skills"], duration: "45 min", xp: 100 },
        { id: 19, title: "Case Study Analysis", topics: ["Real-world scenarios", "Problem solving", "Strategic solutions"], duration: "50 min", xp: 110 },
        { id: 20, title: "Grade 7 Mastery Portfolio", topics: ["Capstone project", "Portfolio presentation", "Peer review"], duration: "70 min", xp: 200 }
      ]
    },
    8: {
      color: "bg-indigo-500",
      modules: [
        { id: 1, title: "Financial Mastery Foundation", topics: ["Advanced review", "Professional concepts", "Leadership preparation"], duration: "45 min", xp: 100 },
        { id: 2, title: "Advanced Portfolio Management", topics: ["Modern portfolio theory", "Asset allocation models", "Performance measurement"], duration: "50 min", xp: 110 },
        { id: 3, title: "Financial Markets", topics: ["Market structure", "Trading mechanisms", "Market efficiency"], duration: "55 min", xp: 120 },
        { id: 4, title: "Corporate Finance", topics: ["Capital structure", "Valuation methods", "Financial analysis"], duration: "50 min", xp: 110 },
        { id: 5, title: "Advanced Tax Planning", topics: ["Tax strategies", "Estate planning", "Tax-efficient investing"], duration: "55 min", xp: 120 },
        { id: 6, title: "Alternative Investments", topics: ["REITs", "Commodities", "Private equity basics"], duration: "50 min", xp: 110 },
        { id: 7, title: "Financial Derivatives", topics: ["Options basics", "Futures contracts", "Risk hedging"], duration: "55 min", xp: 120 },
        { id: 8, title: "International Finance", topics: ["Currency markets", "Global portfolios", "Political risk"], duration: "50 min", xp: 110 },
        { id: 9, title: "Advanced Real Estate", topics: ["Investment analysis", "REIT investing", "Real estate finance"], duration: "55 min", xp: 120 },
        { id: 10, title: "Retirement Strategies", topics: ["Advanced planning", "Distribution strategies", "Legacy planning"], duration: "50 min", xp: 110 },
        { id: 11, title: "Financial Technology Innovation", topics: ["Fintech disruption", "Digital currencies", "Algorithmic investing"], duration: "55 min", xp: 120 },
        { id: 12, title: "Quantitative Finance", topics: ["Financial modeling", "Statistical analysis", "Risk metrics"], duration: "50 min", xp: 110 },
        { id: 13, title: "Behavioral Economics", topics: ["Market psychology", "Cognitive biases", "Behavioral finance theory"], duration: "55 min", xp: 120 },
        { id: 14, title: "Regulatory Environment", topics: ["Financial regulations", "Compliance", "Regulatory impact"], duration: "50 min", xp: 110 },
        { id: 15, title: "Advanced Economic Theory", topics: ["Economic models", "Policy analysis", "Economic forecasting"], duration: "55 min", xp: 120 },
        { id: 16, title: "Financial Innovation", topics: ["New financial products", "Innovation trends", "Future of finance"], duration: "50 min", xp: 110 },
        { id: 17, title: "Professional Ethics", topics: ["Fiduciary responsibility", "Professional standards", "Ethical dilemmas"], duration: "55 min", xp: 120 },
        { id: 18, title: "Financial Leadership", topics: ["Team management", "Strategic planning", "Change management"], duration: "50 min", xp: 110 },
        { id: 19, title: "Industry Analysis", topics: ["Sector analysis", "Competitive analysis", "Industry trends"], duration: "55 min", xp: 120 },
        { id: 20, title: "Capstone Consulting Project", topics: ["Client consultation", "Financial planning", "Professional presentation"], duration: "60 min", xp: 150 },
        { id: 21, title: "Peer Teaching Workshop", topics: ["Teaching skills", "Curriculum design", "Knowledge transfer"], duration: "55 min", xp: 120 },
        { id: 22, title: "Master's Certification", topics: ["Final comprehensive exam", "Certification ceremony", "Alumni network"], duration: "90 min", xp: 250 }
      ]
    }
  };

  const currentGrade = gradeData[grade as keyof typeof gradeData];
  
  const modulesWithStatus = currentGrade.modules.map(module => {
    const isCompleted = completedModules.includes(module.id);
    const isNextUnlocked = completedModules.length + 1 === module.id;
    const isUnlocked = module.id === 1 || completedModules.includes(module.id - 1) || isNextUnlocked;
    
    return {
      ...module,
      isCompleted,
      isUnlocked
    };
  });

  const startModule = (moduleId: number) => {
    navigate(`/education/grade/${grade}/module/${moduleId}`);
  };

  const goBack = () => {
    navigate('/game-start');
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" onClick={goBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              All Grades
            </Button>
            <Badge variant="outline">Grade {grade}</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Grade {grade}
            </span>
          </h1>
          <div className="flex gap-4 mt-4">
            <Button variant="outline" asChild>
              <Link to={`/curriculum/${grade}`}>View Curriculum</Link>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Modules List */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Learning Modules</h2>
              <p className="text-muted-foreground">
                Complete modules in order to unlock the next lesson
              </p>
            </div>

            <div className="grid gap-4">
              {modulesWithStatus.map((module) => (
                <Card
                  key={module.id}
                  className={`transition-all duration-300 ${
                    module.isUnlocked 
                      ? 'hover:shadow-lg cursor-pointer border-l-4 border-l-primary' 
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => module.isUnlocked && startModule(module.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          module.isCompleted
                            ? 'bg-green-500 text-white'
                            : module.isUnlocked
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-gray-300 text-gray-500'
                        }`}>
                          {module.isCompleted ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : module.isUnlocked ? (
                            <BookOpen className="h-5 w-5" />
                          ) : (
                            <Lock className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">Module {module.id}: {module.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {module.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Trophy className="h-3 w-3" />
                              {module.xp} XP
                            </div>
                          </div>
                        </div>
                      </div>
                      {module.isUnlocked && (
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          <Play className="h-4 w-4 mr-2" />
                          {module.isCompleted ? 'Completed' : 'Start'}
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Topics Covered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {module.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Progress Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white mx-auto mb-4 ${currentGrade.color}`}>
                    <span className="text-2xl font-bold">{Math.round((completedModules.length / currentGrade.modules.length) * 100)}%</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    Grade {grade} Progress
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{totalXP}</div>
                    <div className="text-xs text-muted-foreground">Total XP Earned</div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Completion</span>
                      <span className="text-xs text-muted-foreground">
                        {completedModules.length}/{currentGrade.modules.length}
                      </span>
                    </div>
                    <Progress 
                      value={(completedModules.length / currentGrade.modules.length) * 100} 
                      className="h-3" 
                    />
                  </div>

                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Trophy className="h-4 w-4" />
                      Your Badges
                    </h4>
                    <div className="text-center py-4">
                      <div className="text-muted-foreground text-sm">
                        {completedModules.length > 0 ? "Badges will appear here as you earn them!" : "Complete modules to start earning badges!"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Next Steps</h4>
                  <p className="text-sm text-muted-foreground">
                    {completedModules.length === 0 
                      ? "Start with Module 1 to begin your financial education journey!"
                      : completedModules.length === currentGrade.modules.length
                      ? "Congratulations! You've completed all modules. Ready for the next grade?"
                      : `Continue with Module ${completedModules.length + 1} to keep learning!`
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeModules;