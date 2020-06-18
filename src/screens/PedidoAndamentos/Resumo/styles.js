import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
	flex: 1;
	background: #fff;
`;

export const Item = styled.View`
	background: #fff;
	flex-direction: row;
	align-self: center;
	width: 90%;
	margin-top: 5px;
`;

export const Pagamento = styled.View`
	background: #f5f5f5;
	height: 100px;
	justify-content: center;
	margin-top: 20px;
	padding-left: 18px;
`;

export const DadosPrestador = styled.View`
	margin-top: 20px;
	padding: 0px 18px 0px 18px;
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
