import styled from 'styled-components/native';
import * as colors from '../../../styles/colors';

export const Container = styled.SafeAreaView`
	flex: 1;
	flex-direction: column;
	background: ${colors.azul};
	margin-top: ${Expo.Constants.statusBarHeight}px;
`;

export const TopHeader = styled.View`
	height: 20%;
	align-items: center;
	justify-content: center;
`;

export const HeaderTexto = styled.Text`
	font-size: 25px;
	color: #fff;
	font-weight: bold;
	text-align: center;
`;

export const Content = styled.View`
	background: #fff;
	height: 80%;
	border-top-right-radius: 20px;
	border-top-left-radius: 20px;
	padding: 35px 25px 0px 25px;
`;

export const SecaoTitulo = styled.Text`
	font-size: 15px;
	color: #fff;
	font-weight: bold;
`;

export const Menu = styled.View`
	margin-top: 20px;
`;

export const Item = styled.TouchableOpacity`
	flex-direction: row;
	margin-top: ${(props) => (props.mt ? props.mt : '0px')};
`;

export const ItemIcone = styled.Text`
	width: 15%;
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
