-- Update all remaining lessons to have complete 10-question quizzes

-- Grade 3 Module 2 - Basic Addition
UPDATE lessons SET quiz_questions = '[
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
]' WHERE grade_level = 3 AND module_number = 2;

-- Grade 3 Module 3 - Simple Subtraction  
UPDATE lessons SET quiz_questions = '[
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
  },
  {
    "question": "If you have 8 stickers and give away 3, how many do you have left?",
    "options": ["11", "5", "4", "6"],
    "correct": 1
  },
  {
    "question": "What is the difference between 14 and 9?",
    "options": ["5", "6", "23", "4"],
    "correct": 0
  },
  {
    "question": "How can you check if 13 - 6 = 7 is correct?",
    "options": ["Add 13 + 6", "Add 7 + 6", "Subtract 7 - 6", "Multiply 7 × 6"],
    "correct": 1
  },
  {
    "question": "What is 16 - 8?",
    "options": ["24", "8", "9", "7"],
    "correct": 1
  },
  {
    "question": "In subtraction, what do we call the answer?",
    "options": ["Sum", "Product", "Difference", "Quotient"],
    "correct": 2
  }
]' WHERE grade_level = 3 AND module_number = 3;