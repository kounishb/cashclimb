-- Update Grade 6 Module 1 (Ratios and Proportions) to have complete 10-question quiz
UPDATE lessons SET quiz_questions = '[
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
]' WHERE grade_level = 6 AND module_number = 1;