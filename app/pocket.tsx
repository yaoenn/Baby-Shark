import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Pocket() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Pocket Type</Text>

      {/* AI POCKET */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/pocket-ai')}
      >
        <Text style={styles.label}>🤖 AI Pocket</Text>
        <Text style={styles.text}>Auto budget split by system</Text>
      </TouchableOpacity>

      {/* CUSTOM POCKET */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/pocket-custom')}
      >
        <Text style={styles.label}>⚙️ Custom Pocket</Text>
        <Text style={styles.text}>Create your own budget rules</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20, paddingTop: 80 },
  title: { color: 'white', fontSize: 24, marginBottom: 20, fontWeight: 'bold' },

  card: {
    backgroundColor: '#1e293b',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  label: { color: 'white', fontWeight: 'bold' },
  text: { color: '#94a3b8' },
});