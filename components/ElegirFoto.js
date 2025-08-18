import React, { useState } from "react";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

export default function ElegirFoto() {
    const [imagen, setImagen] = useState(null);
    const seleccionarDeGaleria = () =>{
        launchImageLibrary({mediaType: 'photo'}, (response)=>{
            if(response.didCancel){
                console.log("El usuario canceló");
            }
            else if(response.errorMessage){
                console.log('ImagePicker error: ', response.errorMessage);
            }
            else{
                if (response.assets && response.assets[0]) setImagen(response.assets[0].uri);
            }
        })
    }
    const sacarFoto = () =>{
        launchCamera({mediaType: 'photo'}, (response)=>{
            if(response.didCancel){
                console.log('El usuario canceló');
            }
            else if(response.errorMessage){
                console.log('ImagePicker error: ', response.errorMessage);
            }
            else{
                if (response.assets && response.assets[0]) setImagen(response.assets[0].uri);
            }
        })
    }

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
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
        borderRadius:5,
        justifyContent: "center",
        margin: 4,
    },
    textoPress: {
        textAlign: 'center',
        color: '#30376e'
    }
})