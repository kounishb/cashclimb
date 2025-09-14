-- Update all lessons with proper financial literacy content

-- Grade 3 Lessons
UPDATE lessons SET 
  title = 'Needs vs. Wants',
  description = 'Learn the difference between things you need and things you want',
  article_content = '<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Understanding Needs vs. Wants</h2>

<p>Every day, we make choices about what to buy and what not to buy. Understanding the difference between needs and wants is one of the most important money skills you can learn!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What are Needs?</h3>

<p><strong>Needs</strong> are things you must have to live safely and healthily. These are not optional - you need them to survive and be healthy.</p>

<p>Basic needs include:</p>
<ul style="color: white; margin-left: 20px;">
<li><strong>Food:</strong> Healthy meals and snacks to give your body energy</li>
<li><strong>Water:</strong> Clean drinking water to stay hydrated</li>
<li><strong>Shelter:</strong> A safe home to live in</li>
<li><strong>Clothing:</strong> Clothes to keep you warm and protected</li>
<li><strong>Healthcare:</strong> Doctor visits when you are sick</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">What are Wants?</h3>

<p><strong>Wants</strong> are things you would like to have, but you can live without them. They might make you happy or entertained, but they are not necessary for survival.</p>

<p>Examples of wants include:</p>
<ul style="color: white; margin-left: 20px;">
<li>Toys and games</li>
<li>Candy and treats</li>
<li>Extra clothes beyond what you need</li>
<li>Entertainment like movies or video games</li>
<li>Special gadgets or electronics</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Making Smart Choices</h3>

<p>When families have money decisions to make, they should always take care of needs first, then think about wants if there is money left over.</p>

<p>Sometimes the line between needs and wants can be tricky! For example, you need clothes, but do you need expensive brand-name clothes? You need food, but do you need expensive restaurant meals?</p>

<p>Learning to tell the difference helps you make smart money choices and understand why grown-ups sometimes say "no" to things you want to buy.</p>
</div>',
  quiz_questions = '[
    {"question": "Which of these is a NEED?", "options": ["Video games", "Food", "Candy", "Toys"], "correct": 1},
    {"question": "Which of these is a WANT?", "options": ["Shelter", "Water", "Ice cream", "Clothing"], "correct": 2},
    {"question": "What should families buy first?", "options": ["Wants", "Needs", "Fun things", "Expensive things"], "correct": 1},
    {"question": "Which is an example of shelter?", "options": ["A bicycle", "A house", "A toy", "A phone"], "correct": 1},
    {"question": "Why do we need to drink water?", "options": ["It tastes good", "To stay healthy", "It is fun", "It is expensive"], "correct": 1},
    {"question": "Which could be both a need AND a want?", "options": ["Candy", "Toys", "Clothes", "Games"], "correct": 2},
    {"question": "What makes something a need?", "options": ["It is fun", "You must have it to be healthy", "It is expensive", "Your friends have it"], "correct": 1},
    {"question": "If your family has $20 left after buying needs, what should you do?", "options": ["Buy wants immediately", "Save some money", "Spend it all on candy", "Give it away"], "correct": 1},
    {"question": "Which is NOT a basic need?", "options": ["Food", "Water", "Video games", "Healthcare"], "correct": 2},
    {"question": "Why is it important to understand needs vs wants?", "options": ["To spend more money", "To make smart money choices", "To buy more toys", "To have more fun"], "correct": 1}
  ]'
WHERE grade_level = 3 AND module_number = 1;

UPDATE lessons SET 
  title = 'What is Money?',
  description = 'Discover what money is, why we use it, and how it helps us trade',
  article_content = '<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">What is Money?</h2>

<p>Money is something very special that helps people trade with each other! Instead of trading your apple for someone else''s sandwich, we use money to buy what we need and want.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What Does Money Look Like?</h3>

<p>Money comes in different forms:</p>
<ul style="color: white; margin-left: 20px;">
<li><strong>Coins:</strong> Round metal pieces like pennies, nickels, dimes, and quarters</li>
<li><strong>Bills:</strong> Paper money like $1, $5, $10, and $20 bills</li>
<li><strong>Digital money:</strong> Money stored on cards or in computers</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Why Do We Use Money?</h3>

<p>Long ago, people used to trade things directly. If you had chickens and wanted bread, you would trade your chickens to the baker for bread. This is called "bartering."</p>

<p>But trading things directly had problems:</p>
<ul style="color: white; margin-left: 20px;">
<li>What if the baker didn''t want chickens?</li>
<li>How many chickens equal one loaf of bread?</li>
<li>What if your chickens were sick?</li>
</ul>

<p>Money solved these problems! Now everyone agrees that money has value, so everyone will accept it.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">How Does Money Work?</h3>

<p>Money works because everyone agrees it has value. When you give money to a store, they know they can use that same money to buy things they need.</p>

<p>Different amounts of money can buy different things:</p>
<ul style="color: white; margin-left: 20px;">
<li>A penny might buy a piece of candy</li>
<li>A dollar might buy a small toy</li>
<li>Twenty dollars might buy a book</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Taking Care of Money</h3>

<p>Money is important, so we need to take good care of it:</p>
<ul style="color: white; margin-left: 20px;">
<li>Keep it in a safe place like a wallet or piggy bank</li>
<li>Don''t lose it or leave it lying around</li>
<li>Count it carefully when you get change</li>
<li>Think before you spend it</li>
</ul>

<p>Understanding money helps you make good choices about buying things you need and want!</p>
</div>',
  quiz_questions = '[
    {"question": "What is money used for?", "options": ["Only for playing", "To help people trade", "To decorate rooms", "To collect dust"], "correct": 1},
    {"question": "Which is an example of a coin?", "options": ["A dollar bill", "A quarter", "A credit card", "A check"], "correct": 1},
    {"question": "What is bartering?", "options": ["Using money", "Trading things directly", "Saving money", "Spending money"], "correct": 1},
    {"question": "Why is money better than bartering?", "options": ["It is prettier", "Everyone agrees it has value", "It is heavier", "It makes noise"], "correct": 1},
    {"question": "Where should you keep your money safe?", "options": ["On the ground", "In your pocket loosely", "In a wallet or piggy bank", "Give it to strangers"], "correct": 2},
    {"question": "What makes money work?", "options": ["It is made of paper", "Everyone agrees it has value", "It is green", "It has pictures"], "correct": 1},
    {"question": "Which costs more money?", "options": ["A penny candy", "A twenty dollar book", "They cost the same", "Money has no value"], "correct": 1},
    {"question": "How should you handle money?", "options": ["Carelessly", "Throw it away", "Think before spending", "Spend it immediately"], "correct": 2},
    {"question": "What solved the problems of bartering?", "options": ["Bigger chickens", "More bread", "Money", "Louder voices"], "correct": 2},
    {"question": "Digital money is stored where?", "options": ["In your hand", "On cards or computers", "In the ground", "In trees"], "correct": 1}
  ]'
WHERE grade_level = 3 AND module_number = 2;

UPDATE lessons SET 
  title = 'How Do People Earn Money?',
  description = 'Learn about different ways people work to earn money',
  article_content = '<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">How Do People Earn Money?</h2>

<p>Have you ever wondered how your family gets money to buy food, clothes, and other things you need? People earn money by working! Let''s learn about the different ways people work to earn money.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What Does It Mean to Work?</h3>

<p><strong>Work</strong> means using your time, energy, and skills to help other people or solve problems. When people work, they provide something valuable, and in return, they earn money.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Different Types of Jobs</h3>

<p>There are many different ways people can work to earn money:</p>

<p><strong>Helping People:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Teachers help students learn</li>
<li>Doctors help sick people feel better</li>
<li>Police officers keep communities safe</li>
<li>Firefighters protect people from fires</li>
</ul>

<p><strong>Making Things:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Bakers make bread and cakes</li>
<li>Artists create beautiful paintings</li>
<li>Construction workers build houses</li>
<li>Farmers grow food</li>
</ul>

<p><strong>Providing Services:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Bus drivers take people places</li>
<li>Hair stylists cut and style hair</li>
<li>Cleaners keep buildings tidy</li>
<li>Mechanics fix cars</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">How Kids Can Earn Money</h3>

<p>Even kids can earn small amounts of money by helping others:</p>
<ul style="color: white; margin-left: 20px;">
<li>Doing extra chores at home</li>
<li>Walking a neighbor''s dog</li>
<li>Helping elderly neighbors with simple tasks</li>
<li>Selling lemonade or cookies (with adult help)</li>
<li>Recycling cans and bottles</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Why Do People Pay for Work?</h3>

<p>People pay others to work because:</p>
<ul style="color: white; margin-left: 20px;">
<li>The work saves them time</li>
<li>The worker has special skills they don''t have</li>
<li>The work is too difficult or dangerous for them to do</li>
<li>The worker provides something they need</li>
</ul>

<p>Remember: All jobs are important! Whether someone is a teacher, a janitor, or a doctor, every person who works hard deserves respect for earning their money honestly.</p>
</div>',
  quiz_questions = '[
    {"question": "What does it mean to work?", "options": ["To play games", "To use skills to help others and earn money", "To watch TV", "To sleep"], "correct": 1},
    {"question": "Which job helps people learn?", "options": ["Teacher", "Baker", "Mechanic", "Farmer"], "correct": 0},
    {"question": "How can kids earn small amounts of money?", "options": ["Taking money from others", "Doing extra chores", "Breaking things", "Being lazy"], "correct": 1},
    {"question": "Why do people pay others to work?", "options": ["They are mean", "Workers provide valuable help", "They have too much money", "It is a game"], "correct": 1},
    {"question": "Which job makes things?", "options": ["Bus driver", "Baker", "Police officer", "Hair stylist"], "correct": 1},
    {"question": "What do farmers do?", "options": ["Fix cars", "Grow food", "Cut hair", "Teach students"], "correct": 1},
    {"question": "Which is a service job?", "options": ["Artist", "Construction worker", "Bus driver", "Farmer"], "correct": 2},
    {"question": "All jobs are:", "options": ["Easy", "Boring", "Important", "The same"], "correct": 2},
    {"question": "What should kids do to earn money?", "options": ["Work hard and help others", "Take money without asking", "Do nothing", "Break rules"], "correct": 0},
    {"question": "Doctors help people by:", "options": ["Making them sick", "Taking their money", "Helping sick people feel better", "Ignoring them"], "correct": 2}
  ]'
WHERE grade_level = 3 AND module_number = 3;

-- Continue with Grade 4 lessons...
UPDATE lessons SET 
  title = 'Saving Your Money',
  description = 'Learn why saving money is important and how to do it',
  article_content = '<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">The Power of Saving Money</h2>

<p>Saving money means keeping some of your money instead of spending it all right away. It''s like storing up money for something special in the future!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Why Should You Save Money?</h3>

<p>There are many great reasons to save your money:</p>
<ul style="color: white; margin-left: 20px;">
<li><strong>For emergencies:</strong> Sometimes unexpected things happen, like your bike breaks</li>
<li><strong>For goals:</strong> Maybe you want to buy something special that costs more than your allowance</li>
<li><strong>For the future:</strong> You might want to go to college or start a business someday</li>
<li><strong>To feel secure:</strong> Having money saved makes you feel more confident</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">How to Save Money</h3>

<p><strong>The 50-30-20 Rule for Kids:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li><strong>50% for needs:</strong> Things you must have</li>
<li><strong>30% for wants:</strong> Fun things you''d like</li>
<li><strong>20% for savings:</strong> Money to put away</li>
</ul>

<p>If you get $10 for allowance, try to save $2 of it!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Places to Keep Your Savings</h3>

<p><strong>Piggy Bank:</strong> A fun way to save coins and small bills at home</p>
<p><strong>Savings Jar:</strong> A clear jar where you can watch your money grow</p>
<p><strong>Bank Account:</strong> A safe place where the bank keeps your money and even pays you a little extra (called interest)</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Tips for Successful Saving</h3>

<ul style="color: white; margin-left: 20px;">
<li><strong>Set a goal:</strong> Decide what you''re saving for</li>
<li><strong>Save first:</strong> Put money in savings before spending on wants</li>
<li><strong>Track your progress:</strong> Keep track of how much you''ve saved</li>
<li><strong>Be patient:</strong> Saving takes time, but it''s worth it</li>
<li><strong>Celebrate milestones:</strong> Feel proud when you reach saving goals</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Making Saving Fun</h3>

<p>Create a savings chart and color in a section each time you add money. Set small goals along the way, like saving $25, then $50. When you reach your goal, you''ll feel so proud of yourself!</p>

<p>Remember: Every penny counts! Even small amounts add up over time.</p>
</div>',
  quiz_questions = '[
    {"question": "What does saving money mean?", "options": ["Spending all your money", "Keeping some money instead of spending it", "Losing your money", "Giving money away"], "correct": 1},
    {"question": "In the 50-30-20 rule, how much should you save?", "options": ["50%", "30%", "20%", "100%"], "correct": 2},
    {"question": "If you get $10 allowance, how much should you try to save?", "options": ["$1", "$2", "$5", "$10"], "correct": 1},
    {"question": "Which is a good reason to save money?", "options": ["To show off", "For emergencies", "To make others jealous", "To hide it forever"], "correct": 1},
    {"question": "What is interest?", "options": ["Money you owe", "Extra money the bank pays you", "Money you lose", "Money you spend"], "correct": 1},
    {"question": "When should you put money in savings?", "options": ["After spending on wants", "Before spending on wants", "Never", "Only on weekends"], "correct": 1},
    {"question": "Which helps make saving fun?", "options": ["Hiding your money", "Creating a savings chart", "Spending everything", "Forgetting about it"], "correct": 1},
    {"question": "Where is a safe place to keep large amounts of savings?", "options": ["Under your pillow", "In your pocket", "At a bank", "In your backpack"], "correct": 2},
    {"question": "What should you do to save successfully?", "options": ["Spend first, save later", "Save first, then spend on wants", "Never spend money", "Only save once a year"], "correct": 1},
    {"question": "Why does saving take patience?", "options": ["It is boring", "Money grows slowly over time", "Banks are slow", "It is too hard"], "correct": 1}
  ]'
WHERE grade_level = 4 AND module_number = 1;