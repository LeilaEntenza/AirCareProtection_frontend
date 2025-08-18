import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

export default function Dispositivo ({ name = 'Dispositivo', imageUri, initialOn = false }){
	const [on, setOn] = useState(initialOn);
	const deviceImage = imageUri || 'https://acdn-us.mitiendanube.com/stores/001/593/734/products/ngs-025-rj-marzo-20191-e7ad1646b181ad357216267077747762-1024-1024.jpg';
	const powerIcon = 'https://images.vexels.com/media/users/3/153377/isolated/preview/4e3ad7aee69e5da6de7e91b63e3952de-apagar-el-icono-de-trazo.png';

	return (
		<View style={styles.card} accessible accessibilityRole="button" accessibilityLabel={`${name} card`}>
			<Image source={{ uri: deviceImage }} style={styles.deviceImage} />

			<View style={styles.content}>
				<Text style={styles.title} numberOfLines={1}>{name}</Text>
				<Text style={[styles.status, on ? styles.statusOn : styles.statusOff]} numberOfLines={1}>
					{on ? 'Encendido' : 'Apagado'}
				</Text>

				<Pressable
					onPress={() => setOn(prev => !prev)}
					style={({ pressed }) => [
						styles.button,
						on ? styles.buttonOn : styles.buttonOff,
						pressed && styles.buttonPressed
					]}
					accessibilityRole="button"
					accessibilityLabel={on ? 'Apagar dispositivo' : 'Encender dispositivo'}
				>
					<Image source={{ uri: powerIcon }} style={styles.icon} />
					<Text style={styles.buttonText} numberOfLines={1}>{on ? 'Apagar' : 'Encender'}</Text>
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 12,
		borderRadius: 12,
		marginVertical: 6,
		marginHorizontal: 6,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.12,
		shadowRadius: 4,
		elevation: 3,
        width: 200,
        minHeight: 120,
        maxHeight: 120,
	},
	deviceImage: {
		width: 60,
		height: 60,
		borderRadius: 8,
		resizeMode: 'cover',
		marginRight: 12,
	},
	content: {
		flex: 1,
		justifyContent: 'space-between',
		height: '100%',
	},
	title: {
		fontSize: 14,
		fontWeight: '600',
		color: '#222',
		marginBottom: 4,
	},
	status: {
		fontSize: 12,
		marginBottom: 8,
	},
	statusOn: {
		color: '#1e8e3e',
	},
	statusOff: {
		color: '#b22222',
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: 6,
		alignSelf: 'flex-start',
		minWidth: 80,
		justifyContent: 'center',
	},
	buttonOn: {
		backgroundColor: '#ffefef',
		borderWidth: 1,
		borderColor: '#ff7b7b',
	},
	buttonOff: {
		backgroundColor: '#eff6ff',
		borderWidth: 1,
		borderColor: '#7aa3ff',
	},
	buttonPressed: {
		opacity: 0.8,
	},
	icon: {
		width: 16,
		height: 16,
		marginRight: 6,
		tintColor: undefined,
	},
	buttonText: {
		fontSize: 12,
		fontWeight: '600',
		color: '#222',
	},
});