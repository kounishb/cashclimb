-- Insert comprehensive lessons for all grade levels and modules

-- Grade 3 Lessons
INSERT INTO lessons (title, grade_level, module_number, article_content, quiz_questions, xp_reward, duration_minutes) VALUES
('Introduction to Numbers', 3, 1, 
'<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Understanding Numbers in Our Daily Lives</h2>

<p>Numbers are everywhere around us! From the moment we wake up until we go to sleep, we use numbers in countless ways. When you check the time on your alarm clock, count the stairs as you go downstairs, or figure out how many cookies you can have for a snack, you are working with numbers.</p>

<p>In this lesson, we will explore the wonderful world of numbers and discover how they help us make sense of our world. Numbers are like a special language that helps us communicate about quantities, sizes, and amounts.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What Are Numbers?</h3>

<p>Numbers are symbols we use to represent quantities. The numbers we use most often are called counting numbers or natural numbers: 1, 2, 3, 4, 5, and so on. These numbers help us count objects, measure things, and solve problems.</p>

<p>Think about your favorite toys. If you have 3 toy cars, the number 3 tells us exactly how many cars you have. If you add 2 more cars, you would have 5 cars total. Numbers help us keep track of these changes!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Different Types of Numbers</h3>

<p>There are many different types of numbers, but for now, let us focus on the ones you use most often:</p>

<p><strong>Counting Numbers (1, 2, 3, 4, 5...):</strong> These are the numbers we use to count objects. If you have 4 pencils, you are using counting numbers.</p>

<p><strong>Zero (0):</strong> Zero is a very special number that means nothing or none. If you have zero cookies, it means you do not have any cookies at all.</p>

<p><strong>Two-digit Numbers (10, 11, 12... 99):</strong> These numbers have two digits. The number 25 has a 2 in the tens place and a 5 in the ones place, which means 2 groups of ten plus 5 individual ones.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Place Value</h3>

<p>Understanding place value is like learning the rules of a game. In our number system, the position of a digit tells us its value. In the number 47, the 4 is in the tens place (worth 40) and the 7 is in the ones place (worth 7). Together, they make 47!</p>

<p>This is why the number 47 is different from 74, even though they use the same digits. The position of each digit changes its meaning completely.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Using Numbers in Real Life</h3>

<p>Numbers help us in so many ways! When you go shopping with your family, you use numbers to count money and make sure you have enough to buy what you want. When you play games, you use numbers to keep score. When you bake cookies with a grown-up, you use numbers to measure ingredients.</p>

<p>Numbers also help us tell time, measure how tall we are, and even plan fun activities. If you want to invite 8 friends to your birthday party, numbers help you figure out how many invitations you need to make!</p>

<p>As we continue learning about numbers, remember that they are tools to help us understand and organize our world. The more comfortable you become with numbers, the easier it will be to solve problems and discover new things!</p>
</div>', 
'[
  {
    "question": "What are counting numbers?",
    "options": ["Numbers used to count objects like 1, 2, 3", "Only the number zero", "Letters of the alphabet", "Colors and shapes"],
    "correct": 0
  },
  {
    "question": "What does the number zero mean?",
    "options": ["A very big number", "Nothing or none", "The first counting number", "An even number only"],
    "correct": 1
  },
  {
    "question": "In the number 35, what does the 3 represent?",
    "options": ["3 ones", "3 tens", "3 hundreds", "3 thousands"],
    "correct": 1
  },
  {
    "question": "Which of these is a two-digit number?",
    "options": ["5", "147", "23", "1"],
    "correct": 2
  },
  {
    "question": "How do we use numbers when shopping?",
    "options": ["To count money and items", "To choose colors", "To pick the store name", "To decide the weather"],
    "correct": 0
  }
]',
50, 30),

('Basic Addition', 3, 2,
'<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Learning to Add Numbers Together</h2>

<p>Addition is one of the most important math skills you will ever learn! It is like putting groups of objects together to see how many you have in total. When you add numbers, you are combining them to find the sum.</p>

<p>Think of addition as a way to bring things together. If you have 3 stickers and your friend gives you 2 more stickers, addition helps you figure out that you now have 5 stickers altogether!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What Does Addition Mean?</h3>

<p>Addition means putting two or more groups together to find the total amount. We use the plus sign (+) to show addition and the equals sign (=) to show what the total is. For example: 3 + 2 = 5.</p>

<p>The numbers we add together are called addends, and the answer is called the sum. In the problem 4 + 3 = 7, both 4 and 3 are addends, and 7 is the sum.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Addition Strategies</h3>

<p><strong>Counting On:</strong> This is when you start with the bigger number and count up. For 5 + 3, start at 5 and count: 6, 7, 8. The answer is 8!</p>

<p><strong>Using Your Fingers:</strong> Your fingers are like built-in math tools! You can hold up fingers to help you add. For 4 + 2, hold up 4 fingers on one hand and 2 on the other, then count them all.</p>

<p><strong>Number Line:</strong> Imagine numbers in a line from 0 to 20. To add 6 + 4, start at 6 on the number line and jump forward 4 spaces. You will land on 10!</p>

<p><strong>Making Ten:</strong> Numbers that add up to 10 are special helpers! If you know that 7 + 3 = 10, you can use this to solve harder problems like 7 + 4 = 11 (because 7 + 3 + 1 = 11).</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Addition Facts</h3>

<p>Addition facts are like math shortcuts that you can memorize to make adding faster and easier. Here are some important ones to remember:</p>

<p>Adding zero to any number gives you the same number: 5 + 0 = 5, 8 + 0 = 8</p>

<p>Adding 1 to any number gives you the next number: 6 + 1 = 7, 9 + 1 = 10</p>

<p>Doubles are fun and easy to remember: 2 + 2 = 4, 3 + 3 = 6, 4 + 4 = 8, 5 + 5 = 10</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Real-Life Addition</h3>

<p>Addition helps us solve problems every day! When you help set the table, you might add up how many plates, forks, and cups you need. If there are 4 people eating and each person needs 1 plate, 1 fork, and 1 cup, you need 4 + 4 + 4 = 12 items total!</p>

<p>Addition also helps when you are saving money. If you have 3 dollars and earn 2 more dollars for helping with chores, you can add 3 + 2 = 5 to know you have 5 dollars total.</p>

<p>Remember, addition is everywhere! The more you practice, the faster and more confident you will become at solving addition problems.</p>
</div>',
'[
  {
    "question": "What does the plus sign (+) mean?",
    "options": ["Take away", "Add together", "Multiply", "Divide"],
    "correct": 1
  },
  {
    "question": "In the problem 5 + 3 = 8, what is the sum?",
    "options": ["5", "3", "8", "53"],
    "correct": 2
  },
  {
    "question": "What strategy involves starting with the bigger number and counting up?",
    "options": ["Using fingers", "Counting on", "Making ten", "Number line"],
    "correct": 1
  },
  {
    "question": "What is 4 + 4?",
    "options": ["6", "7", "8", "9"],
    "correct": 2
  },
  {
    "question": "When you add zero to any number, what do you get?",
    "options": ["Zero", "One", "The same number", "A bigger number"],
    "correct": 2
  }
]',
50, 30);