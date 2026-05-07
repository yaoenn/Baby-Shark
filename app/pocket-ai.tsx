import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useApp } from './AppContext';
import { checkBudgetWithMockData } from './budgetAlert';

export default function AiPocket() {
  const { balance } = useApp();
  const hasShownAlerts = useRef(false);

  const pockets = [
    { id: 'food', name: '🍛 Food / Meals', percent: 0.3 },
    { id: 'transport', name: '🚆 Transport', percent: 0.2 },
    { id: 'entertainment', name: '🎮 Entertainment', percent: 0.15 },
    { id: 'essentials', name: '📚 Study / Essentials', percent: 0.15 },
    { id: 'savings', name: '💾 Savings', percent: 0.2 },
  ];

  // Show alerts automatically when screen loads (mock data)
  useEffect(() => {
     if (hasShownAlerts.current) return;

    const timeout = setTimeout(() => {
      pockets.forEach((pocket, index) => {
        setTimeout(() => {
          const totalBudget = balance * pocket.percent;
          const dailyLimit = totalBudget / 30;
          
          if (pocket.id !== 'savings') { // No alert for savings
            checkBudgetWithMockData(pocket.id, pocket.name, dailyLimit);
          }
        }, index * 3000); // Show every 0.8 seconds
      });
      hasShownAlerts.current = true; 
    }, 1000);
    return () => clearTimeout(timeout);
  }, [balance]);

  // Calculate display data
  const getSpendingStatus = (pocketId: string, dailyLimit: number) => {
    const mockSpending = {
      food: 5,
      transport: 15,
      entertainment: 4,
      essentials: 1,
      savings: 0,
    };
    const spent = mockSpending[pocketId as keyof typeof mockSpending] || 0;
    const percent = (spent / dailyLimit) * 100;
    
    if (percent >= 100) return '🔴 OVERBUDGET';
    if (percent >= 80) return '🟡 NEAR LIMIT';
    return '🟢 OK';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 AI Pocket Budget</Text>
      <Text style={styles.subtitle}>Mock spending data loaded automatically!</Text>

      {pockets.map((pocket) => {
        const totalBudget = balance * pocket.percent;
        const dailyLimit = totalBudget / 30;
        const status = getSpendingStatus(pocket.id, dailyLimit);
        const mockSpendingValue = {
          food: 5,
          transport: 15,
          entertainment: 4,
          essentials: 1,
          savings: 0,
        }[pocket.id];

        return (
          <View key={pocket.id} style={styles.card}>
            <Text style={styles.name}>{pocket.name}</Text>
            <Text style={styles.amount}>Total: RM {totalBudget.toFixed(2)}</Text>
            <Text style={styles.sub}>Daily Limit: RM {dailyLimit.toFixed(2)}</Text>
            
            {/* Show mock spending */}
            <Text style={styles.spent}>
              Today's Spending: RM {mockSpendingValue}
            </Text>
            
            <Text style={[
              styles.status,
              status === '🔴 OVERBUDGET' && styles.overbudget,
              status === '🟡 NEAR LIMIT' && styles.warning,
            ]}>
              {status}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
    paddingTop: 80,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#f59e0b',
    fontSize: 12,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  name: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  amount: { color: '#22c55e', fontSize: 16, marginTop: 5 },
  sub: { color: '#94a3b8', marginTop: 3, fontSize: 12 },
  spent: { color: '#cbd5e1', fontSize: 14, marginTop: 8, fontWeight: 'bold' },
  status: { 
    marginTop: 8, 
    fontSize: 14, 
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  overbudget: { 
    color: '#ef4444',
    backgroundColor: '#7f1d1d',
  },
  warning: { 
    color: '#f59e0b',
    backgroundColor: '#451a03',
  },
});


 


