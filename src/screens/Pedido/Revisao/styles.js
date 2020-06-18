import styled from 'styled-components/native';
import * as colors from '../../../styles/colors';

export const Container = styled.SafeAreaView`
	flex: 1;
	background: #fff;
`;

export const Item = styled.View`
	height: 50px;
	width: 100%;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	text-align: center;
	border-bottom-width: 1px;
	border-color: #f0f0f0;
	padding: 10px 25px;
`;

export const ItemWrap = styled.View`
	width: 50%;
	height: 100%;
	justify-content: center;
`;

export const Botao = styled.TouchableOpacity`
	background: ${colors.roxo};
	height: 10%;
	width: 100%;
	position: absolute;
	bottom: 0px;
	align-items: center;
	justify-content: center;
`;

export const Total = styled.View`
	background: #fff;
	align-items: center;
	justify-content: center;
	height: 11%;
	bottom: 10%;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
`;
