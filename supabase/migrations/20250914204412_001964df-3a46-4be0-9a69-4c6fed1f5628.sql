-- Add additional modules for all grades to ensure comprehensive coverage

-- Additional Grade 3 Modules
INSERT INTO lessons (title, grade_level, module_number, article_content, quiz_questions, xp_reward, duration_minutes) VALUES
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
  {
    "question": "What is 9 - 4?",
    "options": ["5", "6", "4", "13"],
    "correct": 0
  },
  {
    "question": "In 15 - 7 = 8, what is the minuend?",
    "options": ["7", "8", "15", "22"],
    "correct": 2
  },
  {
    "question": "What is 12 - 0?",
    "options": ["0", "12", "1", "13"],
    "correct": 1
  },
  {
    "question": "Which strategy involves starting with the larger number?",
    "options": ["Counting back", "Using fingers", "Making ten", "Adding"],
    "correct": 0
  },
  {
    "question": "What is 20 - 15?",
    "options": ["5", "35", "10", "4"],
    "correct": 0
  }
]',
50, 30),

-- Additional Grade 4 Module
('Fraction Basics', 4, 3,
'<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Introduction to Fractions</h2>
<p>Fractions are numbers that represent parts of a whole. When you eat half a pizza or drink a quarter of a glass of milk, you are working with fractions! Fractions help us describe amounts that are less than one whole thing.</p>
<p>Learning fractions is important because we use them every day - in cooking, time, money, and measurements. Understanding fractions will help you solve many real-world problems.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">Parts of a Fraction</h3>
<p>Every fraction has two parts: the numerator (top number) and the denominator (bottom number). The denominator tells us how many equal parts the whole is divided into. The numerator tells us how many of those parts we have.</p>
<p>In the fraction 3/4, the denominator 4 means the whole is divided into 4 equal parts. The numerator 3 means we have 3 of those parts.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">Fractions in Real Life</h3>
<p>Fractions appear everywhere! When you look at a clock, 15 minutes is 1/4 of an hour. When you share a pizza equally among 8 people, each person gets 1/8 of the pizza.</p>
<p>Money also uses fractions. A quarter is 1/4 of a dollar, and a half-dollar is 1/2 of a dollar.</p>
<h3 style="color: white; margin: 20px 0 10px 0;">Comparing Fractions</h3>
<p>When fractions have the same denominator, we can compare them by looking at the numerators. 3/5 is larger than 2/5 because 3 > 2.</p>
<p>When we have different denominators, we need to think about the size of the pieces. 1/2 is larger than 1/4 because half of something is bigger than one-fourth of the same thing.</p>
</div>',
'[
  {
    "question": "In the fraction 2/5, what does the 5 represent?",
    "options": ["How many parts we have", "How many equal parts the whole is divided into", "The whole number", "The sum"],
    "correct": 1
  },
  {
    "question": "Which fraction is larger: 3/7 or 2/7?",
    "options": ["2/7", "3/7", "They are equal", "Cannot tell"],
    "correct": 1
  },
  {
    "question": "What fraction represents half of something?",
    "options": ["1/4", "1/2", "2/1", "1/3"],
    "correct": 1
  },
  {
    "question": "If a pizza is cut into 8 equal slices and you eat 3, what fraction did you eat?",
    "options": ["3/8", "8/3", "3/5", "5/8"],
    "correct": 0
  },
  {
    "question": "A quarter coin represents what fraction of a dollar?",
    "options": ["1/2", "1/3", "1/4", "1/5"],
    "correct": 2
  }
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
  {
    "question": "What does the digit 7 represent in 5.37?",
    "options": ["7 ones", "7 tenths", "7 hundredths", "7 thousandths"],
    "correct": 2
  },
  {
    "question": "What is 4.5 + 2.3?",
    "options": ["6.8", "6.5", "7.8", "2.2"],
    "correct": 0
  },
  {
    "question": "What is 8.9 - 3.4?",
    "options": ["5.5", "4.5", "5.4", "12.3"],
    "correct": 0
  },
  {
    "question": "How many decimal places should 1.2 × 3.45 have?",
    "options": ["1", "2", "3", "4"],
    "correct": 2
  },
  {
    "question": "What is 0.6 + 0.9?",
    "options": ["1.5", "0.15", "15", "1.6"],
    "correct": 0
  }
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
  {
    "question": "Solve: x + 7 = 15",
    "options": ["x = 8", "x = 22", "x = 7", "x = 15"],
    "correct": 0
  },
  {
    "question": "Solve: 3y = 21",
    "options": ["y = 18", "y = 24", "y = 7", "y = 63"],
    "correct": 2
  },
  {
    "question": "Solve: 2x + 5 = 13",
    "options": ["x = 9", "x = 4", "x = 18", "x = 6"],
    "correct": 1
  },
  {
    "question": "Solve: m - 4 = 10",
    "options": ["m = 6", "m = 14", "m = 40", "m = 4"],
    "correct": 1
  },
  {
    "question": "Solve: n/4 = 6",
    "options": ["n = 2", "n = 10", "n = 24", "n = 1.5"],
    "correct": 2
  }
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
  {
    "question": "What is a system of equations?",
    "options": ["One equation with multiple variables", "Two or more equations with the same variables", "Any algebraic equation", "A method of graphing"],
    "correct": 1
  },
  {
    "question": "Where is the solution to a system shown on a graph?",
    "options": ["On the x-axis", "On the y-axis", "At the intersection point", "At the origin"],
    "correct": 2
  },
  {
    "question": "In the substitution method, what do you do first?",
    "options": ["Graph both equations", "Solve one equation for one variable", "Add the equations", "Eliminate a variable"],
    "correct": 1
  },
  {
    "question": "Solve this system: y = x + 2 and y = 2x. What is x?",
    "options": ["x = 1", "x = 2", "x = 3", "x = 0"],
    "correct": 1
  },
  {
    "question": "In elimination, what do you do to remove a variable?",
    "options": ["Substitute", "Graph", "Add or subtract equations", "Factor"],
    "correct": 2
  }
]',
90, 50);