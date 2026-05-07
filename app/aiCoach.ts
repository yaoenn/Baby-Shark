export const getAIAdvice = async (prompt: string) => {
  // simulate delay like real AI
  await new Promise(resolve => setTimeout(resolve, 1500));

  return `
🤖 AI FINANCIAL COACH (DEMO)

📊 Analysis:
You are spending a large portion on Food and Entertainment compared to Transport.

⚠️ Problem Areas:
- Food spending is quite high
- Entertainment may be affecting your savings

💡 Improvement Tips:
1. Set a daily food limit
2. Reduce entertainment spending by 20%
3. Track every small expense

🔥 Motivation:
You're doing well! Small changes will lead to big savings over time.
`;
};