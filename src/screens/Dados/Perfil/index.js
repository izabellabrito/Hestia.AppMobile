import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Linking } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserLock, faHeadset, faCreditCard, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { Container, Loading, TopHeader, Content, Menu, Item, ItemIcone } from './styles';
import * as colors from '../../../styles/colors';
import CustomText from '../../../components/UI/Text';

import { usuarioStorage, limpaUsuarioStorage } from '../../../helpers/dadosUsuario';

export default function Perfil({ navigation }) {
	const [nome, setNome] = useState('');
	const [loading, setLoading] = useState(true);

	async function obtemDados() {
		const storage = await usuarioStorage();
		const { nomeCompleto } = storage.infos;
		setNome(nomeCompleto);
		setLoading(false);
	}

	async function sair() {
		setLoading(true);
		await limpaUsuarioStorage();
		navigation.navigate('Inicio');
		setLoading(false);
	}

	function ajuda() {
		Linking.openURL('mailto:hestialavagem@gmail.com');
	}

	useEffect(() => {
		obtemDados();
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
					<TopHeader>
						<CustomText fontSize="35px" type="bold">
							Olá, {nome}
						</CustomText>
					</TopHeader>
					<Content>
						<CustomText fontSize="25px" type="semiBold" color={colors.cinza}>
							Conta
						</CustomText>
						<Menu>
							<Item onPress={() => navigation.navigate('DadosPessoais')}>
								<ItemIcone>
									<FontAwesomeIcon style={{ color: colors.roxo }} size={25} icon={faUserLock} />
								</ItemIcone>
								<CustomText fontSize="17px" color={colors.cinza}>
									Dados pessoais
								</CustomText>
							</Item>
							<Item mt="22px" onPress={() => navigation.navigate('Cartoes')}>
								<ItemIcone>
									<FontAwesomeIcon style={{ color: colors.roxo }} size={25} icon={faCreditCard} />
								</ItemIcone>
								<CustomText fontSize="17px" color={colors.cinza}>
									Cartões
								</CustomText>
							</Item>
							<Item mt="22px" onPress={ajuda}>
								<ItemIcone>
									<FontAwesomeIcon style={{ color: colors.roxo }} size={25} icon={faHeadset} />
								</ItemIcone>
								<CustomText fontSize="17px" color={colors.cinza}>
									Ajuda
								</CustomText>
							</Item>
							<Item mt="22px" onPress={sair}>
								<ItemIcone>
									<FontAwesomeIcon style={{ color: colors.roxo }} size={25} icon={faSignOutAlt} />
								</ItemIcone>
								<CustomText fontSize="17px" color={colors.cinza}>
									Sair
								</CustomText>
							</Item>
						</Menu>
					</Content>
				</>
			)}
		</Container>
	);
}
