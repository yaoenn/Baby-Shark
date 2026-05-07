import { Text, TouchableOpacity, View } from 'react-native';
import { getAIAdvice } from './aiCoach';


export default function AiCoach() {

  const prompt = `
You are a financial AI coach.

User spending:
- Food: RM120
- Transport: RM60
- Entertainment: RM90

Give:
1. Analysis
2. Problem areas
3. 3 improvement tips
4. Motivation message
`;

  const askAI = async () => {
    const result = await getAIAdvice(prompt);
    console.log(result);
  };

  return (
    <View>
      <TouchableOpacity onPress={askAI}>
        <Text>🤖 Ask AI Coach</Text>
      </TouchableOpacity>
    </View>
  );
}