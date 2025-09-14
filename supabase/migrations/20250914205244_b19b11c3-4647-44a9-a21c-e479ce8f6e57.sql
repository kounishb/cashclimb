-- Update Grade 4 lessons to have complete 10-question quizzes

-- Grade 4 Module 1 - Multiplication Basics
UPDATE lessons SET quiz_questions = '[
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
]' WHERE grade_level = 4 AND module_number = 1;

-- Grade 4 Module 2 - Division Concepts
UPDATE lessons SET quiz_questions = '[
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
  },
  {
    "question": "How many groups of 4 can you make from 28 objects?",
    "options": ["6", "7", "8", "32"],
    "correct": 1
  },
  {
    "question": "What is 63 ÷ 9?",
    "options": ["6", "7", "8", "9"],
    "correct": 1
  },
  {
    "question": "Division is the opposite operation of which?",
    "options": ["Addition", "Subtraction", "Multiplication", "Fractions"],
    "correct": 2
  },
  {
    "question": "What is 45 ÷ 5?",
    "options": ["8", "9", "10", "40"],
    "correct": 1
  },
  {
    "question": "In division, what do we call the answer?",
    "options": ["Product", "Sum", "Quotient", "Difference"],
    "correct": 2
  }
]' WHERE grade_level = 4 AND module_number = 2;

-- Grade 4 Module 3 - Fraction Basics
UPDATE lessons SET quiz_questions = '[
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
  },
  {
    "question": "Which fraction is smaller: 1/3 or 1/6?",
    "options": ["1/3", "1/6", "They are equal", "Cannot tell"],
    "correct": 1
  },
  {
    "question": "What does the numerator tell us?",
    "options": ["How many equal parts the whole is divided into", "How many parts we are talking about", "The whole number", "The difference"],
    "correct": 1
  },
  {
    "question": "If you eat 1/4 of a cake, how much is left?",
    "options": ["1/4", "2/4", "3/4", "4/4"],
    "correct": 2
  },
  {
    "question": "Which represents one whole?",
    "options": ["1/2", "2/3", "4/4", "3/5"],
    "correct": 2
  },
  {
    "question": "15 minutes is what fraction of an hour?",
    "options": ["1/2", "1/3", "1/4", "1/5"],
    "correct": 2
  }
]' WHERE grade_level = 4 AND module_number = 3;