import styled from 'styled-components/native';
import * as colors from '../../styles/colors';

export const Container = styled.SafeAreaView`
	flex: 1;
	background-color: #fff;
	align-items: center;
`;

export const Input = styled.TextInput`
	width: 80%;
	height: 40px;
	border-style: solid;
	border-bottom-color: ${colors.azul};
	border-bottom-width: 1px;
	color: ${colors.cinza};
	margin-top: ${(props) => (props.mt ? props.mt : '0px')};
`;

export const Botao = styled.TouchableOpacity`
	background: ${colors.azul};
	width: 70%;
	height: 50px;
	align-items: center;
	justify-content: center;
	border-radius: 30px;
	margin-top: 30px;
`;

export const BotaoSenha = styled.TouchableOpacity`
	background: #fff;
	width: 70%;
	height: 50px;
	align-items: center;
	justify-content: center;
`;

export const Loading = styled.SafeAreaView`
	background: #e9e9e9;
	opacity: 0.4;
	z-index: 1;
	height: 100%;
	width: 100%;
	position: absolute;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;
