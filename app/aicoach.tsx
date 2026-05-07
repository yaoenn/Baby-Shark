import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AICoach() {
  const router = useRouter();
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock AI responses based on keywords
  const getMockResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('save') || lowerInput.includes('saving')) {
      return "💰 Tip: Try the 50/30/20 rule! 50% needs, 30% wants, 20% savings. Start small with RM10 a day!";
    }
    else if (lowerInput.includes('budget') || lowerInput.includes('spend')) {
      return "📊 Track your spending for 1 week. You'll be surprised where your money goes! Use our Pocket feature to organize.";
    }
    else if (lowerInput.includes('invest') || lowerInput.includes('grow')) {
      return "📈 Start with ASNB or TNG Gold. Low risk, good for beginners! Never invest money you can't lose.";
    }
    else if (lowerInput.includes('debt') || lowerInput.includes('loan')) {
      return "⚠️ Pay high-interest debt first! List all debts and attack the smallest one first (Debt Snowball method).";
    }
    else if (lowerInput.includes('emergency')) {
      return "🚨 Build 3-6 months of expenses in emergency fund. Start with RM500, then grow it!";
    }
    else {
      return "🤖 I'm your AI Finance Coach! Ask me about: saving, budgeting, investing, debt, or emergency funds. What would you like to learn?";
    }
  };

  const askCoach = () => {
    if (!question.trim()) {
      Alert.alert('Ask me something!', 'Type a question about your finances 💰');
      return;
    }

    setIsLoading(true);
    setResponse('');
    
    // Simulate AI thinking time
    setTimeout(() => {
      const answer = getMockResponse(question);
      setResponse(answer);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 AI Finance Coach</Text>
      <Text style={styles.subtitle}>Your personal money advisor</Text>

      {/* Chat area */}
      <ScrollView style={styles.chatArea}>
        {response ? (
          <View style={styles.responseBox}>
            <Text style={styles.responseText}>{response}</Text>
          </View>
        ) : (
          <View style={styles.welcomeBox}>
            <Text style={styles.welcomeText}>💡 Try asking:</Text>
            <Text style={styles.exampleText}>• "How to save money?"</Text>
            <Text style={styles.exampleText}>• "Budgeting tips based on this month's performance"</Text>
            <Text style={styles.exampleText}>• "Best way to invest RM100"</Text>
            <Text style={styles.exampleText}>• "How to pay off debt?"</Text>
            <Text style={styles.exampleText}>• "Create a personalized savings plan ?"</Text>
          </View>
        )}
        {isLoading && (
          <Text style={styles.loading}>🤔 Thinking...</Text>
        )}
      </ScrollView>

      {/* Input area */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Ask me anything about money..."
          placeholderTextColor="#94a3b8"
          value={question}
          onChangeText={setQuestion}
          multiline
        />
        <TouchableOpacity style={styles.askBtn} onPress={askCoach}>
          <Text style={styles.askBtnText}>Ask →</Text>
        </TouchableOpacity>
      </View>

      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 20,
  },
  chatArea: {
    flex: 1,
    marginBottom: 15,
  },
  welcomeBox: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  welcomeText: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exampleText: {
    color: '#cbd5e1',
    fontSize: 14,
    marginBottom: 8,
  },
  responseBox: {
    backgroundColor: '#22c55e',
    padding: 18,
    borderRadius: 15,
    marginTop: 20,
  },
  responseText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
  loading: {
    color: '#f59e0b',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  inputArea: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#1e293b',
    color: 'white',
    padding: 12,
    borderRadius: 12,
    fontSize: 14,
    maxHeight: 80,
  },
  askBtn: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  askBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backBtn: {
    backgroundColor: '#334155',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  backText: {
    color: '#94a3b8',
    fontSize: 14,
  },
});