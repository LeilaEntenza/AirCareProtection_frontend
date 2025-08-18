import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import ElegirFoto from '../components/ElegirFoto';

export default function Register({ navigation }) {
    const { control, handleSubmit, formState: {errors} } = useForm({
        defaultValues:{
            nombre: '',
            mail: '',
            contrasena: '',
            foto: ''
        }
    });
    const onSubmit = (data) => {
        navigation.navigate('EnviadoExito');
    }
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.contenido}>
                <Text style={styles.textoInicio}>Registrar</Text>
                <Text style={styles.campoTexto}>Foto de perfil</Text>
                <ElegirFoto/>
                {errors.foto && <Text style={styles.textoError}>{errors.foto.message}</Text>}
                <Text style={styles.campoTexto}>Mail</Text>
                <Controller
                control={control}
                name='mail'
                rules={{
                    required: 'Ingrese su mail',
                    pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido',
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    style={styles.input}
                    placeholder='Mail'
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    />
                )}
                />
                {errors.mail && <Text style={styles.textoError}>{errors.mail.message}</Text>}

                <Text style={styles.campoTexto}>Nombre</Text>
                <Controller
                control={control}
                name='nombre'
                rules={{ required: 'Ingrese su nombre' }}
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
                <Text style={styles.campoTexto}>Contraseña</Text>
                <Controller
                control={control}
                name='contrasena'
                rules={{
                    required: 'Ingrese su contraseña',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    style={styles.input}
                    placeholder='Contraseña'
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={true} 
                    />
                )}
                />
                {errors.contrasena && <Text style={styles.textoError}>{errors.contrasena.message}</Text>}

                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={styles.noCuenta}>Iniciar sesión</Text>
                </Pressable>
                <View style={styles.buttonCont}>
                    <Pressable style={styles.boton} onPress={handleSubmit(onSubmit)}><Text style={styles.textButton}>Registrar</Text></Pressable>
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
        marginTop: 15,
        marginBottom: 15,
        textAlign: 'center',
        color: '#636891',
        fontSize: 14,
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