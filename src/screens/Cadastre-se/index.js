import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, Platform, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Scroll, Loading, Container, Input, Botao, BotaoNascimento } from './styles';
import CustomText from '../../components/UI/Text';
import * as colors from '../../styles/colors';

import api from '../../services/api';
import mostrarAlerta from '../../helpers/alert';

export default function Cadastrar({ navigation }) {
	const [nomeCompleto, onChangeNome] = React.useState('');
	const [dataNascimento, setDataNascimento] = React.useState(new Date(1598051730000));
	const [cpf, onChangeCpf] = React.useState('');
	const [telefone, onChangeTelefone] = React.useState('');
	const [email, onChangeEmail] = React.useState('');
	const [senha, onChangeSenha] = React.useState('');
	const [confirmaSenha, onChangeConfirmaSenha] = React.useState('');
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const [dataFormatada, setDataFormatada] = useState('Selecione sua data de nascimento');

	function onChange(event, date) {
		setShow(Platform.OS === 'ios');
		setDataNascimento(date);
		setDataFormatada(moment(date).format('DD/MM/YYYY'));
	}

	async function cadastrar() {
		setLoading(true);
		if (
			nomeCompleto.match(/^\s*$/) ||
			cpf.match(/^\s*$/) ||
			telefone.match(/^\s*$/) ||
			email.match(/^\s*$/) ||
			senha.match(/^\s*$/) ||
			confirmaSenha.match(/^\s*$/)
		) {
			mostrarAlerta('Atenção', 'Preencha todos os campos!');
		} else {
			if (senha !== confirmaSenha) {
				mostrarAlerta('Atenção', 'As senhas devem ser iguais.');
			} else {
				await api
					.post('/cadastrar-usuario', {
						nomeCompleto,
						dataDeNascimento: dataNascimento,
						cpf,
						telefone,
						email,
						senha,
						confirmarSenha: confirmaSenha,
					})
					.then((response) => {
						if (response.data.success) {
							mostrarAlerta(
								'Cadastrado com sucesso!',
								'Você pode acessar com as credenciais que você acabou de cadastrar!'
							);
							navigation.navigate('Entrar');
						}
					})
					.catch((error) => {
						setLoading(false);
						mostrarAlerta(
							'Atenção',
							`${error.response.data.errors.map((item) => {
								return item + '\n';
							})}`
						);
					});
			}
		}
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
				{loading && (
					<Loading>
						<ActivityIndicator animating={loading} size="large" color={colors.azul} />
					</Loading>
				)}
				<Scroll>
					<Container>
						<Input
							placeholder="Nome"
							placeholderTextColor={colors.cinza}
							onChangeText={(text) => onChangeNome(text)}
							value={nomeCompleto}
							autoCompleteType="name"
						/>
						<BotaoNascimento onPress={() => setShow(true)}>
							<CustomText color={colors.cinza} fontSize="15px" type="regular">
								{dataFormatada}
							</CustomText>
						</BotaoNascimento>
						{show && (
							<DateTimePicker
								style={{ width: '80%' }}
								testID="dateTimePicker"
								value={dataNascimento}
								mode="date"
								display="default"
								locale="pt-br"
								dateFormat="dayofweek day month"
								onChange={onChange}
							/>
						)}

						<Input
							placeholder="CPF"
							mt="18px"
							placeholderTextColor={colors.cinza}
							onChangeText={(text) => onChangeCpf(text)}
							value={cpf}
							keyboardType="numeric"
						/>
						<Input
							placeholder="Telefone"
							mt="18px"
							placeholderTextColor={colors.cinza}
							onChangeText={(text) => onChangeTelefone(text)}
							value={telefone}
							keyboardType="numeric"
							autoCompleteType="tel"
						/>
						<Input
							placeholder="E-mail"
							mt="18px"
							placeholderTextColor={colors.cinza}
							onChangeText={(text) => onChangeEmail(text)}
							value={email}
							autoCompleteType="email"
						/>
						<Input
							placeholder="Senha"
							mt="18px"
							placeholderTextColor={colors.cinza}
							onChangeText={(text) => onChangeSenha(text)}
							value={senha}
							autoCompleteType="password"
							secureTextEntry={true}
						/>
						<Input
							placeholder="Confirme a senha"
							mt="18px"
							placeholderTextColor={colors.cinza}
							onChangeText={(text) => onChangeConfirmaSenha(text)}
							value={confirmaSenha}
							autoCompleteType="password"
							secureTextEntry={true}
						/>
						<Botao onPress={() => cadastrar()}>
							<CustomText fontSize="17px" type="semiBold">
								Se cadastrar
							</CustomText>
						</Botao>
					</Container>
				</Scroll>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
}
