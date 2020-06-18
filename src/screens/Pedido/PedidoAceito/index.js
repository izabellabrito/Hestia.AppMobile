import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { View, ActivityIndicator, Image, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import { Container, Content, BotoesContainer, Botao, Loading, Radio, RadioContainer, Entrega } from './styles';
import * as colors from '../../../styles/colors';
import CustomText from '../../../components/UI/Text';

export default function PedidoAceito({ navigation, route }) {
	const [destino, setDestino] = useState({
		latitude: -23.6670853,
		longitude: -46.7553389,
		atitudeDelta: 0.045,
		longitudeDelta: 0.045,
	});
	const [dadosColaborador, setDadosColaborador] = useState({
		endereco: {
			longitude: 0,
			latitude: 0,
			address: 'Rua Maestro Marzagão',
			city: 'São Paulo',
			state: 'São Paulo',
			zip: '05852-460',
			country: 'São Paulo',
		},
		nomeCompleto: 'Juliana',
		email: 'colaborador@colaborador.com',
		telefone: '11954826081',
		dataDeNascimento: '2020-06-17T03:42:01.190Z',
		cpf: '460.4653.128-27',
		avaliacao: 4,
		id: '1211313',
	});
	const [localidadeAtual, setLocalidadeAtual] = useState(null);
	const [loading, setLoading] = useState(true);
	const [checked, setChecked] = useState('delivery');

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

	useEffect(() => {
		obtemLocalizao();
	});

	function aceitarPedido() {
		if (checked === 'delivery') {
			Alert.alert(
				'Taxa de entrega',
				'O serviço de entrega por delivery tem um custo adicional de R$8,99, deseja continuar?',
				[
					{
						text: 'Não',
						onPress: () => {},
						style: 'cancel',
					},
					{
						text: 'Sim',
						onPress: () =>
							navigation.navigate('Pagamento', {
								entrega: 'delivery',
								selecionados: route.params.selecionados,
								total: route.params.total,
							}),
					},
				],
				{ cancelable: false }
			);
		} else {
			navigation.navigate('Pagamento', {
				entrega: 'pessoalmente',
				selecionados: route.params.selecionados,
				total: route.params.total,
			});
		}
	}

	return (
		<Container>
			{loading && (
				<Loading>
					<ActivityIndicator animating={loading} size="large" color={colors.azul} />
				</Loading>
			)}
			<Content>
				<View style={{ alignItems: 'center' }}>
					<CustomText fontSize="20px" type="semiBold" align="center" color={colors.cinza}>
						{dadosColaborador.nomeCompleto} aceitou seu pedido!
					</CustomText>
				</View>
				<View style={{ paddingLeft: 20, paddingRight: 20 }}>
					<CustomText fontSize="17px" color={colors.cinza} type="semiBold" marginTop="10px">
						Dados
					</CustomText>
					<CustomText fontSize="17px" color={colors.cinza} type="regular">
						Endereço: Rua Maestro Marzagão, 23 - 05852-460 / São Paulo, SP
					</CustomText>

					<CustomText fontSize="17px" color={colors.cinza} type="semiBold" marginTop="15px">
						Avaliação: {dadosColaborador.avaliacao}{' '}
						<FontAwesomeIcon style={{ color: '#f2e30a' }} size={13} icon={faStar} />
					</CustomText>
					<CustomText fontSize="17px" color={colors.cinza} type="semiBold" marginTop="15px">
						Previsão: 4hrs
					</CustomText>
				</View>

				<Entrega>
					<CustomText color={colors.cinza} fontSize="16px" marginTop="15px" type="semiBold">
						Como deseja realizar a entrega?
					</CustomText>
					<RadioButton.Group onValueChange={(value) => setChecked(value)} value={checked}>
						<RadioContainer>
							<RadioButton.Item
								style={{ backgroundColor: '#fff', borderRadius: 30, marginRight: 10 }}
								label="Delivery"
								value="delivery"
							/>
							<RadioButton.Item
								style={{ backgroundColor: '#fff', borderRadius: 30 }}
								label="Pessoalmente"
								value="pessoalmente"
							/>
						</RadioContainer>
					</RadioButton.Group>
				</Entrega>
			</Content>

			<MapView
				style={{ height: '36%' }}
				initialRegion={localidadeAtual}
				showsCompass={true}
				showsUserLocation={true}
			>
				<MapView.Marker coordinate={destino}>
					<View>
						<Image
							source={require('../../../../assets/icons/washmachine.png')}
							style={{ width: 30, height: 30 }}
						/>
					</View>
				</MapView.Marker>
			</MapView>
			<BotoesContainer>
				<Botao onPress={() => navigation.navigate('Home')}>
					<CustomText fontSize="20px" type="semiBold">
						Cancelar
					</CustomText>
				</Botao>
				<Botao onPress={() => aceitarPedido()} bl>
					<CustomText fontSize="20px" type="semiBold">
						Aceitar
					</CustomText>
				</Botao>
			</BotoesContainer>
		</Container>
	);
}
