import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Coins, Star, Target, CheckCircle, Timer, Award, Zap, Crown, Shield, Swords } from "lucide-react";
import { toast } from "sonner";

interface GameState {
  coins: number;
  score: number;
  lives: number;
  level: number;
  villageProgress: number;
  achievements: string[];
  experience: number;
  badges: string[];
  skillPoints: number;
}

interface ModuleOneProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onModuleComplete: () => void;
}

const ModuleOne: React.FC<ModuleOneProps> = ({ gameState, setGameState, onModuleComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showBossBattle, setShowBossBattle] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [questionsAnswered, setQuestionsAnswered] = useState<number[]>([]);
  const [currentStoryPhase, setCurrentStoryPhase] = useState(0);
  const [characterDialogue, setCharacterDialogue] = useState('');
  const [bossHealth, setBossHealth] = useState(100);
  const [playerAttack, setPlayerAttack] = useState(0);

  // Characters with personalities and backstories
  const characters = {
    villageElder: {
      name: "Elder Maya",
      avatar: "👵",
      personality: "Wise village elder who guides young heroes",
      greeting: "Welcome, young hero! Our village needs your help to rebuild after the Great Storm!"
    },
    merchant: {
      name: "Trader Tom", 
      avatar: "🧔",
      personality: "Shrewd but fair merchant",
      greeting: "Ah, a new face! Let me teach you the difference between what you NEED and what you WANT!"
    },
    boss: {
      name: "Impulse Dragon",
      avatar: "🐉",
      personality: "A dragon that tempts people with unnecessary purchases",
      taunt: "I'll make you spend all your coins on things you don't need! Mwahahaha!"
    }
  };

  // Epic quest tasks with storylines
  const tasks = [
    {
      id: 1,
      name: "🍞 Help the Baker",
      description: "The village bakery was destroyed! Help bake bread for hungry families.",
      coins: 25,
      experience: 10,
      time: "30 min",
      difficulty: "Easy",
      storyReward: "Families can eat again thanks to your help!"
    },
    {
      id: 2,
      name: "🌾 Farm Guardian", 
      description: "Protect the village crops from hungry rabbits and grow new vegetables.",
      coins: 40,
      experience: 15,
      time: "45 min",
      difficulty: "Medium",
      storyReward: "The harvest is saved! The village has food for winter!"
    },
    {
      id: 3,
      name: "⚒️ Blacksmith Hero",
      description: "Forge magical tools to help rebuild the village faster.",
      coins: 60,
      experience: 25,
      time: "1 hour",
      difficulty: "Hard",
      storyReward: "Your magical tools speed up construction by 200%!"
    },
    {
      id: 4,
      name: "📨 Village Messenger",
      description: "Deliver urgent messages between villages to coordinate the rebuilding effort.",
      coins: 35,
      experience: 12,
      time: "40 min", 
      difficulty: "Medium",
      storyReward: "Communication restored! Other villages are sending help!"
    },
    {
      id: 5,
      name: "🛡️ Market Guardian",
      description: "Defend the new marketplace from bandits who want to steal supplies.",
      coins: 50,
      experience: 20,
      time: "1.5 hours",
      difficulty: "Hard",
      storyReward: "The marketplace is safe! Trade can flourish again!"
    }
  ];

  // Boss battle questions (scenario-based challenges)
  const questions = [
    {
      id: 1,
      question: "The Impulse Dragon whispers: 'Buy this shiny sword for 50 coins!' You have 60 coins and need food that costs 30 coins.",
      item: "Shiny decorative sword",
      options: ["Buy the sword", "Buy food first"],
      correct: "Buy food first",
      explanation: "Food is a NEED for survival! The dragon tried to trick you into spending on a WANT first. Smart heroes prioritize needs!",
      damage: 25
    },
    {
      id: 2,
      question: "Dragon's trick: 'Everyone in the village wears these magic boots!' The boots cost 40 coins, but you need 35 coins for shelter repairs.",
      item: "Magic fashion boots",
      options: ["Buy trendy boots", "Repair shelter first"], 
      correct: "Repair shelter first",
      explanation: "Shelter protects you from danger! Fashion items are wants. The dragon tried to use peer pressure against you!",
      damage: 30
    },
    {
      id: 3,
      question: "The dragon roars: 'This magical scroll will make you smarter!' It costs 45 coins, but you need 40 coins for medicine.",
      item: "Intelligence-boosting scroll",
      options: ["Buy the scroll", "Buy medicine first"],
      correct: "Buy medicine first", 
      explanation: "Health is your most important need! The dragon tried to tempt you with false promises. True wisdom comes from making smart choices!",
      damage: 35
    }
  ];

  // Achievement system
  const achievements = [
    { id: 'first_task', name: 'Village Helper', description: 'Complete your first task', icon: '🏆', coins: 10 },
    { id: 'boss_defeated', name: 'Dragon Slayer', description: 'Defeat the Impulse Dragon', icon: '⚔️', coins: 100 }
  ];

  const completeTask = (taskId: number) => {
    if (completedTasks.includes(taskId)) return;
    
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newCompletedTasks = [...completedTasks, taskId];
    setCompletedTasks(newCompletedTasks);

    setGameState(prev => ({
      ...prev,
      coins: prev.coins + task.coins,
      experience: (prev.experience || 0) + task.experience,
      score: prev.score + 200,
      villageProgress: Math.min(prev.villageProgress + 20, 100),
      skillPoints: (prev.skillPoints || 0) + 1
    }));

    toast.success(`🎉 ${task.storyReward} Earned ${task.coins} coins and ${task.experience} XP!`);

    // Trigger boss battle after completing 3+ tasks
    if (newCompletedTasks.length >= 3 && questionsAnswered.length === 0) {
      setTimeout(() => {
        setShowBossBattle(true);
        setCurrentQuestionIndex(0);
        setBossHealth(100);
        toast.warning("🐉 The Impulse Dragon appears! Prepare for battle!");
      }, 2000);
    }
  };

  const answerBossQuestion = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct;
    
    setSelectedAnswer(answer);

    if (isCorrect) {
      const damage = currentQuestion.damage;
      setBossHealth(prev => Math.max(prev - damage, 0));
      setPlayerAttack(damage);
      
      setGameState(prev => ({
        ...prev,
        score: prev.score + 200,
        coins: prev.coins + 30,
        experience: (prev.experience || 0) + 20
      }));

      toast.success(`🗡️ Critical hit! ${damage} damage! ${currentQuestion.explanation}`);
    } else {
      setGameState(prev => ({
        ...prev,
        lives: Math.max(prev.lives - 1, 0),
        score: prev.score + 50
      }));
      toast.error(`💥 Dragon attacks! You lose a life! ${currentQuestion.explanation}`);
    }

    const newQuestionsAnswered = [...questionsAnswered, currentQuestionIndex];
    setQuestionsAnswered(newQuestionsAnswered);

    setTimeout(() => {
      if (bossHealth <= currentQuestion.damage && isCorrect) {
        toast.success("🎉 You defeated the Impulse Dragon! Village saved!");
        setShowBossBattle(false);
        onModuleComplete();
      } else if (newQuestionsAnswered.length < questions.length) {
        setCurrentQuestionIndex(prev => prev + 1);  
        setSelectedAnswer('');
        setPlayerAttack(0);
      } else {
        setShowBossBattle(false);
        onModuleComplete();
      }
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Hero Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Hero Dashboard - Module 1: Village Rebuilder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-4 mb-4">
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <Coins className="h-6 w-6 mx-auto mb-1 text-yellow-500" />
              <div className="text-2xl font-bold text-primary">{gameState.coins}</div>
              <div className="text-xs text-muted-foreground">Gold Coins</div>
            </div>
            <div className="text-center p-3 bg-secondary/10 rounded-lg">
              <Zap className="h-6 w-6 mx-auto mb-1 text-purple-500" />
              <div className="text-2xl font-bold text-secondary">{gameState.experience || 0}</div>
              <div className="text-xs text-muted-foreground">Experience</div>
            </div>
            <div className="text-center p-3 bg-green-100 rounded-lg">
              <Shield className="h-6 w-6 mx-auto mb-1 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{gameState.lives}</div>
              <div className="text-xs text-muted-foreground">Lives</div>
            </div>
            <div className="text-center p-3 bg-blue-100 rounded-lg">
              <Star className="h-6 w-6 mx-auto mb-1 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{completedTasks.length}/5</div>
              <div className="text-xs text-muted-foreground">Quests</div>
            </div>
            <div className="text-center p-3 bg-orange-100 rounded-lg">
              <Target className="h-6 w-6 mx-auto mb-1 text-orange-600" />
              <div className="text-2xl font-bold text-orange-600">{gameState.villageProgress}%</div>
              <div className="text-xs text-muted-foreground">Village</div>
            </div>
          </div>
          <Progress value={gameState.villageProgress} className="w-full mb-4" />
          <div className="flex flex-wrap gap-2">
            {gameState.badges?.map((badge, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                {achievements.find(a => a.id === badge)?.name || badge}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Boss Battle Dialog */}
      <Dialog open={showBossBattle} onOpenChange={setShowBossBattle}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Swords className="h-5 w-5" />
              ⚔️ BOSS BATTLE: Impulse Dragon!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-2">🐉</div>
              <div className="text-lg font-bold text-red-600">Impulse Dragon</div>
              <Progress value={bossHealth} className="w-full mt-2" />
              <div className="text-sm text-muted-foreground">Health: {bossHealth}/100</div>
            </div>

            {playerAttack > 0 && (
              <div className="text-center">
                <div className="text-2xl animate-bounce">⚔️ -{playerAttack} damage!</div>
              </div>
            )}

            {questions[currentQuestionIndex] && (
              <>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-medium text-red-800">
                    {questions[currentQuestionIndex].question}
                  </p>
                </div>
                <div className="flex gap-2">
                  {questions[currentQuestionIndex].options.map((option) => (
                    <Button
                      key={option}
                      onClick={() => answerBossQuestion(option)}
                      variant={selectedAnswer === option ? "destructive" : "outline"}
                      className="flex-1"
                      disabled={selectedAnswer !== ''}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                {selectedAnswer && (
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm">
                      {questions[currentQuestionIndex].explanation}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Village Quests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            🏘️ Village Rebuilding Quests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {tasks.map((task) => {
              const isCompleted = completedTasks.includes(task.id);
              return (
                <div key={task.id} className={`p-4 border rounded-lg transition-all ${isCompleted ? 'bg-green-50 border-green-200 shadow-md' : 'hover:bg-muted/50 hover:shadow-sm'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold flex items-center gap-2 text-lg">
                        {task.name}
                        {isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
                      </h3>
                      <p className="text-muted-foreground mb-3">{task.description}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Coins className="h-3 w-3" />
                          {task.coins} coins
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          {task.experience} XP
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Timer className="h-3 w-3" />
                          {task.time}
                        </Badge>
                        <Badge variant={task.difficulty === 'Easy' ? 'default' : task.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                          {task.difficulty}
                        </Badge>
                      </div>
                      {isCompleted && (
                        <div className="mt-2 p-2 bg-green-100 rounded text-xs text-green-800">
                          🎉 {task.storyReward}
                        </div>
                      )}
                    </div>
                    <Button 
                      onClick={() => completeTask(task.id)}
                      disabled={isCompleted}
                      size="lg"
                      className="ml-4"
                    >
                      {isCompleted ? '✅ Completed' : '🚀 Start Quest'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleOne;