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
  Clock,
  ExternalLink
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
    // Reset all progress states when navigating to a new module
    setCurrentSection('video');
    setQuizAnswers({});
    setQuizSubmitted(false);
    setScore(0);
    setXpEarned(0);
    setVideoCompleted(false);
    setArticleCompleted(false);
    setProgress({ video_completed: false, article_completed: false, quiz_completed: false, quiz_attempts: 0 });
    
    // Scroll to top when navigating to new module
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
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

  // Comprehensive educational content for all grades and modules
  const lessonContent = {
    3: {
      1: {
        title: "What is Money?",
        videoUrl: "https://www.youtube.com/embed/JcvnWeDwTeg",
        videoLink: "https://www.youtube.com/watch?v=JcvnWeDwTeg",
        videoTitle: "Grade 3: What Is Money? - Personal Finance for Kids",
        article: {
          title: "Understanding Money: The Complete Guide for Young Learners",
          content: `
            <h2>What is Money? A Complete Introduction for Young Learners</h2>
            <p>Money is one of the most important inventions in human history! It's a special tool that makes our lives easier by helping people trade and exchange goods and services. Without money, life would be much more complicated and difficult.</p>
            
            <h3>The History of Money</h3>
            <p>Long, long ago, people didn't have money at all. Instead, they used something called the "barter system." This meant that if you wanted something, you had to trade something else for it directly. For example, if a farmer wanted shoes, they might have to trade a bag of wheat directly to a shoemaker. But what if the shoemaker didn't want wheat? What if they wanted milk instead? The farmer would then have to find someone who had milk and wanted wheat, trade the wheat for milk, and then trade the milk for shoes. As you can imagine, this was very complicated and time-consuming!</p>
            
            <p>Over thousands of years, people tried using different things as money. Some cultures used shells, others used stones, and some even used cattle or salt! The word "salary" actually comes from the Latin word for salt because Roman soldiers were sometimes paid in salt. Eventually, people discovered that metals like gold and silver worked best as money because they were:</p>
            <ul>
              <li>Durable (they didn't break or rot)</li>
              <li>Portable (easy to carry around)</li>
              <li>Divisible (could be broken into smaller pieces)</li>
              <li>Rare enough to be valuable</li>
              <li>Widely accepted by everyone</li>
            </ul>
            
            <h3>Types of Money We Use Today</h3>
            <p>In our modern world, we use several different types of money, and it's important to understand each one:</p>
            
            <h4>Physical Money (Cash)</h4>
            <ul>
              <li><strong>Coins</strong> - These are made of metal and include:
                <ul>
                  <li>Pennies (1¢) - The smallest value, made mostly of zinc with a copper coating</li>
                  <li>Nickels (5¢) - Worth 5 pennies, made of nickel and copper</li>
                  <li>Dimes (10¢) - Worth 10 pennies, the smallest coin in size but not in value</li>
                  <li>Quarters (25¢) - Worth 25 pennies, very commonly used for purchases</li>
                  <li>Half dollars (50¢) and dollar coins - Less common but still legal money</li>
                </ul>
              </li>
              <li><strong>Bills (Paper Money)</strong> - Made of special cotton and linen paper that's very durable:
                <ul>
                  <li>$1 bill - Features George Washington, the first U.S. President</li>
                  <li>$5 bill - Features Abraham Lincoln</li>
                  <li>$10 bill - Features Alexander Hamilton</li>
                  <li>$20 bill - Features Andrew Jackson</li>
                  <li>Higher denominations like $50 and $100 bills exist too</li>
                </ul>
              </li>
            </ul>
            
            <h4>Digital Money</h4>
            <p>Most money today actually exists digitally - as numbers in computer systems rather than physical objects you can hold:</p>
            <ul>
              <li><strong>Bank Account Money</strong> - Money stored electronically in banks</li>
              <li><strong>Credit and Debit Cards</strong> - Plastic cards that access digital money</li>
              <li><strong>Mobile Payment Apps</strong> - Apps on phones that can send and receive money</li>
              <li><strong>Online Banking</strong> - Using websites to manage your money</li>
            </ul>
            
            <h3>The Important Jobs Money Does</h3>
            <p>Money serves three critical functions in our economy:</p>
            
            <h4>1. Medium of Exchange</h4>
            <p>This means money helps people trade with each other easily. Instead of having to find someone who wants exactly what you have and has exactly what you want, you can sell what you have for money, and then use that money to buy what you need from anyone who accepts it.</p>
            
            <h4>2. Unit of Account</h4>
            <p>Money provides a common way to measure and compare the value of different things. When we say an apple costs $1 and a book costs $15, we immediately know that the book is worth 15 apples. This makes it easy to compare prices and make decisions.</p>
            
            <h4>3. Store of Value</h4>
            <p>Money allows us to save value for the future. If you do chores today and earn $10, you can save that money and it will still be worth something next month when you want to buy a toy.</p>
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
            question: "How much is a quarter worth?",
            options: ["1 cent", "5 cents", "10 cents", "25 cents"],
            correct: "25 cents",
            explanation: "A quarter is worth 25 cents, which is the same as 5 nickels or 25 pennies!"
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
            question: "What should you do to take care of paper money?",
            options: ["Write your name on it", "Fold it many times", "Keep it flat and clean", "Use it as paper for drawing"],
            correct: "Keep it flat and clean",
            explanation: "To take care of money, we should keep bills flat and clean, and never write on them or damage them!"
          }
        ],
        xpReward: 100
      },
      2: {
        title: "How Do People Earn Money?",
        videoUrl: "https://www.youtube.com/embed/E2wcbUNZ-yo",
        videoLink: "https://www.youtube.com/watch?v=E2wcbUNZ-yo",
        videoTitle: "Grade 3: What are Income and Expenses? Simple Explanation",
        article: {
          title: "How People Earn Money: Jobs, Chores, and Hard Work",
          content: `
            <h2>How People Earn Money: A Complete Guide to Work and Income</h2>
            <p>Money doesn't magically appear in people's wallets or bank accounts. Every dollar, every coin has to be earned through work, effort, and providing value to others. Understanding how people earn money is one of the most important life skills you can develop, and it's never too early to start learning!</p>
          `
        },
        quiz: [],
        xpReward: 100
      },
      3: {
        title: "Needs vs Wants",
        videoUrl: "https://www.youtube.com/embed/aRcXutXvfmM",
        videoLink: "https://www.youtube.com/watch?v=aRcXutXvfmM",
        videoTitle: "Grade 3: Financial Literacy—Needs and Wants for Kids",
        article: {
          title: "Understanding the Difference Between Needs and Wants",
          content: `<h2>Understanding Needs vs Wants</h2><p>Learning the difference between needs and wants is fundamental to making smart financial decisions.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      4: {
        title: "Smart Shopping Choices",
        videoUrl: "https://www.youtube.com/embed/0iRbD5rM5qc",
        videoLink: "https://www.youtube.com/watch?v=0iRbD5rM5qc",
        videoTitle: "Grade 3: Financial Literacy for Kids - Learn the Basics",
        article: {
          title: "Making Smart Spending Decisions",
          content: `<h2>Learning to Make Smart Spending Choices</h2><p>Making good spending choices is important for your financial future.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      5: {
        title: "My First Savings",
        videoUrl: "https://www.youtube.com/embed/B3njsO5ewA8",
        videoLink: "https://www.youtube.com/watch?v=B3njsO5ewA8",
        videoTitle: "Grade 3: Saving Money for Kids - Simple Guide",
        article: {
          title: "Starting Your Savings Journey",
          content: `<h2>Your First Steps to Saving Money</h2><p>Saving money is one of the most important skills you can learn.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      6: {
        title: "Counting Coins and Bills",
        videoUrl: "https://www.youtube.com/embed/aQpf-Ak9ZFo",
        videoLink: "https://www.youtube.com/watch?v=aQpf-Ak9ZFo",
        videoTitle: "Grade 3: Counting Money - How to Count Coins and Bills",
        article: {
          title: "Learning to Count Money",
          content: `<h2>Mastering Coin and Bill Counting</h2><p>Learning to count money accurately is an essential life skill.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      7: {
        title: "Understanding Coins",
        videoUrl: "https://www.youtube.com/embed/EfgCYbyzaA8",
        videoLink: "https://www.youtube.com/watch?v=EfgCYbyzaA8",
        videoTitle: "Grade 3: All About Coins for Kids - American Coins Explained",
        article: {
          title: "All About American Coins",
          content: `<h2>Learning About Different Coins</h2><p>Understanding the value and characteristics of different coins.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      8: {
        title: "Making Change",
        videoUrl: "https://www.youtube.com/embed/OoSXZWKmNLc",
        videoLink: "https://www.youtube.com/watch?v=OoSXZWKmNLc",
        videoTitle: "Grade 3: Identifying and Counting Money - Dollar Bills",
        article: {
          title: "Learning to Make Change",
          content: `<h2>Understanding How to Make Change</h2><p>Making change correctly is an important money skill.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      9: {
        title: "Money and Purchases",
        videoUrl: "https://www.youtube.com/embed/8XpEQMgIJHQ",
        videoLink: "https://www.youtube.com/watch?v=8XpEQMgIJHQ",
        videoTitle: "Grade 3: Money - Purchases and Bills | Mathematics",
        article: {
          title: "Understanding Purchases and Bills",
          content: `<h2>Learning About Purchases and Bills</h2><p>Understanding how money is used in real transactions.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      10: {
        title: "Teaching Money Basics",
        videoUrl: "https://www.youtube.com/embed/QU0rsCaG_W4",
        videoLink: "https://www.youtube.com/watch?v=QU0rsCaG_W4",
        videoTitle: "Grade 3: Ideas for Teaching Money",
        article: {
          title: "Money Basics for Young Learners",
          content: `<h2>Fundamental Money Concepts</h2><p>Building a strong foundation in money knowledge.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      11: {
        title: "Money Management Fun",
        videoUrl: "https://www.youtube.com/embed/7evMiF05-QM",
        videoLink: "https://www.youtube.com/watch?v=7evMiF05-QM",
        videoTitle: "Grade 3: Cha-Ching Curriculum - Financial Literacy",
        article: {
          title: "Fun Ways to Learn About Money",
          content: `<h2>Making Money Learning Fun</h2><p>Engaging ways to understand financial concepts.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      12: {
        title: "Financial Responsibility",
        videoUrl: "https://www.youtube.com/embed/RkDSexrh1jg",
        videoLink: "https://www.youtube.com/watch?v=RkDSexrh1jg",
        videoTitle: "Grade 3: How To Teach Children Financial Responsibility",
        article: {
          title: "Building Financial Responsibility",
          content: `<h2>Learning to Be Responsible with Money</h2><p>Developing good money habits early.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      13: {
        title: "Money Games and Activities",
        videoUrl: "https://www.youtube.com/embed/5dMpNccHbVk",
        videoLink: "https://www.youtube.com/watch?v=5dMpNccHbVk",
        videoTitle: "Grade 3: The Best Board Games for Teaching Kids About Money",
        article: {
          title: "Learning Through Games",
          content: `<h2>Educational Money Games</h2><p>Learning about money through fun activities.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      14: {
        title: "Digital Money Apps",
        videoUrl: "https://www.youtube.com/embed/heFCYzA61cY",
        videoLink: "https://www.youtube.com/watch?v=heFCYzA61cY",
        videoTitle: "Grade 3: Greenlight App - Kids Money Management",
        article: {
          title: "Modern Money Management",
          content: `<h2>Digital Tools for Money Management</h2><p>Understanding modern ways to manage money.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      15: {
        title: "Charitable Giving",
        videoUrl: "https://www.youtube.com/embed/OQIKGUaXlRo",
        videoLink: "https://www.youtube.com/watch?v=OQIKGUaXlRo",
        videoTitle: "Grade 3: Charitable Giving for Kids - How to be Charitable",
        article: {
          title: "Learning to Give Back",
          content: `<h2>The Importance of Giving</h2><p>Understanding charity and helping others.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      16: {
        title: "Money Teaching Fun",
        videoUrl: "https://www.youtube.com/embed/2v7xTtdMLAQ",
        videoLink: "https://www.youtube.com/watch?v=2v7xTtdMLAQ",
        videoTitle: "Grade 3: Teaching Kids Financial Literacy - Make it Fun",
        article: {
          title: "Making Financial Learning Enjoyable",
          content: `<h2>Fun Approaches to Money Education</h2><p>Creative ways to learn about finances.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      17: {
        title: "Money Risk and Reward",
        videoUrl: "https://www.youtube.com/embed/J0GVg3-2rUY",
        videoLink: "https://www.youtube.com/watch?v=J0GVg3-2rUY",
        videoTitle: "Grade 3: Financial Risk and Reward for Kids",
        article: {
          title: "Understanding Risk and Reward",
          content: `<h2>Learning About Financial Risk</h2><p>Understanding that money decisions have consequences.</p>`
        },
        quiz: [],
        xpReward: 100
      }
    },
    4: {
      1: {
        title: "Understanding Currency",
        videoUrl: "https://www.youtube.com/embed/d-mKp1qZjek",
        videoLink: "https://www.youtube.com/watch?v=d-mKp1qZjek",
        videoTitle: "Grade 4: What is Compound Interest? For Kids",
        article: {
          title: "Advanced Money Concepts for Grade 4",
          content: `<h2>Understanding Different Types of Currency</h2><p>Learning about various forms of money around the world.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      2: {
        title: "Basic Banking",
        videoUrl: "https://www.youtube.com/embed/ScXAyGh0MRg",
        videoLink: "https://www.youtube.com/watch?v=ScXAyGh0MRg",
        videoTitle: "Grade 4: Financial Literacy—Checking and Savings Accounts",
        article: {
          title: "Introduction to Banking",
          content: `<h2>Your First Bank Account</h2><p>Understanding how banks work and how to use them.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      3: {
        title: "Earning Through Chores",
        videoUrl: "https://www.youtube.com/embed/SijcDBh8a5c?t=30",
        videoLink: "https://www.youtube.com/watch?v=SijcDBh8a5c&t=30",
        videoTitle: "Grade 4: Teaching Kids About Money - Simple Methods",
        article: {
          title: "Making Money Through Work",
          content: `<h2>Earning Money Through Chores and Jobs</h2><p>Learning the connection between work and income.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      4: {
        title: "Setting Goals",
        videoUrl: "https://www.youtube.com/embed/6TEHmaJBTkw",
        videoLink: "https://www.youtube.com/watch?v=6TEHmaJBTkw",
        videoTitle: "Grade 4: Introduction to Savings and Investments",
        article: {
          title: "Setting Financial Goals",
          content: `<h2>Creating and Achieving Financial Goals</h2><p>Learning to set and work toward money goals.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      5: {
        title: "Smart Spending",
        videoUrl: "https://www.youtube.com/embed/HOH5Z6g9Ne0?t=60",
        videoLink: "https://www.youtube.com/watch?v=HOH5Z6g9Ne0&t=60",
        videoTitle: "Grade 4: Fun Ways To Educate Kids About Money",
        article: {
          title: "Making Smart Spending Decisions",
          content: `<h2>Thinking Before You Spend</h2><p>Strategies for making wise purchasing decisions.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      6: {
        title: "Debit vs Credit",
        videoUrl: "https://www.youtube.com/embed/iSmNwXbNhgQ",
        videoLink: "https://www.youtube.com/watch?v=iSmNwXbNhgQ",
        videoTitle: "Grade 4: Financial Literacy—Debit and Credit Cards",
        article: {
          title: "Understanding Payment Cards",
          content: `<h2>Debit Cards vs Credit Cards</h2><p>Learning the difference between different payment methods.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      7: {
        title: "Money Around the World",
        videoUrl: "https://www.youtube.com/embed/aQpf-Ak9ZFo?t=120",
        videoLink: "https://www.youtube.com/watch?v=aQpf-Ak9ZFo&t=120",
        videoTitle: "Grade 4: Counting Money - Advanced Techniques",
        article: {
          title: "Global Currencies",
          content: `<h2>Money Around the World</h2><p>Learning about different currencies used in other countries.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      8: {
        title: "Saving Strategies",
        videoUrl: "https://www.youtube.com/embed/B3njsO5ewA8?t=45",
        videoLink: "https://www.youtube.com/watch?v=B3njsO5ewA8&t=45",
        videoTitle: "Grade 4: Advanced Saving Money Strategies for Kids",
        article: {
          title: "Advanced Saving Techniques",
          content: `<h2>Better Ways to Save Money</h2><p>Learning advanced strategies for saving money.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      9: {
        title: "Price Comparison",
        videoUrl: "https://www.youtube.com/embed/0iRbD5rM5qc?t=90",
        videoLink: "https://www.youtube.com/watch?v=0iRbD5rM5qc&t=90",
        videoTitle: "Grade 4: Financial Literacy - Advanced Concepts",
        article: {
          title: "Comparing Prices and Values",
          content: `<h2>Getting the Best Value</h2><p>Learning to compare prices and find the best deals.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      10: {
        title: "Money History",
        videoUrl: "https://www.youtube.com/embed/JcvnWeDwTeg?t=60",
        videoLink: "https://www.youtube.com/watch?v=JcvnWeDwTeg&t=60",
        videoTitle: "Grade 4: History of Money - What Is Money",
        article: {
          title: "The History of Money",
          content: `<h2>How Money Evolved</h2><p>Learning about the history and evolution of money.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      11: {
        title: "Interest Basics",
        videoUrl: "https://www.youtube.com/embed/qxltazxfaSk",
        videoLink: "https://www.youtube.com/watch?v=qxltazxfaSk",
        videoTitle: "Grade 4: Compound Interest Explained for Kids",
        article: {
          title: "Understanding Interest",
          content: `<h2>How Interest Works</h2><p>Learning about how money can grow through interest.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      12: {
        title: "Sales and Taxes",
        videoUrl: "https://www.youtube.com/embed/CjDiUUOYw50",
        videoLink: "https://www.youtube.com/watch?v=CjDiUUOYw50",
        videoTitle: "Grade 4: Sales Tax Explained for Kids",
        article: {
          title: "Understanding Taxes",
          content: `<h2>What Are Taxes?</h2><p>Learning about sales tax and why we pay it.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      13: {
        title: "Economic Basics",
        videoUrl: "https://www.youtube.com/embed/F4rCRzo6UuA",
        videoLink: "https://www.youtube.com/watch?v=F4rCRzo6UuA",
        videoTitle: "Grade 4: What Are Stocks? Understanding Economics for Kids",
        article: {
          title: "Introduction to Economics",
          content: `<h2>Basic Economic Concepts</h2><p>Understanding how the economy works.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      14: {
        title: "Money Safety",
        videoUrl: "https://www.youtube.com/embed/EfgCYbyzaA8?t=90",
        videoLink: "https://www.youtube.com/watch?v=EfgCYbyzaA8&t=90",
        videoTitle: "Grade 4: Keeping Money Safe - Coin Security",
        article: {
          title: "Keeping Money Safe",
          content: `<h2>Money Safety and Security</h2><p>Learning how to keep your money safe.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      15: {
        title: "Money Math",
        videoUrl: "https://www.youtube.com/embed/OoSXZWKmNLc?t=150",
        videoLink: "https://www.youtube.com/watch?v=OoSXZWKmNLc&t=150",
        videoTitle: "Grade 4: Advanced Money Math - Dollar Bills",
        article: {
          title: "Money Mathematics",
          content: `<h2>Math with Money</h2><p>Using math skills to work with money.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      16: {
        title: "Work and Income",
        videoUrl: "https://www.youtube.com/embed/E2wcbUNZ-yo?t=120",
        videoLink: "https://www.youtube.com/watch?v=E2wcbUNZ-yo&t=120",
        videoTitle: "Grade 4: Advanced Income and Expenses",
        article: {
          title: "Understanding Work and Income",
          content: `<h2>How People Earn Money</h2><p>Different ways people make money through work.</p>`
        },
        quiz: [],
        xpReward: 100
      },
      17: {
        title: "Money Values",
        videoUrl: "https://www.youtube.com/embed/aRcXutXvfmM?t=180",
        videoLink: "https://www.youtube.com/watch?v=aRcXutXvfmM&t=180",
        videoTitle: "Grade 4: Advanced Needs and Wants",
        article: {
          title: "Money Values and Ethics",
          content: `<h2>Values and Money</h2><p>Understanding the relationship between values and money.</p>`
        },
        quiz: [],
        xpReward: 100
      }
    },
    5: {
      1: {
        title: "Advanced Budgeting",
        videoUrl: "https://www.youtube.com/embed/-0kXmaGqLhE",
        videoLink: "https://www.youtube.com/watch?v=-0kXmaGqLhE",
        videoTitle: "Grade 5: What is a Budget (Ages 10-17)",
        article: {
          title: "Creating Your First Budget",
          content: `<h2>Learning to Budget Your Money</h2><p>Understanding how to plan and manage your spending.</p>`
        },
        quiz: [],
        xpReward: 150
      },
      2: {
        title: "Budget Planning",
        videoUrl: "https://www.youtube.com/embed/6B0MS3zvMkM",
        videoLink: "https://www.youtube.com/watch?v=6B0MS3zvMkM",
        videoTitle: "Grade 5: Teach Kids & Teens How to Make a Budget",
        article: {
          title: "Budget Planning Strategies",
          content: `<h2>Advanced Budget Planning</h2><p>Creating detailed plans for your money.</p>`
        },
        quiz: [],
        xpReward: 150
      },
      3: {
        title: "Making a Budget",
        videoUrl: "https://www.youtube.com/embed/cYGiipJOiLg",
        videoLink: "https://www.youtube.com/watch?v=cYGiipJOiLg",
        videoTitle: "Grade 5: Financial Literacy—Making a Budget",
        article: {
          title: "Budget Creation Process",
          content: `<h2>Step-by-Step Budget Creation</h2><p>Learning the process of making a budget.</p>`
        },
        quiz: [],
        xpReward: 150
      },
      4: {
        title: "50-30-20 Rule",
        videoUrl: "https://www.youtube.com/embed/OZQQMYfaBT4",
        videoLink: "https://www.youtube.com/watch?v=OZQQMYfaBT4",
        videoTitle: "Grade 5: The 50-30-20 Rule - Budgeting for Needs, Wants, and Savings",
        article: {
          title: "The 50-30-20 Budgeting Rule",
          content: `<h2>Simple Budgeting Formula</h2><p>Learning an easy way to divide your money.</p>`
        },
        quiz: [],
        xpReward: 150
      },
      5: {
        title: "Financial Literacy Complete",
        videoUrl: "https://www.youtube.com/embed/ouvbeb2wSGA",
        videoLink: "https://www.youtube.com/watch?v=ouvbeb2wSGA",
        videoTitle: "Grade 5: Financial Literacy In 63 Minutes",
        article: {
          title: "Comprehensive Financial Education",
          content: `<h2>Complete Financial Overview</h2><p>A comprehensive look at personal finance.</p>`
        },
        quiz: [],
        xpReward: 150
      },
      6: {
        title: "Investment Basics",
        videoUrl: "https://www.youtube.com/embed/rtIBTsv2M5E",
        videoLink: "https://www.youtube.com/watch?v=rtIBTsv2M5E",
        videoTitle: "Grade 5: Where Can My Kid Invest?",
        article: {
          title: "Introduction to Investing",
          content: `<h2>Basics of Investing</h2><p>Learning how investments work.</p>`
        },
        quiz: [],
        xpReward: 150
      },
      7: {
        title: "Compound Interest Power",
        videoUrl: "https://www.youtube.com/embed/0WHymXJbipw",
        videoLink: "https://www.youtube.com/watch?v=0WHymXJbipw",
        videoTitle: "Grade 5: Why Einstein Called Compound Interest the 8th Wonder",
        article: {
          title: "The Power of Compound Interest",
          content: `<h2>Making Money Work for You</h2><p>Understanding how money can grow over time.</p>`
        },
        quiz: [],
        xpReward: 150
      },
      8: {
        title: "Kids Brokerage Accounts",
        videoUrl: "https://www.youtube.com/embed/8odVNzJJsB8",
        videoLink: "https://www.youtube.com/watch?v=8odVNzJJsB8",
        videoTitle: "Grade 5: Kids Brokerage Account - What it is and How to Open One",
        article: {
          title: "Investment Accounts for Kids",
          content: `<h2>Starting Your Investment Journey</h2><p>Learning about investment accounts for young people.</p>`
        },
        quiz: [],
        xpReward: 150
      },
      9: {
        title: "Stock Market Basics",
        videoUrl: "https://www.youtube.com/embed/bJHr6_skXWc",
        videoLink: "https://www.youtube.com/watch?v=bJHr6_skXWc",
        videoTitle: "Grade 5: Stock Market for Beginners - Step by Step Guide",
        article: {
          title: "Understanding the Stock Market",
          content: `<h2>Introduction to Stocks</h2><p>Learning how the stock market works.</p>`
        },
        quiz: [],
        xpReward: 150
      },
      10: {
        title: "ETF Investing",
        videoUrl: "https://www.youtube.com/embed/mChmwgxEZcQ",
        videoLink: "https://www.youtube.com/watch?v=mChmwgxEZcQ",
        videoTitle: "Grade 5: Investing in ETFs for Kids - Build Wealth for Future",
        article: {
          title: "Exchange-Traded Funds for Kids",
          content: `<h2>Understanding ETFs</h2><p>Learning about diversified investing.</p>`
        },
        quiz: [],
        xpReward: 150
      },
      11: {
        title: "Interest Mathematics",
        videoUrl: "https://www.youtube.com/embed/JeV0gXuz8Is",
        videoLink: "https://www.youtube.com/watch?v=JeV0gXuz8Is",
        videoTitle: "Grade 5: Compounding Interest - What It Is and How to Earn It",
        article: {
          title: "Interest Calculations",
          content: `<h2>Math Behind Interest</h2><p>Understanding how interest is calculated.</p>`
        },
        quiz: [],
        xpReward: 150
      },
      12: {
        title: "Banking for Kids",
        videoUrl: "https://www.youtube.com/embed/PWT6bmKwFBc",
        videoLink: "https://www.youtube.com/watch?v=PWT6bmKwFBc",
        videoTitle: "Grade 5: Chase First Banking - Kids' Money Management",
        article: {
          title: "Youth Banking Services",
          content: `<h2>Banking Services for Young People</h2><p>Understanding bank accounts designed for kids.</p>`
        },
        quiz: [],
        xpReward: 150
      },
      13: {
        title: "Entrepreneurship",
        videoUrl: "https://www.youtube.com/embed/Z_tw2u3qKuA",
        videoLink: "https://www.youtube.com/watch?v=Z_tw2u3qKuA",
        videoTitle: "Grade 5: The TRUTH About Teaching Kids Real Life Entrepreneurship",
        article: {
          title: "Starting a Business",
          content: `<h2>Young Entrepreneurs</h2><p>Learning about starting your own business.</p>`
        },
        quiz: [],
        xpReward: 150
      },
      14: {
        title: "Entrepreneur Mindset",
        videoUrl: "https://www.youtube.com/embed/8fB-N_39XMI",
        videoLink: "https://www.youtube.com/watch?v=8fB-N_39XMI",
        videoTitle: "Grade 5: ENTREPRENEUR MINDSET - Powerful Motivational",
        article: {
          title: "Developing Business Thinking",
          content: `<h2>Thinking Like an Entrepreneur</h2><p>Developing the mindset of a business owner.</p>`
        },
        quiz: [],
        xpReward: 150
      },
      15: {
        title: "Advanced Money Teaching",
        videoUrl: "https://www.youtube.com/embed/2v7xTtdMLAQ?t=150",
        videoLink: "https://www.youtube.com/watch?v=2v7xTtdMLAQ&t=150",
        videoTitle: "Grade 5: Advanced Financial Literacy Teaching",
        article: {
          title: "Advanced Financial Concepts",
          content: `<h2>Complex Financial Ideas</h2><p>Understanding more advanced money concepts.</p>`
        },
        quiz: [],
        xpReward: 150
      },
      16: {
        title: "Risk Management",
        videoUrl: "https://www.youtube.com/embed/J0GVg3-2rUY?t=120",
        videoLink: "https://www.youtube.com/watch?v=J0GVg3-2rUY&t=120",
        videoTitle: "Grade 5: Advanced Financial Risk and Reward",
        article: {
          title: "Understanding Financial Risk",
          content: `<h2>Managing Financial Risk</h2><p>Learning to balance risk and reward in financial decisions.</p>`
        },
        quiz: [],
        xpReward: 150
      },
      17: {
        title: "Charity and Giving",
        videoUrl: "https://www.youtube.com/embed/OQIKGUaXlRo?t=60",
        videoLink: "https://www.youtube.com/watch?v=OQIKGUaXlRo&t=60",
        videoTitle: "Grade 5: Advanced Charitable Giving for Kids",
        article: {
          title: "Strategic Charitable Giving",
          content: `<h2>Planned Giving and Charity</h2><p>Learning about strategic approaches to charitable giving.</p>`
        },
        quiz: [],
        xpReward: 150
      }
    },
    6: {
      1: {
        title: "Credit and Debt",
        videoUrl: "https://www.youtube.com/embed/IrwTqQ2-9RY",
        videoLink: "https://www.youtube.com/watch?v=IrwTqQ2-9RY",
        videoTitle: "Grade 6: Cash Course - Using Credit and Debit Cards",
        article: {
          title: "Understanding Credit and Debt",
          content: `<h2>Credit Cards vs Debit Cards</h2><p>Learning the differences and responsibilities of each payment method.</p>`
        },
        quiz: [],
        xpReward: 200
      },
      2: {
        title: "Building Credit",
        videoUrl: "https://www.youtube.com/embed/BUK03TKNdcw",
        videoLink: "https://www.youtube.com/watch?v=BUK03TKNdcw",
        videoTitle: "Grade 6: Building Credit For Your Kids",
        article: {
          title: "Introduction to Credit Building",
          content: `<h2>Starting to Build Credit</h2><p>Understanding how credit works and how to build it responsibly.</p>`
        },
        quiz: [],
        xpReward: 200
      },
      3: {
        title: "Responsible Credit Use",
        videoUrl: "https://www.youtube.com/embed/8emCSAYc-Cg",
        videoLink: "https://www.youtube.com/watch?v=8emCSAYc-Cg",
        videoTitle: "Grade 6: Credit Cards and Loans - Use Them Responsibly",
        article: {
          title: "Using Credit Responsibly",
          content: `<h2>Smart Credit Habits</h2><p>Learning how to use credit cards and loans responsibly.</p>`
        },
        quiz: [],
        xpReward: 200
      },
      4: {
        title: "Credit Scores",
        videoUrl: "https://www.youtube.com/embed/9so90hH4vgc",
        videoLink: "https://www.youtube.com/watch?v=9so90hH4vgc",
        videoTitle: "Grade 6: Credit Scores - How To Build and Improve Yours",
        article: {
          title: "Understanding Credit Scores",
          content: `<h2>What Are Credit Scores?</h2><p>Learning how credit scores work and why they matter.</p>`
        },
        quiz: [],
        xpReward: 200
      },
      5: {
        title: "Advanced Banking",
        videoUrl: "https://www.youtube.com/embed/ScXAyGh0MRg?t=90",
        videoLink: "https://www.youtube.com/watch?v=ScXAyGh0MRg&t=90",
        videoTitle: "Grade 6: Advanced Banking - Checking and Savings Accounts",
        article: {
          title: "Advanced Banking Concepts",
          content: `<h2>Banking Services and Features</h2><p>Understanding different banking services and how to use them.</p>`
        },
        quiz: [],
        xpReward: 200
      },
      6: {
        title: "Investment Planning",
        videoUrl: "https://www.youtube.com/embed/6TEHmaJBTkw?t=120",
        videoLink: "https://www.youtube.com/watch?v=6TEHmaJBTkw&t=120",
        videoTitle: "Grade 6: Advanced Savings and Investments",
        article: {
          title: "Long-term Investment Planning",
          content: `<h2>Planning Your Investment Future</h2><p>Understanding long-term investment strategies.</p>`
        },
        quiz: [],
        xpReward: 200
      },
      7: {
        title: "Financial Technology",
        videoUrl: "https://www.youtube.com/embed/heFCYzA61cY?t=60",
        videoLink: "https://www.youtube.com/watch?v=heFCYzA61cY&t=60",
        videoTitle: "Grade 6: Advanced Digital Money Management",
        article: {
          title: "Digital Financial Tools",
          content: `<h2>Modern Financial Technology</h2><p>Understanding digital tools for money management.</p>`
        },
        quiz: [],
        xpReward: 200
      },
      8: {
        title: "Career and Income",
        videoUrl: "https://www.youtube.com/embed/E2wcbUNZ-yo?t=180",
        videoLink: "https://www.youtube.com/watch?v=E2wcbUNZ-yo&t=180",
        videoTitle: "Grade 6: Career Planning and Income Strategies",
        article: {
          title: "Planning Your Career",
          content: `<h2>Career Choices and Income</h2><p>Understanding how career choices affect income.</p>`
        },
        quiz: [],
        xpReward: 200
      },
      9: {
        title: "Economic Systems",
        videoUrl: "https://www.youtube.com/embed/F4rCRzo6UuA?t=90",
        videoLink: "https://www.youtube.com/watch?v=F4rCRzo6UuA&t=90",
        videoTitle: "Grade 6: Advanced Economics - Market Systems",
        article: {
          title: "Understanding Economic Systems",
          content: `<h2>How Economies Work</h2><p>Learning about different economic systems and markets.</p>`
        },
        quiz: [],
        xpReward: 200
      },
      10: {
        title: "Insurance Basics",
        videoUrl: "https://www.youtube.com/embed/J0GVg3-2rUY?t=180",
        videoLink: "https://www.youtube.com/watch?v=J0GVg3-2rUY&t=180",
        videoTitle: "Grade 6: Financial Protection and Insurance",
        article: {
          title: "Understanding Insurance",
          content: `<h2>Protection Through Insurance</h2><p>Learning how insurance protects your finances.</p>`
        },
        quiz: [],
        xpReward: 200
      },
      11: {
        title: "Tax Fundamentals",
        videoUrl: "https://www.youtube.com/embed/CjDiUUOYw50?t=90",
        videoLink: "https://www.youtube.com/watch?v=CjDiUUOYw50&t=90",
        videoTitle: "Grade 6: Understanding Taxes and Government Revenue",
        article: {
          title: "How Taxes Work",
          content: `<h2>Understanding the Tax System</h2><p>Learning about different types of taxes and why we pay them.</p>`
        },
        quiz: [],
        xpReward: 200
      },
      12: {
        title: "Business Fundamentals",
        videoUrl: "https://www.youtube.com/embed/Z_tw2u3qKuA?t=120",
        videoLink: "https://www.youtube.com/watch?v=Z_tw2u3qKuA&t=120",
        videoTitle: "Grade 6: Advanced Business Concepts for Kids",
        article: {
          title: "Business and Entrepreneurship",
          content: `<h2>Starting and Running a Business</h2><p>Understanding the basics of business operations.</p>`
        },
        quiz: [],
        xpReward: 200
      },
      13: {
        title: "Market Analysis",
        videoUrl: "https://www.youtube.com/embed/bJHr6_skXWc?t=150",
        videoLink: "https://www.youtube.com/watch?v=bJHr6_skXWc&t=150",
        videoTitle: "Grade 6: Advanced Stock Market Analysis",
        article: {
          title: "Understanding Markets",
          content: `<h2>Analyzing Financial Markets</h2><p>Learning to understand market trends and analysis.</p>`
        },
        quiz: [],
        xpReward: 200
      },
      14: {
        title: "Financial Planning",
        videoUrl: "https://www.youtube.com/embed/ouvbeb2wSGA?t=180",
        videoLink: "https://www.youtube.com/watch?v=ouvbeb2wSGA&t=180",
        videoTitle: "Grade 6: Comprehensive Financial Planning",
        article: {
          title: "Long-term Financial Planning",
          content: `<h2>Planning Your Financial Future</h2><p>Creating comprehensive financial plans for life goals.</p>`
        },
        quiz: [],
        xpReward: 200
      },
      15: {
        title: "Global Economics",
        videoUrl: "https://www.youtube.com/embed/0WHymXJbipw?t=120",
        videoLink: "https://www.youtube.com/watch?v=0WHymXJbipw&t=120",
        videoTitle: "Grade 6: Global Economic Principles",
        article: {
          title: "International Finance",
          content: `<h2>Global Economic Systems</h2><p>Understanding how global economics affects personal finance.</p>`
        },
        quiz: [],
        xpReward: 200
      },
      16: {
        title: "Investment Strategies",
        videoUrl: "https://www.youtube.com/embed/mChmwgxEZcQ?t=120",
        videoLink: "https://www.youtube.com/watch?v=mChmwgxEZcQ&t=120",
        videoTitle: "Grade 6: Advanced Investment Strategies",
        article: {
          title: "Sophisticated Investing",
          content: `<h2>Advanced Investment Techniques</h2><p>Learning sophisticated investment strategies.</p>`
        },
        quiz: [],
        xpReward: 200
      },
      17: {
        title: "Financial Ethics",
        videoUrl: "https://www.youtube.com/embed/RkDSexrh1jg?t=150",
        videoLink: "https://www.youtube.com/watch?v=RkDSexrh1jg&t=150",
        videoTitle: "Grade 6: Ethics in Financial Decision Making",
        article: {
          title: "Ethical Financial Decisions",
          content: `<h2>Ethics and Money</h2><p>Understanding the ethical aspects of financial decisions.</p>`
        },
        quiz: [],
        xpReward: 200
      }
    },
    7: {
      1: {
        title: "Advanced Credit Management",
        videoUrl: "https://www.youtube.com/embed/8emCSAYc-Cg?t=120",
        videoLink: "https://www.youtube.com/watch?v=8emCSAYc-Cg&t=120",
        videoTitle: "Grade 7: Advanced Credit and Loan Management",
        article: {
          title: "Mastering Credit Management",
          content: `<h2>Advanced Credit Strategies</h2><p>Learning sophisticated credit management techniques.</p>`
        },
        quiz: [],
        xpReward: 250
      },
      2: {
        title: "Investment Portfolio",
        videoUrl: "https://www.youtube.com/embed/mChmwgxEZcQ?t=180",
        videoLink: "https://www.youtube.com/watch?v=mChmwgxEZcQ&t=180",
        videoTitle: "Grade 7: Building Investment Portfolios",
        article: {
          title: "Portfolio Management",
          content: `<h2>Creating Investment Portfolios</h2><p>Understanding how to build and manage investment portfolios.</p>`
        },
        quiz: [],
        xpReward: 250
      },
      3: {
        title: "Market Economics",
        videoUrl: "https://www.youtube.com/embed/bJHr6_skXWc?t=300",
        videoLink: "https://www.youtube.com/watch?v=bJHr6_skXWc&t=300",
        videoTitle: "Grade 7: Market Economics and Trading",
        article: {
          title: "Market Economics",
          content: `<h2>Understanding Market Forces</h2><p>Learning how markets work and affect investments.</p>`
        },
        quiz: [],
        xpReward: 250
      },
      4: {
        title: "Business Strategy",
        videoUrl: "https://www.youtube.com/embed/Z_tw2u3qKuA?t=300",
        videoLink: "https://www.youtube.com/watch?v=Z_tw2u3qKuA&t=300",
        videoTitle: "Grade 7: Advanced Business Strategy",
        article: {
          title: "Strategic Business Planning",
          content: `<h2>Business Strategy and Planning</h2><p>Understanding how to plan and execute business strategies.</p>`
        },
        quiz: [],
        xpReward: 250
      },
      5: {
        title: "Financial Analysis",
        videoUrl: "https://www.youtube.com/embed/ouvbeb2wSGA?t=2400",
        videoLink: "https://www.youtube.com/watch?v=ouvbeb2wSGA&t=2400",
        videoTitle: "Grade 7: Financial Analysis and Evaluation",
        article: {
          title: "Financial Statement Analysis",
          content: `<h2>Analyzing Financial Information</h2><p>Learning to read and analyze financial statements.</p>`
        },
        quiz: [],
        xpReward: 250
      },
      6: {
        title: "Risk Assessment",
        videoUrl: "https://www.youtube.com/embed/J0GVg3-2rUY?t=240",
        videoLink: "https://www.youtube.com/watch?v=J0GVg3-2rUY&t=240",
        videoTitle: "Grade 7: Advanced Risk Assessment",
        article: {
          title: "Financial Risk Analysis",
          content: `<h2>Evaluating Financial Risks</h2><p>Understanding how to assess and manage financial risks.</p>`
        },
        quiz: [],
        xpReward: 250
      },
      7: {
        title: "Retirement Planning",
        videoUrl: "https://www.youtube.com/embed/6TEHmaJBTkw?t=300",
        videoLink: "https://www.youtube.com/watch?v=6TEHmaJBTkw&t=300",
        videoTitle: "Grade 7: Long-term Retirement Planning",
        article: {
          title: "Planning for Retirement",
          content: `<h2>Retirement Savings Strategies</h2><p>Understanding how to plan for retirement early.</p>`
        },
        quiz: [],
        xpReward: 250
      },
      8: {
        title: "Tax Strategy",
        videoUrl: "https://www.youtube.com/embed/CjDiUUOYw50?t=180",
        videoLink: "https://www.youtube.com/watch?v=CjDiUUOYw50&t=180",
        videoTitle: "Grade 7: Advanced Tax Planning",
        article: {
          title: "Tax Planning Strategies",
          content: `<h2>Strategic Tax Planning</h2><p>Understanding tax implications of financial decisions.</p>`
        },
        quiz: [],
        xpReward: 250
      },
      9: {
        title: "Corporate Finance",
        videoUrl: "https://www.youtube.com/embed/8fB-N_39XMI?t=180",
        videoLink: "https://www.youtube.com/watch?v=8fB-N_39XMI&t=180",
        videoTitle: "Grade 7: Corporate Finance Basics",
        article: {
          title: "Understanding Corporate Finance",
          content: `<h2>How Corporations Manage Money</h2><p>Learning about corporate financial management.</p>`
        },
        quiz: [],
        xpReward: 250
      },
      10: {
        title: "International Finance",
        videoUrl: "https://www.youtube.com/embed/0WHymXJbipw?t=240",
        videoLink: "https://www.youtube.com/watch?v=0WHymXJbipw&t=240",
        videoTitle: "Grade 7: International Financial Markets",
        article: {
          title: "Global Financial Systems",
          content: `<h2>International Financial Markets</h2><p>Understanding global financial systems and markets.</p>`
        },
        quiz: [],
        xpReward: 250
      },
      11: {
        title: "Financial Innovation",
        videoUrl: "https://www.youtube.com/embed/d-mKp1qZjek?t=180",
        videoLink: "https://www.youtube.com/watch?v=d-mKp1qZjek&t=180",
        videoTitle: "Grade 7: Financial Innovation and Technology",
        article: {
          title: "Innovation in Finance",
          content: `<h2>New Financial Technologies</h2><p>Understanding how technology is changing finance.</p>`
        },
        quiz: [],
        xpReward: 250
      },
      12: {
        title: "Advanced Banking",
        videoUrl: "https://www.youtube.com/embed/ScXAyGh0MRg?t=240",
        videoLink: "https://www.youtube.com/watch?v=ScXAyGh0MRg&t=240",
        videoTitle: "Grade 7: Advanced Banking Services",
        article: {
          title: "Sophisticated Banking",
          content: `<h2>Advanced Banking Products</h2><p>Understanding complex banking products and services.</p>`
        },
        quiz: [],
        xpReward: 250
      },
      13: {
        title: "Financial Regulation",
        videoUrl: "https://www.youtube.com/embed/9so90hH4vgc?t=120",
        videoLink: "https://www.youtube.com/watch?v=9so90hH4vgc&t=120",
        videoTitle: "Grade 7: Financial Regulation and Compliance",
        article: {
          title: "Understanding Financial Laws",
          content: `<h2>Financial Regulation and Law</h2><p>Learning about financial regulations and compliance.</p>`
        },
        quiz: [],
        xpReward: 250
      },
      14: {
        title: "Economic Policy",
        videoUrl: "https://www.youtube.com/embed/F4rCRzo6UuA?t=240",
        videoLink: "https://www.youtube.com/watch?v=F4rCRzo6UuA&t=240",
        videoTitle: "Grade 7: Economic Policy and Markets",
        article: {
          title: "Government Economic Policy",
          content: `<h2>How Government Affects Economy</h2><p>Understanding government's role in the economy.</p>`
        },
        quiz: [],
        xpReward: 250
      },
      15: {
        title: "Wealth Management",
        videoUrl: "https://www.youtube.com/embed/rtIBTsv2M5E?t=180",
        videoLink: "https://www.youtube.com/watch?v=rtIBTsv2M5E&t=180",
        videoTitle: "Grade 7: Wealth Management Strategies",
        article: {
          title: "Managing Wealth",
          content: `<h2>Strategies for Wealth Management</h2><p>Understanding how to manage and grow wealth.</p>`
        },
        quiz: [],
        xpReward: 250
      },
      16: {
        title: "Financial Psychology",
        videoUrl: "https://www.youtube.com/embed/2v7xTtdMLAQ?t=300",
        videoLink: "https://www.youtube.com/watch?v=2v7xTtdMLAQ&t=300",
        videoTitle: "Grade 7: Psychology of Money and Decision Making",
        article: {
          title: "Psychology of Finance",
          content: `<h2>How Psychology Affects Money Decisions</h2><p>Understanding the psychological aspects of financial decisions.</p>`
        },
        quiz: [],
        xpReward: 250
      },
      17: {
        title: "Social Finance",
        videoUrl: "https://www.youtube.com/embed/OQIKGUaXlRo?t=180",
        videoLink: "https://www.youtube.com/watch?v=OQIKGUaXlRo&t=180",
        videoTitle: "Grade 7: Social Impact Investing",
        article: {
          title: "Finance and Social Impact",
          content: `<h2>Using Finance for Social Good</h2><p>Understanding how finance can create positive social impact.</p>`
        },
        quiz: [],
        xpReward: 250
      }
    },
    8: {
      1: {
        title: "Financial Leadership",
        videoUrl: "https://www.youtube.com/embed/8fB-N_39XMI?t=300",
        videoLink: "https://www.youtube.com/watch?v=8fB-N_39XMI&t=300",
        videoTitle: "Grade 8: Financial Leadership and Vision",
        article: {
          title: "Leading Through Finance",
          content: `<h2>Financial Leadership Skills</h2><p>Developing leadership skills in financial contexts.</p>`
        },
        quiz: [],
        xpReward: 300
      },
      2: {
        title: "Advanced Portfolio Theory",
        videoUrl: "https://www.youtube.com/embed/mChmwgxEZcQ?t=400",
        videoLink: "https://www.youtube.com/watch?v=mChmwgxEZcQ&t=400",
        videoTitle: "Grade 8: Advanced Portfolio Management Theory",
        article: {
          title: "Modern Portfolio Theory",
          content: `<h2>Advanced Investment Theory</h2><p>Understanding sophisticated investment theories and practices.</p>`
        },
        quiz: [],
        xpReward: 300
      },
      3: {
        title: "Derivatives and Options",
        videoUrl: "https://www.youtube.com/embed/bJHr6_skXWc?t=600",
        videoLink: "https://www.youtube.com/watch?v=bJHr6_skXWc&t=600",
        videoTitle: "Grade 8: Introduction to Derivatives and Options",
        article: {
          title: "Complex Financial Instruments",
          content: `<h2>Understanding Derivatives</h2><p>Learning about complex financial instruments and their uses.</p>`
        },
        quiz: [],
        xpReward: 300
      },
      4: {
        title: "Macroeconomic Analysis",
        videoUrl: "https://www.youtube.com/embed/ouvbeb2wSGA?t=3000",
        videoLink: "https://www.youtube.com/watch?v=ouvbeb2wSGA&t=3000",
        videoTitle: "Grade 8: Macroeconomic Analysis and Policy",
        article: {
          title: "Understanding Macroeconomics",
          content: `<h2>Large-Scale Economic Analysis</h2><p>Understanding how large-scale economic factors affect finance.</p>`
        },
        quiz: [],
        xpReward: 300
      },
      5: {
        title: "Financial Modeling",
        videoUrl: "https://www.youtube.com/embed/0WHymXJbipw?t=360",
        videoLink: "https://www.youtube.com/watch?v=0WHymXJbipw&t=360",
        videoTitle: "Grade 8: Financial Modeling and Forecasting",
        article: {
          title: "Creating Financial Models",
          content: `<h2>Building Financial Models</h2><p>Learning to create and use financial models for decision making.</p>`
        },
        quiz: [],
        xpReward: 300
      },
      6: {
        title: "Alternative Investments",
        videoUrl: "https://www.youtube.com/embed/rtIBTsv2M5E?t=300",
        videoLink: "https://www.youtube.com/watch?v=rtIBTsv2M5E&t=300",
        videoTitle: "Grade 8: Alternative Investment Strategies",
        article: {
          title: "Non-Traditional Investments",
          content: `<h2>Alternative Investment Options</h2><p>Understanding alternative investment vehicles and strategies.</p>`
        },
        quiz: [],
        xpReward: 300
      },
      7: {
        title: "Cryptocurrency and DeFi",
        videoUrl: "https://www.youtube.com/embed/d-mKp1qZjek?t=300",
        videoLink: "https://www.youtube.com/watch?v=d-mKp1qZjek&t=300",
        videoTitle: "Grade 8: Cryptocurrency and Decentralized Finance",
        article: {
          title: "Digital Currencies and DeFi",
          content: `<h2>The Future of Digital Finance</h2><p>Understanding cryptocurrencies and decentralized finance.</p>`
        },
        quiz: [],
        xpReward: 300
      },
      8: {
        title: "ESG Investing",
        videoUrl: "https://www.youtube.com/embed/OQIKGUaXlRo?t=240",
        videoLink: "https://www.youtube.com/watch?v=OQIKGUaXlRo&t=240",
        videoTitle: "Grade 8: Environmental, Social, and Governance Investing",
        article: {
          title: "Sustainable Investing",
          content: `<h2>Investing for Impact</h2><p>Understanding ESG principles in investment decisions.</p>`
        },
        quiz: [],
        xpReward: 300
      },
      9: {
        title: "Financial Engineering",
        videoUrl: "https://www.youtube.com/embed/JeV0gXuz8Is?t=240",
        videoLink: "https://www.youtube.com/watch?v=JeV0gXuz8Is&t=240",
        videoTitle: "Grade 8: Financial Engineering and Innovation",
        article: {
          title: "Engineering Financial Solutions",
          content: `<h2>Creating Financial Solutions</h2><p>Understanding how to engineer innovative financial solutions.</p>`
        },
        quiz: [],
        xpReward: 300
      },
      10: {
        title: "Behavioral Finance",
        videoUrl: "https://www.youtube.com/embed/2v7xTtdMLAQ?t=600",
        videoLink: "https://www.youtube.com/watch?v=2v7xTtdMLAQ&t=600",
        videoTitle: "Grade 8: Advanced Behavioral Finance",
        article: {
          title: "Psychology in Finance",
          content: `<h2>How Behavior Affects Financial Markets</h2><p>Understanding psychological factors in financial decision making.</p>`
        },
        quiz: [],
        xpReward: 300
      },
      11: {
        title: "Financial Innovation Lab",
        videoUrl: "https://www.youtube.com/embed/Z_tw2u3qKuA?t=600",
        videoLink: "https://www.youtube.com/watch?v=Z_tw2u3qKuA&t=600",
        videoTitle: "Grade 8: Financial Innovation and Entrepreneurship",
        article: {
          title: "Innovating in Finance",
          content: `<h2>Creating Financial Innovations</h2><p>Learning to innovate and create new financial products and services.</p>`
        },
        quiz: [],
        xpReward: 300
      },
      12: {
        title: "Global Financial Systems",
        videoUrl: "https://www.youtube.com/embed/F4rCRzo6UuA?t=400",
        videoLink: "https://www.youtube.com/watch?v=F4rCRzo6UuA&t=400",
        videoTitle: "Grade 8: Global Financial Systems and Markets",
        article: {
          title: "World Financial Systems",
          content: `<h2>Understanding Global Finance</h2><p>Learning about international financial systems and their interactions.</p>`
        },
        quiz: [],
        xpReward: 300
      },
      13: {
        title: "Financial Technology",
        videoUrl: "https://www.youtube.com/embed/heFCYzA61cY?t=240",
        videoLink: "https://www.youtube.com/watch?v=heFCYzA61cY&t=240",
        videoTitle: "Grade 8: Advanced Financial Technology",
        article: {
          title: "FinTech Innovation",
          content: `<h2>Technology Transforming Finance</h2><p>Understanding how technology is revolutionizing financial services.</p>`
        },
        quiz: [],
        xpReward: 300
      },
      14: {
        title: "Quantitative Finance",
        videoUrl: "https://www.youtube.com/embed/qxltazxfaSk?t=180",
        videoLink: "https://www.youtube.com/watch?v=qxltazxfaSk&t=180",
        videoTitle: "Grade 8: Quantitative Finance and Mathematical Modeling",
        article: {
          title: "Mathematical Finance",
          content: `<h2>Math in Financial Analysis</h2><p>Understanding mathematical approaches to financial analysis.</p>`
        },
        quiz: [],
        xpReward: 300
      },
      15: {
        title: "Financial Ethics and Governance",
        videoUrl: "https://www.youtube.com/embed/RkDSexrh1jg?t=300",
        videoLink: "https://www.youtube.com/watch?v=RkDSexrh1jg&t=300",
        videoTitle: "Grade 8: Advanced Financial Ethics and Corporate Governance",
        article: {
          title: "Ethics in Advanced Finance",
          content: `<h2>Ethical Leadership in Finance</h2><p>Understanding ethical considerations in advanced financial decision making.</p>`
        },
        quiz: [],
        xpReward: 300
      },
      16: {
        title: "Financial Research Methods",
        videoUrl: "https://www.youtube.com/embed/J0GVg3-2rUY?t=400",
        videoLink: "https://www.youtube.com/watch?v=J0GVg3-2rUY&t=400",
        videoTitle: "Grade 8: Financial Research and Analysis Methods",
        article: {
          title: "Research in Finance",
          content: `<h2>Conducting Financial Research</h2><p>Learning advanced methods for financial research and analysis.</p>`
        },
        quiz: [],
        xpReward: 300
      },
      17: {
        title: "Future of Finance",
        videoUrl: "https://www.youtube.com/embed/8odVNzJJsB8?t=300",
        videoLink: "https://www.youtube.com/watch?v=8odVNzJJsB8&t=300",
        videoTitle: "Grade 8: The Future of Finance and Investment",
        article: {
          title: "Finance in the Future",
          content: `<h2>The Future of Financial Systems</h2><p>Understanding emerging trends and the future of finance.</p>`
        },
        quiz: [],
        xpReward: 300
      }
    }
  };

  const currentLessonContent = lessonContent[grade as keyof typeof lessonContent]?.[module as keyof (typeof lessonContent)[typeof grade]];

  if (!currentLessonContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold text-destructive mb-4">Lesson Not Found</h2>
            <p className="text-muted-foreground mb-6">
              Sorry, we couldn't find the lesson you're looking for.
            </p>
            <Button onClick={() => navigate('/game-start')}>
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const handleVideoComplete = async () => {
    setVideoCompleted(true);
    if (user) {
      await updateProgress('video_completed', true);
    }
    toast.success("Video completed! Great job!");
  };

  const handleArticleComplete = async () => {
    setArticleCompleted(true);
    if (user) {
      await updateProgress('article_completed', true);
    }
    toast.success("Article completed! Keep it up!");
  };

  const updateProgress = async (field: string, value: any) => {
    if (!user) return;

    const { data: lesson } = await supabase
      .from('lessons')
      .select('id')
      .eq('grade_level', grade)
      .eq('module_number', module)
      .single();

    if (lesson) {
      const { data: existingProgress } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('lesson_id', lesson.id)
        .single();

      const updateData = {
        user_id: user.id,
        lesson_id: lesson.id,
        [field]: value,
        ...existingProgress
      };

      await supabase
        .from('lesson_progress')
        .upsert(updateData);
    }
  };

  const handleQuizSubmit = async () => {
    if (!currentLessonContent.quiz) return;
    
    let correctAnswers = 0;
    currentLessonContent.quiz.forEach((question: any) => {
      if (quizAnswers[question.id] === question.correct) {
        correctAnswers++;
      }
    });

    const scorePercentage = (correctAnswers / currentLessonContent.quiz.length) * 100;
    const earnedXp = Math.floor((scorePercentage / 100) * currentLessonContent.xpReward);
    
    setScore(scorePercentage);
    setXpEarned(earnedXp);
    setQuizSubmitted(true);

    if (user) {
      await updateProgress('quiz_completed', true);
      await updateProgress('quiz_score', scorePercentage);
      await updateProgress('xp_earned', earnedXp);
      
      // Update user's total XP
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Handle profile creation or update
      await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          display_name: profile?.display_name || 'Student'
        });
    }

    if (scorePercentage >= 80) {
      toast.success(`Excellent! You scored ${scorePercentage.toFixed(1)}% and earned ${earnedXp} XP!`);
    } else if (scorePercentage >= 60) {
      toast("Good job! You can retake the quiz to improve your score.", { description: `Score: ${scorePercentage.toFixed(1)}%` });
    } else {
      toast("Keep trying! Review the material and retake the quiz.", { description: `Score: ${scorePercentage.toFixed(1)}%` });
    }
  };

  const nextModule = () => {
    if (module < 17) {
      navigate(`/lesson/${grade}/${module + 1}`);
    } else if (grade < 8) {
      navigate(`/lesson/${grade + 1}/1`);
    }
  };

  const prevModule = () => {
    if (module > 1) {
      navigate(`/lesson/${grade}/${module - 1}`);
    } else if (grade > 3) {
      navigate(`/lesson/${grade - 1}/17`);
    }
  };

  const overallProgress = ((videoCompleted ? 1 : 0) + (articleCompleted ? 1 : 0) + (quizSubmitted && score >= 60 ? 1 : 0)) / 3 * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate(`/grade-modules/${grade}`)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Grade {grade}
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Grade {grade} - Module {module}</h1>
              <p className="text-xl text-muted-foreground">{currentLessonContent.title}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">Progress: {overallProgress.toFixed(0)}%</span>
            </div>
            <Progress value={overallProgress} className="w-32" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={currentSection === 'video' ? 'default' : 'outline'}
            onClick={() => setCurrentSection('video')}
            className="flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Video
            {videoCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
          </Button>
          <Button
            variant={currentSection === 'article' ? 'default' : 'outline'}
            onClick={() => setCurrentSection('article')}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Article
            {articleCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
          </Button>
          <Button
            variant={currentSection === 'quiz' ? 'default' : 'outline'}
            onClick={() => setCurrentSection('quiz')}
            className="flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            Quiz
            {quizSubmitted && score >= 60 && <CheckCircle className="w-4 h-4 text-green-500" />}
          </Button>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              {currentSection === 'video' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Play className="w-6 h-6" />
                    {currentLessonContent.videoTitle}
                  </h2>
                  <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-muted">
                    <iframe
                      width="100%"
                      height="100%"
                      src={currentLessonContent.videoUrl}
                      title={currentLessonContent.videoTitle}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  {/* Direct YouTube Link */}
                  <div className="mb-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      If the video doesn't work above, you can watch it directly on YouTube:
                    </p>
                    <a 
                      href={currentLessonContent.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open in YouTube
                    </a>
                  </div>

                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">
                      <Clock className="w-4 h-4 mr-2" />
                      Educational Video
                    </Badge>
                    <Button onClick={handleVideoComplete} disabled={videoCompleted}>
                      {videoCompleted ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        'Mark as Watched'
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {currentSection === 'article' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">{currentLessonContent.article.title}</h2>
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: currentLessonContent.article.content }}
                  />
                  <div className="mt-8 pt-6 border-t">
                    <Button onClick={handleArticleComplete} disabled={articleCompleted}>
                      {articleCompleted ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        'Mark as Read'
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {currentSection === 'quiz' && currentLessonContent.quiz && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <HelpCircle className="w-6 h-6" />
                    Knowledge Check
                  </h2>
                  
                  {!quizSubmitted ? (
                    <div className="space-y-6">
                      {currentLessonContent.quiz.map((question: any, index: number) => (
                        <Card key={question.id} className="p-4">
                          <h3 className="font-semibold mb-4">
                            {index + 1}. {question.question}
                          </h3>
                          <div className="space-y-2">
                            {question.options.map((option: string) => (
                              <label key={option} className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer">
                                <input
                                  type="radio"
                                  name={`question-${question.id}`}
                                  value={option}
                                  onChange={(e) => setQuizAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
                                  className="w-4 h-4"
                                />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                        </Card>
                      ))}
                      
                      <Button 
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(quizAnswers).length !== currentLessonContent.quiz.length}
                        className="w-full"
                      >
                        Submit Quiz
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center p-6 bg-muted rounded-lg">
                        <Award className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                        <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
                        <p className="text-lg mb-2">Score: {score.toFixed(1)}%</p>
                        <p className="text-lg">XP Earned: {xpEarned}</p>
                        {score < 60 && (
                          <Button 
                            onClick={() => {
                              setQuizSubmitted(false);
                              setQuizAnswers({});
                              setScore(0);
                              setXpEarned(0);
                            }}
                            className="mt-4"
                          >
                            Retake Quiz
                          </Button>
                        )}
                      </div>
                      
                      {/* Show correct answers */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold">Answer Review:</h3>
                        {currentLessonContent.quiz.map((question: any, index: number) => (
                          <Card key={question.id} className="p-4">
                            <h4 className="font-semibold mb-2">
                              {index + 1}. {question.question}
                            </h4>
                            <div className="space-y-2">
                              <div className={`p-2 rounded ${quizAnswers[question.id] === question.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                <strong>Your answer:</strong> {quizAnswers[question.id] || 'Not answered'}
                              </div>
                              <div className="p-2 rounded bg-green-100 text-green-800">
                                <strong>Correct answer:</strong> {question.correct}
                              </div>
                              <div className="p-2 rounded bg-blue-100 text-blue-800">
                                <strong>Explanation:</strong> {question.explanation}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Progress Card */}
            <Card className="p-4">
              <h3 className="font-bold mb-3">Lesson Progress</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Video
                  </span>
                  {videoCompleted ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-muted-foreground rounded-full" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Article
                  </span>
                  {articleCompleted ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-muted-foreground rounded-full" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    Quiz
                  </span>
                  {quizSubmitted && score >= 60 ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-muted-foreground rounded-full" />
                  )}
                </div>
              </div>
            </Card>

            {/* Navigation Card */}
            <Card className="p-4">
              <h3 className="font-bold mb-3">Navigation</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  onClick={prevModule}
                  disabled={grade === 3 && module === 1}
                  className="w-full justify-start"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous Module
                </Button>
                <Button 
                  variant="outline" 
                  onClick={nextModule}
                  disabled={grade === 8 && module === 17}
                  className="w-full justify-start"
                >
                  Next Module
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Module Info Card */}
            <Card className="p-4">
              <h3 className="font-bold mb-3">Module Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Grade:</span>
                  <span>{grade}</span>
                </div>
                <div className="flex justify-between">
                  <span>Module:</span>
                  <span>{module} of 17</span>
                </div>
                <div className="flex justify-between">
                  <span>Max XP:</span>
                  <span>{currentLessonContent.xpReward}</span>
                </div>
                {xpEarned > 0 && (
                  <div className="flex justify-between font-semibold text-green-600">
                    <span>XP Earned:</span>
                    <span>{xpEarned}</span>
                  </div>
                )}
              </div>
            </Card>

            {/* Badges Card */}
            {badges.length > 0 && (
              <Card className="p-4">
                <h3 className="font-bold mb-3">Your Badges</h3>
                <div className="grid grid-cols-3 gap-2">
                  {badges.slice(0, 6).map((badge) => (
                    <div key={badge.id} className="text-center">
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <div className="text-xs">{badge.name}</div>
                    </div>
                  ))}
                </div>
                {badges.length > 6 && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    +{badges.length - 6} more badges
                  </p>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;