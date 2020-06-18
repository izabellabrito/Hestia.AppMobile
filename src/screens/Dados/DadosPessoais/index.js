import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { Container, Content, Loading } from './styles';
import * as colors from '../../../styles/colors';
import CustomText from '../../../components/UI/Text';

import { usuarioStorage } from '../../../helpers/dadosUsuario';

import moment from 'moment';

export default function DadosPessoais({ navigation, route }) {
	const [dados, setDados] = useState([]);
	const [loading, setLoading] = useState(true);

	async function obtemDados() {
		const storage = await usuarioStorage();
		setDados(storage.infos);
		setLoading(false);
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
				<Content>
					<CustomText color={colors.cinza} fontSize="18px" type="semiBold" align="center" marginTop="10px">
						Informações pessoais:
					</CustomText>
					<CustomText color={colors.cinza} fontSize="17px" type="regular" marginTop="10px">
						<CustomText color={colors.cinza} fontSize="18px" type="semiBold">
							Nome:
						</CustomText>{' '}
						{dados.nomeCompleto}
					</CustomText>
					<CustomText color={colors.cinza} fontSize="17px" type="regular" marginTop="10px">
						<CustomText color={colors.cinza} fontSize="18px" type="semiBold">
							E-mail:
						</CustomText>{' '}
						{dados.email}
					</CustomText>
					<CustomText color={colors.cinza} fontSize="17px" type="regular" marginTop="10px">
						<CustomText color={colors.cinza} fontSize="18px" type="semiBold">
							Telefone:
						</CustomText>{' '}
						{dados.telefone}
					</CustomText>
					<CustomText color={colors.cinza} fontSize="17px" type="regular" marginTop="10px">
						<CustomText color={colors.cinza} fontSize="18px" type="semiBold">
							Data de nascimento:
						</CustomText>{' '}
						{moment(dados.dataDeNascimento).format('DD/MM/YYYY')}
					</CustomText>
					<CustomText color={colors.cinza} fontSize="17px" type="regular" marginTop="10px">
						<CustomText color={colors.cinza} fontSize="18px" type="semiBold">
							CPF:
						</CustomText>{' '}
						{dados.cpf}
					</CustomText>
				</Content>
			)}
		</Container>
	);
}
