import styled from 'styled-components/native';

export const Texto = styled.Text`
	font-size: ${(props) => (props.fontSize ? props.fontSize : '10px')};
	color: ${(props) => (props.color ? props.color : '#fff')};
	text-align: ${(props) => (props.align ? props.align : 'auto')};
	margin-top: ${(props) => (props.marginTop ? props.marginTop : '0px')};
	padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft : '0px')};
	padding-right: ${(props) => (props.paddingRight ? props.paddingRight : '0px')};
`;
