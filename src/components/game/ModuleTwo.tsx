import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Coins, 
  Trophy, 
  Target,
  CheckCircle,
  TrendingUp,
  Calendar,
  PiggyBank,
  Bike,
  ShoppingCart,
  DollarSign
} from "lucide-react";
import { toast } from "sonner";

interface ModuleTwoProps {
  gameState: any;
  setGameState: (state: any) => void;
  onModuleComplete: () => void;
}

const ModuleTwo = ({ gameState, setGameState, onModuleComplete }: ModuleTwoProps) => {
  const [lemonadeStand, setLemonadeStand] = useState({
    cupsStock: 50,
    lemonsStock: 25,
    sugarStock: 10,
    money: 20,
    totalEarned: 0,
    day: 1
  });
  
  const [budget, setBudget] = useState({
    income: 0,
    expenses: 0,
    savings: 0,
    savingsGoal: 100
  });

  const [currentActivity, setCurrentActivity] = useState<'setup' | 'selling' | 'budgeting' | 'planning'>('setup');
  const [showResult, setShowResult] = useState(false);
  const [dayResults, setDayResults] = useState<any>(null);
  const [goals, setGoals] = useState([
    { id: 1, item: "New Bike", cost: 150, timeFrame: "2 months", completed: false },
    { id: 2, item: "Video Game", cost: 60, timeFrame: "3 weeks", completed: false },
    { id: 3, item: "Art Supplies", cost: 30, timeFrame: "1 week", completed: false }
  ]);

  const supplies = [
    { name: "Lemons", cost: 0.50, makes: 4, icon: "🍋" },
    { name: "Sugar", cost: 2.00, makes: 20, icon: "🍯" },
    { name: "Cups", cost: 0.10, makes: 1, icon: "🥤" }
  ];

  const buySupplies = () => {
    const totalCost = (supplies[0].cost * 5) + (supplies[1].cost * 1) + (supplies[2].cost * 20);
    
    if (lemonadeStand.money >= totalCost) {
      setLemonadeStand(prev => ({
        ...prev,
        money: prev.money - totalCost,
        lemonsStock: prev.lemonsStock + 5,
        sugarStock: prev.sugarStock + 1,
        cupsStock: prev.cupsStock + 20
      }));
      toast.success(`Supplies purchased! -$${totalCost.toFixed(2)}`);
    } else {
      toast.error("Not enough money for supplies!");
    }
  };

  const sellLemonade = () => {
    if (lemonadeStand.cupsStock < 10 || lemonadeStand.lemonsStock < 3 || lemonadeStand.sugarStock < 1) {
      toast.error("Not enough supplies to sell!");
      return;
    }

    // Simulate a day of selling
    const cupsSold = Math.floor(Math.random() * 15) + 10; // 10-25 cups
    const pricePerCup = 1.50;
    const revenue = cupsSold * pricePerCup;
    
    const results = {
      cupsSold,
      revenue,
      day: lemonadeStand.day
    };

    setLemonadeStand(prev => ({
      ...prev,
      cupsStock: prev.cupsStock - cupsSold,
      lemonsStock: prev.lemonsStock - Math.ceil(cupsSold / 4),
      sugarStock: prev.sugarStock - Math.ceil(cupsSold / 20),
      money: prev.money + revenue,
      totalEarned: prev.totalEarned + revenue,
      day: prev.day + 1
    }));

    setDayResults(results);
    setShowResult(true);
    
    setGameState((prev: any) => ({
      ...prev,
      coins: prev.coins + Math.floor(revenue / 5),
      businessProgress: Math.min(prev.businessProgress + 20, 100)
    }));

    toast.success(`Great day! Sold ${cupsSold} cups for $${revenue.toFixed(2)}!`);
    
    setTimeout(() => {
      setShowResult(false);
      if (lemonadeStand.day >= 5) {
        setCurrentActivity('budgeting');
      }
    }, 3000);
  };

  const createBudget = (income: number, savings: number) => {
    const expenses = income - savings;
    setBudget({
      income,
      expenses,
      savings,
      savingsGoal: budget.savingsGoal
    });

    setGameState((prev: any) => ({
      ...prev,
      coins: prev.coins + 10,
      budgetingProgress: Math.min(prev.budgetingProgress + 25, 100)
    }));

    toast.success("Budget created! +10 coins for smart planning!");
    setCurrentActivity('planning');
  };

  const selectGoal = (goalId: number) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal && lemonadeStand.totalEarned >= goal.cost) {
      setGoals(goals.map(g => 
        g.id === goalId ? { ...g, completed: true } : g
      ));
      
      setGameState((prev: any) => ({
        ...prev,
        coins: prev.coins + 20,
        goalProgress: Math.min(prev.goalProgress + 50, 100)
      }));

      toast.success(`Goal achieved! You can afford the ${goal.item}!`);
    }
  };

  // Check if module is completed
  useEffect(() => {
    if (lemonadeStand.day >= 5 && budget.savings > 0 && goals.some(g => g.completed)) {
      onModuleComplete();
    }
  }, [lemonadeStand.day, budget.savings, goals, onModuleComplete]);

  return (
    <div className="space-y-6">
      {/* Learning Objective */}
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Module 2 Goals: Banking & Saving 🍋
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className={`h-4 w-4 ${lemonadeStand.day >= 5 ? 'text-green-500' : 'text-gray-400'}`} />
              <span>Run lemonade stand for 5 days</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className={`h-4 w-4 ${budget.savings > 0 ? 'text-green-500' : 'text-gray-400'}`} />
              <span>Create a budget with savings</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className={`h-4 w-4 ${goals.some(g => g.completed) ? 'text-green-500' : 'text-gray-400'}`} />
              <span>Achieve a savings goal</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Dashboard */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">${lemonadeStand.money.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Current Money</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">${lemonadeStand.totalEarned.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Total Earned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">Day {lemonadeStand.day}</div>
            <p className="text-sm text-muted-foreground">Business Day</p>
          </CardContent>
        </Card>
      </div>

      {/* Day Results Modal */}
      {showResult && dayResults && (
        <Card className="border-primary/50 shadow-glow animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">🍋 Day {dayResults.day} Results!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-6xl mb-4">🏆</div>
            <div className="space-y-2">
              <p className="text-lg">Cups Sold: <span className="font-bold text-primary">{dayResults.cupsSold}</span></p>
              <p className="text-lg">Revenue: <span className="font-bold text-green-600">${dayResults.revenue.toFixed(2)}</span></p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">Great job! Tomorrow is a new day to earn more!</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Activity */}
      {currentActivity === 'setup' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Stock Your Lemonade Stand 🍋
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Buy supplies to start your business! You start with $20.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                {supplies.map((supply, index) => (
                  <div key={index} className="p-4 border rounded-lg text-center">
                    <div className="text-3xl mb-2">{supply.icon}</div>
                    <h3 className="font-medium">{supply.name}</h3>
                    <p className="text-sm text-muted-foreground">${supply.cost} each</p>
                    <p className="text-xs text-muted-foreground">Makes {supply.makes} servings</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Current Stock:</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>🍋 Lemons: {lemonadeStand.lemonsStock}</div>
                  <div>🍯 Sugar: {lemonadeStand.sugarStock}</div>
                  <div>🥤 Cups: {lemonadeStand.cupsStock}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={buySupplies} variant="hero" className="flex-1">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Buy Supplies ($7.50)
                </Button>
                <Button 
                  onClick={() => setCurrentActivity('selling')} 
                  variant="outline"
                  disabled={lemonadeStand.cupsStock < 10}
                >
                  Start Selling
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentActivity === 'selling' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              Selling Lemonade! 🍋
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Sell lemonade for $1.50 per cup. Each day is different!
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Today's Stock:</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>🍋 Lemons: {lemonadeStand.lemonsStock}</div>
                  <div>🍯 Sugar: {lemonadeStand.sugarStock}</div>
                  <div>🥤 Cups: {lemonadeStand.cupsStock}</div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={sellLemonade} 
                  variant="hero" 
                  size="lg"
                  disabled={lemonadeStand.cupsStock < 10 || lemonadeStand.lemonsStock < 3}
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Sell Lemonade Today!
                </Button>
              </div>

              {lemonadeStand.day >= 5 && (
                <div className="mt-4 p-4 bg-primary/10 rounded-lg text-center">
                  <p className="font-medium">Great week of business! Time to plan your budget!</p>
                  <Button 
                    onClick={() => setCurrentActivity('budgeting')} 
                    variant="outline" 
                    className="mt-2"
                  >
                    Create Budget
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {currentActivity === 'budgeting' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-primary" />
              Create Your Budget 💰
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Plan how to use your ${lemonadeStand.totalEarned.toFixed(2)} earnings!
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="income">Weekly Income</Label>
                    <Input
                      id="income"
                      type="number"
                      value={budget.income}
                      onChange={(e) => setBudget(prev => ({ ...prev, income: Number(e.target.value) }))}
                      placeholder={`$${lemonadeStand.totalEarned.toFixed(2)}`}
                    />
                  </div>
                  <div>
                    <Label htmlFor="savings">How much to save?</Label>
                    <Input
                      id="savings"
                      type="number"
                      value={budget.savings}
                      onChange={(e) => setBudget(prev => ({ ...prev, savings: Number(e.target.value) }))}
                      placeholder="Enter savings amount"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Budget Breakdown:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Income:</span>
                        <span className="text-green-600">${budget.income.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Savings:</span>
                        <span className="text-blue-600">${budget.savings.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Spending:</span>
                        <span className="text-orange-600">${(budget.income - budget.savings).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => createBudget(budget.income, budget.savings)}
                variant="hero"
                className="w-full"
                disabled={budget.income <= 0 || budget.savings <= 0}
              >
                Create Budget
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentActivity === 'planning' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Savings Goals 🎯
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              What can you afford with your earnings? Choose wisely!
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {goals.map((goal) => (
                <Card 
                  key={goal.id} 
                  className={`cursor-pointer transition-all ${
                    goal.completed ? 'bg-green-50 border-green-200' : 
                    lemonadeStand.totalEarned >= goal.cost ? 'border-primary/50 hover:border-primary' : 'opacity-60'
                  }`}
                  onClick={() => selectGoal(goal.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">
                      {goal.item === "New Bike" ? "🚲" : 
                       goal.item === "Video Game" ? "🎮" : "🎨"}
                    </div>
                    <h3 className="font-medium">{goal.item}</h3>
                    <p className="text-lg font-bold text-primary">${goal.cost}</p>
                    <p className="text-sm text-muted-foreground">{goal.timeFrame}</p>
                    
                    {goal.completed ? (
                      <Badge variant="outline" className="mt-2 bg-green-100">
                        Achieved! ✅
                      </Badge>
                    ) : lemonadeStand.totalEarned >= goal.cost ? (
                      <Badge variant="outline" className="mt-2 bg-primary/10">
                        Can Afford! 💰
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="mt-2">
                        Keep Saving 📈
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {goals.some(g => g.completed) && (
              <div className="mt-6 text-center p-6 bg-gradient-primary/10 rounded-lg">
                <Trophy className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">🎉 Savings Goal Achieved!</h3>
                <p className="text-muted-foreground mb-4">
                  Awesome! You've learned how to earn, budget, and save for goals!
                </p>
                <Badge variant="outline" className="text-sm p-2">
                  Smart Saver! 🍋
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Learning Summary */}
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
              <h4 className="font-semibold">💰 About Budgeting:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Income = money you earn</li>
                <li>• Budget = plan for your money</li>
                <li>• Always save some money first</li>
                <li>• Track what you spend</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">🎯 About Saving:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Set specific savings goals</li>
                <li>• Save regularly, even small amounts</li>
                <li>• Delayed gratification pays off</li>
                <li>• Plan before you spend</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleTwo;