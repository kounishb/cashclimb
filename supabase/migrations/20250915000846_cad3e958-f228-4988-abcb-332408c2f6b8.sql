-- Continue updating remaining lessons for grades 6-8 with financial literacy content

-- Grade 6 lessons
UPDATE lessons SET 
  title = 'Understanding Credit and Loans',
  description = 'Learn what credit is, how loans work, and why they matter',
  article_content = '<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Understanding Credit and Loans</h2>

<p>As you get older, you will hear adults talk about credit and loans. These are important financial tools that can help people buy things they cannot afford all at once, but they come with responsibilities!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What is Credit?</h3>

<p>Credit is the ability to borrow money with the promise to pay it back later. When someone has good credit, it means banks and lenders trust them to repay borrowed money.</p>

<p>Think of credit like borrowing a video game from a friend. If you always return games in good condition and on time, your friend will keep lending to you. If you do not, they will stop!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What is a Loan?</h3>

<p>A loan is when you borrow a specific amount of money and agree to pay it back, usually with extra money called interest.</p>

<p><strong>Common types of loans:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li><strong>Car loans:</strong> To buy a vehicle</li>
<li><strong>Home loans (mortgages):</strong> To buy a house</li>
<li><strong>Student loans:</strong> To pay for college</li>
<li><strong>Personal loans:</strong> For various needs</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">How Interest Works</h3>

<p>Interest is the cost of borrowing money. It is like a rental fee for using someone elses money.</p>

<p><strong>Simple example:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>You borrow $100 from the bank</li>
<li>The interest rate is 5% per year</li>
<li>After one year, you owe $105 ($100 + $5 interest)</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Building Good Credit</h3>

<p>Good credit habits to learn now:</p>
<ul style="color: white; margin-left: 20px;">
<li><strong>Pay back money you borrow:</strong> Always return what you owe</li>
<li><strong>Pay on time:</strong> Do not be late with payments</li>
<li><strong>Do not borrow more than you can repay:</strong> Be realistic about what you can afford</li>
<li><strong>Keep promises:</strong> If you say you will pay someone back, do it!</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Credit Cards</h3>

<p>A credit card lets you borrow small amounts of money to buy things, with the promise to pay it back later. However, if you do not pay the full amount each month, you have to pay interest.</p>

<p><strong>Credit card rules:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Only spend what you can afford to pay back</li>
<li>Pay the full balance every month if possible</li>
<li>Never share your credit card information</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Why Credit Matters</h3>

<p>Good credit helps you:</p>
<ul style="color: white; margin-left: 20px;">
<li>Buy a car or house when you are older</li>
<li>Get better interest rates (pay less to borrow)</li>
<li>Rent an apartment</li>
<li>Sometimes even get certain jobs</li>
</ul>

<p>Remember: Credit is a powerful tool, but it must be used responsibly. Start building good money habits now!</p>
</div>',
  quiz_questions = '[
    {"question": "What is credit?", "options": ["Free money", "The ability to borrow money with a promise to pay back", "A type of savings account", "Money you earn"], "correct": 1},
    {"question": "What is interest?", "options": ["Free money", "The cost of borrowing money", "A type of loan", "Money you save"], "correct": 1},
    {"question": "If you borrow $100 with 5% interest for one year, how much do you owe?", "options": ["$95", "$100", "$105", "$150"], "correct": 2},
    {"question": "What is a mortgage?", "options": ["A car loan", "A loan to buy a house", "A credit card", "Free money"], "correct": 1},
    {"question": "How can you build good credit?", "options": ["Never pay back money", "Pay back money on time", "Borrow as much as possible", "Ignore payments"], "correct": 1},
    {"question": "What should you do with a credit card balance?", "options": ["Never pay it", "Pay only the minimum", "Pay the full balance if possible", "Give the card away"], "correct": 2},
    {"question": "Why does good credit matter?", "options": ["It helps you borrow money in the future", "It makes you rich", "It gives you free money", "It does not matter"], "correct": 0},
    {"question": "What is like borrowing a game from a friend?", "options": ["Getting a job", "Building credit trust", "Saving money", "Spending money"], "correct": 1},
    {"question": "What type of loan helps pay for college?", "options": ["Car loan", "Home loan", "Student loan", "Credit card"], "correct": 2},
    {"question": "What should you never do with credit?", "options": ["Pay it back", "Use it responsibly", "Borrow more than you can repay", "Read the terms"], "correct": 2}
  ]'
WHERE grade_level = 6 AND module_number = 1;

UPDATE lessons SET 
  title = 'Interest and Compound Growth',
  description = 'Discover how interest can work for you when saving and against you when borrowing',
  article_content = '<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">The Power of Interest and Compound Growth</h2>

<p>Interest is one of the most important concepts in finance. It can work FOR you when you save money, or AGAINST you when you borrow money. Understanding interest can help you make smarter financial decisions!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What is Interest?</h3>

<p>Interest is money that is paid for the use of borrowed money. There are two sides to interest:</p>

<ul style="color: white; margin-left: 20px;">
<li><strong>When you save:</strong> The bank pays YOU interest for keeping your money there</li>
<li><strong>When you borrow:</strong> YOU pay interest to the bank for lending you money</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Simple Interest vs. Compound Interest</h3>

<p><strong>Simple Interest:</strong> Interest calculated only on the original amount</p>
<p>Example: $100 at 5% simple interest for 3 years = $100 + ($5 × 3) = $115</p>

<p><strong>Compound Interest:</strong> Interest calculated on both the original amount AND previously earned interest</p>
<p>Example: $100 at 5% compound interest for 3 years:</p>
<ul style="color: white; margin-left: 20px;">
<li>Year 1: $100 + $5 = $105</li>
<li>Year 2: $105 + $5.25 = $110.25</li>
<li>Year 3: $110.25 + $5.51 = $115.76</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">The Magic of Compound Interest</h3>

<p>Albert Einstein reportedly called compound interest "the eighth wonder of the world." Here is why it is so powerful:</p>

<p><strong>Example: Saving $100 per year at 7% compound interest:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>After 10 years: $1,381</li>
<li>After 20 years: $4,100</li>
<li>After 30 years: $9,434</li>
</ul>

<p>Notice how your money grows faster and faster over time!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Interest Rates and Time</h3>

<p>Two factors make compound interest more powerful:</p>

<p><strong>Higher Interest Rates:</strong> Even small differences matter a lot over time</p>
<ul style="color: white; margin-left: 20px;">
<li>$1,000 at 5% for 20 years = $2,653</li>
<li>$1,000 at 7% for 20 years = $3,870</li>
</ul>

<p><strong>More Time:</strong> Starting early gives compound interest more time to work</p>
<ul style="color: white; margin-left: 20px;">
<li>Save $1,000 at age 20, worth $21,724 at age 65</li>
<li>Save $1,000 at age 30, worth $10,677 at age 65</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">When Interest Works Against You</h3>

<p>Compound interest can also work against you with debt:</p>

<p>If you have a $1,000 credit card balance at 18% interest and only pay the minimum:</p>
<ul style="color: white; margin-left: 20px;">
<li>It could take over 10 years to pay off</li>
<li>You would pay more than $2,000 total</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Making Interest Work for You</h3>

<ul style="color: white; margin-left: 20px;">
<li><strong>Start saving early:</strong> Even small amounts grow significantly over time</li>
<li><strong>Find higher interest rates:</strong> Shop around for the best savings account rates</li>
<li><strong>Avoid high-interest debt:</strong> Pay off credit cards quickly</li>
<li><strong>Be patient:</strong> Compound interest works best over long periods</li>
</ul>

<p>Remember: Time is your best friend when it comes to compound interest. The earlier you start saving, the more your money can grow!</p>
</div>',
  quiz_questions = '[
    {"question": "What happens when you save money in a bank?", "options": ["You pay the bank interest", "The bank pays you interest", "Nothing happens", "You lose money"], "correct": 1},
    {"question": "What is compound interest?", "options": ["Interest only on the original amount", "Interest on the original amount plus previous interest", "No interest at all", "Interest you pay to banks"], "correct": 1},
    {"question": "With compound interest, $100 at 5% for 3 years equals approximately:", "options": ["$115.00", "$115.76", "$120.00", "$125.00"], "correct": 1},
    {"question": "What did Einstein reportedly call compound interest?", "options": ["A waste of time", "The eighth wonder of the world", "Too complicated", "Only for rich people"], "correct": 1},
    {"question": "What makes compound interest more powerful?", "options": ["Higher rates and more time", "Lower rates and less time", "Only higher rates", "Only more time"], "correct": 0},
    {"question": "If you start saving earlier, what happens?", "options": ["You save less money", "Your money has more time to grow", "Interest rates go down", "Nothing changes"], "correct": 1},
    {"question": "How can high interest rates hurt you?", "options": ["When you save money", "When you borrow money", "They never hurt", "Only on weekends"], "correct": 1},
    {"question": "What should you do with high-interest debt like credit cards?", "options": ["Pay only the minimum", "Ignore it", "Pay it off quickly", "Borrow more money"], "correct": 2},
    {"question": "A $1,000 credit card balance at 18% interest could cost you:", "options": ["Exactly $1,000", "Less than $1,000", "More than $2,000 if you pay minimums", "$1,200"], "correct": 2},
    {"question": "When is compound interest most powerful?", "options": ["Over short periods", "Over long periods", "Only on weekends", "Never"], "correct": 1}
  ]'
WHERE grade_level = 6 AND module_number = 2;

-- Grade 7 lessons
UPDATE lessons SET 
  title = 'Introduction to Entrepreneurship',
  description = 'Learn about starting your own business and becoming an entrepreneur',
  article_content = '<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Introduction to Entrepreneurship</h2>

<p>An entrepreneur is someone who starts their own business to solve problems or provide services that people need. Many successful businesses started with young people who had great ideas!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What is Entrepreneurship?</h3>

<p>Entrepreneurship is the process of:</p>
<ul style="color: white; margin-left: 20px;">
<li>Identifying a problem or need in the market</li>
<li>Creating a solution (product or service)</li>
<li>Starting a business to provide that solution</li>
<li>Taking risks to make the business successful</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Famous Young Entrepreneurs</h3>

<p><strong>Examples of people who started young:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li><strong>Mark Zuckerberg:</strong> Started Facebook in college</li>
<li><strong>Bill Gates:</strong> Started Microsoft as a teenager</li>
<li><strong>Moziah Bridges:</strong> Started Mo Bows tie company at age 9</li>
<li><strong>Ryan Kaji:</strong> Started Ryan ToysReview YouTube channel at age 3</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Types of Businesses You Could Start</h3>

<p><strong>Service Businesses:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Tutoring younger students</li>
<li>Pet sitting or dog walking</li>
<li>Lawn mowing or snow shoveling</li>
<li>House cleaning or organizing</li>
</ul>

<p><strong>Product Businesses:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Homemade crafts or jewelry</li>
<li>Baked goods</li>
<li>Customized items</li>
<li>Reselling items online</li>
</ul>

<p><strong>Digital Businesses:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>YouTube channel</li>
<li>App development</li>
<li>Online tutoring</li>
<li>Social media management</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Steps to Start a Business</h3>

<p><strong>1. Find a Problem to Solve</strong></p>
<p>Look for things that annoy people or needs that are not being met</p>

<p><strong>2. Research Your Idea</strong></p>
<p>Make sure people actually want your solution and will pay for it</p>

<p><strong>3. Create a Simple Business Plan</strong></p>
<p>Write down what you will sell, who will buy it, and how you will make money</p>

<p><strong>4. Start Small</strong></p>
<p>Test your idea with friends and family before investing much money</p>

<p><strong>5. Learn and Improve</strong></p>
<p>Listen to feedback and make your product or service better</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Entrepreneurial Skills</h3>

<p>Important skills for entrepreneurs:</p>
<ul style="color: white; margin-left: 20px;">
<li><strong>Creativity:</strong> Coming up with new ideas</li>
<li><strong>Problem-solving:</strong> Finding solutions to challenges</li>
<li><strong>Communication:</strong> Explaining your ideas clearly</li>
<li><strong>Persistence:</strong> Not giving up when things get tough</li>
<li><strong>Financial literacy:</strong> Understanding money and profits</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Risks and Rewards</h3>

<p><strong>Risks:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Your business might not succeed</li>
<li>You might lose money you invest</li>
<li>It requires hard work and time</li>
</ul>

<p><strong>Rewards:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Be your own boss</li>
<li>Potentially earn more money</li>
<li>Help solve problems for others</li>
<li>Learn valuable life skills</li>
</ul>

<p>Remember: Every successful entrepreneur started with just an idea. The key is to start small, learn from mistakes, and keep improving!</p>
</div>',
  quiz_questions = '[
    {"question": "What is an entrepreneur?", "options": ["Someone who works for others", "Someone who starts their own business", "Someone who only saves money", "Someone who never takes risks"], "correct": 1},
    {"question": "What is the first step in starting a business?", "options": ["Spend lots of money", "Find a problem to solve", "Quit school", "Buy expensive equipment"], "correct": 1},
    {"question": "Which is an example of a service business?", "options": ["Selling homemade cookies", "Tutoring younger students", "Making jewelry", "Creating an app"], "correct": 1},
    {"question": "What should you do before investing much money in your business idea?", "options": ["Quit your job", "Test it with friends and family", "Buy expensive equipment", "Move to another city"], "correct": 1},
    {"question": "Which famous entrepreneur started Facebook?", "options": ["Bill Gates", "Ryan Kaji", "Mark Zuckerberg", "Moziah Bridges"], "correct": 2},
    {"question": "What is an important entrepreneurial skill?", "options": ["Never listening to others", "Being creative and persistent", "Avoiding all risks", "Working alone always"], "correct": 1},
    {"question": "What is a risk of starting a business?", "options": ["You might become famous", "Your business might not succeed", "You will definitely get rich", "Nothing bad can happen"], "correct": 1},
    {"question": "What is a reward of entrepreneurship?", "options": ["You never have to work", "You can be your own boss", "You get free money", "You never face challenges"], "correct": 1},
    {"question": "How should you start a new business?", "options": ["Spend all your money immediately", "Start small and test your idea", "Never ask for advice", "Copy exactly what others do"], "correct": 1},
    {"question": "What should you do when you receive feedback about your business?", "options": ["Ignore it completely", "Get angry at customers", "Listen and improve your product", "Give up immediately"], "correct": 2}
  ]'
WHERE grade_level = 7 AND module_number = 1;