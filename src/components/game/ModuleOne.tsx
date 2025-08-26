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
  const [currentStoryPhase, setCurrentStoryPhase] = useState(0);
  const [showCharacterDialog, setShowCharacterDialog] = useState(true);
  const [currentNPC, setCurrentNPC] = useState('guide');
  const [playerChoices, setPlayerChoices] = useState<string[]>([]);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [currentMiniGame, setCurrentMiniGame] = useState<'needs-wants' | 'resource-allocation' | 'decision-tree' | null>(null);
  const [showBossBattle, setShowBossBattle] = useState(false);
  const [bossHealth, setBossHealth] = useState(100);
  const [playerAttack, setPlayerAttack] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [currentBossQuestion, setCurrentBossQuestion] = useState(0);
  
  // Mini-game states
  const [needsWantsScore, setNeedsWantsScore] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameActive, setIsGameActive] = useState(false);

  // Interactive NPCs with rich personalities
  const characters = {
    guide: {
      name: "Mountain Guide Zara",
      avatar: "🧗‍♀️",
      personality: "Experienced climber who teaches about financial basics",
      dialogue: [
        "Welcome to Base Camp, young climber! 🏔️ I'm Zara, your guide up this mountain.",
        "Before we start climbing, you need to learn about money basics. Every successful climber knows this!",
        "Let me teach you the difference between NEEDS and WANTS. This knowledge will save your life up there!",
        "Ready for your first challenge? Let's see how well you can sort essential climbing gear!"
      ]
    },
    merchant: {
      name: "Supply Merchant Bo",
      avatar: "🎒",
      personality: "Friendly shop owner who tests your decision-making",
      dialogue: [
        "Ho there, climber! I've got all sorts of gear for sale.",
        "But be careful - not everything here is essential for your climb!",
        "A smart climber knows the difference between what they NEED and what they WANT.",
        "Let's see if you can make the right choices with limited coins!"
      ]
    },
    boss: {
      name: "Temptation Beast",
      avatar: "👹",
      personality: "Creature that tries to make climbers waste their resources",
      dialogue: [
        "Mwahahaha! Another foolish climber approaches my domain!",
        "I'll tempt you with shiny things and make you waste all your precious resources!",
        "Can you resist my tricks and keep your focus on what truly matters?",
        "Let's see how strong your financial willpower really is!"
      ]
    }
  };

  // Interactive mini-games and challenges
  const miniGames = {
    'needs-wants': {
      name: "Gear Sorting Challenge",
      description: "Sort climbing gear into NEEDS vs WANTS under time pressure!",
      items: [
        { name: "🎒 Climbing Rope", type: "need", points: 10 },
        { name: "💎 Diamond Pickaxe", type: "want", points: 10 },
        { name: "🥤 Energy Drinks", type: "need", points: 10 },
        { name: "👑 Golden Helmet", type: "want", points: 10 },
        { name: "🧊 Ice Axe", type: "need", points: 10 },
        { name: "🎮 Portable Gaming Console", type: "want", points: 10 },
        { name: "🍫 Emergency Food", type: "need", points: 10 },
        { name: "🎵 Bluetooth Speaker", type: "want", points: 10 }
      ]
    },
    'resource-allocation': {
      name: "Budget Your Climb",
      description: "You have 100 coins. Allocate them wisely for your mountain adventure!",
      resources: [
        { name: "🍕 Food Supplies", cost: 30, essential: true },
        { name: "⛺ Shelter", cost: 40, essential: true },
        { name: "🧗 Safety Gear", cost: 25, essential: true },
        { name: "📱 Satellite Phone", cost: 20, essential: false },
        { name: "🎪 Luxury Tent", cost: 60, essential: false },
        { name: "🍰 Gourmet Meals", cost: 35, essential: false }
      ]
    },
    'decision-tree': {
      name: "Mountain Crisis Decisions",
      description: "Make smart financial choices in emergency situations!",
      scenarios: [
        {
          situation: "🌨️ Sudden blizzard! You need shelter immediately.",
          choices: [
            { text: "Buy expensive luxury tent (50 coins)", result: "Safe but broke", correct: false },
            { text: "Share shelter with another climber (10 coins)", result: "Safe and smart!", correct: true }
          ]
        },
        {
          situation: "🍽️ Running low on food halfway up the mountain.",
          choices: [
            { text: "Buy overpriced snacks from vendor (40 coins)", result: "Fed but wasteful", correct: false },
            { text: "Ration current food and plan better (0 coins)", result: "Smart planning!", correct: true }
          ]
        }
      ]
    }
  };

  // Boss battle questions with mountain theme
  const bossQuestions = [
    {
      id: 1,
      question: "The Temptation Beast roars: 'Buy this shiny climbing gear for 50 coins!' You have 60 coins and need food that costs 30 coins.",
      item: "Decorative golden climbing hooks",
      options: ["Buy the shiny gear", "Buy food first"],
      correct: "Buy food first",
      explanation: "Food is a NEED for survival! The beast tried to trick you into spending on a WANT first. Smart climbers prioritize needs!",
      damage: 25
    },
    {
      id: 2,
      question: "Beast's temptation: 'All the pro climbers have these designer boots!' The boots cost 40 coins, but you need 35 coins for safety equipment.",
      item: "Designer climbing boots",
      options: ["Buy trendy boots", "Buy safety gear first"], 
      correct: "Buy safety gear first",
      explanation: "Safety equipment protects your life! Fashion items are wants. The beast used peer pressure against you!",
      damage: 30
    },
    {
      id: 3,
      question: "The beast tempts: 'This magic compass will make you the best climber!' It costs 45 coins, but you need 40 coins for emergency supplies.",
      item: "Enchanted navigation compass",
      options: ["Buy the magic compass", "Buy emergency supplies first"],
      correct: "Buy emergency supplies first", 
      explanation: "Emergency supplies are essential for survival! The beast tried to tempt you with false promises. True skill comes from preparation!",
      damage: 35
    }
  ];

  // Achievement system
  const achievements = [
    { id: 'first_task', name: 'Village Helper', description: 'Complete your first task', icon: '🏆', coins: 10 },
    { id: 'boss_defeated', name: 'Dragon Slayer', description: 'Defeat the Impulse Dragon', icon: '⚔️', coins: 100 }
  ];

  // Story progression system
  const advanceStory = () => {
    const currentChar = characters[currentNPC as keyof typeof characters];
    if (currentStoryPhase < currentChar.dialogue.length - 1) {
      setCurrentStoryPhase(prev => prev + 1);
    } else {
      // Move to next phase based on current NPC
      if (currentNPC === 'guide' && currentStoryPhase >= 3) {
        setShowCharacterDialog(false);
        setCurrentMiniGame('needs-wants');
        setShowMiniGame(true);
        setTimeLeft(30);
        setIsGameActive(true);
        startTimer();
      }
    }
  };

  // Timer for mini-games
  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle needs vs wants sorting
  const sortItem = (item: any, category: 'need' | 'want') => {
    if (!isGameActive) return;
    
    const isCorrect = item.type === category;
    if (isCorrect) {
      setNeedsWantsScore(prev => prev + item.points);
      setGameState(prev => ({
        ...prev,
        coins: prev.coins + 5,
        score: prev.score + 50,
        experience: (prev.experience || 0) + 2
      }));
      toast.success(`✅ Correct! ${item.name} is a ${category.toUpperCase()}!`);
    } else {
      toast.error(`❌ Wrong! ${item.name} is actually a ${item.type.toUpperCase()}`);
    }
  };

  // Complete mini-game
  const completeMiniGame = () => {
    setShowMiniGame(false);
    setCurrentMiniGame(null);
    
    if (needsWantsScore >= 40) {
      toast.success("🎉 Excellent! You've mastered the basics!");
      setCurrentNPC('merchant');
      setCurrentStoryPhase(0);
      setShowCharacterDialog(true);
      
      setGameState(prev => ({
        ...prev,
        villageProgress: Math.min(prev.villageProgress + 30, 80),
        coins: prev.coins + 25,
        experience: (prev.experience || 0) + 50
      }));
    } else {
      toast.warning("🤔 You need more practice! Let's try again.");
      setNeedsWantsScore(0);
      setTimeLeft(30);
      setIsGameActive(true);
      startTimer();
    }
  };

  // Complete merchant phase
  const completeMerchantPhase = () => {
    setShowCharacterDialog(false);
    setTimeout(() => {
      setShowBossBattle(true);
      setBossHealth(100);
      setCurrentBossQuestion(0);
      toast.warning("👹 The Temptation Beast blocks your path! Prepare for the final challenge!");
    }, 1000);
  };

  const answerBossQuestion = (answer: string) => {
    const currentQuestion = bossQuestions[currentBossQuestion];
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

      toast.success(`⚔️ Critical hit! ${damage} damage! ${currentQuestion.explanation}`);
    } else {
      setGameState(prev => ({
        ...prev,
        lives: Math.max(prev.lives - 1, 0),
        score: prev.score + 50
      }));
      toast.error(`💥 Beast attacks! You lose a life! ${currentQuestion.explanation}`);
    }

    setTimeout(() => {
      if (bossHealth <= currentQuestion.damage && isCorrect) {
        toast.success("🎉 You defeated the Temptation Beast! Base camp is secure!");
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
      {/* Game Stats Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            🏔️ Base Camp Adventure - Financial Climbing School
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
              <div className="text-2xl font-bold text-blue-600">{needsWantsScore}</div>
              <div className="text-xs text-muted-foreground">Challenge Score</div>
            </div>
            <div className="text-center p-3 bg-orange-100 rounded-lg">
              <Target className="h-6 w-6 mx-auto mb-1 text-orange-600" />
              <div className="text-2xl font-bold text-orange-600">{gameState.villageProgress}%</div>
              <div className="text-xs text-muted-foreground">Base Camp</div>
            </div>
          </div>
          <Progress value={gameState.villageProgress} className="w-full mb-4" />
          <div className="flex flex-wrap gap-2">
            {gameState.badges?.map((badge, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                {badge}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Character Dialogue System */}
      <Dialog open={showCharacterDialog} onOpenChange={() => {}}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="text-4xl">{characters[currentNPC as keyof typeof characters].avatar}</div>
              <div>
                <div className="text-xl">{characters[currentNPC as keyof typeof characters].name}</div>
                <div className="text-sm text-muted-foreground">Mountain Guide</div>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-lg leading-relaxed">
                {characters[currentNPC as keyof typeof characters].dialogue[currentStoryPhase]}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {currentStoryPhase + 1} / {characters[currentNPC as keyof typeof characters].dialogue.length}
              </div>
              <div className="flex gap-2">
                {currentNPC === 'merchant' && currentStoryPhase >= 3 ? (
                  <Button onClick={completeMerchantPhase} className="bg-red-600 hover:bg-red-700 text-white">
                    Face the Challenge! 👹
                  </Button>
                ) : (
                  <Button onClick={advanceStory}>
                    {currentStoryPhase < characters[currentNPC as keyof typeof characters].dialogue.length - 1 ? 'Continue' : 'Start Challenge!'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Interactive Mini-Game */}
      <Dialog open={showMiniGame} onOpenChange={() => {}}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>🎯 {miniGames[currentMiniGame as keyof typeof miniGames]?.name}</span>
              <div className="flex items-center gap-4">
                <Badge variant="outline">⏰ {timeLeft}s</Badge>
                <Badge variant="secondary">Score: {needsWantsScore}</Badge>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {currentMiniGame === 'needs-wants' && (
            <div className="space-y-6">
              <p className="text-center text-lg">
                🏔️ Sort these items quickly! Drag climbing gear to NEEDS or WANTS columns!
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Items to Sort */}
                <div className="space-y-3">
                  <h3 className="font-bold text-center">🎒 Gear to Sort</h3>
                  <div className="space-y-2">
                    {miniGames['needs-wants'].items.slice(currentChallenge, currentChallenge + 2).map((item, index) => (
                      <div key={index} className="p-3 border rounded-lg bg-gray-50">
                        <div className="text-center font-semibold">{item.name}</div>
                        <div className="flex gap-2 justify-center mt-2">
                          <Button 
                            size="sm" 
                            onClick={() => sortItem(item, 'need')}
                            className="bg-green-600 hover:bg-green-700 text-white"
                            disabled={!isGameActive}
                          >
                            NEED
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => sortItem(item, 'want')}
                            className="bg-red-600 hover:bg-red-700 text-white"
                            disabled={!isGameActive}
                          >
                            WANT
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* NEEDS Column */}
                <div className="p-4 border-2 border-green-300 rounded-lg bg-green-50">
                  <h3 className="font-bold text-center text-green-800 mb-3">✅ NEEDS</h3>
                  <p className="text-sm text-green-700 text-center">Essential for survival</p>
                </div>

                {/* WANTS Column */}
                <div className="p-4 border-2 border-red-300 rounded-lg bg-red-50">
                  <h3 className="font-bold text-center text-red-800 mb-3">🎁 WANTS</h3>
                  <p className="text-sm text-red-700 text-center">Nice to have but not essential</p>
                </div>
              </div>

              {timeLeft === 0 && (
                <div className="text-center">
                  <Button onClick={completeMiniGame} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Continue Adventure
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Boss Battle */}
      <Dialog open={showBossBattle} onOpenChange={() => {}}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Swords className="h-5 w-5" />
              ⚔️ FINAL BOSS: Temptation Beast!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-6xl mb-3 animate-pulse">👹</div>
              <div className="text-lg font-bold text-red-600">Temptation Beast</div>
              <Progress value={bossHealth} className="w-full mt-2" />
              <div className="text-sm text-muted-foreground">Health: {bossHealth}/100</div>
            </div>

            {playerAttack > 0 && (
              <div className="text-center">
                <div className="text-2xl animate-bounce text-green-600">⚔️ -{playerAttack} damage!</div>
              </div>
            )}

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
                {selectedAnswer && (
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm font-bold text-green-700">
                      {bossQuestions[currentBossQuestion].explanation}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Game Progress Overview */}
      {!showCharacterDialog && !showMiniGame && !showBossBattle && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              🏔️ Your Climbing Adventure Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold">Adventure in Progress!</h3>
              <p className="text-lg text-muted-foreground">
                You're learning about financial basics through interactive challenges and character interactions.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 border rounded-lg">
                  <div className="text-3xl mb-2">🧗‍♀️</div>
                  <h4 className="font-bold">Meet Characters</h4>
                  <p className="text-sm text-muted-foreground">Interactive NPCs guide your journey</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-bold">Challenge Games</h4>
                  <p className="text-sm text-muted-foreground">Skill-based mini-games test your knowledge</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-3xl mb-2">👹</div>
                  <h4 className="font-bold">Boss Battles</h4>
                  <p className="text-sm text-muted-foreground">Epic confrontations with financial wisdom</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ModuleOne;