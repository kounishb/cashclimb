-- Complete the final 3 lessons with financial literacy content

-- Grade 7 Module 2
UPDATE lessons SET 
  title = 'Investment Fundamentals',
  description = 'Learn the basics of investing and how to grow your money over time',
  article_content = '<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Investment Fundamentals</h2>

<p>Investing is when you put money into something with the hope that it will grow in value over time. It is like planting seeds that you hope will grow into bigger plants that produce fruit!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What is Investing?</h3>

<p>Investing means using your money to buy something that you believe will be worth more in the future. The goal is to make your money work for you, rather than just sitting in a savings account.</p>

<p><strong>Key investing concepts:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li><strong>Principal:</strong> The original amount of money you invest</li>
<li><strong>Return:</strong> The profit you make from your investment</li>
<li><strong>Risk:</strong> The chance that your investment might lose value</li>
<li><strong>Diversification:</strong> Spreading your money across different investments</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Types of Investments</h3>

<p><strong>Stocks:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Buying a small piece of ownership in a company</li>
<li>If the company does well, your stock value goes up</li>
<li>Companies like Apple, Disney, or Nike</li>
<li>Higher potential returns but more risky</li>
</ul>

<p><strong>Bonds:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Lending money to companies or governments</li>
<li>They pay you back with interest over time</li>
<li>Generally safer but lower returns than stocks</li>
</ul>

<p><strong>Mutual Funds:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Pool money with other investors</li>
<li>Professional managers invest in many different stocks or bonds</li>
<li>Good way to diversify with less money</li>
</ul>

<p><strong>Real Estate:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Buying property like houses or buildings</li>
<li>Can earn money from rent and property value increases</li>
<li>Usually requires a lot of money to start</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Risk and Return</h3>

<p>All investments involve risk - the possibility that you could lose money. Generally:</p>

<ul style="color: white; margin-left: 20px;">
<li><strong>Higher Risk = Higher Potential Return:</strong> Stocks can make more money but are riskier</li>
<li><strong>Lower Risk = Lower Potential Return:</strong> Savings accounts are safe but earn less</li>
</ul>

<p><strong>Risk tolerance</strong> is how comfortable you are with the possibility of losing money. Young people can usually take more risks because they have more time to recover from losses.</p>

<h3 style="color: white; margin: 20px 0 10px 0;">The Power of Starting Early</h3>

<p>Time is your biggest advantage when investing! Here is why:</p>

<p><strong>Example: Two investors starting at different ages</strong></p>
<ul style="color: white; margin-left: 20px;">
<li><strong>Sarah starts at 20:</strong> Invests $1,000/year for 10 years, then stops</li>
<li><strong>Mike starts at 30:</strong> Invests $1,000/year for 30 years</li>
<li>At age 60, Sarah has more money despite investing less!</li>
</ul>

<p>This happens because of compound growth - your returns earn returns!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Smart Investing Strategies</h3>

<ul style="color: white; margin-left: 20px;">
<li><strong>Start small:</strong> You do not need a lot of money to begin</li>
<li><strong>Diversify:</strong> Do not put all your money in one investment</li>
<li><strong>Think long-term:</strong> Good investments grow over years, not days</li>
<li><strong>Keep learning:</strong> Read about companies and economic trends</li>
<li><strong>Stay calm:</strong> Do not panic when investments go down temporarily</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Investment Mistakes to Avoid</h3>

<ul style="color: white; margin-left: 20px;">
<li>Trying to get rich quick with risky investments</li>
<li>Putting all your money in one stock or investment</li>
<li>Buying and selling constantly based on emotions</li>
<li>Not doing research before investing</li>
<li>Waiting too long to start investing</li>
</ul>

<p>Remember: Investing is about patience and making smart, informed decisions. Start learning now, even if you start investing small amounts later!</p>
</div>',
  quiz_questions = '[
    {"question": "What is investing?", "options": ["Spending money immediately", "Putting money into something hoping it grows", "Hiding money under your bed", "Giving money away"], "correct": 1},
    {"question": "What is the original amount of money you invest called?", "options": ["Return", "Principal", "Risk", "Dividend"], "correct": 1},
    {"question": "Which investment type means buying a piece of ownership in a company?", "options": ["Bonds", "Stocks", "Savings account", "Real estate"], "correct": 1},
    {"question": "What is diversification?", "options": ["Putting all money in one investment", "Spreading money across different investments", "Only investing in stocks", "Never investing"], "correct": 1},
    {"question": "Generally, investments with higher risk have:", "options": ["Lower potential returns", "Higher potential returns", "No returns", "Guaranteed returns"], "correct": 1},
    {"question": "Why is starting to invest early important?", "options": ["You have less time", "Compound growth works better over time", "It is required by law", "Early investments are safer"], "correct": 1},
    {"question": "What are bonds?", "options": ["Buying ownership in companies", "Lending money to companies or governments", "Buying real estate", "Keeping money in savings"], "correct": 1},
    {"question": "What should you do when your investments temporarily go down?", "options": ["Panic and sell everything", "Borrow more money to invest", "Stay calm and think long-term", "Never invest again"], "correct": 2},
    {"question": "What is a mutual fund?", "options": ["A single stock", "Pooling money with others for professional management", "A savings account", "A type of loan"], "correct": 1},
    {"question": "What is a major mistake new investors make?", "options": ["Starting small", "Diversifying investments", "Trying to get rich quick", "Learning about investments"], "correct": 2}
  ]'
WHERE grade_level = 7 AND module_number = 2;

-- Grade 8 lessons
UPDATE lessons SET 
  title = 'Advanced Budgeting and Financial Planning',
  description = 'Learn advanced budgeting techniques and long-term financial planning',
  article_content = '<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Advanced Budgeting and Financial Planning</h2>

<p>As you prepare for high school and eventually college, your financial planning needs to become more sophisticated. Let us explore advanced budgeting techniques and long-term financial planning strategies!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">Beyond Basic Budgeting</h3>

<p>You have learned the 50-30-20 rule, but now let us look at more detailed budgeting approaches:</p>

<p><strong>Zero-Based Budgeting:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Every dollar gets assigned a purpose</li>
<li>Income minus expenses should equal zero</li>
<li>Forces you to be intentional with every dollar</li>
</ul>

<p><strong>Envelope Method:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Separate cash into different envelopes for different categories</li>
<li>When an envelope is empty, you are done spending in that category</li>
<li>Helps prevent overspending</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Emergency Fund Planning</h3>

<p>An emergency fund is money set aside for unexpected expenses:</p>

<ul style="color: white; margin-left: 20px;">
<li><strong>Goal:</strong> 3-6 months of expenses for adults, $100-500 for teens</li>
<li><strong>Use for:</strong> Car repairs, medical bills, job loss, unexpected school expenses</li>
<li><strong>Keep it separate:</strong> In a different account so you are not tempted to spend it</li>
<li><strong>Build gradually:</strong> Start with $25, then $50, then $100</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Planning for Major Goals</h3>

<p><strong>College Planning:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Research college costs (tuition, room, board, books)</li>
<li>Explore scholarships and financial aid options</li>
<li>Consider community college for first two years</li>
<li>Look into 529 college savings plans</li>
</ul>

<p><strong>First Car Planning:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Save for down payment (at least 20% of car price)</li>
<li>Budget for insurance (can be expensive for teens)</li>
<li>Plan for maintenance, gas, and repairs</li>
<li>Consider buying used vs. new</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Income Tracking and Optimization</h3>

<p><strong>Multiple Income Streams:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Part-time job</li>
<li>Freelance work (tutoring, pet sitting)</li>
<li>Small business or side hustle</li>
<li>Passive income (investments, royalties)</li>
</ul>

<p><strong>Income Optimization:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Negotiate allowance increases based on additional responsibilities</li>
<li>Look for higher-paying opportunities</li>
<li>Develop skills that increase your earning potential</li>
<li>Track which activities give you the best return on time invested</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Advanced Savings Strategies</h3>

<p><strong>Automatic Savings:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Set up automatic transfers to savings</li>
<li>Pay yourself first before other expenses</li>
<li>Use apps that round up purchases and save the change</li>
</ul>

<p><strong>Goal-Based Savings:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Create separate savings accounts for different goals</li>
<li>Set specific timelines and amounts for each goal</li>
<li>Track progress regularly and celebrate milestones</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Understanding Financial Products</h3>

<p><strong>Bank Account Types:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li><strong>High-yield savings:</strong> Earn more interest than regular savings</li>
<li><strong>Money market accounts:</strong> Higher interest but may require higher balances</li>
<li><strong>Certificates of Deposit (CDs):</strong> Lock in higher rates for specific time periods</li>
</ul>

<p><strong>Credit Building:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Understand credit scores and reports</li>
<li>Learn about secured credit cards for building credit</li>
<li>Know the importance of paying bills on time</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Financial Planning Tools</h3>

<ul style="color: white; margin-left: 20px;">
<li><strong>Budgeting apps:</strong> Mint, YNAB, Personal Capital</li>
<li><strong>Spreadsheet templates:</strong> Google Sheets or Excel</li>
<li><strong>Goal tracking apps:</strong> Visual progress toward financial goals</li>
<li><strong>Investment calculators:</strong> See how money grows over time</li>
</ul>

<p>Remember: Advanced financial planning is about being proactive and strategic with your money. The habits you build now will serve you well throughout your life!</p>
</div>',
  quiz_questions = '[
    {"question": "What is zero-based budgeting?", "options": ["Having zero money", "Every dollar gets assigned a purpose", "Never spending money", "Only using cash"], "correct": 1},
    {"question": "How much should a teen aim to have in an emergency fund?", "options": ["$10", "$100-500", "$1000-5000", "$10,000"], "correct": 1},
    {"question": "What is a 529 plan used for?", "options": ["Buying a car", "College savings", "Emergency fund", "Vacation savings"], "correct": 1},
    {"question": "What does it mean to pay yourself first?", "options": ["Buy treats before necessities", "Put money in savings before other expenses", "Only pay for your own things", "Never pay bills"], "correct": 1},
    {"question": "What is a high-yield savings account?", "options": ["An account that loses money", "An account that earns more interest", "An account only for rich people", "An account with no fees"], "correct": 1},
    {"question": "When buying a car, what should you save for the down payment?", "options": ["At least 10%", "At least 20%", "At least 50%", "100% of the price"], "correct": 1},
    {"question": "What is passive income?", "options": ["Money from your main job", "Money that requires constant work", "Money earned without active work", "Money from your parents"], "correct": 2},
    {"question": "What is the envelope method?", "options": ["Mailing your budget", "Separating cash into categories", "Hiding money in envelopes", "A type of bank account"], "correct": 1},
    {"question": "What should you do to build credit as a young person?", "options": ["Avoid all debt", "Pay bills on time", "Use as much credit as possible", "Never check your credit score"], "correct": 1},
    {"question": "Why is it important to have multiple income streams?", "options": ["To confuse the tax system", "To increase financial security and opportunities", "To work more hours", "To spend more money"], "correct": 1}
  ]'
WHERE grade_level = 8 AND module_number = 1;

UPDATE lessons SET 
  title = 'Economic Systems and Personal Finance',
  description = 'Understand how economic systems work and their impact on personal finance',
  article_content = '<div style="color: white; font-size: 16px; line-height: 1.6; padding: 20px;">
<h2 style="color: white; margin-bottom: 20px;">Economic Systems and Personal Finance</h2>

<p>Understanding how economic systems work helps you make better personal financial decisions. The economy affects everything from job opportunities to the prices you pay for goods and services!</p>

<h3 style="color: white; margin: 20px 0 10px 0;">What is an Economic System?</h3>

<p>An economic system is how a society organizes the production, distribution, and consumption of goods and services. It determines:</p>

<ul style="color: white; margin-left: 20px;">
<li>What goods and services are produced</li>
<li>How they are produced</li>
<li>Who gets to consume them</li>
<li>How prices are determined</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Types of Economic Systems</h3>

<p><strong>Market Economy (Capitalism):</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Private individuals and businesses own most resources</li>
<li>Supply and demand determine prices</li>
<li>Competition drives innovation and efficiency</li>
<li>Examples: United States, most developed countries</li>
</ul>

<p><strong>Command Economy:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Government controls most economic decisions</li>
<li>Central planning determines production and prices</li>
<li>Limited private ownership</li>
<li>Examples: North Korea, former Soviet Union</li>
</ul>

<p><strong>Mixed Economy:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Combines elements of market and command systems</li>
<li>Some industries are privately owned, others government-controlled</li>
<li>Most modern economies are mixed</li>
<li>Examples: Canada, many European countries</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Supply and Demand</h3>

<p>Supply and demand are fundamental forces in market economies:</p>

<p><strong>Supply:</strong> How much of a product or service is available</p>
<p><strong>Demand:</strong> How much people want that product or service</p>

<p><strong>How they interact:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>High demand + Low supply = Higher prices (concert tickets)</li>
<li>Low demand + High supply = Lower prices (last season fashion)</li>
<li>Balanced supply and demand = Stable prices</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Economic Cycles and Personal Finance</h3>

<p>Economies go through cycles that affect your personal finances:</p>

<p><strong>Economic Expansion:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>More jobs available</li>
<li>Wages tend to increase</li>
<li>Stock market generally rises</li>
<li>Good time to invest and take calculated risks</li>
</ul>

<p><strong>Economic Recession:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Fewer jobs available</li>
<li>Wages may stagnate or decrease</li>
<li>Stock market generally falls</li>
<li>Important to have emergency funds and avoid unnecessary debt</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Inflation and Your Money</h3>

<p>Inflation is when the general level of prices rises over time:</p>

<ul style="color: white; margin-left: 20px;">
<li><strong>Effect:</strong> Your money buys less than it used to</li>
<li><strong>Example:</strong> If inflation is 3% per year, a $100 item will cost $103 next year</li>
<li><strong>Protection:</strong> Invest in assets that grow faster than inflation</li>
<li><strong>Salary negotiations:</strong> Ask for raises that at least match inflation</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Interest Rates and the Economy</h3>

<p>Interest rates affect many aspects of personal finance:</p>

<p><strong>When interest rates are LOW:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>Cheaper to borrow money (loans, mortgages)</li>
<li>Lower returns on savings accounts</li>
<li>Stock market often performs well</li>
<li>Good time to make large purchases with financing</li>
</ul>

<p><strong>When interest rates are HIGH:</strong></p>
<ul style="color: white; margin-left: 20px;">
<li>More expensive to borrow money</li>
<li>Higher returns on savings accounts</li>
<li>Stock market may struggle</li>
<li>Good time to save money in interest-bearing accounts</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Global Economy and You</h3>

<p>We live in a global economy where events worldwide can affect your personal finances:</p>

<ul style="color: white; margin-left: 20px;">
<li><strong>International trade:</strong> Affects prices of goods you buy</li>
<li><strong>Currency exchange:</strong> Impacts travel costs and imported goods</li>
<li><strong>Global events:</strong> Wars, pandemics, or economic crises in other countries can affect our economy</li>
<li><strong>Investment opportunities:</strong> You can invest in international markets</li>
</ul>

<h3 style="color: white; margin: 20px 0 10px 0;">Making Smart Financial Decisions</h3>

<p>Understanding economics helps you make better personal financial decisions:</p>

<ul style="color: white; margin-left: 20px;">
<li><strong>Career planning:</strong> Choose fields that are growing in the economy</li>
<li><strong>Investment timing:</strong> Understand market cycles for better investment decisions</li>
<li><strong>Major purchases:</strong> Time large purchases based on economic conditions</li>
<li><strong>Emergency planning:</strong> Prepare for economic downturns</li>
</ul>

<p>Remember: You cannot control the economy, but understanding how it works helps you make smarter financial decisions and adapt to changing conditions!</p>
</div>',
  quiz_questions = '[
    {"question": "What is an economic system?", "options": ["A type of bank account", "How society organizes production and consumption", "A computer program", "A type of investment"], "correct": 1},
    {"question": "In a market economy, who determines prices?", "options": ["The government only", "Supply and demand", "Banks only", "No one"], "correct": 1},
    {"question": "What happens when demand is high and supply is low?", "options": ["Prices go down", "Prices go up", "Nothing changes", "Products disappear"], "correct": 1},
    {"question": "What is inflation?", "options": ["When prices generally rise over time", "When prices fall", "When money disappears", "When banks close"], "correct": 0},
    {"question": "During a recession, what should you prioritize?", "options": ["Spending more money", "Taking big risks", "Having emergency funds", "Ignoring your budget"], "correct": 2},
    {"question": "When interest rates are low, what happens?", "options": ["It is more expensive to borrow", "It is cheaper to borrow", "Nothing changes", "Banks close"], "correct": 1},
    {"question": "What type of economy combines market and government control?", "options": ["Command economy", "Market economy", "Mixed economy", "No economy"], "correct": 2},
    {"question": "How does the global economy affect you?", "options": ["It does not affect individuals", "It affects prices and investment opportunities", "Only rich people are affected", "It only affects other countries"], "correct": 1},
    {"question": "During economic expansion, what typically happens?", "options": ["Fewer jobs are available", "More jobs are available", "No one works", "The economy stops"], "correct": 1},
    {"question": "Why is understanding economics important for personal finance?", "options": ["It is not important", "It helps you make better financial decisions", "It only matters for economists", "It is just academic theory"], "correct": 1}
  ]'
WHERE grade_level = 8 AND module_number = 2;