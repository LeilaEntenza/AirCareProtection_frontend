import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSQLiteContext } from 'expo-sqlite';
import Dispositivo from '../components/Dispositivo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function Home({ navigation }) {
    const db = useSQLiteContext();
    const [dispositivos, setDispositivos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userEmail, setUserEmail] = useState(null);

    // Escucha cambios de auth para obtener el email cuando esté disponible
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUserEmail(user?.email || null);
      });
      return unsubscribe;
    }, []);

    const cargarDispositivos = async () => {
      // Protecciones: db y userEmail deben existir
      if (!db) {
        console.warn('DB no está inicializada aún');
        return;
      }
      if (!userEmail) {
        // usuario no autenticado: limpia lista y evita ejecutar query
        setDispositivos([]);
        return;
      }

      try {
        setIsLoading(true);

        let resultados = [];

        // Si la API del provider tiene getAllAsync, úsala (fallback)
        if (typeof db.getAllAsync === 'function') {
          resultados = await db.getAllAsync('SELECT * FROM dispositivos WHERE userEmail = ?', [userEmail]);
        } else if (typeof db.execAsync === 'function') {
          // execAsync puede devolver distintos shapes según implementación; normalizamos
          const res = await db.execAsync('SELECT * FROM dispositivos WHERE userEmail = ?', [userEmail]);
          resultados = [];
          if (Array.isArray(res)) {
            res.forEach(r => {
              if (r.rows && Array.isArray(r.rows)) resultados.push(...r.rows);
              else if (r.rows && r.rows._array && Array.isArray(r.rows._array)) resultados.push(...r.rows._array);
              else if (r.values && Array.isArray(r.values)) resultados.push(...r.values);
            });
          } else if (res && res.rows && res.rows._array) {
            resultados = res.rows._array;
          }
        } else {
          console.warn('El objeto db no expone getAllAsync ni execAsync; no se puede consultar.');
        }

        setDispositivos(resultados || []);
      } catch (error) {
        console.error('Error al cargar dispositivos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // recarga cuando cambie el email o la referencia a db
    useEffect(() => {
      if (userEmail && db) cargarDispositivos();
    }, [userEmail, db]);

    if (isLoading) {
        return (
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
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