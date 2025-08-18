import React, { act } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import Dispositivo from '../components/Dispositivo';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Home({ navigation }) {
    const isAuthenticated = false;
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.textoInicio}>Dispositivos</Text>
            <View style={styles.dispositivos}>
                <Dispositivo/>
                <Dispositivo/>
                <Pressable
                    onPress={() => navigation.navigate('AgregarDispositivo')}
                    style={styles.addCard}
                    accessibilityRole="button"
                    accessibilityLabel="Añadir dispositivo"
                >
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828926.png' }}
                        style={styles.addIcon}
                    />
                </Pressable>
            </View>
            <Text style={styles.textoInicio}>Clima</Text>
            {/* Va a haber que conectar con la API del clima */}
            <Image
                source={{ uri: 'https://www.sketchappsources.com/resources/source-image/weather-app-icons.jpg' }}
                style={styles.weather}
                resizeMode="contain"
            />
            <Text style={styles.textoInicio}>Última actividad</Text>
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

        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
    scrollContent: {
      marginBottom: 20,
    },
    dispositivos: {
        flexDirection: 'row',
        marginTop: 20,
        flexWrap: 'wrap',
        width: '100%',
        backgroundColor: '#636891',
        padding: 12,
        justifyContent: 'flex-start',
    },
    addCard: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
        minHeight: 104,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#e6e9ef',
    },
    addIcon: {
        width: 36,
        height: 36,
        tintColor: '#636891',
        resizeMode: 'contain',
    },
    textoInicio: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
    },
    weather: {
        width: '100%',     
        height: 200, 
        marginTop: 10,
        alignSelf: 'center', 
        overflow: 'hidden',  
    },
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
});