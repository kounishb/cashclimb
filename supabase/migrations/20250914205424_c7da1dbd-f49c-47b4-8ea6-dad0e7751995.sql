-- Complete updating all remaining lessons to have 10-question quizzes

-- Grade 6 Module 2 - Percentages
UPDATE lessons SET quiz_questions = '[
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
  },
  {
    "question": "If a $80 item has a 15% discount, how much is the discount?",
    "options": ["$12", "$15", "$65", "$95"],
    "correct": 0
  },
  {
    "question": "What percentage is 7 out of 20?",
    "options": ["7%", "20%", "35%", "27%"],
    "correct": 2
  },
  {
    "question": "Convert 125% to a decimal",
    "options": ["1.25", "12.5", "0.125", "125"],
    "correct": 0
  },
  {
    "question": "What is 60% of 200?",
    "options": ["60", "140", "120", "260"],
    "correct": 2
  },
  {
    "question": "If you scored 18 out of 24 on a test, what percentage is that?",
    "options": ["18%", "24%", "75%", "42%"],
    "correct": 2
  }
]' WHERE grade_level = 6 AND module_number = 2;

-- Grade 7 Module 1 - Introduction to Algebra
UPDATE lessons SET quiz_questions = '[
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
    "question": "How do you translate twice a number decreased by 7?",
    "options": ["2n + 7", "n - 7", "2n - 7", "2(n - 7)"],
    "correct": 2
  },
  {
    "question": "What principle must you follow when solving equations?",
    "options": ["Always add to both sides", "Do the same operation to both sides", "Only work with one side", "Always multiply both sides"],
    "correct": 1
  }
]' WHERE grade_level = 7 AND module_number = 1;

-- Grade 7 Module 2 - Solving Linear Equations
UPDATE lessons SET quiz_questions = '[
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
  },
  {
    "question": "Solve: 3a - 2 = 16",
    "options": ["a = 6", "a = 14", "a = 4", "a = 18"],
    "correct": 0
  },
  {
    "question": "Solve: 2x + 3 = x + 8",
    "options": ["x = 5", "x = 11", "x = 2", "x = 3"],
    "correct": 0
  },
  {
    "question": "What is the first step to solve 4x + 1 = 17?",
    "options": ["Divide by 4", "Subtract 1", "Add 1", "Multiply by 4"],
    "correct": 1
  },
  {
    "question": "Solve: 5p - 7 = 3p + 1",
    "options": ["p = 4", "p = 2", "p = 8", "p = -3"],
    "correct": 0
  },
  {
    "question": "To check your solution, what should you do?",
    "options": ["Solve again", "Substitute back into the original equation", "Ask someone else", "Use a calculator"],
    "correct": 1
  }
]' WHERE grade_level = 7 AND module_number = 2;