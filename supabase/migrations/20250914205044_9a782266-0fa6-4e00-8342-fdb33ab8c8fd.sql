-- Update all lessons to have comprehensive 10-question quizzes

UPDATE lessons SET quiz_questions = '[
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
]' WHERE grade_level = 3 AND module_number = 1;