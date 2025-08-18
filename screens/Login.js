import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

export default function Login({ navigation }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            mail: '',
            contrasena: ''
        }
    });
    const onSubmit = (data) => {
        // autenticar / navegar
        navigation.replace('Main'); // o la lógica que uses
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
        paddingVertical: 12,
    },
    textoInicio: {
        fontSize: 24,
        marginBottom: 20,
    },
    campoTexto: {
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'left',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    contenido: {
        width: '40%',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15
    },
    noCuenta: {
        fontStyle: 'italic',
        marginTop: 10,
        marginBottom: 10,
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
    textoError: { color: 'red' }
});