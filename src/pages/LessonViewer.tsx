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
          },
          {
            id: 5,
            question: "Before money was invented, how did people trade?",
            options: ["They used rocks", "They used a barter system", "They didn't trade", "They used leaves"],
            correct: "They used a barter system",
            explanation: "Before money, people traded goods directly with each other using the barter system."
          },
          {
            id: 6,
            question: "What are coins made of?",
            options: ["Paper", "Plastic", "Metal", "Wood"],
            correct: "Metal",
            explanation: "Coins are made of metal, like copper, nickel, and zinc, which makes them durable."
          },
          {
            id: 7,
            question: "Which president is on the $1 bill?",
            options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "Benjamin Franklin"],
            correct: "George Washington",
            explanation: "George Washington, the first U.S. President, is featured on the $1 bill."
          },
          {
            id: 8,
            question: "What is digital money?",
            options: ["Money on a computer screen", "Money stored electronically", "Fake money", "Money made of digits"],
            correct: "Money stored electronically",
            explanation: "Digital money exists as electronic records in computers rather than physical coins and bills."
          },
          {
            id: 9,
            question: "Why is money better than bartering?",
            options: ["It's prettier", "It makes trading easier", "It's heavier", "It's more fun"],
            correct: "It makes trading easier",
            explanation: "Money makes trading much easier because everyone accepts it, unlike bartering where you need to find someone who wants exactly what you have."
          },
          {
            id: 10,
            question: "What does money help us do?",
            options: ["Store value for the future", "Measure the value of things", "Trade easily with others", "All of the above"],
            correct: "All of the above",
            explanation: "Money serves as a medium of exchange, a unit of account, and a store of value - helping us with all these important functions!"
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
            <h2>How People Earn Money: Understanding Work and Income</h2>
            <p>Money doesn't just appear magically - people have to earn it through work, effort, and providing value to others. Understanding how people earn money is one of the most important lessons you can learn about the real world.</p>
            
            <h3>What Does It Mean to "Earn" Money?</h3>
            <p>Earning money means receiving payment in exchange for doing something valuable for someone else. When you earn money, you're trading your time, effort, skills, or products for payment. This is different from receiving money as a gift or finding money - earning requires you to do something in return.</p>
            
            <h4>The Basic Principle of Earning</h4>
            <p>All earning is based on a simple idea: <strong>You get paid for creating value for other people.</strong> The more value you create, and the more people you help, the more money you can potentially earn. This is true whether you're a kid doing chores or an adult with a career.</p>
            
            <h3>Types of Income</h3>
            
            <h4>Earned Income</h4>
            <p>This is money you receive in exchange for work or services:</p>
            <ul>
              <li><strong>Wages and Salaries</strong> - Regular payment for a job</li>
              <li><strong>Tips</strong> - Extra money for good service</li>
              <li><strong>Commissions</strong> - Payment based on sales or results</li>
              <li><strong>Business Income</strong> - Money from owning and running a business</li>
              <li><strong>Freelance Income</strong> - Payment for specific projects or tasks</li>
            </ul>
            
            <h4>Unearned Income</h4>
            <p>This is money you receive without working for it directly:</p>
            <ul>
              <li><strong>Gifts</strong> - Money given to you by family or friends</li>
              <li><strong>Allowances</strong> - Regular money from parents (though this might come with expectations)</li>
              <li><strong>Interest</strong> - Money earned from savings accounts or investments</li>
              <li><strong>Dividends</strong> - Money from owning shares in companies</li>
              <li><strong>Inheritance</strong> - Money left to you by relatives</li>
            </ul>
            
            <h3>How Kids Can Start Earning Money</h3>
            
            <h4>Chores and Household Tasks</h4>
            <p>Many kids start earning money by helping around the house:</p>
            <ul>
              <li>Cleaning rooms and organizing spaces</li>
              <li>Washing dishes or loading the dishwasher</li>
              <li>Taking out trash and recycling</li>
              <li>Yard work like raking leaves or pulling weeds</li>
              <li>Helping with laundry</li>
              <li>Feeding and caring for pets</li>
            </ul>
            
            <h4>Helping Neighbors and Community</h4>
            <ul>
              <li>Pet sitting or dog walking</li>
              <li>Helping elderly neighbors with simple tasks</li>
              <li>Shoveling snow or raking leaves</li>
              <li>Washing cars</li>
              <li>Helping with garage sales</li>
              <li>Delivering newspapers or flyers</li>
            </ul>
            
            <h4>Small Business Ideas for Kids</h4>
            <ul>
              <li>Lemonade stands</li>
              <li>Bake sales</li>
              <li>Craft sales (friendship bracelets, drawings, etc.)</li>
              <li>Tutoring younger kids</li>
              <li>Technology help for older adults</li>
              <li>Seasonal services (holiday decorating, gift wrapping)</li>
            </ul>
            
            <h3>Different Types of Jobs Adults Have</h3>
            
            <h4>Service Jobs</h4>
            <p>These jobs involve helping other people:</p>
            <ul>
              <li><strong>Teachers</strong> - Help people learn new things</li>
              <li><strong>Doctors and Nurses</strong> - Help people stay healthy</li>
              <li><strong>Police Officers</strong> - Keep communities safe</li>
              <li><strong>Firefighters</strong> - Protect people and property from fires</li>
              <li><strong>Restaurant Workers</strong> - Prepare and serve food</li>
            </ul>
            
            <h4>Production Jobs</h4>
            <p>These jobs involve making or creating things:</p>
            <ul>
              <li><strong>Factory Workers</strong> - Make products in factories</li>
              <li><strong>Farmers</strong> - Grow food and raise animals</li>
              <li><strong>Construction Workers</strong> - Build houses and buildings</li>
              <li><strong>Artists and Craftspeople</strong> - Create art and handmade items</li>
              <li><strong>Software Developers</strong> - Create computer programs and apps</li>
            </ul>
            
            <h4>Knowledge Jobs</h4>
            <p>These jobs involve using specialized knowledge and skills:</p>
            <ul>
              <li><strong>Engineers</strong> - Design and build complex systems</li>
              <li><strong>Scientists</strong> - Study and research how things work</li>
              <li><strong>Lawyers</strong> - Help people with legal problems</li>
              <li><strong>Accountants</strong> - Help people and businesses manage money</li>
              <li><strong>Managers</strong> - Organize and lead teams of workers</li>
            </ul>
            
            <h3>Why Different Jobs Pay Different Amounts</h3>
            
            <h4>Factors That Affect How Much People Earn</h4>
            <ul>
              <li><strong>Education and Training Required</strong> - Jobs requiring more education usually pay more</li>
              <li><strong>Responsibility Level</strong> - Jobs with more responsibility typically pay more</li>
              <li><strong>Rarity of Skills</strong> - If few people can do the job, it usually pays more</li>
              <li><strong>Value Created</strong> - Jobs that create more value for society often pay more</li>
              <li><strong>Risk Involved</strong> - Dangerous or risky jobs often pay more</li>
              <li><strong>Supply and Demand</strong> - If many people want a job but few positions exist, it pays more</li>
            </ul>
            
            <h4>Examples of How This Works</h4>
            <ul>
              <li>Brain surgeons earn more than cashiers because their job requires many years of education and training</li>
              <li>Professional athletes earn a lot because very few people have their level of skill</li>
              <li>CEOs earn more than regular employees because they have more responsibility</li>
              <li>Jobs in dangerous conditions (like deep-sea fishing) often pay more than safer jobs</li>
            </ul>
            
            <h3>The Connection Between Education and Earning</h3>
            
            <h4>Why Learning Matters for Earning</h4>
            <p>Generally, people who learn more skills and get more education have opportunities to earn more money:</p>
            <ul>
              <li><strong>High School Diploma</strong> - Opens doors to many entry-level jobs</li>
              <li><strong>College Degree</strong> - Qualifies you for professional and management positions</li>
              <li><strong>Advanced Degrees</strong> - Required for specialized fields like medicine or law</li>
              <li><strong>Trade Skills</strong> - Specialized training for jobs like plumbing or electrical work</li>
              <li><strong>Continuous Learning</strong> - Staying current with new technologies and methods</li>
            </ul>
            
            <h4>Skills That Help in Almost Every Job</h4>
            <ul>
              <li><strong>Communication</strong> - Being able to speak, write, and listen well</li>
              <li><strong>Problem-Solving</strong> - Finding solutions when things go wrong</li>
              <li><strong>Teamwork</strong> - Working well with other people</li>
              <li><strong>Reliability</strong> - Showing up on time and doing what you promise</li>
              <li><strong>Adaptability</strong> - Being able to learn new things and adjust to changes</li>
            </ul>
            
            <h3>Understanding the Value of Work</h3>
            
            <h4>Why Work Is Important</h4>
            <ul>
              <li><strong>Provides Income</strong> - Money to buy necessities and wants</li>
              <li><strong>Creates Purpose</strong> - Gives people a sense of contribution and meaning</li>
              <li><strong>Builds Skills</strong> - Helps people develop and improve abilities</li>
              <li><strong>Connects People</strong> - Creates relationships and community</li>
              <li><strong>Serves Others</strong> - Most jobs help other people in some way</li>
            </ul>
            
            <h4>The Dignity of All Honest Work</h4>
            <p>Every honest job that helps others or contributes to society has value and dignity. A janitor who keeps buildings clean is just as important as a doctor who heals people - they both contribute to making life better for others. No honest work should be looked down upon.</p>
            
            <h3>Planning for Your Future Earning Potential</h3>
            
            <h4>Things You Can Do Now</h4>
            <ul>
              <li><strong>Do Well in School</strong> - Education opens doors to opportunities</li>
              <li><strong>Develop Good Work Habits</strong> - Be reliable, punctual, and hardworking</li>
              <li><strong>Learn New Skills</strong> - Take up hobbies and activities that teach you things</li>
              <li><strong>Help Others</strong> - Practice creating value for people around you</li>
              <li><strong>Save and Invest</strong> - Start building wealth early</li>
              <li><strong>Stay Curious</strong> - Keep learning about the world and how things work</li>
            </ul>
            
            <h4>Exploring Career Interests</h4>
            <ul>
              <li>Talk to adults about their jobs</li>
              <li>Visit workplaces when possible</li>
              <li>Try different activities to discover your interests</li>
              <li>Read about different careers</li>
              <li>Consider what problems you'd like to help solve</li>
            </ul>
          `
        },
        quiz: [
          {
            id: 1,
            question: "What are the two main types of income people earn?",
            options: ["Cash and credit", "Earned and unearned income", "Big and small", "Daily and monthly"],
            correct: "Earned and unearned income",
            explanation: "Earned income comes from working (like wages), while unearned income comes from investments or gifts."
          },
          {
            id: 2,
            question: "Which is an example of earned income?",
            options: ["Birthday money", "Money from a lemonade stand", "Finding money on the ground", "Interest from a bank"],
            correct: "Money from a lemonade stand",
            explanation: "Money from a lemonade stand is earned because you worked to make and sell the lemonade."
          },
          {
            id: 3,
            question: "What should you do first when you earn money?",
            options: ["Spend it immediately", "Think about your goals", "Give it away", "Hide it"],
            correct: "Think about your goals",
            explanation: "Before spending money, it's smart to think about what you want to accomplish with it."
          },
          {
            id: 4,
            question: "Which job would likely earn more money?",
            options: ["A job requiring special training", "A job anyone can do", "A job you do for fun", "A job that's very easy"],
            correct: "A job requiring special training",
            explanation: "Jobs that require special skills or training usually pay more because fewer people can do them."
          },
          {
            id: 5,
            question: "What is the best way for a kid to start earning money?",
            options: ["Asking for handouts", "Doing chores and helping others", "Finding money", "Borrowing from friends"],
            correct: "Doing chores and helping others",
            explanation: "The best way to earn money is by providing value to others through work and helpful actions."
          },
          {
            id: 6,
            question: "Why do different jobs pay different amounts?",
            options: ["It's random", "Based on how much value they create", "Based on age only", "All jobs pay the same"],
            correct: "Based on how much value they create",
            explanation: "Jobs that create more value for people and society typically earn higher wages."
          },
          {
            id: 7,
            question: "What skill is important for almost every job?",
            options: ["Being tall", "Good communication", "Having lots of money", "Being the youngest"],
            correct: "Good communication",
            explanation: "Good communication skills help in almost every job because you need to work with other people."
          },
          {
            id: 8,
            question: "If you want to earn more money in the future, what should you do now?",
            options: ["Stop going to school", "Learn new skills and study", "Only play games", "Avoid work completely"],
            correct: "Learn new skills and study",
            explanation: "Learning and developing skills now will help you qualify for better-paying jobs in the future."
          },
          {
            id: 9,
            question: "What's the connection between helping others and earning money?",
            options: ["There is no connection", "Helping others is how you create value and earn money", "You should never help others", "Helping others costs money"],
            correct: "Helping others is how you create value and earn money",
            explanation: "Most jobs involve helping other people solve problems or meet their needs, which is why we get paid."
          },
          {
            id: 10,
            question: "What's the most important thing to remember about earning money?",
            options: ["Money appears magically", "All work is the same", "Money must be earned through effort and value creation", "Only adults can earn money"],
            correct: "Money must be earned through effort and value creation",
            explanation: "Understanding that money is earned through hard work and creating value for others is a fundamental life lesson."
          }
        ],
        xpReward: 100
      },
      3: {
        title: "Needs vs Wants",
        videoUrl: "https://www.youtube.com/embed/aRcXutXvfmM",
        videoLink: "https://www.youtube.com/watch?v=aRcXutXvfmM",
        videoTitle: "Grade 3: Financial Literacy—Needs and Wants for Kids",
        article: {
          title: "Understanding the Difference Between Needs and Wants",
          content: `
            <h2>Needs vs Wants: Making Smart Choices with Your Money</h2>
            <p>One of the most important skills in managing money is understanding the difference between needs and wants. This knowledge will help you make smart decisions about spending and ensure you always have money for the most important things in life.</p>
            
            <h3>What Are Needs?</h3>
            <p>Needs are things that are absolutely necessary for your survival, health, safety, and basic well-being. These are things you must have to live a healthy life. Without needs being met, you could become sick, unsafe, or unable to function properly in society.</p>
            
            <h4>Basic Human Needs</h4>
            <ul>
              <li><strong>Food and Water</strong> - Your body needs nutrition and hydration to survive and grow</li>
              <li><strong>Shelter</strong> - A safe place to live that protects you from weather and danger</li>
              <li><strong>Clothing</strong> - Appropriate clothes to protect your body and maintain health</li>
              <li><strong>Healthcare</strong> - Medical care when you're sick or injured</li>
              <li><strong>Safety and Security</strong> - Protection from harm and danger</li>
            </ul>
            
            <h4>Educational and Social Needs</h4>
            <ul>
              <li><strong>Education</strong> - School supplies, books, and learning materials</li>
              <li><strong>Transportation</strong> - Ways to get to school, work, and essential places</li>
              <li><strong>Communication</strong> - Basic ways to stay in touch with family and emergency services</li>
              <li><strong>Personal Hygiene</strong> - Items needed to stay clean and healthy</li>
            </ul>
            
            <h3>What Are Wants?</h3>
            <p>Wants are things that would be nice to have but aren't necessary for survival or basic well-being. Wants make life more enjoyable, fun, or convenient, but you can live without them. The tricky part is that wants can sometimes feel very important, especially when you really desire something!</p>
            
            <h4>Common Examples of Wants</h4>
            <ul>
              <li><strong>Entertainment</strong> - Video games, movies, toys, books for fun</li>
              <li><strong>Luxury Items</strong> - Designer clothes, expensive gadgets, fancy accessories</li>
              <li><strong>Convenience Items</strong> - Things that make life easier but aren't necessary</li>
              <li><strong>Social Items</strong> - Things you want because friends have them</li>
              <li><strong>Hobby Supplies</strong> - Extra materials for activities you enjoy</li>
            </ul>
            
            <h3>The Gray Area: When Needs and Wants Overlap</h3>
            <p>Sometimes it's not perfectly clear whether something is a need or a want. The same category of item can be both, depending on the specific situation:</p>
            
            <h4>Clothing Examples</h4>
            <ul>
              <li><strong>Need</strong> - A warm winter coat when it's cold outside</li>
              <li><strong>Want</strong> - A designer winter coat when you already have a warm one</li>
              <li><strong>Need</strong> - School-appropriate clothes that fit properly</li>
              <li><strong>Want</strong> - The most expensive brand-name clothes</li>
            </ul>
            
            <h4>Food Examples</h4>
            <ul>
              <li><strong>Need</strong> - Nutritious meals that keep you healthy</li>
              <li><strong>Want</strong> - Expensive restaurant meals or lots of candy</li>
              <li><strong>Need</strong> - Enough food to prevent hunger</li>
              <li><strong>Want</strong> - Your favorite snacks and treats</li>
            </ul>
            
            <h4>Technology Examples</h4>
            <ul>
              <li><strong>Need</strong> - A basic way to communicate for safety (like a simple phone)</li>
              <li><strong>Want</strong> - The newest, most expensive smartphone</li>
              <li><strong>Need</strong> - A computer for required schoolwork</li>
              <li><strong>Want</strong> - A gaming computer for entertainment</li>
            </ul>
            
            <h3>Why Understanding Needs vs Wants Matters</h3>
            
            <h4>Financial Benefits</h4>
            <ul>
              <li><strong>Better Budgeting</strong> - You can prioritize spending on what's most important</li>
              <li><strong>Avoid Debt</strong> - You're less likely to borrow money for unnecessary things</li>
              <li><strong>Build Savings</strong> - Money not spent on wants can be saved for goals</li>
              <li><strong>Emergency Preparedness</strong> - You'll have money available for unexpected needs</li>
            </ul>
            
            <h4>Life Skills Benefits</h4>
            <ul>
              <li><strong>Self-Control</strong> - Learning to delay gratification builds character</li>
              <li><strong>Decision-Making</strong> - Practice making thoughtful choices</li>
              <li><strong>Appreciation</strong> - You'll value things more when you work and wait for them</li>
              <li><strong>Independence</strong> - You won't rely on others to buy you everything you want</li>
            </ul>
            
            <h3>Strategies for Managing Needs and Wants</h3>
            
            <h4>The Priority System</h4>
            <ol>
              <li><strong>Essential Needs First</strong> - Always ensure basic needs are covered</li>
              <li><strong>Important Wants Second</strong> - Things that would significantly improve your life</li>
              <li><strong>Nice-to-Have Wants Last</strong> - Things that would be fun but aren't important</li>
            </ol>
            
            <h4>The 24-Hour Rule</h4>
            <p>When you want to buy something that isn't a need, wait 24 hours before purchasing. This helps you:</p>
            <ul>
              <li>Avoid impulse purchases</li>
              <li>Think about whether you really want the item</li>
              <li>Consider if the money could be better used elsewhere</li>
              <li>Sometimes realize you don't actually want the item anymore</li>
            </ul>
            
            <h4>The Substitute Strategy</h4>
            <p>Look for less expensive ways to satisfy wants:</p>
            <ul>
              <li>Borrow books from the library instead of buying them</li>
              <li>Buy used items instead of new ones</li>
              <li>Make things yourself instead of buying them</li>
              <li>Find free activities instead of expensive entertainment</li>
            </ul>
            
            <h3>Questions to Ask Yourself</h3>
            <p>When deciding whether something is a need or want, ask yourself:</p>
            
            <h4>The Need Test</h4>
            <ul>
              <li>Will I be unsafe, unhealthy, or unable to function without this?</li>
              <li>Is this required for school, work, or basic living?</li>
              <li>Do I already have something that serves this purpose?</li>
              <li>What would happen if I didn't buy this?</li>
            </ul>
            
            <h4>The Want Evaluation</h4>
            <ul>
              <li>How long have I wanted this item?</li>
              <li>Will I still want this in a month?</li>
              <li>Am I wanting this because of advertising or peer pressure?</li>
              <li>Could I use this money for something more important?</li>
              <li>Have I saved up for this, or would I need to use money meant for needs?</li>
            </ul>
            
            <h3>Dealing with Peer Pressure and Advertising</h3>
            
            <h4>When Friends Have Things You Want</h4>
            <p>It's natural to want things your friends have, but remember:</p>
            <ul>
              <li>Everyone's family has different financial situations</li>
              <li>Your friends might be spending money meant for needs on wants</li>
              <li>True friends will like you regardless of what you own</li>
              <li>You can still have fun without having the same things</li>
            </ul>
            
            <h4>How Advertising Tries to Confuse You</h4>
            <p>Advertisers often try to make wants seem like needs by:</p>
            <ul>
              <li>Using words like "essential," "must-have," or "necessary"</li>
              <li>Showing people being unhappy without the product</li>
              <li>Suggesting you'll be left out without the item</li>
              <li>Creating artificial urgency with "limited time" offers</li>
            </ul>
            
            <h3>Teaching Others About Needs vs Wants</h3>
            <p>Once you understand this concept, you can help others by:</p>
            <ul>
              <li>Explaining the difference to younger siblings</li>
              <li>Helping friends think through their spending decisions</li>
              <li>Setting a good example with your own choices</li>
              <li>Discussing family spending decisions respectfully</li>
            </ul>
            
            <h3>Building Long-Term Wealth</h3>
            <p>Understanding needs vs wants is the foundation of building wealth over time:</p>
            <ul>
              <li><strong>Spend Less Than You Earn</strong> - Only buy needs and carefully chosen wants</li>
              <li><strong>Save the Difference</strong> - Money not spent on wants can be invested</li>
              <li><strong>Compound Growth</strong> - Saved money grows over time through interest and investments</li>
              <li><strong>Financial Freedom</strong> - Eventually, you'll have enough money that more things become affordable</li>
            </ul>
            
            <h4>The Millionaire Mindset</h4>
            <p>Many wealthy people became rich not by earning huge amounts, but by consistently choosing needs over wants and investing the difference. They understand that:</p>
            <ul>
              <li>Every dollar spent on wants is a dollar not invested for the future</li>
              <li>Small sacrifices today can lead to big rewards tomorrow</li>
              <li>True wealth comes from owning assets, not just having nice things</li>
              <li>Financial security is more valuable than temporary pleasures</li>
            </ul>
          `
        },
        quiz: [
          {
            id: 1,
            question: "What is a need?",
            options: ["Something you want to have", "Something necessary for survival and well-being", "Something expensive", "Something your friends have"],
            correct: "Something necessary for survival and well-being",
            explanation: "Needs are essential things you must have to survive and be healthy, like food, shelter, and clothing."
          },
          {
            id: 2,
            question: "Which of these is a NEED?",
            options: ["Video games", "Designer shoes", "Healthy food", "The latest phone"],
            correct: "Healthy food",
            explanation: "Healthy food is essential for your body to grow and stay strong - it's a basic need for survival."
          },
          {
            id: 3,
            question: "Which of these is a WANT?",
            options: ["A safe place to live", "Medicine when you're sick", "A candy bar", "Weather-appropriate clothes"],
            correct: "A candy bar",
            explanation: "A candy bar is a treat that tastes good but isn't necessary for your health or survival - it's a want."
          },
          {
            id: 4,
            question: "What should you do BEFORE spending money on wants?",
            options: ["Buy everything immediately", "Make sure all your needs are covered first", "Ask your friends what to buy", "Spend all your money"],
            correct: "Make sure all your needs are covered first",
            explanation: "Always prioritize needs over wants - make sure you have everything necessary for survival and well-being first."
          },
          {
            id: 5,
            question: "Why is it important to understand needs vs wants?",
            options: ["To impress your friends", "To make smart financial decisions", "To spend more money", "To buy expensive things"],
            correct: "To make smart financial decisions",
            explanation: "Understanding needs vs wants helps you prioritize spending and make wise choices with your money."
          },
          {
            id: 6,
            question: "What is the 24-hour rule?",
            options: ["Sleep 24 hours a day", "Wait 24 hours before buying a want", "Work 24 hours", "Save money for 24 days"],
            correct: "Wait 24 hours before buying a want",
            explanation: "The 24-hour rule means waiting a full day before buying something you want to make sure you really need it."
          },
          {
            id: 7,
            question: "If you want a new toy but need school supplies, what should you do?",
            options: ["Buy the toy first", "Buy the school supplies first", "Buy neither", "Ask someone else to buy both"],
            correct: "Buy the school supplies first",
            explanation: "School supplies are a need for education, while toys are wants. Always meet needs first."
          },
          {
            id: 8,
            question: "What makes something a need instead of a want?",
            options: ["How much it costs", "Whether it's necessary for health, safety, or survival", "Whether your friends have it", "Whether it's fun"],
            correct: "Whether it's necessary for health, safety, or survival",
            explanation: "Needs are determined by whether they're essential for your basic health, safety, and survival."
          },
          {
            id: 9,
            question: "How can advertising affect your understanding of needs vs wants?",
            options: ["It helps you save money", "It can make wants seem like needs", "It only shows needs", "It doesn't affect anything"],
            correct: "It can make wants seem like needs",
            explanation: "Advertising often tries to convince us that wants are actually needs to get us to buy more things."
          },
          {
            id: 10,
            question: "What's a good strategy for managing wants?",
            options: ["Buy everything you want immediately", "Never buy anything you want", "Make a list and prioritize wants after needs are met", "Only buy what friends have"],
            correct: "Make a list and prioritize wants after needs are met",
            explanation: "Creating a prioritized list of wants and only buying them after needs are covered is a smart money strategy."
          }
        ],
        xpReward: 100
      },
      4: {
        title: "Banking Basics",
        videoUrl: "https://www.youtube.com/embed/OlSc8BjIv9c",
        videoLink: "https://www.youtube.com/watch?v=OlSc8BjIv9c",
        videoTitle: "Grade 3: Banking Basics for Kids",
        article: {
          title: "Understanding Banks and How They Work",
          content: `
            <h2>Banking Basics: Your First Steps into the Financial World</h2>
            <p>Banks are special businesses that help people keep their money safe and make it easier to use. Understanding how banks work is one of the most important financial skills you'll ever learn, because banks will be part of your financial life from childhood through adulthood.</p>
            
            <h3>What is a Bank?</h3>
            <p>A bank is a secure place where people can store their money, borrow money when they need it, and use various financial services. Banks are much more than just giant safes - they're the foundation of our entire economic system. When you put money in a bank, you're not just storing it; you're participating in a system that helps money flow throughout the economy.</p>
            
            <h4>The Three Main Jobs of Banks</h4>
            <ul>
              <li><strong>Safekeeping</strong> - Banks protect your money much better than you could at home</li>
              <li><strong>Lending</strong> - Banks lend money to people who need it for important purchases</li>
              <li><strong>Services</strong> - Banks provide useful services like debit cards, online banking, and money transfers</li>
            </ul>
            
            <h3>Types of Bank Accounts</h3>
            
            <h4>Savings Accounts</h4>
            <p>A savings account is designed to help you save money for the future. When you put money in a savings account, the bank pays you a small amount extra called "interest." This means your money grows slowly over time, even when you're not adding to it. Savings accounts are perfect for:</p>
            <ul>
              <li>Emergency funds</li>
              <li>Saving for special purchases</li>
              <li>Building good money habits</li>
              <li>Learning about interest</li>
            </ul>
            
            <h4>Checking Accounts</h4>
            <p>Checking accounts are designed for money you plan to spend soon. These accounts usually don't earn interest, but they come with convenient features like:</p>
            <ul>
              <li>Debit cards for purchases</li>
              <li>Check-writing privileges</li>
              <li>Online bill paying</li>
              <li>ATM access</li>
            </ul>
            
            <h3>How Banks Keep Your Money Safe</h3>
            <p>Banks use multiple layers of security to protect your money:</p>
            
            <h4>Physical Security</h4>
            <ul>
              <li>Thick vault walls and time-locked safes</li>
              <li>Security cameras and alarm systems</li>
              <li>Trained security personnel</li>
              <li>Limited access areas</li>
            </ul>
            
            <h4>Digital Security</h4>
            <ul>
              <li>Encrypted computer systems</li>
              <li>Secure login procedures</li>
              <li>Fraud monitoring systems</li>
              <li>Regular security updates</li>
            </ul>
            
            <h4>Government Protection</h4>
            <p>Most bank accounts are insured by the government through the FDIC (Federal Deposit Insurance Corporation). This means that even if a bank fails, your money (up to $250,000) is protected and guaranteed by the U.S. government.</p>
          `
        },
        quiz: [
          {
            id: 1,
            question: "What are the three main jobs of banks?",
            options: ["Safekeeping, lending, and services", "Saving, spending, and investing", "Cash, checks, and cards", "Interest, fees, and loans"],
            correct: "Safekeeping, lending, and services",
            explanation: "Banks keep money safe, lend money to borrowers, and provide various financial services."
          },
          {
            id: 2,
            question: "What is the main difference between savings and checking accounts?",
            options: ["Savings accounts earn interest, checking accounts are for daily spending", "There is no difference", "Checking accounts are safer", "Savings accounts cost more"],
            correct: "Savings accounts earn interest, checking accounts are for daily spending",
            explanation: "Savings accounts are designed to grow your money with interest, while checking accounts are for everyday transactions."
          },
          {
            id: 3,
            question: "What does FDIC insurance protect?",
            options: ["Up to $250,000 per account", "All your money forever", "Only savings accounts", "Only checking accounts"],
            correct: "Up to $250,000 per account",
            explanation: "FDIC insurance protects bank deposits up to $250,000 per account holder per bank."
          },
          {
            id: 4,
            question: "How do banks make money to pay you interest?",
            options: ["They lend your money to others at higher interest rates", "The government pays them", "They print their own money", "They charge high fees"],
            correct: "They lend your money to others at higher interest rates",
            explanation: "Banks earn money by lending deposited funds to borrowers at higher interest rates than they pay to depositors."
          },
          {
            id: 5,
            question: "What can you do at an ATM?",
            options: ["Withdraw cash, deposit money, check balance, transfer funds", "Only withdraw cash", "Only check your balance", "Open new accounts"],
            correct: "Withdraw cash, deposit money, check balance, transfer funds",
            explanation: "Modern ATMs offer many services including cash withdrawal, deposits, balance inquiries, and transfers."
          },
          {
            id: 6,
            question: "Why is it safer to keep money in a bank than at home?",
            options: ["Banks have security systems and government insurance", "Banks never get robbed", "Home safes are illegal", "Banks pay you to keep money there"],
            correct: "Banks have security systems and government insurance",
            explanation: "Banks have multiple security measures and FDIC insurance protection that homes don't have."
          },
          {
            id: 7,
            question: "What should you consider when choosing a bank?",
            options: ["Location, fees, services, and convenience", "Only the interest rate", "Only the location", "Only the bank's name"],
            correct: "Location, fees, services, and convenience",
            explanation: "When choosing a bank, consider multiple factors including convenience, costs, and available services."
          },
          {
            id: 8,
            question: "What is interest?",
            options: ["Extra money the bank pays you for keeping money with them", "Money you pay to use the bank", "A type of bank account", "A banking fee"],
            correct: "Extra money the bank pays you for keeping money with them",
            explanation: "Interest is the bank's payment to you for allowing them to use your deposited money."
          },
          {
            id: 9,
            question: "What are youth banking programs?",
            options: ["Special accounts designed for young people with benefits", "Regular accounts for adults", "Investment accounts only", "Business accounts for kids"],
            correct: "Special accounts designed for young people with benefits",
            explanation: "Youth banking programs offer special accounts with features like lower fees and educational resources for young customers."
          },
          {
            id: 10,
            question: "What can you do with online banking?",
            options: ["Check balances, pay bills, transfer money, deposit checks", "Only check your balance", "Only pay bills", "Nothing useful"],
            correct: "Check balances, pay bills, transfer money, deposit checks",
            explanation: "Online banking offers many convenient services including balance checking, bill paying, transfers, and mobile check deposits."
          }
        ],
        xpReward: 100
      }
    },
    4: {
      1: {
        title: "Budgeting Basics",
        videoUrl: "https://www.youtube.com/embed/-0kXmaGqLhE",
        videoLink: "https://www.youtube.com/watch?v=-0kXmaGqLhE",
        videoTitle: "Grade 4: What is a Budget (Ages 10-17)",
        article: {
          title: "Learning to Budget Your Money",
          content: `
            <h2>Budgeting Basics: Your First Guide to Managing Money</h2>
            <p>A budget is like a map for your money - it helps you plan where your money will go before you spend it. Creating and following a budget is one of the most important life skills you can develop, and it's never too early to start!</p>
            
            <h3>What is a Budget?</h3>
            <p>A budget is a plan that shows how much money you have coming in (your income) and how you plan to spend or save it. Think of it as giving every dollar a job before you spend it. With a budget, you decide in advance what your money will do instead of wondering where it all went!</p>
            
            <h4>Why Budgets Are Important</h4>
            <ul>
              <li><strong>Control Your Money</strong> - Instead of money controlling you, you control your money</li>
              <li><strong>Reach Your Goals</strong> - Budgets help you save for things you really want</li>
              <li><strong>Avoid Money Problems</strong> - You won't run out of money for important things</li>
              <li><strong>Reduce Stress</strong> - Knowing where your money goes gives you peace of mind</li>
              <li><strong>Build Good Habits</strong> - Starting young helps you develop lifelong money skills</li>
            </ul>
            
            <h3>The Basic Budget Formula</h3>
            <p>Every budget follows the same simple formula:</p>
            <p><strong>Income - Expenses = What's Left Over</strong></p>
            
            <h4>Understanding Income</h4>
            <p>Income is all the money you receive. For kids, this might include:</p>
            <ul>
              <li>Allowance from parents</li>
              <li>Money from chores</li>
              <li>Birthday or holiday gifts</li>
              <li>Money from small jobs (like pet sitting)</li>
              <li>Found money (like coins from the couch!)</li>
            </ul>
            
            <h4>Understanding Expenses</h4>
            <p>Expenses are all the ways you spend money. These fall into two categories:</p>
            
            <p><strong>Fixed Expenses</strong> - These stay the same each month:</p>
            <ul>
              <li>School lunch money</li>
              <li>Regular savings contributions</li>
              <li>Any regular purchases you commit to</li>
            </ul>
            
            <p><strong>Variable Expenses</strong> - These change from month to month:</p>
            <ul>
              <li>Snacks and treats</li>
              <li>Entertainment (movies, games)</li>
              <li>Gifts for friends</li>
              <li>Toys and fun purchases</li>
            </ul>
            
            <h3>Creating Your First Budget</h3>
            
            <h4>Step 1: Track Your Money for One Week</h4>
            <p>Before making a budget, you need to know your current money habits. For one week, write down:</p>
            <ul>
              <li>Every dollar you receive (and where it came from)</li>
              <li>Every dollar you spend (and what you bought)</li>
              <li>How much money you had at the start and end of the week</li>
            </ul>
            
            <h4>Step 2: Calculate Your Monthly Income</h4>
            <p>Add up all the money you typically receive in a month. If your income varies, use an average of the last few months.</p>
            
            <h4>Step 3: List Your Expenses</h4>
            <p>Write down everything you typically spend money on in a month. Don't forget small purchases - they add up!</p>
            
            <h4>Step 4: Categorize Your Spending</h4>
            <p>Group your expenses into categories like:</p>
            <ul>
              <li>Needs (things you must have)</li>
              <li>Wants (things you'd like to have)</li>
              <li>Savings (money for future goals)</li>
              <li>Giving (money you donate or give as gifts)</li>
            </ul>
            
            <h3>The 50-30-20 Rule for Kids</h3>
            <p>A simple way to divide your money is:</p>
            <ul>
              <li><strong>50% for Needs</strong> - Essential things like school supplies</li>
              <li><strong>30% for Wants</strong> - Fun things like toys and treats</li>
              <li><strong>20% for Savings</strong> - Money for future goals</li>
            </ul>
            
            <h4>Adjusting the Rule</h4>
            <p>You can adjust these percentages based on your situation. For example:</p>
            <ul>
              <li>If you have a big savings goal, you might save 30% and spend 20% on wants</li>
              <li>If you have fewer needs, you might have more for wants and savings</li>
              <li>The key is finding what works for your situation</li>
            </ul>
            
            <h3>Tips for Successful Budgeting</h3>
            
            <h4>Start Simple</h4>
            <p>Your first budget doesn't need to be perfect. Start with basic categories and adjust as you learn more about your spending habits.</p>
            
            <h4>Review and Adjust</h4>
            <p>Check your budget weekly. If you're consistently overspending in one area, either adjust that category or find ways to spend less.</p>
            
            <h4>Use the Envelope Method</h4>
            <p>Put cash for different categories in separate envelopes. When an envelope is empty, you're done spending in that category for the month.</p>
            
            <h4>Track Everything</h4>
            <p>Write down every purchase, no matter how small. Small expenses can add up to big problems if you're not paying attention.</p>
            
            <h3>Common Budgeting Mistakes to Avoid</h3>
            <ul>
              <li><strong>Being Too Restrictive</strong> - Allow some money for fun, or you'll get frustrated</li>
              <li><strong>Forgetting Small Expenses</strong> - Small purchases add up quickly</li>
              <li><strong>Not Planning for Surprises</strong> - Include a category for unexpected expenses</li>
              <li><strong>Giving Up Too Quickly</strong> - Budgeting is a skill that takes practice</li>
              <li><strong>Not Adjusting</strong> - Your budget should change as your life changes</li>
            </ul>
          `
        },
        quiz: [
          {
            id: 1,
            question: "What is a budget?",
            options: ["A type of bank account", "A plan for how to spend and save your money", "A way to get more money", "A kind of loan"],
            correct: "A plan for how to spend and save your money",
            explanation: "A budget is a plan that helps you decide how to use your money before you spend it."
          },
          {
            id: 2,
            question: "What is the basic budget formula?",
            options: ["Income + Expenses = Savings", "Income - Expenses = What's Left Over", "Expenses - Income = Debt", "Savings + Spending = Income"],
            correct: "Income - Expenses = What's Left Over",
            explanation: "The basic budget formula shows that what you have left depends on your income minus your expenses."
          },
          {
            id: 3,
            question: "What are fixed expenses?",
            options: ["Expenses that change every month", "Expenses that stay the same each month", "Expenses you never have", "Expenses that are broken"],
            correct: "Expenses that stay the same each month",
            explanation: "Fixed expenses are costs that remain constant each month, like school lunch money or regular savings."
          },
          {
            id: 4,
            question: "In the 50-30-20 rule, what does the 20% represent?",
            options: ["Needs", "Wants", "Savings", "Giving"],
            correct: "Savings",
            explanation: "In the 50-30-20 rule, 20% of your money should go toward savings for future goals."
          },
          {
            id: 5,
            question: "Why should you track your money for a week before making a budget?",
            options: ["To impress your friends", "To understand your current spending habits", "Because it's required by law", "To make more money"],
            correct: "To understand your current spending habits",
            explanation: "Tracking your money helps you see where your money actually goes before you make a plan for where it should go."
          },
          {
            id: 6,
            question: "What is the envelope method?",
            options: ["Mailing your money to the bank", "Putting cash for different categories in separate envelopes", "Hiding money in envelopes", "A way to make envelopes"],
            correct: "Putting cash for different categories in separate envelopes",
            explanation: "The envelope method helps you stick to your budget by physically separating money for different spending categories."
          },
          {
            id: 7,
            question: "Which is an example of a variable expense?",
            options: ["School lunch money", "Regular savings", "Snacks and treats", "Required school supplies"],
            correct: "Snacks and treats",
            explanation: "Snacks and treats are variable expenses because the amount you spend on them can change from month to month."
          },
          {
            id: 8,
            question: "What should you do if you consistently overspend in one category?",
            options: ["Ignore it", "Stop budgeting", "Adjust the budget or find ways to spend less", "Spend more in other categories"],
            correct: "Adjust the budget or find ways to spend less",
            explanation: "If you're overspending in a category, you need to either increase that category's budget or find ways to reduce spending."
          },
          {
            id: 9,
            question: "Why is it important to include money for fun in your budget?",
            options: ["It's required by law", "So you won't get frustrated and give up on budgeting", "To impress others", "It's not important"],
            correct: "So you won't get frustrated and give up on budgeting",
            explanation: "Including some money for fun makes your budget more realistic and sustainable long-term."
          },
          {
            id: 10,
            question: "How often should you review your budget?",
            options: ["Never", "Once a year", "Weekly", "Only when you have problems"],
            correct: "Weekly",
            explanation: "Reviewing your budget weekly helps you stay on track and make adjustments when needed."
          }
        ],
        xpReward: 150
      }
    },
    5: {
      1: {
        title: "Advanced Budgeting",
        videoUrl: "https://www.youtube.com/embed/-0kXmaGqLhE",
        videoLink: "https://www.youtube.com/watch?v=-0kXmaGqLhE",
        videoTitle: "Grade 5: What is a Budget (Ages 10-17)",
        article: {
          title: "Advanced Budgeting Strategies",
          content: `
            <h2>Advanced Budgeting: Taking Your Money Management to the Next Level</h2>
            <p>Now that you understand basic budgeting, it's time to learn more sophisticated strategies that will help you manage money like a financial expert. Advanced budgeting involves detailed planning, tracking multiple goals, and using various tools and techniques to optimize your financial decisions.</p>
            
            <h3>Beyond Basic Categories: Detailed Budget Planning</h3>
            <p>Advanced budgeters don't just use broad categories like "wants" and "needs." They break their spending into specific, detailed categories that give them precise control over their money.</p>
            
            <h4>Detailed Expense Categories</h4>
            <ul>
              <li><strong>Fixed Monthly Expenses</strong>
                <ul>
                  <li>School supplies (monthly average)</li>
                  <li>Transportation costs</li>
                  <li>Phone or internet services</li>
                  <li>Subscription services</li>
                </ul>
              </li>
              <li><strong>Variable Expenses</strong>
                <ul>
                  <li>Food and snacks</li>
                  <li>Entertainment (movies, games, books)</li>
                  <li>Clothing and accessories</li>
                  <li>Gifts for others</li>
                  <li>Personal care items</li>
                </ul>
              </li>
              <li><strong>Savings Categories</strong>
                <ul>
                  <li>Emergency fund</li>
                  <li>Short-term goals (things you want in 1-6 months)</li>
                  <li>Medium-term goals (things you want in 6 months to 2 years)</li>
                  <li>Long-term goals (things you want in 2+ years)</li>
                </ul>
              </li>
            </ul>
            
            <h3>The Zero-Based Budget Method</h3>
            <p>Zero-based budgeting means giving every dollar a specific job. Your income minus all your planned expenses and savings should equal zero. This doesn't mean you spend everything - it means every dollar is assigned a purpose, including savings.</p>
            
            <h4>How to Create a Zero-Based Budget</h4>
            <ol>
              <li><strong>List Your Total Income</strong> - Include all money sources</li>
              <li><strong>List Fixed Expenses First</strong> - These are your non-negotiable costs</li>
              <li><strong>Assign Money to Savings Goals</strong> - Pay yourself first by prioritizing savings</li>
              <li><strong>Allocate Remaining Money</strong> - Distribute what's left among variable expenses</li>
              <li><strong>Adjust Until You Reach Zero</strong> - Every dollar should have an assigned category</li>
            </ol>
            
            <h3>Multi-Goal Savings Strategies</h3>
            <p>Advanced budgeters typically save for multiple goals simultaneously. This requires careful planning and allocation.</p>
            
            <h4>The Savings Hierarchy</h4>
            <ol>
              <li><strong>Emergency Fund</strong> - Start with a small emergency fund ($50-100)</li>
              <li><strong>High-Priority Short-Term Goals</strong> - Things you need soon</li>
              <li><strong>Medium-Term Goals</strong> - Important wants with longer timelines</li>
              <li><strong>Long-Term Goals</strong> - Future planning and wealth building</li>
            </ol>
            
            <h4>Percentage-Based Goal Allocation</h4>
            <p>Divide your savings money among goals based on priority and timeline:</p>
            <ul>
              <li>40% to emergency fund (until you reach your target)</li>
              <li>35% to your highest priority current goal</li>
              <li>15% to medium-term goals</li>
              <li>10% to long-term goals</li>
            </ul>
            
            <h3>Advanced Budgeting Tools and Techniques</h3>
            
            <h4>The Envelope System 2.0</h4>
            <p>Modern envelope budgeting can use digital tools:</p>
            <ul>
              <li><strong>Physical Cash Envelopes</strong> - For categories where cash helps control spending</li>
              <li><strong>Digital Envelopes</strong> - Using apps or spreadsheets to track category spending</li>
              <li><strong>Hybrid Approach</strong> - Cash for problem areas, digital tracking for others</li>
            </ul>
            
            <h4>The 24-Hour Purchase Rule</h4>
            <p>For any unplanned purchase over a set amount (like $10), wait 24 hours before buying. This prevents impulse purchases and helps you stick to your budget.</p>
            
            <h4>Seasonal Budget Adjustments</h4>
            <p>Advanced budgeters plan for seasonal changes:</p>
            <ul>
              <li><strong>Back-to-School Season</strong> - Increase school supply budget</li>
              <li><strong>Holiday Seasons</strong> - Plan for gift-giving expenses</li>
              <li><strong>Summer Activities</strong> - Budget for camps, activities, or travel</li>
              <li><strong>Birthday Seasons</strong> - If many friends have birthdays in certain months</li>
            </ul>
            
            <h3>Tracking and Analysis Techniques</h3>
            
            <h4>Weekly Budget Reviews</h4>
            <p>Spend 15 minutes each week reviewing:</p>
            <ul>
              <li>How much you spent in each category</li>
              <li>Whether you're on track with your monthly budget</li>
              <li>Any needed adjustments for the coming week</li>
              <li>Progress toward your savings goals</li>
            </ul>
            
            <h4>Monthly Budget Analysis</h4>
            <p>At month's end, analyze:</p>
            <ul>
              <li><strong>Variance Analysis</strong> - Where did you spend more or less than planned?</li>
              <li><strong>Goal Progress</strong> - How much closer are you to your savings goals?</li>
              <li><strong>Pattern Recognition</strong> - Are there spending patterns you should address?</li>
              <li><strong>Success Celebration</strong> - Acknowledge what went well!</li>
            </ul>
            
            <h3>Advanced Money Psychology</h3>
            
            <h4>Understanding Your Money Triggers</h4>
            <p>Advanced budgeters recognize what triggers overspending:</p>
            <ul>
              <li><strong>Emotional Triggers</strong> - Spending when happy, sad, or stressed</li>
              <li><strong>Social Triggers</strong> - Spending to keep up with friends</li>
              <li><strong>Environmental Triggers</strong> - Certain stores or situations that encourage spending</li>
              <li><strong>Time-Based Triggers</strong> - Certain days or times when you overspend</li>
            </ul>
            
            <h4>Building Strong Money Habits</h4>
            <ul>
              <li><strong>Automate Savings</strong> - Set up automatic transfers to savings goals</li>
              <li><strong>Regular Check-ins</strong> - Schedule consistent budget review times</li>
              <li><strong>Celebrate Milestones</strong> - Reward yourself for reaching savings goals</li>
              <li><strong>Learn from Mistakes</strong> - Use overspending as learning opportunities</li>
            </ul>
            
            <h3>Preparing for Financial Independence</h3>
            
            <h4>Building Multiple Income Streams</h4>
            <p>Advanced budgeters plan for multiple income sources:</p>
            <ul>
              <li>Regular allowance or job income</li>
              <li>Occasional work opportunities</li>
              <li>Gifts and windfalls</li>
              <li>Future investment income</li>
            </ul>
            
            <h4>Understanding Opportunity Cost</h4>
            <p>Every spending decision has an opportunity cost - what else you could have done with that money. Advanced budgeters always consider:</p>
            <ul>
              <li>What am I giving up by making this purchase?</li>
              <li>Could this money serve me better in a different way?</li>
              <li>Will this purchase help me reach my bigger goals?</li>
            </ul>
          `
        },
        quiz: [
          {
            id: 1,
            question: "What is zero-based budgeting?",
            options: ["Having zero money", "Giving every dollar a specific purpose", "Spending nothing", "Having no budget categories"],
            correct: "Giving every dollar a specific purpose",
            explanation: "Zero-based budgeting means assigning every dollar to a specific category, including savings, so your income minus planned expenses equals zero."
          },
          {
            id: 2,
            question: "What should be your first savings priority?",
            options: ["The most expensive goal", "Emergency fund", "Entertainment fund", "Gift fund"],
            correct: "Emergency fund",
            explanation: "An emergency fund should be your first savings priority because it protects you from unexpected expenses."
          },
          {
            id: 3,
            question: "What is the 24-hour purchase rule?",
            options: ["Shopping for 24 hours straight", "Waiting 24 hours before making unplanned purchases", "Spending 24 dollars maximum", "Shopping once every 24 days"],
            correct: "Waiting 24 hours before making unplanned purchases",
            explanation: "The 24-hour rule helps prevent impulse buying by requiring you to wait before making unplanned purchases."
          },
          {
            id: 4,
            question: "Why should advanced budgeters plan for seasonal changes?",
            options: ["Weather affects spending patterns", "Some expenses only happen at certain times of year", "It's more fun", "Banks require it"],
            correct: "Some expenses only happen at certain times of year",
            explanation: "Seasonal budgeting helps you prepare for expenses like back-to-school supplies or holiday gifts that occur at specific times."
          },
          {
            id: 5,
            question: "What is opportunity cost?",
            options: ["The cost of buying opportunities", "What you give up when you make a choice", "The cost of expensive items", "A type of investment"],
            correct: "What you give up when you make a choice",
            explanation: "Opportunity cost is what you give up or sacrifice when you choose to spend money on one thing instead of another."
          },
          {
            id: 6,
            question: "How often should you do detailed budget reviews?",
            options: ["Daily", "Weekly", "Yearly", "Never"],
            correct: "Weekly",
            explanation: "Weekly budget reviews help you stay on track and make adjustments before small problems become big ones."
          },
          {
            id: 7,
            question: "What are money triggers?",
            options: ["Things that make you want to spend money", "Parts of a cash register", "Bank fees", "Investment opportunities"],
            correct: "Things that make you want to spend money",
            explanation: "Money triggers are situations, emotions, or environments that encourage you to spend money, often impulsively."
          },
          {
            id: 8,
            question: "Why might you use both physical and digital envelope methods?",
            options: ["It's required by law", "Cash helps control problem spending areas while digital tracks everything else", "It looks more professional", "Banks prefer it"],
            correct: "Cash helps control problem spending areas while digital tracks everything else",
            explanation: "A hybrid approach uses cash for categories where you tend to overspend and digital tracking for convenience in other areas."
          },
          {
            id: 9,
            question: "What percentage of savings should initially go to an emergency fund?",
            options: ["10%", "25%", "40%", "100%"],
            correct: "40%",
            explanation: "Initially, about 40% of your savings should go to building an emergency fund until you reach your target amount."
          },
          {
            id: 10,
            question: "What should you do when you overspend in a category?",
            options: ["Ignore it", "Give up budgeting", "Learn from it and adjust your plan", "Spend more in other categories"],
            correct: "Learn from it and adjust your plan",
            explanation: "Overspending is a learning opportunity that should help you understand your spending patterns and improve your budget."
          }
        ],
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
          title: "Understanding Credit and Debt: A Comprehensive Guide",
          content: `
            <h2>Understanding Credit and Debt: Building Financial Knowledge for Life</h2>
            <p>Credit and debt are powerful financial tools that can either help you achieve your goals or create serious problems if not used wisely. Understanding how they work is crucial for making smart financial decisions throughout your life.</p>
            
            <h3>What is Credit?</h3>
            <p>Credit is the ability to borrow money or receive goods and services with the promise to pay later. When someone gives you credit, they trust that you will repay what you owe. Credit allows people to make large purchases they couldn't afford to pay for all at once.</p>
            
            <h4>Types of Credit</h4>
            
            <p><strong>Installment Credit</strong></p>
            <ul>
              <li>Car loans - borrow money to buy a car, pay back over several years</li>
              <li>Student loans - money for education expenses</li>
              <li>Mortgages - loans to buy houses</li>
              <li>Personal loans - for various purposes with fixed payment schedules</li>
            </ul>
            
            <p><strong>Revolving Credit</strong></p>
            <ul>
              <li>Credit cards - borrow up to a limit, pay back over time</li>
              <li>Store credit cards - credit for specific retailers</li>
              <li>Lines of credit - access to funds up to a certain limit</li>
            </ul>
            
            <h3>Credit Cards vs. Debit Cards: Understanding the Difference</h3>
            
            <h4>Debit Cards</h4>
            <p>Debit cards are connected directly to your bank account. When you use a debit card:</p>
            <ul>
              <li>Money comes directly from your checking account</li>
              <li>You can only spend money you actually have</li>
              <li>No interest charges because you're not borrowing</li>
              <li>No debt is created</li>
              <li>May have daily spending limits</li>
              <li>Great for controlling spending and staying within budget</li>
            </ul>
            
            <h4>Credit Cards</h4>
            <p>Credit cards allow you to borrow money from the card issuer. When you use a credit card:</p>
            <ul>
              <li>You're borrowing money that must be repaid</li>
              <li>You can spend up to your credit limit, even if you don't have the money</li>
              <li>Interest charges apply if you don't pay the full balance</li>
              <li>Creates debt that must be managed</li>
              <li>Can help build credit history when used responsibly</li>
              <li>Offers rewards and purchase protections</li>
            </ul>
            
            <h3>How Credit Cards Work</h3>
            
            <h4>Key Credit Card Terms</h4>
            <ul>
              <li><strong>Credit Limit</strong> - The maximum amount you can borrow</li>
              <li><strong>Balance</strong> - How much you currently owe</li>
              <li><strong>Minimum Payment</strong> - The smallest amount you must pay each month</li>
              <li><strong>Interest Rate (APR)</strong> - The yearly cost of borrowing money</li>
              <li><strong>Grace Period</strong> - Time to pay without interest charges</li>
              <li><strong>Due Date</strong> - When payment must be received</li>
            </ul>
            
            <h4>The Credit Card Cycle</h4>
            <ol>
              <li><strong>Make Purchases</strong> - Use card to buy things</li>
              <li><strong>Receive Statement</strong> - Monthly bill showing all transactions</li>
              <li><strong>Make Payment</strong> - Pay at least the minimum amount</li>
              <li><strong>Interest Calculation</strong> - If you don't pay in full, interest is charged</li>
              <li><strong>Cycle Repeats</strong> - New purchases start the next cycle</li>
            </ol>
            
            <h3>The Dangers of Debt</h3>
            
            <h4>How Debt Can Become a Problem</h4>
            <ul>
              <li><strong>Interest Compounds</strong> - Unpaid interest gets added to the balance</li>
              <li><strong>Minimum Payments Trap</strong> - Paying only minimums keeps you in debt for years</li>
              <li><strong>Credit Score Damage</strong> - Late payments hurt your credit history</li>
              <li><strong>Stress and Anxiety</strong> - Debt creates emotional and financial stress</li>
              <li><strong>Limited Future Options</strong> - Debt reduces your financial flexibility</li>
            </ul>
            
            <h4>The Minimum Payment Trap</h4>
            <p>Credit card companies require only small minimum payments, but this keeps you in debt longer:</p>
            <ul>
              <li>On a $1,000 balance with 18% interest, paying only minimums takes 5+ years</li>
              <li>You'll pay over $600 in interest charges</li>
              <li>The total cost becomes $1,600 for a $1,000 purchase</li>
              <li>Meanwhile, you can't save money for other goals</li>
            </ul>
            
            <h3>Using Credit Responsibly</h3>
            
            <h4>The Golden Rules of Credit Card Use</h4>
            <ol>
              <li><strong>Pay the Full Balance Every Month</strong> - Avoid interest charges completely</li>
              <li><strong>Never Spend More Than You Have</strong> - Only charge what you can afford to pay off</li>
              <li><strong>Pay On Time, Every Time</strong> - Late payments damage credit scores</li>
              <li><strong>Keep Balances Low</strong> - Use less than 30% of your credit limit</li>
              <li><strong>Monitor Your Accounts</strong> - Check statements for errors or fraud</li>
            </ol>
            
            <h4>Good Reasons to Use Credit Cards</h4>
            <ul>
              <li><strong>Building Credit History</strong> - Responsible use improves credit scores</li>
              <li><strong>Purchase Protection</strong> - Better fraud protection than debit cards</li>
              <li><strong>Rewards Programs</strong> - Earn cash back or points on purchases</li>
              <li><strong>Emergency Backup</strong> - Available for true emergencies (but savings is better)</li>
              <li><strong>Convenience</strong> - Easier for online purchases and travel</li>
            </ul>
            
            <h4>Bad Reasons to Use Credit Cards</h4>
            <ul>
              <li>To buy things you can't afford</li>
              <li>To live beyond your means</li>
              <li>Because you don't want to wait and save</li>
              <li>To impress others with expensive purchases</li>
              <li>To pay for regular living expenses when you have cash</li>
            </ul>
            
            <h3>Building Good Credit Early</h3>
            
            <h4>Why Credit History Matters</h4>
            <p>Good credit history helps you:</p>
            <ul>
              <li>Get approved for loans at better interest rates</li>
              <li>Qualify for rental apartments</li>
              <li>Get better insurance rates</li>
              <li>Sometimes get better job opportunities</li>
              <li>Access higher credit limits when needed</li>
            </ul>
            
            <h4>How Young People Can Start Building Credit</h4>
            <ul>
              <li><strong>Become an Authorized User</strong> - Parents can add you to their card</li>
              <li><strong>Student Credit Cards</strong> - Designed for people with limited credit history</li>
              <li><strong>Secured Credit Cards</strong> - Require a deposit but help build credit</li>
              <li><strong>Credit Builder Loans</strong> - Small loans designed to establish credit</li>
            </ul>
            
            <h3>Avoiding Common Credit Mistakes</h3>
            
            <h4>Mistakes That Can Ruin Your Financial Future</h4>
            <ul>
              <li><strong>Making Only Minimum Payments</strong> - Keeps you in debt indefinitely</li>
              <li><strong>Using Credit for Living Expenses</strong> - Creates a cycle of debt</li>
              <li><strong>Ignoring Credit Card Statements</strong> - Miss errors and overspending</li>
              <li><strong>Having Too Many Credit Cards</strong> - More temptation and harder to manage</li>
              <li><strong>Closing Old Credit Cards</strong> - Can hurt your credit score</li>
              <li><strong>Co-signing for Others</strong> - You become responsible for their debt</li>
            </ul>
            
            <h3>What to Do If You Get Into Debt Trouble</h3>
            
            <h4>Warning Signs of Debt Problems</h4>
            <ul>
              <li>Only making minimum payments</li>
              <li>Using credit cards for basic necessities</li>
              <li>Borrowing from one card to pay another</li>
              <li>Avoiding opening credit card statements</li>
              <li>Feeling stressed or anxious about money</li>
            </ul>
            
            <h4>Steps to Get Out of Debt</h4>
            <ol>
              <li><strong>Stop Using Credit Cards</strong> - Don't add to the problem</li>
              <li><strong>List All Debts</strong> - Know exactly what you owe</li>
              <li><strong>Create a Payment Plan</strong> - Focus on highest interest debts first</li>
              <li><strong>Increase Income</strong> - Find ways to earn more money</li>
              <li><strong>Decrease Expenses</strong> - Cut unnecessary spending</li>
              <li><strong>Consider Professional Help</strong> - Credit counseling if needed</li>
            </ol>
            
            <h3>Teaching Others About Credit and Debt</h3>
            <p>Once you understand these concepts, you can help educate friends and family about:</p>
            <ul>
              <li>The difference between credit and debit cards</li>
              <li>How interest charges work</li>
              <li>The importance of paying bills on time</li>
              <li>How to use credit responsibly</li>
              <li>The long-term consequences of debt</li>
            </ul>
          `
        },
        quiz: [
          {
            id: 1,
            question: "What is the main difference between a credit card and a debit card?",
            options: ["Credit cards are plastic, debit cards are paper", "Credit cards let you borrow money, debit cards use your own money", "There is no difference", "Credit cards are safer"],
            correct: "Credit cards let you borrow money, debit cards use your own money",
            explanation: "Credit cards allow you to borrow money that must be repaid, while debit cards use money directly from your bank account."
          },
          {
            id: 2,
            question: "What happens if you only make minimum payments on a credit card?",
            options: ["You pay off the debt quickly", "You stay in debt for many years and pay lots of interest", "Your credit score improves", "Nothing special happens"],
            correct: "You stay in debt for many years and pay lots of interest",
            explanation: "Making only minimum payments keeps you in debt for years and results in paying much more due to interest charges."
          },
          {
            id: 3,
            question: "What is a credit limit?",
            options: ["How fast you can use a credit card", "The maximum amount you can borrow on a credit card", "The minimum payment required", "The interest rate charged"],
            correct: "The maximum amount you can borrow on a credit card",
            explanation: "A credit limit is the maximum amount of money the credit card company will let you borrow."
          },
          {
            id: 4,
            question: "What is the best way to use a credit card?",
            options: ["Make minimum payments to build credit", "Use it to buy things you can't afford", "Pay the full balance every month", "Use it for all purchases"],
            correct: "Pay the full balance every month",
            explanation: "Paying the full balance every month avoids interest charges while building good credit history."
          },
          {
            id: 5,
            question: "What is APR on a credit card?",
            options: ["Annual Percentage Rate - the yearly cost of borrowing", "A type of reward program", "The minimum payment amount", "The credit limit"],
            correct: "Annual Percentage Rate - the yearly cost of borrowing",
            explanation: "APR stands for Annual Percentage Rate and represents the yearly interest rate charged on borrowed money."
          },
          {
            id: 6,
            question: "Why might someone choose a debit card over a credit card?",
            options: ["Debit cards have better rewards", "Debit cards help control spending by using only available money", "Debit cards build credit faster", "Debit cards have no fees"],
            correct: "Debit cards help control spending by using only available money",
            explanation: "Debit cards prevent overspending because you can only use money you actually have in your account."
          },
          {
            id: 7,
            question: "What is a good reason to use a credit card responsibly?",
            options: ["To buy things you can't afford", "To build credit history", "To avoid using your own money", "To get into debt"],
            correct: "To build credit history",
            explanation: "Using credit cards responsibly (paying on time and in full) helps build a positive credit history for the future."
          },
          {
            id: 8,
            question: "What percentage of your credit limit should you try to use?",
            options: ["100%", "75%", "50%", "Less than 30%"],
            correct: "Less than 30%",
            explanation: "Keeping your credit card balance below 30% of your credit limit is good for your credit score."
          },
          {
            id: 9,
            question: "What should you do if you're having trouble paying credit card bills?",
            options: ["Ignore the problem", "Get more credit cards", "Stop using credit cards and create a payment plan", "Only make minimum payments"],
            correct: "Stop using credit cards and create a payment plan",
            explanation: "If you're in debt trouble, stop using credit cards immediately and focus on paying off what you owe."
          },
          {
            id: 10,
            question: "Why is it important to check your credit card statements?",
            options: ["To see pretty pictures", "To look for errors and monitor spending", "Banks require it", "To get rewards"],
            correct: "To look for errors and monitor spending",
            explanation: "Checking statements helps you catch errors, fraudulent charges, and monitor your spending patterns."
          }
        ],
        xpReward: 200
      }
    }
  };

  const currentLesson = lessonContent[grade]?.[module];

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Lesson Not Found</h1>
              <p className="text-gray-600 mb-6">
                Sorry, we couldn't find the lesson you're looking for.
              </p>
              <Link to="/dashboard">
                <Button>
                  <Home className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleVideoComplete = async () => {
    if (!videoCompleted && user) {
      setVideoCompleted(true);
      
      const { data: lesson } = await supabase
        .from('lessons')
        .select('id')
        .eq('grade_level', grade)
        .eq('module_number', module)
        .single();

      if (lesson) {
        await supabase
          .from('lesson_progress')
          .upsert({
            user_id: user.id,
            lesson_id: lesson.id,
            video_completed: true,
            article_completed: progress.article_completed,
            quiz_completed: progress.quiz_completed,
            quiz_score: progress.quiz_score,
            quiz_attempts: progress.quiz_attempts,
            xp_earned: progress.xp_earned
          });
      }
      
      toast.success("Video completed! Great job!");
    }
  };

  const handleArticleComplete = async () => {
    if (!articleCompleted && user) {
      setArticleCompleted(true);
      
      const { data: lesson } = await supabase
        .from('lessons')
        .select('id')
        .eq('grade_level', grade)
        .eq('module_number', module)
        .single();

      if (lesson) {
        await supabase
          .from('lesson_progress')
          .upsert({
            user_id: user.id,
            lesson_id: lesson.id,
            video_completed: progress.video_completed,
            article_completed: true,
            quiz_completed: progress.quiz_completed,
            quiz_score: progress.quiz_score,
            quiz_attempts: progress.quiz_attempts,
            xp_earned: progress.xp_earned
          });
      }
      
      toast.success("Article completed! You're making great progress!");
    }
  };

  const handleQuizAnswer = (questionId: number, answer: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleQuizSubmit = async () => {
    const quiz = currentLesson.quiz;
    let correctAnswers = 0;
    
    quiz.forEach(question => {
      if (quizAnswers[question.id] === question.correct) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / quiz.length) * 100);
    const earnedXP = finalScore >= 70 ? currentLesson.xpReward : Math.round(currentLesson.xpReward * 0.5);
    
    setScore(finalScore);
    setXpEarned(earnedXP);
    setQuizSubmitted(true);
    
    if (user) {
      const { data: lesson } = await supabase
        .from('lessons')
        .select('id')
        .eq('grade_level', grade)
        .eq('module_number', module)
        .single();

      if (lesson) {
        const newAttempts = (progress.quiz_attempts || 0) + 1;
        
        await supabase
          .from('lesson_progress')
          .upsert({
            user_id: user.id,
            lesson_id: lesson.id,
            video_completed: videoCompleted,
            article_completed: articleCompleted,
            quiz_completed: finalScore >= 70,
            quiz_score: finalScore,
            quiz_attempts: newAttempts,
            xp_earned: earnedXP
          });

        // Calculate total XP from lesson progress
        const { data: totalXpData } = await supabase
          .from('lesson_progress')
          .select('xp_earned')
          .eq('user_id', user.id);

        const totalXP = totalXpData?.reduce((sum, record) => sum + (record.xp_earned || 0), 0) || 0;

        // Check for badges based on total XP
        if (finalScore === 100) {
          // Get the perfect score badge (assuming there's one for perfect scores)
          const { data: perfectScoreBadge } = await supabase
            .from('badges')
            .select('id')
            .eq('name', 'Perfect Score')
            .maybeSingle();

          if (perfectScoreBadge) {
            const { data: existingBadge } = await supabase
              .from('user_badges')
              .select('id')
              .eq('user_id', user.id)
              .eq('badge_id', perfectScoreBadge.id)
              .maybeSingle();

            if (!existingBadge) {
              await supabase
                .from('user_badges')
                .insert({
                  user_id: user.id,
                  badge_id: perfectScoreBadge.id
                });
              toast.success("🏆 Perfect Score badge earned!");
            }
          }
        }

        // Check for XP milestone badges
        const { data: xpBadges } = await supabase
          .from('badges')
          .select('*')
          .lte('xp_required', totalXP)
          .order('xp_required', { ascending: false });

        if (xpBadges) {
          for (const badge of xpBadges) {
            const { data: existingBadge } = await supabase
              .from('user_badges')
              .select('id')
              .eq('user_id', user.id)
              .eq('badge_id', badge.id)
              .maybeSingle();

            if (!existingBadge) {
              await supabase
                .from('user_badges')
                .insert({
                  user_id: user.id,
                  badge_id: badge.id
                });
              toast.success(`🏆 ${badge.name} badge earned!`);
              break; // Only award one badge per quiz completion
            }
          }
        }
      }
    }
    
    if (finalScore >= 70) {
      toast.success(`Congratulations! You scored ${finalScore}% and earned ${earnedXP} XP!`);
    } else {
      toast.error(`You scored ${finalScore}%. You need 70% to pass. Try again!`);
    }
  };

  const handleRetakeQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setScore(0);
    setXpEarned(0);
  };

  const getOverallProgress = () => {
    let completed = 0;
    if (videoCompleted) completed++;
    if (articleCompleted) completed++;
    if (progress.quiz_completed) completed++;
    return Math.round((completed / 3) * 100);
  };

  const canAccessSection = (section: string) => {
    if (section === 'video') return true;
    if (section === 'article') return videoCompleted;
    if (section === 'quiz') return videoCompleted && articleCompleted;
    return false;
  };

  const renderVideoSection = () => (
    <div className="space-y-6">
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          src={currentLesson.videoUrl}
          title={currentLesson.videoTitle}
          className="w-full h-full"
          allowFullScreen
          onLoad={() => {
            // Auto-mark video as completed after a short delay
            setTimeout(() => {
              if (!videoCompleted) {
                handleVideoComplete();
              }
            }, 3000);
          }}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Play className="w-5 h-5 text-blue-600" />
          <span className="font-medium">{currentLesson.videoTitle}</span>
        </div>
        <div className="flex items-center space-x-2">
          <a
            href={currentLesson.videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          {videoCompleted && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>
      </div>
    </div>
  );

  const renderArticleSection = () => (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {currentLesson.article.title}
        </h1>
        <div 
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: currentLesson.article.content }}
        />
      </div>
      
      <div className="flex justify-between items-center pt-6 border-t">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="font-medium">Reading Material</span>
        </div>
        {!articleCompleted ? (
          <Button onClick={handleArticleComplete} className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark as Complete
          </Button>
        ) : (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )}
      </div>
    </div>
  );

  const renderQuizSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-2xl font-bold">Knowledge Check Quiz</h2>
        </div>
        <Badge variant="outline">
          {currentLesson.quiz.length} Questions
        </Badge>
      </div>

      {!quizSubmitted ? (
        <div className="space-y-6">
          {currentLesson.quiz.map((question, index) => (
            <Card key={question.id} className="p-6">
              <h3 className="font-semibold text-lg mb-4">
                {index + 1}. {question.question}
              </h3>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={quizAnswers[question.id] === option}
                      onChange={() => handleQuizAnswer(question.id, option)}
                      className="text-blue-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </Card>
          ))}
          
          <div className="flex justify-center">
            <Button
              onClick={handleQuizSubmit}
              disabled={Object.keys(quizAnswers).length !== currentLesson.quiz.length}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
            >
              Submit Quiz
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                {score >= 70 ? (
                  <Trophy className="w-12 h-12 text-yellow-500" />
                ) : (
                  <Award className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Your Score: {score}%
              </h3>
              <p className="text-gray-600 mb-4">
                You earned {xpEarned} XP!
              </p>
              {score >= 70 ? (
                <Badge className="bg-green-100 text-green-800 px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Passed!
                </Badge>
              ) : (
                <div className="space-y-2">
                  <Badge variant="destructive" className="px-4 py-2">
                    Need 70% to pass
                  </Badge>
                  <div>
                    <Button onClick={handleRetakeQuiz} variant="outline">
                      Retake Quiz
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quiz Review</h3>
            {currentLesson.quiz.map((question, index) => {
              const userAnswer = quizAnswers[question.id];
              const isCorrect = userAnswer === question.correct;
              
              return (
                <Card key={question.id} className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{question.question}</h4>
                      <div className="space-y-2 text-sm">
                        <div className={`p-2 rounded ${
                          userAnswer === question.correct 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          Your answer: {userAnswer || 'Not answered'}
                        </div>
                        {userAnswer !== question.correct && (
                          <div className="p-2 rounded bg-green-100 text-green-800">
                            Correct answer: {question.correct}
                          </div>
                        )}
                        <div className="p-2 rounded bg-blue-50 text-blue-800">
                          <strong>Explanation:</strong> {question.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (currentSection) {
      case 'video':
        return renderVideoSection();
      case 'article':
        return renderArticleSection();
      case 'quiz':
        return renderQuizSection();
      default:
        return renderVideoSection();
    }
  };

  const getNextModule = () => {
    const maxModules = Object.keys(lessonContent[grade] || {}).length;
    if (module < maxModules) {
      return { grade, module: module + 1 };
    }
    
    const nextGrade = grade + 1;
    if (lessonContent[nextGrade]) {
      return { grade: nextGrade, module: 1 };
    }
    
    return null;
  };

  const getPreviousModule = () => {
    if (module > 1) {
      return { grade, module: module - 1 };
    }
    
    const prevGrade = grade - 1;
    if (lessonContent[prevGrade]) {
      const maxModules = Object.keys(lessonContent[prevGrade]).length;
      return { grade: prevGrade, module: maxModules };
    }
    
    return null;
  };

  const nextModule = getNextModule();
  const previousModule = getPreviousModule();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Grade {grade} - Module {module}
                </h1>
                <p className="text-gray-600">{currentLesson.title}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Overall Progress</div>
                <div className="flex items-center space-x-2">
                  <Progress value={getOverallProgress()} className="w-24" />
                  <span className="text-sm font-medium">{getOverallProgress()}%</span>
                </div>
              </div>
              
              {badges.length > 0 && (
                <div className="flex items-center space-x-1">
                  {badges.slice(0, 3).map((badge, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {badge.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Lesson Sections</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={currentSection === 'video' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setCurrentSection('video')}
                  disabled={!canAccessSection('video')}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Video Lesson
                  {videoCompleted && <CheckCircle className="w-4 h-4 ml-auto text-green-600" />}
                </Button>
                
                <Button
                  variant={currentSection === 'article' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setCurrentSection('article')}
                  disabled={!canAccessSection('article')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Reading Material
                  {articleCompleted && <CheckCircle className="w-4 h-4 ml-auto text-green-600" />}
                </Button>
                
                <Button
                  variant={currentSection === 'quiz' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setCurrentSection('quiz')}
                  disabled={!canAccessSection('quiz')}
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Knowledge Quiz
                  {progress.quiz_completed && <CheckCircle className="w-4 h-4 ml-auto text-green-600" />}
                </Button>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {previousModule && (
                  <Link to={`/lesson/${previousModule.grade}/${previousModule.module}`}>
                    <Button variant="outline" className="w-full justify-start">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous Module
                    </Button>
                  </Link>
                )}
                
                {nextModule && (
                  <Link to={`/lesson/${nextModule.grade}/${nextModule.module}`}>
                    <Button variant="outline" className="w-full justify-start">
                      Next Module
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Progress Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Your Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">XP Earned</span>
                  <Badge variant="secondary">{progress.xp_earned || 0} XP</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Quiz Attempts</span>
                  <Badge variant="outline">{progress.quiz_attempts || 0}</Badge>
                </div>
                
                {progress.quiz_score && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Best Score</span>
                    <Badge variant="secondary">{progress.quiz_score}%</Badge>
                  </div>
                )}
                
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Completion</span>
                    <span className="font-medium">{getOverallProgress()}%</span>
                  </div>
                  <Progress value={getOverallProgress()} className="mt-1" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="min-h-[600px]">
              <CardContent className="p-8">
                {renderContent()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;
