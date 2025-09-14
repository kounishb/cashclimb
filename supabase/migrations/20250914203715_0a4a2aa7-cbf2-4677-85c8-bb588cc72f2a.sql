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

<p>Think about your favorite toys. If you have 3 toy cars, the number "3" tells us exactly how many cars you have. If you add 2 more cars, you would have 5 cars total. Numbers help us keep track of these changes!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Different Types of Numbers</h3>

<p>There are many different types of numbers, but for now, let us focus on the ones you use most often:</p>

<p><strong>Counting Numbers (1, 2, 3, 4, 5...):</strong> These are the numbers we use to count objects. If you have 4 pencils, you are using counting numbers.</p>

<p><strong>Zero (0):</strong> Zero is a very special number that means "nothing" or "none." If you have zero cookies, it means you do not have any cookies at all.</p>

<p><strong>Two-digit Numbers (10, 11, 12... 99):</strong> These numbers have two digits. The number 25 has a "2" in the tens place and a "5" in the ones place, which means 2 groups of ten plus 5 individual ones.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Place Value</h3>

<p>Understanding place value is like learning the rules of a game. In our number system, the position of a digit tells us its value. In the number 47, the "4" is in the tens place (worth 40) and the "7" is in the ones place (worth 7). Together, they make 47!</p>

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
  },
  {
    "question": "What makes 47 different from 74?",
    "options": ["They use different digits", "The position of the digits is different", "One is bigger by 100", "They are exactly the same"],
    "correct": 1
  },
  {
    "question": "Why are numbers important in baking?",
    "options": ["To make the oven pretty", "To measure ingredients correctly", "To choose the recipe book", "To pick the baking pan color"],
    "correct": 1
  },
  {
    "question": "What happens when you add 2 toy cars to 3 toy cars?",
    "options": ["You get 1 car", "You get 5 cars", "You get 6 cars", "You get 4 cars"],
    "correct": 1
  },
  {
    "question": "Numbers help us do all of these EXCEPT:",
    "options": ["Tell time", "Measure height", "Count objects", "Change the color of things"],
    "correct": 3
  },
  {
    "question": "In our number system, what determines the value of a digit?",
    "options": ["Its color", "Its position or place", "How big it looks", "What day it is"],
    "correct": 1
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

<p>The numbers we add together are called "addends," and the answer is called the "sum." In the problem 4 + 3 = 7, both 4 and 3 are addends, and 7 is the sum.</p>

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
  },
  {
    "question": "If you have 3 stickers and get 2 more, how many do you have total?",
    "options": ["1", "5", "6", "32"],
    "correct": 1
  },
  {
    "question": "What are the numbers being added together called?",
    "options": ["Sums", "Totals", "Addends", "Products"],
    "correct": 2
  },
  {
    "question": "What is 7 + 1?",
    "options": ["6", "7", "8", "9"],
    "correct": 2
  },
  {
    "question": "If 4 people each need 1 plate and 1 cup, how many items total?",
    "options": ["4", "6", "8", "12"],
    "correct": 2
  },
  {
    "question": "Which addition fact makes 10?",
    "options": ["4 + 5", "6 + 4", "3 + 6", "2 + 7"],
    "correct": 1
  }
]',
50, 30),

-- Grade 4 Lessons
('Multiplication Basics', 4, 1,
'<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Understanding Multiplication</h2>

<p>Multiplication is like super-fast addition! Instead of adding the same number over and over again, multiplication gives us a quicker way to find the answer. When we multiply, we are finding the total of equal groups.</p>

<p>Imagine you have 4 boxes, and each box contains exactly 6 cookies. Instead of adding 6 + 6 + 6 + 6, you can multiply 4 × 6 to get 24 cookies total. Multiplication makes math faster and more efficient!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What Is Multiplication?</h3>

<p>Multiplication is repeated addition of the same number. When we write 3 × 4, we mean "3 groups of 4" or "4 added to itself 3 times." Both ways give us the same answer: 12.</p>

<p>The multiplication sign can be written as × or sometimes as a dot (·). The numbers we multiply are called "factors," and the answer is called the "product." In 5 × 3 = 15, both 5 and 3 are factors, and 15 is the product.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Arrays and Groups</h3>

<p>One great way to understand multiplication is through arrays. An array is a rectangular arrangement of objects in rows and columns. If you arrange 12 stickers in 3 rows with 4 stickers in each row, you have created a 3 × 4 array that shows 3 × 4 = 12.</p>

<p>You can also think of multiplication as equal groups. If you have 5 bags with 7 marbles in each bag, you have 5 groups of 7, which equals 5 × 7 = 35 marbles total.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Multiplication Strategies</h3>

<p><strong>Skip Counting:</strong> This means counting by the same number each time. To find 4 × 3, you can skip count by 3s: 3, 6, 9, 12. You counted 4 times, so 4 × 3 = 12.</p>

<p><strong>Doubling:</strong> If you know that 4 × 3 = 12, then 4 × 6 = 24 because 6 is double 3, so the answer is double 12.</p>

<p><strong>Breaking Apart:</strong> You can break larger numbers into smaller, easier pieces. For 6 × 8, you might think: 6 × 8 = 6 × (5 + 3) = (6 × 5) + (6 × 3) = 30 + 18 = 48.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Important Multiplication Facts</h3>

<p>Learning basic multiplication facts will help you solve problems quickly. Here are some key patterns:</p>

<p><strong>Multiplying by 1:</strong> Any number times 1 equals itself. 7 × 1 = 7, 25 × 1 = 25.</p>

<p><strong>Multiplying by 0:</strong> Any number times 0 equals 0. 8 × 0 = 0, 100 × 0 = 0.</p>

<p><strong>Multiplying by 10:</strong> When you multiply by 10, just add a zero to the end! 4 × 10 = 40, 7 × 10 = 70.</p>

<p><strong>Commutative Property:</strong> You can multiply numbers in any order and get the same answer. 3 × 5 = 15 and 5 × 3 = 15.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Multiplication in Daily Life</h3>

<p>Multiplication helps us solve many real-world problems! If you want to buy 3 packs of gum and each pack costs 2 dollars, multiplication helps you find that you need 3 × 2 = 6 dollars total.</p>

<p>Multiplication is also useful for figuring out areas. If your bedroom is 4 feet wide and 5 feet long, the area of your floor is 4 × 5 = 20 square feet.</p>

<p>When you understand multiplication, you will find it everywhere – from calculating how many legs 8 spiders have (8 × 8 = 64) to figuring out how many wheels are on 6 bicycles (6 × 2 = 12)!</p>
</div>',
'[
  {
    "question": "What is multiplication?",
    "options": ["Adding different numbers", "Repeated addition of the same number", "Subtracting numbers", "Dividing numbers"],
    "correct": 1
  },
  {
    "question": "In 4 × 7 = 28, what is the product?",
    "options": ["4", "7", "28", "11"],
    "correct": 2
  },
  {
    "question": "What does 3 × 5 mean?",
    "options": ["3 + 5", "3 groups of 5", "5 - 3", "3 ÷ 5"],
    "correct": 1
  },
  {
    "question": "What is 6 × 0?",
    "options": ["6", "0", "60", "1"],
    "correct": 1
  },
  {
    "question": "If you skip count by 4s four times, what numbers do you say?",
    "options": ["1, 2, 3, 4", "4, 8, 12, 16", "4, 5, 6, 7", "2, 4, 6, 8"],
    "correct": 1
  },
  {
    "question": "What is 7 × 1?",
    "options": ["1", "7", "8", "0"],
    "correct": 1
  },
  {
    "question": "An array with 5 rows and 3 columns represents which multiplication?",
    "options": ["5 + 3", "5 × 3", "5 - 3", "5 ÷ 3"],
    "correct": 1
  },
  {
    "question": "What is 8 × 10?",
    "options": ["18", "80", "810", "8"],
    "correct": 1
  },
  {
    "question": "If 3 packs of gum cost 2 dollars each, how much do they cost total?",
    "options": ["5 dollars", "6 dollars", "1 dollar", "32 dollars"],
    "correct": 1
  },
  {
    "question": "Which property shows that 4 × 6 = 6 × 4?",
    "options": ["Addition property", "Commutative property", "Zero property", "Identity property"],
    "correct": 1
  }
]',
60, 35),

-- Grade 5 Lessons  
('Fractions Fundamentals', 5, 1,
'<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Understanding Fractions</h2>

<p>Fractions are everywhere in our daily lives! When you eat half of a pizza, drink a quarter cup of milk, or complete three-fourths of your homework, you are working with fractions. A fraction represents a part of a whole or a part of a group.</p>

<p>Learning about fractions helps us understand how to share things equally, measure ingredients for cooking, tell time more precisely, and solve many real-world problems that involve parts and wholes.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What Are Fractions?</h3>

<p>A fraction is a number that represents part of something. It has two main parts: the numerator (top number) and the denominator (bottom number). The denominator tells us how many equal parts the whole is divided into, and the numerator tells us how many of those parts we are talking about.</p>

<p>For example, in the fraction 3/4, the denominator 4 tells us the whole is divided into 4 equal parts, and the numerator 3 tells us we are looking at 3 of those parts. This could represent 3 slices of a pizza that was cut into 4 equal pieces.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Types of Fractions</h3>

<p><strong>Proper Fractions:</strong> These are fractions where the numerator is smaller than the denominator, like 2/5 or 7/10. They represent less than one whole.</p>

<p><strong>Improper Fractions:</strong> These are fractions where the numerator is larger than or equal to the denominator, like 5/3 or 8/8. They represent one whole or more than one whole.</p>

<p><strong>Mixed Numbers:</strong> These combine a whole number with a proper fraction, like 2 1/3. This means 2 whole units plus 1/3 of another unit.</p>

<p><strong>Unit Fractions:</strong> These special fractions have 1 as the numerator, like 1/2, 1/4, or 1/8. They represent one part of the whole.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Equivalent Fractions</h3>

<p>Equivalent fractions are different fractions that represent the same amount. For example, 1/2, 2/4, 3/6, and 4/8 are all equivalent because they all represent the same portion of a whole.</p>

<p>To find equivalent fractions, you can multiply or divide both the numerator and denominator by the same number. If you have 1/3 and multiply both parts by 2, you get 2/6, which is equivalent to 1/3.</p>

<p>Understanding equivalent fractions helps us compare fractions, add and subtract fractions, and simplify our answers to their lowest terms.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Comparing Fractions</h3>

<p>When fractions have the same denominator, comparing them is easy – just look at the numerators! 3/7 is greater than 2/7 because 3 > 2.</p>

<p>When fractions have different denominators, we need to find equivalent fractions with the same denominator, or use other strategies like comparing to benchmark fractions (1/4, 1/2, 3/4, 1).</p>

<p>For example, to compare 3/4 and 2/3, we can think: 3/4 is close to 1 whole, while 2/3 is further from 1 whole, so 3/4 > 2/3.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Fractions on a Number Line</h3>

<p>Fractions can be shown on a number line, just like whole numbers. This helps us visualize their size and understand their relationships. On a number line from 0 to 1, we can mark fractions like 1/4, 1/2, and 3/4 in their correct positions.</p>

<p>Using number lines helps us see that fractions are numbers too, and they follow the same ordering rules as whole numbers. The further right a fraction appears on the number line, the larger it is.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Real-Life Applications</h3>

<p>Fractions appear constantly in cooking and baking. Recipes often call for 1/2 cup of flour, 3/4 teaspoon of salt, or 1/3 cup of sugar. Understanding fractions helps us follow recipes correctly and even adjust them for different serving sizes.</p>

<p>In sports, we use fractions to describe achievements like completing 7/10 free throws in basketball or running 3/4 of a mile. Time is also measured in fractions – half past the hour means 30 minutes, or 1/2 of an hour has passed.</p>

<p>Money uses fractions too! A quarter is 1/4 of a dollar, a dime is 1/10 of a dollar, and a penny is 1/100 of a dollar. Understanding these fraction relationships helps us work with money more effectively.</p>
</div>',
'[
  {
    "question": "In the fraction 5/8, what does the 8 represent?",
    "options": ["How many parts we have", "How many equal parts the whole is divided into", "The whole number", "The mixed number"],
    "correct": 1
  },
  {
    "question": "Which type of fraction has a numerator smaller than the denominator?",
    "options": ["Improper fraction", "Mixed number", "Proper fraction", "Unit fraction"],
    "correct": 2
  },
  {
    "question": "Which fractions are equivalent to 1/2?",
    "options": ["2/4 and 3/6", "1/4 and 1/8", "2/3 and 3/4", "1/3 and 2/5"],
    "correct": 0
  },
  {
    "question": "What is a mixed number?",
    "options": ["A fraction with the same numerator and denominator", "A whole number combined with a proper fraction", "A fraction where the numerator is larger", "A fraction with 1 as the numerator"],
    "correct": 1
  },
  {
    "question": "Which fraction is greater: 3/5 or 2/5?",
    "options": ["2/5", "3/5", "They are equal", "Cannot tell"],
    "correct": 1
  },
  {
    "question": "What does 1/4 of a dollar equal?",
    "options": ["A dime", "A nickel", "A quarter", "A penny"],
    "correct": 2
  },
  {
    "question": "If a pizza is cut into 6 equal pieces and you eat 4 pieces, what fraction did you eat?",
    "options": ["4/6", "6/4", "2/6", "4/10"],
    "correct": 0
  },
  {
    "question": "Which is an example of a unit fraction?",
    "options": ["2/3", "5/4", "1/7", "3/3"],
    "correct": 2
  },
  {
    "question": "To find an equivalent fraction, what can you do to the numerator and denominator?",
    "options": ["Add the same number to both", "Multiply or divide both by the same number", "Subtract from the numerator only", "Only change the denominator"],
    "correct": 1
  },
  {
    "question": "On a number line from 0 to 1, where would 3/4 be located?",
    "options": ["Closer to 0", "Exactly in the middle", "Closer to 1", "Past 1"],
    "correct": 2
  }
]',
70, 40),

-- Grade 6 Lessons
('Ratios and Proportions', 6, 1,
'<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Understanding Ratios and Proportions</h2>

<p>Ratios and proportions are powerful mathematical tools that help us compare quantities and solve real-world problems. From mixing paint colors to calculating cooking ingredients for different serving sizes, ratios and proportions make it possible to maintain relationships between different amounts.</p>

<p>When you mix 2 cups of red paint with 3 cups of blue paint to make purple, you are using a ratio. If you want to make a larger batch of the same purple color, proportions help you figure out exactly how much of each color you need.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What Are Ratios?</h3>

<p>A ratio is a comparison between two or more quantities. Ratios tell us how much of one thing there is compared to another thing. We can write ratios in several ways: as fractions (2/3), with a colon (2:3), or in words (2 to 3).</p>

<p>For example, if a classroom has 12 boys and 15 girls, the ratio of boys to girls is 12:15, which can be simplified to 4:5 by dividing both numbers by their greatest common factor (3).</p>

<p>Ratios maintain their meaning when both parts are multiplied or divided by the same number. This is why 4:5 represents the same relationship as 12:15 or 8:10.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Types of Ratios</h3>

<p><strong>Part-to-Part Ratios:</strong> These compare one part of a group to another part. If there are 6 cats and 4 dogs at a pet store, the ratio of cats to dogs is 6:4 or 3:2.</p>

<p><strong>Part-to-Whole Ratios:</strong> These compare one part to the entire group. Using the same pet store example, the ratio of cats to total animals is 6:10 or 3:5.</p>

<p><strong>Rate Ratios:</strong> These compare quantities with different units. Speed is a rate ratio – 60 miles per hour compares distance (miles) to time (hours).</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Understanding Proportions</h3>

<p>A proportion is a statement that two ratios are equal. When we write 2/3 = 4/6, we are stating a proportion. Proportions are extremely useful for solving problems when we know three parts of the relationship and need to find the fourth.</p>

<p>Cross multiplication is a powerful tool for solving proportions. In the proportion a/b = c/d, we can cross multiply to get a × d = b × c. This helps us find missing values in proportional relationships.</p>

<p>For instance, if 3 apples cost $2, how much do 9 apples cost? We can set up the proportion 3/2 = 9/x and cross multiply: 3x = 18, so x = 6. Nine apples cost $6.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Equivalent Ratios</h3>

<p>Equivalent ratios express the same relationship using different numbers. Just like equivalent fractions, we create equivalent ratios by multiplying or dividing both parts by the same number.</p>

<p>Starting with the ratio 2:5, we can create equivalent ratios like 4:10 (multiply by 2), 6:15 (multiply by 3), or 1:2.5 (divide by 2). All these ratios represent the same proportional relationship.</p>

<p>Understanding equivalent ratios helps us scale recipes, convert measurements, and solve proportion problems in various contexts.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Unit Rates</h3>

<p>A unit rate is a special type of ratio where the second quantity is 1. Unit rates help us compare different options and make decisions. Common unit rates include miles per gallon, cost per item, and words per minute.</p>

<p>To find a unit rate, divide the first quantity by the second quantity. If 4 pounds of apples cost $6, the unit rate is $6 ÷ 4 pounds = $1.50 per pound.</p>

<p>Unit rates make comparisons easy. If Store A sells apples for $1.50 per pound and Store B sells them for $1.75 per pound, we can quickly see that Store A offers the better deal.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Problem-Solving with Proportions</h3>

<p>Proportions help solve many practical problems. Map scales use proportions – if 1 inch on a map represents 50 miles in reality, then 3 inches represents 150 miles.</p>

<p>In cooking, if a recipe for 4 people calls for 2 cups of rice, we can use proportions to find how much rice is needed for 6 people: 4/2 = 6/x, so x = 3 cups.</p>

<p>Proportions also appear in architecture, art, photography, and many other fields where maintaining proper relationships between different measurements is crucial.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Real-World Applications</h3>

<p>Ratios and proportions appear everywhere in daily life. When you mix orange juice concentrate with water, you are following a ratio. When you calculate how long a trip will take based on your average speed, you are using proportional reasoning.</p>

<p>In sports, ratios help calculate batting averages, shooting percentages, and other statistics. In business, ratios help analyze profit margins, employee productivity, and market share.</p>

<p>Understanding ratios and proportions develops proportional reasoning skills that are essential for success in algebra, geometry, science, and many career fields.</p>
</div>',
'[
  {
    "question": "Which of these represents the ratio of 3 to 7?",
    "options": ["3 + 7", "3:7", "3 - 7", "3 ÷ 7 only"],
    "correct": 1
  },
  {
    "question": "What is a proportion?",
    "options": ["A single ratio", "A statement that two ratios are equal", "Adding two fractions", "A type of percentage"],
    "correct": 1
  },
  {
    "question": "If the ratio of cats to dogs is 4:5, and there are 8 cats, how many dogs are there?",
    "options": ["10", "13", "9", "6"],
    "correct": 0
  },
  {
    "question": "What is the unit rate if 6 pencils cost $3?",
    "options": ["$2 per pencil", "$0.50 per pencil", "$1 per pencil", "$3 per pencil"],
    "correct": 1
  },
  {
    "question": "Which ratios are equivalent to 2:3?",
    "options": ["4:6 and 6:9", "2:5 and 4:7", "1:2 and 3:4", "3:2 and 6:4"],
    "correct": 0
  },
  {
    "question": "In cross multiplication for a/b = c/d, what equation do you get?",
    "options": ["a + d = b + c", "a × d = b × c", "a - b = c - d", "a ÷ d = b ÷ c"],
    "correct": 1
  },
  {
    "question": "If 3 apples cost $2, what is the cost of 12 apples?",
    "options": ["$6", "$8", "$10", "$4"],
    "correct": 1
  },
  {
    "question": "What type of ratio compares one part of a group to the whole group?",
    "options": ["Part-to-part ratio", "Part-to-whole ratio", "Rate ratio", "Unit ratio"],
    "correct": 1
  },
  {
    "question": "If a map scale is 1 inch = 25 miles, how many miles does 4 inches represent?",
    "options": ["29 miles", "100 miles", "75 miles", "50 miles"],
    "correct": 1
  },
  {
    "question": "To create equivalent ratios, what operation can you perform?",
    "options": ["Add the same number to both parts", "Multiply or divide both parts by the same number", "Only multiply the first part", "Subtract from both parts"],
    "correct": 1
  }
]',
70, 40),

-- Grade 7 Lessons
('Introduction to Algebra', 7, 1,
'<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Welcome to the World of Algebra</h2>

<p>Algebra is like learning a new language – a mathematical language that uses letters and symbols to represent numbers and relationships. This powerful tool allows us to solve complex problems, model real-world situations, and discover patterns that would be difficult to see with arithmetic alone.</p>

<p>Think of algebra as a way to work with unknown quantities. When you do not know how much money your friend has, but you know they have $5 more than you do, algebra helps you write equations to represent and solve this type of problem.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Variables and Expressions</h3>

<p>A variable is a letter that represents an unknown number. We commonly use letters like x, y, n, or any other letter to stand for values we do not know yet or values that can change. Variables are like containers that can hold different numbers.</p>

<p>An algebraic expression is a mathematical phrase that contains variables, numbers, and operation symbols. Examples include: 3x + 5, 2y - 7, or 4n + 2n - 3. These expressions represent calculations, but we cannot find a single numerical answer until we know what values the variables represent.</p>

<p>For instance, if x = 4, then the expression 3x + 5 becomes 3(4) + 5 = 12 + 5 = 17. The same expression equals different values when x changes – if x = 2, then 3x + 5 = 3(2) + 5 = 11.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Translating Words into Algebra</h3>

<p>One of the most important skills in algebra is translating word problems into mathematical expressions and equations. This translation process helps us use algebra to solve real-world problems.</p>

<p>Common word phrases have algebraic translations: "5 more than a number" becomes n + 5; "3 times a number" becomes 3n; "a number decreased by 8" becomes n - 8; "the quotient of a number and 4" becomes n ÷ 4 or n/4.</p>

<p>More complex phrases require careful analysis. "Twice a number, increased by 7" translates to 2n + 7, while "7 more than twice a number" also translates to 2n + 7, showing how different word orders can mean the same mathematical expression.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Understanding Equations</h3>

<p>An equation is a mathematical statement that says two expressions are equal, connected by an equals sign. Unlike expressions, equations can be solved to find the value of the variable that makes the statement true.</p>

<p>For example, the equation 2x + 3 = 11 states that "twice some number plus 3 equals 11." We can solve this equation to find that x = 4, because 2(4) + 3 = 8 + 3 = 11.</p>

<p>Equations represent balance. Whatever you do to one side of an equation, you must do to the other side to maintain equality. This balance principle is fundamental to solving equations correctly.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Solving Simple Equations</h3>

<p>To solve an equation means to find the value of the variable that makes the equation true. We use inverse operations to isolate the variable on one side of the equation.</p>

<p>For addition and subtraction equations like x + 7 = 15, we subtract 7 from both sides: x + 7 - 7 = 15 - 7, so x = 8.</p>

<p>For multiplication and division equations like 3x = 21, we divide both sides by 3: 3x ÷ 3 = 21 ÷ 3, so x = 7.</p>

<p>More complex equations require multiple steps, but the principle remains the same: use inverse operations to isolate the variable while maintaining balance.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Properties of Operations</h3>

<p>Algebra relies on several important properties that allow us to manipulate expressions and equations:</p>

<p><strong>Commutative Property:</strong> We can add or multiply in any order: a + b = b + a and a × b = b × a.</p>

<p><strong>Associative Property:</strong> We can group additions or multiplications differently: (a + b) + c = a + (b + c).</p>

<p><strong>Distributive Property:</strong> We can distribute multiplication over addition: a(b + c) = ab + ac. This property is especially useful for simplifying expressions like 3(x + 4) = 3x + 12.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Like Terms and Combining</h3>

<p>Like terms are terms that have the same variable raised to the same power. Examples of like terms include: 3x and 7x, or 5y² and -2y². Constants (numbers without variables) are also like terms with each other.</p>

<p>We can combine like terms by adding or subtracting their coefficients (the numbers in front of the variables). For example: 3x + 7x = 10x, and 5y² - 2y² = 3y².</p>

<p>Combining like terms helps us simplify expressions and solve equations more efficiently. The expression 2x + 5 + 3x - 2 simplifies to 5x + 3 by combining like terms.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Real-World Applications</h3>

<p>Algebra appears everywhere in daily life. When you calculate the cost of multiple items at different prices, determine how long a trip will take at various speeds, or figure out how to split a bill among friends, you are using algebraic thinking.</p>

<p>In business, algebra helps determine break-even points, calculate profits and losses, and optimize resource allocation. In science, algebraic equations describe relationships between variables like distance, time, and speed.</p>

<p>Understanding algebra prepares you for advanced mathematics and provides problem-solving tools that are valuable in many career fields, from engineering and finance to medicine and technology.</p>
</div>',
'[
  {
    "question": "What is a variable in algebra?",
    "options": ["A number that never changes", "A letter that represents an unknown number", "An operation symbol", "A mathematical equation"],
    "correct": 1
  },
  {
    "question": "How do you translate \"5 more than a number\" into algebra?",
    "options": ["5n", "n - 5", "n + 5", "n ÷ 5"],
    "correct": 2
  },
  {
    "question": "What is an equation?",
    "options": ["A mathematical expression", "A statement that two expressions are equal", "A single variable", "A number without variables"],
    "correct": 1
  },
  {
    "question": "If 3x = 15, what is the value of x?",
    "options": ["3", "5", "15", "45"],
    "correct": 1
  },
  {
    "question": "Which are like terms?",
    "options": ["3x and 5y", "2x and 7x", "4 and x", "x² and x³"],
    "correct": 1
  },
  {
    "question": "What does the distributive property state?",
    "options": ["a + b = b + a", "a(b + c) = ab + ac", "a + (b + c) = (a + b) + c", "a × b = b × a"],
    "correct": 1
  },
  {
    "question": "If x + 8 = 20, what is x?",
    "options": ["12", "28", "8", "20"],
    "correct": 0
  },
  {
    "question": "Simplify: 4x + 2x - 3",
    "options": ["6x + 3", "6x - 3", "2x - 3", "4x - 1"],
    "correct": 1
  },
  {
    "question": "How do you translate \"twice a number decreased by 7\"?",
    "options": ["2n + 7", "n - 7", "2n - 7", "2(n - 7)"],
    "correct": 2
  },
  {
    "question": "What principle must you follow when solving equations?",
    "options": ["Always add to both sides", "Do the same operation to both sides", "Only work with one side", "Always multiply both sides"],
    "correct": 1
  }
]',
80, 45),

-- Grade 8 Lessons
('Linear Functions and Graphing', 8, 1,
'<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Understanding Linear Functions and Their Graphs</h2>

<p>Linear functions are fundamental building blocks in mathematics that describe constant rates of change. They appear everywhere in real life – from calculating the cost of items based on quantity to determining distance traveled at a constant speed. Understanding linear functions and their graphs opens the door to advanced mathematical concepts and practical problem-solving skills.</p>

<p>When you pay for gasoline at a constant price per gallon, the relationship between gallons purchased and total cost forms a linear function. The graph of this relationship is a straight line, which is why we call these functions "linear."</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What Are Linear Functions?</h3>

<p>A linear function is a mathematical relationship where the output changes at a constant rate as the input changes. The general form of a linear function is y = mx + b, where m represents the slope (rate of change) and b represents the y-intercept (starting value).</p>

<p>In this equation, x is the independent variable (input), y is the dependent variable (output), m determines how steep the line is, and b tells us where the line crosses the y-axis.</p>

<p>For example, if a taxi charges $3 to start plus $2 for each mile, the cost function is C = 2m + 3, where C is the total cost and m is the number of miles. This is a linear function with a slope of 2 and a y-intercept of 3.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Understanding Slope</h3>

<p>Slope measures the steepness of a line and represents the rate of change in a linear function. It tells us how much the y-value changes for every unit increase in the x-value. Slope is calculated as "rise over run" or (change in y)/(change in x).</p>

<p>A positive slope means the line goes up from left to right – as x increases, y also increases. A negative slope means the line goes down from left to right – as x increases, y decreases. A slope of zero creates a horizontal line, meaning y stays constant regardless of x.</p>

<p>Steeper lines have larger absolute values of slope. A line with slope 5 is steeper than a line with slope 2, and a line with slope -3 is steeper than a line with slope -1.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Y-Intercept and Starting Values</h3>

<p>The y-intercept is the point where a line crosses the y-axis. It occurs when x = 0, and its value is represented by b in the equation y = mx + b. The y-intercept often represents a starting value or initial condition in real-world problems.</p>

<p>In our taxi example, the y-intercept of 3 represents the initial fee charged before any miles are traveled. In a savings account that starts with $50 and grows by $10 per week, the y-intercept would be 50.</p>

<p>Understanding y-intercepts helps us interpret the meaning of linear functions in context and makes graphing much easier since it gives us a starting point for drawing the line.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Graphing Linear Functions</h3>

<p>Graphing a linear function creates a visual representation that makes patterns and relationships easier to understand. Since linear functions always produce straight lines, we only need two points to draw the complete graph.</p>

<p>The most efficient method is to start with the y-intercept (0, b), then use the slope to find additional points. If the slope is 2/3, from the y-intercept, move right 3 units and up 2 units to find the next point.</p>

<p>Alternatively, we can create a table of values by substituting different x-values into the equation and calculating the corresponding y-values. Plotting these coordinate pairs and connecting them with a straight line gives us the graph.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Finding Linear Functions from Graphs and Tables</h3>

<p>Given a graph or table of values, we can work backwards to find the linear function. From a graph, identify the y-intercept by seeing where the line crosses the y-axis, then calculate the slope using any two points on the line.</p>

<p>From a table, look for constant differences in the y-values as x increases by 1. This constant difference is the slope. The y-intercept can be found by extending the pattern or using the point-slope form.</p>

<p>For example, if a table shows (1, 5), (2, 8), (3, 11), the differences are all 3, so the slope is 3. Working backwards, when x = 0, y would be 2, making the function y = 3x + 2.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Systems of Linear Equations</h3>

<p>When we have two or more linear functions, we can analyze how they interact. The point where two lines intersect represents the solution to a system of linear equations – the x and y values that satisfy both equations simultaneously.</p>

<p>Lines can intersect at exactly one point (one solution), be parallel and never intersect (no solution), or be the same line (infinitely many solutions). Understanding these relationships helps solve complex real-world problems involving multiple constraints.</p>

<p>For instance, comparing two cell phone plans with different monthly fees and per-minute charges creates a system of linear equations. The intersection point shows when both plans cost the same amount.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Real-World Applications</h3>

<p>Linear functions model countless real-world situations. Business applications include calculating profit based on items sold, determining break-even points, and analyzing cost structures. In science, linear functions describe constant motion, chemical reaction rates, and many physical relationships.</p>

<p>Personal finance uses linear functions for budgeting, calculating loan payments, and planning savings goals. Understanding these mathematical relationships helps make informed decisions about money, time, and resources.</p>

<p>Linear functions also appear in sports statistics, population growth models, temperature conversions, and countless other areas where one quantity changes at a constant rate relative to another.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Building Mathematical Reasoning</h3>

<p>Working with linear functions develops crucial mathematical reasoning skills. Students learn to identify patterns, make predictions, interpret graphs, and connect abstract mathematical concepts to concrete real-world situations.</p>

<p>These skills form the foundation for more advanced mathematics, including quadratic functions, exponential functions, and calculus. The logical thinking required for linear functions transfers to many other academic subjects and career fields.</p>

<p>Mastering linear functions builds confidence in mathematical problem-solving and prepares students for success in algebra, geometry, statistics, and beyond.</p>
</div>',
'[
  {
    "question": "What is the general form of a linear function?",
    "options": ["y = x²", "y = mx + b", "y = ab^x", "y = 1/x"],
    "correct": 1
  },
  {
    "question": "In the equation y = 3x + 5, what is the slope?",
    "options": ["5", "3", "x", "8"],
    "correct": 1
  },
  {
    "question": "What does the y-intercept represent?",
    "options": ["Where the line crosses the x-axis", "Where the line crosses the y-axis", "The slope of the line", "The highest point on the line"],
    "correct": 1
  },
  {
    "question": "If a line has a slope of -2, what happens as x increases?",
    "options": ["y increases by 2", "y decreases by 2", "y stays the same", "y increases by 1"],
    "correct": 1
  },
  {
    "question": "How many points do you need to graph a linear function?",
    "options": ["1", "2", "3", "4"],
    "correct": 1
  },
  {
    "question": "In y = -4x + 7, what is the y-intercept?",
    "options": ["-4", "4", "7", "-7"],
    "correct": 2
  },
  {
    "question": "What does a horizontal line indicate about the slope?",
    "options": ["Slope is positive", "Slope is negative", "Slope is zero", "Slope is undefined"],
    "correct": 2
  },
  {
    "question": "If two lines intersect at one point, how many solutions does the system have?",
    "options": ["No solutions", "One solution", "Two solutions", "Infinitely many solutions"],
    "correct": 1
  },
  {
    "question": "A taxi charges $2 plus $1.50 per mile. What is the linear function for total cost C?",
    "options": ["C = 2m + 1.5", "C = 1.5m + 2", "C = 3.5m", "C = m + 3.5"],
    "correct": 1
  },
  {
    "question": "How do you calculate slope from two points (x₁,y₁) and (x₂,y₂)?",
    "options": ["(x₂-x₁)/(y₂-y₁)", "(y₂-y₁)/(x₂-x₁)", "(x₁+x₂)/(y₁+y₂)", "(y₁+y₂)/(x₁+x₂)"],
    "correct": 1
  }
]',
90, 50);

-- Add more modules for each grade
INSERT INTO lessons (title, grade_level, module_number, article_content, quiz_questions, xp_reward, duration_minutes) VALUES
-- Additional Grade 3 Module
('Simple Subtraction', 3, 3,
'<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Mastering Subtraction</h2>
<p>Subtraction is taking away or finding the difference between numbers. When you eat 2 cookies from a plate of 7 cookies, subtraction helps you figure out that 5 cookies remain. We use the minus sign (-) to show subtraction.</p>
<p>Understanding subtraction helps us solve everyday problems like figuring out how much money we have left after buying something, or how many more pages we need to read to finish a book.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">What Is Subtraction?</h3>
<p>Subtraction means taking one number away from another number. In 8 - 3 = 5, we start with 8, take away 3, and end up with 5. The number we start with is called the minuend (8), the number we take away is the subtrahend (3), and the answer is the difference (5).</p>
<p>Subtraction can also mean finding how far apart two numbers are. The difference between 9 and 6 is 3, whether we think of it as 9 - 6 or as the distance between 6 and 9 on a number line.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">Subtraction Strategies</h3>
<p><strong>Counting Back:</strong> Start with the larger number and count backwards. For 10 - 4, start at 10 and count back: 9, 8, 7, 6. You counted back 4 numbers and landed on 6.</p>
<p><strong>Using Addition:</strong> Since addition and subtraction are opposite operations, you can check subtraction with addition. If 12 - 5 = 7, then 7 + 5 should equal 12.</p>
<p><strong>Number Line:</strong> Use a number line to jump backwards. To solve 15 - 6, start at 15 and make 6 jumps to the left to land on 9.</p>
</div>',
'[
  {"question": "What is 9 - 4?", "options": ["5", "6", "4", "13"], "correct": 0},
  {"question": "In 15 - 7 = 8, what is the minuend?", "options": ["7", "8", "15", "22"], "correct": 2},
  {"question": "What is 12 - 0?", "options": ["0", "12", "1", "13"], "correct": 1},
  {"question": "Which strategy involves starting with the larger number?", "options": ["Counting back", "Using fingers", "Making ten", "Adding"], "correct": 0},
  {"question": "What is 20 - 15?", "options": ["5", "35", "10", "4"], "correct": 0},
  {"question": "If you have 8 stickers and give away 3, how many do you have left?", "options": ["11", "5", "4", "6"], "correct": 1},
  {"question": "What is the difference between 14 and 9?", "options": ["5", "6", "23", "4"], "correct": 0},
  {"question": "How can you check if 13 - 6 = 7 is correct?", "options": ["Add 13 + 6", "Add 7 + 6", "Subtract 7 - 6", "Multiply 7 × 6"], "correct": 1},
  {"question": "What is 16 - 8?", "options": ["24", "8", "9", "7"], "correct": 1},
  {"question": "In subtraction, what do we call the answer?", "options": ["Sum", "Product", "Difference", "Quotient"], "correct": 2}
]',
50, 30),

-- Additional Grade 4 Module
('Division Concepts', 4, 2,
'<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Understanding Division</h2>
<p>Division is splitting things into equal groups or finding how many times one number fits into another. When you share 12 cookies equally among 4 friends, division helps you figure out that each friend gets 3 cookies.</p>
<p>Division is the opposite of multiplication. Just like subtraction undoes addition, division undoes multiplication. If 4 × 3 = 12, then 12 ÷ 4 = 3 and 12 ÷ 3 = 4.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">What Does Division Mean?</h3>
<p>Division means separating a quantity into equal parts. We use the division sign (÷) or a fraction bar to show division. In 20 ÷ 5 = 4, we are dividing 20 into 5 equal groups, and each group contains 4 items.</p>
<p>The number being divided is called the dividend (20), the number we divide by is called the divisor (5), and the answer is called the quotient (4).</p>
<h3 style="color: white; margin: 20px 0 10px 0;">Division Strategies</h3>
<p><strong>Equal Groups:</strong> Think about making equal groups. For 15 ÷ 3, imagine arranging 15 objects into 3 equal groups. Each group would have 5 objects.</p>
<p><strong>Repeated Subtraction:</strong> Keep subtracting the divisor until you reach zero. For 18 ÷ 6, subtract 6 three times: 18 - 6 = 12, 12 - 6 = 6, 6 - 6 = 0. You subtracted 3 times, so 18 ÷ 6 = 3.</p>
<p><strong>Using Multiplication Facts:</strong> If you know that 7 × 8 = 56, then you also know that 56 ÷ 7 = 8 and 56 ÷ 8 = 7.</p>
</div>',
'[
  {"question": "What is 24 ÷ 6?", "options": ["4", "5", "3", "18"], "correct": 0},
  {"question": "In 35 ÷ 7 = 5, what is the dividend?", "options": ["7", "5", "35", "42"], "correct": 2},
  {"question": "What is 48 ÷ 8?", "options": ["5", "6", "7", "8"], "correct": 1},
  {"question": "If 6 × 9 = 54, then 54 ÷ 6 = ?", "options": ["8", "9", "10", "15"], "correct": 1},
  {"question": "What is 0 ÷ 7?", "options": ["7", "1", "0", "Cannot be done"], "correct": 2},
  {"question": "How many groups of 4 can you make from 28 objects?", "options": ["6", "7", "8", "32"], "correct": 1},
  {"question": "What is 63 ÷ 9?", "options": ["6", "7", "8", "9"], "correct": 1},
  {"question": "Division is the opposite operation of which?", "options": ["Addition", "Subtraction", "Multiplication", "Fractions"], "correct": 2},
  {"question": "What is 45 ÷ 5?", "options": ["8", "9", "10", "40"], "correct": 1},
  {"question": "In division, what do we call the answer?", "options": ["Product", "Sum", "Quotient", "Difference"], "correct": 2}
]',
60, 35),

-- Additional Grade 5 Module
('Decimal Operations', 5, 2,
'<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Working with Decimals</h2>
<p>Decimals are another way to write fractions, especially fractions with denominators of 10, 100, 1000, and so on. When you see prices like $3.25 or measurements like 2.5 inches, you are working with decimals.</p>
<p>Understanding decimals is crucial for working with money, measurements, and many real-world calculations. Decimals help us express quantities that fall between whole numbers with great precision.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">What Are Decimals?</h3>
<p>A decimal is a way of writing fractions using place value. The decimal point separates the whole number part from the fractional part. In 4.37, the 4 is the whole number, and .37 represents 37 hundredths or 37/100.</p>
<p>Each position to the right of the decimal point has a specific place value: tenths, hundredths, thousandths, and so on. Just like whole numbers, each place is ten times smaller than the place to its left.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">Adding and Subtracting Decimals</h3>
<p>When adding or subtracting decimals, line up the decimal points vertically. This ensures that digits in the same place value are added or subtracted together.</p>
<p>For example, to add 3.45 + 2.7, write it as 3.45 + 2.70 (adding a zero to help align), then add column by column: 5 + 0 = 5 in the hundredths place, 4 + 7 = 11 in the tenths place (write 1, carry 1), and 3 + 2 + 1 = 6 in the ones place, giving 6.15.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">Multiplying Decimals</h3>
<p>To multiply decimals, first multiply as if they were whole numbers, then place the decimal point in the answer. Count the total number of decimal places in both factors, and place the decimal point that many places from the right in the product.</p>
<p>For 2.3 × 1.4: multiply 23 × 14 = 322. Since 2.3 has 1 decimal place and 1.4 has 1 decimal place, the answer has 2 decimal places: 3.22.</p>
</div>',
'[
  {"question": "What does the digit 7 represent in 5.37?", "options": ["7 ones", "7 tenths", "7 hundredths", "7 thousandths"], "correct": 2},
  {"question": "What is 4.5 + 2.3?", "options": ["6.8", "6.5", "7.8", "2.2"], "correct": 0},
  {"question": "What is 8.9 - 3.4?", "options": ["5.5", "4.5", "5.4", "12.3"], "correct": 0},
  {"question": "How many decimal places should 1.2 × 3.45 have?", "options": ["1", "2", "3", "4"], "correct": 2},
  {"question": "What is 0.6 + 0.9?", "options": ["1.5", "0.15", "15", "1.6"], "correct": 0},
  {"question": "Which decimal is equivalent to 3/10?", "options": ["0.3", "0.03", "3.0", "30"], "correct": 0},
  {"question": "What is 2.5 × 4?", "options": ["8", "10", "6.5", "1"], "correct": 1},
  {"question": "How do you line up decimals for addition?", "options": ["Line up the last digits", "Line up the decimal points", "Line up the first digits", "It doesn't matter"], "correct": 1},
  {"question": "What is 7.25 - 3.1?", "options": ["4.15", "4.24", "10.35", "3.15"], "correct": 0},
  {"question": "Which is larger: 0.8 or 0.75?", "options": ["0.75", "0.8", "They are equal", "Cannot tell"], "correct": 1}
]',
70, 40),

-- Additional Grade 6 Module  
('Percentages', 6, 2,
'<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Understanding Percentages</h2>
<p>Percentages are everywhere in daily life! From sales discounts and tax rates to test scores and statistics, percentages help us understand parts of a whole in a standardized way. The word "percent" means "per hundred," so 25% means 25 out of every 100.</p>
<p>Percentages provide a common language for comparing different quantities, whether you are comparing test scores, analyzing data, or calculating tips at restaurants.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">What Are Percentages?</h3>
<p>A percentage is a ratio that compares a number to 100. We use the % symbol to show percentages. 50% means 50 out of 100, which is the same as the fraction 50/100 or the decimal 0.50.</p>
<p>Percentages, fractions, and decimals are different ways to express the same relationships. Understanding how to convert between them is essential for working with percentages effectively.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">Converting Between Forms</h3>
<p>To convert a percentage to a decimal, divide by 100 (or move the decimal point two places to the left). 75% becomes 0.75.</p>
<p>To convert a decimal to a percentage, multiply by 100 (or move the decimal point two places to the right). 0.25 becomes 25%.</p>
<p>To convert a fraction to a percentage, first convert to a decimal, then to a percentage. 3/4 = 0.75 = 75%.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">Finding Percentages</h3>
<p>To find a percentage of a number, convert the percentage to a decimal and multiply. To find 20% of 80: 20% = 0.20, so 0.20 × 80 = 16.</p>
<p>You can also use proportions: 20/100 = x/80. Cross multiply: 20 × 80 = 100x, so 1600 = 100x, and x = 16.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">Real-World Applications</h3>
<p>Percentages help calculate sales tax, tips, and discounts. If a $50 item has a 20% discount, the discount amount is $50 × 0.20 = $10, making the sale price $40.</p>
<p>In academics, percentages express test scores and grades. Scoring 85 out of 100 points equals 85%.</p>
</div>',
'[
  {"question": "What does 30% mean?", "options": ["30 out of 10", "30 out of 100", "30 out of 1000", "3 out of 10"], "correct": 1},
  {"question": "Convert 0.45 to a percentage", "options": ["4.5%", "45%", "450%", "0.45%"], "correct": 1},
  {"question": "What is 25% as a decimal?", "options": ["2.5", "0.25", "25", "0.025"], "correct": 1},
  {"question": "What is 20% of 150?", "options": ["30", "20", "130", "170"], "correct": 0},
  {"question": "Convert 3/4 to a percentage", "options": ["34%", "75%", "43%", "25%"], "correct": 1},
  {"question": "If a $80 item has a 15% discount, how much is the discount?", "options": ["$12", "$15", "$65", "$95"], "correct": 0},
  {"question": "What percentage is 7 out of 20?", "options": ["7%", "20%", "35%", "27%"], "correct": 2},
  {"question": "Convert 125% to a decimal", "options": ["1.25", "12.5", "0.125", "125"], "correct": 0},
  {"question": "What is 60% of 200?", "options": ["60", "140", "120", "260"], "correct": 2},
  {"question": "If you scored 18 out of 24 on a test, what percentage is that?", "options": ["18%", "24%", "75%", "42%"], "correct": 2}
]',
70, 40),

-- Additional Grade 7 Module
('Solving Linear Equations', 7, 2,
'<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Solving Linear Equations</h2>
<p>Solving linear equations is like being a mathematical detective – you use logical steps to find the value of an unknown variable. These skills are essential for solving real-world problems involving unknowns, from calculating ages and prices to determining distances and times.</p>
<p>The key to solving equations is maintaining balance. Whatever operation you perform on one side of the equation, you must perform on the other side to keep the equation true.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">One-Step Equations</h3>
<p>One-step equations require only one operation to solve. For addition equations like x + 5 = 12, subtract 5 from both sides: x = 7.</p>
<p>For subtraction equations like y - 3 = 8, add 3 to both sides: y = 11.</p>
<p>For multiplication equations like 4z = 20, divide both sides by 4: z = 5.</p>
<p>For division equations like w/3 = 7, multiply both sides by 3: w = 21.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">Two-Step Equations</h3>
<p>Two-step equations require two operations to solve. Always undo addition and subtraction first, then multiplication and division.</p>
<p>For 2x + 3 = 11: First subtract 3 from both sides to get 2x = 8, then divide both sides by 2 to get x = 4.</p>
<p>For 3y - 7 = 14: First add 7 to both sides to get 3y = 21, then divide both sides by 3 to get y = 7.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">Equations with Variables on Both Sides</h3>
<p>When variables appear on both sides, collect all variable terms on one side and all constants on the other side.</p>
<p>For 5x + 2 = 3x + 8: Subtract 3x from both sides to get 2x + 2 = 8, then subtract 2 from both sides to get 2x = 6, so x = 3.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">Checking Solutions</h3>
<p>Always check your answer by substituting it back into the original equation. If both sides are equal, your solution is correct.</p>
</div>',
'[
  {"question": "Solve: x + 7 = 15", "options": ["x = 8", "x = 22", "x = 7", "x = 15"], "correct": 0},
  {"question": "Solve: 3y = 21", "options": ["y = 18", "y = 24", "y = 7", "y = 63"], "correct": 2},
  {"question": "Solve: 2x + 5 = 13", "options": ["x = 9", "x = 4", "x = 18", "x = 6"], "correct": 1},
  {"question": "Solve: m - 4 = 10", "options": ["m = 6", "m = 14", "m = 40", "m = 4"], "correct": 1},
  {"question": "Solve: n/4 = 6", "options": ["n = 2", "n = 10", "n = 24", "n = 1.5"], "correct": 2},
  {"question": "Solve: 3a - 2 = 16", "options": ["a = 6", "a = 14", "a = 4", "a = 18"], "correct": 0},
  {"question": "Solve: 2x + 3 = x + 8", "options": ["x = 5", "x = 11", "x = 2", "x = 3"], "correct": 0},
  {"question": "What is the first step to solve 4x + 1 = 17?", "options": ["Divide by 4", "Subtract 1", "Add 1", "Multiply by 4"], "correct": 1},
  {"question": "Solve: 5p - 7 = 3p + 1", "options": ["p = 4", "p = 2", "p = 8", "p = -3"], "correct": 0},
  {"question": "To check your solution, what should you do?", "options": ["Solve again", "Substitute back into the original equation", "Ask someone else", "Use a calculator"], "correct": 1}
]',
80, 45),

-- Additional Grade 8 Module
('Systems of Equations', 8, 2,
'<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Solving Systems of Equations</h2>
<p>A system of equations consists of two or more equations that share the same variables. The solution to a system is the set of values that makes all equations true simultaneously. Systems help solve complex real-world problems involving multiple constraints or conditions.</p>
<p>For example, if you want to find two numbers whose sum is 10 and whose difference is 4, you can set up a system of equations to find that the numbers are 7 and 3.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">Graphing Method</h3>
<p>When you graph both equations on the same coordinate plane, their intersection point represents the solution. If the lines intersect at (2, 3), then x = 2 and y = 3 is the solution.</p>
<p>Lines can intersect at one point (one solution), be parallel with no intersection (no solution), or be the same line (infinitely many solutions).</p>
<h3 style="color: white; margin: 20px 0 10px 0;">Substitution Method</h3>
<p>Solve one equation for one variable, then substitute that expression into the other equation. This creates a one-variable equation you can solve.</p>
<p>For the system y = 2x + 1 and x + y = 7: Substitute the first equation into the second: x + (2x + 1) = 7, which gives 3x + 1 = 7, so x = 2. Then y = 2(2) + 1 = 5.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">Elimination Method</h3>
<p>Add or subtract the equations to eliminate one variable, leaving an equation with just one variable to solve.</p>
<p>For 2x + y = 8 and x - y = 1: Adding the equations eliminates y: (2x + y) + (x - y) = 8 + 1, giving 3x = 9, so x = 3. Substitute back to find y = 2.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">Real-World Applications</h3>
<p>Systems solve problems involving mixtures, motion, age relationships, and business decisions. They help find break-even points, optimal solutions, and resource allocation.</p>
</div>',
'[
  {"question": "What is a system of equations?", "options": ["One equation with multiple variables", "Two or more equations with the same variables", "Any algebraic equation", "A method of graphing"], "correct": 1},
  {"question": "Where is the solution to a system shown on a graph?", "options": ["On the x-axis", "On the y-axis", "At the intersection point", "At the origin"], "correct": 2},
  {"question": "In the substitution method, what do you do first?", "options": ["Graph both equations", "Solve one equation for one variable", "Add the equations", "Eliminate a variable"], "correct": 1},
  {"question": "Solve this system: y = x + 2 and y = 2x. What is x?", "options": ["x = 1", "x = 2", "x = 3", "x = 0"], "correct": 1},
  {"question": "In elimination, what do you do to remove a variable?", "options": ["Substitute", "Graph", "Add or subtract equations", "Factor"], "correct": 2},
  {"question": "If two lines are parallel, how many solutions does the system have?", "options": ["One", "Two", "None", "Infinitely many"], "correct": 2},
  {"question": "Solve: x + y = 5 and x - y = 1. What is y?", "options": ["y = 2", "y = 3", "y = 1", "y = 4"], "correct": 0},
  {"question": "What does it mean if two equations represent the same line?", "options": ["No solution", "One solution", "Infinitely many solutions", "Two solutions"], "correct": 2},
  {"question": "Which method involves adding or subtracting equations?", "options": ["Graphing", "Substitution", "Elimination", "Factoring"], "correct": 2},
  {"question": "To check a solution (x,y), what must you do?", "options": ["Graph it", "Substitute into both original equations", "Only check one equation", "Multiply by 2"], "correct": 1}
]',
90, 50);