// app/budgetAlert.ts
import { Alert } from 'react-native';

// Mock spending data (simulates user's daily spending)
const mockDailySpending = {
  food: 5,        // Already spent RM5 today
  transport: 15,   // Already spent RM15 today
  entertainment: 4, // Already spent RM0 today
  essentials: 1,  // Already spent RM1 today
  savings: 0,      // Savings doesn't get alerts
};

export const checkBudgetWithMockData = (pocketId: string, categoryName: string, dailyLimit: number) => {
  // Get mock spent amount
  const spent = mockDailySpending[pocketId as keyof typeof mockDailySpending] || 0;
  const percent = (spent / dailyLimit) * 100;
  
  // Show alert based on percentage
  if (percent >= 100) {
    Alert.alert(
      '❌ OVERBUDGET!',
      `${categoryName}: RM${spent} / RM${Math.round(dailyLimit)} daily limit (${Math.round(percent)}%)`,
      [{ text: 'OK' }]
    );
    return 'overbudget';
  } 
  else if (percent >= 80) {
    Alert.alert(
      '⚠️ Almost Reaching Limit!',
      `${categoryName}: RM${spent} / RM${Math.round(dailyLimit)} (${Math.round(percent)}%)`,
      [{ text: 'Got it' }]
    );
    return 'warning';
  }
  
  return 'good';
};