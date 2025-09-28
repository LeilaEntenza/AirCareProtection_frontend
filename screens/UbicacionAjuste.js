import { useState} from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TextInput, Pressable, Switch} from 'react-native';

export default function Ubicación({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
      <View style={styles.ubicacionNotificacion}>
        <Text style={styles.label}>Verificar ubicación en tiempo real</Text>
        <Switch
          trackColor={{ false: "#000000", true: "#000000" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#000000"
          onValueChange={toggleSwitch}
          value={isEnabled}
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
        ubicacionNotificacion: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#e6e6e6",
  },
});