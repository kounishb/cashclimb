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
  ArrowRight,
  CheckCircle,
  Play,
  FileText,
  HelpCircle,
  Award,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const LessonViewer = () => {
  const { gradeId, moduleId } = useParams();
  const navigate = useNavigate();
  const grade = parseInt(gradeId || "3");
  const module = parseInt(moduleId || "1");
  
  const [currentSection, setCurrentSection] = useState<'video' | 'article' | 'quiz'>('video');
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: string}>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [articleCompleted, setArticleCompleted] = useState(false);
  const [progress, setProgress] = useState<any>({ video_completed: false, article_completed: false, quiz_completed: false, quiz_attempts: 0 });
  const [badges, setBadges] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        loadProgress(user.id);
        loadBadges(user.id);
      }
    };
    getUser();
  }, [grade, module]);

  const loadProgress = async (userId: string) => {
    const { data: lesson } = await supabase
      .from('lessons')
      .select('id')
      .eq('grade_level', grade)
      .eq('module_number', module)
      .single();

    if (lesson) {
      const { data: progressData } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('lesson_id', lesson.id)
        .single();

      if (progressData) {
        setProgress(progressData);
        setVideoCompleted(progressData.video_completed);
        setArticleCompleted(progressData.article_completed);
        if (progressData.quiz_completed) {
          setQuizSubmitted(true);
          setScore(progressData.quiz_score || 0);
          setXpEarned(progressData.xp_earned);
        }
      }
    }
  };

  const loadBadges = async (userId: string) => {
    const { data } = await supabase
      .from('user_badges')
      .select('badges(*)')
      .eq('user_id', userId);
    
    if (data) {
      setBadges(data.map(item => item.badges));
    }
  };

  // Real educational content with working videos and comprehensive articles
  const lessonContent = {
    3: {
      1: {
        title: "What is Money?",
        videoUrl: "https://www.youtube.com/embed/0iRbD5rM5qc", // Financial Literacy for Kids
        videoTitle: "Introduction to Money for Kids",
        article: {
          title: "Understanding Money: The Complete Guide for Young Learners",
          content: `
            <h2>What is Money?</h2>
            <p>Money is a special tool that helps people trade and buy things they need and want. Before money existed, people had to trade items directly with each other. Imagine trying to trade your bicycle for groceries - it would be very difficult!</p>
            
            <h3>The History of Money</h3>
            <p>Long ago, people used many different things as money:</p>
            <ul>
              <li><strong>Shells and stones</strong> - Easy to carry and count</li>
              <li><strong>Metal pieces</strong> - Valuable and long-lasting</li>
              <li><strong>Paper certificates</strong> - Representing valuable items stored elsewhere</li>
              <li><strong>Digital numbers</strong> - Modern electronic money we use today</li>
            </ul>
            
            <h3>Types of Money Today</h3>
            <p>In our modern world, we use several types of money:</p>
            <ul>
              <li><strong>Coins</strong> - Metal money like pennies (1¢), nickels (5¢), dimes (10¢), and quarters (25¢)</li>
              <li><strong>Bills</strong> - Paper money in different amounts like $1, $5, $10, $20, and higher</li>
              <li><strong>Digital Money</strong> - Money stored on computers, phones, and bank accounts</li>
              <li><strong>Credit and Debit Cards</strong> - Plastic cards that represent money in the bank</li>
            </ul>
            
            <h3>Why Do We Need Money?</h3>
            <p>Money makes life easier in many ways:</p>
            <ul>
              <li>Buy necessities like food, clothes, and shelter</li>
              <li>Purchase wants like toys, games, and entertainment</li>
              <li>Pay for services like haircuts, medical care, and education</li>
              <li>Save for future goals and dreams</li>
              <li>Help others through donations and gifts</li>
              <li>Measure and compare the value of different things</li>
            </ul>
            
            <h3>Money Around the World</h3>
            <p>Different countries use different types of money called "currencies":</p>
            <ul>
              <li>United States: Dollars ($)</li>
              <li>Europe: Euros (€)</li>
              <li>Japan: Yen (¥)</li>
              <li>United Kingdom: Pounds (£)</li>
            </ul>
            
            <h3>Fun Facts About Money!</h3>
            <ul>
              <li>The first coins were made over 2,500 years ago in ancient Turkey</li>
              <li>Paper money was first used in China over 1,000 years ago</li>
              <li>The largest bill ever printed in the US was worth $100,000!</li>
              <li>Some cultures used cocoa beans, salt, or cattle as money</li>
            </ul>
            
            <h3>Taking Care of Money</h3>
            <p>It's important to treat money with respect:</p>
            <ul>
              <li>Keep bills flat and clean - don't write on them</li>
              <li>Store coins and bills in a safe place</li>
              <li>Count your money carefully</li>
              <li>Ask adults for help when handling large amounts</li>
            </ul>
          `
        },
        quiz: [
          {
            id: 1,
            question: "What is the main purpose of money?",
            options: ["To look pretty", "To help people trade and buy things", "To be collected", "To make noise"],
            correct: "To help people trade and buy things",
            explanation: "Money is a tool that makes it easier for people to trade and buy the things they need and want!"
          },
          {
            id: 2,
            question: "Before money existed, how did people get things they needed?",
            options: ["They traded items directly", "They used credit cards", "They asked the government", "They made everything themselves"],
            correct: "They traded items directly",
            explanation: "Before money, people had to trade items directly with each other, which was much more difficult than using money!"
          },
          {
            id: 3,
            question: "Which of these is NOT a type of money we use today?",
            options: ["Coins", "Bills", "Rocks", "Digital money"],
            correct: "Rocks",
            explanation: "While some ancient cultures used rocks or stones as money, today we use coins, bills, and digital money!"
          },
          {
            id: 4,
            question: "How much is a quarter worth?",
            options: ["1 cent", "5 cents", "10 cents", "25 cents"],
            correct: "25 cents",
            explanation: "A quarter is worth 25 cents, which is the same as 5 nickels or 25 pennies!"
          },
          {
            id: 5,
            question: "What currency is used in Japan?",
            options: ["Dollars", "Euros", "Yen", "Pounds"],
            correct: "Yen",
            explanation: "Japan uses Yen (¥) as their currency, just like the United States uses Dollars ($)!"
          },
          {
            id: 6,
            question: "Where was paper money first used?",
            options: ["United States", "China", "Europe", "Africa"],
            correct: "China",
            explanation: "Paper money was first used in China over 1,000 years ago, making it a very old invention!"
          },
          {
            id: 7,
            question: "What should you do to take care of paper money?",
            options: ["Write your name on it", "Fold it many times", "Keep it flat and clean", "Use it as paper for drawing"],
            correct: "Keep it flat and clean",
            explanation: "To take care of money, we should keep bills flat and clean, and never write on them or damage them!"
          },
          {
            id: 8,
            question: "Money helps us do all of these EXCEPT:",
            options: ["Buy food and clothes", "Save for the future", "Help others", "Control the weather"],
            correct: "Control the weather",
            explanation: "Money can help us buy things, save, and help others, but it cannot control natural things like the weather!"
          },
          {
            id: 9,
            question: "What makes money useful compared to trading items directly?",
            options: ["It's more colorful", "It's easier to carry and use", "It makes noise", "It never gets lost"],
            correct: "It's easier to carry and use",
            explanation: "Money is much easier to carry and use than trading heavy or awkward items directly with other people!"
          },
          {
            id: 10,
            question: "If you wanted to help others with your money, what could you do?",
            options: ["Hide it under your bed", "Spend it all on toys", "Donate to charity", "Throw it away"],
            correct: "Donate to charity",
            explanation: "One wonderful way to use money to help others is to donate some of it to charities that help people in need!"
          }
        ],
        xpReward: 100
      }
    },
    4: {
      1: {
        title: "Money Basics Review",
        videoUrl: "https://www.youtube.com/embed/Lys4EVugJmk", // Khan Academy Financial Literacy
        videoTitle: "Building on Money Fundamentals",
        article: {
          title: "Advanced Money Concepts for Grade 4",
          content: `
            <h2>Building on What We Know About Money</h2>
            <p>Now that you understand what money is, let's explore how money works in our daily lives and learn some advanced concepts that will help you become money-smart!</p>
            
            <h3>The Three Jobs of Money</h3>
            <p>Money has three important jobs in our economy:</p>
            <ul>
              <li><strong>Medium of Exchange</strong> - Money helps us trade. Instead of trading a bicycle for groceries, we can sell the bicycle for money and use that money to buy groceries.</li>
              <li><strong>Unit of Account</strong> - Money helps us measure and compare values. We can say an apple costs $1 and a book costs $10, so we know the book is worth 10 apples.</li>
              <li><strong>Store of Value</strong> - Money keeps its value over time so we can save it. If you save $20 today, it will still be worth something valuable tomorrow.</li>
            </ul>
            
            <h3>Different Forms of Payment</h3>
            <p>There are many ways to pay for things:</p>
            <ul>
              <li><strong>Cash</strong> - Physical coins and bills you can hold</li>
              <li><strong>Checks</strong> - Written instructions telling your bank to pay someone</li>
              <li><strong>Debit Cards</strong> - Plastic cards connected to money in your bank account</li>
              <li><strong>Credit Cards</strong> - Cards that let you borrow money to pay (you must pay it back later)</li>
              <li><strong>Digital Payments</strong> - Using apps on phones or computers to send money</li>
            </ul>
            
            <h3>Making Smart Money Decisions</h3>
            <p>Good money management involves thinking before spending:</p>
            <ul>
              <li><strong>Needs vs. Wants</strong> - Needs are things you must have (food, shelter). Wants are things you'd like to have (toys, candy).</li>
              <li><strong>Comparison Shopping</strong> - Looking at prices in different stores to find the best deal</li>
              <li><strong>Quality vs. Price</strong> - Sometimes paying more gets you something that lasts longer</li>
              <li><strong>Opportunity Cost</strong> - When you buy one thing, you give up the chance to buy something else</li>
            </ul>
            
            <h3>Money and Math Skills</h3>
            <p>Understanding money helps improve your math:</p>
            <ul>
              <li>Adding prices: $2.50 + $3.75 = $6.25</li>
              <li>Calculating change: If something costs $7 and you pay with $10, you get $3 back</li>
              <li>Finding percentages: 10% off $20 = $2 discount</li>
              <li>Comparing unit prices: Which is cheaper - 3 apples for $1.50 or 5 apples for $2.00?</li>
            </ul>
            
            <h3>Banking Basics</h3>
            <p>Banks are safe places to keep money:</p>
            <ul>
              <li><strong>Savings Account</strong> - A safe place to store money and earn a little extra (interest)</li>
              <li><strong>Checking Account</strong> - An account for money you use regularly</li>
              <li><strong>ATM</strong> - Automatic Teller Machine - a computer that lets you get your money</li>
              <li><strong>Interest</strong> - Extra money the bank pays you for keeping your money there</li>
            </ul>
            
            <h3>The Importance of Saving</h3>
            <p>Saving money is one of the most important financial skills:</p>
            <ul>
              <li>Helps you buy bigger things you really want</li>
              <li>Prepares you for emergencies</li>
              <li>Teaches patience and planning</li>
              <li>Grows over time with interest</li>
            </ul>
            
            <h3>Money Around the World</h3>
            <p>Different countries have different economic systems, but they all use money to help people trade goods and services. Learning about money prepares you to be a smart consumer anywhere in the world!</p>
          `
        },
        quiz: [
          {
            id: 1,
            question: "What are the three main jobs of money?",
            options: [
              "Buy, sell, trade",
              "Medium of exchange, unit of account, store of value", 
              "Spend, save, give",
              "Cash, cards, checks"
            ],
            correct: "Medium of exchange, unit of account, store of value",
            explanation: "Money's three jobs are: medium of exchange (helps us trade), unit of account (measures value), and store of value (keeps value over time)!"
          },
          {
            id: 2,
            question: "Which payment method uses money you already have in the bank?",
            options: ["Credit card", "Debit card", "Check", "Cash"],
            correct: "Debit card",
            explanation: "A debit card is connected to your bank account and uses money you already have saved there!"
          },
          {
            id: 3,
            question: "What's the difference between needs and wants?",
            options: [
              "Needs are expensive, wants are cheap",
              "Needs are things you must have, wants are things you'd like to have",
              "Needs are for adults, wants are for kids",
              "There is no difference"
            ],
            correct: "Needs are things you must have, wants are things you'd like to have",
            explanation: "Needs are essential things like food and shelter. Wants are nice to have but not necessary, like toys or candy!"
          },
          {
            id: 4,
            question: "If you buy a toy for $8 and pay with a $10 bill, how much change do you get?",
            options: ["$1", "$2", "$3", "$18"],
            correct: "$2",
            explanation: "$10 - $8 = $2. Always subtract what you spend from what you pay to find the change!"
          },
          {
            id: 5,
            question: "What is opportunity cost?",
            options: [
              "The price of something expensive",
              "Money you find on the ground", 
              "What you give up when you choose to buy something",
              "The cost of going to a store"
            ],
            correct: "What you give up when you choose to buy something",
            explanation: "Opportunity cost means when you spend money on one thing, you can't spend that same money on something else!"
          },
          {
            id: 6,
            question: "What is interest in banking?",
            options: [
              "How much you like the bank",
              "Extra money the bank pays you for saving",
              "The cost to use the bank",
              "Questions you ask the bank"
            ],
            correct: "Extra money the bank pays you for saving",
            explanation: "Interest is extra money the bank gives you as a reward for keeping your money saved there!"
          },
          {
            id: 7,
            question: "What does ATM stand for?",
            options: [
              "Always Take Money",
              "Automatic Teller Machine", 
              "All Time Money",
              "Ask The Manager"
            ],
            correct: "Automatic Teller Machine",
            explanation: "ATM stands for Automatic Teller Machine - it's a computer that helps you access your bank account!"
          },
          {
            id: 8,
            question: "Why is comparison shopping important?",
            options: [
              "To make friends with store owners",
              "To find the best prices and deals",
              "To visit more places",
              "To take more time shopping"
            ],
            correct: "To find the best prices and deals",
            explanation: "Comparison shopping helps you find the best prices so you can save money and get more value!"
          },
          {
            id: 9,
            question: "Which is better: 3 apples for $1.50 or 5 apples for $2.00?",
            options: [
              "3 apples for $1.50",
              "5 apples for $2.00",
              "They cost the same per apple",
              "Can't tell without more information"
            ],
            correct: "5 apples for $2.00",
            explanation: "5 apples for $2.00 = 40¢ per apple. 3 apples for $1.50 = 50¢ per apple. The first deal is better!"
          },
          {
            id: 10,
            question: "What's the most important reason to save money?",
            options: [
              "To show off to friends",
              "To prepare for future needs and wants",
              "To make banks happy",
              "To have heavy pockets"
            ],
            correct: "To prepare for future needs and wants",
            explanation: "Saving money helps you be prepared for future expenses and allows you to buy bigger things you really want!"
          }
        ],
        xpReward: 120
      }
    }
  };

  const currentLesson = lessonContent[grade as keyof typeof lessonContent]?.[module as keyof typeof lessonContent[3]] || lessonContent[3][1];

  const handleQuizAnswer = (questionId: number, answer: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const markVideoCompleted = async () => {
    if (!user) return;
    
    setVideoCompleted(true);
    await saveProgress(user.id, { video_completed: true, video_completed_at: new Date().toISOString() });
    toast.success("Video completed! You can now read the article.");
    setCurrentSection('article');
  };

  const markArticleCompleted = async () => {
    if (!user) return;
    
    setArticleCompleted(true);
    await saveProgress(user.id, { article_completed: true, article_completed_at: new Date().toISOString() });
    toast.success("Article completed! You can now take the quiz.");
    setCurrentSection('quiz');
  };

  const saveProgress = async (userId: string, progressUpdate: any) => {
    const { data: lesson } = await supabase
      .from('lessons')
      .select('id')
      .eq('grade_level', grade)
      .eq('module_number', module)
      .single();

    if (lesson) {
      const { error } = await supabase
        .from('lesson_progress')
        .upsert({
          user_id: userId,
          lesson_id: lesson.id,
          ...progressUpdate
        });

      if (error) {
        console.error('Error saving progress:', error);
      } else {
        setProgress(prev => ({ ...prev, ...progressUpdate }));
      }
    }
  };

  const submitQuiz = async () => {
    if (!user) return;
    
    let correctAnswers = 0;
    const totalQuestions = currentLesson.quiz.length;

    currentLesson.quiz.forEach(question => {
      if (quizAnswers[question.id] === question.correct) {
        correctAnswers++;
      }
    });

    const percentage = (correctAnswers / totalQuestions) * 100;
    const earnedXP = Math.floor((percentage / 100) * currentLesson.xpReward);
    
    setScore(percentage);
    setXpEarned(earnedXP);
    setQuizSubmitted(true);

    await saveProgress(user.id, { 
      quiz_completed: true, 
      quiz_score: percentage,
      xp_earned: earnedXP,
      quiz_attempts: progress.quiz_attempts ? progress.quiz_attempts + 1 : 1,
      completed_at: new Date().toISOString()
    });

    if (percentage >= 70) {
      toast.success(`🎉 Excellent! You earned ${earnedXP} XP and may have unlocked new badges!`);
      // Refresh badges to show any newly earned ones
      loadBadges(user.id);
    } else {
      toast.warning("Good try! Score 70% or higher to earn full XP. You can retake the quiz anytime.");
    }
  };

  const goBack = () => {
    navigate(`/education/grade/${grade}`);
  };

  const nextModule = () => {
    navigate(`/education/grade/${grade}/module/${module + 1}`);
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" onClick={goBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Grade {grade} Modules
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <Badge variant="outline">Grade {grade} - Module {module}</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {currentLesson.title}
            </span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Section Navigation */}
            <div className="flex gap-2 mb-6">
              <Button 
                variant={currentSection === 'video' ? 'default' : 'outline'}
                onClick={() => setCurrentSection('video')}
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Video
                {videoCompleted && <CheckCircle className="h-3 w-3 text-green-500" />}
              </Button>
              <Button 
                variant={currentSection === 'article' ? 'default' : 'outline'}
                onClick={() => setCurrentSection('article')}
                className="flex items-center gap-2"
                disabled={!videoCompleted}
              >
                <FileText className="h-4 w-4" />
                Article
                {articleCompleted && <CheckCircle className="h-3 w-3 text-green-500" />}
              </Button>
              <Button 
                variant={currentSection === 'quiz' ? 'default' : 'outline'}
                onClick={() => setCurrentSection('quiz')}
                className="flex items-center gap-2"
                disabled={!videoCompleted || !articleCompleted}
              >
                <HelpCircle className="h-4 w-4" />
                Quiz
                {quizSubmitted && <CheckCircle className="h-3 w-3 text-green-500" />}
              </Button>
            </div>

            {/* Video Section */}
            {currentSection === 'video' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    {currentLesson.videoTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src={currentLesson.videoUrl}
                      title={currentLesson.videoTitle}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Watch this educational video to learn about {currentLesson.title.toLowerCase()}. 
                      Once you've finished watching, click the button below to mark it complete and unlock the article!
                    </p>
                    {!videoCompleted && (
                      <Button 
                        onClick={markVideoCompleted}
                        className="w-full"
                        size="lg"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Video as Completed
                      </Button>
                    )}
                    {videoCompleted && (
                      <div className="flex items-center justify-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-green-700 font-semibold">Video Completed!</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Article Section */}
            {currentSection === 'article' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    {currentLesson.article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!videoCompleted && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Play className="h-5 w-5 text-orange-600" />
                        <span className="font-semibold text-orange-800">Complete the Video First</span>
                      </div>
                      <p className="text-orange-700 text-sm">
                        Please watch and mark the video as completed before reading the article.
                      </p>
                    </div>
                  )}
                  
                  {videoCompleted && (
                    <>
                      <div 
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: currentLesson.article.content }}
                      />
                      
                      {!articleCompleted && (
                        <div className="border-t pt-6">
                          <Button 
                            onClick={markArticleCompleted}
                            className="w-full"
                            size="lg"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark Article as Completed
                          </Button>
                        </div>
                      )}
                      
                      {articleCompleted && (
                        <div className="flex items-center justify-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-green-700 font-semibold">Article Completed!</span>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quiz Section */}
            {currentSection === 'quiz' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    Knowledge Check - 10 Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!videoCompleted || !articleCompleted ? (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-orange-600" />
                        <span className="font-semibold text-orange-800">Complete Prerequisites First</span>
                      </div>
                      <p className="text-orange-700 text-sm">
                        Please complete the video and article before taking the quiz.
                      </p>
                      <div className="flex justify-center gap-4 mt-3">
                        <div className="flex items-center gap-1">
                          {videoCompleted ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                          )}
                          <span className="text-sm">Video</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {articleCompleted ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                          )}
                          <span className="text-sm">Article</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {!quizSubmitted ? (
                        <>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-blue-800 text-sm text-center">
                              <strong>Quiz Instructions:</strong> Answer all 10 questions to earn XP. 
                              Score 70% or higher to earn the full XP reward!
                            </p>
                          </div>
                          
                          {currentLesson.quiz.map((question, index) => (
                            <div key={question.id} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                              <h3 className="font-semibold text-lg">
                                Question {index + 1}: {question.question}
                              </h3>
                              <div className="space-y-2">
                                {question.options.map((option, optionIndex) => (
                                  <label 
                                    key={optionIndex}
                                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-white cursor-pointer transition-colors"
                                  >
                                    <input
                                      type="radio"
                                      name={`question-${question.id}`}
                                      value={option}
                                      onChange={() => handleQuizAnswer(question.id, option)}
                                      className="text-primary w-4 h-4"
                                    />
                                    <span className="text-foreground">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                          
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-4">
                              Questions answered: {Object.keys(quizAnswers).length} / {currentLesson.quiz.length}
                            </p>
                            <Button 
                              onClick={submitQuiz}
                              disabled={Object.keys(quizAnswers).length < currentLesson.quiz.length}
                              className="w-full"
                              size="lg"
                            >
                              Submit Quiz ({currentLesson.quiz.length} Questions)
                            </Button>
                          </div>
                         </>
                       ) : (
                         <div className="text-center space-y-6">
                           <div className="space-y-4">
                             <div className="text-6xl">{score >= 70 ? '🎉' : '📚'}</div>
                             <h3 className="text-2xl font-bold">
                               {score >= 70 ? 'Excellent Work!' : 'Keep Learning!'}
                             </h3>
                             <div className="text-xl">
                               Score: {score.toFixed(0)}% ({xpEarned} XP earned)
                             </div>
                           </div>

                           {/* Quiz Results */}
                           <div className="space-y-4 text-left">
                             {currentLesson.quiz.map((question, index) => {
                               const userAnswer = quizAnswers[question.id];
                               const isCorrect = userAnswer === question.correct;
                               
                               return (
                                 <div key={question.id} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                   <div className="flex items-center gap-2 mb-2">
                                     {isCorrect ? (
                                       <CheckCircle className="h-5 w-5 text-green-500" />
                                     ) : (
                                       <div className="h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">×</div>
                                     )}
                                     <span className="font-semibold">{index + 1}. {question.question}</span>
                                   </div>
                                   {!isCorrect && (
                                     <>
                                       <p className="text-sm text-red-700 mb-1">Your answer: {userAnswer}</p>
                                       <p className="text-sm text-green-700 mb-1">Correct answer: {question.correct}</p>
                                     </>
                                   )}
                                   <p className="text-sm text-muted-foreground">{question.explanation}</p>
                                 </div>
                               );
                             })}
                           </div>

                           <div className="flex gap-4 justify-center">
                             <Button 
                               onClick={() => {
                                 setQuizSubmitted(false);
                                 setQuizAnswers({});
                                 setScore(0);
                                 setXpEarned(0);
                               }}
                               variant="outline"
                             >
                               Retake Quiz
                             </Button>
                             <Button onClick={nextModule}>
                               Next Module
                               <ArrowRight className="h-4 w-4 ml-2" />
                             </Button>
                           </div>
                         </div>
                       )}
                     </>
                   )}
                 </CardContent>
               </Card>
             )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Module Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">📚</div>
                  <h3 className="font-bold">Module {module}</h3>
                  <p className="text-sm text-muted-foreground">{currentLesson.title}</p>
                </div>

                <div className="space-y-3">
                  <div className={`flex items-center gap-2 p-2 rounded-lg ${videoCompleted ? 'bg-green-50 border border-green-200' : 'bg-primary/10'}`}>
                    <Play className={`h-4 w-4 ${videoCompleted ? 'text-green-600' : 'text-primary'}`} />
                    <span className="text-sm flex-1">Watch Video</span>
                    {videoCompleted ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                    )}
                  </div>
                  <div className={`flex items-center gap-2 p-2 rounded-lg ${articleCompleted ? 'bg-green-50 border border-green-200' : 'bg-primary/10'}`}>
                    <FileText className={`h-4 w-4 ${articleCompleted ? 'text-green-600' : 'text-primary'}`} />
                    <span className="text-sm flex-1">Read Article</span>
                    {articleCompleted ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                    )}
                  </div>
                  <div className={`flex items-center gap-2 p-2 rounded-lg ${quizSubmitted ? 'bg-green-50 border border-green-200' : 'bg-primary/10'}`}>
                    <HelpCircle className={`h-4 w-4 ${quizSubmitted ? 'text-green-600' : 'text-primary'}`} />
                    <span className="text-sm flex-1">Complete Quiz (10 questions)</span>
                    {quizSubmitted ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                    )}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Potential XP</span>
                    <span className="text-sm font-bold text-primary">{currentLesson.xpReward}</span>
                  </div>
                  {quizSubmitted && (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Quiz Score</span>
                        <span className="text-sm font-bold">{score.toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">XP Earned</span>
                        <span className="text-sm font-bold text-green-600">{xpEarned}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Complete video → article → quiz to earn XP and unlock badges!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Badges Section */}
            {badges.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Your Badges ({badges.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {badges.slice(0, 4).map((badge, index) => (
                      <div key={index} className="text-center p-2 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border">
                        <div className="text-2xl mb-1">{badge.icon}</div>
                        <div className="text-xs font-semibold">{badge.name}</div>
                        <div className="text-xs text-muted-foreground">{badge.xp_required} XP</div>
                      </div>
                    ))}
                  </div>
                  {badges.length > 4 && (
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      +{badges.length - 4} more badges
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;