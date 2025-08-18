import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import ElegirFoto from '../components/ElegirFoto';

export default function AgregarDispositivo({ navigation }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues:{
            nombre: '',
            descripcion: '',
            foto: ''
        }
    });
    const onSubmit = (data) => {
        // evitar "Cannot update a component ... while rendering a diferente componente"
        // deferir la navegación al siguiente tick para no causar un setState durante el render
        setTimeout(() => {
            navigation.navigate('HomeMain');
        }, 0);
    };
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <View style={styles.contenido}>
                <Text style={styles.textoInicio}>Añadir dispositivo</Text>
                <Text style={styles.campoTexto}>Foto de perfil</Text>
                <ElegirFoto/>
                {errors.foto && <Text style={styles.textoError}>{errors.foto.message}</Text>}
                <Text style={styles.campoTexto}>Nombre</Text>
                <Controller
                control={control}
                name='nombre'
                rules={{ required: 'Ingrese el nombre' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    style={styles.input}
                    placeholder='Nombre'
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    />
                )}
                />
                {errors.nombre && <Text style={styles.textoError}>{errors.nombre.message}</Text>}
                <Text style={styles.campoTexto}>Descripción</Text>
                <Controller
                control={control}
                name='descripcion'
                rules={{ required: 'Ingrese la descripción' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    style={styles.input}
                    placeholder='Descripción (habitaciones)'
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    />
                )}
                />
                {errors.descripcion && <Text style={styles.textoError}>{errors.descripcion.message}</Text>}
                <View style={styles.buttonCont}>
                    <Pressable style={styles.boton} onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.textButton}>Añadir</Text>
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
    },
    noCuenta: {
        fontStyle: 'italic',
        marginTop: 10,
        marginBottom: 10,
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
    }
});