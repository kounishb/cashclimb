import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Target, Clock, Trophy, CheckCircle, Video, FileText, Brain } from "lucide-react";

const Curriculum = () => {
  const { gradeId } = useParams();
  const navigate = useNavigate();
  const grade = parseInt(gradeId || "3");

  const curriculumData = {
    3: {
      title: "Grade 3 Financial Literacy Curriculum",
      overview: "Introduce young learners to the basics of money, spending, and saving through engaging activities and real-world examples.",
      duration: "Full Academic Year (36 weeks)",
      totalModules: 12,
      objectives: [
        "Understand what money is and its purpose",
        "Learn the difference between needs and wants", 
        "Develop basic saving habits",
        "Practice counting and using money safely",
        "Explore the concept of earning money through work"
      ],
      units: [
        {
          title: "Unit 1: Money Fundamentals",
          modules: ["What is Money?", "Earning Money"],
          skills: ["Money identification", "Understanding value", "Basic earning concepts"]
        },
        {
          title: "Unit 2: Smart Decision Making",
          modules: ["Needs vs Wants", "Spending Choices"],
          skills: ["Decision making", "Priority setting", "Impulse control"]
        },
        {
          title: "Unit 3: Saving & Counting",
          modules: ["Saving Basics", "Counting Money", "Shopping Smart"],
          skills: ["Basic math skills", "Goal setting", "Comparison shopping"]
        },
        {
          title: "Unit 4: Money in Our World",
          modules: ["Money Safety", "Sharing Money", "Money Around the World"],
          skills: ["Safety awareness", "Social responsibility", "Cultural awareness"]
        },
        {
          title: "Unit 5: Planning & Review",
          modules: ["Future Money Goals", "Money Review"],
          skills: ["Future planning", "Review and synthesis", "Goal achievement"]
        }
      ]
    },
    4: {
      title: "Grade 4 Financial Literacy Curriculum",
      overview: "Build on foundational concepts with budgeting basics, banking introduction, and enhanced decision-making skills.",
      duration: "Full Academic Year (36 weeks)",
      totalModules: 14,
      objectives: [
        "Create and manage a simple budget",
        "Understand basic banking concepts",
        "Learn about interest and money growth",
        "Develop entrepreneurial thinking",
        "Practice digital money safety"
      ],
      units: [
        {
          title: "Unit 1: Financial Foundation",
          modules: ["Money Review", "Making a Budget"],
          skills: ["Reinforcement", "Budget creation", "Income tracking"]
        },
        {
          title: "Unit 2: Banking & Savings",
          modules: ["Saving Strategies", "Bank Basics", "Interest Introduction"],
          skills: ["Advanced saving", "Banking systems", "Interest concepts"]
        },
        {
          title: "Unit 3: Smart Consumer Skills",
          modules: ["Comparing Prices", "Goal Setting", "Consumer Awareness"],
          skills: ["Price analysis", "SMART goals", "Consumer protection"]
        },
        {
          title: "Unit 4: Entrepreneurship & Ethics",
          modules: ["Entrepreneurship Basics", "Digital Money", "Money Ethics"],
          skills: ["Business thinking", "Digital literacy", "Ethical behavior"]
        },
        {
          title: "Unit 5: Advanced Concepts",
          modules: ["Money Mistakes", "Advanced Saving", "Grade 4 Mastery"],
          skills: ["Problem solving", "Advanced planning", "Comprehensive review"]
        }
      ]
    },
    5: {
      title: "Grade 5 Financial Literacy Curriculum", 
      overview: "Explore career planning, advanced budgeting, investment basics, and economic systems understanding.",
      duration: "Full Academic Year (36 weeks)",
      totalModules: 16,
      objectives: [
        "Connect education to future career opportunities",
        "Master comprehensive budgeting techniques",
        "Understand credit and debt concepts",
        "Learn investment and economic fundamentals",
        "Develop long-term financial planning skills"
      ],
      units: [
        {
          title: "Unit 1: Career & Budget Planning",
          modules: ["Financial Foundation Review", "Career Exploration", "Advanced Budgeting"],
          skills: ["Career awareness", "Complex budgeting", "Future planning"]
        },
        {
          title: "Unit 2: Banking & Credit Systems",
          modules: ["Banking Services", "Interest and Growth", "Credit Introduction"],
          skills: ["Banking mastery", "Compound interest", "Credit awareness"]
        },
        {
          title: "Unit 3: Investment & Business",
          modules: ["Debt Awareness", "Investment Basics", "Business Fundamentals"],
          skills: ["Risk assessment", "Investment principles", "Business understanding"]
        },
        {
          title: "Unit 4: Economic Understanding",
          modules: ["Economic Systems", "Financial Planning", "Consumer Protection"],
          skills: ["Economic literacy", "Long-term planning", "Consumer rights"]
        },
        {
          title: "Unit 5: Global & Future Finance",
          modules: ["Global Finance", "Technology and Money", "Money Psychology", "Grade 5 Mastery Test"],
          skills: ["Global awareness", "Tech literacy", "Behavioral understanding"]
        }
      ]
    },
    6: {
      title: "Grade 6 Financial Literacy Curriculum",
      overview: "Develop sophisticated financial management skills including credit systems, insurance, taxes, and complex investment strategies.",
      duration: "Full Academic Year (36 weeks)",
      totalModules: 18,
      objectives: [
        "Master advanced career and education planning",
        "Understand complex credit and debt management",
        "Learn comprehensive investment strategies",
        "Explore insurance and tax concepts",
        "Develop ethical financial decision-making"
      ],
      units: [
        {
          title: "Unit 1: Advanced Foundations",
          modules: ["Financial Literacy Foundation", "Advanced Career Planning", "Complex Budgeting"],
          skills: ["Advanced review", "Career ROI analysis", "Sophisticated budgeting"]
        },
        {
          title: "Unit 2: Credit & Banking Mastery",
          modules: ["Banking Mastery", "Credit Systems", "Debt Management"],
          skills: ["Banking expertise", "Credit building", "Debt strategies"]
        },
        {
          title: "Unit 3: Investment & Business",
          modules: ["Investment Strategies", "Entrepreneurship", "Insurance Basics"],
          skills: ["Portfolio management", "Business startup", "Risk protection"]
        },
        {
          title: "Unit 4: Advanced Financial Systems",
          modules: ["Tax Introduction", "Economic Analysis", "Digital Finance"],
          skills: ["Tax understanding", "Market analysis", "Digital security"]
        },
        {
          title: "Unit 5: Ethics & Global Finance",
          modules: ["Financial Ethics", "Global Economics", "Future Finance"],
          skills: ["Ethical investing", "Global markets", "Future trends"]
        },
        {
          title: "Unit 6: Capstone & Communication",
          modules: ["Real World Application", "Financial Communication", "Grade 6 Capstone"],
          skills: ["Practical application", "Communication skills", "Comprehensive mastery"]
        }
      ]
    },
    7: {
      title: "Grade 7 Financial Literacy Curriculum",
      overview: "Master advanced investment strategies, college financial planning, business finance, and professional-level economic analysis.",
      duration: "Full Academic Year (36 weeks)",
      totalModules: 20,
      objectives: [
        "Plan comprehensively for college and career costs",
        "Master advanced investment and tax strategies",
        "Understand business finance and real estate",
        "Develop professional-level economic analysis skills",
        "Learn financial leadership and communication"
      ],
      units: [
        {
          title: "Unit 1: Advanced Foundation & College Planning",
          modules: ["Advanced Financial Review", "College Financial Planning", "Advanced Investment"],
          skills: ["Complex scenarios", "College cost analysis", "Advanced investing"]
        },
        {
          title: "Unit 2: Tax & Insurance Strategy",
          modules: ["Tax Strategy", "Insurance Strategy", "Advanced Credit"],
          skills: ["Tax optimization", "Risk portfolio", "Credit mastery"]
        },
        {
          title: "Unit 3: Business & Real Estate",
          modules: ["Business Finance", "Real Estate Basics", "Retirement Planning"],
          skills: ["Business analysis", "Property investment", "Retirement strategy"]
        },
        {
          title: "Unit 4: Economic & Global Systems",
          modules: ["Economic Policy", "International Finance", "Financial Technology"],
          skills: ["Policy analysis", "Global investing", "Fintech understanding"]
        },
        {
          title: "Unit 5: Psychology & Risk Management",
          modules: ["Behavioral Finance", "Risk Management", "Financial Planning Process"],
          skills: ["Behavioral awareness", "Risk modeling", "Comprehensive planning"]
        },
        {
          title: "Unit 6: Advanced Economics & Leadership",
          modules: ["Advanced Economics", "Ethical Finance", "Financial Communication", "Case Study Analysis", "Grade 7 Mastery Portfolio"],
          skills: ["Economic forecasting", "ESG principles", "Professional communication", "Leadership skills"]
        }
      ]
    },
    8: {
      title: "Grade 8 Financial Literacy Curriculum",
      overview: "Achieve mastery in advanced financial concepts including portfolio theory, corporate finance, quantitative analysis, and professional leadership.",
      duration: "Full Academic Year (36 weeks)",
      totalModules: 22,
      objectives: [
        "Master modern portfolio theory and advanced investment strategies",
        "Understand corporate finance and financial markets",
        "Apply quantitative analysis and financial modeling",
        "Develop professional-level financial leadership skills",
        "Prepare for advanced high school economics and finance courses"
      ],
      units: [
        {
          title: "Unit 1: Mastery Foundation",
          modules: ["Financial Mastery Foundation", "Advanced Portfolio Management", "Financial Markets"],
          skills: ["Professional concepts", "Portfolio theory", "Market structure"]
        },
        {
          title: "Unit 2: Corporate & Alternative Finance",
          modules: ["Corporate Finance", "Advanced Tax Planning", "Alternative Investments"],
          skills: ["Corporate analysis", "Tax strategies", "Alternative assets"]
        },
        {
          title: "Unit 3: Derivatives & International Markets",
          modules: ["Financial Derivatives", "International Finance", "Advanced Real Estate"],
          skills: ["Risk hedging", "Currency markets", "Real estate analysis"]
        },
        {
          title: "Unit 4: Technology & Quantitative Analysis",
          modules: ["Retirement Strategies", "Financial Technology Innovation", "Quantitative Finance"],
          skills: ["Advanced planning", "Fintech innovation", "Statistical modeling"]
        },
        {
          title: "Unit 5: Behavioral & Regulatory Finance",
          modules: ["Behavioral Economics", "Regulatory Environment", "Advanced Economic Theory"],
          skills: ["Psychology application", "Compliance understanding", "Economic modeling"]
        },
        {
          title: "Unit 6: Innovation & Leadership",
          modules: ["Financial Innovation", "Professional Ethics", "Financial Leadership"],
          skills: ["Innovation analysis", "Professional standards", "Leadership development"]
        },
        {
          title: "Unit 7: Capstone & Certification",
          modules: ["Industry Analysis", "Capstone Consulting Project", "Peer Teaching Workshop", "Master's Certification"],
          skills: ["Industry expertise", "Professional presentation", "Teaching ability", "Comprehensive mastery"]
        }
      ]
    }
  };

  const currentCurriculum = curriculumData[grade as keyof typeof curriculumData];

  const goBack = () => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" onClick={goBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <Badge variant="outline">Curriculum Overview</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {currentCurriculum.title}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {currentCurriculum.overview}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{currentCurriculum.duration}</div>
              <div className="text-sm text-muted-foreground">Duration</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{currentCurriculum.totalModules}</div>
              <div className="text-sm text-muted-foreground">Learning Modules</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{currentCurriculum.objectives.length}</div>
              <div className="text-sm text-muted-foreground">Learning Objectives</div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Objectives */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Learning Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {currentCurriculum.objectives.map((objective, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{objective}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Curriculum Units */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Curriculum Structure</h2>
          {currentCurriculum.units.map((unit, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-lg">{unit.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Learning Modules
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {unit.modules.map((module, moduleIndex) => (
                      <Badge key={moduleIndex} variant="secondary">
                        {module}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Key Skills Developed
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {unit.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Learning Methodology */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Learning Methodology</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Video className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Educational Videos</h4>
                <p className="text-sm text-muted-foreground">Engaging video content that explains concepts clearly and provides real-world examples.</p>
              </div>
              <div className="text-center">
                <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Interactive Articles</h4>
                <p className="text-sm text-muted-foreground">In-depth articles that reinforce video learning with detailed explanations and case studies.</p>
              </div>
              <div className="text-center">
                <Brain className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Knowledge Quizzes</h4>
                <p className="text-sm text-muted-foreground">Comprehensive 10-question quizzes that test understanding and retention of key concepts.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Curriculum;