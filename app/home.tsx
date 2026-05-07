import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useApp } from './AppContext';


export default function Home() {
    const router = useRouter();
    const { user, balance } = useApp();
    const [streak] = useState(15);

    return (
        <View style={styles.container}>

            {/* STREAK DISPLAY - ADDED (Mock Data) */}
            <View style={styles.streakContainer}>
                <Text style={styles.streakIcon}>🔥</Text>
                <Text style={styles.streakText}>{streak} Days Streak!</Text>
            </View>
            <Text style={styles.title}>
                👋 WELCOME
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

            {/* POCKET BUTON */}
            <TouchableOpacity
                style={styles.pocketBtn}
                onPress={() => router.push('/pocket')}
            >
                <Text style={{ color: 'white' }}>Pocket 🪙</Text>
            </TouchableOpacity>

            {/* AI COACH BUTTON */}
            <TouchableOpacity
                onPress={() => router.push('/aicoach')}
                style={{
                    backgroundColor: '#3b82f6',
                    padding: 14,
                    borderRadius: 10,
                    marginTop: 10,
                    alignItems: 'center',
                }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    Open AI Coach 🤖

                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => router.push('/reward')}
                style={{
                    backgroundColor: '#3b82f6',
                    padding: 12,
                    borderRadius: 10,
                    marginTop: 15,
                    alignItems: 'center',
                }}
            >
                <Text style={{ color: 'white' }}> View Rewards🎁</Text>
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

    streakContainer: {
        backgroundColor: '#f59e0b',
        padding: 12,
        borderRadius: 12,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        textDecorationLine: 'underline',
        textDecorationColor: '#ffffff',
    },
    streakIcon: {
        fontSize: 24,
        textDecorationLine: 'underline',
        textDecorationColor: '#ffffff',
    },
    streakText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationColor: '#ffffff',
    },
});