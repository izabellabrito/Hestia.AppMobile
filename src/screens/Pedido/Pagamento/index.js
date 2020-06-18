import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';

import { Container, Cartao, Botao, Loading } from './styles';
import * as colors from '../../../styles/colors';
import CustomText from '../../../components/UI/Text';

import api from '../../../services/api';
import mostrarAlerta from '../../../helpers/alert';
import { usuarioStorage } from '../../../helpers/dadosUsuario';

export default function Pagamento({ navigation, route }) {
	const [cartoes, setCartoes] = useState([]);
	const [loading, setLoading] = useState(true);

	async function listaCartoes() {
		const storage = await usuarioStorage();
		const { id } = storage.infos;
		const jwt = storage.token;

		await api
			.get(`/cartao/obter-cartoes-usuario/${id}`, { headers: { Authorization: `Bearer ${jwt}` } })
			.then((response) => {
				if (response.data.success) {
					setCartoes(response.data.data);
				}
			})
			.catch((error) => {});

		setLoading(false);
	}

	useEffect(() => {
		listaCartoes();
	}, []);

	return (
		<Container>
			{loading && (
				<Loading>
					<ActivityIndicator animating={loading} size="large" color={colors.azul} />
				</Loading>
			)}
			{cartoes.length === 0 && (
				<CustomText color={colors.cinza} fontSize="18px" type="regular" align="center" marginTop="10px">
					Nenhum cartão cadastrado!
				</CustomText>
			)}
			{cartoes.length > 0 && (
				<>
					<CustomText color={colors.cinza} fontSize="18px" type="semiBold" align="center" marginTop="10px">
						Cartões cadastrados
					</CustomText>
					<FlatList
						data={cartoes}
						renderItem={({ item }) => <ItemLista item={item} route={route} navigation={navigation} />}
						keyExtractor={(item) => item.id}
					/>
				</>
			)}
			<Botao onPress={() => navigation.navigate('CadastrarCartao')}>
				<CustomText fontSize="17px">Cadastrar um novo cartão</CustomText>
			</Botao>
		</Container>
	);
}

function ItemLista({ item, route, navigation }) {
	async function finalizar() {
		const { selecionados, total } = route.params;
		const storage = await usuarioStorage();
		const usuarioId = storage.infos.id;
		const jwt = storage.token;
		
		const itensDoPedido = [];
		selecionados.map((item) => {
			itensDoPedido.push({
				produto: item.categoria,
				quantidade: item.quantidade,
				observacao: item.descricao,
				valorDoItem: item.valor,
			});
		});
		const data = {
			usuarioId,
			cartaoId: item.id,
			valorDoPedido: total,
			envioViaDelivery: route.params.entrega === 'delivery',
			itensDoPedido,
		};
		await api
			.post('/pedido/cadastrar-pedido', data, { headers: { Authorization: `Bearer ${jwt}` } })
			.then((response) => {
				if (response.data.success) {
					route.params.entrega === 'delivery'
						? navigation.navigate('BuscandoEntregador', {
								etapa: 'entrega',
								id: response.data.data.id,
						  })
						: navigation.navigate('RotaEntrega', {
								etapa: 'entrega',
								id: response.data.data.id,
						  });
				}
			})
			.catch((error) => {
				mostrarAlerta('Atenção', 'Ocorreu um erro ao realizar sua solicitação. Tente novamente mais tarde.');
			});
	}
	return (
		<Cartao onPress={finalizar}>
			<CustomText fontSize="17px"> {item.numeroDoCartao.replace(/\d{12}(\d{4})/, '************$1')}</CustomText>
			<CustomText fontSize="17px">{item.nomeDoTitular}</CustomText>
		</Cartao>
	);
}
