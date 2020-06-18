import styled from 'styled-components/native';
import * as colors from '../../../../styles/colors';

export const Container = styled.SafeAreaView`
	flex: 1;
`;

export const BotoesContainer = styled.View`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 10%;
	background: #fff;
	flex-direction: row;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
`;

export const Botao = styled.TouchableOpacity`
	background: ${colors.roxo};
	width: 100%;
	align-items: center;
	justify-content: center;
	border-left-width: ${(props) => (props.bl ? '1px' : '0px')};
	border-color: #6835ab;
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
