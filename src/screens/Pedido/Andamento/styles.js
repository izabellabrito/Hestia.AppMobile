import styled from 'styled-components';
import * as colors from '../../../styles/colors';

export const Container = styled.SafeAreaView`
	flex: 1;
	background: #fff;
`;

export const Botao = styled.TouchableOpacity`
	background: ${colors.roxo};
	height: 10%;
	width: 100%;
	position: absolute;
	bottom: 0px;
	align-items: center;
	justify-content: center;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
`;

export const TextoBotao = styled.Text`
	font-size: 15px;
`;

export const StatusContainer = styled.View`
	padding: 0px 40px;
	margin-top: 20px;
`;

export const StatusItem = styled.View`
	flex-direction: row;
	margin-top: 20px;
	align-items: center;
`;

export const Radio = styled.View`
	border-radius: 30px;
	border: 1px solid;
	border-color: ${colors.verde};
	margin: 5px;
	background: #fff;
`;

export const RadioContainer = styled.View`
	flex-direction: row;
	align-items: center;
	margin-top: 10px;
`;

export const Retirada = styled.View`
	background: #f8f8f8;
	position: absolute;
	bottom: 10%;
	width: 100%;
	justify-content: center;
	align-items: center;
	padding: 0px 0px 15px 0px;
`;

export const BotaoBottom = styled.TouchableOpacity`
	background: ${colors.azul};
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
	width: 40%;
	height: 60%;
	border-radius: 30px;
	align-items: center;
	justify-content: center;
	margin: 0px 10px;
`;

export const BotaoBottomContainer = styled.View`
	background-color: #f9f9f9;
	height: 15%;
	width: 100%;
	position: absolute;
	bottom: 0;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

export const Scroll = styled.ScrollView`
	width: 100%;
	margin-bottom: 200px;
`;
