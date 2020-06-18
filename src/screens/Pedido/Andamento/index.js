import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import {
	Container,
	Botao,
	StatusContainer,
	StatusItem,
	RadioContainer,
	Retirada,
	BotaoBottom,
	BotaoBottomContainer,
	Scroll,
} from './styles';
import * as colors from '../../../styles/colors';
import CustomText from '../../../components/UI/Text';

import api from '../../../services/api';
import mostrarAlerta from '../../../helpers/alert';
import { usuarioStorage } from '../../../helpers/dadosUsuario';

export default function Andamento({ navigation, route }) {
	const [dadosAndamento, setDadosAndamento] = useState({});
	const [status, setStatus] = useState([]);
	const [checked, setChecked] = useState('delivery');
	const [finalizado, setFinalizado] = useState(false);
	const [loading, setLoading] = useState(true);

	function continuar() {
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
							navigation.navigate('BuscandoEntregador', { etapa: 'retirada', id: route.params.id }),
					},
				],
				{ cancelable: false }
			);
		} else {
			navigation.navigate('RotaRetirada', { id: route.params.id });
		}
	}

	async function obtemAndamento() {
		const storage = await usuarioStorage();
		const jwt = storage.token;

		await api
			.get(`/pedido/obter-detalhe-pedido/${route.params.id}`, {
				headers: { Authorization: `Bearer ${jwt}` },
			})
			.then((response) => {
				if (response.data.success) {
					setDadosAndamento(response.data.data);
				}
			})
			.catch((error) => {
				mostrarAlerta('Atenção', 'Ocorreu um erro ao realizar sua solicitação. Tente novamente mais tarde.');
			});
		setLoading(false);
	}

	async function obtemStatusPedido() {
		const storage = await usuarioStorage();
		const jwt = storage.token;
		console.log(route.params.id);
		await api
			.get(`/pedido/obter-status-pedido/${route.params.id}`, {
				headers: { Authorization: `Bearer ${jwt}` },
			})
			.then((response) => {
				if (response.data.success) {
					setStatus(response.data.data);
					response.data.data.map((item) => {
						if (item.status === 5) {
							setFinalizado(true);
							return;
						} else if (item.status === 6) {
							setFinalizado(false);
							return;
						}
					});
				}
			})
			.catch((error) => {
				mostrarAlerta('Atenção', 'Ocorreu um erro ao realizar sua solicitação. Tente novamente mais tarde.');
			});
	}

	async function atualizar() {
		obtemAndamento();
		obtemStatusPedido();
	}

	useEffect(() => {
		obtemAndamento();
		obtemStatusPedido();
	}, []);

	return (
		<Container>
			{status.length > 0 && !loading && (
				<>
					<CustomText fontSize="25px" type="semiBold" color={colors.cinza} align="center" marginTop="20px">
						Aqui você pode acompanhar o status do seu serviço.
					</CustomText>
					<StatusContainer>
						<Scroll showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
							{status.map((item) => {
								return (
									<StatusItem>
										<View style={{ width: '30%' }}>
											<FontAwesomeIcon style={{ color: 'blue' }} size={30} icon={faCheckCircle} />
										</View>
										<View style={{ width: '70%' }}>
											{item.status === 1 && (
												<CustomText fontSize="17px" type="semiBold" color={colors.cinza}>
													Seu pedido está aguardando o entregador -{' '}
													{moment(item.dataStatus).format('DD/MM/YYYY HH:mm:ss')}
												</CustomText>
											)}
											{item.status === 2 && (
												<CustomText fontSize="17px" type="semiBold" color={colors.cinza}>
													Seu pedido foi enviado ao fornecedor -{' '}
													{moment(item.dataStatus).format('DD/MM/YYYY HH:mm:ss')}
												</CustomText>
											)}
											{item.status === 3 && (
												<CustomText fontSize="17px" type="semiBold" color={colors.cinza}>
													Seu pedido foi recebido pelo fornecedor -{' '}
													{moment(item.dataStatus).format('DD/MM/YYYY HH:mm:ss')}
												</CustomText>
											)}
											{item.status === 4 && (
												<CustomText fontSize="17px" type="semiBold" color={colors.cinza}>
													Seu pedido está em andamento -{' '}
													{moment(item.dataStatus).format('DD/MM/YYYY HH:mm:ss')}
												</CustomText>
											)}
											{item.status === 5 && (
												<CustomText fontSize="17px" type="semiBold" color={colors.cinza}>
													Seu pedido foi concluído pelo fornecedor -{' '}
													{moment(item.dataStatus).format('DD/MM/YYYY HH:mm:ss')}
												</CustomText>
											)}
											{item.status === 6 && (
												<CustomText fontSize="17px" type="semiBold" color={colors.cinza}>
													Seu pedido foi enviado para você -{' '}
													{moment(item.dataStatus).format('DD/MM/YYYY HH:mm:ss')}
												</CustomText>
											)}
											{item.status === 7 && (
												<CustomText fontSize="17px" type="semiBold" color={colors.cinza}>
													Seu pedido foi finalizado -{' '}
													{moment(item.dataStatus).format('DD/MM/YYYY HH:mm:ss')}
												</CustomText>
											)}
										</View>
									</StatusItem>
								);
							})}
						</Scroll>
					</StatusContainer>
					{finalizado && (
						<>
							<Retirada>
								<CustomText color={colors.cinza} fontSize="16px" marginTop="15px" type="semiBold">
									Como deseja fazer a retirada?
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
							</Retirada>
							<Botao onPress={continuar}>
								<CustomText fontSize="20px" type="semiBold">
									Continuar
								</CustomText>
							</Botao>
						</>
					)}

					{!finalizado && (
						<BotaoBottomContainer>
							<BotaoBottom onPress={() => navigation.navigate('Home')}>
								<CustomText fontSize="18px" type="semiBold">
									Inicio
								</CustomText>
							</BotaoBottom>
							<BotaoBottom onPress={atualizar}>
								<CustomText fontSize="18px" type="semiBold">
									Atualizar
								</CustomText>
							</BotaoBottom>
						</BotaoBottomContainer>
					)}
				</>
			)}
			{status.length === 0 && !loading && (
				<>
					<CustomText fontSize="25px" type="semiBold" color={colors.cinza} align="center" marginTop="20px">
						Aqui você pode acompanhar o status do seu serviço.
					</CustomText>
					<CustomText fontSize="17px" type="semiBold" color={colors.cinza} align="center" marginTop="30px">
						Ocorreu um erro ao realizar seu pedido e não pode ser continuado.
					</CustomText>
				</>
			)}
		</Container>
	);
}
