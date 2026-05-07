import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function CustomPocket() {
    const [category, setCategory] = useState('');
    const [balance, setBalance] = useState('');
    const [pockets, setPockets] = useState<any[]>([]);

    const addPocket = () => {
        if (!category || !balance) return;

        const bal = parseFloat(balance);

        const newPocket = {
            category,
            balance: bal,
            dailyLimit: bal / 30, // ✅ AUTO CALC
        };

        setPockets([...pockets, newPocket]);

        setCategory('');
        setBalance('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>⚙️ Custom Pocket</Text>
            

            {/* CATEGORY INPUT */}
            <Text style={styles.label}>Category Name</Text>
            <TextInput
                placeholder="e.g. Food, Transport"
                value={category}
                onChangeText={setCategory}
                style={styles.input}
            />

            {/* BALANCE INPUT */}
            <Text style={styles.label}>Balance (RM)</Text>
            <TextInput
                placeholder="e.g. 500"
                value={balance}
                onChangeText={setBalance}
                keyboardType="numeric"
                style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={addPocket}>
                <Text style={{ color: 'white' }}>Create Pocket</Text>
            </TouchableOpacity>

            {/* LIST */}
            {pockets.map((p, i) => (
                <View key={i} style={styles.card}>
                    <Text style={styles.name}>📦 {p.category}</Text>
                    <Text style={styles.balance}>RM {p.balance}</Text>
                    <Text style={styles.daily}>
                        Daily Limit: RM {p.dailyLimit.toFixed(2)}
                    </Text>
                </View>
            ))}
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

    label: {
        color: '#cbd5e1',
        marginBottom: 5,
    },

    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },

    button: {
        backgroundColor: '#22c55e',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },

    card: {
        backgroundColor: '#1e293b',
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
    },

    name: {
        color: 'white',
        fontWeight: 'bold',
    },

    balance: {
        color: '#22c55e',
        marginTop: 5,
    },

    daily: {
        color: '#94a3b8',
        marginTop: 3,
    },
});