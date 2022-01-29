import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import Modal from './Modal.component';

export const mapStateToProps = (state) => ({
	cartOverlayVisible: state.cart.cartOverlayVisible,
	currencyOverlayVisible: state.cart.currencyOverlayVisible
});

export class ModalContainer extends PureComponent {
	
	containerProps() {
		const { cartOverlayVisible, currencyOverlayVisible, children } = this.props;
		return { cartOverlayVisible, currencyOverlayVisible, children };
	}

	render() {
		return <Modal {...this.containerProps()} />;
	}
}

ModalContainer.propTypes = {
	cartOverlayVisible: PropTypes.bool,
	children: PropTypes.arrayOf(PropTypes.element),
	currencyOverlayVisible: PropTypes.bool
};

ModalContainer.defaultProps = {
	cartOverlayVisible: false,
	children: [],
	currencyOverlayVisible: false
};

export default connect(mapStateToProps, null)(ModalContainer);
