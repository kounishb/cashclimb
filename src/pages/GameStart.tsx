import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen,
  Home,
  Star,
  Trophy,
  Users,
  GraduationCap,
  Target,
  Coins,
  Lock,
  CheckCircle,
  Calendar
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const GameStart = () => {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState(3);
  const [userProgress, setUserProgress] = useState<{[key: number]: {completedModules: number[], totalXP: number}}>({});

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('financialEducationProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setUserProgress(progress);
    }
  }, []);

  // Generate grade levels with their curriculum
  const grades = [
    {
      grade: 3,
      title: "Money Explorers",
      description: "Discover what money is and why we need it",
      color: "bg-green-500",
      moduleCount: 12,
      topics: ["What is money?", "Coins and bills", "Earning money", "Needs vs wants", "Spending choices"],
      skills: ["Basic money recognition", "Simple counting", "Making choices"]
    },
    {
      grade: 4,
      title: "Smart Spenders",
      description: "Learn to make smart spending decisions",
      color: "bg-blue-500", 
      moduleCount: 14,
      topics: ["Saving money", "Making a budget", "Comparing prices", "Money goals", "Bank basics"],
      skills: ["Basic budgeting", "Goal setting", "Price comparison"]
    },
    {
      grade: 5,
      title: "Future Planners",
      description: "Start planning for your financial future",
      color: "bg-purple-500",
      moduleCount: 16,
      topics: ["Long-term saving", "Interest basics", "Job types", "Banking", "Financial goals"],
      skills: ["Saving strategies", "Understanding interest", "Career awareness"]
    },
    {
      grade: 6,
      title: "Money Managers",
      description: "Manage money like a pro",
      color: "bg-orange-500",
      moduleCount: 18,
      topics: ["Credit basics", "Debt understanding", "Investment intro", "Entrepreneurship", "Digital money"],
      skills: ["Credit awareness", "Risk assessment", "Basic investing"]
    },
    {
      grade: 7,
      title: "Financial Strategists",
      description: "Develop sophisticated financial strategies",
      color: "bg-red-500",
      moduleCount: 20,
      topics: ["Advanced budgeting", "Tax basics", "Insurance", "Scam protection", "Economic concepts"],
      skills: ["Strategic planning", "Risk management", "Economic thinking"]
    },
    {
      grade: 8,
      title: "Finance Masters",
      description: "Master advanced financial concepts",
      color: "bg-indigo-500",
      moduleCount: 22,
      topics: ["Investment strategies", "College planning", "Career prep", "Advanced economics", "Global finance"],
      skills: ["Investment analysis", "Long-term planning", "Global awareness"]
    }
  ].map(grade => {
    const progress = userProgress[grade.grade] || { completedModules: [], totalXP: 0 };
    return {
      ...grade,
      completedModules: progress.completedModules.length,
      totalXP: progress.totalXP
    };
  });

  const selectGrade = (grade: number) => {
    navigate(`/education/grade/${grade}`);
  };

  const selectedGradeData = grades.find(g => g.grade === selectedGrade);

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
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Financial Literacy Academy
              </span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Comprehensive financial education curriculum for grades 3-8 📚
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Grade Selection */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Select Your Grade Level</h2>
              <p className="text-muted-foreground">
                Choose your grade to access age-appropriate financial curriculum
              </p>
            </div>

            <div className="grid gap-6 mb-8">
              {grades.map((grade) => (
                <Card
                  key={grade.grade}
                  className={`cursor-pointer transition-all duration-300 border-2 hover:border-primary/50 hover:shadow-lg`}
                  onClick={() => selectGrade(grade.grade)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${grade.color}`}>
                          <GraduationCap className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">Grade {grade.grade}</h3>
                          <h4 className="text-lg font-semibold text-primary">{grade.title}</h4>
                          <p className="text-muted-foreground">{grade.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">
                          {grade.moduleCount} Modules
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          {grade.completedModules}/{grade.moduleCount} Complete
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold mb-2">Key Topics:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {grade.topics.slice(0, 3).map((topic, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Star className="h-3 w-3 text-primary" />
                              {topic}
                            </li>
                          ))}
                          {grade.topics.length > 3 && (
                            <li className="text-xs text-muted-foreground">
                              +{grade.topics.length - 3} more topics
                            </li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Skills Developed:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {grade.skills.map((skill, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Target className="h-3 w-3 text-secondary" />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">{grade.totalXP} XP Earned</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-secondary" />
                          <span className="text-sm">Full School Year</span>
                        </div>
                      </div>
                      <Progress 
                        value={(grade.completedModules / grade.moduleCount) * 100} 
                        className="w-32 h-2" 
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Information Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  About Our Program
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎓</div>
                  <h3 className="text-lg font-bold mb-2">
                    Comprehensive Financial Education
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Age-appropriate curriculum designed for classroom use
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      For Educators
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Standards-aligned lessons with assessment tools and progress tracking
                    </p>
                  </div>

                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      For Students
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Interactive videos, articles, and quizzes that make learning fun
                    </p>
                  </div>

                  <div className="p-4 bg-accent/10 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Trophy className="h-4 w-4" />
                      Track Progress
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Earn XP for correct answers and track completion rates
                    </p>
                  </div>
                </div>

                {/* Overall Stats */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Platform Overview</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Modules:</span>
                      <span className="text-sm font-bold">
                        {grades.reduce((sum, grade) => sum + grade.moduleCount, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Grade Levels:</span>
                      <span className="text-sm font-bold">6 (3rd-8th)</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-primary">
                        <GraduationCap className="h-4 w-4" />
                        <span className="font-bold">Full School Year Curriculum</span>
                      </div>
                    </div>
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

export default GameStart;