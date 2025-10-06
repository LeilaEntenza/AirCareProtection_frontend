import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Switch, Pressable, ActivityIndicator, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSQLiteContext } from 'expo-sqlite';
import CustomSlider from '../components/CustomSlider';


export default function Clima({ navigation }) {
  const db = useSQLiteContext();
  const [userEmail, setUserEmail] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [tempMin, setTempMin] = useState(0);
  const [tempMax, setTempMax] = useState(40);
  const [isLoading, setIsLoading] = useState(true);

  // escucha auth
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email || null);
    });
    return unsubscribe;
  }, []);

  // carga/crea configuración cuando tengamos userEmail y db
  useEffect(() => {
    if (userEmail && db) cargarConfiguracionClima();
  }, [userEmail, db]);

  const cargarConfiguracionClima = async () => {
    if (!db) {
      console.warn('DB no está inicializada aún');
      return;
    }
    setIsLoading(true);
    try {
      let row = null;

      if (typeof db.getAllAsync === 'function') {
        const res = await db.getAllAsync('SELECT * FROM climaConfig WHERE userEmail = ?', [userEmail]);
        if (Array.isArray(res) && res.length > 0) row = res[0];
      } else if (typeof db.execAsync === 'function') {
        const res = await db.execAsync('SELECT * FROM climaConfig WHERE userEmail = ?', [userEmail]);
        // normalizar distintos shapes
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
        // crear con defaults si no existe
        const defaults = { notificacionClima: 1, minimaTemp: 0, maximaTemp: 40 };
        const params = [0, defaults.notificacionClima, defaults.minimaTemp, defaults.maximaTemp, userEmail];
        if (typeof db.runAsync === 'function') {
          await db.runAsync('INSERT INTO climaConfig (id, notificacionClima, minimaTemp, maximaTemp, userEmail) VALUES (?, ?, ?, ?, ?)', params);
        } else if (typeof db.execAsync === 'function') {
          await db.execAsync('INSERT INTO climaConfig (id, notificacionClima, minimaTemp, maximaTemp, userEmail) VALUES (?, ?, ?, ?, ?)', params);
        }
        row = { notificacionClima: defaults.notificacionClima, minimaTemp: defaults.minimaTemp, maximaTemp: defaults.maximaTemp };
      }

      setIsEnabled(Boolean(Number(row.notificacionClima)));
      setTempMin(Number(row.minimaTemp ?? row.minimaTemp ?? 0));
      setTempMax(Number(row.maximaTemp ?? row.maximaTemp ?? 40));
    } catch (error) {
      console.error('Error al cargar configuración clima:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSwitch = () => setIsEnabled(prev => !prev);

  const handleGuardar = async () => {
    if (!db || !userEmail) {
      Alert.alert('Error', 'Base de datos o usuario no disponible');
      return;
    }
    setIsLoading(true);
    try {
      const paramsReplace = [0, isEnabled ? 1 : 0, tempMin, tempMax, userEmail];
      // Usar INSERT OR REPLACE para asegurar existencia (id fijo 0 en esquema)
      const sql = 'INSERT OR REPLACE INTO climaConfig (id, notificacionClima, minimaTemp, maximaTemp, userEmail) VALUES (?, ?, ?, ?, ?)';
      if (typeof db.runAsync === 'function') {
        await db.runAsync(sql, paramsReplace);
      } else if (typeof db.execAsync === 'function') {
        await db.execAsync(sql, paramsReplace);
      } else {
        throw new Error('La API de DB no soporta runAsync ni execAsync');
      }
      Alert.alert('Guardado', 'Configuración de clima guardada');
      navigation.goBack();
    } catch (error) {
      console.error('Error guardando configuración clima:', error);
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
        source={{ uri: 'https://www.sketchappsources.com/resources/source-image/weather-app-icons.jpg' }}
        style={styles.weather}
        resizeMode="contain"
      />
      
      <View style={styles.climaNotificacion}>
        <Text style={styles.label}>Notificaciones de clima hostil</Text>
        <Switch
          trackColor={{ false: "#000000", true: "#000000" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#000000"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View>
        <CustomSlider
          label="Temperatura mínima agradable"
          value={tempMin}
          onValueChange={setTempMin}
          min={-50}
          max={50}
          step={1}
          unit="°C"
        />

        <CustomSlider
          label="Temperatura máxima agradable"
          value={tempMax}
          onValueChange={setTempMax}
          min={-50}
          max={50}
          step={1}
          unit="°C"
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
    alignItems: 'center',
    paddingVertical: 12,
  },
  weather: {
    width: '100%',     
    height: 200, 
    marginTop: 10,
    alignSelf: 'center', 
    overflow: 'hidden',  
  },
  climaNotificacion: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#e6e6e6",
  },
  sliderContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "90%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#e6e6e6",
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
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
});