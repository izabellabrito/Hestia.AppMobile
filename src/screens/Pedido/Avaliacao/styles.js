import styled from 'styled-components/native';
import * as colors from '../../../styles/colors';

export const Container = styled.SafeAreaView`
	flex: 1;
	background: #fff;
	align-items: center;
	justify-content: center;
`;

export const Botao = styled.TouchableOpacity`
	background: ${(props) => (props.roxo ? `${colors.roxo}` : `${colors.azul}`)};
	border-radius: 30px;
	width: 60%;
	margin-top: 10px;
	padding: 8px 30px;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
`;

export const RadioContainer = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	margin-top: 30px;
`;
