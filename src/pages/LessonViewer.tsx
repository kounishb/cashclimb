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
            <h2>How People Earn Money: A Complete Guide to Work and Income</h2>
            <p>Money doesn't magically appear in people's wallets or bank accounts. Every dollar, every coin has to be earned through work, effort, and providing value to others. Understanding how people earn money is one of the most important life skills you can develop, and it's never too early to start learning!</p>
            
            <h3>What is Work Really?</h3>
            <p>Work is when people use their time, energy, skills, knowledge, and effort to do something valuable for other people. In return for creating this value, they receive money as payment. Work can be physical (like building houses), mental (like solving math problems), creative (like writing stories), or social (like teaching children).</p>
            
            <p>The most important thing to understand about work is that it must create value for other people. If what you're doing doesn't help someone else in some way, it's very difficult to earn money from it. This is why successful workers always think about how they can help others solve problems or meet their needs.</p>
            
            <h3>The Many Different Types of Jobs</h3>
            <p>There are thousands of different jobs in the world, but they generally fall into several main categories:</p>
            
            <h4>Service Jobs - Helping People Directly</h4>
            <p>Service jobs involve directly helping other people with their needs:</p>
            <ul>
              <li><strong>Healthcare Workers</strong> - Doctors, nurses, dentists, therapists who help people stay healthy</li>
              <li><strong>Educators</strong> - Teachers, professors, tutors who help people learn</li>
              <li><strong>Public Safety</strong> - Police officers, firefighters, paramedics who keep communities safe</li>
              <li><strong>Customer Service</strong> - Restaurant servers, hotel staff, retail workers who serve customers</li>
              <li><strong>Personal Services</strong> - Hair stylists, personal trainers, counselors who provide individual care</li>
            </ul>
            
            <h4>Production Jobs - Making Things People Need</h4>
            <p>These jobs involve creating physical products:</p>
            <ul>
              <li><strong>Manufacturing</strong> - Factory workers who make cars, electronics, clothing, and other goods</li>
              <li><strong>Construction</strong> - Builders, electricians, plumbers who create and maintain buildings</li>
              <li><strong>Agriculture</strong> - Farmers, ranchers, fishers who produce food</li>
              <li><strong>Crafts and Arts</strong> - Artisans, bakers, jewelers who create unique items</li>
              <li><strong>Technology Production</strong> - Engineers and technicians who design and build technology</li>
            </ul>
            
            <h4>Information and Knowledge Jobs</h4>
            <p>These jobs work with ideas, information, and knowledge:</p>
            <ul>
              <li><strong>Technology</strong> - Computer programmers, web designers, data analysts</li>
              <li><strong>Media and Communication</strong> - Journalists, writers, photographers, videographers</li>
              <li><strong>Research and Science</strong> - Scientists, researchers, laboratory technicians</li>
              <li><strong>Business and Finance</strong> - Accountants, managers, consultants, financial advisors</li>
              <li><strong>Legal and Government</strong> - Lawyers, judges, government workers</li>
            </ul>
            
            <h3>How Kids Can Start Earning Money Today</h3>
            <p>You don't have to wait until you're an adult to start earning money! There are many age-appropriate ways for kids to begin developing work skills and earning income:</p>
            
            <h4>Household Responsibilities That Can Earn Money</h4>
            <ul>
              <li><strong>Cleaning Tasks</strong> - Vacuuming, dusting, organizing rooms, cleaning bathrooms</li>
              <li><strong>Kitchen Help</strong> - Washing dishes, setting/clearing tables, basic meal preparation</li>
              <li><strong>Laundry Assistance</strong> - Sorting clothes, folding, putting away clean laundry</li>
              <li><strong>Yard Work</strong> - Raking leaves, weeding gardens, watering plants, shoveling snow</li>
              <li><strong>Pet Care</strong> - Feeding pets, cleaning pet areas, walking dogs</li>
              <li><strong>Organization Projects</strong> - Organizing closets, garages, storage areas</li>
            </ul>
            
            <h4>Neighborhood Services for Kids</h4>
            <ul>
              <li><strong>Lawn Care</strong> - Mowing grass, leaf raking, basic garden maintenance</li>
              <li><strong>Pet Services</strong> - Dog walking, pet sitting, feeding pets while neighbors are away</li>
              <li><strong>Seasonal Work</strong> - Snow shoveling in winter, lemonade stands in summer</li>
              <li><strong>Delivery Services</strong> - Delivering newspapers, helping elderly neighbors with groceries</li>
              <li><strong>Car Washing</strong> - Cleaning cars, bikes, or outdoor equipment</li>
            </ul>
            
            <h3>The Connection Between Work and Value</h3>
            <p>The amount of money people earn depends on several important factors:</p>
            
            <h4>How Much Value You Create</h4>
            <p>People who help solve bigger problems or serve more people usually earn more money. A doctor who saves lives earns more than someone who just cleans, because saving lives creates more value for society.</p>
            
            <h4>How Hard You Are to Replace</h4>
            <p>Jobs that require special skills, education, or talents usually pay more because fewer people can do them. Anyone can learn to sweep floors, but not everyone can perform surgery or design buildings.</p>
            
            <h4>How Much Responsibility You Have</h4>
            <p>People who make important decisions or are responsible for other people's work usually earn more. Managers earn more than the people they supervise because they have more responsibility.</p>
            
            <h3>Building Work Skills Early</h3>
            <p>Even as a kid, you can start developing skills that will help you earn money throughout your life:</p>
            
            <h4>Communication Skills</h4>
            <ul>
              <li>Practice speaking clearly and politely to adults</li>
              <li>Learn to listen carefully and follow instructions</li>
              <li>Develop writing skills through school assignments</li>
              <li>Learn to explain things to others</li>
            </ul>
            
            <h4>Problem-Solving Skills</h4>
            <ul>
              <li>When you encounter problems, try to think of solutions</li>
              <li>Ask "How can I make this better?" about situations around you</li>
              <li>Practice breaking big problems into smaller, manageable pieces</li>
              <li>Learn from mistakes and try different approaches</li>
            </ul>
            
            <h4>Responsibility and Reliability</h4>
            <ul>
              <li>Always do what you say you'll do</li>
              <li>Show up on time and be prepared</li>
              <li>Take care of your belongings and other people's property</li>
              <li>Admit mistakes and work to fix them</li>
            </ul>
            
            <h3>The Importance of Education</h3>
            <p>Education is one of the most important investments you can make in your earning potential:</p>
            
            <h4>Basic Education</h4>
            <p>Reading, writing, and math skills are essential for almost every job. The better you are at these basics, the more opportunities you'll have.</p>
            
            <h4>Specialized Knowledge</h4>
            <p>Learning special skills like computer programming, foreign languages, or technical abilities can open doors to higher-paying careers.</p>
            
            <h4>Continuous Learning</h4>
            <p>The most successful people never stop learning. They read books, take classes, and constantly look for ways to improve their skills.</p>
            
            <h3>Understanding Different Types of Income</h3>
            <p>There are several ways people can earn money:</p>
            
            <h4>Active Income</h4>
            <p>This is money you earn by actively working - trading your time and effort for pay. Most jobs provide active income. Examples include:</p>
            <ul>
              <li>Hourly wages from a job</li>
              <li>Salary from full-time work</li>
              <li>Money from chores or odd jobs</li>
              <li>Payment for services like tutoring or pet-sitting</li>
            </ul>
            
            <h4>Passive Income</h4>
            <p>This is money that comes in without you actively working for it. It usually requires some initial work or investment. Examples include:</p>
            <ul>
              <li>Interest from money in savings accounts</li>
              <li>Money from investments like stocks</li>
              <li>Rental income from property</li>
              <li>Royalties from creating something (like a book or song)</li>
            </ul>
            
            <h3>Creating Your Own Opportunities</h3>
            <p>Sometimes the best way to earn money is to create your own opportunities:</p>
            
            <h4>Entrepreneurship for Kids</h4>
            <ul>
              <li><strong>Lemonade Stands</strong> - Classic first business teaching sales and customer service</li>
              <li><strong>Craft Sales</strong> - Making and selling handmade items</li>
              <li><strong>Service Businesses</strong> - Offering services like pet-sitting or lawn care</li>
              <li><strong>Digital Ventures</strong> - Creating content or simple apps (with parental guidance)</li>
            </ul>
            
            <h3>The Role of Passion and Interest</h3>
            <p>While money is important, the most successful and happy workers often combine earning money with doing things they enjoy:</p>
            
            <h4>Finding Your Interests</h4>
            <ul>
              <li>Pay attention to activities you naturally enjoy</li>
              <li>Notice what subjects come easily to you in school</li>
              <li>Think about problems in the world you'd like to help solve</li>
              <li>Consider what kind of work environment appeals to you</li>
            </ul>
            
            <h4>Turning Interests into Income</h4>
            <p>Almost any interest can be turned into income if you think creatively:</p>
            <ul>
              <li>Love animals? Consider veterinary work, pet training, or animal research</li>
              <li>Enjoy building things? Explore engineering, construction, or product design</li>
              <li>Like helping people? Look into healthcare, teaching, or social work</li>
              <li>Fascinated by technology? Investigate programming, robotics, or digital design</li>
            </ul>
            
            <h3>Planning Your Future Career</h3>
            <p>It's never too early to start thinking about what kind of work you might want to do when you grow up:</p>
            
            <h4>Exploring Career Options</h4>
            <ul>
              <li>Talk to adults about their jobs - ask what they like and dislike</li>
              <li>Visit workplaces when possible (like "Take Your Child to Work Day")</li>
              <li>Research different careers online or at the library</li>
              <li>Try volunteer work or internships when you're old enough</li>
            </ul>
            
            <h4>Setting Goals</h4>
            <ul>
              <li>Think about what kind of lifestyle you want</li>
              <li>Consider how much money you'll need for your goals</li>
              <li>Identify the education and skills you'll need</li>
              <li>Make a plan for developing those skills</li>
            </ul>
            
            <h3>Money and Work Ethics</h3>
            <p>How you earn money is just as important as how much you earn:</p>
            
            <h4>Honest Work</h4>
            <ul>
              <li>Always be truthful about your abilities and experience</li>
              <li>Do quality work even when no one is watching</li>
              <li>Respect other people's property and time</li>
              <li>Keep your promises and commitments</li>
            </ul>
            
            <h4>Fair Exchange</h4>
            <ul>
              <li>Make sure the work you do is worth the money you receive</li>
              <li>Don't try to take advantage of people</li>
              <li>Be willing to work for what you earn</li>
              <li>Appreciate the opportunities others give you</li>
            </ul>
            
            <h3>The Bigger Picture: Work and Society</h3>
            <p>Understanding how individual work contributes to society helps you see the bigger picture:</p>
            
            <h4>How Work Benefits Everyone</h4>
            <ul>
              <li>When people work, they create goods and services that improve life for everyone</li>
              <li>Workers pay taxes that fund schools, roads, and public services</li>
              <li>Employment gives people purpose and helps them support their families</li>
              <li>Innovation at work leads to new technologies and solutions</li>
            </ul>
            
            <h4>Your Future Contribution</h4>
            <p>As you think about your future career, consider how you want to contribute to making the world better. The most fulfilling careers often involve helping others while earning a living.</p>
            
            <h3>Getting Started Today</h3>
            <p>Here are practical steps you can take right now to start your journey toward earning money:</p>
            
            <h4>At Home</h4>
            <ul>
              <li>Ask your parents about chores you can do for an allowance</li>
              <li>Volunteer to help with family projects</li>
              <li>Take care of your own responsibilities without being asked</li>
              <li>Learn basic life skills like cooking, cleaning, and organizing</li>
            </ul>
            
            <h4>At School</h4>
            <ul>
              <li>Work hard in all your subjects to build a strong foundation</li>
              <li>Participate in clubs and activities to develop different skills</li>
              <li>Help classmates when appropriate (this builds leadership skills)</li>
              <li>Ask teachers about careers related to subjects you enjoy</li>
            </ul>
            
            <h4>In Your Community</h4>
            <ul>
              <li>Look for age-appropriate volunteer opportunities</li>
              <li>Offer to help neighbors with simple tasks</li>
              <li>Observe different types of work happening around you</li>
              <li>Be respectful and helpful to create a good reputation</li>
            </ul>
            
            <p>Remember, earning money through work is not just about getting paid - it's about developing skills, contributing to society, and building the foundation for a successful and fulfilling life. Every small step you take now toward understanding work and developing good habits will pay off in the future!</p>
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
            <h2>Understanding Needs vs Wants: The Foundation of Smart Financial Decisions</h2>
            <p>Learning the difference between needs and wants is one of the most fundamental skills in financial literacy. This concept will guide every money decision you make for the rest of your life. When you truly understand this difference, you'll be able to make smart choices that help you achieve your goals while staying financially secure.</p>
            
            <h3>What Are Needs? The Essentials for Life</h3>
            <p>Needs are things that are absolutely necessary for your survival, health, safety, and basic well-being. These are items you cannot live without, and they must be your first priority when spending money. Without these basic needs, your life would be in danger or your ability to function in society would be severely limited.</p>
            
            <h4>Physical Survival Needs</h4>
            <p>These are the most basic requirements for staying alive and healthy:</p>
            <ul>
              <li><strong>Food and Nutrition</strong> - Your body needs healthy food to grow, develop, and maintain energy. This includes fruits, vegetables, proteins, grains, and clean drinking water. Without proper nutrition, you cannot think clearly, grow properly, or stay healthy.</li>
              <li><strong>Shelter and Housing</strong> - Everyone needs a safe place to live that protects them from weather, provides security, and offers basic amenities like running water and electricity. This includes rent or mortgage payments, basic utilities, and essential home maintenance.</li>
              <li><strong>Clothing</strong> - You need appropriate clothing to protect your body from weather, maintain health and hygiene, and meet social expectations. This includes weather-appropriate outer wear, undergarments, shoes, and clothes suitable for school or work.</li>
              <li><strong>Healthcare</strong> - Medical care when you're sick or injured, preventive care like checkups and vaccinations, dental care, and vision care. Your health is your most valuable asset.</li>
              <li><strong>Safety and Security</strong> - Protection from harm, including physical safety, financial security, and protection of your property and personal information.</li>
            </ul>
            
            <h4>Social and Educational Needs</h4>
            <ul>
              <li><strong>Basic Education</strong> - Learning to read, write, and do math, plus knowledge needed to function in society</li>
              <li><strong>School Supplies</strong> - Basic materials needed for education like notebooks, pencils, and required books</li>
              <li><strong>Communication</strong> - Some way to communicate with others, which might include a basic phone for emergencies</li>
              <li><strong>Transportation</strong> - Some way to get to work, school, medical appointments, and essential errands</li>
            </ul>
            
            <h3>What Are Wants? The Nice-to-Haves</h3>
            <p>Wants are things that would make life more enjoyable, convenient, or fun, but you can live without them. Wants are preferences and desires beyond the basic necessities. While wants can add happiness and comfort to life, they're not essential for survival or basic well-being.</p>
            
            <h4>Entertainment and Recreation Wants</h4>
            <ul>
              <li><strong>Toys and Games</strong> - Video games, board games, sports equipment, dolls, action figures</li>
              <li><strong>Entertainment Subscriptions</strong> - Streaming services, gaming subscriptions, magazine subscriptions</li>
              <li><strong>Sports and Activities</strong> - Expensive sports equipment, premium gym memberships, hobby supplies</li>
              <li><strong>Books and Media</strong> - Books for pleasure reading, movies, music (beyond educational materials)</li>
              <li><strong>Outings and Events</strong> - Movies, concerts, amusement parks, sporting events, vacation trips</li>
            </ul>
            
            <h4>Luxury and Brand Name Items</h4>
            <ul>
              <li><strong>Designer Clothing</strong> - Expensive brand-name clothes with logos when basic clothing would serve the same purpose</li>
              <li><strong>Premium Electronics</strong> - The latest smartphone, tablet, or gaming system when you have functional alternatives</li>
              <li><strong>Luxury Items</strong> - Expensive jewelry, watches, or other status symbols</li>
              <li><strong>Premium Versions</strong> - More expensive versions of things you need, like designer shoes instead of basic shoes</li>
            </ul>
            
            <h4>Food and Treat Wants</h4>
            <ul>
              <li><strong>Candy and Sweets</strong> - Cookies, ice cream, candy, soda, and other treats</li>
              <li><strong>Restaurant Meals</strong> - Eating out for pleasure rather than necessity</li>
              <li><strong>Specialty Foods</strong> - Expensive or exotic foods that aren't necessary for nutrition</li>
              <li><strong>Premium Brands</strong> - Name-brand foods when generic versions would provide the same nutrition</li>
            </ul>
            
            <h4>Convenience Wants</h4>
            <ul>
              <li><strong>Multiple Items</strong> - Having several of something when one would be sufficient</li>
              <li><strong>Convenience Services</strong> - Having things delivered when you could get them yourself</li>
              <li><strong>Time-Saving Gadgets</strong> - Devices that save time but aren't necessary</li>
              <li><strong>Premium Services</strong> - Faster, more convenient, or luxury versions of basic services</li>
            </ul>
            
            <h3>The Gray Area: When Needs and Wants Overlap</h3>
            <p>Sometimes it can be tricky to distinguish between needs and wants because they can overlap. Here are some examples of this gray area:</p>
            
            <h4>Technology Needs vs Wants</h4>
            <ul>
              <li><strong>Need</strong>: A basic cell phone for emergencies and essential communication</li>
              <li><strong>Want</strong>: The latest smartphone with all the newest features</li>
              <li><strong>Need</strong>: Basic internet access for school research and homework</li>
              <li><strong>Want</strong>: High-speed internet for gaming and streaming videos</li>
            </ul>
            
            <h4>Transportation Needs vs Wants</h4>
            <ul>
              <li><strong>Need</strong>: Reliable transportation to school, work, and essential appointments</li>
              <li><strong>Want</strong>: A brand-new, luxury, or sports car when a basic reliable car would work</li>
              <li><strong>Need</strong>: A bicycle for transportation in some circumstances</li>
              <li><strong>Want</strong>: An expensive mountain bike when a basic bike would serve the transportation need</li>
            </ul>
            
            <h4>Clothing Needs vs Wants</h4>
            <ul>
              <li><strong>Need</strong>: Weather-appropriate clothes, school uniforms, work clothes</li>
              <li><strong>Want</strong>: Multiple outfits, designer labels, trendy fashion items</li>
              <li><strong>Need</strong>: Sturdy shoes that fit well and protect your feet</li>
              <li><strong>Want</strong>: Multiple pairs of shoes, expensive athletic shoes for casual wear</li>
            </ul>
            
            <h3>The Smart Money Strategy: Prioritizing Your Spending</h3>
            <p>Now that you understand the difference between needs and wants, here's how to use this knowledge to make smart money decisions:</p>
            
            <h4>Step 1: Always Meet Your Needs First</h4>
            <p>Before spending money on anything else, make sure all your basic needs are covered. This includes:</p>
            <ul>
              <li>Healthy food for proper nutrition</li>
              <li>Safe and appropriate housing</li>
              <li>Weather-appropriate clothing</li>
              <li>Basic healthcare and hygiene</li>
              <li>Required school supplies and materials</li>
              <li>Transportation to essential places</li>
            </ul>
            
            <h4>Step 2: Build Your Emergency and Savings Fund</h4>
            <p>After covering needs, set aside money for:</p>
            <ul>
              <li><strong>Emergency Fund</strong> - Money for unexpected needs like medical bills or urgent repairs</li>
              <li><strong>Future Needs</strong> - Saving for needs you'll have later, like school supplies for next year</li>
              <li><strong>Goal Savings</strong> - Money for bigger things you're working toward</li>
            </ul>
            
            <h4>Step 3: Plan for Reasonable Wants</h4>
            <p>Only after needs are met and some money is saved should you consider spending on wants. When you do:</p>
            <ul>
              <li><strong>Make a List</strong> - Write down things you want and prioritize them</li>
              <li><strong>Wait and Think</strong> - Don't buy wants immediately; wait at least a day or week</li>
              <li><strong>Compare Options</strong> - Look for the best value when buying wants</li>
              <li><strong>Set Limits</strong> - Decide in advance how much you'll spend on wants</li>
            </ul>
            
            <h3>Practical Decision-Making Tools</h3>
            
            <h4>The 24-Hour Rule</h4>
            <p>Before buying any want, wait 24 hours and ask yourself:</p>
            <ul>
              <li>Do I still want this as much as I did yesterday?</li>
              <li>Will I use this regularly or just once?</li>
              <li>Is there something I need more?</li>
              <li>Could I be happy without this?</li>
            </ul>
            
            <h4>The Opportunity Cost Question</h4>
            <p>For every want you're considering buying, ask: "What else could I do with this money?" Maybe saving that money could help you buy something more important later.</p>
            
            <h4>The Value Test</h4>
            <p>Ask yourself these questions:</p>
            <ul>
              <li>How many hours would I need to work to earn the money for this?</li>
              <li>How long will I enjoy or use this item?</li>
              <li>Will this help me achieve my bigger goals?</li>
              <li>Am I buying this because I really want it, or because my friends have it?</li>
            </ul>
            
            <h3>Common Mistakes People Make</h3>
            
            <h4>Confusing Wants with Needs</h4>
            <p>Many people convince themselves that wants are actually needs. Be honest with yourself - you need transportation, but you don't need a luxury car. You need communication, but you don't need the latest smartphone.</p>
            
            <h4>Spending on Wants Before Securing Needs</h4>
            <p>Some people buy toys, games, or treats before making sure they have money for lunch, school supplies, or other essentials. This can lead to serious problems.</p>
            
            <h4>Impulse Buying</h4>
            <p>Making quick decisions to buy wants without thinking them through often leads to regret and financial problems.</p>
            
            <h4>Keeping Up with Others</h4>
            <p>Buying things because friends have them rather than because you truly need or want them is a recipe for overspending and debt.</p>
            
            <h3>Teaching Others About Needs vs Wants</h3>
            <p>Once you understand this concept, you can help teach others:</p>
            <ul>
              <li><strong>Younger Siblings</strong> - Help them understand why they can't have everything they see in stores</li>
              <li><strong>Friends</strong> - Share smart money strategies when appropriate</li>
              <li><strong>Family Discussions</strong> - Participate in family conversations about spending priorities</li>
            </ul>
            
            <h3>Cultural and Social Influences on Needs vs Wants</h3>
            <p>It's important to understand that advertising, social media, and peer pressure constantly try to convince us that wants are needs:</p>
            
            <h4>Advertising Tricks</h4>
            <ul>
              <li>Making wants seem essential for happiness</li>
              <li>Creating fake urgency ("limited time offers")</li>
              <li>Suggesting you need things to fit in or be successful</li>
              <li>Using celebrity endorsements to make products seem necessary</li>
            </ul>
            
            <h4>Social Media Pressure</h4>
            <ul>
              <li>Seeing others with things you don't have</li>
              <li>Feeling like you need things to look successful online</li>
              <li>Constant exposure to new products and trends</li>
            </ul>
            
            <h3>Long-Term Benefits of Understanding Needs vs Wants</h3>
            <p>Mastering this concept will help you throughout life by:</p>
            <ul>
              <li><strong>Avoiding Debt</strong> - Not borrowing money for wants you can't afford</li>
              <li><strong>Building Wealth</strong> - Saving money that can grow over time</li>
              <li><strong>Reducing Stress</strong> - Not worrying about money because your needs are always covered</li>
              <li><strong>Achieving Goals</strong> - Having money available for things that truly matter to you</li>
              <li><strong>Making Better Decisions</strong> - Thinking clearly about purchases rather than acting on impulse</li>
              <li><strong>Finding Contentment</strong> - Being happy with what you have rather than always wanting more</li>
            </ul>
            
            <h3>Practical Exercises to Practice This Skill</h3>
            
            <h4>The Weekly Budget Challenge</h4>
            <p>If you receive allowance or earn money from chores, try this exercise:</p>
            <ul>
              <li>Write down all the things you want to buy this week</li>
              <li>Label each item as either a "need" or a "want"</li>
              <li>Calculate the total cost of all needs</li>
              <li>See how much money is left for wants</li>
              <li>Prioritize your wants and choose only what fits your budget</li>
            </ul>
            
            <h4>The Store Walk-Through</h4>
            <p>Next time you're in a store with your family:</p>
            <ul>
              <li>Look at different items and ask yourself "need or want?"</li>
              <li>Notice how stores try to make wants seem like needs</li>
              <li>Practice walking past things you want but don't need</li>
              <li>Observe how advertising tries to influence your decisions</li>
            </ul>
            
            <h4>The Future Goals Connection</h4>
            <p>Connect your needs vs wants decisions to your future goals:</p>
            <ul>
              <li>Write down something big you want to achieve (like buying a bike or saving for college)</li>
              <li>Calculate how much money you need</li>
              <li>Figure out how long it will take to save if you buy wants vs if you focus on needs</li>
              <li>Make a plan that balances enjoying some wants while still working toward your goal</li>
            </ul>
            
            <p>Understanding needs vs wants is like having a financial superpower. It helps you make decisions that keep you safe and secure while still allowing you to enjoy life. The earlier you master this skill, the better your financial future will be!</p>
          `
        },
        quiz: [
          {
            id: 1,
            question: "Which of these is a NEED?",
            options: ["New video game", "Food to eat", "Designer shoes", "Movie tickets"],
            correct: "Food to eat",
            explanation: "Food is essential for survival, making it a need rather than a want."
          },
          {
            id: 2,
            question: "Which of these is a WANT?",
            options: ["A place to live", "Clean water", "The latest smartphone", "Warm clothes"],
            correct: "The latest smartphone",
            explanation: "While communication is important, the 'latest' smartphone is a luxury want, not a basic need."
          },
          {
            id: 3,
            question: "Before buying something, what question should you ask yourself?",
            options: ["How much does it cost?", "Do I need this or do I want this?", "What color should I get?", "Where can I buy it?"],
            correct: "Do I need this or do I want this?",
            explanation: "Asking whether something is a need or want helps you make smart spending decisions."
          },
          {
            id: 4,
            question: "If you have $10 and need school lunch ($5) but also want a toy ($8), what should you do?",
            options: ["Buy the toy", "Buy lunch and save the rest", "Ask for more money", "Don't buy anything"],
            correct: "Buy lunch and save the rest",
            explanation: "Needs like food should always come before wants. Buy lunch first, then save what's left."
          },
          {
            id: 5,
            question: "Which is the best example of a need?",
            options: ["Ice cream", "A warm coat in winter", "A new bicycle", "Video games"],
            correct: "A warm coat in winter",
            explanation: "A warm coat in winter protects you from cold weather, making it essential for health and safety."
          },
          {
            id: 6,
            question: "If you want to buy candy but also need new school supplies, what should you prioritize?",
            options: ["Buy the candy first", "Buy school supplies first", "Buy both at the same time", "Wait until next week"],
            correct: "Buy school supplies first",
            explanation: "School supplies are needed for your education, while candy is just a want."
          },
          {
            id: 7,
            question: "Which of these is a WANT for most 3rd graders?",
            options: ["Drinking water", "A toy robot", "A safe home", "Healthy food"],
            correct: "A toy robot",
            explanation: "While toys are fun, they are wants rather than needs. We can live without toys, but not without water, shelter, or food."
          },
          {
            id: 8,
            question: "What should you do when you can't afford both a need and a want?",
            options: ["Choose the want because it's more fun", "Choose the need because it's more important", "Ask someone else to buy them", "Don't buy either one"],
            correct: "Choose the need because it's more important",
            explanation: "Needs are always more important than wants because they keep us healthy, safe, and secure."
          },
          {
            id: 9,
            question: "Which situation shows someone choosing a need over a want?",
            options: ["Buying a new game instead of lunch", "Buying warm socks instead of stickers", "Buying candy instead of a notebook", "Buying a toy instead of medicine"],
            correct: "Buying warm socks instead of stickers",
            explanation: "Warm socks help keep you healthy and comfortable (need), while stickers are just for fun (want)."
          },
          {
            id: 10,
            question: "Why is it important to learn about needs vs wants?",
            options: ["To spend money faster", "To make smart money decisions", "To buy more things", "To avoid saving money"],
            correct: "To make smart money decisions",
            explanation: "Understanding needs vs wants helps you make wise choices about spending and saving money for what's most important."
          }
        ],
        xpReward: 100
      },
      4: {
        title: "Smart Shopping Choices",
        videoUrl: "https://www.youtube.com/embed/0iRbD5rM5qc",
        videoLink: "https://www.youtube.com/watch?v=0iRbD5rM5qc",
        videoTitle: "Grade 3: Financial Literacy for Kids - Learn the Basics",
        article: {
          title: "Making Smart Spending Decisions",
          content: `
            <h2>Learning to Make Smart Spending Choices: Your Guide to Wise Money Decisions</h2>
            <p>Making good spending choices is one of the most important money skills you can learn. Every time you spend money, you're making a decision that affects your future financial success. Learning to think before you spend will help you throughout your entire life, from buying candy with your allowance to making major purchases as an adult.</p>
            
            <h3>What is a Spending Choice?</h3>
            <p>A spending choice is any decision you make about using your money to buy something. Whether you're spending 25 cents on a piece of candy or $25 on a toy, you're making a spending choice. Good spending choices help you get the most value from your money and achieve your goals, while poor spending choices can leave you with regret and empty pockets.</p>
            
            <p>Every spending decision involves giving up one thing to get another. This is called "opportunity cost" - what you give up when you choose one option over another. Understanding this concept helps you make better decisions by thinking about what you're giving up, not just what you're getting.</p>
            
            <h3>The Smart Spending Process</h3>
            <p>Smart spenders don't make quick, impulsive decisions. Instead, they follow a thoughtful process that helps them make choices they'll be happy with later.</p>
            
            <h4>Step 1: Stop and Think</h4>
            <p>Before you buy anything, take a moment to stop and think. This simple pause can save you from making mistakes you'll regret later. Ask yourself these important questions:</p>
            <ul>
              <li><strong>Do I really need this or just want it?</strong> - Remember the difference between needs (things necessary for health and safety) and wants (things that would be nice to have)</li>
              <li><strong>Will I still be happy with this purchase next week? Next month?</strong> - Think beyond the immediate excitement of buying something</li>
              <li><strong>Is this the best price I can find?</strong> - Don't assume the first price you see is the best deal</li>
              <li><strong>What else could I do with this money?</strong> - Consider other things you could buy or goals you could work toward</li>
              <li><strong>Do I have enough money for this without compromising my needs or savings goals?</strong> - Make sure spending this money won't cause problems later</li>
            </ul>
            
            <h4>Step 2: Compare Your Options</h4>
            <p>Smart shoppers always look at different choices before making a decision. This comparison shopping can save you money and help you find better options:</p>
            <ul>
              <li><strong>Compare prices at different stores</strong> - The same item might cost different amounts at different places</li>
              <li><strong>Consider buying used instead of new</strong> - You can often get the same quality for much less money</li>
              <li><strong>Think about waiting for a sale</strong> - Many items go on sale regularly if you're patient</li>
              <li><strong>Ask if there's a similar item that costs less</strong> - Sometimes a slightly different product can meet your needs for less money</li>
              <li><strong>Check online and in-store prices</strong> - Sometimes online prices are better, sometimes store prices are better</li>
              <li><strong>Look for coupons or discounts</strong> - A little research can often save you money</li>
            </ul>
            
            <h4>Step 3: Make Your Decision</h4>
            <p>After thinking and comparing, make your choice. Remember, it's perfectly okay to decide NOT to buy something! Sometimes the smartest spending choice is to save your money for something more important later.</p>
            
            <h3>Understanding Value vs Price</h3>
            <p>Smart spenders understand that the cheapest option isn't always the best choice, and the most expensive option isn't always the best quality. Instead, they look for the best value - the right balance of quality, usefulness, and price.</p>
            
            <h4>Factors That Determine Value</h4>
            <ul>
              <li><strong>Quality and Durability</strong> - Will this last a long time or break quickly?</li>
              <li><strong>Usefulness</strong> - How often will you actually use this?</li>
              <li><strong>Enjoyment</strong> - How much happiness will this bring you?</li>
              <li><strong>Learning or Growth</strong> - Will this help you learn something or develop a skill?</li>
              <li><strong>Safety</strong> - Is this safe to use? Does it meet safety standards?</li>
              <li><strong>Environmental Impact</strong> - Is this good for the environment?</li>
            </ul>
            
            <h4>The "Cost Per Use" Calculation</h4>
            <p>A great way to evaluate value is to think about cost per use. For example:</p>
            <ul>
              <li>A $20 book you'll read many times might be worth more than a $5 toy you'll use once</li>
              <li>A $50 bike you'll ride every day is better value than a $30 game you'll play for a week</li>
              <li>Quality shoes that last two years are often better value than cheap shoes that wear out in two months</li>
            </ul>
            
            <h3>Common Spending Traps to Avoid</h3>
            <p>Even smart people can fall into spending traps. Being aware of these common mistakes helps you avoid them:</p>
            
            <h4>Impulse Buying</h4>
            <p>This happens when you buy something without thinking, often because you're excited or because someone is pressuring you to decide quickly. To avoid impulse buying:</p>
            <ul>
              <li>Always wait at least 24 hours before buying anything that's not a necessity</li>
              <li>Make a shopping list before going to stores and stick to it</li>
              <li>Avoid shopping when you're emotional (excited, sad, bored, or stressed)</li>
              <li>Be suspicious of "limited time offers" that pressure you to decide immediately</li>
            </ul>
            
            <h4>Peer Pressure Purchasing</h4>
            <p>Buying things because friends have them or to fit in can lead to poor spending choices:</p>
            <ul>
              <li>Remember that true friends won't judge you based on what you own</li>
              <li>Focus on your own needs and goals, not what others have</li>
              <li>Understand that people often show off their purchases but don't talk about their financial struggles</li>
              <li>Find ways to have fun with friends that don't involve spending money</li>
            </ul>
            
            <h4>Emotional Spending</h4>
            <p>Using shopping to make yourself feel better when you're sad, stressed, or bored often leads to purchases you'll regret:</p>
            <ul>
              <li>Find other ways to deal with emotions, like talking to friends, exercising, or pursuing hobbies</li>
              <li>If you feel the urge to buy something when you're emotional, write it down and wait until you're feeling better</li>
              <li>Remember that the good feeling from buying something usually doesn't last long</li>
            </ul>
            
            <h4>The "Sale" Trap</h4>
            <p>Just because something is on sale doesn't mean it's a good deal or that you should buy it:</p>
            <ul>
              <li>Ask yourself if you would want the item even if it wasn't on sale</li>
              <li>Calculate the actual savings - is it really a significant amount?</li>
              <li>Make sure you have a real use for the item, not just that it's cheap</li>
              <li>Remember that buying something you don't need is never a good deal, regardless of price</li>
            </ul>
            
            <h3>Smart Shopping Strategies</h3>
            
            <h4>The Planning Approach</h4>
            <ul>
              <li><strong>Make lists</strong> - Write down what you need before shopping</li>
              <li><strong>Set budgets</strong> - Decide how much you can spend before you start shopping</li>
              <li><strong>Research prices</strong> - Look up typical prices for items you're considering</li>
              <li><strong>Time your purchases</strong> - Learn when items typically go on sale</li>
            </ul>
            
            <h4>The Smart Evaluation Process</h4>
            <ul>
              <li><strong>Read reviews</strong> - See what other people say about products before buying</li>
              <li><strong>Check return policies</strong> - Make sure you can return items if there's a problem</li>
              <li><strong>Ask questions</strong> - Don't be afraid to ask salespeople about products</li>
              <li><strong>Consider warranties</strong> - Understand what protection you have if something breaks</li>
            </ul>
            
            <h4>The Money Management Integration</h4>
            <ul>
              <li><strong>Track your spending</strong> - Keep records of what you buy so you can learn from your decisions</li>
              <li><strong>Set savings goals</strong> - Having specific goals makes it easier to resist unnecessary purchases</li>
              <li><strong>Use the envelope method</strong> - Set aside specific amounts for different types of spending</li>
              <li><strong>Regular review</strong> - Look back at your purchases and evaluate whether they were good decisions</li>
            </ul>
            
            <h3>Teaching Smart Spending to Others</h3>
            <p>Once you learn these skills, you can help others make better spending decisions too:</p>
            
            <h4>Helping Younger Kids</h4>
            <ul>
              <li>Explain why you make certain choices when shopping together</li>
              <li>Help them practice comparing options in low-stakes situations</li>
              <li>Teach them to ask questions before buying anything</li>
              <li>Show them how to save up for things they really want</li>
            </ul>
            
            <h4>Sharing with Friends</h4>
            <ul>
              <li>Model good decision-making when shopping with friends</li>
              <li>Share money-saving tips you discover</li>
              <li>Suggest free or low-cost activities as alternatives to expensive outings</li>
              <li>Support friends who are trying to save money by not pressuring them to spend</li>
            </ul>
            
            <h3>The Psychology of Spending</h3>
            <p>Understanding why we want to buy things helps us make better decisions:</p>
            
            <h4>Marketing and Advertising Influences</h4>
            <ul>
              <li><strong>Emotional appeals</strong> - Ads try to make you feel like you need something to be happy or successful</li>
              <li><strong>Artificial scarcity</strong> - "Limited time" or "only a few left" messages create pressure to buy quickly</li>
              <li><strong>Social proof</strong> - "Everyone else is buying this" messages make you want to fit in</li>
              <li><strong>Celebrity endorsements</strong> - Using famous people to make products seem more desirable</li>
            </ul>
            
            <h4>Internal Motivations</h4>
            <ul>
              <li><strong>Instant gratification</strong> - The desire to have something right now rather than wait</li>
              <li><strong>Status seeking</strong> - Wanting to show off or impress others with purchases</li>
              <li><strong>Convenience</strong> - Paying extra for things that save time or effort</li>
              <li><strong>Habit</strong> - Buying certain things because you always have, without thinking about whether you still need them</li>
            </ul>
            
            <h3>Building Long-Term Spending Skills</h3>
            
            <h4>Developing Your Personal Spending Philosophy</h4>
            <p>Think about what matters most to you and let that guide your spending decisions:</p>
            <ul>
              <li>What kind of life do you want to live?</li>
              <li>What experiences are most important to you?</li>
              <li>How do you want to help others?</li>
              <li>What are your biggest goals and dreams?</li>
            </ul>
            
            <h4>Learning from Mistakes</h4>
            <p>Everyone makes poor spending choices sometimes. The key is to learn from them:</p>
            <ul>
              <li>When you regret a purchase, think about what you could have done differently</li>
              <li>Notice patterns in your spending mistakes</li>
              <li>Don't beat yourself up about past mistakes - focus on making better choices going forward</li>
              <li>Share your experiences with others so they can learn too</li>
            </ul>
            
            <h4>Practicing with Small Decisions</h4>
            <p>The best way to develop smart spending skills is to practice with small, low-risk purchases:</p>
            <ul>
              <li>Use your allowance or small amounts of earned money to practice decision-making</li>
              <li>Try different strategies and see what works best for you</li>
              <li>Keep track of which purchases you're happy with and which you regret</li>
              <li>Gradually apply these skills to bigger purchases as you get older</li>
            </ul>
            
            <h3>The Bigger Picture: Spending and Life Goals</h3>
            <p>Smart spending isn't about never buying anything fun or always choosing the cheapest option. It's about making conscious choices that align with your values and help you achieve your goals.</p>
            
            <p>When you develop good spending habits now, you're building skills that will serve you throughout your life. You'll be able to afford the things that truly matter to you, avoid financial stress, and have the freedom to make choices based on what's best for you rather than being forced into decisions by financial pressure.</p>
            
            <p>Remember: every spending decision is an opportunity to practice making good choices. The more you practice thinking before you spend, comparing options, and making decisions based on value rather than impulse, the better you'll become at managing money and achieving your dreams.</p>
          `
        },
        quiz: [
          {
            id: 1,
            question: "What should you do before buying anything?",
            options: ["Buy it immediately", "Think about whether you need it or want it", "Ask your friends", "Check the color"],
            correct: "Think about whether you need it or want it",
            explanation: "Always pause and consider if something is a need or want before making a purchase."
          },
          {
            id: 2,
            question: "What is comparison shopping?",
            options: ["Shopping with friends", "Checking prices at different stores", "Buying everything at once", "Shopping online only"],
            correct: "Checking prices at different stores",
            explanation: "Comparison shopping means looking at different options and prices to find the best deal."
          },
          {
            id: 3,
            question: "What is impulse buying?",
            options: ["Buying things without thinking", "Buying things on sale", "Buying things you need", "Buying things for others"],
            correct: "Buying things without thinking",
            explanation: "Impulse buying is purchasing something quickly without thinking it through, which often leads to regret."
          },
          {
            id: 4,
            question: "Which question should you ask yourself before buying something?",
            options: ["What color is it?", "Will I still want this next week?", "Who else has this?", "Is it the biggest one?"],
            correct: "Will I still want this next week?",
            explanation: "Thinking about whether you'll still value the item later helps avoid purchases you might regret."
          },
          {
            id: 5,
            question: "What does 'value' mean when shopping?",
            options: ["The highest price", "The right balance of quality and price", "The cheapest option", "The most popular item"],
            correct: "The right balance of quality and price",
            explanation: "Value isn't just about price - it's about getting good quality for a fair price that will last and be useful."
          },
          {
            id: 6,
            question: "What should you do if something seems like a 'great deal' but you don't need it?",
            options: ["Buy it anyway because it's cheap", "Don't buy it", "Buy multiple ones", "Ask everyone you know if they want it"],
            correct: "Don't buy it",
            explanation: "If you don't need something, it's never a good deal, no matter how cheap it is."
          },
          {
            id: 7,
            question: "What is opportunity cost?",
            options: ["The price of something", "What you give up to get something else", "A type of store", "A way to pay"],
            correct: "What you give up to get something else",
            explanation: "Opportunity cost is what you sacrifice when you choose one option over another - like buying a toy instead of saving for a bike."
          },
          {
            id: 8,
            question: "Why should you avoid shopping when you're feeling sad or excited?",
            options: ["Stores are closed", "You might make poor decisions", "It's against the law", "You'll spend too much time"],
            correct: "You might make poor decisions",
            explanation: "Strong emotions can lead to impulsive purchases that you might regret later."
          },
          {
            id: 9,
            question: "What's the best way to avoid overspending at a store?",
            options: ["Don't bring any money", "Make a list and stick to it", "Shop as fast as possible", "Only buy the most expensive items"],
            correct: "Make a list and stick to it",
            explanation: "Having a shopping list helps you stay focused on what you actually need and avoid impulse purchases."
          },
          {
            id: 10,
            question: "When is the best time to buy something you want but don't need?",
            options: ["Right away", "When you're bored", "After you've thought about it and saved money for it", "Never"],
            correct: "After you've thought about it and saved money for it",
            explanation: "Taking time to think and save for wants helps ensure you really value them and can afford them responsibly."
          }
        ],
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

  const gradeContent = lessonContent[grade as keyof typeof lessonContent];
  const currentLessonContent = gradeContent?.[module as keyof typeof gradeContent];

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
    
    // Auto-progress to article section
    setTimeout(() => {
      setCurrentSection('article');
    }, 1500);
  };

  const handleArticleComplete = async () => {
    setArticleCompleted(true);
    if (user) {
      await updateProgress('article_completed', true);
    }
    toast.success("Article completed! Keep it up!");
    
    // Auto-progress to quiz section and scroll to top
    setTimeout(() => {
      setCurrentSection('quiz');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
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
      navigate(`/education/grade/${grade}/module/${module + 1}`);
    } else if (grade < 8) {
      navigate(`/education/grade/${grade + 1}/module/1`);
    }
  };

  const prevModule = () => {
    if (module > 1) {
      navigate(`/education/grade/${grade}/module/${module - 1}`);
    } else if (grade > 3) {
      navigate(`/education/grade/${grade - 1}/module/17`);
    }
  };

  const overallProgress = ((videoCompleted ? 1 : 0) + (articleCompleted ? 1 : 0) + (quizSubmitted && score >= 60 ? 1 : 0)) / 3 * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 bg-card/80 backdrop-blur-sm p-6 rounded-lg border shadow-sm mt-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate(`/grade/${grade}`)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Grade {grade}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Grade {grade} - Module {module}</h1>
              <p className="text-xl text-muted-foreground">{currentLessonContent.title}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-foreground">Progress: {overallProgress.toFixed(0)}%</span>
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

                  <div className="flex justify-end items-center">
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
                <div className="text-white">
                  <h2 className="text-2xl font-bold mb-6 text-white">{currentLessonContent.article.title}</h2>
                  <div 
                    className="prose prose-lg prose-invert max-w-none text-white [&>h2]:text-white [&>h3]:text-white [&>h4]:text-white [&>p]:text-white [&>ul]:text-white [&>li]:text-white [&>strong]:text-white"
                    dangerouslySetInnerHTML={{ __html: currentLessonContent.article.content }}
                  />
                  <div className="mt-8 pt-6 border-t border-white/20 flex justify-end">
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