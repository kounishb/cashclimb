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

  // Comprehensive educational content for all grades and modules
  const lessonContent = {
    3: {
      1: {
        title: "What is Money?",
        videoUrl: "https://www.youtube.com/embed/mPBgz8ejWoU",
        videoTitle: "What is Money? - Financial Literacy for Kids",
        article: {
          title: "Understanding Money: The Complete Guide for Young Learners",
          content: `
            <h2>What is Money?</h2>
            <p>Money is a special tool that helps people trade and buy things they need and want. Before money existed, people had to trade items directly with each other. Imagine trying to trade your bicycle for groceries - it would be very difficult!</p>
            
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
        videoUrl: "https://www.youtube.com/embed/hT5U0llU5is",
        videoTitle: "How Kids Can Earn Money - Jobs and Chores",
        article: {
          title: "How People Earn Money: Jobs, Chores, and Hard Work",
          content: `
            <h2>How People Earn Money</h2>
            <p>Money doesn't just appear - people work to earn it! Understanding how earning money works is one of the most important lessons you can learn.</p>
            
            <h3>What is Work?</h3>
            <p>Work is when people use their time, skills, and effort to do something valuable for others. In return, they get paid money!</p>
            
            <h3>Different Types of Jobs</h3>
            <ul>
              <li><strong>Service Jobs</strong> - Helping people (teachers, doctors, police officers)</li>
              <li><strong>Making Things</strong> - Creating products people need (builders, bakers, toy makers)</li>
              <li><strong>Selling Things</strong> - Helping people buy what they need (store clerks, salespeople)</li>
              <li><strong>Information Jobs</strong> - Working with ideas and computers (writers, programmers)</li>
            </ul>
            
            <h3>How Kids Can Earn Money</h3>
            <p>Even kids can start earning money through age-appropriate work:</p>
            <ul>
              <li><strong>Household Chores</strong> - Cleaning, organizing, helping with yard work</li>
              <li><strong>Helping Neighbors</strong> - Walking dogs, collecting mail, simple yard tasks</li>
              <li><strong>Creative Work</strong> - Making and selling crafts, artwork, or baked goods</li>
              <li><strong>Academic Help</strong> - Tutoring younger kids in subjects you're good at</li>
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
        videoUrl: "https://www.youtube.com/embed/JZWsE2gpcjk",
        videoTitle: "Needs vs Wants - Smart Money Decisions for Kids",
        article: {
          title: "Making Smart Choices: Understanding Needs vs Wants",
          content: `
            <h2>Needs vs Wants: Making Smart Money Decisions</h2>
            <p>One of the most important money skills is learning the difference between things you need and things you want. This helps you make smart spending decisions!</p>
            
            <h3>What Are Needs?</h3>
            <p>Needs are things you must have to live, be healthy, and be safe:</p>
            <ul>
              <li><strong>Food</strong> - Healthy meals to keep your body strong</li>
              <li><strong>Shelter</strong> - A safe place to live like a house or apartment</li>
              <li><strong>Clothing</strong> - Clothes to keep you warm and protected</li>
              <li><strong>Healthcare</strong> - Medicine and doctor visits when you're sick</li>
              <li><strong>Education</strong> - School supplies and learning materials</li>
            </ul>
            
            <h3>What Are Wants?</h3>
            <p>Wants are things that would be nice to have but you can live without:</p>
            <ul>
              <li><strong>Toys and Games</strong> - Fun things to play with</li>
              <li><strong>Brand Name Items</strong> - Expensive clothes with logos</li>
              <li><strong>Entertainment</strong> - Movies, concerts, and amusement parks</li>
              <li><strong>Candy and Treats</strong> - Sweet snacks and special foods</li>
              <li><strong>Latest Technology</strong> - The newest phone or video game</li>
            </ul>
            
            <h3>The Smart Money Strategy</h3>
            <p>Here's how to make good choices:</p>
            <ol>
              <li><strong>Take care of needs first</strong> - Always make sure you have what you need to be healthy and safe</li>
              <li><strong>Save some money</strong> - Put some aside for future needs and goals</li>
              <li><strong>Then consider wants</strong> - Use leftover money for things you'd like to have</li>
              <li><strong>Wait and think</strong> - Don't buy wants immediately; think about it for a day or week</li>
            </ol>
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
      }
    },
    4: {
      1: {
        title: "Money Review",
        videoUrl: "https://www.youtube.com/embed/dFEhmAPE_2I",
        videoTitle: "Money Fundamentals Review - Building Strong Foundations",
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
        videoUrl: "https://www.youtube.com/embed/ntNdxffaOxQ",
        videoTitle: "Budgeting for Kids - How to Plan Your Spending",
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