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
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

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

  // Sample lesson content - in a real app, this would come from an API
  const lessonContent = {
    3: {
      1: {
        title: "What is Money?",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Sample video
        videoTitle: "Introduction to Money for Kids",
        article: {
          title: "Understanding Money: The Basics",
          content: `
            <h2>What is Money?</h2>
            <p>Money is something we use to buy things we need and want. Long ago, people traded things with each other - like trading apples for bread. But this was hard to do!</p>
            
            <h3>Types of Money</h3>
            <p>Today, we have different types of money:</p>
            <ul>
              <li><strong>Coins</strong> - Round pieces of metal like pennies, nickels, dimes, and quarters</li>
              <li><strong>Bills</strong> - Paper money like $1, $5, $10, and $20 bills</li>
              <li><strong>Digital Money</strong> - Money stored on computers and phones</li>
            </ul>
            
            <h3>Why Do We Need Money?</h3>
            <p>Money makes it easy to:</p>
            <ul>
              <li>Buy food, clothes, and toys</li>
              <li>Pay for services like haircuts</li>
              <li>Save for things we want later</li>
              <li>Help others by donating to charity</li>
            </ul>
            
            <h3>Fun Fact!</h3>
            <p>The first coins were made over 2,500 years ago! They were made from a mixture of gold and silver.</p>
          `
        },
        quiz: [
          {
            id: 1,
            question: "What is money used for?",
            options: ["Only buying toys", "Only buying food", "Buying things we need and want", "Only saving"],
            correct: "Buying things we need and want",
            explanation: "Money is used to buy all sorts of things we need (like food) and want (like toys)!"
          },
          {
            id: 2,
            question: "Which of these is NOT a type of money?",
            options: ["Coins", "Bills", "Rocks", "Digital money"],
            correct: "Rocks",
            explanation: "While people used to trade with objects like rocks, today we use coins, bills, and digital money!"
          },
          {
            id: 3,
            question: "What came before money?",
            options: ["Trading things with each other", "Credit cards", "Banks", "Computers"],
            correct: "Trading things with each other",
            explanation: "Before money, people traded items directly - like apples for bread!"
          }
        ],
        xpReward: 50
      }
    },
    4: {
      1: {
        title: "Money Review",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        videoTitle: "Advanced Money Concepts for Grade 4",
        article: {
          title: "Building on Money Basics",
          content: `
            <h2>Review: What We Know About Money</h2>
            <p>Let's review what we learned about money and add some new ideas!</p>
            
            <h3>Money's Jobs</h3>
            <p>Money has three main jobs:</p>
            <ul>
              <li><strong>Medium of Exchange</strong> - We use it to buy things</li>
              <li><strong>Unit of Account</strong> - We measure value with it</li>
              <li><strong>Store of Value</strong> - We can save it for later</li>
            </ul>
            
            <h3>Different Forms of Money</h3>
            <p>Money comes in many forms:</p>
            <ul>
              <li><strong>Cash</strong> - Coins and bills we can touch</li>
              <li><strong>Checks</strong> - Written orders to pay money</li>
              <li><strong>Debit Cards</strong> - Cards connected to bank accounts</li>
              <li><strong>Online Money</strong> - Digital payments and transfers</li>
            </ul>
            
            <h3>Money and Math</h3>
            <p>Understanding money helps us with math! We can:</p>
            <ul>
              <li>Add up the cost of multiple items</li>
              <li>Calculate change when paying</li>
              <li>Compare prices to find better deals</li>
              <li>Figure out how much we can save</li>
            </ul>
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
            explanation: "Money's three jobs are: helping us trade (medium of exchange), measuring value (unit of account), and saving (store of value)!"
          },
          {
            id: 2,
            question: "Which form of money is connected to a bank account?",
            options: ["Cash", "Debit card", "Coins", "Paper money"],
            correct: "Debit card",
            explanation: "A debit card is connected to your bank account and uses money you already have!"
          }
        ],
        xpReward: 60
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

  const submitQuiz = () => {
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

    // Save progress
    const savedProgress = localStorage.getItem('financialEducationProgress') || '{}';
    const progress = JSON.parse(savedProgress);
    
    if (!progress[grade]) {
      progress[grade] = { completedModules: [], totalXP: 0 };
    }

    if (!progress[grade].completedModules.includes(module)) {
      progress[grade].completedModules.push(module);
      progress[grade].totalXP += earnedXP;
      localStorage.setItem('financialEducationProgress', JSON.stringify(progress));
    }

    if (percentage >= 70) {
      toast.success(`🎉 Great job! You earned ${earnedXP} XP!`);
    } else {
      toast.warning("Keep practicing! You can retake the quiz anytime.");
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
              </Button>
              <Button 
                variant={currentSection === 'article' ? 'default' : 'outline'}
                onClick={() => setCurrentSection('article')}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Article
              </Button>
              <Button 
                variant={currentSection === 'quiz' ? 'default' : 'outline'}
                onClick={() => setCurrentSection('quiz')}
                className="flex items-center gap-2"
              >
                <HelpCircle className="h-4 w-4" />
                Quiz
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
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Play className="h-16 w-16 mx-auto mb-4 text-primary" />
                      <p className="text-lg font-semibold">Educational Video</p>
                      <p className="text-sm text-muted-foreground">
                        In a real application, this would embed the educational video
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Video URL: {currentLesson.videoUrl}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Watch this video to learn about {currentLesson.title.toLowerCase()}. 
                    After watching, read the article and take the quiz to earn XP!
                  </p>
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
                <CardContent>
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: currentLesson.article.content }}
                  />
                </CardContent>
              </Card>
            )}

            {/* Quiz Section */}
            {currentSection === 'quiz' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    Knowledge Check
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!quizSubmitted ? (
                    <>
                      {currentLesson.quiz.map((question, index) => (
                        <div key={question.id} className="space-y-3">
                          <h3 className="font-semibold">
                            {index + 1}. {question.question}
                          </h3>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <label 
                                key={optionIndex}
                                className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name={`question-${question.id}`}
                                  value={option}
                                  onChange={() => handleQuizAnswer(question.id, option)}
                                  className="text-primary"
                                />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        onClick={submitQuiz}
                        disabled={Object.keys(quizAnswers).length < currentLesson.quiz.length}
                        className="w-full"
                        size="lg"
                      >
                        Submit Quiz
                      </Button>
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
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
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
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/10">
                    <Play className="h-4 w-4 text-primary" />
                    <span className="text-sm">Watch Video</span>
                    <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/10">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm">Read Article</span>
                    <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/10">
                    <HelpCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Complete Quiz</span>
                    {quizSubmitted ? (
                      <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-gray-300 rounded-full ml-auto" />
                    )}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Potential XP</span>
                    <span className="text-sm font-bold text-primary">{currentLesson.xpReward}</span>
                  </div>
                  {quizSubmitted && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm">XP Earned</span>
                      <span className="text-sm font-bold text-green-600">{xpEarned}</span>
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Complete all three sections to earn maximum XP and unlock the next module!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;