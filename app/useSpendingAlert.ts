// app/useSpendingAlert.ts
import { useState } from 'react';
import { checkSpendingAlert } from './alertHelper';

export const useSpendingAlert = () => {
  const [spendingHistory, setSpendingHistory] = useState<{[key: string]: number}>({});

  const trackSpending = (
    pocketId: string,
    categoryName: string,
    spentAmount: number,
    dailyLimit: number
  ) => {
    // Track in history (optional)
    const currentSpent = spendingHistory[pocketId] || 0;
    const newTotal = currentSpent + spentAmount;
    
    setSpendingHistory({
      ...spendingHistory,
      [pocketId]: newTotal
    });
    
    // Trigger the alert
    return checkSpendingAlert({
      categoryName,
      spentAmount: newTotal,
      dailyLimit,
      showNoAlertMessage: false
    });
  };

  const getCurrentSpent = (pocketId: string): number => {
    return spendingHistory[pocketId] || 0;
  };

  const resetSpending = (pocketId: string) => {
    setSpendingHistory({
      ...spendingHistory,
      [pocketId]: 0
    });
  };

  return {
    trackSpending,
    getCurrentSpent,
    resetSpending,
    spendingHistory
  };
};