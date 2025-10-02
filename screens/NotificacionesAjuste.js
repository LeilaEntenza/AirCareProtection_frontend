import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, Switch, Alert, ActivityIndicator } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSQLiteContext } from 'expo-sqlite';

export default function Ubicacion({ navigation }) {
  const [isEnabled1, setIsEnabled1] = useState(true); // dentro
  const [isEnabled2, setIsEnabled2] = useState(true); // fuera
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

  // carga/crea configuración cuando tengamos userEmail y db
  useEffect(() => {
    if (userEmail && db) cargarConfiguracionNoti();
  }, [userEmail, db]);

  const cargarConfiguracionNoti = async () => {
    if (!db) {
      console.warn('DB no está inicializada aún');
      return;
    }
    setIsLoading(true);
    try {
      let row = null;

      // Buscar config existente
      if (typeof db.getAllAsync === 'function') {
        const res = await db.getAllAsync('SELECT * FROM alertas WHERE userEmail = ?', [userEmail]);
        if (Array.isArray(res) && res.length > 0) row = res[0];
      } else if (typeof db.execAsync === 'function') {
        const res = await db.execAsync('SELECT * FROM alertas WHERE userEmail = ?', [userEmail]);
        if (res && res.rows && res.rows._array && res.rows._array.length > 0) row = res.rows._array[0];
      }

      // Si no hay config, crearla con valores por defecto
      if (!row) {
        const defaults = { notificacionDentro: 1, notificacionFuera: 1 };
        const params = [0, defaults.notificacionDentro, defaults.notificacionFuera, userEmail];

        if (typeof db.runAsync === 'function') {
          await db.runAsync('INSERT INTO alertas (id, notificacionDentro, notificacionFuera, userEmail) VALUES (?, ?, ?, ?)', params);
        } else if (typeof db.execAsync === 'function') {
          await db.execAsync('INSERT INTO alertas (id, notificacionDentro, notificacionFuera, userEmail) VALUES (?, ?, ?, ?)', params);
        }

        row = defaults;
      }

      // Cargar switches
      setIsEnabled1(Boolean(Number(row.notificacionDentro)));
      setIsEnabled2(Boolean(Number(row.notificacionFuera)));
    }
    catch (error) {
      console.error('Error al cargar configuración de alertas:', error);
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
      const paramsReplace = [0, isEnabled1 ? 1 : 0, isEnabled2 ? 1 : 0, userEmail];
      const sql = 'INSERT OR REPLACE INTO alertas (id, notificacionDentro, notificacionFuera, userEmail) VALUES (?, ?, ?, ?)';

      if (typeof db.runAsync === 'function') {
        await db.runAsync(sql, paramsReplace);
      } else if (typeof db.execAsync === 'function') {
        await db.execAsync(sql, paramsReplace);
      } else {
        throw new Error('La DB no soporta runAsync ni execAsync');
      }

      Alert.alert('Guardado', 'Configuración de alertas guardada');
      navigation.goBack();
    }
    catch (error) {
      console.error('Error guardando configuración alertas:', error);
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
      {/* Switch dentro */}
      <View style={styles.contactoNotificacion}>
        <Text style={styles.label}>Notificaciones dentro del hogar</Text>
        <Switch
          trackColor={{ false: "#000000", true: "#000000" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#000000"
          onValueChange={() => setIsEnabled1(prev => !prev)}
          value={isEnabled1}
        />
      </View>

      {/* Switch fuera */}
      <View style={styles.contactoNotificacion}>
        <Text style={styles.label}>Notificaciones fuera del hogar</Text>
        <Switch
          trackColor={{ false: "#000000", true: "#000000" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#000000"
          onValueChange={() => setIsEnabled2(prev => !prev)}
          value={isEnabled2}
        />
      </View>

      {/* Botón guardar */}
      <Pressable style={styles.boton} onPress={handleGuardar}>
        <Text style={styles.textButton}>Guardar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%' },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  boton: {
    backgroundColor: '#636891',
    width: '40%',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  textButton: { color: 'white', fontSize: 16 },
  contactoNotificacion: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#e6e6e6",
  },
  label: { fontSize: 16 },
});
