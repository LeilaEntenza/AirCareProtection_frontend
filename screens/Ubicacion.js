import React, { useState, useEffect } from 'react';
import MapView, { Marker} from 'react-native-maps';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { useSQLiteContext } from 'expo-sqlite';
import { getAuth, onAuthStateChanged} from 'firebase/auth';

export default function Ubicacion() {
  const db = useSQLiteContext();
  const [mapRegion, setMapRegion] = useState({
    latitude: -34.605950918242094,
    longitude: -58.435351633822265,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });

  const [dispositivosUbicacion, setDispositivosUbicacion] = useState({
    latitude: -34.60042931522899,
    longitude: -58.38416050349116,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });

  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('No se permitió acceso a la localización')
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccurancy: true});
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  }

  useEffect(() => {
    userLocation();
  }, []);

  // escucha auth para obtener userEmail
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email || null);
    });
    return unsubscribe;
  }, []);

  // cargar config de la BD cuando tengamos userEmail y db
  useEffect(() => {
    if (userEmail && db) cargarConfiguracionUbicacion();
  }, [userEmail, db]);

  const cargarConfiguracionUbicacion = async () => {
    if (!db) {
      console.warn('DB no está inicializada aún');
      setIsLoading(false);
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
      }

      if (!row) {
        // crear con defaults si no existe
        const defaults = { latitud: '', longitud: '', ubicacionNotificacion: 1 };
        const params = [0, defaults.latitud, defaults.longitud, defaults.ubicacionNotificacion, userEmail];
        const sql = 'INSERT INTO ubicacionConfig (id, latitud, longitud, ubicacionNotificacion, userEmail) VALUES (?, ?, ?, ?, ?)';
        if (typeof db.runAsync === 'function') {
          await db.runAsync(sql, params);
        } else if (typeof db.execAsync === 'function') {
          await db.execAsync(sql, params);
        }
        row = defaults;
      }

      // si lat/lon válidas, actualizar marker de dispositivo
      const lat = parseFloat(row.latitud);
      const lon = parseFloat(row.longitud);
      if (!isNaN(lat) && !isNaN(lon)) {
        setDispositivosUbicacion({
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        });
      }
    } catch (error) {
      console.error('Error al cargar configuración de ubicación desde BD:', error);
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
    <View style={styles.container}>
    <MapView style={styles.map} region={mapRegion}>
      <Marker
        coordinate={mapRegion}
        title='Mi ubicación'
        anchor={{ x: 0.5, y: 0.5 }} // centra la imagen
      >
        <View style={styles.circleWrapper}>
          <View style={styles.circleBorder}>
            <View style={styles.circleCore} />
          </View>
        </View>
      </Marker>

      <Marker
        coordinate={dispositivosUbicacion}
        title='Dispositivo'
      />
    </MapView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
    circleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBorder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(66, 133, 244, 0.3)', // borde azulado semitransparente
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleCore: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4285F4', // azul Google
  },
});
