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
        videoTitle: "What is Money? - Financial Literacy for Kids",
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
            
            <h3>Why Money Makes Life Better</h3>
            <p>Money improves our lives in many important ways:</p>
            <ul>
              <li><strong>Enables Specialization</strong> - People can focus on becoming really good at one job (like being a doctor, teacher, or engineer) because they know they can use money to buy everything else they need</li>
              <li><strong>Facilitates Trade</strong> - Makes it possible to trade with people all over the world</li>
              <li><strong>Enables Saving</strong> - Allows people to set aside resources for emergencies, goals, and retirement</li>
              <li><strong>Supports Economic Growth</strong> - Makes it easier for businesses to operate and expand</li>
              <li><strong>Increases Efficiency</strong> - Eliminates the time wasted trying to find people to barter with</li>
            </ul>
            
            <h3>Taking Care of Money</h3>
            <p>Since money is so important, we need to take good care of it:</p>
            <ul>
              <li>Keep bills flat and clean - don't fold or crumple them</li>
              <li>Store coins in a safe place where they won't get lost</li>
              <li>Never write on or damage money - it's actually illegal to deface currency!</li>
              <li>Keep your money in safe places like wallets, piggy banks, or bank accounts</li>
              <li>Count your money carefully when making purchases</li>
              <li>Always check your change to make sure it's correct</li>
            </ul>
            
            <h3>Money Around the World</h3>
            <p>Different countries use different types of money called currencies:</p>
            <ul>
              <li><strong>United States</strong> - Dollars ($)</li>
              <li><strong>Canada</strong> - Canadian Dollars</li>
              <li><strong>European Union</strong> - Euros (€)</li>
              <li><strong>United Kingdom</strong> - Pounds (£)</li>
              <li><strong>Japan</strong> - Yen (¥)</li>
              <li><strong>China</strong> - Yuan</li>
              <li><strong>India</strong> - Rupees</li>
            </ul>
            
            <p>When people from different countries want to trade with each other, they have to exchange their currencies. The rate at which currencies are exchanged changes every day based on how strong each country's economy is.</p>
            
            <h3>The Future of Money</h3>
            <p>Money continues to evolve! Some exciting developments include:</p>
            <ul>
              <li><strong>Digital Currencies</strong> - New types of money that exist only on computers</li>
              <li><strong>Contactless Payments</strong> - Paying by just tapping your card or phone</li>
              <li><strong>Biometric Payments</strong> - Using your fingerprint or face to pay</li>
              <li><strong>Cryptocurrency</strong> - Digital money secured by computer codes</li>
            </ul>
            
            <h3>Fun Money Facts</h3>
            <ul>
              <li>The first coins were made about 2,700 years ago in Turkey</li>
              <li>Paper money was invented in China over 1,000 years ago</li>
              <li>The U.S. $100 bill is the most counterfeited bill in the world</li>
              <li>Credit cards were invented in 1950</li>
              <li>The average dollar bill lasts about 6 years before it wears out</li>
              <li>Coins last much longer - about 30 years on average</li>
              <li>The phrase "In God We Trust" has been on U.S. money since 1957</li>
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
            question: "Money helps us do all of these EXCEPT:",
            options: ["Buy food and clothes", "Save for the future", "Help others", "Control the weather"],
            correct: "Control the weather",
            explanation: "Money can help us buy things, save, and help others, but it cannot control natural things like the weather!"
          },
          {
            id: 6,
            question: "What makes money useful compared to trading items directly?",
            options: ["It's more colorful", "It's easier to carry and use", "It makes noise", "It never gets lost"],
            correct: "It's easier to carry and use",
            explanation: "Money is much easier to carry and use than trading heavy or awkward items directly with other people!"
          },
          {
            id: 7,
            question: "If you wanted to help others with your money, what could you do?",
            options: ["Hide it under your bed", "Spend it all on toys", "Donate to charity", "Throw it away"],
            correct: "Donate to charity",
            explanation: "One wonderful way to use money to help others is to donate some of it to charities that help people in need!"
          },
          {
            id: 8,
            question: "What currency is used in Japan?",
            options: ["Dollars", "Euros", "Yen", "Pounds"],
            correct: "Yen",
            explanation: "Japan uses Yen (¥) as their currency, just like the United States uses Dollars ($)!"
          },
          {
            id: 9,
            question: "Before money existed, how did people get things they needed?",
            options: ["They traded items directly", "They used credit cards", "They asked the government", "They made everything themselves"],
            correct: "They traded items directly",
            explanation: "Before money, people had to trade items directly with each other, which was much more difficult than using money!"
          },
          {
            id: 10,
            question: "Where was paper money first used?",
            options: ["United States", "China", "Europe", "Africa"],
            correct: "China",
            explanation: "Paper money was first used in China over 1,000 years ago, making it a very old invention!"
          }
        ],
        xpReward: 100
      },
      2: {
        title: "Earning Money",
        videoUrl: "https://www.youtube.com/embed/sd0r9GuOflo",
        videoTitle: "How Kids Can Earn Money - Jobs and Chores",
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
            
            <h4>Sales and Distribution Jobs</h4>
            <p>These jobs help connect products and services with customers:</p>
            <ul>
              <li><strong>Retail Sales</strong> - Store clerks, cashiers, sales associates</li>
              <li><strong>Real Estate</strong> - Agents who help people buy and sell homes</li>
              <li><strong>Marketing and Advertising</strong> - People who help businesses reach customers</li>
              <li><strong>Transportation</strong> - Truck drivers, delivery workers, pilots who move goods and people</li>
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
            
            <h4>Neighborhood Services</h4>
            <p>With your parents' permission and supervision, you might offer services to neighbors:</p>
            <ul>
              <li><strong>Pet Services</strong> - Walking dogs, pet sitting, cleaning pet areas</li>
              <li><strong>Yard Services</strong> - Raking leaves, weeding, basic gardening tasks</li>
              <li><strong>Seasonal Help</strong> - Shoveling snow, holiday decoration setup/takedown</li>
              <li><strong>Mail and Package Services</strong> - Collecting mail/packages for traveling neighbors</li>
              <li><strong>Car Washing</strong> - Helping wash cars (with adult supervision)</li>
            </ul>
            
            <h4>Creative and Entrepreneurial Activities</h4>
            <ul>
              <li><strong>Arts and Crafts</strong> - Making and selling friendship bracelets, painted rocks, or other crafts</li>
              <li><strong>Baking and Food</strong> - Making cookies, lemonade, or other treats to sell (with permission)</li>
              <li><strong>Digital Services</strong> - Creating simple websites, helping with social media, basic computer tasks</li>
              <li><strong>Tutoring and Teaching</strong> - Helping younger kids with homework or teaching skills you're good at</li>
              <li><strong>Performance</strong> - Putting on shows, playing music, or other entertainment</li>
            </ul>
            
            <h3>The Connection Between Education and Earning</h3>
            <p>One of the most important things to understand about earning money is how education affects income. Generally, people who have more education and specialized skills can earn more money because they can do more valuable and complex work.</p>
            
            <h4>Why Learning Increases Earning Power</h4>
            <ul>
              <li><strong>Knowledge is Valuable</strong> - The more you know, the more problems you can solve for others</li>
              <li><strong>Skills Open Doors</strong> - Special abilities make you qualified for better-paying jobs</li>
              <li><strong>Critical Thinking</strong> - Education teaches you how to analyze problems and find solutions</li>
              <li><strong>Communication</strong> - Learning to read, write, and speak well is essential for most good jobs</li>
              <li><strong>Adaptability</strong> - Education teaches you how to learn new things, which is crucial in a changing world</li>
            </ul>
            
            <h3>Important Work Values and Ethics</h3>
            <p>No matter what kind of work you do, certain values and behaviors are essential for success:</p>
            
            <h4>Reliability and Responsibility</h4>
            <ul>
              <li>Show up on time and ready to work</li>
              <li>Do what you say you'll do</li>
              <li>Take responsibility for mistakes and fix them</li>
              <li>Be dependable so others can count on you</li>
            </ul>
            
            <h4>Quality and Excellence</h4>
            <ul>
              <li>Always try to do your best work, even on small tasks</li>
              <li>Take pride in what you create or accomplish</li>
              <li>Keep learning and improving your skills</li>
              <li>Pay attention to details</li>
            </ul>
            
            <h4>Honesty and Integrity</h4>
            <ul>
              <li>Be truthful in all your dealings</li>
              <li>Don't take things that don't belong to you</li>
              <li>Treat customers and coworkers fairly and respectfully</li>
              <li>Keep your promises and commitments</li>
            </ul>
            
            <h3>Building Work Skills Early</h3>
            <p>Even as a kid, you can start developing the skills that will help you earn money throughout your life:</p>
            
            <h4>Communication Skills</h4>
            <ul>
              <li>Practice speaking clearly and politely</li>
              <li>Learn to listen carefully to instructions</li>
              <li>Develop good writing skills</li>
              <li>Learn to ask good questions when you don't understand</li>
            </ul>
            
            <h4>Problem-Solving Skills</h4>
            <ul>
              <li>When you encounter problems, try to find solutions</li>
              <li>Learn from mistakes rather than giving up</li>
              <li>Practice thinking creatively about challenges</li>
              <li>Develop patience and persistence</li>
            </ul>
            
            <h4>Teamwork Skills</h4>
            <ul>
              <li>Learn to work well with others</li>
              <li>Practice sharing responsibilities</li>
              <li>Be willing to help teammates succeed</li>
              <li>Learn to give and receive constructive feedback</li>
            </ul>
            
            <h3>The Importance of Finding Work You Enjoy</h3>
            <p>While all honest work has dignity and value, it's important to eventually find work that matches your interests, values, and strengths. When you enjoy your work:</p>
            <ul>
              <li>You'll be more motivated to do it well</li>
              <li>You'll be willing to learn and improve</li>
              <li>You'll be happier and less stressed</li>
              <li>You'll be more likely to succeed and advance</li>
              <li>Work won't feel like a burden</li>
            </ul>
            
            <h3>Different Ways People Earn Money</h3>
            
            <h4>Employment</h4>
            <p>Most people earn money by working for someone else - a company, organization, or individual employer. They receive regular paychecks in exchange for their work.</p>
            
            <h4>Self-Employment and Entrepreneurship</h4>
            <p>Some people start their own businesses or work for themselves. They earn money directly from their customers rather than from an employer.</p>
            
            <h4>Investments</h4>
            <p>People can also earn money by investing in businesses, real estate, or other assets that grow in value or generate income over time.</p>
            
            <h3>Future Trends in Work and Earning</h3>
            <p>The world of work is constantly changing. Some trends that might affect your future earning opportunities include:</p>
            <ul>
              <li><strong>Technology Integration</strong> - Almost all jobs now involve some technology</li>
              <li><strong>Remote Work</strong> - Many jobs can now be done from anywhere with an internet connection</li>
              <li><strong>Lifelong Learning</strong> - Workers need to continuously update their skills</li>
              <li><strong>Entrepreneurship</strong> - More people are starting their own businesses</li>
              <li><strong>Service Economy</strong> - More jobs focus on helping people rather than making physical products</li>
            </ul>
          `
        },
        quiz: [
          {
            id: 1,
            question: "What is work?",
            options: ["Playing games", "Using time and skills to do something valuable for others", "Watching TV", "Sleeping"],
            correct: "Using time and skills to do something valuable for others",
            explanation: "Work means using your time, skills, and effort to create value for others, and getting paid in return!"
          },
          {
            id: 2,
            question: "Which is NOT a way kids can earn money?",
            options: ["Doing chores", "Walking neighbors' dogs", "Operating heavy machinery", "Making crafts to sell"],
            correct: "Operating heavy machinery",
            explanation: "Kids should only do age-appropriate work that is safe and legal for their age!"
          },
          {
            id: 3,
            question: "Why do people with more education often earn more money?",
            options: ["They are luckier", "They can do more complex and valuable work", "They work fewer hours", "Money appears automatically"],
            correct: "They can do more complex and valuable work",
            explanation: "Education and skills training help people do more valuable work, which usually pays better!"
          },
          {
            id: 4,
            question: "What type of job involves helping people directly?",
            options: ["Service jobs", "Manufacturing jobs", "Mining jobs", "Entertainment jobs"],
            correct: "Service jobs",
            explanation: "Service jobs like teaching, healthcare, and public safety involve directly helping and serving people!"
          },
          {
            id: 5,
            question: "If you wanted to earn money by making something, what could you do?",
            options: ["Sleep more", "Make crafts to sell", "Watch movies", "Play video games"],
            correct: "Make crafts to sell",
            explanation: "Making things like crafts, artwork, or food items that people want to buy is a great way to earn money!"
          },
          {
            id: 6,
            question: "What's the most important thing about any job?",
            options: ["It should be easy", "It should create value for others", "It should be fun", "It should be quick"],
            correct: "It should create value for others",
            explanation: "All good jobs create value for other people - that's why people are willing to pay for them!"
          },
          {
            id: 7,
            question: "Which household chore could help you earn money?",
            options: ["Watching TV", "Organizing and cleaning", "Taking naps", "Playing games"],
            correct: "Organizing and cleaning",
            explanation: "Helping keep the house clean and organized is valuable work that many families will pay kids to do!"
          },
          {
            id: 8,
            question: "What should you always ask before doing work for neighbors?",
            options: ["How much they'll pay", "Permission from your parents", "If it's easy", "If you can do it quickly"],
            correct: "Permission from your parents",
            explanation: "Always get your parents' permission before doing any work for neighbors to make sure it's safe and appropriate!"
          },
          {
            id: 9,
            question: "Why is it important to do good work?",
            options: ["So people will hire you again", "To learn valuable skills", "To build a good reputation", "All of the above"],
            correct: "All of the above",
            explanation: "Doing good work helps you get hired again, teaches you skills, and builds a reputation as someone reliable!"
          },
          {
            id: 10,
            question: "What's the best attitude to have toward work?",
            options: ["Work is boring", "Work is punishment", "Work is a way to help others and earn money", "Work should be avoided"],
            correct: "Work is a way to help others and earn money",
            explanation: "Having a positive attitude about work as a way to help others while earning money will serve you well throughout life!"
          }
        ],
        xpReward: 100
      },
      3: {
        title: "Needs vs Wants",
        videoUrl: "https://www.youtube.com/embed/2PX4-Y1zu2g",
        videoTitle: "Needs vs Wants - Smart Money Decisions for Kids",
        article: {
          title: "Making Smart Choices: Understanding Needs vs Wants",
          content: `
            <h2>Making Smart Choices: The Complete Guide to Understanding Needs vs Wants</h2>
            <p>One of the most important life skills you can develop is learning the difference between things you need and things you want. This skill will help you make smart decisions with your money throughout your entire life, avoid financial problems, and achieve your goals faster. Understanding needs vs wants is the foundation of all good money management!</p>
            
            <h3>What Are Needs? The Essentials for Life and Health</h3>
            <p>Needs are things you absolutely must have to live, stay healthy, be safe, and function in society. Without these items, your health, safety, or basic well-being would be at risk. Needs are not optional - they are requirements for a decent life.</p>
            
            <h4>Physical Survival Needs</h4>
            <ul>
              <li><strong>Nutritious Food</strong> - Your body requires healthy food for energy, growth, and health. This includes fruits, vegetables, proteins, grains, and dairy products. While you might want fancy or expensive foods, you need basic nutrition to survive.</li>
              <li><strong>Clean Water</strong> - Safe drinking water is absolutely essential for life. Your body can only survive a few days without water.</li>
              <li><strong>Appropriate Shelter</strong> - You need a safe, weather-protected place to live. This could be a house, apartment, or other dwelling that keeps you safe from weather and danger.</li>
              <li><strong>Weather-Appropriate Clothing</strong> - Basic clothes to protect you from weather and maintain body temperature. This includes underwear, pants, shirts, shoes, and outerwear appropriate for your climate.</li>
              <li><strong>Basic Healthcare</strong> - Medical care when you're sick or injured, including necessary medications, doctor visits, and emergency care.</li>
            </ul>
            
            <h4>Safety and Security Needs</h4>
            <ul>
              <li><strong>Personal Safety</strong> - Protection from violence, crime, and dangerous situations</li>
              <li><strong>Financial Security</strong> - Enough money for basic needs and some emergency savings</li>
              <li><strong>Stable Living Situation</strong> - A secure place to live that won't disappear unexpectedly</li>
              <li><strong>Legal Protection</strong> - Access to justice and legal rights</li>
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
          `
        },
        quiz: [
          {
            id: 1,
            question: "Which of these is a NEED?",
            options: ["Video games", "Healthy food", "Expensive sneakers", "Candy"],
            correct: "Healthy food",
            explanation: "Healthy food is a need because your body requires nutrition to grow and stay healthy!"
          },
          {
            id: 2,
            question: "Which of these is a WANT?",
            options: ["A safe place to sleep", "Medicine when sick", "The latest smartphone", "School supplies"],
            correct: "The latest smartphone",
            explanation: "While phones can be useful, the latest model is a want, not a need. A basic phone for safety might be a need."
          },
          {
            id: 3,
            question: "What should you do FIRST with your money?",
            options: ["Buy toys", "Buy what you want", "Take care of your needs", "Give it all away"],
            correct: "Take care of your needs",
            explanation: "Always take care of your needs first to make sure you have what's necessary for health and safety!"
          },
          {
            id: 4,
            question: "If you want something expensive, what should you do?",
            options: ["Buy it immediately", "Wait and think about it", "Borrow money to buy it", "Forget about it forever"],
            correct: "Wait and think about it",
            explanation: "Waiting helps you decide if you really want something or if it was just a temporary desire!"
          },
          {
            id: 5,
            question: "Which is the smartest approach to spending?",
            options: ["Needs first, save some, then wants", "Wants first, then needs", "Only buy needs", "Only buy wants"],
            correct: "Needs first, save some, then wants",
            explanation: "The smart approach is: needs first (stay healthy), save some (for the future), then wants (if money is left)!"
          },
          {
            id: 6,
            question: "Why is it important to save some money?",
            options: ["To show off", "For future needs and emergencies", "To make banks happy", "Money gets lonely"],
            correct: "For future needs and emergencies",
            explanation: "Saving money prepares you for unexpected expenses and helps you reach bigger goals in the future!"
          },
          {
            id: 7,
            question: "What makes something a need vs a want?",
            options: ["How much it costs", "Whether you can live without it", "Whether friends have it", "Whether it's on sale"],
            correct: "Whether you can live without it",
            explanation: "Needs are things required for health and safety. Wants are nice to have but not necessary for living!"
          },
          {
            id: 8,
            question: "Which scenario shows good needs vs wants thinking?",
            options: ["Buying candy instead of lunch", "Buying school supplies before toys", "Buying expensive shoes instead of any shoes", "Never saving money"],
            correct: "Buying school supplies before toys",
            explanation: "School supplies are a need for education, while toys are wants. Good thinking puts needs first!"
          },
          {
            id: 9,
            question: "If you have $20, what's the smartest plan?",
            options: ["Spend it all on candy", "$10 for needs, $5 to save, $5 for wants", "Hide it all", "Give it all away"],
            correct: "$10 for needs, $5 to save, $5 for wants",
            explanation: "This plan takes care of needs first, saves for the future, and allows some money for wants!"
          },
          {
            id: 10,
            question: "What's a good question to ask before buying something?",
            options: ["Do my friends have this?", "Is this the cheapest option?", "Do I need this or just want it?", "Will this make me popular?"],
            correct: "Do I need this or just want it?",
            explanation: "Always ask yourself if something is a need or want before spending money. This helps you make smart choices!"
          }
        ],
        xpReward: 100
      },
      4: {
        title: "Spending Choices",
        videoUrl: "https://www.youtube.com/embed/GwAIu-RA_WA",
        videoTitle: "Smart Spending Choices for Kids",
        article: {
          title: "Making Smart Spending Decisions",
          content: `
            <h2>Learning to Make Smart Spending Choices</h2>
            <p>Making good spending choices is one of the most important money skills you can learn. Every time you spend money, you're making a decision that affects your future financial success. Learning to think before you spend will help you throughout your entire life!</p>
            
            <h3>What is a Spending Choice?</h3>
            <p>A spending choice is any decision you make about using your money to buy something. Whether you're spending 25 cents on a piece of candy or $25 on a toy, you're making a spending choice. Good spending choices help you get the most value from your money and achieve your goals.</p>
            
            <h3>The Smart Spending Process</h3>
            <h4>Step 1: Stop and Think</h4>
            <p>Before you buy anything, take a moment to stop and think. Ask yourself:</p>
            <ul>
              <li>Do I really need this or just want it?</li>
              <li>Will I still be happy with this purchase next week?</li>
              <li>Is this the best price I can find?</li>
              <li>What else could I do with this money?</li>
            </ul>
            
            <h4>Step 2: Compare Your Options</h4>
            <p>Look at different choices before deciding:</p>
            <ul>
              <li>Compare prices at different stores</li>
              <li>Consider buying used instead of new</li>
              <li>Think about waiting for a sale</li>
              <li>Ask if there's a similar item that costs less</li>
            </ul>
            
            <h4>Step 3: Make Your Decision</h4>
            <p>After thinking and comparing, make your choice. Remember, it's okay to decide NOT to buy something!</p>
          `
        },
        quiz: [
          {
            id: 1,
            question: "What should you do before making any purchase?",
            options: ["Buy it immediately", "Stop and think about it", "Ask friends what to do", "Always buy the most expensive option"],
            correct: "Stop and think about it",
            explanation: "Taking time to think before spending helps you make better decisions and avoid regrets!"
          },
          {
            id: 2,
            question: "Which question is most important when making a spending choice?",
            options: ["Is this trendy?", "Do I need this or just want it?", "What will my friends think?", "Is it the biggest one?"],
            correct: "Do I need this or just want it?",
            explanation: "Understanding whether something is a need or want is the foundation of good spending decisions!"
          }
        ],
        xpReward: 100
      },
      5: {
        title: "Saving Basics",
        videoUrl: "https://www.youtube.com/embed/6B0MS3zvMkM",
        videoTitle: "Saving Money Basics for Kids",
        article: {
          title: "The Power of Saving Money",
          content: `
            <h2>Why Saving Money is Super Important</h2>
            <p>Saving money means keeping some of your money instead of spending it all right away. It's like planting seeds that will grow into bigger amounts of money later. Learning to save is one of the most powerful money skills you can develop!</p>
            
            <h3>Why Should You Save Money?</h3>
            <ul>
              <li><strong>For Emergencies</strong> - Unexpected things happen, and having money saved helps you handle them</li>
              <li><strong>For Big Goals</strong> - Some things cost more than your weekly allowance, so saving helps you buy them</li>
              <li><strong>For Opportunities</strong> - Sometimes great deals come up, and saved money lets you take advantage of them</li>
              <li><strong>For Peace of Mind</strong> - Having money saved makes you feel more secure and confident</li>
            </ul>
            
            <h3>Easy Ways to Start Saving</h3>
            <h4>The Piggy Bank Method</h4>
            <p>Get a piggy bank, jar, or special box just for savings. Every time you get money, put some in your savings container before spending any.</p>
            
            <h4>The 10% Rule</h4>
            <p>Try to save at least 10% of any money you receive. If you get $10, save $1. If you get $5, save 50 cents.</p>
            
            <h4>The Goal Setting Method</h4>
            <p>Pick something specific you want to save for, like a toy or game. Figure out how much you need to save each week to reach your goal.</p>
          `
        },
        quiz: [
          {
            id: 1,
            question: "What does it mean to save money?",
            options: ["Spend it all quickly", "Keep some instead of spending it all", "Give it all away", "Hide it where you'll forget it"],
            correct: "Keep some instead of spending it all",
            explanation: "Saving means setting aside money for later instead of spending everything right away!"
          },
          {
            id: 2,
            question: "What's a good rule for how much to save?",
            options: ["Save 100% of your money", "Save at least 10%", "Never save anything", "Only save coins, not bills"],
            correct: "Save at least 10%",
            explanation: "Saving at least 10% of your money is a great starting point for building good money habits!"
          }
        ],
        xpReward: 100
      }
    },
    4: {
      1: {
        title: "Money Review",
        videoUrl: "https://www.youtube.com/embed/ulKvddvZQzQ",
        videoTitle: "Money Fundamentals Review - Building Strong Foundations",
        article: {
          title: "Advanced Money Concepts for Grade 4",
          content: `
            <h2>Advanced Money Concepts: Building Strong Financial Foundations</h2>
            <p>Welcome to Grade 4 Financial Literacy! Now that you have a solid understanding of basic money concepts, it's time to dive deeper into how money works in our complex modern economy. This advanced knowledge will help you make even smarter financial decisions and prepare you for more sophisticated money management as you grow older.</p>
            
            <h3>The Evolution of Money: From Barter to Digital Currency</h3>
            <p>To truly understand money, we need to explore how it has evolved throughout human history and where it's heading in the future.</p>
            
            <h4>The Problems with Barter Systems</h4>
            <p>Before money existed, people used barter systems - directly trading goods and services. While this sounds simple, it created many problems:</p>
            <ul>
              <li><strong>Double Coincidence of Wants</strong> - You needed to find someone who had what you wanted AND wanted what you had</li>
              <li><strong>No Standard of Value</strong> - It was hard to know if trading 5 apples for 1 loaf of bread was fair</li>
              <li><strong>Divisibility Problems</strong> - How do you split a cow to buy something smaller?</li>
              <li><strong>Storage Issues</strong> - Many goods spoiled or were difficult to store</li>
              <li><strong>Transportation Difficulties</strong> - Moving heavy or bulky items to trade was challenging</li>
            </ul>
            
            <h4>The Rise of Commodity Money</h4>
            <p>To solve barter problems, people began using commodity money - items that had value in themselves:</p>
            <ul>
              <li><strong>Precious Metals</strong> - Gold and silver were durable, portable, and universally valued</li>
              <li><strong>Other Commodities</strong> - Salt, cattle, shells, and even cigarettes have served as money</li>
              <li><strong>Standardization</strong> - Eventually, governments began minting coins to guarantee weight and purity</li>
            </ul>
            
            <h4>The Development of Paper Money</h4>
            <p>Paper money was revolutionary because:</p>
            <ul>
              <li><strong>Lighter to Carry</strong> - Much easier to transport than heavy coins</li>
              <li><strong>Backed by Gold/Silver</strong> - Initially, paper money could be exchanged for precious metals</li>
              <li><strong>Government Guarantee</strong> - The government promised the money had value</li>
              <li><strong>Fractional Reserve Banking</strong> - Banks could lend out more money than they physically held</li>
            </ul>
            
            <h3>The Three Essential Functions of Money (Detailed Analysis)</h3>
            
            <h4>1. Medium of Exchange: Facilitating Trade</h4>
            <p>Money's role as a medium of exchange eliminates the inefficiencies of barter:</p>
            <ul>
              <li><strong>Universal Acceptance</strong> - Everyone agrees to accept money in exchange for goods and services</li>
              <li><strong>Reduced Transaction Costs</strong> - No need to search for direct trading partners</li>
              <li><strong>Increased Specialization</strong> - People can focus on what they do best because they can easily trade</li>
              <li><strong>Market Expansion</strong> - Enables trade over long distances and between strangers</li>
            </ul>
            
            <h4>2. Unit of Account: Measuring Economic Value</h4>
            <p>Money provides a common measuring stick for economic value:</p>
            <ul>
              <li><strong>Price Comparison</strong> - You can easily compare the cost of different items</li>
              <li><strong>Economic Calculation</strong> - Businesses can calculate profits, costs, and efficiency</li>
              <li><strong>Record Keeping</strong> - Financial transactions can be easily recorded and tracked</li>
              <li><strong>Contract Writing</strong> - Agreements can specify exact monetary amounts</li>
            </ul>
            
            <h4>3. Store of Value: Preserving Wealth Over Time</h4>
            <p>Money allows people to save purchasing power for future use:</p>
            <ul>
              <li><strong>Deferred Consumption</strong> - You can work today and buy things later</li>
              <li><strong>Risk Management</strong> - Savings provide security against future uncertainties</li>
              <li><strong>Investment Capital</strong> - Saved money can be invested to create more wealth</li>
              <li><strong>Retirement Planning</strong> - People can save money while working to support themselves when they can't work</li>
            </ul>
            
            <h3>Modern Payment Methods: A Comprehensive Guide</h3>
            
            <h4>Cash: The Traditional Option</h4>
            <p><strong>Advantages:</strong></p>
            <ul>
              <li>Universally accepted</li>
              <li>No technology required</li>
              <li>Immediate settlement of debts</li>
              <li>Privacy in transactions</li>
              <li>No fees for basic transactions</li>
            </ul>
            <p><strong>Disadvantages:</strong></p>
            <ul>
              <li>Risk of theft or loss</li>
              <li>Inconvenient for large purchases</li>
              <li>No automatic record keeping</li>
              <li>Can be damaged or destroyed</li>
            </ul>
            
            <h4>Checks: Written Instructions to Banks</h4>
            <p><strong>How Checks Work:</strong></p>
            <ul>
              <li>Written instruction telling your bank to pay someone</li>
              <li>Requires a bank account with sufficient funds</li>
              <li>Takes several days to "clear" (process)</li>
              <li>Creates an automatic record of the transaction</li>
            </ul>
            <p><strong>Advantages:</strong></p>
            <ul>
              <li>Safe for large amounts</li>
              <li>Automatic record keeping</li>
              <li>Can be stopped if lost or stolen</li>
              <li>Widely accepted for bills and large purchases</li>
            </ul>
            
            <h4>Debit Cards: Electronic Access to Your Money</h4>
            <p><strong>How Debit Cards Work:</strong></p>
            <ul>
              <li>Directly connected to your bank account</li>
              <li>Money is immediately removed from your account</li>
              <li>Requires a PIN (Personal Identification Number) or signature</li>
              <li>Electronic verification ensures you have enough money</li>
            </ul>
            <p><strong>Advantages:</strong></p>
            <ul>
              <li>Convenient and widely accepted</li>
              <li>Prevents overspending (you can only spend what you have)</li>
              <li>Automatic record of transactions</li>
              <li>More secure than carrying large amounts of cash</li>
            </ul>
            
            <h4>Credit Cards: Borrowing Money to Pay</h4>
            <p><strong>How Credit Cards Work:</strong></p>
            <ul>
              <li>Credit card company pays the merchant</li>
              <li>You owe money to the credit card company</li>
              <li>You must pay back the money, usually with interest</li>
              <li>Credit limit determines maximum you can borrow</li>
            </ul>
            <p><strong>Advantages:</strong></p>
            <ul>
              <li>Can make purchases even without immediate cash</li>
              <li>Builds credit history when used responsibly</li>
              <li>Often includes fraud protection</li>
              <li>May offer rewards or cashback</li>
            </ul>
            <p><strong>Risks and Disadvantages:</strong></p>
            <ul>
              <li>Easy to overspend and accumulate debt</li>
              <li>High interest rates if not paid in full</li>
              <li>Can damage credit score if misused</li>
              <li>Annual fees on some cards</li>
            </ul>
            
            <h4>Digital Payments: The Future of Money</h4>
            <p><strong>Types of Digital Payments:</strong></p>
            <ul>
              <li><strong>Mobile Apps</strong> - Venmo, PayPal, Apple Pay, Google Pay</li>
              <li><strong>Online Banking</strong> - Transferring money through bank websites</li>
              <li><strong>Contactless Payments</strong> - Tap-to-pay cards and phones</li>
              <li><strong>Cryptocurrency</strong> - Digital currencies like Bitcoin</li>
            </ul>
            
            <h3>The Economics of Money: Supply and Demand</h3>
            
            <h4>Who Controls Money?</h4>
            <p>In the United States:</p>
            <ul>
              <li><strong>Federal Reserve</strong> - Controls monetary policy and money supply</li>
              <li><strong>U.S. Treasury</strong> - Prints and coins physical money</li>
              <li><strong>Commercial Banks</strong> - Create money through lending</li>
              <li><strong>Government</strong> - Sets laws and regulations about money</li>
            </ul>
            
            <h4>Inflation and Deflation</h4>
            <p><strong>Inflation</strong> occurs when:</p>
            <ul>
              <li>Prices of goods and services increase over time</li>
              <li>Each dollar buys less than it used to</li>
              <li>Too much money chases too few goods</li>
              <li>Usually happens slowly, around 2-3% per year</li>
            </ul>
            <p><strong>Deflation</strong> occurs when:</p>
            <ul>
              <li>Prices of goods and services decrease over time</li>
              <li>Each dollar buys more than it used to</li>
              <li>Usually indicates economic problems</li>
              <li>Can lead to people delaying purchases</li>
            </ul>
            
            <h3>International Money: Exchange Rates and Global Trade</h3>
            
            <h4>Currency Exchange</h4>
            <p>Different countries have different currencies, creating the need for exchange:</p>
            <ul>
              <li><strong>Exchange Rates</strong> - How much of one currency equals another</li>
              <li><strong>Floating Rates</strong> - Exchange rates that change based on supply and demand</li>
              <li><strong>Fixed Rates</strong> - Exchange rates set by governments</li>
              <li><strong>Currency Markets</strong> - Where currencies are bought and sold</li>
            </ul>
            
            <h4>Factors Affecting Exchange Rates</h4>
            <ul>
              <li><strong>Economic Strength</strong> - Stronger economies tend to have stronger currencies</li>
              <li><strong>Interest Rates</strong> - Higher rates can attract foreign investment</li>
              <li><strong>Political Stability</strong> - Stable governments inspire confidence in currency</li>
              <li><strong>Trade Balance</strong> - Countries that export more tend to have stronger currencies</li>
            </ul>
            
            <h3>Advanced Money Management Concepts</h3>
            
            <h4>The Time Value of Money</h4>
            <p>Money available today is worth more than the same amount in the future because:</p>
            <ul>
              <li><strong>Earning Potential</strong> - Today's money can be invested to grow</li>
              <li><strong>Inflation</strong> - Future money may buy less due to rising prices</li>
              <li><strong>Opportunity Cost</strong> - Waiting for money means missing other opportunities</li>
              <li><strong>Risk</strong> - Future payments are less certain than present money</li>
            </ul>
            
            <h4>Compound Interest: The Eighth Wonder of the World</h4>
            <p>Compound interest occurs when you earn interest on both your original money AND previously earned interest:</p>
            <ul>
              <li><strong>Simple Interest Example</strong> - $100 at 5% simple interest earns $5 per year</li>
              <li><strong>Compound Interest Example</strong> - $100 at 5% compound interest earns $5 the first year, then $5.25 the second year, and so on</li>
              <li><strong>The Power of Time</strong> - The longer money compounds, the more powerful the effect</li>
              <li><strong>Starting Early</strong> - Beginning to save young gives compound interest more time to work</li>
            </ul>
            
            <h3>Money and Technology: The Digital Revolution</h3>
            
            <h4>Blockchain and Cryptocurrency</h4>
            <p>New technologies are changing how money works:</p>
            <ul>
              <li><strong>Blockchain</strong> - A secure, digital ledger that records transactions</li>
              <li><strong>Bitcoin</strong> - The first and most famous cryptocurrency</li>
              <li><strong>Decentralization</strong> - No single government or bank controls these currencies</li>
              <li><strong>Volatility</strong> - Cryptocurrency values change dramatically and quickly</li>
            </ul>
            
            <h4>Central Bank Digital Currencies (CBDCs)</h4>
            <p>Governments are exploring digital versions of their currencies:</p>
            <ul>
              <li><strong>Government-Backed</strong> - Unlike cryptocurrencies, these are controlled by central banks</li>
              <li><strong>Digital Cash</strong> - Could eventually replace physical money</li>
              <li><strong>Increased Efficiency</strong> - Faster, cheaper transactions</li>
              <li><strong>Enhanced Tracking</strong> - Governments could monitor spending more easily</li>
            </ul>
            
            <h3>Practical Applications: Using Your Money Knowledge</h3>
            
            <h4>Smart Shopping Strategies</h4>
            <ul>
              <li><strong>Price Comparison</strong> - Check prices at multiple stores</li>
              <li><strong>Unit Pricing</strong> - Compare cost per ounce, pound, or item</li>
              <li><strong>Sales Cycles</strong> - Learn when different items typically go on sale</li>
              <li><strong>Quality vs Price</strong> - Sometimes paying more upfront saves money long-term</li>
            </ul>
            
            <h4>Understanding Financial Institutions</h4>
            <ul>
              <li><strong>Banks</strong> - Full-service financial institutions</li>
              <li><strong>Credit Unions</strong> - Member-owned financial cooperatives</li>
              <li><strong>Investment Companies</strong> - Help people grow their money</li>
              <li><strong>Insurance Companies</strong> - Provide financial protection against risks</li>
            </ul>
            
            <h3>Preparing for Your Financial Future</h3>
            
            <h4>Skills to Develop</h4>
            <ul>
              <li><strong>Mathematical Literacy</strong> - Understanding percentages, ratios, and basic calculations</li>
              <li><strong>Critical Thinking</strong> - Analyzing financial offers and decisions</li>
              <li><strong>Research Skills</strong> - Finding and evaluating financial information</li>
              <li><strong>Self-Control</strong> - Resisting impulse purchases and sticking to plans</li>
            </ul>
            
            <h4>Questions to Ask About Money Decisions</h4>
            <ul>
              <li>Is this a need or a want?</li>
              <li>What are the total costs, including hidden fees?</li>
              <li>What am I giving up to buy this (opportunity cost)?</li>
              <li>How does this fit into my budget and goals?</li>
              <li>Am I being pressured to make a quick decision?</li>
              <li>What would happen if I waited to decide?</li>
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
            id: 7,
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
            id: 8,
            question: "What does 'store of value' mean?",
            options: [
              "A place where money is kept",
              "Money keeps its worth over time",
              "A valuable store",
              "Storing things in a bank"
            ],
            correct: "Money keeps its worth over time",
            explanation: "Store of value means money keeps its worth over time, so you can save it today and use it later!"
          },
          {
            id: 9,
            question: "What is a credit card?",
            options: [
              "Money you already own",
              "A card that lets you borrow money that you must pay back",
              "Free money",
              "A gift card"
            ],
            correct: "A card that lets you borrow money that you must pay back",
            explanation: "Credit cards let you borrow money to make purchases, but you must pay it back later, often with extra fees!"
          },
          {
            id: 10,
            question: "When making a purchase decision, what should you consider?",
            options: [
              "Only the price",
              "Only what you want",
              "Needs vs wants, price, and opportunity cost",
              "What your friends think"
            ],
            correct: "Needs vs wants, price, and opportunity cost",
            explanation: "Smart money decisions consider whether it's a need or want, the price, and what you're giving up to buy it!"
          }
        ],
        xpReward: 120
      },
      2: {
        title: "Making a Budget",
        videoUrl: "https://www.youtube.com/embed/J8P3sCooGg0",
        videoTitle: "Budgeting Basics - How to Plan Your Spending",
        article: {
          title: "Creating Your First Budget: A Step-by-Step Guide",
          content: `
            <h2>What is a Budget?</h2>
            <p>A budget is a plan that shows how much money you have and how you want to spend it. It's like a map that helps you reach your money goals!</p>
            
            <h3>Why Make a Budget?</h3>
            <p>Budgets help you:</p>
            <ul>
              <li>Know exactly how much money you have</li>
              <li>Make sure you have money for needs</li>
              <li>Save money for things you really want</li>
              <li>Avoid spending more money than you have</li>
              <li>Reach your financial goals faster</li>
            </ul>
            
            <h3>The Simple Budget Formula</h3>
            <p>Every good budget follows this basic rule:</p>
            <p><strong>Income = Needs + Savings + Wants</strong></p>
            <ul>
              <li><strong>Income</strong> - Money you receive (allowance, gifts, earnings)</li>
              <li><strong>Needs</strong> - Things you must have</li>
              <li><strong>Savings</strong> - Money you set aside for the future</li>
              <li><strong>Wants</strong> - Things you'd like to have</li>
            </ul>
            
            <h3>The 50-30-20 Budget for Kids</h3>
            <p>Here's a simple way to divide your money:</p>
            <ul>
              <li><strong>50% for Needs</strong> - School supplies, lunch money, required items</li>
              <li><strong>30% for Wants</strong> - Toys, games, treats, entertainment</li>
              <li><strong>20% for Savings</strong> - Money for future goals and emergencies</li>
            </ul>
          `
        },
        quiz: [
          {
            id: 1,
            question: "What is a budget?",
            options: ["A type of bank", "A plan for how to spend your money", "A way to get free money", "A kind of allowance"],
            correct: "A plan for how to spend your money",
            explanation: "A budget is a plan that shows how much money you have and how you want to spend it to reach your goals!"
          },
          {
            id: 2,
            question: "What's the basic budget formula?",
            options: ["Income = Expenses", "Income = Needs + Savings + Wants", "Income = Spending", "Income = Fun"],
            correct: "Income = Needs + Savings + Wants",
            explanation: "The basic budget formula shows that all your income should be divided between needs, savings, and wants!"
          },
          {
            id: 3,
            question: "In the 50-30-20 budget, what gets 50%?",
            options: ["Wants", "Savings", "Needs", "Fun money"],
            correct: "Needs",
            explanation: "In the 50-30-20 budget, 50% goes to needs because they're the most important for your health and safety!"
          },
          {
            id: 4,
            question: "How much should you save according to the 50-30-20 rule?",
            options: ["10%", "20%", "30%", "50%"],
            correct: "20%",
            explanation: "The 50-30-20 rule suggests saving 20% of your money for future goals and emergencies!"
          },
          {
            id: 5,
            question: "If you get $10 allowance, how much should go to savings using the 50-30-20 rule?",
            options: ["$1", "$2", "$3", "$5"],
            correct: "$2",
            explanation: "20% of $10 is $2. So $2 should go to savings, $5 to needs, and $3 to wants!"
          },
          {
            id: 6,
            question: "Why is it important to include savings in your budget?",
            options: ["To impress friends", "To prepare for future goals and emergencies", "Banks require it", "It's not important"],
            correct: "To prepare for future goals and emergencies",
            explanation: "Saving money helps you be prepared for unexpected expenses and reach bigger goals you're working toward!"
          },
          {
            id: 7,
            question: "What should you do if you want something that costs more than your 'wants' budget?",
            options: ["Buy it anyway", "Save up over several budget periods", "Take money from needs", "Forget about it"],
            correct: "Save up over several budget periods",
            explanation: "If something costs more than your wants budget, you can save your wants money over time until you have enough!"
          },
          {
            id: 8,
            question: "What counts as 'income' for a kid's budget?",
            options: ["Only allowance", "Allowance, gifts, and money earned from chores", "Only birthday money", "Only money from parents"],
            correct: "Allowance, gifts, and money earned from chores",
            explanation: "Income includes all money you receive: allowance, gift money, earnings from chores, and any other money you get!"
          },
          {
            id: 9,
            question: "What's the biggest benefit of following a budget?",
            options: ["You can spend more money", "It helps you reach your money goals", "Adults will be impressed", "You never have to think about money"],
            correct: "It helps you reach your money goals",
            explanation: "The biggest benefit of a budget is that it helps you reach your money goals by planning your spending wisely!"
          },
          {
            id: 10,
            question: "If your budget shows you'll spend more than you have, what should you do?",
            options: ["Ignore the budget", "Reduce your wants spending", "Borrow money", "Stop saving"],
            correct: "Reduce your wants spending",
            explanation: "If you're spending more than you have, reduce wants spending first, since needs and savings are more important!"
          }
        ],
        xpReward: 120
      },
      3: {
        title: "Digital Money & Technology",
        videoUrl: "https://www.youtube.com/embed/5tA5qAm3mgI",
        videoTitle: "Digital Money and Payment Technology for Kids",
        article: {
          title: "Understanding Digital Money and Modern Payment Systems",
          content: `
            <h2>Digital Money and Technology: The Future of Finance</h2>
            <p>Today's world uses digital money more than ever before! From credit cards to mobile apps, understanding digital payment systems is essential for modern financial literacy. Let's explore how technology has changed the way we handle money.</p>
            
            <h3>What is Digital Money?</h3>
            <p>Digital money is money that exists electronically rather than as physical cash. Instead of carrying coins and bills, your money is stored as numbers in computer systems. This makes transactions faster, safer, and more convenient.</p>
            
            <h4>Types of Digital Money</h4>
            <ul>
              <li><strong>Bank Account Money</strong> - Money stored electronically in bank accounts</li>
              <li><strong>Credit Cards</strong> - Allow you to borrow money temporarily to make purchases</li>
              <li><strong>Debit Cards</strong> - Use money directly from your bank account</li>
              <li><strong>Mobile Payment Apps</strong> - Apps like Apple Pay, Google Pay, or Venmo</li>
              <li><strong>Online Banking</strong> - Managing money through websites and apps</li>
              <li><strong>Digital Wallets</strong> - Electronic versions of physical wallets</li>
            </ul>
            
            <h3>How Credit and Debit Cards Work</h3>
            <h4>Debit Cards</h4>
            <p>Debit cards are connected directly to your bank account. When you use a debit card:</p>
            <ul>
              <li>Money is taken immediately from your account</li>
              <li>You can only spend money you actually have</li>
              <li>It's like using electronic cash</li>
              <li>No interest charges because you're using your own money</li>
            </ul>
            
            <h4>Credit Cards</h4>
            <p>Credit cards let you borrow money temporarily:</p>
            <ul>
              <li>The credit card company pays for your purchase</li>
              <li>You must pay the company back later</li>
              <li>If you don't pay back quickly, you owe extra money called interest</li>
              <li>You have a spending limit called a credit limit</li>
              <li>Using credit cards responsibly helps build a good credit score</li>
            </ul>
            
            <h3>Mobile Payment Technology</h3>
            <p>Mobile payments use your smartphone to make purchases:</p>
            
            <h4>How Mobile Payments Work</h4>
            <ul>
              <li><strong>NFC Technology</strong> - Near Field Communication lets you tap your phone to pay</li>
              <li><strong>QR Codes</strong> - Scan a code with your camera to pay</li>
              <li><strong>App-to-App</strong> - Send money through apps like Venmo or Cash App</li>
              <li><strong>Biometric Security</strong> - Use fingerprints or face recognition for security</li>
            </ul>
            
            <h4>Popular Mobile Payment Apps</h4>
            <ul>
              <li><strong>Apple Pay</strong> - For iPhone users, secure and convenient</li>
              <li><strong>Google Pay</strong> - For Android users, widely accepted</li>
              <li><strong>Samsung Pay</strong> - Works with many different payment terminals</li>
              <li><strong>PayPal</strong> - One of the oldest and most trusted digital payment systems</li>
            </ul>
            
            <h3>Online Banking and Digital Accounts</h3>
            <p>Online banking lets you manage your money through websites and apps:</p>
            
            <h4>What You Can Do with Online Banking</h4>
            <ul>
              <li>Check your account balance anytime</li>
              <li>Transfer money between accounts</li>
              <li>Pay bills electronically</li>
              <li>Deposit checks by taking photos</li>
              <li>Set up automatic savings</li>
              <li>Track your spending with digital tools</li>
            </ul>
            
            <h3>Safety and Security in Digital Money</h3>
            <p>Digital money is generally very safe, but you need to follow important security rules:</p>
            
            <h4>Security Features</h4>
            <ul>
              <li><strong>Encryption</strong> - Scrambles your information so criminals can't read it</li>
              <li><strong>Two-Factor Authentication</strong> - Requires two forms of identification</li>
              <li><strong>Fraud Monitoring</strong> - Banks watch for suspicious activity</li>
              <li><strong>FDIC Insurance</strong> - Government protection for money in banks</li>
            </ul>
            
            <h4>Digital Safety Rules</h4>
            <ul>
              <li>Never share passwords or PINs with anyone</li>
              <li>Always log out of banking apps and websites</li>
              <li>Use strong, unique passwords for each account</li>
              <li>Never do banking on public Wi-Fi</li>
              <li>Check your accounts regularly for unauthorized transactions</li>
              <li>Report lost or stolen cards immediately</li>
            </ul>
            
            <h3>Advantages of Digital Money</h3>
            <ul>
              <li><strong>Convenience</strong> - No need to carry cash or count exact change</li>
              <li><strong>Speed</strong> - Transactions happen instantly</li>
              <li><strong>Record Keeping</strong> - Automatic tracking of all purchases</li>
              <li><strong>Security</strong> - Better than carrying large amounts of cash</li>
              <li><strong>Global Access</strong> - Use money anywhere in the world</li>
              <li><strong>Rewards</strong> - Many cards offer cash back or points</li>
            </ul>
            
            <h3>Disadvantages and Challenges</h3>
            <ul>
              <li><strong>Technical Problems</strong> - Apps and systems can crash or malfunction</li>
              <li><strong>Internet Dependency</strong> - Need internet connection for most digital payments</li>
              <li><strong>Privacy Concerns</strong> - Companies track your spending habits</li>
              <li><strong>Overspending Risk</strong> - Easier to spend when money doesn't feel "real"</li>
              <li><strong>Learning Curve</strong> - Requires understanding of technology</li>
            </ul>
            
            <h3>The Future of Digital Money</h3>
            <p>Digital money continues to evolve with exciting new technologies:</p>
            
            <h4>Emerging Technologies</h4>
            <ul>
              <li><strong>Cryptocurrency</strong> - Digital money secured by complex computer codes</li>
              <li><strong>Blockchain</strong> - A secure way to record and verify transactions</li>
              <li><strong>Central Bank Digital Currencies (CBDCs)</strong> - Government-issued digital money</li>
              <li><strong>AI-Powered Banking</strong> - Smart systems that help manage your money</li>
              <li><strong>Voice Payments</strong> - Using voice commands to make payments</li>
            </ul>
            
            <h3>Teaching Digital Financial Literacy</h3>
            <p>As digital money becomes more common, it's important to:</p>
            <ul>
              <li>Understand how each type of payment works</li>
              <li>Know the costs and benefits of different payment methods</li>
              <li>Practice good digital security habits</li>
              <li>Keep track of spending even when using digital payments</li>
              <li>Understand your rights and protections as a consumer</li>
            </ul>
          `
        },
        quiz: [
          {
            id: 1,
            question: "What is the main difference between a debit card and a credit card?",
            options: ["Debit cards are newer technology", "Debit uses your own money, credit borrows money", "Credit cards are safer", "There is no difference"],
            correct: "Debit uses your own money, credit borrows money",
            explanation: "Debit cards use money directly from your bank account, while credit cards let you borrow money that you must pay back later!"
          },
          {
            id: 2,
            question: "Which of these is a mobile payment app?",
            options: ["Apple Pay", "Piggy Bank", "Cash Register", "ATM"],
            correct: "Apple Pay",
            explanation: "Apple Pay is a popular mobile payment app that lets you pay using your smartphone or smartwatch!"
          },
          {
            id: 3,
            question: "What should you NEVER do with your banking passwords?",
            options: ["Write them down somewhere safe", "Share them with friends", "Use a mix of letters and numbers", "Change them regularly"],
            correct: "Share them with friends",
            explanation: "Never share your banking passwords with anyone! Keep them secret to protect your money and personal information."
          },
          {
            id: 4,
            question: "What does NFC stand for in mobile payments?",
            options: ["Never Forget Cash", "Near Field Communication", "New Financial Card", "Next Future Currency"],
            correct: "Near Field Communication",
            explanation: "NFC stands for Near Field Communication - it's the technology that lets you tap your phone to make payments!"
          },
          {
            id: 5,
            question: "What is one advantage of digital money over cash?",
            options: ["It's always free to use", "It automatically tracks your spending", "You never lose it", "It works without electricity"],
            correct: "It automatically tracks your spending",
            explanation: "Digital payments automatically create records of your spending, making it easier to track where your money goes!"
          },
          {
            id: 6,
            question: "What should you do if your phone with payment apps is stolen?",
            options: ["Wait and see if someone uses it", "Report it immediately to your bank", "Buy a new phone first", "Nothing, it's perfectly safe"],
            correct: "Report it immediately to your bank",
            explanation: "If your phone with payment apps is stolen, report it immediately to protect your accounts from unauthorized use!"
          },
          {
            id: 7,
            question: "What makes digital payments secure?",
            options: ["They use simple passwords", "They have encryption and fraud monitoring", "They're stored on your phone only", "Nothing makes them secure"],
            correct: "They have encryption and fraud monitoring",
            explanation: "Digital payments use encryption to scramble information and fraud monitoring to watch for suspicious activity!"
          },
          {
            id: 8,
            question: "Which is true about online banking?",
            options: ["It's only for adults", "You can check your balance anytime", "It requires going to the bank", "It's less secure than cash"],
            correct: "You can check your balance anytime",
            explanation: "Online banking lets you check your account balance and manage money 24/7 from anywhere with internet!"
          },
          {
            id: 9,
            question: "What is a potential problem with digital payments?",
            options: ["They're always slower than cash", "It can be easier to overspend", "They don't work anywhere", "They're illegal for kids"],
            correct: "It can be easier to overspend",
            explanation: "With digital payments, money can feel less 'real' which sometimes makes it easier to spend more than intended!"
          },
          {
            id: 10,
            question: "What is cryptocurrency?",
            options: ["Hidden cash", "Digital money secured by computer codes", "Fake money", "Money that disappears"],
            correct: "Digital money secured by computer codes",
            explanation: "Cryptocurrency is a type of digital money that uses complex computer codes (cryptography) to secure transactions!"
          }
        ],
        xpReward: 120
      }
    },
    5: {
      1: {
        title: "Banking Basics",
        videoUrl: "https://www.youtube.com/embed/F_3cfnD7qb0",
        videoTitle: "How Banks Work - Banking for Kids",
        article: {
          title: "Understanding Banks and How They Help Us",
          content: `
            <h2>Banking Basics: How Banks Work and Help Us Manage Money</h2>
            <p>Banks are special businesses that help people store, save, and use their money safely. Understanding how banks work is essential for managing your finances throughout life. Let's explore everything you need to know about banking!</p>
            
            <h3>What Are Banks?</h3>
            <p>Banks are financial institutions that provide various money-related services to individuals, families, and businesses. They act as safe places to store money and offer tools to help people manage their finances effectively.</p>
            
            <h4>Main Services Banks Provide</h4>
            <ul>
              <li><strong>Safe Storage</strong> - Keep your money secure in accounts</li>
              <li><strong>Lending</strong> - Loan money to people who need it</li>
              <li><strong>Payment Processing</strong> - Help transfer money between people</li>
              <li><strong>Financial Advice</strong> - Provide guidance on money management</li>
              <li><strong>Investment Services</strong> - Help people grow their money over time</li>
            </ul>
            
            <h3>Types of Bank Accounts</h3>
            
            <h4>Checking Accounts</h4>
            <p>Checking accounts are designed for everyday money management:</p>
            <ul>
              <li>Easy access to your money through ATMs and debit cards</li>
              <li>Ability to write checks to pay bills</li>
              <li>Online and mobile banking access</li>
              <li>Usually earn little or no interest</li>
              <li>Perfect for day-to-day expenses</li>
            </ul>
            
            <h4>Savings Accounts</h4>
            <p>Savings accounts are designed to help your money grow:</p>
            <ul>
              <li>Earn interest on the money you deposit</li>
              <li>Encourage saving by limiting withdrawals</li>
              <li>FDIC insured up to $250,000</li>
              <li>Higher interest rates than checking accounts</li>
              <li>Perfect for emergency funds and goals</li>
            </ul>
            
            <h4>Youth and Student Accounts</h4>
            <p>Special accounts designed for young people:</p>
            <ul>
              <li>Lower or no minimum balance requirements</li>
              <li>Educational resources about money management</li>
              <li>Parental oversight and controls</li>
              <li>Often no monthly fees</li>
              <li>Debit cards with spending limits</li>
            </ul>
            
            <h3>How Banks Make Money</h3>
            <p>Understanding how banks make money helps you understand their services:</p>
            
            <h4>Interest Spread</h4>
            <ul>
              <li>Banks pay you a small amount of interest on your deposits</li>
              <li>They lend that money to others at higher interest rates</li>
              <li>The difference between what they pay and charge is their profit</li>
            </ul>
            
            <h4>Fees and Services</h4>
            <ul>
              <li>Monthly account maintenance fees</li>
              <li>ATM fees for using other banks' machines</li>
              <li>Overdraft fees when you spend more than you have</li>
              <li>Wire transfer and check processing fees</li>
            </ul>
            
            <h3>Banking Safety and Protection</h3>
            
            <h4>FDIC Insurance</h4>
            <p>The Federal Deposit Insurance Corporation (FDIC) protects your money:</p>
            <ul>
              <li>Insures deposits up to $250,000 per account</li>
              <li>Covers you if the bank fails or closes</li>
              <li>Automatic protection - no need to apply</li>
              <li>Has been protecting deposits since 1933</li>
            </ul>
            
            <h4>Security Measures</h4>
            <ul>
              <li><strong>Encryption</strong> - Protects your information online</li>
              <li><strong>Multi-Factor Authentication</strong> - Extra login security</li>
              <li><strong>Fraud Monitoring</strong> - Watches for suspicious activity</li>
              <li><strong>Physical Security</strong> - Vaults, alarms, and cameras</li>
            </ul>
            
            <h3>Choosing the Right Bank</h3>
            
            <h4>Factors to Consider</h4>
            <ul>
              <li><strong>Location</strong> - Branches and ATMs near you</li>
              <li><strong>Fees</strong> - Monthly costs and transaction fees</li>
              <li><strong>Interest Rates</strong> - How much you earn on deposits</li>
              <li><strong>Technology</strong> - Quality of online and mobile banking</li>
              <li><strong>Customer Service</strong> - Helpfulness and availability</li>
              <li><strong>Account Requirements</strong> - Minimum balances and age limits</li>
            </ul>
            
            <h4>Types of Banks</h4>
            <ul>
              <li><strong>National Banks</strong> - Large banks with locations nationwide</li>
              <li><strong>Regional Banks</strong> - Smaller banks serving specific areas</li>
              <li><strong>Credit Unions</strong> - Member-owned financial cooperatives</li>
              <li><strong>Online Banks</strong> - Banks that operate primarily online</li>
              <li><strong>Community Banks</strong> - Small, locally-focused banks</li>
            </ul>
            
            <h3>Banking Technology and Innovation</h3>
            
            <h4>Online Banking Features</h4>
            <ul>
              <li>Check account balances and transaction history</li>
              <li>Transfer money between accounts</li>
              <li>Pay bills electronically</li>
              <li>Deposit checks by taking photos</li>
              <li>Set up automatic transfers and payments</li>
              <li>Receive account alerts and notifications</li>
            </ul>
            
            <h4>ATM Technology</h4>
            <ul>
              <li>24/7 access to cash and account information</li>
              <li>Deposit cash and checks</li>
              <li>Transfer money between accounts</li>
              <li>Check balances and print statements</li>
              <li>Some ATMs offer cardless transactions</li>
            </ul>
            
            <h3>Building a Relationship with Your Bank</h3>
            
            <h4>Benefits of a Good Banking Relationship</h4>
            <ul>
              <li>Better customer service and support</li>
              <li>Potential fee waivers for good customers</li>
              <li>Easier approval for loans in the future</li>
              <li>Access to financial education resources</li>
              <li>Personalized financial advice</li>
            </ul>
            
            <h4>How to Be a Good Bank Customer</h4>
            <ul>
              <li>Keep accurate records of your transactions</li>
              <li>Maintain minimum account balances</li>
              <li>Use your bank's ATMs to avoid fees</li>
              <li>Read and understand account terms</li>
              <li>Report problems or fraud immediately</li>
              <li>Ask questions when you don't understand something</li>
            </ul>
            
            <h3>Common Banking Mistakes to Avoid</h3>
            <ul>
              <li><strong>Not reading account terms</strong> - Understanding fees and requirements</li>
              <li><strong>Overdrafting accounts</strong> - Spending more money than you have</li>
              <li><strong>Ignoring statements</strong> - Not checking for errors or fraud</li>
              <li><strong>Using out-of-network ATMs</strong> - Paying unnecessary fees</li>
              <li><strong>Not building an emergency fund</strong> - Having money for unexpected expenses</li>
              <li><strong>Choosing based on location alone</strong> - Not comparing services and rates</li>
            </ul>
          `
        },
        quiz: [
          {
            id: 1,
            question: "What is the main purpose of a bank?",
            options: ["To make money disappear", "To help people store and manage money safely", "To give away free money", "To collect coins"],
            correct: "To help people store and manage money safely",
            explanation: "Banks are financial institutions that help people safely store, save, and manage their money while providing various financial services!"
          },
          {
            id: 2,
            question: "What is the difference between checking and savings accounts?",
            options: ["No difference", "Checking is for daily use, savings earns interest", "Savings is for daily use, checking earns interest", "Checking accounts are newer"],
            correct: "Checking is for daily use, savings earns interest",
            explanation: "Checking accounts are designed for everyday transactions, while savings accounts are designed to help your money grow by earning interest!"
          },
          {
            id: 3,
            question: "What does FDIC insurance protect?",
            options: ["Your house", "Your deposits up to $250,000", "Your car", "Your phone"],
            correct: "Your deposits up to $250,000",
            explanation: "FDIC insurance protects your bank deposits up to $250,000 per account, keeping your money safe even if the bank fails!"
          },
          {
            id: 4,
            question: "How do banks make money?",
            options: ["By stealing from customers", "By charging higher interest on loans than they pay on deposits", "By printing money", "By finding money on the street"],
            correct: "By charging higher interest on loans than they pay on deposits",
            explanation: "Banks make money by paying you a small amount of interest on deposits, then lending that money to others at higher interest rates!"
          },
          {
            id: 5,
            question: "What should you consider when choosing a bank?",
            options: ["Only the closest location", "Fees, interest rates, services, and convenience", "Only the biggest bank", "The bank with the most commercials"],
            correct: "Fees, interest rates, services, and convenience",
            explanation: "When choosing a bank, consider multiple factors like fees, interest rates, services offered, location, and technology to find the best fit!"
          },
          {
            id: 6,
            question: "What can you do with online banking?",
            options: ["Only check your balance", "Check balances, transfer money, pay bills, and deposit checks", "Only withdraw money", "Nothing useful"],
            correct: "Check balances, transfer money, pay bills, and deposit checks",
            explanation: "Online banking offers many convenient features including checking balances, transferring money, paying bills, and even depositing checks by photo!"
          },
          {
            id: 7,
            question: "What is an overdraft fee?",
            options: ["A reward for saving money", "A charge when you spend more than you have in your account", "Free money from the bank", "Interest earned on savings"],
            correct: "A charge when you spend more than you have in your account",
            explanation: "An overdraft fee is charged when you spend more money than you have in your account - it's important to track your spending to avoid these fees!"
          },
          {
            id: 8,
            question: "What type of account is best for emergency savings?",
            options: ["Checking account", "Savings account", "Neither", "Both are the same"],
            correct: "Savings account",
            explanation: "Savings accounts are better for emergency funds because they earn interest, encourage saving, and are designed for money you don't need immediately!"
          },
          {
            id: 9,
            question: "What is a credit union?",
            options: ["A type of store", "A member-owned financial cooperative", "A government agency", "A type of loan"],
            correct: "A member-owned financial cooperative",
            explanation: "Credit unions are member-owned financial cooperatives that often offer better rates and lower fees than traditional banks!"
          },
          {
            id: 10,
            question: "Why is it important to read your bank statements?",
            options: ["They're fun to read", "To check for errors and track spending", "Banks require it", "It's not important"],
            correct: "To check for errors and track spending",
            explanation: "Reading bank statements helps you catch errors, detect fraud, and track your spending patterns to manage your money better!"
          }
        ],
        xpReward: 130
      },
      2: {
        title: "Credit and Loans", 
        videoUrl: "https://www.youtube.com/embed/q8u0ECTlGlE",
        videoTitle: "Understanding Credit and Loans for Young People",
        article: {
          title: "Credit, Loans, and Building Financial Responsibility",
          content: `
            <h2>Understanding Credit and Loans: Building Your Financial Future</h2>
            <p>Credit and loans are important financial tools that can help you achieve goals and handle emergencies, but they must be used responsibly. Understanding how credit works is crucial for your financial success as you grow older.</p>
            
            <h3>What is Credit?</h3>
            <p>Credit is the ability to borrow money with the promise to pay it back later. When someone gives you credit, they trust that you will repay the borrowed money, usually with additional fees called interest.</p>
            
            <h4>How Credit Works</h4>
            <ul>
              <li><strong>Borrowing</strong> - You receive money or goods now</li>
              <li><strong>Promise</strong> - You promise to pay back later</li>
              <li><strong>Interest</strong> - You pay extra for the privilege of borrowing</li>
              <li><strong>Terms</strong> - Specific rules about when and how to repay</li>
            </ul>
            
            <h3>Types of Credit and Loans</h3>
            
            <h4>Credit Cards</h4>
            <p>Credit cards allow you to borrow money up to a certain limit:</p>
            <ul>
              <li><strong>Credit Limit</strong> - Maximum amount you can borrow</li>
              <li><strong>Minimum Payment</strong> - Smallest amount you must pay each month</li>
              <li><strong>Interest Rate (APR)</strong> - Cost of borrowing, expressed as yearly percentage</li>
              <li><strong>Grace Period</strong> - Time to pay without interest charges</li>
            </ul>
            
            <h4>Personal Loans</h4>
            <p>Personal loans provide a lump sum of money that you repay over time:</p>
            <ul>
              <li>Fixed amount borrowed</li>
              <li>Set repayment schedule</li>
              <li>Fixed or variable interest rates</li>
              <li>Used for specific purposes like education or large purchases</li>
            </ul>
            
            <h4>Auto Loans</h4>
            <p>Loans specifically for buying vehicles:</p>
            <ul>
              <li>The car serves as collateral for the loan</li>
              <li>Lower interest rates than unsecured loans</li>
              <li>Typical loan terms of 3-7 years</li>
              <li>Monthly payments include principal and interest</li>
            </ul>
            
            <h4>Student Loans</h4>
            <p>Loans to help pay for education expenses:</p>
            <ul>
              <li>Federal and private student loan options</li>
              <li>Often have lower interest rates</li>
              <li>May have deferment options while in school</li>
              <li>Important investment in your future earning potential</li>
            </ul>
            
            <h3>Credit Scores and Credit Reports</h3>
            
            <h4>What is a Credit Score?</h4>
            <p>A credit score is a number (usually 300-850) that represents your creditworthiness:</p>
            <ul>
              <li><strong>Excellent Credit</strong> - 750-850: Best rates and terms</li>
              <li><strong>Good Credit</strong> - 700-749: Good rates and terms</li>
              <li><strong>Fair Credit</strong> - 650-699: Average rates and terms</li>
              <li><strong>Poor Credit</strong> - 300-649: Higher rates, limited options</li>
            </ul>
            
            <h4>Factors That Affect Your Credit Score</h4>
            <ul>
              <li><strong>Payment History (35%)</strong> - Whether you pay bills on time</li>
              <li><strong>Credit Utilization (30%)</strong> - How much credit you use vs. available</li>
              <li><strong>Length of Credit History (15%)</strong> - How long you've had credit</li>
              <li><strong>Types of Credit (10%)</strong> - Mix of credit cards, loans, etc.</li>
              <li><strong>New Credit (10%)</strong> - Recent credit applications and accounts</li>
            </ul>
            
            <h3>Building Good Credit</h3>
            
            <h4>Strategies for Young People</h4>
            <ul>
              <li><strong>Become an Authorized User</strong> - Parents can add you to their credit card</li>
              <li><strong>Get a Student Credit Card</strong> - Designed for people with limited credit history</li>
              <li><strong>Start with a Secured Credit Card</strong> - Requires a deposit but helps build credit</li>
              <li><strong>Pay All Bills on Time</strong> - Even non-credit bills can affect your credit</li>
              <li><strong>Keep Balances Low</strong> - Use less than 30% of available credit</li>
            </ul>
            
            <h4>Good Credit Habits</h4>
            <ul>
              <li>Always pay at least the minimum payment on time</li>
              <li>Pay off credit card balances in full when possible</li>
              <li>Don't apply for too many credit accounts at once</li>
              <li>Monitor your credit report regularly for errors</li>
              <li>Keep old accounts open to maintain credit history length</li>
            </ul>
            
            <h3>The Dangers of Credit Misuse</h3>
            
            <h4>Common Credit Mistakes</h4>
            <ul>
              <li><strong>Making Only Minimum Payments</strong> - Leads to long-term debt and high interest costs</li>
              <li><strong>Maxing Out Credit Cards</strong> - Hurts credit score and creates financial stress</li>
              <li><strong>Late Payments</strong> - Damages credit score and incurs fees</li>
              <li><strong>Applying for Too Much Credit</strong> - Can lower credit score</li>
              <li><strong>Using Credit for Daily Expenses</strong> - Can lead to overspending and debt</li>
            </ul>
            
            <h4>Warning Signs of Credit Problems</h4>
            <ul>
              <li>Only making minimum payments on credit cards</li>
              <li>Using credit cards for basic necessities</li>
              <li>Borrowing money to pay other debts</li>
              <li>Being denied for new credit</li>
              <li>Credit card balances that never decrease</li>
              <li>Feeling stressed about money constantly</li>
            </ul>
            
            <h3>Interest and Fees</h3>
            
            <h4>Understanding Interest</h4>
            <p>Interest is the cost of borrowing money:</p>
            <ul>
              <li><strong>APR (Annual Percentage Rate)</strong> - The yearly cost of credit</li>
              <li><strong>Compound Interest</strong> - Interest charged on both principal and previously charged interest</li>
              <li><strong>Grace Period</strong> - Time to pay without interest (credit cards)</li>
              <li><strong>Variable vs. Fixed Rates</strong> - Rates that change vs. stay the same</li>
            </ul>
            
            <h4>Common Fees</h4>
            <ul>
              <li><strong>Annual Fees</strong> - Yearly cost for having a credit card</li>
              <li><strong>Late Payment Fees</strong> - Charges for missing payment deadlines</li>
              <li><strong>Over-Limit Fees</strong> - Charges for exceeding credit limit</li>
              <li><strong>Cash Advance Fees</strong> - Extra charges for borrowing cash</li>
              <li><strong>Balance Transfer Fees</strong> - Costs for moving debt between cards</li>
            </ul>
            
            <h3>Making Smart Credit Decisions</h3>
            
            <h4>Before Applying for Credit</h4>
            <ul>
              <li>Understand your income and expenses</li>
              <li>Research different credit options</li>
              <li>Compare interest rates and fees</li>
              <li>Read all terms and conditions</li>
              <li>Make sure you can afford the payments</li>
            </ul>
            
            <h4>Using Credit Responsibly</h4>
            <ul>
              <li>Only borrow what you can afford to repay</li>
              <li>Pay off balances quickly to minimize interest</li>
              <li>Use credit for planned purchases, not impulse buys</li>
              <li>Keep track of all credit accounts and balances</li>
              <li>Contact lenders if you're having trouble making payments</li>
            </ul>
            
            <h3>Credit and Your Future</h3>
            
            <h4>How Good Credit Helps</h4>
            <ul>
              <li><strong>Lower Interest Rates</strong> - Save money on loans and credit cards</li>
              <li><strong>Better Housing Options</strong> - Easier to rent apartments or buy homes</li>
              <li><strong>Employment Opportunities</strong> - Some employers check credit for certain jobs</li>
              <li><strong>Insurance Rates</strong> - Better credit can mean lower insurance premiums</li>
              <li><strong>Financial Flexibility</strong> - Access to credit when needed</li>
            </ul>
            
            <h4>Planning for the Future</h4>
            <ul>
              <li>Start building credit early but responsibly</li>
              <li>Understand that credit decisions have long-term consequences</li>
              <li>Learn to distinguish between needs and wants when using credit</li>
              <li>Develop a budget that includes debt repayment</li>
              <li>View credit as a tool, not free money</li>
            </ul>
          `
        },
        quiz: [
          {
            id: 1,
            question: "What is credit?",
            options: ["Free money", "The ability to borrow money with a promise to pay it back", "Money you find", "A type of bank account"],
            correct: "The ability to borrow money with a promise to pay it back",
            explanation: "Credit is the ability to borrow money now with the promise and responsibility to pay it back later, usually with interest!"
          },
          {
            id: 2,
            question: "What is a credit score?",
            options: ["How much money you have", "A number that shows how trustworthy you are with credit", "Your age", "How many credit cards you have"],
            correct: "A number that shows how trustworthy you are with credit",
            explanation: "A credit score is a number (usually 300-850) that shows lenders how likely you are to repay borrowed money based on your credit history!"
          },
          {
            id: 3,
            question: "What is the most important factor in your credit score?",
            options: ["How much money you make", "Payment history - paying bills on time", "How old you are", "What kind of car you drive"],
            correct: "Payment history - paying bills on time",
            explanation: "Payment history makes up 35% of your credit score - consistently paying bills on time is the most important factor for good credit!"
          },
          {
            id: 4,
            question: "What does APR stand for?",
            options: ["Annual Payment Rate", "Annual Percentage Rate", "Always Pay Responsibly", "Average Price Range"],
            correct: "Annual Percentage Rate",
            explanation: "APR stands for Annual Percentage Rate - it tells you the yearly cost of borrowing money, including interest and fees!"
          },
          {
            id: 5,
            question: "What is a good way for young people to start building credit?",
            options: ["Get as many credit cards as possible", "Become an authorized user on a parent's card", "Never use any credit", "Only use cash forever"],
            correct: "Become an authorized user on a parent's card",
            explanation: "Becoming an authorized user on a parent's card with good credit habits can help young people start building their own credit history!"
          },
          {
            id: 6,
            question: "What is credit utilization?",
            options: ["How long you've had credit", "How much of your available credit you're using", "How many credit cards you have", "How often you use credit"],
            correct: "How much of your available credit you're using",
            explanation: "Credit utilization is the percentage of your available credit that you're currently using - keeping it below 30% helps your credit score!"
          },
          {
            id: 7,
            question: "What should you do if you can't make a credit card payment on time?",
            options: ["Ignore it and hope it goes away", "Contact the credit card company to discuss options", "Apply for another credit card", "Stop using all credit forever"],
            correct: "Contact the credit card company to discuss options",
            explanation: "If you can't make a payment, contact your credit card company immediately - they may offer payment plans or other options to help!"
          },
          {
            id: 8,
            question: "What is compound interest?",
            options: ["Interest that never changes", "Interest charged on both the original amount and previous interest", "Interest that only applies to savings", "Free interest"],
            correct: "Interest charged on both the original amount and previous interest",
            explanation: "Compound interest means you pay interest on your original debt PLUS interest on any previously unpaid interest - it can make debt grow quickly!"
          },
          {
            id: 9,
            question: "Which credit score range is considered 'good'?",
            options: ["300-500", "500-650", "700-749", "850-900"],
            correct: "700-749",
            explanation: "A credit score of 700-749 is considered 'good' and will qualify you for good interest rates and terms on most loans and credit cards!"
          },
          {
            id: 10,
            question: "Why is having good credit important for your future?",
            options: ["It makes you popular", "It helps you get better rates on loans and more opportunities", "It guarantees you'll be rich", "It doesn't matter"],
            correct: "It helps you get better rates on loans and more opportunities",
            explanation: "Good credit helps you get lower interest rates on loans, better housing options, and can even affect job opportunities in some fields!"
          }
        ],
        xpReward: 140
      }
    },
    6: {
      1: {
        title: "Advanced Budgeting",
        videoUrl: "https://www.youtube.com/embed/sVKQn2I4HDM",
        videoTitle: "Advanced Budgeting Strategies and Financial Planning",
        article: {
          title: "Mastering Advanced Budgeting Techniques",
          content: `
            <h2>Advanced Budgeting: Taking Control of Your Financial Future</h2>
            <p>As your financial knowledge grows, it's time to learn more sophisticated budgeting techniques that successful adults use to manage their money effectively. These advanced strategies will help you make the most of every dollar and achieve your financial goals faster.</p>
            
            <h3>Beyond Basic Budgeting</h3>
            <p>While basic budgeting focuses on needs, wants, and savings, advanced budgeting involves detailed planning, forecasting, and optimization of your money management strategies.</p>
            
            <h4>The Zero-Based Budget</h4>
            <p>In zero-based budgeting, every dollar gets assigned a specific purpose:</p>
            <ul>
              <li><strong>Income minus expenses equals zero</strong> - Every dollar is allocated</li>
              <li><strong>No money left unassigned</strong> - Prevents wasteful spending</li>
              <li><strong>Intentional allocation</strong> - Every dollar has a job</li>
              <li><strong>Regular review</strong> - Adjust categories as needed</li>
            </ul>
            
            <h4>The Envelope Method (Digital Version)</h4>
            <p>Allocate specific amounts for different spending categories:</p>
            <ul>
              <li>Set spending limits for each category</li>
              <li>Use apps or separate accounts to track limits</li>
              <li>Stop spending when category limit is reached</li>
              <li>Helps prevent overspending in any area</li>
            </ul>
            
            <h3>Advanced Savings Strategies</h3>
            
            <h4>The 50/30/20 Rule Variations</h4>
            <p>Modify the basic rule based on your goals:</p>
            <ul>
              <li><strong>Aggressive Savings (50/20/30)</strong> - 30% to savings for faster goal achievement</li>
              <li><strong>Debt Payoff (50/20/30)</strong> - 30% to debt elimination</li>
              <li><strong>Balanced Growth (40/30/30)</strong> - Equal focus on needs, wants, and savings</li>
            </ul>
            
            <h4>Multiple Savings Goals</h4>
            <p>Organize savings into specific categories:</p>
            <ul>
              <li><strong>Emergency Fund</strong> - 3-6 months of expenses</li>
              <li><strong>Short-term Goals</strong> - Things you want within a year</li>
              <li><strong>Medium-term Goals</strong> - Goals for 1-5 years</li>
              <li><strong>Long-term Goals</strong> - College, car, house down payment</li>
            </ul>
            
            <h3>Income Optimization</h3>
            
            <h4>Maximizing Current Income</h4>
            <ul>
              <li><strong>Track all income sources</strong> - Allowance, gifts, jobs, side hustles</li>
              <li><strong>Negotiate increases</strong> - Ask for allowance raises based on increased responsibilities</li>
              <li><strong>Earn through skills</strong> - Tutoring, pet sitting, yard work</li>
              <li><strong>Sell unused items</strong> - Convert clutter to cash</li>
            </ul>
            
            <h4>Creating Multiple Income Streams</h4>
            <ul>
              <li>Regular allowance or part-time job</li>
              <li>Seasonal work (lawn care, snow removal)</li>
              <li>Creative work (art, crafts, writing)</li>
              <li>Digital services (social media help, basic tech support)</li>
            </ul>
            
            <h3>Expense Optimization</h3>
            
            <h4>Fixed vs. Variable Expenses</h4>
            <p><strong>Fixed Expenses</strong> - Same amount each month:</p>
            <ul>
              <li>Phone bills, subscriptions, insurance</li>
              <li>Harder to change but worth reviewing annually</li>
              <li>Look for better deals or alternatives</li>
            </ul>
            
            <p><strong>Variable Expenses</strong> - Change each month:</p>
            <ul>
              <li>Food, entertainment, clothing, gas</li>
              <li>Easier to adjust for savings</li>
              <li>Great opportunities for optimization</li>
            </ul>
            
            <h4>Smart Spending Strategies</h4>
            <ul>
              <li><strong>Price Comparison</strong> - Always check multiple sources</li>
              <li><strong>Timing Purchases</strong> - Buy during sales and off-seasons</li>
              <li><strong>Quality vs. Price</strong> - Sometimes paying more saves money long-term</li>             
              <li><strong>Bulk Buying</strong> - Purchase frequently used items in larger quantities</li>
              <li><strong>Generic Brands</strong> - Often 20-40% cheaper than name brands</li>
            </ul>
            
            <h3>Financial Tracking and Analysis</h3>
            
            <h4>Advanced Tracking Methods</h4>
            <ul>
              <li><strong>Spreadsheet Budgets</strong> - Customizable and detailed tracking</li>
              <li><strong>Budgeting Apps</strong> - Automated categorization and alerts</li>
              <li><strong>Receipt Scanning</strong> - Digital record keeping</li>
              <li><strong>Bank Account Integration</strong> - Automatic transaction import</li>
            </ul>
            
            <h4>Key Metrics to Track</h4>
            <ul>
              <li><strong>Savings Rate</strong> - Percentage of income saved each month</li>
              <li><strong>Expense Ratios</strong> - How much goes to each category</li>
              <li><strong>Goal Progress</strong> - How close you are to financial targets</li>
              <li><strong>Income Growth</strong> - How your earning power changes over time</li>
            </ul>
            
            <h3>Goal-Based Budgeting</h3>
            
            <h4>SMART Financial Goals</h4>
            <p>Make goals Specific, Measurable, Achievable, Relevant, and Time-bound:</p>
            <ul>
              <li><strong>Specific</strong> - "Save for a laptop" not "save money"</li>
              <li><strong>Measurable</strong> - "$800 for the laptop"</li>
              <li><strong>Achievable</strong> - Realistic based on your income</li>
              <li><strong>Relevant</strong> - Important to your life and values</li>
              <li><strong>Time-bound</strong> - "By next December"</li>
            </ul>
            
            <h4>Backward Planning</h4>
            <p>Start with your goal and work backward:</p>
            <ul>
              <li>Goal: $1,200 for a computer in 12 months</li>
              <li>Monthly savings needed: $100</li>
              <li>Weekly savings needed: $25</li>
              <li>Daily savings needed: $3.33</li>
            </ul>
            
            <h3>Emergency Planning</h3>
            
            <h4>Building an Emergency Fund</h4>
            <ul>
              <li><strong>Start Small</strong> - Even $25 is better than nothing</li>
              <li><strong>Automate Savings</strong> - Set up automatic transfers</li>
              <li><strong>Separate Account</strong> - Keep emergency money separate</li>
              <li><strong>Easy Access</strong> - But not too easy to avoid temptation</li>
            </ul>
            
            <h4>What Counts as an Emergency</h4>
            <ul>
              <li>Unexpected medical expenses</li>
              <li>Essential item replacement (broken phone, etc.)</li>
              <li>Transportation emergencies</li>
              <li>NOT: sales, wants, or non-urgent repairs</li>
            </ul>
            
            <h3>Advanced Money Psychology</h3>
            
            <h4>Understanding Your Money Mindset</h4>
            <ul>
              <li><strong>Scarcity vs. Abundance</strong> - How you view money availability</li>
              <li><strong>Risk Tolerance</strong> - Comfort with uncertainty</li>
              <li><strong>Time Preference</strong> - Present vs. future focus</li>
              <li><strong>Values Alignment</strong> - Spending that matches your priorities</li>
            </ul>
            
            <h4>Behavioral Budgeting Tricks</h4>
            <ul>
              <li><strong>Pay Yourself First</strong> - Save before spending</li>
              <li><strong>Automate Good Habits</strong> - Reduce decision fatigue</li>
              <li><strong>Visual Progress Tracking</strong> - Charts and graphs for motivation</li>
              <li><strong>Reward Systems</strong> - Celebrate milestones appropriately</li>
            </ul>
            
            <h3>Planning for Major Life Events</h3>
            
            <h4>College Planning</h4>
            <ul>
              <li>Estimate total costs including living expenses</li>
              <li>Research financial aid and scholarship opportunities</li>
              <li>Consider community college for first two years</li>
              <li>Plan for textbooks, supplies, and equipment</li>
            </ul>
            
            <h4>First Car Planning</h4>
            <ul>
              <li>Total cost includes insurance, maintenance, and gas</li>
              <li>Consider reliable used cars over new ones</li>
              <li>Budget for emergency repairs</li>
              <li>Factor in registration and inspection costs</li>
            </ul>
            
            <h3>Review and Adjustment Strategies</h3>
            
            <h4>Regular Budget Reviews</h4>
            <ul>
              <li><strong>Weekly</strong> - Check spending against budget</li>
              <li><strong>Monthly</strong> - Analyze patterns and adjust categories</li>
              <li><strong>Quarterly</strong> - Review goals and major spending</li>
              <li><strong>Annually</strong> - Complete budget overhaul and goal setting</li>
            </ul>
            
            <h4>When to Adjust Your Budget</h4>
            <ul>
              <li>Income changes (new job, raise, less allowance)</li>
              <li>Major life changes (moving, new school)</li>
              <li>Goal achievement or changes</li>
              <li>Consistent overspending in categories</li>
              <li>Emergency situations</li>
            </ul>
          `
        },
        quiz: [
          {
            id: 1,
            question: "What is zero-based budgeting?",
            options: ["Having zero money", "Every dollar gets assigned a specific purpose", "Never spending money", "Budgeting with no goals"],
            correct: "Every dollar gets assigned a specific purpose",
            explanation: "In zero-based budgeting, you assign every dollar of income to specific categories so income minus expenses equals zero - no money is left unassigned!"
          },
          {
            id: 2,
            question: "What is an appropriate emergency fund goal?",
            options: ["$10 total", "3-6 months of expenses", "All your money", "One week of expenses"],
            correct: "3-6 months of expenses",
            explanation: "A good emergency fund should cover 3-6 months of your regular expenses to help you handle unexpected situations without going into debt!"
          },
          {
            id: 3,
            question: "In aggressive savings mode, how might you modify the 50/30/20 rule?",
            options: ["50/20/30 - more to savings", "60/30/10 - less to savings", "100/0/0 - only needs", "33/33/34 - equal amounts"],
            correct: "50/20/30 - more to savings",
            explanation: "Aggressive savings might use 50/20/30, putting 30% toward savings goals while reducing wants to 20% to achieve financial goals faster!"
          },
          {
            id: 4,
            question: "What makes a goal 'SMART'?",
            options: ["It's about money", "Specific, Measurable, Achievable, Relevant, Time-bound", "It's easy to achieve", "It's expensive"],
            correct: "Specific, Measurable, Achievable, Relevant, Time-bound",
            explanation: "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound - this framework helps you create clear, actionable financial goals!"
          },
          {
            id: 5,
            question: "What is 'backward planning' for financial goals?",
            options: ["Planning to go backward", "Starting with your goal and calculating what you need to save", "Making bad financial decisions", "Planning without thinking"],
            correct: "Starting with your goal and calculating what you need to save",
            explanation: "Backward planning means starting with your end goal and working backward to determine how much you need to save daily, weekly, or monthly to reach it!"
          },
          {
            id: 6,
            question: "Which expense type is easier to adjust for savings?",
            options: ["Fixed expenses", "Variable expenses", "Both are the same", "Neither can be adjusted"],
            correct: "Variable expenses",
            explanation: "Variable expenses like food, entertainment, and clothing change each month and are generally easier to adjust than fixed expenses like subscriptions!"
          },
          {
            id: 7,
            question: "What is NOT typically considered a true emergency?",
            options: ["Broken phone you need for safety", "Unexpected medical expense", "A great sale on something you want", "Car repair for transportation to work"],
            correct: "A great sale on something you want",
            explanation: "Sales on wants are not emergencies! True emergencies are unexpected expenses for things you actually need for health, safety, or essential activities!"
          },
          {
            id: 8,
            question: "How often should you do a complete budget review?",
            options: ["Never", "Daily", "Monthly", "Annually"],
            correct: "Annually",
            explanation: "While you should check your budget weekly and analyze it monthly, a complete budget overhaul and major goal setting should happen annually!"
          },
          {
            id: 9,
            question: "What does 'pay yourself first' mean?",
            options: ["Give yourself an allowance", "Save money before spending on other things", "Always buy what you want first", "Pay your own bills"],
            correct: "Save money before spending on other things",
            explanation: "'Pay yourself first' means setting aside money for savings and goals before spending on other things - it prioritizes your financial future!"
          },
          {
            id: 10,
            question: "Why is it important to have multiple savings goals?",
            options: ["It's more complicated", "Different goals have different timeframes and priorities", "Banks require it", "It's not important"],
            correct: "Different goals have different timeframes and priorities",
            explanation: "Multiple savings goals help you organize your money for different purposes - emergency funds, short-term wants, and long-term goals like college all need different strategies!"
          }
        ],
        xpReward: 150
      }
    }
  };

  const currentLesson = lessonContent[grade as keyof typeof lessonContent]?.[module as keyof (typeof lessonContent)[3]] || lessonContent[3][1];

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
    // Scroll to top of the quiz section
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        
        // Also update localStorage for consistency with other pages
        if (progressUpdate.quiz_completed && progressUpdate.quiz_score >= 70) {
          updateLocalStorageProgress(grade, module, progressUpdate.xp_earned || 0);
          
          // Save module completion to game_progress table when quiz is completed with passing score
          const { error: gameProgressError } = await supabase
            .from('game_progress')
            .upsert({
              user_id: userId,
              module_id: module,
              grade_level: grade,
              completed: true,
              score: progressUpdate.quiz_score,
              completed_at: progressUpdate.completed_at
            });

          if (gameProgressError) {
            console.error('Error saving game progress:', gameProgressError);
          }
        }
      }
    }
  };

  const updateLocalStorageProgress = (grade: number, module: number, xpEarned: number) => {
    const savedProgress = localStorage.getItem('financialEducationProgress');
    let progress = savedProgress ? JSON.parse(savedProgress) : {};
    
    if (!progress[grade]) {
      progress[grade] = { completedModules: [], totalXP: 0 };
    }
    
    if (!progress[grade].completedModules.includes(module)) {
      progress[grade].completedModules.push(module);
      progress[grade].totalXP += xpEarned;
    }
    
    localStorage.setItem('financialEducationProgress', JSON.stringify(progress));
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

  const nextModule = async () => {
    if (!user) return;
    
    // Save module completion to game_progress table
    const { error: gameProgressError } = await supabase
      .from('game_progress')
      .upsert({
        user_id: user.id,
        module_id: module,
        grade_level: grade,
        completed: true,
        score: score,
        completed_at: new Date().toISOString()
      });

    if (gameProgressError) {
      console.error('Error saving game progress:', gameProgressError);
    } else {
      // Update localStorage for consistency
      updateLocalStorageProgress(grade, module, xpEarned || 0);
      toast.success(`Module ${module} completed! Moving to Module ${module + 1}`);
    }
    
    // Scroll to top and navigate to next module's video section
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                        className="prose prose-lg max-w-none [&>*]:text-white [&_p]:text-white [&_li]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_strong]:text-white [&_ul]:text-white [&_ol]:text-white text-white"
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
                            <div key={question.id} className="space-y-3 p-4 bg-card rounded-lg border">
                              <h3 className="font-semibold text-lg text-foreground">
                                Question {index + 1}: {question.question}
                              </h3>
                              <div className="space-y-2">
                                {question.options.map((option, optionIndex) => (
                                  <label 
                                    key={optionIndex}
                                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
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
                                  <span className="font-semibold text-foreground">{index + 1}. {question.question}</span>
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
                  <div className={`flex items-center gap-2 p-2 rounded-lg border ${videoCompleted ? 'bg-green-500/10 border-green-500/20' : 'bg-primary/10 border-primary/20'}`}>
                    <Play className={`h-4 w-4 ${videoCompleted ? 'text-green-500' : 'text-primary'}`} />
                    <span className="text-sm flex-1 text-foreground">Watch Video</span>
                    {videoCompleted ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-muted-foreground rounded-full" />
                    )}
                  </div>
                  <div className={`flex items-center gap-2 p-2 rounded-lg border ${articleCompleted ? 'bg-green-500/10 border-green-500/20' : 'bg-primary/10 border-primary/20'}`}>
                    <FileText className={`h-4 w-4 ${articleCompleted ? 'text-green-500' : 'text-primary'}`} />
                    <span className="text-sm flex-1 text-foreground">Read Article</span>
                    {articleCompleted ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-muted-foreground rounded-full" />
                    )}
                  </div>
                  <div className={`flex items-center gap-2 p-2 rounded-lg border ${quizSubmitted ? 'bg-green-500/10 border-green-500/20' : 'bg-primary/10 border-primary/20'}`}>
                    <HelpCircle className={`h-4 w-4 ${quizSubmitted ? 'text-green-500' : 'text-primary'}`} />
                    <span className="text-sm flex-1 text-foreground">Complete Quiz (10 questions)</span>
                    {quizSubmitted ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-muted-foreground rounded-full" />
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