import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Store, 
  Coins, 
  TrendingUp, 
  Target, 
  PiggyBank,
  BarChart3,
  Crown,
  Zap,
  Shield,
  Award,
  Swords,
  Star
} from "lucide-react";
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

interface ModuleTwoProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onModuleComplete: () => void;
}

const ModuleTwo: React.FC<ModuleTwoProps> = ({ gameState, setGameState, onModuleComplete }) => {
  const [currentStoryPhase, setCurrentStoryPhase] = useState(0);
  const [characterDialogue, setCharacterDialogue] = useState('');
  const [showBossBattle, setShowBossBattle] = useState(false);
  const [bossHealth, setBossHealth] = useState(100);
  const [playerAttack, setPlayerAttack] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [currentBossQuestion, setCurrentBossQuestion] = useState(0);

  // Epic lemonade business empire
  const [lemonadeStand, setLemonadeStand] = useState({
    lemons: 0,
    sugar: 0,
    cups: 0,
    money: 100,
    earnings: 0,
    day: 1,
    reputation: 50,
    totalRevenue: 0,
    totalExpenses: 0
  });

  const [budget, setBudget] = useState({
    income: 0,
    expenses: 0,
    savings: 0,
    savingsGoal: 0,
    budgetCreated: false
  });

  const [currentActivity, setCurrentActivity] = useState<'setup' | 'selling' | 'budgeting' | 'planning'>('setup');
  const [showDayResults, setShowDayResults] = useState(false);
  const [dayResults, setDayResults] = useState({ sold: 0, earned: 0, expenses: 0 });

  // Boss battle questions
  const bossQuestions = [
    {
      id: 1,
      question: "The Debt Dragon whispers: 'Spend all your lemonade profits on fancy decorations!' What should you do?",
      options: ["Spend all profits on decorations", "Save some profits first"],
      correct: "Save some profits first",
      explanation: "Always save part of your income before spending on wants! This builds your financial foundation.",
      damage: 25
    },
    {
      id: 2,
      question: "Dragon's curse: 'Don't track your expenses, just spend freely!' How do you resist?",
      options: ["Ignore expense tracking", "Keep detailed budget records"],
      correct: "Keep detailed budget records",
      explanation: "Tracking expenses helps you understand where your money goes and make better decisions!",
      damage: 30
    }
  ];

  // Epic savings quests
  const [goals, setGoals] = useState([
    { id: 1, name: "🚲 Magic Bicycle", cost: 200, timeframe: "3 months", completed: false, description: "A enchanted bicycle that travels at lightning speed", priority: "Want", reward: "Speed Boost Badge" },
    { id: 2, name: "🛡️ Emergency Shield", cost: 150, timeframe: "2 months", completed: false, description: "Financial protection against unexpected expenses", priority: "Need", reward: "Safety Badge" },
    { id: 3, name: "📚 Wisdom Scrolls", cost: 500, timeframe: "12 months", completed: false, description: "Knowledge investment for future adventures", priority: "Need", reward: "Scholar Badge" }
  ]);

  const sellLemonade = () => {
    if (lemonadeStand.lemons < 2 || lemonadeStand.sugar < 1 || lemonadeStand.cups < 5) {
      toast.error("🍋 Not enough supplies! Visit the supply merchant first.");
      return;
    }

    const cupsToMake = Math.min(
      Math.floor(lemonadeStand.lemons / 2),
      Math.floor(lemonadeStand.sugar / 1),
      Math.floor(lemonadeStand.cups / 1)
    );
    
    const pricePerCup = 2;
    const soldCups = Math.floor(cupsToMake * (0.7 + Math.random() * 0.3));
    const revenue = soldCups * pricePerCup;
    const supplyCost = soldCups * 0.5;
    const profit = revenue - supplyCost;

    setLemonadeStand(prev => ({
      ...prev,
      lemons: prev.lemons - (soldCups * 2),
      sugar: prev.sugar - soldCups,
      cups: prev.cups - soldCups,
      money: prev.money + profit,
      earnings: prev.earnings + profit,
      totalRevenue: prev.totalRevenue + revenue,
      day: prev.day + 1,
      reputation: Math.min(prev.reputation + (soldCups > 10 ? 5 : 2), 100)
    }));

    setGameState(prev => ({
      ...prev,
      coins: prev.coins + Math.floor(profit / 5),
      experience: (prev.experience || 0) + soldCups,
      score: prev.score + soldCups * 10
    }));

    setDayResults({ sold: soldCups, earned: revenue, expenses: supplyCost });
    setShowDayResults(true);
    
    toast.success(`🎉 Day ${lemonadeStand.day} complete! Sold ${soldCups} cups!`);

    if (lemonadeStand.day >= 3 && currentActivity === 'selling') {
      setTimeout(() => {
        setCurrentActivity('budgeting');
        toast.info("💰 Time to learn budgeting!");
      }, 2000);
    }
  };

  const buySupplies = () => {
    const cost = 30;
    if (lemonadeStand.money >= cost) {
      setLemonadeStand(prev => ({
        ...prev,
        lemons: prev.lemons + 10,
        sugar: prev.sugar + 5,
        cups: prev.cups + 20,
        money: prev.money - cost,
        totalExpenses: prev.totalExpenses + cost
      }));
      
      toast.success("📦 Supplies purchased! Your lemonade empire grows!");
    } else {
      toast.error("💸 Not enough gold coins for supplies!");
    }
  };

  const createBudget = (income: number, savings: number) => {
    const expenses = income - savings;
    
    setBudget({
      income,
      expenses,
      savings,
      savingsGoal: savings * 12,
      budgetCreated: true
    });

    setGameState(prev => ({
      ...prev,
      score: prev.score + 200,
      coins: prev.coins + 30,
      experience: (prev.experience || 0) + 25
    }));

    setCurrentActivity('planning');
    toast.success("📊 Budget mastered! You've learned financial planning!");
  };

  const selectGoal = (goalId: number) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal || goal.completed) return;

    if (lemonadeStand.earnings >= goal.cost) {
      setGoals(prev => prev.map(g => 
        g.id === goalId ? { ...g, completed: true } : g
      ));
      
      setLemonadeStand(prev => ({
        ...prev,
        earnings: prev.earnings - goal.cost
      }));

      setGameState(prev => ({
        ...prev,
        score: prev.score + 300,
        coins: prev.coins + 50
      }));

      toast.success(`🏆 Quest completed: ${goal.name}! Earned ${goal.reward}!`);

      // Trigger boss battle
      setTimeout(() => {
        setShowBossBattle(true);
        setBossHealth(100);
        toast.warning("🐲 The Debt Dragon emerges! Prepare for financial battle!");
      }, 2000);
    } else {
      toast.error(`💰 Need ${goal.cost - lemonadeStand.earnings} more gold coins!`);
    }
  };

  const answerBossQuestion = (answer: string) => {
    const currentQuestion = bossQuestions[currentBossQuestion];
    const isCorrect = answer === currentQuestion.correct;
    
    setSelectedAnswer(answer);

    if (isCorrect) {
      const damage = currentQuestion.damage;
      setBossHealth(prev => Math.max(prev - damage, 0));
      setPlayerAttack(damage);
      
      toast.success(`⚔️ Critical strike! ${damage} damage!`);
    } else {
      setGameState(prev => ({
        ...prev,
        lives: Math.max(prev.lives - 1, 0)
      }));
      toast.error(`🔥 Dragon breathes fire! You lose a life!`);
    }

    setTimeout(() => {
      if (bossHealth <= currentQuestion.damage && isCorrect) {
        toast.success("🎉 Victory! The Debt Dragon is defeated!");
        setShowBossBattle(false);
        onModuleComplete();
      } else if (currentBossQuestion < bossQuestions.length - 1) {
        setCurrentBossQuestion(prev => prev + 1);
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
      {/* Empire Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            🏕️ Mountain Supply Station
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-4 mb-4">
            <div className="text-center p-3 bg-yellow-100 rounded-lg">
              <Coins className="h-6 w-6 mx-auto mb-1 text-yellow-600" />
              <div className="text-2xl font-bold text-yellow-600">${lemonadeStand.money}</div>
              <div className="text-xs text-muted-foreground">Treasury</div>
            </div>
            <div className="text-center p-3 bg-green-100 rounded-lg">
              <Store className="h-6 w-6 mx-auto mb-1 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{lemonadeStand.day}</div>
              <div className="text-xs text-muted-foreground">Days Open</div>
            </div>
            <div className="text-center p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 mx-auto mb-1 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">${lemonadeStand.earnings}</div>
              <div className="text-xs text-muted-foreground">Profits</div>
            </div>
            <div className="text-center p-3 bg-purple-100 rounded-lg">
              <Star className="h-6 w-6 mx-auto mb-1 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">{lemonadeStand.reputation}%</div>
              <div className="text-xs text-muted-foreground">Fame</div>
            </div>
            <div className="text-center p-3 bg-orange-100 rounded-lg">
              <Zap className="h-6 w-6 mx-auto mb-1 text-orange-600" />
              <div className="text-2xl font-bold text-orange-600">{gameState.experience || 0}</div>
              <div className="text-xs text-muted-foreground">Experience</div>
            </div>
          </div>
          <Progress value={lemonadeStand.reputation} className="w-full" />
        </CardContent>
      </Card>

      {/* Boss Battle */}
      <Dialog open={showBossBattle} onOpenChange={setShowBossBattle}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Swords className="h-5 w-5" />
              ⚔️ BOSS BATTLE: Debt Dragon!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-2">🐲</div>
              <div className="text-lg font-bold text-red-600">Debt Dragon</div>
              <Progress value={bossHealth} className="w-full mt-2" />
            </div>

            {bossQuestions[currentBossQuestion] && (
              <>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-medium text-red-800">
                    {bossQuestions[currentBossQuestion].question}
                  </p>
                </div>
                <div className="flex gap-2">
                  {bossQuestions[currentBossQuestion].options.map((option) => (
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
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Activity Sections */}
      {currentActivity === 'setup' && (
        <Card>
          <CardHeader>
            <CardTitle>🏕️ Setup Your Supply Station</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p>Set up your mountain supply station! Buy provisions to begin.</p>
              <Button onClick={buySupplies} size="lg">
                🛒 Buy Supplies ($30)
              </Button>
              <Button onClick={() => setCurrentActivity('selling')} variant="outline">
                Start Selling
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentActivity === 'selling' && (
        <Card>
          <CardHeader>
            <CardTitle>🥤 Epic Supply Trading</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p>Build your trading station one sale at a time!</p>
              <Button onClick={sellLemonade} size="lg">
                💰 Trade Supplies Today!
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentActivity === 'budgeting' && (
        <Card>
          <CardHeader>
            <CardTitle>📊 Master Budget Creation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="number"
                placeholder="Enter weekly income"
                onChange={(e) => setBudget(prev => ({ ...prev, income: Number(e.target.value) }))}
              />
              <Input
                type="number"
                placeholder="How much to save?"
                onChange={(e) => setBudget(prev => ({ ...prev, savings: Number(e.target.value) }))}
              />
              <Button 
                onClick={() => createBudget(budget.income, budget.savings)}
                className="w-full"
              >
                Create Epic Budget
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentActivity === 'planning' && (
        <Card>
          <CardHeader>
            <CardTitle>🎯 Legendary Savings Quests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {goals.map((goal) => (
                <div 
                  key={goal.id} 
                  className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50"
                  onClick={() => selectGoal(goal.id)}
                >
                  <h3 className="font-bold">{goal.name}</h3>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                  <p className="text-lg font-bold text-primary">${goal.cost}</p>
                  <Badge variant="outline">{goal.reward}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Day Results */}
      <Dialog open={showDayResults} onOpenChange={setShowDayResults}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🏆 Epic Day Results!</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <div className="text-6xl">🎉</div>
            <p>Sold {dayResults.sold} cups for ${dayResults.earned}!</p>
            <p>Profit: ${(dayResults.earned - dayResults.expenses).toFixed(2)}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModuleTwo;