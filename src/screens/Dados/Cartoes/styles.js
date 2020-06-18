import styled from 'styled-components';
import * as colors from '../../../styles/colors';

export const Container = styled.SafeAreaView`
	flex: 1;
	background: #fff;
`;

export const Cartao = styled.TouchableOpacity`
	background: ${colors.roxo};
	height: 100px;
	width: 85%;
	justify-content: center;
	align-items: center;
	padding: 0px 18px 0px 18px;
	border-radius: 20px;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
	flex-direction: row;
	align-self: center;
	margin-top: 12px;
`;

export const Botao = styled.TouchableOpacity`
	background: ${colors.azul};
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
	height: 10%;
	position: absolute;
	bottom: 11px;
	left: 15px;
	right: 15px;
	justify-content: center;
	align-items: center;
	border-radius: 20px;
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
