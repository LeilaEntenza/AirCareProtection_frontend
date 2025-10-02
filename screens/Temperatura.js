import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Switch, Pressable, Alert, ActivityIndicator } from 'react-native';
import Slider from '@react-native-community/slider';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSQLiteContext } from 'expo-sqlite';

export default function Temperatura({ navigation }) {
  const db = useSQLiteContext();
  const [userEmail, setUserEmail] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [tempMin, setTempMin] = useState(5);   // valor inicial mínima
  const [tempMax, setTempMax] = useState(35);  // valor inicial máxima
  const [isLoading, setIsLoading] = useState(true);

  // escucha auth
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email || null);
    });
    return unsubscribe;
  }, []);

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
        const res = await db.getAllAsync('SELECT * FROM temperatura WHERE userEmail = ?', [userEmail]);
        if (Array.isArray(res) && res.length > 0) row = res[0];
      }
      else if (typeof db.execAsync === 'function') {
        const res = await db.execAsync('SELECT * FROM temperatura WHERE userEmail = ?', [userEmail]);
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
        const defaults = { notificacionTemp: 1, minimaTemp: 5, maximaTemp: 35 };
        const params = [0, defaults.notificacionTemp, defaults.minimaTemp, defaults.maximaTemp, userEmail];
        if (typeof db.runAsync === 'function') {
          await db.runAsync('INSERT INTO temperatura (id, notificacionTemp, minimaTemp, maximaTemp, userEmail) VALUES (?, ?, ?, ?, ?)', params);
        }
        else if (typeof db.execAsync === 'function') {
          await db.execAsync('INSERT INTO temperatura (id, notificacionTemp, minimaTemp, maximaTemp, userEmail) VALUES (?, ?, ?, ?, ?)', params);
        }
        row = { notificacionTemp: defaults.notificacionTemp, minimaTemp: defaults.minimaTemp, maximaTemp: defaults.maximaTemp };
      }
      setIsEnabled(Boolean(Number(row.notificacionTemp)));
      // usar las columnas definidas en la tabla (minimaTemp / maximaTemp) y valores por defecto seguros
      setTempMin(Number(row.minimaTemp ?? 5));
      setTempMax(Number(row.maximaTemp ?? 35));
      }
      catch (error) {
        console.error('Error al cargar configuración de temperatura:', error);
      }
      finally{
        setIsLoading(false);
      }
  }
  
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleGuardar = async () => {
    if (!db || !userEmail) {
      console.warn('DB no está inicializada aún o usuario no autenticado');
      return;
    }
    setIsLoading(true);
    try {
      const paramsReplace = [0, isEnabled ? 1 : 0, tempMin, tempMax, userEmail];
      const sql = 'INSERT OR REPLACE INTO temperatura (id, notificacionTemp, minimaTemp, maximaTemp, userEmail) VALUES (?, ?, ?, ?, ?)';
      if (typeof db.runAsync === 'function') {
        await db.runAsync(sql, paramsReplace);
      } else if (typeof db.execAsync === 'function') {
        await db.execAsync(sql, paramsReplace);
      } else {
        throw new Error('La DB no soporta runAsync ni execAsync');
      }
      Alert.alert('Guardado', 'Configuración de temperatura guardada');
      navigation.goBack();
        }
    catch (error) {
      console.error('Error guardando configuración temperatura:', error);
      Alert.alert('Error', 'No se pudo guardar la configuración');
      } 
    finally {
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
      <Text style={styles.textoInicio}>Temperatura actual: 5°C</Text>
      <View style={styles.climaNotificacion}>
        <Text style={styles.label}>Notificar temperaturas anormales</Text>
        <Switch
          trackColor={{ false: "#000000", true: "#000000" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#000000"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Temperatura mínima agradable</Text>
        <Text style={styles.value}>{tempMin} °C</Text>
        <Slider
          style={{ width: '90%', height: 40 }}
          minimumValue={-50}
          maximumValue={50}
          step={1}
          value={tempMin}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#cccccc"
          thumbTintColor="#ffffff"
          onValueChange={setTempMin}
        />
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Temperatura máxima agradable</Text>
        <Text style={styles.value}>{tempMax} °C</Text>
        <Slider
          style={{ width: '90%', height: 40 }}
          minimumValue={-50}
          maximumValue={50}
          step={1}
          value={tempMax}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#cccccc"
          thumbTintColor="#ffffff"
          onValueChange={setTempMax}
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
  textoInicio: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});