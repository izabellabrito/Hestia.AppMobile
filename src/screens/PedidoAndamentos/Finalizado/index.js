import React, { useState, useEffect } from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import moment from 'moment';
import { Container, Loading, Card, Botao } from './styles';
import * as colors from '../../../styles/colors';
import CustomText from '../../../components/UI/Text';

import api from '../../../services/api';
import { usuarioStorage } from '../../../helpers/dadosUsuario';

export default function PedidosFinalizados({ navigation }) {
	const [pedidos, setPedidos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	async function obtemPedidos() {
		setRefreshing(true);
		const storage = await usuarioStorage();
		const { id } = storage.infos;
		const jwt = storage.token;
		await api
			.get(`/pedido/obter-pedidos-finalizados/${id}`, { headers: { Authorization: `Bearer ${jwt}` } })
			.then((response) => {
				if (response.data.success) {
					setPedidos(response.data.data);
					setRefreshing(false);
				}
			})
			.catch((error) => {});
		setLoading(false);
	}

	useEffect(() => {
		obtemPedidos();
	}, []);

	return (
		<Container>
			{loading && (
				<Loading>
					<ActivityIndicator animating={loading} size="large" color={colors.azul} />
				</Loading>
			)}
			{pedidos.length === 0 && (
				<CustomText color={colors.cinza} fontSize="18px" type="regular" align="center" marginTop="10px">
					Nenhum pedido finalizado!
				</CustomText>
			)}
			{pedidos.length > 0 && (
				<FlatList
					data={pedidos}
					onRefresh={obtemPedidos}
					refreshing={refreshing}
					renderItem={({ item }) => <ListaItem item={item} navigation={navigation} />}
					keyExtractor={(item) => item.id}
				/>
			)}
		</Container>
	);
}

function ListaItem({ item, navigation }) {
	return (
		<Card>
			<CustomText fontSize="17px" color={colors.cinza}>
				Data do pedido: {moment(item.dataDoPedido).format('DD/MM/YYYY HH:mm:ss')}
			</CustomText>
			<CustomText fontSize="17px" color={colors.cinza}>
				Total: R${item.valorDoPedido}
			</CustomText>
			<View style={{ alignItems: 'center' }}>
				<Botao onPress={() => navigation.navigate('ResumoPedido', { id: item.id })}>
					<CustomText fontSize="15px" type="semiBold">
						Detalhes
					</CustomText>
				</Botao>
			</View>
		</Card>
	);
}
