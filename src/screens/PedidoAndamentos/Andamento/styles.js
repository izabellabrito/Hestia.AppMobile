import styled from 'styled-components/native';
import * as colors from '../../../styles/colors';

export const Container = styled.SafeAreaView`
	flex: 1;
	background-color: #fff;
`;

export const Card = styled.View`
	width: 90%;
	justify-content: center;
	align-self: center;
	margin: 10px 0px;
	border-radius: 15px;
	padding: 18px 20px;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.12);
	background: #fff;
`;

export const Texto = styled.Text`
	font-size: 50px;
	color: #fff;
	font-weight: bold;
`;

export const Botao = styled.TouchableOpacity`
	flex-direction: row;
	background: ${colors.azul};
	border-radius: 30px;
	width: 50%;
	align-items: center;
	justify-content: center;
	margin-top: 10px;
	padding: 5px 0px;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
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
