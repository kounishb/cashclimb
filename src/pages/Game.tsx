import { useState } from "react";
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
  Zap,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import ModuleOne from "@/components/game/ModuleOne";
import ModuleTwo from "@/components/game/ModuleTwo";

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
    businessProgress: 0,
    budgetingProgress: 0,
    goalProgress: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    achievements: [],
    experience: 0,
    badges: [],
    skillPoints: 0
  });

  const [gameCompleted, setGameCompleted] = useState(false);

  const moduleInfo = {
    1: {
      title: "Base Camp Setup",
      description: "Begin your epic climb! Learn money basics at the mountain base! ⛰️",
      emoji: "⛰️"
    },
    2: {
      title: "Supply Station", 
      description: "Manage resources and savings at the mountain supply station! 🏕️",
      emoji: "🏕️"
    },
    3: {
      title: "High Altitude Camp",
      description: "Budget for gear and plan your route to the summit! 🏔️", 
      emoji: "🏔️"
    },
    4: {
      title: "Danger Zone",
      description: "Navigate credit and debt challenges on the cliff face! 🧗",
      emoji: "🧗"
    },
    5: {
      title: "Summit Victory",
      description: "Reach the peak and master spending wisely! 🏆",
      emoji: "🏆"
    }
  };

  const currentModuleInfo = moduleInfo[currentModule as keyof typeof moduleInfo] || moduleInfo[1];

  const onModuleComplete = () => {
    setGameCompleted(true);
    
    // Save completion to localStorage
    const savedProgress = localStorage.getItem('cashClimbProgress');
    const progress = savedProgress ? JSON.parse(savedProgress) : { completedModules: [], totalXP: 0 };
    
    if (!progress.completedModules.includes(currentModule)) {
      const moduleXP = [100, 150, 200, 250, 300][currentModule - 1] || 100;
      progress.completedModules.push(currentModule);
      progress.totalXP += moduleXP;
      localStorage.setItem('cashClimbProgress', JSON.stringify(progress));
    }
    
    toast.success("Module completed! Ready for the next challenge!");
  };

  const nextModule = () => {
    if (currentModule < 5) {
      navigate(`/game/module/${currentModule + 1}`);
    }
  };

  const goBackToModules = () => {
    navigate('/game-start');
  };

  const resetGame = () => {
    setGameState({
      coins: 0,
      score: 0,
      level: 1, 
      lives: 3,
      currentTask: 0,
      villageProgress: 0,
      businessProgress: 0,
      budgetingProgress: 0,
      goalProgress: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      achievements: [],
      experience: 0,
      badges: [],
      skillPoints: 0
    });
    setGameCompleted(false);
    toast.success("Game reset! Start your climb adventure!");
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
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-xs text-muted-foreground">
                      {Math.max(gameState.villageProgress, gameState.businessProgress, gameState.budgetingProgress)}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.max(gameState.villageProgress, gameState.businessProgress, gameState.budgetingProgress)} 
                    className="h-3" 
                  />
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
            {/* Module Content */}
            {currentModule === 1 && (
              <ModuleOne 
                gameState={gameState} 
                setGameState={setGameState}
                onModuleComplete={onModuleComplete}
              />
            )}
            
            {currentModule === 2 && (
              <ModuleTwo 
                gameState={gameState} 
                setGameState={setGameState}
                onModuleComplete={onModuleComplete}
              />
            )}

            {currentModule >= 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Coming Soon!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Module {currentModule} is currently under development. 
                    Check back soon for more financial learning adventures!
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Module Completion */}
            {gameCompleted && (
              <Card className="mt-6 border-primary/50 shadow-glow">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-16 w-16 mx-auto mb-4 text-primary" />
                  <h3 className="text-2xl font-bold mb-2">🎉 Module {currentModule} Complete!</h3>
                  <p className="text-muted-foreground mb-4">
                    Congratulations! You've mastered {currentModuleInfo.title}!
                  </p>
                  <div className="flex justify-center gap-4 mb-4">
                    <Badge variant="outline" className="text-lg p-2">
                      Module {currentModule} Master! 🏆
                    </Badge>
                  </div>
                  <div className="flex justify-center gap-3">
                    <Button onClick={goBackToModules} variant="outline">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      All Modules
                    </Button>
                    {currentModule < 5 && (
                      <Button onClick={nextModule} variant="hero">
                        Next Module
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;