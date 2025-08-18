import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Pressable } from 'react-native';

export default function Contacto({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.titulo}>Contactos seleccionados</Text>

      {/* Primera card */}
      <View style={styles.cardScene}>
        <Image
          source={{ uri: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNiAxN2MwLTIgNC0zLjEgNi0zLjFzNiAxLjEgNiAzLjF2MUg2bTktOWEzIDMgMCAwIDEtMyAzYTMgMyAwIDAgMS0zLTNhMyAzIDAgMCAxIDMtM2EzIDMgMCAwIDEgMyAzTTMgNXYxNGEyIDIgMCAwIDAgMiAyaDE0YTIgMiAwIDAgMCAyLTJWNWEyIDIgMCAwIDAtMi0ySDVhMiAyIDAgMCAwLTIgMiIvPjwvc3ZnPg==' }}
          style={styles.icono}
        />

        <View style={styles.textContainer}>
          <Text style={styles.textoCardScene}>Contacto</Text>
        </View>

        <Image
          source={{ uri: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTkgNGgtMy41bC0xLTFoLTVsLTEgMUg1djJoMTRNNiAxOWEyIDIgMCAwIDAgMiAyaDhhMiAyIDAgMCAwIDItMlY3SDZ6Ii8+PC9zdmc+' }}
          style={{width: 40, height: 40}}
        />
      </View>

      {/* Segunda card */}
      <View style={styles.cardScene}>
        <Image
          source={{ uri: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNiAxN2MwLTIgNC0zLjEgNi0zLjFzNiAxLjEgNiAzLjF2MUg2bTktOWEzIDMgMCAwIDEtMyAzYTMgMyAwIDAgMS0zLTNhMyAzIDAgMCAxIDMtM2EzIDMgMCAwIDEgMyAzTTMgNXYxNGEyIDIgMCAwIDAgMiAyaDE0YTIgMiAwIDAgMCAyLTJWNWEyIDIgMCAwIDAtMi0ySDVhMiAyIDAgMCAwLTIgMiIvPjwvc3ZnPg==' }}
          style={styles.icono}
        />

        <View style={styles.textContainer}>
          <Text style={styles.textoCardScene}>Contacto</Text>
        </View>

        <Image
          source={{ uri: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTkgNGgtMy41bC0xLTFoLTVsLTEgMUg1djJoMTRNNiAxOWEyIDIgMCAwIDAgMiAyaDhhMiAyIDAgMCAwIDItMlY3SDZ6Ii8+PC9zdmc+' }}
          style={{width: 40, height: 40}}
        />
        <Pressable style={styles.boton} onPress={() => navigation.goBack()}>
          <Text style={styles.textButton}>Guardar</Text>
        </Pressable>
      </View>
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
  titulo: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  cardScene: {
    width: '90%',
    backgroundColor: '#979797',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 100, // asegura altura uniforme
  },
  icono: {
    width: 50,
    height: 50,
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  textoCardScene: {
    fontSize: 20,
    color: 'white',
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