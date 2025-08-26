import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play,
  Home,
  Star,
  Trophy,
  Users,
  BookOpen,
  Target,
  Coins,
  Lock,
  CheckCircle,
  Clock
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const GameStart = () => {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState(1);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [totalXP, setTotalXP] = useState(0);

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('cashClimbProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedModules(progress.completedModules || []);
      setTotalXP(progress.totalXP || 0);
    }
  }, []);

  // Generate modules with dynamic unlock/completion status
  const modules = [
    {
      id: 1,
      title: "Money Basics",
      subtitle: "What is money and how do we earn it?",
      targetGrades: "3-4",
      description: "Help villagers rebuild their town while learning about earning money and the difference between needs and wants.",
      topics: ["What is money?", "Earning money through work", "Needs vs. wants"],
      gameScenario: "Village Rebuild Adventure",
      estimatedTime: "15-20 minutes",
      xpReward: 100,
      badge: "Village Helper"
    },
    {
      id: 2,
      title: "Saving & Budgeting",
      subtitle: "Planning for your financial future",
      targetGrades: "4-5",
      description: "Run a lemonade stand and learn to budget your earnings for ingredients, savings, and that new bike you want!",
      topics: ["Why save money?", "Short vs. long-term goals", "Creating budgets"],
      gameScenario: "Lemonade Stand Business",
      estimatedTime: "20-25 minutes",
      xpReward: 150,
      badge: "Smart Saver"
    },
    {
      id: 3,
      title: "Banks & Interest",
      subtitle: "Making your money grow",
      targetGrades: "5-6",
      description: "Discover how banks work and watch your money grow with interest. Choose between jars and bank accounts!",
      topics: ["What banks do", "Earning interest", "Types of accounts"],
      gameScenario: "Bank Explorer Quest",
      estimatedTime: "20-25 minutes",
      xpReward: 200,
      badge: "Bank Explorer"
    },
    {
      id: 4,
      title: "Credit & Debt",
      subtitle: "Borrowing money responsibly",
      targetGrades: "6-7",
      description: "Manage a shop where you'll learn about borrowing money, paying it back on time, and building good credit.",
      topics: ["What is credit?", "Borrowing responsibly", "Credit scores"],
      gameScenario: "Shop Owner Challenge",
      estimatedTime: "25-30 minutes",
      xpReward: 250,
      badge: "Credit Master"
    },
    {
      id: 5,
      title: "Spending Wisely",
      subtitle: "Making smart purchase decisions",
      targetGrades: "6-8",
      description: "Plan a school fundraiser and shop for supplies within budget while learning about comparison shopping and avoiding impulse buys.",
      topics: ["Comparison shopping", "Unit prices & discounts", "Impulse vs. planned spending"],
      gameScenario: "School Fundraiser Planner",
      estimatedTime: "25-30 minutes",
      xpReward: 300,
      badge: "Smart Shopper"
    },
    {
      id: 6,
      title: "Earning & Careers",
      subtitle: "Exploring the world of work",
      targetGrades: "6-8",
      description: "Try out different career paths and learn about jobs vs careers, hourly wages vs salaries, and how paychecks work.",
      topics: ["Jobs vs. careers", "Hourly wage vs. salary", "Paychecks and taxes"],
      gameScenario: "Career Exploration Quest",
      estimatedTime: "30-35 minutes",
      xpReward: 350,
      badge: "Career Explorer"
    },
    {
      id: 7,
      title: "Digital Money & Scams",
      subtitle: "Staying safe in the digital world",
      targetGrades: "7-8",
      description: "Navigate online payments and digital wallets while learning to spot and avoid scams and phishing attempts.",
      topics: ["Online payments & apps", "Digital wallets", "Spotting scams & phishing"],
      gameScenario: "Digital Detective Mission",
      estimatedTime: "30-35 minutes",
      xpReward: 400,
      badge: "Digital Detective"
    },
    {
      id: 8,
      title: "Financial Decision-Making",
      subtitle: "Making smart long-term choices",
      targetGrades: "7-8", 
      description: "Help plan a family vacation and learn about opportunity cost, risk vs reward, and making smart long-term financial decisions.",
      topics: ["Opportunity cost", "Risk vs. reward", "Smart long-term choices"],
      gameScenario: "Family Vacation Planner",
      estimatedTime: "35-40 minutes",
      xpReward: 500,
      badge: "Decision Master"
    }
  ].map(module => ({
    ...module,
    isCompleted: completedModules.includes(module.id),
    isUnlocked: module.id === 1 || completedModules.includes(module.id - 1)
  }));

  const startGame = () => {
    navigate(`/game/module/${selectedModule}`);
  };

  const selectModule = (moduleId: number) => {
    const module = modules.find(m => m.id === moduleId);
    console.log('Clicking module:', moduleId, 'Module data:', module);
    if (module && module.isUnlocked) {
      setSelectedModule(moduleId);
      console.log('Module selected:', moduleId);
    } else {
      console.log('Module not unlocked or not found');
    }
  };

  const selectedModuleData = modules.find(m => m.id === selectedModule);

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Cash Climb Academy
              </span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Master financial literacy through fun, interactive games and challenges! 🎯
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Module Selection */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Choose Your Learning Module</h2>
              <p className="text-muted-foreground">
                Progress through each module to unlock the next adventure!
              </p>
            </div>

            <div className="grid gap-4 mb-8">
              {modules.map((module) => (
                <Card
                  key={module.id}
                  className={`cursor-pointer transition-all duration-300 border-2 ${
                    selectedModule === module.id
                      ? 'border-primary shadow-lg bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
                  } ${
                    !module.isUnlocked ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                  onClick={() => {
                    console.log('Card clicked for module:', module.id);
                    selectModule(module.id);
                  }}
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
                          <h3 className="text-xl font-bold">Module {module.id}: {module.title}</h3>
                          <p className="text-muted-foreground">{module.subtitle}</p>
                        </div>
                      </div>
                      <Badge variant="outline">Grades {module.targetGrades}</Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">What You'll Learn:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {module.topics.map((topic, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Star className="h-3 w-3 text-primary" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Game Details:</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-2">
                            <Target className="h-3 w-3" />
                            {module.gameScenario}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            {module.estimatedTime}
                          </div>
                          <div className="flex items-center gap-2">
                            <Trophy className="h-3 w-3" />
                            {module.xpReward} XP + {module.badge} badge
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mt-4">
                      {module.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Game Start Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-primary" />
                  Ready to Start?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedModuleData && (
                  <>
                    <div className="text-center">
                      <div className="text-6xl mb-4">
                        {selectedModuleData.id === 1 ? "🏘️" : 
                         selectedModuleData.id === 2 ? "🍋" :
                         selectedModuleData.id === 3 ? "🏦" : 
                         selectedModuleData.id === 4 ? "🏪" :
                         selectedModuleData.id === 5 ? "🛒" :
                         selectedModuleData.id === 6 ? "💼" :
                         selectedModuleData.id === 7 ? "🔒" : "✈️"}
                      </div>
                      <h3 className="text-lg font-bold mb-2">
                        {selectedModuleData.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedModuleData.gameScenario}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Estimated Time:</span>
                        <Badge variant="outline">{selectedModuleData.estimatedTime}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">XP Reward:</span>
                        <div className="flex items-center gap-1 text-primary">
                          <Trophy className="h-3 w-3" />
                          {selectedModuleData.xpReward}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Badge:</span>
                        <Badge variant="outline">{selectedModuleData.badge}</Badge>
                      </div>
                    </div>

                    <Button
                      onClick={startGame}
                      disabled={!selectedModuleData.isUnlocked}
                      className="w-full"
                      size="lg"
                    >
                      {selectedModuleData.isUnlocked ? (
                        <>
                          <Play className="h-5 w-5 mr-2" />
                          Start Module {selectedModuleData.id}
                        </>
                      ) : (
                        <>
                          <Lock className="h-5 w-5 mr-2" />
                          Complete Previous Module
                        </>
                      )}
                    </Button>

                    {!selectedModuleData.isUnlocked && (
                      <p className="text-xs text-center text-muted-foreground">
                        Complete the previous modules to unlock this adventure!
                      </p>
                    )}
                  </>
                )}

                {/* Player Progress Summary */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Your Progress</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Modules Completed:</span>
                      <span className="text-sm font-bold">
                        {completedModules.length}/{modules.length}
                      </span>
                    </div>
                    <Progress 
                      value={(completedModules.length / modules.length) * 100} 
                      className="h-2"
                    />
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-primary">
                        <Coins className="h-4 w-4" />
                        <span className="font-bold">{totalXP} Total XP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStart;