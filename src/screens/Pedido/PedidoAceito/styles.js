import styled from 'styled-components';
import * as colors from '../../../styles/colors';

export const Scroll = styled.ScrollView`
	flex: 1;
	background: #fff;
`;

export const Container = styled.SafeAreaView`
	flex: 1;
	background: #fff;
`;

export const Content = styled.View`
	height: 55%;
	padding-top: 10px;
`;

export const BotoesContainer = styled.View`
	height: 9.5%;
	background: #fff;
	flex-direction: row;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
	position: absolute;
	bottom: 0;
`;

export const Botao = styled.TouchableOpacity`
	background: ${colors.azul};
	width: 50%;
	align-items: center;
	justify-content: center;
	border-left-width: ${(props) => (props.bl ? '1px' : '0px')};
	border-color: #2c6dd4;
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

export const Entrega = styled.View`
	background: #f8f8f8;
	position: absolute;
	bottom: 0px;
	width: 100%;
	justify-content: center;
	align-items: center;
	padding: 0px 0px 15px 0px;
`;
