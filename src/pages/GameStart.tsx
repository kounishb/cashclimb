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
import { supabase } from "@/integrations/supabase/client";

const GameStart = () => {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState(3);
  const [userProgress, setUserProgress] = useState<{[key: number]: {completedModules: number[], totalXP: number}}>({});
  const [user, setUser] = useState<any>(null);

  // Load progress from Supabase if authenticated, otherwise localStorage
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        await loadProgressFromSupabase(user.id);
      } else {
        loadProgressFromLocalStorage();
      }
    };
    getUser();
  }, []);

  // Refresh progress when page becomes visible (user returns from completing modules)
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!document.hidden && user) {
        await loadProgressFromSupabase(user.id);
      }
    };

    const handleFocus = async () => {
      if (user) {
        await loadProgressFromSupabase(user.id);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [user]);

  const loadProgressFromSupabase = async (userId: string) => {
    try {
      const progress: {[key: number]: {completedModules: number[], totalXP: number}} = {};
      
      // Load progress for each grade
      for (let grade = 3; grade <= 8; grade++) {
        // Get lessons for this grade to filter completed modules
        const { data: lessons } = await supabase
          .from('lessons')
          .select('id, module_number')
          .eq('grade_level', grade);

        let completedModuleNumbers: number[] = [];
        let totalXpEarned = 0;

        if (lessons) {
          const lessonIds = lessons.map(l => l.id);
          
          // Get XP from lesson_progress table
          const { data: progressData } = await supabase
            .from('lesson_progress')
            .select('xp_earned')
            .eq('user_id', userId)
            .in('lesson_id', lessonIds);

          if (progressData) {
            totalXpEarned = progressData.reduce((sum, p) => sum + (p.xp_earned || 0), 0);
          }

        // Get completed modules for this specific grade
        const { data: gameProgress } = await supabase
          .from('game_progress')
          .select('module_id, completed')
          .eq('user_id', userId)
          .eq('grade_level', grade)
          .eq('completed', true);

          completedModuleNumbers = gameProgress ? gameProgress.map(gp => gp.module_id) : [];
        }
        
        progress[grade] = {
          completedModules: completedModuleNumbers,
          totalXP: totalXpEarned
        };
      }
      
      setUserProgress(progress);
      // Also update localStorage for consistency
      localStorage.setItem('financialEducationProgress', JSON.stringify(progress));
    } catch (error) {
      console.error('Error loading progress from Supabase:', error);
      // Fallback to localStorage
      loadProgressFromLocalStorage();
    }
  };

  const loadProgressFromLocalStorage = () => {
    const savedProgress = localStorage.getItem('financialEducationProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setUserProgress(progress);
    }
  };

  // Generate grade levels with their curriculum
  const grades = [
    {
      grade: 3,
      color: "bg-green-500",
      moduleCount: 12,
      topics: ["What is money?", "Coins and bills", "Earning money", "Needs vs wants", "Spending choices"],
      skills: ["Basic money recognition", "Simple counting", "Making choices"]
    },
    {
      grade: 4,
      color: "bg-blue-500", 
      moduleCount: 14,
      topics: ["Saving money", "Making a budget", "Comparing prices", "Money goals", "Bank basics"],
      skills: ["Basic budgeting", "Goal setting", "Price comparison"]
    },
    {
      grade: 5,
      color: "bg-purple-500",
      moduleCount: 16,
      topics: ["Long-term saving", "Interest basics", "Job types", "Banking", "Financial goals"],
      skills: ["Saving strategies", "Understanding interest", "Career awareness"]
    },
    {
      grade: 6,
      color: "bg-orange-500",
      moduleCount: 18,
      topics: ["Credit basics", "Debt understanding", "Investment intro", "Entrepreneurship", "Digital money"],
      skills: ["Credit awareness", "Risk assessment", "Basic investing"]
    },
    {
      grade: 7,
      color: "bg-red-500",
      moduleCount: 20,
      topics: ["Advanced budgeting", "Tax basics", "Insurance", "Scam protection", "Economic concepts"],
      skills: ["Strategic planning", "Risk management", "Economic thinking"]
    },
    {
      grade: 8,
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
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              Cash Climb Dashboard
            </h1>
          </div>
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/curriculum/${grade.grade}?from=dashboard`);
                          }}
                        >
                          View Curriculum
                        </Button>
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
              <CardContent className="space-y-6 p-6">

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStart;