import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
// Cambia el import de auth
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Inicializa Firebase si no está inicializado
const firebaseConfig = {
    apiKey: "AIzaSyAU3mRgL465cBZZXwZimnUwt9pWheYUkoA",
    authDomain: "aircare-protection.firebaseapp.com",
    projectId: "aircare-protection",
    storageBucket: "aircare-protection.firebasestorage.app",
    messagingSenderId: "90031869318",
    appId: "1:90031869318:ios:5f4b946b5db364c5f0f007"
};
let app;
try {
    app = initializeApp(firebaseConfig);
} catch (e) {
    // ya inicializado
}

export default function Login({ navigation }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            mail: '',
            contrasena: ''
        }
    });
    const [authError, setAuthError] = useState('');

    const onSubmit = async (data) => {
        setAuthError('');
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, data.mail, data.contrasena);
        } catch (error) {
            setAuthError(error.message);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <View style={styles.contenido}>
                <Text style={styles.textoInicio}>Iniciar sesión</Text>
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

                <Text style={styles.campoTexto}>Contraseña</Text>
                <Controller
                    control={control}
                    name='contrasena'
                    rules={{ required: 'Ingrese su contraseña' }}
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

                <Pressable onPress={() => navigation.navigate('Registrar')}>
                    <Text style={styles.noCuenta}>¿No tienes una cuenta?</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.noCuenta}>¿Olvidaste tu contraseña?</Text>
                </Pressable>
                {authError ? <Text style={styles.textoError}>{authError}</Text> : null}
                <Pressable style={styles.boton} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.textButton}>Iniciar sesión</Text>
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
    textoError: { 
        color: 'red',
        fontSize: 14,
        marginTop: 5,
        alignSelf: 'flex-start',
    }
});