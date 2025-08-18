import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Ajustes() {
    const isAuthenticated = false;
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <Text>Ajustes</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, width: '100%' },
    scrollContent: { paddingVertical: 12, paddingHorizontal: 12, paddingBottom: 40 },
});