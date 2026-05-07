import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Rewards() {

  const [selected, setSelected] = useState<string | null>(null);

  const rewards = [
    { id: 'cashback', name: '💰 RM1 Cashback', streak: 3 },
    { id: 'tealive', name: '🧋 Tealive Voucher RM5', streak: 7 },
    { id: 'voucher10', name: '🎁 RM10 Voucher', streak: 14 },
  ];

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#0f172a', marginTop: 60 }}>

      <Text style={{ color: 'white', fontSize: 20, marginBottom: 20 }}>
        🎁 Choose Your Reward
      </Text>

      {rewards.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => setSelected(item.id)}
          style={{
            backgroundColor: selected === item.id ? '#22c55e' : '#1e293b',
            padding: 15,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: 'white' }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}

      {selected && (
        <Text style={{ color: '#22c55e', marginTop: 20 }}>
          ✅ You selected: {selected}
        </Text>
      )}

    </View>
  );
}