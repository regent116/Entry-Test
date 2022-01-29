import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import CartDarkOverlay from './CartDarkOverlay.component';
import CartSlice from '../../features/CartSlice';

export const mapStateToProps = (state) => ({
	cartOverlayVisible: state.cart.cartOverlayVisible,
	currencyOverlayVisible: state.cart.currencyOverlayVisible
});

export const mapDispatchToProps = (dispatch) => {
	return {
		hideOverlays: bindActionCreators(() => CartSlice.actions.hideOverlays(), dispatch)
	};
};

export class CartDarkOverlayContainer extends PureComponent {

	containerProps() {
		const { cartOverlayVisible, currencyOverlayVisible } = this.props;

		return { cartOverlayVisible, currencyOverlayVisible };
	}

	containerFunctions = {
		handleDarkOverlayClick: this.handleDarkOverlayClick.bind(this)
	};

	handleDarkOverlayClick() {
		const { hideOverlays } = this.props;

		hideOverlays();
	}

	render() {
		return (
			<CartDarkOverlay
				ref={(e) => {
					this.productRef = e;
				}}
				{...this.containerProps()}
				{...this.containerFunctions}
			/>
		);
	}
}

CartDarkOverlayContainer.propTypes = {
	hideOverlays: PropTypes.func,
	cartOverlayVisible: PropTypes.bool,
	currencyOverlayVisible: PropTypes.bool,
	handleDarkOverlayClick: PropTypes.func
};

CartDarkOverlayContainer.defaultProps = {
	cartOverlayVisible: false,
	currencyOverlayVisible: false
};

export default connect(mapStateToProps, mapDispatchToProps)(CartDarkOverlayContainer);
