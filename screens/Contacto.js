import React from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Contacto({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.titulo}>Contactos seleccionados</Text>

      {/* Primera card */}
      <View style={styles.cardScene}>
        <Icon name="account-circle" size={50} color="white" />
        <View style={styles.textContainer}>
          <Text style={styles.textoCardScene}>Contacto 1</Text>
        </View>
        <Pressable onPress={() => console.log('Eliminar contacto 1')}>
          <Icon name="close-circle-outline" size={40} color="white" />
        </Pressable>
      </View>

      {/* Segunda card */}
      <View style={styles.cardScene}>
        <Icon name="account-circle" size={50} color="white" />
        <View style={styles.textContainer}>
          <Text style={styles.textoCardScene}>Contacto 2</Text>
        </View>
        <Pressable onPress={() => console.log('Eliminar contacto 2')}>
          <Icon name="close-circle-outline" size={40} color="white" />
        </Pressable>
      </View>

      {/* Botón Guardar */}
      <Pressable style={styles.botonGuardar} onPress={() => navigation.goBack()}>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 12,
  },
  titulo: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#222',
  },
  cardScene: {
    width: '90%',
    backgroundColor: '#636891',
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // asegura que eliminar esté a la derecha
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  textoCardScene: {
    fontSize: 18,
    color: 'white',
  },
  botonGuardar: {
    backgroundColor: '#636891',
    width: '60%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
