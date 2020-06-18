import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { Container, Cartao, Botao, Loading } from './styles';
import * as colors from '../../../styles/colors';
import CustomText from '../../../components/UI/Text';

import api from '../../../services/api';
import mostrarAlerta from '../../../helpers/alert';
import { usuarioStorage } from '../../../helpers/dadosUsuario';

export default function Cartoes({ navigation, route }) {
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
	});

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
						renderItem={({ item }) => <ItemLista item={item} navigation={navigation} />}
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

function ItemLista({ item, navigation }) {
	async function deletarCartao(id) {
		const storage = await usuarioStorage();
		const jwt = storage.token;

		await api
			.delete(`/cartao/remover-cartao/${id}`, { headers: { Authorization: `Bearer ${jwt}` } })
			.then((response) => {
				if (response.data.success) {
					mostrarAlerta('Sucesso!', 'Cartão deletado.');
					navigation.navigate('Perfil');
				}
			})
			.catch((error) => {});
	}

	return (
		<Cartao onPress={() => navigation.navigate('DetalheCartao', { id: item.id })}>
			<View style={{ width: '90%' }}>
				<CustomText fontSize="17px">
					{item.numeroDoCartao.replace(/\d{12}(\d{4})/, '************$1')}
				</CustomText>
				<CustomText fontSize="17px">{item.nomeDoTitular}</CustomText>
			</View>
			<TouchableOpacity style={{ width: '10%' }} onPress={() => deletarCartao(item.id)}>
				<FontAwesomeIcon style={{ color: '#fff' }} size={15} icon={faTrash} />
			</TouchableOpacity>
		</Cartao>
	);
}
