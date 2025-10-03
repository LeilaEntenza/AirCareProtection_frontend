import React, { useState, useEffect } from 'react';
import MapView, { Marker} from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function Ubicacion() {
  const [mapRegion, setMapRegion] = useState({
    latitude: -34.605950918242094,
    longitude: -58.435351633822265,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title='Dispositivo'/>
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
