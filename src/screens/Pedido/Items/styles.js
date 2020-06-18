import styled from 'styled-components/native';
import * as colors from '../../../styles/colors';

export const Container = styled.SafeAreaView`
	flex: 1;
	background: #fff;
`;

export const Carrousel = styled.View`
	height: 15%;
	background: #f5f5f5;
`;

export const ItemSlide = styled.TouchableOpacity`
	width: 100px;
	align-items: center;
	justify-content: center;
`;

export const ItemSlideIcone = styled.View`
	height: 50px;
	width: 50px;
	background: #fff;
	align-items: center;
	justify-content: center;
	border-radius: 30px;
`;

export const Item = styled.View`
	height: 70px;
	width: 100%;
	flex-direction: row;
	align-items: center;
	border-bottom-width: 1px;
	border-color: #f0f0f0;
`;

export const TextoContainer = styled.View`
	width: 60%;
	padding-left: 15px;
`;

export const BotaoContainer = styled.View`
	width: 40%;
	height: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding-right: 15px;
`;

export const BotaoLista = styled.TouchableOpacity`
	background: ${colors.azul};
	width: 25%;
	height: 48%;
	border-radius: 50px;
	margin: 0px 10px;
	align-items: center;
	justify-content: center;
`;

export const Botao = styled.TouchableOpacity`
	background: ${colors.roxo};
	width: 60px;
	height: 60px;
	border-radius: 50px;
	padding-top: 7px;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: 25px;
	right: 20px;
`;

export const BotaoTexto = styled.Text`
	font-size: 20px;
`;
