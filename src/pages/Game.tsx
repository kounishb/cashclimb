import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Gamepad2, 
  Trophy, 
  Coins, 
  Target, 
  Users, 
  BarChart3, 
  Zap, 
  Calendar,
  PlayCircle,
  Settings,
  Home,
  Book
} from "lucide-react";
import { Link } from "react-router-dom";

const Game = () => {
  const playerStats = {
    level: 7,
    xp: 1250,
    xpToNext: 500,
    coins: 2850,
    badges: 12,
    streak: 5
  };

  const availableGames = [
    {
      id: 1,
      title: "Budget Battle Royale",
      description: "Manage your virtual budget while facing unexpected expenses and opportunities",
      difficulty: "Beginner",
      duration: "15 min",
      xpReward: 150,
      coinReward: 50,
      category: "Budgeting",
      isLocked: false
    },
    {
      id: 2,
      title: "Investment Island",
      description: "Navigate the stock market and build a diversified portfolio",
      difficulty: "Intermediate", 
      duration: "25 min",
      xpReward: 300,
      coinReward: 100,
      category: "Investing",
      isLocked: false
    },
    {
      id: 3,
      title: "Debt Dungeon Escape",
      description: "Strategically pay off debts and escape the dungeon of financial burden",
      difficulty: "Beginner",
      duration: "20 min", 
      xpReward: 200,
      coinReward: 75,
      category: "Debt Management",
      isLocked: false
    },
    {
      id: 4,
      title: "Crypto Kingdom",
      description: "Learn cryptocurrency basics while exploring a digital kingdom",
      difficulty: "Advanced",
      duration: "30 min",
      xpReward: 400,
      coinReward: 150,
      category: "Cryptocurrency",
      isLocked: true
    }
  ];

  const dailyChallenges = [
    {
      title: "Save $5 Challenge",
      description: "Find creative ways to save $5 today",
      progress: 60,
      reward: "25 XP"
    },
    {
      title: "Read 3 Finance Articles",
      description: "Expand your knowledge with curated content",
      progress: 33,
      reward: "50 XP"
    },
    {
      title: "Complete a Learning Module",
      description: "Finish any module to complete this challenge",
      progress: 0,
      reward: "100 XP"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success/20 text-success";
      case "Intermediate": return "bg-warning/20 text-warning";
      case "Advanced": return "bg-destructive/20 text-destructive";
      default: return "bg-primary/20 text-primary";
    }
  };

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
              <span className="bg-gradient-primary bg-clip-text text-transparent">Game Center</span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Build your financial skills through interactive games and challenges
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Player Stats */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Player Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Level {playerStats.level}</span>
                    <span className="text-xs text-muted-foreground">
                      {playerStats.xp}/{playerStats.xp + playerStats.xpToNext} XP
                    </span>
                  </div>
                  <Progress value={(playerStats.xp / (playerStats.xp + playerStats.xpToNext)) * 100} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-lg font-bold text-warning">
                      <Coins className="h-4 w-4" />
                      {playerStats.coins}
                    </div>
                    <p className="text-xs text-muted-foreground">Coins</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-lg font-bold text-primary">
                      <Trophy className="h-4 w-4" />
                      {playerStats.badges}
                    </div>
                    <p className="text-xs text-muted-foreground">Badges</p>
                  </div>
                </div>

                <div className="text-center p-3 bg-gradient-subtle rounded-lg">
                  <div className="flex items-center justify-center gap-1 text-lg font-bold text-success">
                    <Zap className="h-4 w-4" />
                    {playerStats.streak}
                  </div>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
              </CardContent>
            </Card>

            {/* Daily Challenges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Daily Challenges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dailyChallenges.map((challenge, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">{challenge.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {challenge.reward}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{challenge.description}</p>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Games */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Available Games</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Book className="h-4 w-4 mr-2" />
                  Learning Modules
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {availableGames.map((game) => (
                <Card 
                  key={game.id} 
                  className={`group hover:scale-105 transition-all duration-300 ${
                    game.isLocked 
                      ? 'opacity-60 cursor-not-allowed' 
                      : 'hover:border-primary/50 hover:shadow-glow cursor-pointer'
                  }`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{game.title}</CardTitle>
                      {game.isLocked && <Badge variant="secondary">Locked</Badge>}
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Badge className={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                      <Badge variant="outline">{game.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{game.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {game.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Trophy className="h-3 w-3" />
                          {game.xpReward} XP
                        </span>
                        <span className="flex items-center gap-1">
                          <Coins className="h-3 w-3" />
                          {game.coinReward}
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant={game.isLocked ? "outline" : "gaming"}
                      disabled={game.isLocked}
                    >
                      {game.isLocked ? (
                        <>Unlock at Level {game.id + 5}</>
                      ) : (
                        <>
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Start Game
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Coming Soon Section */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">Coming Soon</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  "Retirement Planning Simulator",
                  "Tax Strategy Battle",
                  "Real Estate Tycoon"
                ].map((title, index) => (
                  <Card key={index} className="opacity-60">
                    <CardContent className="p-4 text-center">
                      <Gamepad2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <h4 className="font-medium text-sm">{title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">Coming Q2 2024</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;