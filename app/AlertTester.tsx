// Create new file: app/AlertTester.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { checkSpendingAlert } from './alertHelper';

export const AlertTester = () => {
  const testAlerts = () => {
    // Test 50% (No alert)
    checkSpendingAlert({
      categoryName: 'Food (Test)',
      spentAmount: 16.66,
      dailyLimit: 33.33,
      showNoAlertMessage: true
    });
    
    // Test 85% (Warning)
    setTimeout(() => {
      checkSpendingAlert({
        categoryName: 'Transport (Test)',
        spentAmount: 28.33,
        dailyLimit: 33.33,
        showNoAlertMessage: false
      });
    }, 2000);
    
    // Test 110% (Overbudget)
    setTimeout(() => {
      checkSpendingAlert({
        categoryName: 'Entertainment (Test)',
        spentAmount: 36.66,
        dailyLimit: 33.33,
        showNoAlertMessage: false
      });
    }, 4000);
  };
  
  return (
    <View style={styles.testButtonContainer}>
      <TouchableOpacity style={styles.testButton} onPress={testAlerts}>
        <Text style={styles.testButtonText}>🧪 Test Alerts</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  testButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 999,
  },
  testButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  testButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});