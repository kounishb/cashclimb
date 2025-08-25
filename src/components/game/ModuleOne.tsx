import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Coins, 
  Trophy, 
  Heart,
  Star,
  CheckCircle,
  XCircle,
  Hammer,
  Target,
  Home,
  DollarSign
} from "lucide-react";
import { toast } from "sonner";

interface ModuleOneProps {
  gameState: any;
  setGameState: (state: any) => void;
  onModuleComplete: () => void;
}

const ModuleOne = ({ gameState, setGameState, onModuleComplete }: ModuleOneProps) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [showEarningActivity, setShowEarningActivity] = useState(false);
  const [jobsCompleted, setJobsCompleted] = useState<number[]>([]);

  // Village building tasks that teach earning money
  const tasks = [
    { 
      id: 1, 
      name: "Clean the Village Square", 
      coins: 10, 
      description: "Help sweep and organize the town center",
      timeMinutes: 30
    },
    { 
      id: 2, 
      name: "Help Build Houses", 
      coins: 25, 
      description: "Assist builders by carrying materials",
      timeMinutes: 60
    },
    { 
      id: 3, 
      name: "Plant Flowers in Garden", 
      coins: 15, 
      description: "Make the village beautiful with flowers",
      timeMinutes: 45
    },
    { 
      id: 4, 
      name: "Deliver Mail", 
      coins: 20, 
      description: "Help the postman deliver letters around town",
      timeMinutes: 40
    },
    { 
      id: 5, 
      name: "Organize Village Market", 
      coins: 30, 
      description: "Set up stalls and help vendors get ready",
      timeMinutes: 90
    }
  ];

  // Needs vs Wants questions
  const questions = [
    {
      id: 1,
      question: "Emma's family is at the grocery store. Help them decide if this is a NEED or a WANT:",
      item: "Fresh vegetables for dinner",
      image: "🥕",
      correctAnswer: "need",
      explanation: "Fresh vegetables are a NEED because our bodies need healthy food to grow strong and stay healthy!"
    },
    {
      id: 2,
      question: "Tommy sees something cool at the toy store. Is this a NEED or a WANT?",
      item: "A new video game",
      image: "🎮",
      correctAnswer: "want",
      explanation: "A video game is a WANT because it's fun to play with but not necessary for survival."
    },
    {
      id: 3,
      question: "Winter is coming and Sarah needs to stay warm. Is this a NEED or a WANT?",
      item: "A warm winter coat",
      image: "🧥",
      correctAnswer: "need",
      explanation: "A warm coat is a NEED because it protects you from cold weather and keeps you healthy!"
    },
    {
      id: 4,
      question: "Alex is at the store with his mom. Is this a NEED or a WANT?",
      item: "Brand new designer sneakers",
      image: "👟",
      correctAnswer: "want",
      explanation: "Designer sneakers are a WANT. Regular shoes for protection are a need, but expensive designer ones are wants!"
    },
    {
      id: 5,
      question: "Maria's family is planning meals for the week. Is this a NEED or a WANT?",
      item: "Clean drinking water",
      image: "💧",
      correctAnswer: "need",
      explanation: "Clean water is definitely a NEED! Our bodies need water every day to survive and be healthy."
    },
    {
      id: 6,
      question: "Jake wants to buy something at the candy store. Is this a NEED or a WANT?",
      item: "A big bag of candy",
      image: "🍭",
      correctAnswer: "want",
      explanation: "Candy is a WANT because it tastes good but isn't necessary for our health or survival."
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const completeTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && !completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
      setGameState((prev: any) => ({
        ...prev,
        coins: prev.coins + task.coins,
        villageProgress: Math.min(prev.villageProgress + 20, 100)
      }));
      toast.success(`Great job! You earned ${task.coins} coins for ${task.timeMinutes} minutes of work!`);
      
      // Start a question after completing a task
      setTimeout(() => {
        setShowQuestion(true);
      }, 1500);
    }
  };

  const answerQuestion = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    setGameState((prev: any) => ({
      ...prev,
      totalQuestions: prev.totalQuestions + 1,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      coins: isCorrect ? prev.coins + 5 : prev.coins,
      score: isCorrect ? prev.score + 10 : prev.score,
      lives: isCorrect ? prev.lives : Math.max(prev.lives - 1, 0)
    }));

    if (isCorrect) {
      toast.success("Excellent! +5 coins & +10 points!");
    } else {
      toast.error("Not quite right, but that's how we learn!");
    }

    // Move to next question after 3 seconds
    setTimeout(() => {
      const nextIndex = (currentQuestionIndex + 1) % questions.length;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowQuestion(false);
    }, 3000);
  };

  // Check if module is completed
  useEffect(() => {
    if (gameState.villageProgress >= 100 && completedTasks.length >= 5) {
      onModuleComplete();
    }
  }, [gameState.villageProgress, completedTasks.length, onModuleComplete]);

  return (
    <div className="space-y-6">
      {/* Learning Objective */}
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Module 1 Goals: Money Basics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className={`h-4 w-4 ${gameState.totalQuestions >= 3 ? 'text-green-500' : 'text-gray-400'}`} />
              <span>Learn needs vs wants</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className={`h-4 w-4 ${completedTasks.length >= 3 ? 'text-green-500' : 'text-gray-400'}`} />
              <span>Understand earning money</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className={`h-4 w-4 ${gameState.coins >= 50 ? 'text-green-500' : 'text-gray-400'}`} />
              <span>Earn 50+ coins</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Modal */}
      {showQuestion && (
        <Card className="border-primary/50 shadow-glow animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">💭 Money Decision Time!</CardTitle>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-6xl mb-4">{currentQuestion.image}</div>
            <p className="text-lg">{currentQuestion.question}</p>
            <div className="text-xl font-bold text-primary bg-primary/10 p-3 rounded-lg">
              "{currentQuestion.item}"
            </div>
            
            {!showResult ? (
              <div className="flex gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => answerQuestion("need")}
                  className="bg-green-500 hover:bg-green-600 text-white px-8"
                >
                  <Target className="h-5 w-5 mr-2" />
                  NEED
                  <span className="text-xs block">Must have to live</span>
                </Button>
                <Button
                  size="lg"
                  onClick={() => answerQuestion("want")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8"
                >
                  <Star className="h-5 w-5 mr-2" />
                  WANT
                  <span className="text-xs block">Nice to have</span>
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
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-muted-foreground">{currentQuestion.explanation}</p>
                </div>
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
            Village Jobs - Earn Money by Working!
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Complete tasks to earn coins and learn how work = money! 💪
          </p>
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
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-sm text-warning">
                          <Coins className="h-3 w-3" />
                          {task.coins} coins
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-3 w-3" />
                          {task.timeMinutes} minutes of work
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => completeTask(task.id)}
                    disabled={completedTasks.includes(task.id)}
                    variant={completedTasks.includes(task.id) ? "outline" : "gaming"}
                    size="sm"
                  >
                    {completedTasks.includes(task.id) ? "Completed!" : "Work Here"}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {completedTasks.length >= 5 && (
            <div className="mt-6 text-center p-6 bg-gradient-primary/10 rounded-lg">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">🎉 Village Rebuilt!</h3>
              <p className="text-muted-foreground mb-4">
                Amazing work! You've learned that we earn money by working and helping others!
              </p>
              <div className="flex justify-center gap-2">
                <Badge variant="outline" className="text-sm p-2">
                  Village Helper! 🏘️
                </Badge>
                <Badge variant="outline" className="text-sm p-2">
                  Money Basics Master! 💰
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progress Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            What You've Learned
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">💼 About Earning Money:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• We earn money by working and helping others</li>
                <li>• Different jobs pay different amounts</li>
                <li>• The more time you work, the more you can earn</li>
                <li>• Money is earned, not just given to us</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">🎯 About Needs vs Wants:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Needs: Things we must have to live (food, water, shelter)</li>
                <li>• Wants: Things that are nice to have but not necessary</li>
                <li>• Smart spending means needs come first</li>
                <li>• It's okay to want things, but needs are more important</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleOne;