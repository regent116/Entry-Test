import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './CartDarkOverlay.style.css';

export default class CartDarkOverlay extends PureComponent {
	render() {
		const { cartOverlayVisible, currencyOverlayVisible, handleDarkOverlayClick } = this.props;

		return (
			<div
				onClick={() => handleDarkOverlayClick()}
				className={`dark-overlay ${
					cartOverlayVisible || currencyOverlayVisible ? 'visible' : ''
				}`}
			/>
		);
	}
}

CartDarkOverlay.propTypes = {
	cartOverlayVisible: PropTypes.bool,
	currencyOverlayVisible: PropTypes.bool,
	handleDarkOverlayClick: PropTypes.func
};

CartDarkOverlay.defaultProps = {
	cartOverlayVisible: false,
	currencyOverlayVisible: false
};
