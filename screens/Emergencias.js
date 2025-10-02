import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Switch, Pressable, Alert, ActivityIndicator } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSQLiteContext } from 'expo-sqlite';

export default function Emergencias({ navigation }) {
  // Estados independientes para cada switch
  const [ambulancia, setAmbulancia] = useState(true);
  const [policia, setPolicia] = useState(true);
  const [bomberos, setBomberos] = useState(true);
  const db = useSQLiteContext();
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // escucha auth
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email || null);
    });
    return unsubscribe;
  }, []);

  // carga config cuando se sepa el user y db
  useEffect(() => {
    if (userEmail && db) cargarEmergencias();
  }, [userEmail, db]);

  const cargarEmergencias = async () => {
    if (!db) {
      console.warn('DB no está inicializada aún');
      return;
    }
    setIsLoading(true);
    try {
      let row = null;
      if (typeof db.getAllAsync === 'function') {
        const res = await db.getAllAsync('SELECT * FROM emergencias WHERE userEmail = ?', [userEmail]);
        if (Array.isArray(res) && res.length > 0) row = res[0];
      }
      else if (typeof db.execAsync === 'function') {
        const res = await db.execAsync('SELECT * FROM emergencias WHERE userEmail = ?', [userEmail]);
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
        const defaults = { ambulancia: 1, policia: 1, bomberos: 1 };
        const params = [0, defaults.ambulancia, defaults.policia, defaults.bomberos, userEmail];
        if (typeof db.runAsync === 'function') {
          await db.runAsync('INSERT INTO emergencias (id, emergenciaAmbulancia, emergenciaPolicia, emergenciaBomberos, userEmail) VALUES (?, ?, ?, ?, ?)', params);
        }
        else if (typeof db.execAsync === 'function') {
          await db.execAsync('INSERT INTO emergencias (id, emergenciaAmbulancia, emergenciaPolicia, emergenciaBomberos, userEmail) VALUES (?, ?, ?, ?, ?)', params);
        }
        row = { emergenciaAmbulancia: defaults.ambulancia, emergenciaPolicia: defaults.policia, emergenciaBomberos: defaults.bomberos };
      }
      setAmbulancia(Boolean(Number(row.emergenciaAmbulancia) ?? 1));
      setPolicia(Boolean(Number(row.emergenciaPolicia) ?? 1));
      setBomberos(Boolean(Number(row.emergenciaBomberos) ?? 1));
    }
    catch (error) {
      console.error('Error al cargar configuración de emergencias:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleGuardar = async () => { 
    if (!db || !userEmail) {
      console.warn('DB no está inicializada aún o usuario no autenticado');
      return;
    }
    setIsLoading(true);
    try {
      const paramsReplace = [0, ambulancia ? 1 : 0, policia ? 1 : 0, bomberos ? 1 : 0, userEmail];
      const sql = 'INSERT OR REPLACE INTO emergencias (id, emergenciaAmbulancia, emergenciaPolicia, emergenciaBomberos, userEmail) VALUES (?, ?, ?, ?, ?)';
      if (typeof db.runAsync === 'function') {
        await db.runAsync(sql, paramsReplace);
      } else if (typeof db.execAsync === 'function') {
        await db.execAsync(sql, paramsReplace);
      } else {
        throw new Error('La DB no soporta runAsync ni execAsync');
      }
      Alert.alert('Guardado', 'Configuración de emergencias guardada');
      navigation.goBack();
    }
    catch (error) {
      console.error('Error guardando configuración emergencias:', error);
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
      <Text style={styles.textoInicio}>Servicios a contactar (de ser necesario)</Text>

      <View style={styles.emergenciaNotificacion}>
        <Text style={styles.label}>Contactar servicio de ambulancia</Text>
        <Switch
          trackColor={{ false: "#000000", true: "#000000" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#000000"
          onValueChange={() => setAmbulancia(!ambulancia)}
          value={ambulancia}
        />
      </View>

      <View style={styles.emergenciaNotificacion}>
        <Text style={styles.label}>Contactar servicio de policía</Text>
        <Switch
          trackColor={{ false: "#000000", true: "#000000" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#000000"
          onValueChange={() => setPolicia(!policia)}
          value={policia}
        />
      </View>

      <View style={styles.emergenciaNotificacion}>
        <Text style={styles.label}>Contactar servicio de bomberos</Text>
        <Switch
          trackColor={{ false: "#000000", true: "#000000" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#000000"
          onValueChange={() => setBomberos(!bomberos)}
          value={bomberos}
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
  textoInicio: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  emergenciaNotificacion: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
