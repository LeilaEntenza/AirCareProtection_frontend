import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TextInput, Pressable} from 'react-native';

export default function Ubicación({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Image
      source={{ uri: 'https://www.esedeerre.com/wp-content/uploads/2012/06/geolocalizacion-google-maps.jpg' }}
      style={styles.ubicacionMapa}
      resizeMode="contain"
      />
      <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10 }}>Cambiar ubicación</Text>
      <TextInput
          style={styles.input}
          placeholder='Ubicación'
      />
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
    ubicacionMapa: {
    width: '100%',     
    height: 200, 
    marginTop: 10,
    alignSelf: 'center', 
    overflow: 'hidden',  
    },
    input: {
        width: '50%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: 'white',
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