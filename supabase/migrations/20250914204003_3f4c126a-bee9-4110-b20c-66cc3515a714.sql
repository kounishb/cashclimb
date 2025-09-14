-- Continue adding lessons for Grade 4-8 with comprehensive content

-- Grade 4 Lessons
INSERT INTO lessons (title, grade_level, module_number, article_content, quiz_questions, xp_reward, duration_minutes) VALUES
('Multiplication Basics', 4, 1,
'<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Understanding Multiplication</h2>

<p>Multiplication is like super-fast addition! Instead of adding the same number over and over again, multiplication gives us a quicker way to find the answer. When we multiply, we are finding the total of equal groups.</p>

<p>Imagine you have 4 boxes, and each box contains exactly 6 cookies. Instead of adding 6 + 6 + 6 + 6, you can multiply 4 × 6 to get 24 cookies total. Multiplication makes math faster and more efficient!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What Is Multiplication?</h3>

<p>Multiplication is repeated addition of the same number. When we write 3 × 4, we mean 3 groups of 4 or 4 added to itself 3 times. Both ways give us the same answer: 12.</p>

<p>The multiplication sign can be written as × or sometimes as a dot. The numbers we multiply are called factors, and the answer is called the product. In 5 × 3 = 15, both 5 and 3 are factors, and 15 is the product.</p>

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
  }
]',
60, 35),

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
  {
    "question": "What is 24 ÷ 6?",
    "options": ["4", "5", "3", "18"],
    "correct": 0
  },
  {
    "question": "In 35 ÷ 7 = 5, what is the dividend?",
    "options": ["7", "5", "35", "42"],
    "correct": 2
  },
  {
    "question": "What is 48 ÷ 8?",
    "options": ["5", "6", "7", "8"],
    "correct": 1
  },
  {
    "question": "If 6 × 9 = 54, then 54 ÷ 6 = ?",
    "options": ["8", "9", "10", "15"],
    "correct": 1
  },
  {
    "question": "What is 0 ÷ 7?",
    "options": ["7", "1", "0", "Cannot be done"],
    "correct": 2
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
  }
]',
70, 40);