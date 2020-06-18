import styled from 'styled-components/native';
import * as colors from '../../styles/colors';

export const Container = styled.SafeAreaView`
	flex: 1;
`;

export const Botao = styled.TouchableOpacity`
	background: ${colors.azul};
	height: 10%;
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
	top: ${Expo.Constants.statusBarHeight}px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;
