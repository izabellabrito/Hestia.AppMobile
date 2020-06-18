import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export const TituloContainer = styled.View`
	height: 30%;
	padding-top: 45px;
`;

export const Servicos = styled.View`
	height: 70%;
	width: 70%;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
`;

export const Item = styled.TouchableOpacity`
	height: 125px;
	width: 125px;
	background: #fff;
	align-items: center;
	justify-content: center;
	border-radius: 20px;
	margin-left: ${(props) => (props.ml ? props.ml : '0px')};
	margin-top: ${(props) => (props.mt ? props.mt : '0px')};
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ItemIcone = styled.Text`
	font-size: 15px;
	font-weight: bold;
`;
