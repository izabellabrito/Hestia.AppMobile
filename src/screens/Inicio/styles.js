import styled from 'styled-components/native';
import * as colors from '../../styles/colors';

export const Container = styled.SafeAreaView`
	flex: 1;
	background: #fff;
`;

export const TextoContainer = styled.View`
	height: 45%;
	justify-content: center;
	padding: 0px 8%;
	background: ${colors.azul};
`;

export const BotaoContainer = styled.View`
	flex: 1;
	height: 55%;
	align-items: center;
	justify-content: center;
`;

export const Botao = styled.TouchableOpacity`
	background: ${colors.roxo};
	width: 80%;
	height: 60px;
	align-items: center;
	justify-content: center;
	border-radius: 30px;
	margin-top: ${(props) => (props.mt ? `${props.mt}px` : 0)};
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

export const TextoBotao = styled.Text`
	font-size: 15px;
	color: #fff;
	font-weight: bold;
`;

export const Loading = styled.SafeAreaView`
	background: #e9e9e9;
	opacity: 0.4;
	z-index: 1;
	height: 100%;
	width: 100%;
	top: ${Expo.Constants.statusBarHeight}px;
	position: absolute;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;
