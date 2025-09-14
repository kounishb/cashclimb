-- Continue adding lessons for Grades 6-8 with comprehensive content

-- Grade 6 Lessons
INSERT INTO lessons (title, grade_level, module_number, article_content, quiz_questions, xp_reward, duration_minutes) VALUES
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
  }
]',
70, 40),

('Percentages', 6, 2,
'<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Understanding Percentages</h2>
<p>Percentages are everywhere in daily life! From sales discounts and tax rates to test scores and statistics, percentages help us understand parts of a whole in a standardized way. The word percent means per hundred, so 25% means 25 out of every 100.</p>
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
  {
    "question": "What does 30% mean?",
    "options": ["30 out of 10", "30 out of 100", "30 out of 1000", "3 out of 10"],
    "correct": 1
  },
  {
    "question": "Convert 0.45 to a percentage",
    "options": ["4.5%", "45%", "450%", "0.45%"],
    "correct": 1
  },
  {
    "question": "What is 25% as a decimal?",
    "options": ["2.5", "0.25", "25", "0.025"],
    "correct": 1
  },
  {
    "question": "What is 20% of 150?",
    "options": ["30", "20", "130", "170"],
    "correct": 0
  },
  {
    "question": "Convert 3/4 to a percentage",
    "options": ["34%", "75%", "43%", "25%"],
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

<p>Common word phrases have algebraic translations: 5 more than a number becomes n + 5; 3 times a number becomes 3n; a number decreased by 8 becomes n - 8; the quotient of a number and 4 becomes n ÷ 4 or n/4.</p>

<p>More complex phrases require careful analysis. Twice a number, increased by 7 translates to 2n + 7, while 7 more than twice a number also translates to 2n + 7, showing how different word orders can mean the same mathematical expression.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Understanding Equations</h3>

<p>An equation is a mathematical statement that says two expressions are equal, connected by an equals sign. Unlike expressions, equations can be solved to find the value of the variable that makes the statement true.</p>

<p>For example, the equation 2x + 3 = 11 states that twice some number plus 3 equals 11. We can solve this equation to find that x = 4, because 2(4) + 3 = 8 + 3 = 11.</p>

<p>Equations represent balance. Whatever you do to one side of an equation, you must do to the other side to maintain equality. This balance principle is fundamental to solving equations correctly.</p>
</div>',
'[
  {
    "question": "What is a variable in algebra?",
    "options": ["A number that never changes", "A letter that represents an unknown number", "An operation symbol", "A mathematical equation"],
    "correct": 1
  },
  {
    "question": "How do you translate 5 more than a number into algebra?",
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
  }
]',
80, 45),

-- Grade 8 Lessons
('Linear Functions and Graphing', 8, 1,
'<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Understanding Linear Functions and Their Graphs</h2>

<p>Linear functions are fundamental building blocks in mathematics that describe constant rates of change. They appear everywhere in real life – from calculating the cost of items based on quantity to determining distance traveled at a constant speed. Understanding linear functions and their graphs opens the door to advanced mathematical concepts and practical problem-solving skills.</p>

<p>When you pay for gasoline at a constant price per gallon, the relationship between gallons purchased and total cost forms a linear function. The graph of this relationship is a straight line, which is why we call these functions linear.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What Are Linear Functions?</h3>

<p>A linear function is a mathematical relationship where the output changes at a constant rate as the input changes. The general form of a linear function is y = mx + b, where m represents the slope (rate of change) and b represents the y-intercept (starting value).</p>

<p>In this equation, x is the independent variable (input), y is the dependent variable (output), m determines how steep the line is, and b tells us where the line crosses the y-axis.</p>

<p>For example, if a taxi charges $3 to start plus $2 for each mile, the cost function is C = 2m + 3, where C is the total cost and m is the number of miles. This is a linear function with a slope of 2 and a y-intercept of 3.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Understanding Slope</h3>

<p>Slope measures the steepness of a line and represents the rate of change in a linear function. It tells us how much the y-value changes for every unit increase in the x-value. Slope is calculated as rise over run or (change in y)/(change in x).</p>

<p>A positive slope means the line goes up from left to right – as x increases, y also increases. A negative slope means the line goes down from left to right – as x increases, y decreases. A slope of zero creates a horizontal line, meaning y stays constant regardless of x.</p>

<p>Steeper lines have larger absolute values of slope. A line with slope 5 is steeper than a line with slope 2, and a line with slope -3 is steeper than a line with slope -1.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Y-Intercept and Starting Values</h3>

<p>The y-intercept is the point where a line crosses the y-axis. It occurs when x = 0, and its value is represented by b in the equation y = mx + b. The y-intercept often represents a starting value or initial condition in real-world problems.</p>

<p>In our taxi example, the y-intercept of 3 represents the initial fee charged before any miles are traveled. In a savings account that starts with $50 and grows by $10 per week, the y-intercept would be 50.</p>

<p>Understanding y-intercepts helps us interpret the meaning of linear functions in context and makes graphing much easier since it gives us a starting point for drawing the line.</p>
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
  }
]',
90, 50);