import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Ajustes({navigation}) {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.textoPrincipal}>General</Text>
            <Pressable onPress={()=>navigation.navigate("CuentaAjuste")} style={({ pressed }) => [styles.seccionAjuste, pressed && styles.seccionAjustePressed]}>
                <Icon name="account" size={30} color="#636891" />
                <Text style={styles.textoSeccion}>Cuenta</Text>
            </Pressable>

            <Text style={styles.textoPrincipal}>Privacidad</Text>
            <Pressable onPress={()=>navigation.navigate("UbicacionAjuste")} style={({ pressed }) => [styles.seccionAjuste, pressed && styles.seccionAjustePressed]}>
                <Icon name="map-marker" size={30} color="#636891" />
                <Text style={styles.textoSeccion}>Ubicación</Text>
            </Pressable>
            <Pressable onPress={()=>navigation.navigate("ContactosAjuste")} style={({ pressed }) => [styles.seccionAjuste, pressed && styles.seccionAjustePressed]}>
                <Icon name="account-group" size={30} color="#636891" />
                <Text style={styles.textoSeccion}>Contactos</Text>
            </Pressable>

            <Text style={styles.textoPrincipal}>Notificaciones</Text>
            <Pressable onPress={()=>navigation.navigate("NotificacionesAjuste")} style={({ pressed }) => [styles.seccionAjuste, pressed && styles.seccionAjustePressed]}>
                <Icon name="bell" size={30} color="#636891" />
                <Text style={styles.textoSeccion}>Alertas</Text>
            </Pressable>

            <Pressable style={({ pressed }) => [styles.seccionAjuste, pressed && styles.seccionAjustePressed]}>
                <Icon name="logout" size={20} color="#636891" />
                <Text style={styles.textoSeccion}>Cerrar sesión</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, width: '100%' },
    scrollContent: { paddingVertical: 12, paddingHorizontal: 12, paddingBottom: 40 },
    textoPrincipal: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#222',
    },
    seccionAjuste: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderRadius: 8,
        marginBottom: 5,
    },
    seccionAjustePressed: {
        backgroundColor: '#e6e9ef',
    },
    textoSeccion: {
        marginLeft: 15,
        fontSize: 18,
        color: '#222',
    },
});
