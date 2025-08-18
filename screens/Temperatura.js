import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';

export default function Temperatura({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [tempMin, setTempMin] = useState(0);   // valor inicial mínima
  const [tempMax, setTempMax] = useState(30);  // valor inicial máxima

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.textoInicio}>Temperatura actual: 5°C</Text>
      <View style={styles.climaNotificacion}>
        <Text style={styles.label}>Notificar ante temperaturas anormales</Text>
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

      <Pressable style={styles.boton} onPress={() => navigation.goBack()}>
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