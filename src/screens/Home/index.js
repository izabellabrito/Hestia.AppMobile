import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { View, ActivityIndicator, Image } from 'react-native';
import CustomText from '../../components/UI/Text';
import * as colors from '../../styles/colors';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import { Container, Botao, Loading } from './styles';

import api from '../../services/api';
import mostrarAlerta from '../../helpers/alert';
import { usuarioStorage } from '../../helpers/dadosUsuario';

export default function Home({ navigation }) {
	const [markers, setMarkers] = useState([
		{ latitude: -23.6670853, longitude: -46.7553389 },
		{ latitude: -22.6670853, longitude: -47.7553389 },
	]);
	const [localidadeAtual, setLocalidadeAtual] = useState(null);
	const [loading, setLoading] = useState(true);

	async function obtemLocalizacao() {
		const { status } = await Permissions.askAsync(Permissions.LOCATION);
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

		await obtemColaboradores(coords.latitude, coords.longitude);
	}

	async function obtemColaboradores(latitute, longitude) {
		setLoading(false);
		const storage = await usuarioStorage();
		const jwt = storage.token;
		
		await api
			.get(
				`/usuario-colaborador/obter-colaboradores-proximos?latitude=${latitute}&longitute=${longitude}&distancia=${121}`,
				{
					headers: { Authorization: `Bearer ${jwt}` },
				}
			)
			.then((response) => {
				console.log(response.data);
				if (response.data.success) {
					let array = [];
					response.data.data.map((item) => {
						array.push({ latitude: item.endereco.latitude, longitude: item.endereco.longitude });
					});

					setMarkers(array);
				}
			})
			.catch((error) => {
				console.log(error.response.data.errors[0]);
				setMarkers([
					{ latitude: -23.6670853, longitude: -46.7553389 },
					{ latitude: -22.6670853, longitude: -47.7553389 },
				]);
			});
	}

	useEffect(() => {
		obtemLocalizacao();
	}, []);

	return (
		<Container>
			{loading && (
				<Loading>
					<ActivityIndicator animating={loading} size="large" color={colors.azul} />
				</Loading>
			)}

			<MapView style={{ flex: 1 }} initialRegion={localidadeAtual} showsCompass={true} showsUserLocation={true}>
				{markers.map((coord) => {
					return (
						<MapView.Marker coordinate={coord}>
							<View>
								<Image
									source={require('../../../assets/icons/washmachine.png')}
									style={{ width: 30, height: 30 }}
								/>
							</View>
						</MapView.Marker>
					);
				})}
			</MapView>
			<Botao onPress={() => navigation.navigate('NovoPedido')}>
				<CustomText fontSize="20px" type="semiBold">
					Solicitar novo serviço
				</CustomText>
			</Botao>
		</Container>
	);
}
