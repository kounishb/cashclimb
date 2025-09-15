-- Fix the JSON syntax and continue updating lessons with financial literacy content

-- Grade 4 remaining lessons (fix JSON syntax)
UPDATE lessons SET 
  title = 'Smart Spending',
  description = 'Learn how to make wise choices when spending your money',
  quiz_questions = '[
    {"question": "What does smart spending mean?", "options": ["Spending all your money quickly", "Thinking carefully before buying", "Only buying expensive things", "Never spending money"], "correct": 1},
    {"question": "What should you do before making a purchase?", "options": ["Buy immediately", "Ask important questions first", "Borrow money", "Buy the most expensive option"], "correct": 1},
    {"question": "If a toy costs $15 at one store and $12 at another, how much do you save by choosing the cheaper store?", "options": ["$2", "$3", "$5", "$1"], "correct": 1},
    {"question": "What is the 24-hour rule?", "options": ["Shop for 24 hours straight", "Wait a day before buying to think about it", "Only shop at 24-hour stores", "Spend $24 maximum"], "correct": 1},
    {"question": "A $10 backpack lasts 1 year, a $20 backpack lasts 3 years. Which is the better deal?", "options": ["The $10 backpack", "The $20 backpack", "They are the same", "Neither is good"], "correct": 1},
    {"question": "What should you do when a salesperson pressures you to buy?", "options": ["Buy immediately", "Take time to think about it", "Buy the most expensive item", "Get angry"], "correct": 1},
    {"question": "When should you NOT make spending decisions?", "options": ["When you are calm", "When you are upset or overly excited", "When you have money", "When stores are open"], "correct": 1},
    {"question": "Why should you compare prices?", "options": ["It is fun", "To find the best deal", "To waste time", "To confuse yourself"], "correct": 1},
    {"question": "What is impulse buying?", "options": ["Buying something after careful thought", "Buying something without thinking", "Buying necessities", "Buying with a plan"], "correct": 1},
    {"question": "Smart spenders should:", "options": ["Rush all decisions", "Take time to make good decisions", "Always buy the cheapest option", "Never compare prices"], "correct": 1}
  ]'
WHERE grade_level = 4 AND module_number = 2;

UPDATE lessons SET 
  title = 'Counting and Managing Money',
  description = 'Learn how to count money, make change, and keep track of your spending',
  quiz_questions = '[
    {"question": "How much is a quarter worth?", "options": ["5 cents", "10 cents", "25 cents", "50 cents"], "correct": 2},
    {"question": "When counting money, which should you count first?", "options": ["Pennies", "The smallest coins", "The largest coins or bills", "It does not matter"], "correct": 2},
    {"question": "If you buy a $4 item with a $10 bill, how much change should you get?", "options": ["$5", "$6", "$7", "$14"], "correct": 1},
    {"question": "Why should you count your change?", "options": ["To show off", "To make sure it is correct", "To waste time", "To confuse the cashier"], "correct": 1},
    {"question": "Where should you keep your money safe?", "options": ["In your hand", "In a wallet or purse", "On the ground", "Show it to everyone"], "correct": 1},
    {"question": "What should you do if you find money?", "options": ["Keep it secretly", "Try to return it to its owner", "Spend it immediately", "Hide it"], "correct": 1},
    {"question": "How much is a dime worth?", "options": ["1 cent", "5 cents", "10 cents", "25 cents"], "correct": 2},
    {"question": "When should you count your money?", "options": ["In public loudly", "In private", "Never", "Only at stores"], "correct": 1},
    {"question": "What should you record in a money tracker?", "options": ["Only money you spend", "Only money you earn", "Both money earned and spent", "Nothing"], "correct": 2},
    {"question": "Why is it important to practice counting money?", "options": ["To waste time", "To become faster and more accurate", "To show off", "To confuse others"], "correct": 1}
  ]'
WHERE grade_level = 4 AND module_number = 3;

-- Grade 5 lessons
UPDATE lessons SET 
  title = 'Banking Basics',
  description = 'Learn about banks, savings accounts, and how they help manage money',
  quiz_questions = '[
    {"question": "What is one main purpose of a bank?", "options": ["To take peoples money", "To keep money safe", "To spend peoples money", "To hide money"], "correct": 1},
    {"question": "What is interest?", "options": ["Money you owe the bank", "A reward for keeping money in the bank", "A fee for using the bank", "Money the bank takes"], "correct": 1},
    {"question": "If you put $100 in a savings account with 2% interest, how much would you have after one year?", "options": ["$98", "$100", "$102", "$120"], "correct": 2},
    {"question": "Which account is better for money you want to save for a long time?", "options": ["Checking account", "Savings account", "Neither", "Both are the same"], "correct": 1},
    {"question": "What does FDIC insurance do?", "options": ["Protects your money if the bank fails", "Gives you free money", "Makes you pay more fees", "Nothing important"], "correct": 0},
    {"question": "What do you usually need to open a bank account as a kid?", "options": ["Only money", "A parent or guardian to help", "A job", "To be 18 years old"], "correct": 1},
    {"question": "Which account typically earns more interest?", "options": ["Checking account", "Savings account", "They earn the same", "Neither earns interest"], "correct": 1},
    {"question": "Why are banks safer than keeping money at home?", "options": ["They are not safer", "They have security and insurance", "Banks give free money", "Banks never close"], "correct": 1},
    {"question": "What comes with a checking account?", "options": ["High interest rates", "Checks and debit cards", "Free gifts", "Automatic savings"], "correct": 1},
    {"question": "How does keeping money in a bank help you?", "options": ["It disappears faster", "It helps you track and manage money better", "It makes you spend more", "It is harder to access"], "correct": 1}
  ]'
WHERE grade_level = 5 AND module_number = 1;

UPDATE lessons SET 
  title = 'Creating Your First Budget',
  description = 'Learn how to plan and track your money with a simple budget',
  article_content = '<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Creating Your First Budget</h2>

<p>A budget is like a plan for your money. It helps you decide how to spend, save, and share your money before you actually do it. Think of it as a roadmap for your financial journey!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What is a Budget?</h3>

<p>A budget is a plan that shows:</p>
<ul style="color: white; margin-left: 20px;">
<li>How much money you expect to get (income)</li>
<li>How much you plan to spend on different things</li>
<li>How much you want to save</li>
<li>How much you might give to charity or help others</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">The Simple Kid Budget Formula</h3>

<p>A great way to start budgeting is with the <strong>50-30-20 rule</strong>:</p>
<ul style="color: white; margin-left: 20px;">
<li><strong>50% for NEEDS:</strong> Things you must have (school supplies, lunch money)</li>
<li><strong>30% for WANTS:</strong> Fun things you would like (toys, games, treats)</li>
<li><strong>20% for SAVINGS:</strong> Money to put away for future goals</li>
</ul>

<p><strong>Example:</strong> If you get $10 per week allowance:</p>
<ul style="color: white; margin-left: 20px;">
<li>$5 for needs</li>
<li>$3 for wants</li>
<li>$2 for savings</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Steps to Create Your Budget</h3>

<p><strong>Step 1: Track Your Income</strong></p>
<p>Write down all the money you expect to get: allowance, gifts, money from chores, etc.</p>

<p><strong>Step 2: List Your Expenses</strong></p>
<p>Think about what you typically spend money on: snacks, games, supplies, entertainment</p>

<p><strong>Step 3: Set Your Goals</strong></p>
<p>Decide what you want to save for: a new bike, video game, or college fund</p>

<p><strong>Step 4: Make Your Plan</strong></p>
<p>Assign amounts to each category using the 50-30-20 rule as a guide</p>

<p><strong>Step 5: Track and Adjust</strong></p>
<p>Keep track of your actual spending and adjust your budget as needed</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Tips for Budget Success</h3>

<ul style="color: white; margin-left: 20px;">
<li><strong>Start simple:</strong> Don not overcomplicate your first budget</li>
<li><strong>Be realistic:</strong> Make sure your budget matches your actual habits</li>
<li><strong>Review regularly:</strong> Check your budget weekly or monthly</li>
<li><strong>Be flexible:</strong> It is okay to adjust your budget when things change</li>
<li><strong>Celebrate success:</strong> Feel proud when you stick to your budget!</li>
</ul>

<p>Remember: A budget is not about restricting yourself - it is about making sure your money goes toward the things that matter most to you!</p>
</div>',
  quiz_questions = '[
    {"question": "What is a budget?", "options": ["A type of bank account", "A plan for your money", "A way to spend more", "A type of coin"], "correct": 1},
    {"question": "In the 50-30-20 rule, what percentage goes to savings?", "options": ["50%", "30%", "20%", "10%"], "correct": 2},
    {"question": "If you get $10 allowance and follow the 50-30-20 rule, how much would you save?", "options": ["$1", "$2", "$3", "$5"], "correct": 1},
    {"question": "What should you do first when creating a budget?", "options": ["Spend all your money", "Track your income", "Buy something expensive", "Give away your money"], "correct": 1},
    {"question": "What are needs in a budget?", "options": ["Fun things you want", "Things you must have", "Expensive items", "Things your friends have"], "correct": 1},
    {"question": "How often should you review your budget?", "options": ["Never", "Once a year", "Weekly or monthly", "Only when you are broke"], "correct": 2},
    {"question": "What should you do if your budget is not working?", "options": ["Give up on budgeting", "Adjust and change it", "Spend more money", "Ignore it completely"], "correct": 1},
    {"question": "What is the main purpose of a budget?", "options": ["To restrict all spending", "To help money go toward things that matter", "To make you feel bad", "To impress others"], "correct": 1},
    {"question": "In the example budget with $10 allowance, how much goes to wants?", "options": ["$2", "$3", "$5", "$10"], "correct": 1},
    {"question": "A good budget should be:", "options": ["Very complicated", "Impossible to follow", "Realistic and simple", "The same as everyone elses"], "correct": 2}
  ]'
WHERE grade_level = 5 AND module_number = 2;