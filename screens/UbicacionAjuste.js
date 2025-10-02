import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TextInput, Pressable, Switch, ActivityIndicator, Alert } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSQLiteContext } from 'expo-sqlite';

export default function UbicacionAjuste({ navigation }) {
  const db = useSQLiteContext();
  const [userEmail, setUserEmail] = useState(null);
  const [ubicacion, setUbicacion] = useState('');
  const [ubicacionNotificacion, setUbicacionNotificacion] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // escucha auth
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email || null);
    });
    return unsubscribe;
  }, []);

  // carga cuando tengamos userEmail y db
  useEffect(() => {
    if (userEmail && db) cargarConfiguracion();
  }, [userEmail, db]);

  const cargarConfiguracion = async () => {
    if (!db) {
      console.warn('DB no está inicializada aún');
      return;
    }
    setIsLoading(true);
    try {
      let row = null;
      if (typeof db.getAllAsync === 'function') {
        const res = await db.getAllAsync('SELECT * FROM ubicacionConfig WHERE userEmail = ?', [userEmail]);
        if (Array.isArray(res) && res.length > 0) row = res[0];
      } else if (typeof db.execAsync === 'function') {
        const res = await db.execAsync('SELECT * FROM ubicacionConfig WHERE userEmail = ?', [userEmail]);
        if (res && res.rows && res.rows._array && res.rows._array.length > 0) row = res.rows._array[0];
        else if (Array.isArray(res)) {
          res.forEach(r => {
            if (!row) {
              if (r.rows && Array.isArray(r.rows) && r.rows.length > 0) row = r.rows[0];
              else if (r.rows && r.rows._array && r.rows._array.length > 0) row = r.rows._array[0];
            }
          });
        }
      }

      if (!row) {
        const defaults = { ubicacion: '', ubicacionNotificacion: 1 };
        const params = [0, defaults.ubicacion, defaults.ubicacionNotificacion, userEmail];
        if (typeof db.runAsync === 'function') {
          await db.runAsync('INSERT INTO ubicacionConfig (id, ubicacion, ubicacionNotificacion, userEmail) VALUES (?, ?, ?, ?)', params);
        } else if (typeof db.execAsync === 'function') {
          await db.execAsync('INSERT INTO ubicacionConfig (id, ubicacion, ubicacionNotificacion, userEmail) VALUES (?, ?, ?, ?)', params);
        }
        row = { ubicacion: defaults.ubicacion, ubicacionNotificacion: defaults.ubicacionNotificacion };
      }

      setUbicacion(row.ubicacion ?? '');
      setUbicacionNotificacion(Boolean(Number(row.ubicacionNotificacion ?? 1)));
    } catch (error) {
      console.error('Error al cargar configuración de ubicación:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuardar = async () => {
    if (!db || !userEmail) {
      Alert.alert('Error', 'Base de datos o usuario no disponible');
      return;
    }
    setIsLoading(true);
    try {
      const params = [0, ubicacion, ubicacionNotificacion ? 1 : 0, userEmail];
      const sql = 'INSERT OR REPLACE INTO ubicacionConfig (id, ubicacion, ubicacionNotificacion, userEmail) VALUES (?, ?, ?, ?)';
      if (typeof db.runAsync === 'function') {
        await db.runAsync(sql, params);
      } else if (typeof db.execAsync === 'function') {
        await db.execAsync(sql, params);
      } else {
        throw new Error('La API de DB no soporta runAsync ni execAsync');
      }
      Alert.alert('Guardado', 'Configuración de ubicación guardada');
      navigation.goBack();
    } catch (error) {
      console.error('Error guardando config ubicación:', error);
      Alert.alert('Error', 'No se pudo guardar la configuración');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Image
        source={{ uri: 'https://www.esedeerre.com/wp-content/uploads/2012/06/geolocalizacion-google-maps.jpg' }}
        style={styles.ubicacionMapa}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10 }}>Cambiar ubicación</Text>
      <TextInput
        style={styles.input}
        placeholder='Ubicación'
        value={ubicacion}
        onChangeText={setUbicacion}
      />
      <View style={styles.ubicacionNotificacion}>
        <Text style={styles.label}>Verificar ubicación en tiempo real</Text>
        <Switch
          trackColor={{ false: "#000000", true: "#000000" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#000000"
          onValueChange={() => setUbicacionNotificacion(prev => !prev)}
          value={ubicacionNotificacion}
        />
      </View>
      <Pressable style={styles.boton} onPress={handleGuardar}>
        <Text style={styles.textButton}>Guardar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
    },
    ubicacionMapa: {
    width: '100%',     
    height: 200, 
    marginTop: 10,
    alignSelf: 'center', 
    overflow: 'hidden',  
    },
    input: {
        width: '50%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    boton: {
        backgroundColor: '#636891',
        width: '40%',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 10,
    },
    textButton: {
        color: 'white',
        fontSize: 16,
    },
        ubicacionNotificacion: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#e6e6e6",
  },
});