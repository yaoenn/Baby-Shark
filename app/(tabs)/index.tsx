import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../AppContext';

export default function Index() {
  const router = useRouter();
  const { registerUser, login } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAction = () => {
    if (!username || !password) return Alert.alert('Fill all fields');

    // SIGNUP
    if (mode === 'signup') {
      registerUser({ username, password });
      Alert.alert('Account created! Please login');
      setMode('login'); // move to login page
      return;
    }

    // LOGIN
    const success = login({ username, password });

    if (!success) {
      Alert.alert('Invalid credentials. Please sign up first.');
      return;
    }

    router.replace('/home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {mode === 'signup' ? 'Sign Up' : 'Login'}
      </Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleAction}>
        <Text style={{ color: 'white' }}>
          {mode === 'signup' ? 'Create Account' : 'Login'}
        </Text>
      </TouchableOpacity>

      {/* SWITCH BUTTON (UPDATED TEXT) */}
      <TouchableOpacity
        onPress={() =>
          setMode(mode === 'signup' ? 'login' : 'signup')
        }
      >
        <Text style={{ color: '#60a5fa', marginTop: 10 }}>
          {mode === 'signup' ? 'Switch to Login' : 'Switch to Sign Up'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 80,
  },
  title: {
    color: 'white',
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  label: {
    color: '#cbd5e1',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#22c55e',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
});