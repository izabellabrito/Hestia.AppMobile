import styled from 'styled-components/native';
import * as colors from '../../styles/colors';

export const Scroll = styled.ScrollView`
	flex: 1;
	background: #fff;
`;

export const Container = styled.SafeAreaView`
	flex: 1;
	background-color: #fff;
	justify-content: center;
	align-items: center;
	margin: 40% 0px 30px 0px;
`;

export const Input = styled.TextInput`
	width: 80%;
	height: 40px;
	border-style: solid;
	border-bottom-color: ${colors.azul};
	border-bottom-width: 1px;
	color: ${colors.cinza};
	margin-top: ${(props) => (props.mt ? props.mt : '0px')};
`;

export const Botao = styled.TouchableOpacity`
	background: ${colors.azul};
	width: 70%;
	height: 50px;
	align-items: center;
	justify-content: center;
	border-radius: 30px;
	margin-top: 30px;
`;
