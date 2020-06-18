import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
	flex: 1;
	background-color: #fff;
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

export const Content = styled.View`
	margin: 0px 20px;
`;
