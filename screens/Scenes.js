import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // usando iconos

export default function Scenes({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.textoInicio}>Scenes</Text>

      <View style={styles.cardsContainer}>

        <Pressable style={styles.cardScene} onPress={() => navigation.navigate('Clima')}>
          <Icon name="weather-sunny" size={50} color="#fff" />
          <Text style={styles.textoCardScene}>Clima</Text>
        </Pressable>

        <Pressable style={styles.cardScene} onPress={() => navigation.navigate('Temperatura')}>
          <Icon name="thermometer" size={50} color="#fff" />
          <Text style={styles.textoCardScene}>Temperatura</Text>
        </Pressable>

        <Pressable style={styles.cardScene} onPress={() => navigation.navigate('Ubicacion')}>
          <Icon name="map-marker" size={50} color="#fff" />
          <Text style={styles.textoCardScene}>Ubicación</Text>
        </Pressable>

        <Pressable style={styles.cardScene} onPress={() => navigation.navigate('Contacto')}>
          <Icon name="account-group" size={50} color="#fff" />
          <Text style={styles.textoCardScene}>Contactos</Text>
        </Pressable>

        <Pressable style={styles.cardScene} onPress={() => navigation.navigate('Emergencias')}>
          <Icon name="alert-circle" size={50} color="#fff" />
          <Text style={styles.textoCardScene}>Emergencias</Text>
        </Pressable>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%' },
  scrollContent: { paddingVertical: 12, paddingHorizontal: 12, paddingBottom: 40 },
  textoInicio: {
      fontSize: 24,
      textAlign: 'center',
      marginTop: 20,
      fontWeight: 'bold',
  },
  cardsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 16,
  },
  cardScene: {
      backgroundColor: '#636891',
      borderRadius: 10,
      paddingVertical: 16,
      paddingHorizontal: 8,
      marginBottom: 12,
      alignItems: 'center',
      justifyContent: 'center',
      width: '48%', // 2 cards por fila en mobile
    // Para tablets podrías usar '30%' y media query si quieres
  },
  textoCardScene: {
      fontSize: 16,
      marginTop: 8,
      color: 'white',
      textAlign: 'center',
      flexShrink: 1, // evita desbordes
  },
});
