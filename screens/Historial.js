import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function Historial() {
    const isAuthenticated = false;
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.textoInicio}>Historial</Text>
            <View style={styles.ultimaActividad}>
                <Image
                source={{ uri: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjMDAwIiBkPSJNMTIgMkExMCAxMCAwIDAgMCAyIDEyYTEwIDEwIDAgMCAwIDEwIDEwYTEwIDEwIDAgMCAwIDEwLTEwQTEwIDEwIDAgMCAwIDEyIDJtNC4yIDE0LjJMMTEgMTNWN2gxLjV2NS4ybDQuNSAyLjd6Ii8+PC9zdmc+' }}
                style={styles.actividadReloj}
                resizeMode="contain"
                accessibilityLabel="Reloj de última actividad"
                />
                <View style={styles.ultimaActividadTextos}>
                    <Text style={styles.textoInicio}>Todo se encuentra en orden</Text>
                    <Text style={styles.textoPetit}>Última actualización hace 2 minutos</Text>
                </View>
            </View>     
                        <View style={styles.ultimaActividad}>
                <Image
                source={{ uri: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjMDAwIiBkPSJNMTIgMkExMCAxMCAwIDAgMCAyIDEyYTEwIDEwIDAgMCAwIDEwIDEwYTEwIDEwIDAgMCAwIDEwLTEwQTEwIDEwIDAgMCAwIDEyIDJtNC4yIDE0LjJMMTEgMTNWN2gxLjV2NS4ybDQuNSAyLjd6Ii8+PC9zdmc+' }}
                style={styles.actividadReloj}
                resizeMode="contain"
                accessibilityLabel="Reloj de última actividad"
                />
                <View style={styles.ultimaActividadTextos}>
                    <Text style={styles.textoInicio}>Temperaturas altas </Text>
                    <Text style={styles.textoPetit}>Última actualización hace 10 días</Text>
                </View>
            </View>     
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, width: '100%' },
    scrollContent: { paddingVertical: 12, paddingHorizontal: 12, paddingBottom: 40 },
    ultimaActividad: {
        alignSelf: 'center',     
        backgroundColor: '#c5c5c5ff',
        marginTop: 12,
        padding: 20,
        borderRadius: 12,   
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'flex-start',
    },
    ultimaActividadTextos: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 12,
    },
    actividadReloj: {
        width: 48,
        height: 48,
        margin: 10,
        tintColor: '#000000ff',
    },
    textoPetit: {
        fontSize: 14,
        color: '#636891',
        marginTop: 4,
    },
        textoInicio: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
    },
});