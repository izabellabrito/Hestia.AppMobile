import styled from 'styled-components';
import * as colors from '../../../styles/colors';

export const Container = styled.View`
	flex: 1;
	background: #fff;
	padding-top: 30%;
`;

export const Botao = styled.TouchableOpacity`
	background: ${colors.roxo};
	height: 14%;
	width: 100%;
	position: absolute;
	bottom: 0px;
	align-items: center;
	justify-content: center;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
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
