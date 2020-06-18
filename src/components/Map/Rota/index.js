import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { Text } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const GOOGLE_MAPS_APIKEY = 'AIzaSyA3mV40D5XY4TNcdA_733TxMw1l5jdSCRU';

import { Container, CardInfo, TextoInfo, BotoesContainer, Botao, TextoBotao } from './styles';

export default function RotaMap({ children }) {
	const [destino, setDestino] = useState({
		latitude: -23.6670853,
		longitude: -46.7553389,
		atitudeDelta: 0.045,
		longitudeDelta: 0.045,
	});
	const [localidadeAtual, setLocalidadeAtual] = useState(null);

	async function getLocation() {
		const { status } = await Permissions.getAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			alert('Hey! You have not enabled selected permissions');
		}

		const localidadeUsuario = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
		const { coords } = localidadeUsuario;

		setLocalidadeAtual({
			latitude: coords.latitude,
			longitude: coords.longitude,
			latitudeDelta: 60,
			longitudeDelta: 60,
		});
	}

	useEffect(() => {
		getLocation();
	});

	return (
		<Container>
			<CardInfo>
				<TextoInfo>De preferência, siga o caminho informado pela rota!</TextoInfo>
			</CardInfo>

			<MapView style={{ flex: 1 }} initialRegion={localidadeAtual} showsCompass={true} showsUserLocation={true}>
				<MapView.Marker coordinate={destino}>
					<MapView.Callout>
						<Text>Prestador</Text>
					</MapView.Callout>
				</MapView.Marker>

				<MapViewDirections origin={localidadeAtual} destination={destino} apikey={GOOGLE_MAPS_APIKEY} />
			</MapView>

			{children}
		</Container>
	);
}
