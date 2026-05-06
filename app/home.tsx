import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from './AppContext';

export default function Home() {
    const router = useRouter();
    const { user, balance } = useApp();

    return (
        <View style={styles.container}>
            {/* 👇 FIXED WELCOME TEXT */}
            <Text style={styles.title}>
                👋 WELCOME {user?.username ?? 'USER'}
            </Text>

            {/* BALANCE CARD */}
            <View style={styles.card}>
                <Text style={{ color: '#94a3b8' }}>Total Balance</Text>
                <Text style={styles.balance}>RM {balance}</Text>
            </View>

            {/* 3 ACTION BUTTONS */}
            <View style={styles.row}>
                <TouchableOpacity style={styles.smallBtn}>
                    <Text style={styles.btnText}>Topup 💰</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.smallBtn}>
                    <Text style={styles.btnText}>Scan QR 📷</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.smallBtn}>
                    <Text style={styles.btnText}>Transfer 🔁</Text>
                </TouchableOpacity>
            </View>

            {/* POCKET BUTTON */}
            <TouchableOpacity
                style={styles.pocketBtn}
                onPress={() => router.push('/pocket')}
            >
                <Text style={{ color: 'white' }}>Pocket 🪙</Text>
            </TouchableOpacity>
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
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
    },

    balance: {
        color: '#22c55e',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 5,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    smallBtn: {
        backgroundColor: '#334155',
        padding: 10,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },

    btnText: {
        color: 'white',
        fontSize: 12,
    },

    pocketBtn: {
        backgroundColor: '#22c55e',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
});