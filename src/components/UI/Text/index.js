import React, { Component } from 'react';
import { Texto } from './styles';

export default class CustomText extends Component {
	setFontFamily = (tipo) => {
		switch (tipo) {
			case 'bold':
				return 'balooThambi2-bold';
			case 'extraBold':
				return 'balooThambi2-extraBold';
			case 'medium':
				return 'balooThambi2-medium';
			case 'semiBold':
				return 'balooThambi2-semiBold';
			case 'regular':
				return 'balooThambi2-regular';
			default:
				return 'balooThambi2-medium';
		}
	};

	render() {
		const font = this.setFontFamily(this.props.type ? this.props.type : 'medium');
		const style = [{ fontFamily: font }, this.props.style || {}];

		return (
			<Texto
				fontSize={this.props.fontSize}
				color={this.props.color}
				align={this.props.align}
				marginTop={this.props.marginTop}
				paddingLeft={this.props.paddingLeft}
				paddingRight={this.props.paddingRight}
				style={style}
			>
				{this.props.children}
			</Texto>
		);
	}
}
