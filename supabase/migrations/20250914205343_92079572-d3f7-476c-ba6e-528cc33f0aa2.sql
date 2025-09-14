-- Update remaining grade levels to have complete 10-question quizzes

-- Grade 5 Module 1 - Fractions Fundamentals
UPDATE lessons SET quiz_questions = '[
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
]' WHERE grade_level = 5 AND module_number = 1;

-- Grade 5 Module 2 - Decimal Operations
UPDATE lessons SET quiz_questions = '[
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
  },
  {
    "question": "Which decimal is equivalent to 3/10?",
    "options": ["0.3", "0.03", "3.0", "30"],
    "correct": 0
  },
  {
    "question": "What is 2.5 × 4?",
    "options": ["8", "10", "6.5", "1"],
    "correct": 1
  },
  {
    "question": "How do you line up decimals for addition?",
    "options": ["Line up the last digits", "Line up the decimal points", "Line up the first digits", "It does not matter"],
    "correct": 1
  },
  {
    "question": "What is 7.25 - 3.1?",
    "options": ["4.15", "4.24", "10.35", "3.15"],
    "correct": 0
  },
  {
    "question": "Which is larger: 0.8 or 0.75?",
    "options": ["0.75", "0.8", "They are equal", "Cannot tell"],
    "correct": 1
  }
]' WHERE grade_level = 5 AND module_number = 2;