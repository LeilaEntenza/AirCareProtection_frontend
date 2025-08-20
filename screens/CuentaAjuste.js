import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import ElegirFoto from '../components/ElegirFoto';

export default function CuentaAjuste({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      nombre: '',
      mail: '',
      foto: ''
    }
  });

  const onSubmit = (data) => {
    setTimeout(() => {
      navigation.navigate('HomeMain');
    }, 0);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.contenido}>
        <Text style={styles.textoInicio}>Mi cuenta</Text>

        {/* Foto */}
        <Text style={styles.campoTexto}>Foto de perfil</Text>
        <Image 
          source={{ uri: 'https://i.pinimg.com/736x/8a/5d/e9/8a5de9ecd92b45650a93e2c5f6f0026a.jpg' }} 
          style={{ width: 100, height: 100, borderRadius: 50 }} 
        />
        <ElegirFoto/>
        <Text style={styles.textoEliminar}>Eliminar</Text>

        {/* Nombre */}
        <Text style={styles.campoTexto}>Nombre</Text>
        <Controller
          control={control}
          name="nombre"
          rules={{ required: 'Ingrese el nombre' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.nombre && <Text style={styles.textoError}>{errors.nombre.message}</Text>}

        {/* Mail */}
        <Text style={styles.campoTexto}>Mail</Text>
        <Controller
          control={control}
          name="mail"
          rules={{
            required: 'Ingrese un mail válido',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // regex simple
              message: 'Formato de mail inválido'
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Mail"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.mail && <Text style={styles.textoError}>{errors.mail.message}</Text>}

        {/* Botón */}
        <View style={styles.buttonCont}>
          <Pressable style={styles.boton} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.textButton}>Guardar</Text>
          </Pressable>
        </View>
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
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  textoInicio: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  campoTexto: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 15,
    textAlign: 'left',
    fontWeight: '500',
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    fontSize: 16,
  },
  contenido: {  
    width: '90%',    
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  boton: {
    backgroundColor: '#636891',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonCont: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoError: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  textoEliminar: {
    fontSize: 16,
    marginTop: 10,
    alignSelf: 'flex-start',
    textDecorationLine: 'underline',
  },
});
