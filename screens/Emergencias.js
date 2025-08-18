import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Switch, Pressable } from 'react-native';

export default function Emergencias({ navigation }) {
  // Estados independientes para cada switch
  const [ambulancia, setAmbulancia] = useState(false);
  const [policia, setPolicia] = useState(false);
  const [bomberos, setBomberos] = useState(false);

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