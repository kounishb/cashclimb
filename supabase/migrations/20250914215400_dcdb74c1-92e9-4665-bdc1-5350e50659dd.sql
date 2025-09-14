-- Continue updating remaining lessons with financial literacy content

-- Grade 4 remaining lessons
UPDATE lessons SET 
  title = 'Smart Spending',
  description = 'Learn how to make wise choices when spending your money',
  article_content = '<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Making Smart Spending Choices</h2>

<p>Smart spending means thinking carefully about how you use your money before you buy something. It''s about getting the most value for your money and making choices you won''t regret later!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Before You Buy: Ask These Questions</h3>

<ul style="color: white; margin-left: 20px;">
<li><strong>Do I really need this?</strong> Is it a need or a want?</li>
<li><strong>Can I afford it?</strong> Do I have enough money left after savings?</li>
<li><strong>Is this the best price?</strong> Can I find it cheaper somewhere else?</li>
<li><strong>Will I still want this next week?</strong> Sometimes we want things in the moment</li>
<li><strong>Is there something better I could buy instead?</strong></li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Comparing Prices</h3>

<p>Smart shoppers compare prices before buying. This means looking at different stores to see where something costs less.</p>

<p><strong>Example:</strong> If you want a toy that costs $15 at one store and $12 at another store, buying it at the second store saves you $3!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">The 24-Hour Rule</h3>

<p>When you see something you want to buy, wait 24 hours before purchasing it. This gives you time to think about whether you really want it or if it was just an impulse.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Quality vs. Price</h3>

<p>Sometimes paying a little more for better quality is smarter than buying something cheap that will break quickly.</p>

<p><strong>Example:</strong> A $10 backpack that lasts one year vs. a $20 backpack that lasts three years - the more expensive one is actually a better deal!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Avoiding Spending Traps</h3>

<ul style="color: white; margin-left: 20px;">
<li><strong>Sales pressure:</strong> Don''t let salespeople rush you into buying</li>
<li><strong>"Limited time" offers:</strong> Often these come back later</li>
<li><strong>Buying just because friends have it:</strong> Buy what YOU need and want</li>
<li><strong>Emotional spending:</strong> Don''t shop when you''re upset or excited without thinking</li>
</ul>

<p>Remember: It''s okay to say "I''ll think about it" and walk away. Smart spenders take their time to make good decisions!</p>
</div>',
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
  article_content = '<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Counting and Managing Your Money</h2>

<p>Being able to count money accurately and keep track of your spending is a super important life skill. Let''s learn how to become a money management expert!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Counting Coins and Bills</h3>

<p><strong>Coin Values:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Penny = 1 cent</li>
<li>Nickel = 5 cents</li>
<li>Dime = 10 cents</li>
<li>Quarter = 25 cents</li>
</ul>

<p><strong>Counting Tips:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Start with the largest coin or bill first</li>
<li>Group similar coins together</li>
<li>Count by 25s for quarters, 10s for dimes, 5s for nickels</li>
<li>Double-check your counting</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Making Change</h3>

<p>When you buy something, you might get change back. Here''s how it works:</p>

<p><strong>Example:</strong> You buy a $3 toy with a $5 bill</p>
<ul style="color: white; margin-left: 20px;">
<li>Cost of toy: $3.00</li>
<li>Money you gave: $5.00</li>
<li>Your change: $5.00 - $3.00 = $2.00</li>
</ul>

<p>Always count your change to make sure it''s correct!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Keeping Track of Your Money</h3>

<p><strong>Create a Simple Money Tracker:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Write down how much money you start with</li>
<li>Record every time you spend money</li>
<li>Record every time you earn or receive money</li>
<li>Calculate how much you have left</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Money Safety Tips</h3>

<ul style="color: white; margin-left: 20px;">
<li>Keep your money in a safe place like a wallet or purse</li>
<li>Don''t show off how much money you have</li>
<li>Count your money in private, not in public</li>
<li>If you find money, try to return it to its owner</li>
<li>Never take money that doesn''t belong to you</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Using Technology</h3>

<p>Many families use apps or calculators to help manage money. While technology is helpful, it''s still important to know how to count money yourself!</p>

<p>Some families use:</p>
<ul style="color: white; margin-left: 20px;">
<li>Calculator apps for adding up purchases</li>
<li>Savings tracker apps</li>
<li>Family budgeting apps</li>
</ul>

<p>Practice counting money regularly - the more you practice, the faster and more accurate you''ll become!</p>
</div>',
  quiz_questions = '[
    {"question": "How much is a quarter worth?", "options": ["5 cents", "10 cents", "25 cents", "50 cents"], "correct": 2},
    {"question": "When counting money, which should you count first?", "options": ["Pennies", "The smallest coins", "The largest coins or bills", "It does not matter"], "correct": 2},
    {"question": "If you buy a $4 item with a $10 bill, how much change should you get?", "options": "$5", "$6", "$7", "$14"], "correct": 1},
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
  article_content = '<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Understanding Banks and Banking</h2>

<p>Banks are special businesses that help people keep their money safe and manage their finances. Let''s explore how banks work and why they''re important!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What Do Banks Do?</h3>

<p>Banks provide many important services:</p>
<ul style="color: white; margin-left: 20px;">
<li><strong>Keep money safe:</strong> Much safer than hiding money under your mattress!</li>
<li><strong>Pay interest:</strong> They pay you a small amount for letting them hold your money</li>
<li><strong>Provide loans:</strong> Help people borrow money for big purchases like houses</li>
<li><strong>Process payments:</strong> Help transfer money between people and businesses</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Types of Bank Accounts</h3>

<p><strong>Savings Account:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Designed for storing money you don''t need right away</li>
<li>Earns interest (the bank pays you for keeping money there)</li>
<li>Usually has limited withdrawals per month</li>
<li>Perfect for reaching savings goals</li>
</ul>

<p><strong>Checking Account:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Used for money you spend regularly</li>
<li>Comes with checks and debit cards</li>
<li>Usually earns little or no interest</li>
<li>Good for paying bills and everyday purchases</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">How Interest Works</h3>

<p>Interest is like a reward for keeping your money in the bank. Here''s a simple example:</p>

<p>If you put $100 in a savings account with 2% annual interest:</p>
<ul style="color: white; margin-left: 20px;">
<li>After one year, you''d have $102</li>
<li>The bank paid you $2 for letting them hold your money</li>
<li>The longer you leave it, the more it grows!</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Bank Safety</h3>

<p>Banks are very safe places for your money because:</p>
<ul style="color: white; margin-left: 20px;">
<li><strong>FDIC Insurance:</strong> The government protects your money up to $250,000</li>
<li><strong>Security systems:</strong> Banks have cameras, alarms, and guards</li>
<li><strong>Electronic records:</strong> Everything is tracked and recorded</li>
<li><strong>Regulations:</strong> Government rules make sure banks operate safely</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Opening Your First Bank Account</h3>

<p>To open a bank account as a kid, you usually need:</p>
<ul style="color: white; margin-left: 20px;">
<li>A parent or guardian to help</li>
<li>Some form of identification</li>
<li>A small amount of money to start (sometimes as little as $1)</li>
<li>To choose between different account options</li>
</ul>

<p>Having a bank account teaches you responsibility and helps you track your money better than keeping cash in a piggy bank!</p>
</div>',
  quiz_questions = '[
    {"question": "What is one main purpose of a bank?", "options": ["To take people''s money", "To keep money safe", "To spend people''s money", "To hide money"], "correct": 1},
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