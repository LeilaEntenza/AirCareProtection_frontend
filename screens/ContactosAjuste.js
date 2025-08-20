import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, Switch } from 'react-native';

export default function Ubicacion({ navigation }) {
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Primer switch */}
      <View style={styles.contactoNotificacion}>
        <Text style={styles.label}>Contacto en caso de riesgo</Text>
        <Switch
          trackColor={{ false: "#000000", true: "#000000" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#000000"
          onValueChange={() => setIsEnabled1(prev => !prev)}
          value={isEnabled1}
        />
      </View>

      {/* Segundo switch */}
      <View style={styles.contactoNotificacion}>
        <Text style={styles.label}>Contacto de servicios de emergencia</Text>
        <Switch
          trackColor={{ false: "#000000", true: "#000000" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#000000"
          onValueChange={() => setIsEnabled2(prev => !prev)}
          value={isEnabled2}
        />
      </View>

      {/* Botón guardar */}
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
  label: {
    fontSize: 16,
  },
});
