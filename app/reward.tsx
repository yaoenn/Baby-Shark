import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Rewards() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  
  // Mock data - change these to test different scenarios
  const [userStreak] = useState(15); // Change to 3,7,14,30 to test
  const [claimedRewards, setClaimedRewards] = useState<number[]>([]);

  const rewards = [
    { id: 'cashback', name: '💰 RM1 Cashback', streak: 3 },
    { id: 'tealive', name: '🧋 Tealive RM5', streak: 7 },
    { id: 'voucher10', name: '🎁 RM10 Voucher', streak: 14 },
    { id: 'bonus50', name: '💎 RM50 Bonus', streak: 30 },
  ];

  const claimReward = (reward: any) => {
    if (userStreak >= reward.streak && !claimedRewards.includes(reward.streak)) {
      setClaimedRewards([...claimedRewards, reward.streak]);
      Alert.alert('Success', `Claimed ${reward.name}!`);
      setSelected(null);
    } else if (claimedRewards.includes(reward.streak)) {
      Alert.alert('Sorry', 'Already claimed');
    } else {
      Alert.alert('Sorry', `Need ${reward.streak} day streak`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎁 Rewards</Text>
      <Text style={styles.streak}>🔥 Streak: {userStreak} days</Text>

      {rewards.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => setSelected(item.id)}
          style={[
            styles.card,
            selected === item.id && styles.selected,
            claimedRewards.includes(item.streak) && styles.claimed
          ]}
        >
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.need}>Need: {item.streak} days</Text>
          {claimedRewards.includes(item.streak) && <Text style={styles.badge}>✓ Claimed</Text>}
        </TouchableOpacity>
      ))}

      {selected && (
        <TouchableOpacity 
          style={styles.claimBtn}
          onPress={() => claimReward(rewards.find(r => r.id === selected))}
        >
          <Text style={styles.claimText}>Claim</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/home')}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0f172a', paddingTop: 60 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  streak: { color: '#f59e0b', fontSize: 18, marginBottom: 20 },
  card: { backgroundColor: '#1e293b', padding: 15, borderRadius: 10, marginBottom: 10 },
  selected: { backgroundColor: '#22c55e' },
  claimed: { opacity: 0.5 },
  name: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  need: { color: '#94a3b8', fontSize: 12, marginTop: 5 },
  badge: { color: '#22c55e', marginTop: 5 },
  claimBtn: { backgroundColor: '#8b5cf6', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  claimText: { color: 'white', fontWeight: 'bold' },
  backBtn: { backgroundColor: '#334155', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  backText: { color: '#94a3b8' },
});