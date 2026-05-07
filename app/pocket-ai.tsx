import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from './AppContext';
import { AlertTester } from './AlertTester';
import { useSpendingAlert } from './useSpendingAlert';

export default function AiPocket() {
  const { balance } = useApp();
  const { trackSpending, getCurrentSpent, resetSpending } = useSpendingAlert();
  const foodDailyLimit = 33.33;
  const foodPocketId = 'food_001';

  const pockets = [
    { name: '🍛 Food / Meals', percent: 0.3 },
    { name: '🚆 Transport', percent: 0.2 },
    { name: '🎮 Entertainment', percent: 0.15 },
    { name: '📚 Study / Essentials', percent: 0.15 },
    { name: '💾 Savings', percent: 0.2 },
  ];

  return (

    <View style={styles.container}>
      <Text style={styles.title}>🤖 AI Pocket Budget</Text>
      <AlertTester />

      {pockets.map((p, i) => {
        const amount = balance * p.percent;

        return (
          <View key={i} style={styles.card}>
            <Text style={styles.name}>{p.name}</Text>
            <Text style={styles.amount}>RM {amount.toFixed(2)}</Text>
            <Text style={styles.sub}>
              Daily Limit: RM {(amount / 30).toFixed(2)}
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
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#1e293b',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  name: { color: 'white', fontWeight: 'bold' },
  amount: { color: '#22c55e', fontSize: 18, marginTop: 5 },
  sub: { color: '#94a3b8', marginTop: 3 },
});



