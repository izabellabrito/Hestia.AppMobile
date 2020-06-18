import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { Container, Item, Pagamento, DadosPrestador, Loading } from './styles';
import * as colors from '../../../styles/colors';
import CustomText from '../../../components/UI/Text';

import api from '../../../services/api';
import { usuarioStorage } from '../../../helpers/dadosUsuario';
import mostrarAlerta from '../../../helpers/alert';

export default function ResumoPedido({ navigation, route }) {
	const [dados, setDados] = useState([]);
	const [loading, setLoading] = useState(true);

	async function obtemDetalhes() {
		const storage = await usuarioStorage();
		const jwt = storage.token;

		await api
			.get(`/pedido/obter-detalhe-pedido/${route.params.id}`, { headers: { Authorization: `Bearer ${jwt}` } })
			.then((response) => {
				if (response.data.success) {
					setDados(response.data.data);
				}
			})
			.catch((error) => {
				mostrarAlerta('Atenção', 'Ocorreu um erro ao realizar sua solicitação. Tente novamente mais tarde.');
			});
		setLoading(false);
	}

	useEffect(() => {
		obtemDetalhes();
	}, []);

	return (
		<Container>
			{loading && (
				<Loading>
					<ActivityIndicator animating={loading} size="large" color={colors.azul} />
				</Loading>
			)}
			{!loading && (
				<>
					<View>
						<CustomText fontSize="20px" color={colors.cinza} align="center" type="bold" marginTop="15px">
							Resumo do pedido
						</CustomText>
						{dados.itensDoPedido.map((item) => {
							return (
								<Item style={{ marginTop: 20 }}>
									<View style={{ width: '80%' }}>
										<CustomText fontSize="17px" color={colors.cinza}>
											{item.quantidade}x {item.observacao}
										</CustomText>
									</View>
									<View style={{ width: '20%' }}>
										<CustomText fontSize="17px" color={colors.cinza}>
											R${item.valorDoItem}
										</CustomText>
									</View>
								</Item>
							);
						})}

						<Pagamento>
							<CustomText fontSize="17px" color={colors.cinza} type="bold">
								Valor total:{' '}
								<CustomText fontSize="17px" color={colors.cinza}>
									R${dados.valorDoPedido}
								</CustomText>
							</CustomText>
							<CustomText fontSize="17px" color={colors.cinza} type="bold">
								Valor pago:{' '}
								<CustomText fontSize="17px" color={colors.cinza}>
									R${dados.valorDoPedido}
								</CustomText>
							</CustomText>
							<CustomText fontSize="17px" color={colors.cinza} type="bold">
								Meio de pagamento:{' '}
								<CustomText fontSize="17px" color={colors.cinza}>
									Cartão{' '}
									{dados.cartaoDoPedido.numeroDoCartao.replace(/\d{12}(\d{4})/, '************$1')}
								</CustomText>
							</CustomText>
						</Pagamento>
					</View>
					<View>
						<CustomText fontSize="20px" color={colors.cinza} align="center" type="bold" marginTop="15px">
							Dados do prestador
						</CustomText>
						<DadosPrestador>
							<CustomText fontSize="17px" color={colors.cinza}>
								{dados.colaborador.nomeCompleto}
							</CustomText>
							<CustomText fontSize="17px" color={colors.cinza}>
								Endereço: Rua Maestro Marzagão, 23 - 05852-460 / São Paulo, SP
							</CustomText>
							<CustomText fontSize="17px" color={colors.cinza}>
								Email: {dados.colaborador.email}
							</CustomText>
							<CustomText fontSize="17px" color={colors.cinza}>
								Telefone: {dados.colaborador.telefone}
							</CustomText>
							<CustomText fontSize="17px" color={colors.cinza}>
								Avaliação: {dados.colaborador.avaliacao.toFixed()}{' '}
								<FontAwesomeIcon
									style={{ color: '#f2e30a' }}
									size={15}
									icon={faStar}
									transform="up-3"
								/>
							</CustomText>
						</DadosPrestador>
					</View>
				</>
			)}
		</Container>
	);
}
