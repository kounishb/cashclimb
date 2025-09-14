-- Complete the final Grade 8 lessons with 10-question quizzes

-- Grade 8 Module 1 - Linear Functions and Graphing
UPDATE lessons SET quiz_questions = '[
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
]' WHERE grade_level = 8 AND module_number = 1;

-- Grade 8 Module 2 - Systems of Equations
UPDATE lessons SET quiz_questions = '[
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
  },
  {
    "question": "If two lines are parallel, how many solutions does the system have?",
    "options": ["One", "Two", "None", "Infinitely many"],
    "correct": 2
  },
  {
    "question": "Solve: x + y = 5 and x - y = 1. What is y?",
    "options": ["y = 2", "y = 3", "y = 1", "y = 4"],
    "correct": 0
  },
  {
    "question": "What does it mean if two equations represent the same line?",
    "options": ["No solution", "One solution", "Infinitely many solutions", "Two solutions"],
    "correct": 2
  },
  {
    "question": "Which method involves adding or subtracting equations?",
    "options": ["Graphing", "Substitution", "Elimination", "Factoring"],
    "correct": 2
  },
  {
    "question": "To check a solution (x,y), what must you do?",
    "options": ["Graph it", "Substitute into both original equations", "Only check one equation", "Multiply by 2"],
    "correct": 1
  }
]' WHERE grade_level = 8 AND module_number = 2;