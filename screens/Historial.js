import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Historial() {
  const actividades = [
    { title: 'Todo se encuentra en orden', subtitle: 'Última actualización hace 2 minutos', icon: 'clock-outline' },
    { title: 'Temperaturas altas', subtitle: 'Última actualización hace 10 días', icon: 'thermometer-alert' },
    // Agregá más items si querés
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.textoInicio}>Historial</Text>

      {actividades.map((item, index) => (
        <View key={index} style={styles.ultimaActividad}>
          <Icon name={item.icon} size={40} color="#000" />
          <View style={styles.ultimaActividadTextos}>
            <Text style={styles.textoCard}>{item.title}</Text>
            <Text style={styles.textoPetit}>{item.subtitle}</Text>
          </View>
        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%' },
  scrollContent: { paddingVertical: 12, paddingHorizontal: 12, paddingBottom: 40 },
  ultimaActividad: {
    backgroundColor: '#c5c5c5ff',
    marginTop: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: '95%',       // casi todo el ancho
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center', // centra la card horizontalmente
  },
  ultimaActividadTextos: {
    flexDirection: 'column',
    marginLeft: 12,
    flexShrink: 1, // evita desbordes si el texto es largo
  },
  textoCard: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  textoPetit: {
    fontSize: 14,
    color: '#636891',
    marginTop: 4,
  },
  textoInicio: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});
