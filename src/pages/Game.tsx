import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Coins, 
  Trophy, 
  Home,
  Heart,
  Star,
  CheckCircle,
  XCircle,
  Hammer,
  Zap,
  Target,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Game = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const currentModule = parseInt(moduleId || "1");

  const [gameState, setGameState] = useState({
    coins: 0,
    score: 0,
    level: 1,
    lives: 3,
    currentTask: 0,
    villageProgress: 0,
    correctAnswers: 0,
    totalQuestions: 0
  });

  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const moduleInfo = {
    1: {
      title: "Village Rebuild: Money Basics",
      description: "Help rebuild the village by completing tasks and learning about money! 🏘️",
      emoji: "🏘️"
    },
    2: {
      title: "Lemonade Stand: Saving & Budgeting",
      description: "Run your lemonade stand and learn to save and budget! 🍋",
      emoji: "🍋"
    },
    3: {
      title: "Bank Explorer: Interest & Accounts",
      description: "Discover how banks work and make your money grow! 🏦",
      emoji: "🏦"
    },
    4: {
      title: "Shop Owner: Credit & Debt",
      description: "Manage your shop and learn about borrowing responsibly! 🏪",
      emoji: "🏪"
    },
    5: {
      title: "Smart Shopper: Spending Wisely",
      description: "Plan a school fundraiser and shop for supplies within budget! 🛒",
      emoji: "🛒"
    },
    6: {
      title: "Career Explorer: Earning & Jobs",
      description: "Try different career paths and learn about jobs vs careers! 💼",
      emoji: "💼"
    },
    7: {
      title: "Digital Detective: Online Safety",
      description: "Navigate the digital world safely and avoid online scams! 🔒",
      emoji: "🔒"
    },
    8: {
      title: "Family Planner: Smart Decisions",
      description: "Help plan a family vacation and make wise financial choices! ✈️",
      emoji: "✈️"
    }
  };

  const currentModuleInfo = moduleInfo[currentModule as keyof typeof moduleInfo] || moduleInfo[1];

  // Village building tasks that earn coins
  const tasks = [
    { id: 1, name: "Clean the Village Square", coins: 10, completed: false },
    { id: 2, name: "Help Build Houses", coins: 15, completed: false },
    { id: 3, name: "Plant Flowers in Garden", coins: 8, completed: false },
    { id: 4, name: "Repair the Bridge", coins: 20, completed: false },
    { id: 5, name: "Organize Village Market", coins: 12, completed: false }
  ];

  // Needs vs Wants questions
  const questions = [
    {
      id: 1,
      question: "Sarah wants to buy something. Help her decide if it's a NEED or a WANT:",
      item: "A warm winter coat",
      image: "🧥",
      correctAnswer: "need",
      explanation: "A warm coat is a NEED because it protects you from cold weather and keeps you healthy!"
    },
    {
      id: 2,
      question: "Tommy is at the store. Is this a NEED or a WANT?",
      item: "A video game",
      image: "🎮",
      correctAnswer: "want",
      explanation: "A video game is a WANT because it's fun but not necessary for survival."
    },
    {
      id: 3,
      question: "Emma is shopping with her mom. Is this a NEED or a WANT?",
      item: "Fresh vegetables for dinner",
      image: "🥕",
      correctAnswer: "need",
      explanation: "Fresh vegetables are a NEED because our bodies need healthy food to grow strong!"
    },
    {
      id: 4,
      question: "Alex wants to buy something special. Is this a NEED or a WANT?",
      item: "A fancy toy robot",
      image: "🤖",
      correctAnswer: "want",
      explanation: "A toy robot is a WANT because it's fun to play with but not necessary."
    },
    {
      id: 5,
      question: "Maria is getting ready for school. Is this a NEED or a WANT?",
      item: "School shoes",
      image: "👟",
      correctAnswer: "need",
      explanation: "School shoes are a NEED because you need proper shoes to walk safely and follow school rules!"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const completeTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && !completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
      setGameState(prev => ({
        ...prev,
        coins: prev.coins + task.coins,
        villageProgress: Math.min(prev.villageProgress + 20, 100)
      }));
      toast.success(`Task completed! +${task.coins} coins earned!`);
      
      // Start a question after completing a task
      setTimeout(() => setShowQuestion(true), 1000);
    }
  };

  const answerQuestion = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    setGameState(prev => ({
      ...prev,
      totalQuestions: prev.totalQuestions + 1,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      coins: isCorrect ? prev.coins + 5 : prev.coins,
      score: isCorrect ? prev.score + 10 : prev.score,
      lives: isCorrect ? prev.lives : Math.max(prev.lives - 1, 0)
    }));

    if (isCorrect) {
      toast.success("Correct! +5 coins & +10 points!");
    } else {
      toast.error("Not quite right. Try to remember for next time!");
    }

    // Move to next question after 3 seconds
    setTimeout(() => {
      const nextQuestionIndex = (questions.findIndex(q => q.id === currentQuestion.id) + 1) % questions.length;
      setCurrentQuestion(questions[nextQuestionIndex]);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowQuestion(false);
    }, 3000);
  };

  // Check if module is completed
  useEffect(() => {
    if (gameState.villageProgress === 100 && !gameCompleted) {
      setGameCompleted(true);
      toast.success("Module completed! Ready for the next challenge!");
    }
  }, [gameState.villageProgress, gameCompleted]);

  const nextModule = () => {
    if (currentModule < 8) {
      navigate(`/game/module/${currentModule + 1}`);
    }
  };

  const goBackToModules = () => {
    navigate('/game');
  };

  const resetGame = () => {
    setGameState({
      coins: 0,
      score: 0,
      level: 1,
      lives: 3,
      currentTask: 0,
      villageProgress: 0,
      correctAnswers: 0,
      totalQuestions: 0
    });
    setCompletedTasks([]);
    setShowQuestion(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameCompleted(false);
    toast.success("Game reset! Start earning coins by helping the village!");
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" onClick={goBackToModules}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              All Modules
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <Badge variant="outline">Module {currentModule}</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {currentModuleInfo.title}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            {currentModuleInfo.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Game Stats Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gradient-subtle rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-xl font-bold text-warning">
                      <Coins className="h-5 w-5" />
                      {gameState.coins}
                    </div>
                    <p className="text-xs text-muted-foreground">Coins Earned</p>
                  </div>
                  <div className="text-center p-3 bg-gradient-subtle rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-xl font-bold text-primary">
                      <Star className="h-5 w-5" />
                      {gameState.score}
                    </div>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                </div>

                <div className="flex justify-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Heart 
                      key={i} 
                      className={`h-6 w-6 ${
                        i < gameState.lives ? 'text-red-500 fill-current' : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Village Progress</span>
                    <span className="text-xs text-muted-foreground">{gameState.villageProgress}%</span>
                  </div>
                  <Progress value={gameState.villageProgress} className="h-3" />
                </div>

                {gameState.totalQuestions > 0 && (
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="text-lg font-bold text-primary">
                      {gameState.correctAnswers}/{gameState.totalQuestions}
                    </div>
                    <p className="text-xs text-muted-foreground">Questions Correct</p>
                  </div>
                )}

                <Button onClick={resetGame} variant="outline" className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  New Game
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Game Area */}
          <div className="lg:col-span-2">
            {/* Question Modal */}
            {showQuestion && (
              <Card className="mb-6 border-primary/50 shadow-glow animate-scale-in">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">💭 Money Decision Time!</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-6xl mb-4">{currentQuestion.image}</div>
                  <p className="text-lg">{currentQuestion.question}</p>
                  <div className="text-xl font-bold text-primary">"{currentQuestion.item}"</div>
                  
                  {!showResult ? (
                    <div className="flex gap-4 justify-center">
                      <Button
                        size="lg"
                        variant="hero"
                        onClick={() => answerQuestion("need")}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Target className="h-5 w-5 mr-2" />
                        NEED
                      </Button>
                      <Button
                        size="lg"
                        variant="hero"
                        onClick={() => answerQuestion("want")}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Star className="h-5 w-5 mr-2" />
                        WANT
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-2">
                        {selectedAnswer === currentQuestion.correctAnswer ? (
                          <CheckCircle className="h-8 w-8 text-green-500" />
                        ) : (
                          <XCircle className="h-8 w-8 text-red-500" />
                        )}
                        <span className="text-xl font-bold">
                          {selectedAnswer === currentQuestion.correctAnswer ? "Correct!" : "Not quite!"}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{currentQuestion.explanation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Village Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hammer className="h-5 w-5 text-primary" />
                  Village Tasks - Earn Coins!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border transition-all ${
                        completedTasks.includes(task.id)
                          ? 'bg-green-50 border-green-200'
                          : 'bg-card border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {completedTasks.includes(task.id) ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : (
                            <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
                          )}
                          <div>
                            <h3 className="font-medium">{task.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-warning">
                              <Coins className="h-3 w-3" />
                              {task.coins} coins
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => completeTask(task.id)}
                          disabled={completedTasks.includes(task.id)}
                          variant={completedTasks.includes(task.id) ? "outline" : "gaming"}
                          size="sm"
                        >
                          {completedTasks.includes(task.id) ? "Completed!" : "Start Task"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {gameState.villageProgress === 100 && (
                  <div className="mt-6 text-center p-6 bg-gradient-primary/10 rounded-lg">
                    <Trophy className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">🎉 Module {currentModule} Complete!</h3>
                    <p className="text-muted-foreground mb-4">
                      Congratulations! You've mastered {currentModuleInfo.title.split(':')[1]}!
                    </p>
                    <div className="flex justify-center gap-4">
                      <Badge variant="outline" className="text-lg p-2">
                        Module {currentModule} Master! 🏆
                      </Badge>
                    </div>
                    <div className="mt-4 flex justify-center gap-3">
                      <Button onClick={goBackToModules} variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        All Modules
                      </Button>
                      {currentModule < 8 && (
                        <Button onClick={nextModule} variant="hero">
                          Next Module
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Learning Summary */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>💡 What You're Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">Earning Money</h4>
                    <p className="text-sm text-blue-700">
                      Complete tasks and chores to earn coins. In real life, people work jobs to earn money!
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">Needs vs Wants</h4>
                    <p className="text-sm text-green-700">
                      Needs are things you must have to live safely. Wants are nice to have but not necessary.
                    </p>
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

export default Game;