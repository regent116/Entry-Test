import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import Cart from './Cart.component';
import CartSlice from '../../features/CartSlice';

export const mapStateToProps = (state) => ({
	cartOverlayVisible: state.cart.cartOverlayVisible,
	currencyOverlayVisible: state.cart.currencyOverlayVisible,
	products: state.cart.products
});

export const mapDispatchToProps = (dispatch) => {
	return {
		resetCart: bindActionCreators(() => CartSlice.actions.resetCart(), dispatch),
		hideOverlays: bindActionCreators(() => CartSlice.actions.hideOverlays(), dispatch),
		increment: bindActionCreators((id) => CartSlice.actions.increment(id), dispatch),
		decrement: bindActionCreators((id) => CartSlice.actions.decrement(id), dispatch)
	};
};

export class CartContainer extends PureComponent {
	containerProps() {
		const {
			cartOverlayVisible,
			currencyOverlayVisible,
			resetCart,
			hideOverlays,
			products,
			increment,
			decrement
		} = this.props;

		return {
			cartOverlayVisible,
			currencyOverlayVisible,
			resetCart,
			hideOverlays,
			products,
			increment,
			decrement
		};
	}

	render() {
		return <Cart {...this.containerProps()} />;
	}
}

CartContainer.propTypes = {
	cartOverlayVisible: PropTypes.bool,
	currencyOverlayVisible: PropTypes.bool,
	decrement: PropTypes.func,
	hideOverlays: PropTypes.func,
	increment: PropTypes.func,
	resetCart: PropTypes.func,
	products: PropTypes.arrayOf(
		PropTypes.shape({
			attributes: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string,
					id: PropTypes.string
				})
			),
			brand: PropTypes.string,
			count: PropTypes.number,
			image: PropTypes.string,
			prices: PropTypes.arrayOf(
				PropTypes.shape({
					amount: PropTypes.number,
					currency: PropTypes.string
				})
			),
			product: PropTypes.string
		})
	)
};

Cart.defaultProps = {
	cartOverlayVisible: false,
	currencyOverlayVisible: false,
	products: []
};

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
