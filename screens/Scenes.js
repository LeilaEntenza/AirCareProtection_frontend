import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
export default function Scenes({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.textoInicio}>Scenes</Text>
      <View style={styles.cardScene}>
        <Image
          source={{ uri: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTggMTJhNiA2IDAgMSAxLTEyIDBhNiA2IDAgMCAxIDEyIDAiLz48cGF0aCBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiAxLjI1YS43NS43NSAwIDAgMSAuNzUuNzV2MWEuNzUuNzUgMCAwIDEtMS41IDBWMmEuNzUuNzUgMCAwIDEgLjc1LS43NU00LjM5OSA0LjM5OWEuNzUuNzUgMCAwIDEgMS4wNiAwbC4zOTMuMzkyYS43NS43NSAwIDAgMS0xLjA2IDEuMDYxbC0uMzkzLS4zOTNhLjc1Ljc1IDAgMCAxIDAtMS4wNm0xNS4yMDIgMGEuNzUuNzUgMCAwIDEgMCAxLjA2bC0uMzkzLjM5M2EuNzUuNzUgMCAwIDEtMS4wNi0xLjA2bC4zOTMtLjM5M2EuNzUuNzUgMCAwIDEgMS4wNiAwTTEuMjUgMTJhLjc1Ljc1IDAgMCAxIC43NS0uNzVoMWEuNzUuNzUgMCAwIDEgMCAxLjVIMmEuNzUuNzUgMCAwIDEtLjc1LS43NW0xOSAwYS43NS43NSAwIDAgMSAuNzUtLjc1aDFhLjc1Ljc1IDAgMCAxIDAgMS41aC0xYS43NS43NSAwIDAgMS0uNzUtLjc1bS0yLjEwMiA2LjE0OGEuNzUuNzUgMCAwIDEgMS4wNiAwbC4zOTMuMzkzYS43NS43NSAwIDEgMS0xLjA2IDEuMDZsLS4zOTMtLjM5M2EuNzUuNzUgMCAwIDEgMC0xLjA2bS0xMi4yOTYgMGEuNzUuNzUgMCAwIDEgMCAxLjA2bC0uMzkzLjM5M2EuNzUuNzUgMCAxIDEtMS4wNi0xLjA2bC4zOTItLjM5M2EuNzUuNzUgMCAwIDEgMS4wNjEgME0xMiAyMC4yNWEuNzUuNzUgMCAwIDEgLjc1Ljc1djFhLjc1Ljc1IDAgMCAxLTEuNSAwdi0xYS43NS43NSAwIDAgMSAuNzUtLjc1IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=' }}
          style={{ width: 70, height: 70 }}
        />
        <Pressable onPress={() => navigation.navigate('Clima')}>
          <Text style={styles.textoCardScene}>Clima</Text>
        </Pressable>
      </View>
      <View style={styles.cardScene}>
        <Image
          source={{ uri: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTQuODYzIDEzLjRWNC45MzlhMi45MyAyLjkzIDAgMCAwLS44NC0yLjAzYTIuODYgMi44NiAwIDAgMC0yLjIzLS44MmEyLjk1IDIuOTUgMCAwIDAtMi42NiAzbC4wMSA4LjI4YTQuNzU1IDQuNzU1IDAgMCAwIDEuOSA4LjQ2YTUgNSAwIDAgMCAuOTUuMDlhNC43NiA0Ljc2IDAgMCAwIDQuNzYtNC43NWE0LjY4IDQuNjggMCAwIDAtMS44OS0zLjc2OW0tLjQ4IDYuNjZhMy43OCAzLjc4IDAgMCAxLTMuMTUuNzhhMy43IDMuNyAwIDAgMS0yLjkyLTIuOThhMy43NSAzLjc1IDAgMCAxIDEuNDMtMy42OWEuOTYuOTYgMCAwIDAgLjM5LS43N1Y1LjA4OWExLjk3IDEuOTcgMCAwIDEgMS43My0yYS43LjcgMCAwIDEgLjE0LS4wMWExLjg4IDEuODggMCAwIDEgMS44NiAxLjg2VjEzLjRhLjk2Ljk2IDAgMCAwIC4zOS43N2EzLjc0MiAzLjc0MiAwIDAgMSAuMTMgNS44OSIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xMy44OTMgMTcuMTY5YTEuODkgMS44OSAwIDAgMS0zLjc4IDBhMS44NiAxLjg2IDAgMCAxIDEuMzktMS44MVY1LjRhLjUuNSAwIDAgMSAxIDB2OS45NmExLjg3IDEuODcgMCAwIDEgMS4zOSAxLjgwOSIvPjwvc3ZnPg==' }}
          style={{ width: 70, height: 70 }}
        />
        <Pressable onPress={() => navigation.navigate('Temperatura')}>
          <Text style={styles.textoCardScene}>Temperatura</Text>
        </Pressable>
      </View>
      <View style={styles.cardScene}>
        <Image
          source={{ uri: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTIgMTEuNUEyLjUgMi41IDAgMCAxIDkuNSA5QTIuNSAyLjUgMCAwIDEgMTIgNi41QTIuNSAyLjUgMCAwIDEgMTQuNSA5YTIuNSAyLjUgMCAwIDEtMi41IDIuNU0xMiAyYTcgNyAwIDAgMC03IDdjMCA1LjI1IDcgMTMgNyAxM3M3LTcuNzUgNy0xM2E3IDcgMCAwIDAtNy03Ii8+PC9zdmc+' }}
          style={{ width: 70, height: 70 }}
        />
        <Pressable onPress={() => navigation.navigate('Ubicacion')}>
          <Text style={styles.textoCardScene}>Ubicación</Text>
        </Pressable>
      </View>
      <View style={styles.cardScene}>
        <Image
          source={{ uri: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNiAxN2MwLTIgNC0zLjEgNi0zLjFzNiAxLjEgNiAzLjF2MUg2bTktOWEzIDMgMCAwIDEtMyAzYTMgMyAwIDAgMS0zLTNhMyAzIDAgMCAxIDMtM2EzIDMgMCAwIDEgMyAzTTMgNXYxNGEyIDIgMCAwIDAgMiAyaDE0YTIgMiAwIDAgMCAyLTJWNWEyIDIgMCAwIDAtMi0ySDVhMiAyIDAgMCAwLTIgMiIvPjwvc3ZnPg==' }}
          style={{ width: 70, height: 70 }}
        />
        <Pressable onPress={() => navigation.navigate('Contacto')}>
          <Text style={styles.textoCardScene}>Contactos</Text>
        </Pressable>
      </View>
      <View style={styles.cardScene}>
        <Image
          source={{ uri: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTggMTguNWExLjUgMS41IDAgMCAwIDEuNS0xLjVhMS41IDEuNSAwIDAgMC0xLjUtMS41YTEuNSAxLjUgMCAwIDAtMS41IDEuNWExLjUgMS41IDAgMCAwIDEuNSAxLjVtMS41LTlIMTdWMTJoNC40NnpNNiAxOC41QTEuNSAxLjUgMCAwIDAgNy41IDE3QTEuNSAxLjUgMCAwIDAgNiAxNS41QTEuNSAxLjUgMCAwIDAgNC41IDE3QTEuNSAxLjUgMCAwIDAgNiAxOC41TTIwIDhsMyA0djVoLTJhMyAzIDAgMCAxLTMgM2EzIDMgMCAwIDEtMy0zSDlhMyAzIDAgMCAxLTMgM2EzIDMgMCAwIDEtMy0zSDFWNmMwLTEuMTEuODktMiAyLTJoMTR2NHpNOCA2djNINXYyaDN2M2gydi0zaDNWOWgtM1Y2eiIvPjwvc3ZnPg==' }}
          style={{ width: 70, height: 70 }}
        />
        <Pressable onPress={() => navigation.navigate('Emergencias')}>
          <Text style={styles.textoCardScene}>Servicios de emergencia</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    container: { flex: 1, width: '100%' },
    scrollContent: { paddingVertical: 12, paddingHorizontal: 12, paddingBottom: 40 },
    textoInicio: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
    },
    cardScene: {
        backgroundColor: '#979797',
        borderRadius: 10,
        padding: 20,
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textoCardScene: {
        fontSize: 20,
        marginLeft: 20,
        color: 'white',
    },
});