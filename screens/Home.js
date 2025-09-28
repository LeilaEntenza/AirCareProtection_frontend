import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { getAuth } from 'firebase/auth';
import { useSQLiteContext } from 'expo-sqlite';
import Dispositivo from '../components/Dispositivo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function Home({ navigation }) {
    const isAuthenticated = false;
    const userEmail = getAuth().currentUser?.email || null;
    const db = useSQLiteContext();
    const [dispositivos, setDispositivos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const cargarDispositivos = async () => {
        try {
            setIsLoading(true);
            const resultados = await db.getAllAsync('SELECT * FROM dispositivos WHERE userEmail = ?', [userEmail]);
            setDispositivos(resultados);
        }
        catch (error) {
            console.error('Error al cargar dispositivos:', error);
        }
        finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        cargarDispositivos();
    }, []);

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />; 
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.textoInicio}>Dispositivos</Text>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.dispositivos}
                style={styles.dispositivosContainer}
            >
                {dispositivos.length === 0 ? (
                    <Text style={{ margin: 16, color: '#636891' }}>No tienes dispositivos agregados.</Text>
                ) : (
                    dispositivos.map((d) => (
                        <Dispositivo
                            key={d.id}
                            name={d.nombre}
                            imageUri={d.foto}
                        />
                    ))
                )}
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
            </ScrollView>
            <Text style={styles.textoInicio}>Clima</Text>
            {/* Va a haber que conectar con la API del clima */}
            <Image
                source={{ uri: 'https://www.sketchappsources.com/resources/source-image/weather-app-icons.jpg' }}
                style={styles.weather}
                resizeMode="contain"
            />
            <Text style={styles.textoInicio}>Última actividad</Text>
            <View style={styles.ultimaActividadCard}>
            <Icon name="clock-outline" size={48} color="#000" />

                <View style={styles.ultimaActividadTextos}>
                    <Text style={styles.textoCard}>Todo se encuentra en orden</Text>
                    <Text style={styles.textoPetit}>Última actualización hace 2 minutos</Text>
                </View>
                </View>

        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        width: '100%' 
    },
    scrollContent: { 
        paddingVertical: 12, 
        paddingHorizontal: 12, 
        paddingBottom: 40 
    },
    dispositivosContainer: {
        marginTop: 20,
        backgroundColor: '#636891',
        padding: 12,
        borderRadius: 12,
        marginHorizontal: 0,
    },
    dispositivos: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 12,
    },
    addCard: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
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
    ultimaActividadCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#c5c5c5ff',
        padding: 16,
        borderRadius: 12,
        marginVertical: 8,
        width: '90%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 3,
      },
      ultimaActividadTextos: {
        flexDirection: 'column',
        marginLeft: 12,
        flexShrink: 1, // evita que el texto se desborde
      },
      textoCard: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
      },
      textoPetit: {
        fontSize: 14,
        color: '#636891',
        marginTop: 4,
      },
      actividadReloj: {
        width: 48,
        height: 48,
        tintColor: '#000',
      },
});