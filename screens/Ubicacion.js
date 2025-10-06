import React, { useState, useEffect } from 'react';
import MapView, { Marker} from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import { useSQLiteContext } from 'expo-sqlite';
import { getAuth, onAuthStateChanged} from 'firebase/auth';

export default function Ubicacion() {
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

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title='Mi ubicación'/>
        <Marker coordinate={dispositivosUbicacion} title='Dispositivo'/>
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
});
