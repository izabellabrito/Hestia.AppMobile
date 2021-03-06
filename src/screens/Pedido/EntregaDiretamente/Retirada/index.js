import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { ActivityIndicator, View, Image, Linking } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const GOOGLE_MAPS_APIKEY = 'AIzaSyA3mV40D5XY4TNcdA_733TxMw1l5jdSCRU';

import { Container, CardInfo, BotoesContainer, Botao, Loading } from './styles';
import * as colors from '../../../../styles/colors';
import CustomText from '../../../../components/UI/Text';

export default function RetiradaDiretamente({ navigation, route }) {
	const [destino, setDestino] = useState({
		latitude: -23.6670853,
		longitude: -46.7553389,
		atitudeDelta: 0.05,
		longitudeDelta: 0.05,
	});
	const [localidadeAtual, setLocalidadeAtual] = useState(null);
	const [loading, setLoading] = useState(true);

	async function obtemLocalizao() {
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

	useEffect(() => {
		obtemLocalizao();
	});

	function encerramento() {
		navigation.navigate('Avaliacao', { id: route.params.id });
	}

	return (
		<Container>
			{loading && (
				<Loading>
					<ActivityIndicator animating={loading} size="large" color={colors.azul} />
				</Loading>
			)}

			<CardInfo>
				<CustomText fontSize="17px" type="semiBold" align="center" color={colors.cinza}>
					De preferência, siga o caminho informado pela rota!
				</CustomText>
			</CardInfo>

			<MapView style={{ flex: 1 }} initialRegion={localidadeAtual} showsCompass={true} showsUserLocation={true}>
				<MapView.Marker coordinate={destino}>
					<View>
						<Image
							source={require('../../../../../assets/icons/washmachine.png')}
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
					<CustomText fontSize="14px" type="semiBold" align="center">
						Contato com o prestador
					</CustomText>
				</Botao>
				<Botao onPress={encerramento} bl>
					<CustomText fontSize="20px" type="semiBold" align="center">
						Retirado
					</CustomText>
				</Botao>
			</BotoesContainer>
		</Container>
	);
}
