import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { View, Text, Image, StyleSheet, Pressable, Alert } from 'react-native';

export default function ElegirFoto() {
    const [imagen, setImagen] = useState(null);
    
    const seleccionarDeGaleria = async () => {
        try {
            // Solicitar permisos
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permisos necesarios', 'Se necesitan permisos para acceder a la galería');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });
            
            if (!result.canceled && result.assets && result.assets[0]) {
                setImagen(result.assets[0].uri);
            }
        } catch (error) {
            console.log('Error al abrir galería:', error);
            Alert.alert('Error', 'No se pudo abrir la galería');
        }
    };
    
    const sacarFoto = async () => {
        try {
            // Solicitar permisos
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permisos necesarios', 'Se necesitan permisos para acceder a la cámara');
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });
            
            if (!result.canceled && result.assets && result.assets[0]) {
                setImagen(result.assets[0].uri);
            }
        } catch (error) {
            console.log('Error al abrir cámara:', error);
            Alert.alert('Error', 'No se pudo abrir la cámara');
        }
    };

    return(
        <View style={styles.container}>
            <Pressable onPress={seleccionarDeGaleria} style={styles.buttonFoto}>
                <Text style={styles.textoPress}>Abrir galería</Text>
            </Pressable>
            <Pressable onPress={sacarFoto} style={styles.buttonFoto}>
                <Text style={styles.textoPress}>Sacar foto</Text>
            </Pressable>
            {imagen && (
                <Image source={{uri: imagen}} style={styles.imagenSeleccionada}/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    imagenSeleccionada:{
        width: 80,
        height: 80,
        borderRadius: 40,
        marginTop: 8,
    },
    buttonFoto: {
        width: '50%',
        borderWidth: 1,
        borderColor: '#30376e',
        backgroundColor:'white',
        height: 40,
        fontSize: 15,
        borderRadius: 5,
        justifyContent: "center",
        margin: 4,
    },
    textoPress: {
        textAlign: 'center',
        color: '#30376e'
    }
})