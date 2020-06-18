import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { ActivityIndicator, Image, View, Linking } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import { Container, BotoesContainer, Botao, Loading } from './styles';
import * as colors from '../../../../styles/colors';
import CustomText from '../../../../components/UI/Text';

const GOOGLE_MAPS_APIKEY = 'AIzaSyA3mV40D5XY4TNcdA_733TxMw1l5jdSCRU';

import api from '../../../../services/api';
import mostrarAlerta from '../../../../helpers/alert';
import { usuarioStorage } from '../../../../helpers/dadosUsuario';

export default function EntregaDelivery({ navigation, route }) {
	const [destino, setDestino] = useState({
		latitude: -23.6670853,
		longitude: -46.7553389,
		atitudeDelta: 0.05,
		longitudeDelta: 0.05,
	});
	const [motoboy, setMotoboy] = useState({
		latitude: -23.6681,
		longitude: -46.7553389,
		atitudeDelta: 0.05,
		longitudeDelta: 0.05,
	});
	const [localidadeAtual, setLocalidadeAtual] = useState(null);
	const [loading, setLoading] = useState(true);

	async function obtemLocalizacao() {
		const { status } = await Permissions.getAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			alert('Hey! You have not enabled selected permissions');
		}

		const localidadeUsuario = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
		const { coords } = localidadeUsuario;
		setLocalidadeAtual({
			latitude: coords.latitude,
			longitude: coords.longitude,
			latitudeDelta: 0.00522,
			longitudeDelta: 0.00522,
		});

		setLoading(false);
	}

	function contato() {
		Linking.openURL(`tel:11954826081`);
	}

	async function atualizaStatus() {
		const storage = await usuarioStorage();
		const jwt = storage.token;
		await api
			.put(
				`/pedido/atualizar-status-pedido/${route.params.id}?statusNovo=4`,
				{},
				{
					headers: { Authorization: `Bearer ${jwt}` },
				}
			)
			.then((response) => {})
			.catch((error) => {});

		setTimeout(() => {
			navigation.navigate('Andamento', { id: route.params.id });
		}, 15000);
	}

	useEffect(() => {
		obtemLocalizacao();
		atualizaStatus();
	}, []);

	return (
		<Container>
			{loading && (
				<Loading>
					<ActivityIndicator animating={loading} size="large" color={colors.azul} />
				</Loading>
			)}
			<MapView style={{ flex: 1 }} initialRegion={localidadeAtual} showsCompass={true} showsUserLocation={true}>
				<MapView.Marker coordinate={destino}>
					<View>
						<Image
							source={require('../../../../../assets/icons/washmachine.png')}
							style={{ width: 30, height: 30 }}
						/>
					</View>
				</MapView.Marker>

				<MapView.Marker coordinate={motoboy}>
					<View>
						<Image
							source={require('../../../../../assets/icons/entrega.png')}
							style={{ width: 30, height: 30 }}
						/>
					</View>
				</MapView.Marker>

				<MapViewDirections
					origin={localidadeAtual}
					destination={destino}
					apikey={GOOGLE_MAPS_APIKEY}
					strokeWidth={4}
					strokeColor={colors.azul}
				/>
			</MapView>
			<BotoesContainer>
				<Botao onPress={contato}>
					<CustomText fontSize="18px" type="semiBold" align="center">
						Contato com o motoboy
					</CustomText>
				</Botao>
			</BotoesContainer>
		</Container>
	);
}
