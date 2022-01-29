import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './Modal.style.css';

export default class Modal extends PureComponent {
	render() {
		const { cartOverlayVisible, currencyOverlayVisible, children } = this.props;
		const alt = currencyOverlayVisible ? 'alt' : '';
		const visible = cartOverlayVisible || currencyOverlayVisible ? 'visible' : '';

		return (
			<div className="modal-container">
				<div className={`modal-overlay ${visible} ${alt}`}>{children}</div>
			</div>
		);
	}
}

Modal.propTypes = {
	cartOverlayVisible: PropTypes.bool,
	children: PropTypes.arrayOf(PropTypes.element),
	currencyOverlayVisible: PropTypes.bool
};

Modal.defaultProps = {
	cartOverlayVisible: false,
	children: [],
	currencyOverlayVisible: false
};
