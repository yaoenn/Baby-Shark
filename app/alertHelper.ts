// app/alertHelper.ts
import { Alert } from 'react-native';

/**
 * Spending Alert Helper
 * Use this function to check spending against daily limits
  * and show appropriate alerts to the user. 
 */

type SpendingAlertProps = {
  categoryName: string;
  spentAmount: number;
  dailyLimit: number;
  showNoAlertMessage?: boolean; // Optional: show "good" message
};

export const checkSpendingAlert = ({
  categoryName,
  spentAmount,
  dailyLimit,
  showNoAlertMessage = false
}: SpendingAlertProps): string => {
  
  const percentage = (spentAmount / dailyLimit) * 100;
  const percentageRounded = Math.round(percentage);
  
  // ✅ IF ≥ 100% of daily limit
  if (percentage >= 100) {
    Alert.alert(
      '❌ YOU OVERBUDGET!',
      `${categoryName}: You've spent RM ${spentAmount.toFixed(2)} / RM ${dailyLimit.toFixed(2)} daily limit (${percentageRounded}%)`
    );
    return 'overbudget';
  }
  
  // ⚠️ IF ≥ 80% of daily limit
  if (percentage >= 80) {
    Alert.alert(
      '⚠️ Almost reaching limit',
      `${categoryName}: You've spent RM ${spentAmount.toFixed(2)} / RM ${dailyLimit.toFixed(2)} (${percentageRounded}% of limit)`
    );
    return 'warning';
  }
  
  // ✅ ELSE: Normal spending (below 80%)
  if (showNoAlertMessage) {
    Alert.alert(
      '✅ Good Progress',
      `Good! You have currently spent ${percentageRounded}% of your ${categoryName} daily limit`
    );
  } else {
    // No alert - just return the percentage
    console.log(`✅ ${categoryName}: Good, you have currently spent ${percentageRounded}%`);
  }
  
  return 'good';
};

// Helper function to calculate daily limit from total balance
export const calculateDailyLimit = (totalBalance: number, daysInMonth: number = 30): number => {
  return totalBalance / daysInMonth;
};

// Helper function to calculate percentage
export const calculatePercentage = (spent: number, limit: number): number => {
  if (limit === 0) return 0;
  return (spent / limit) * 100;
};
