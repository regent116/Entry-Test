import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import CartSlice from '../../features/CartSlice';
import Cart from './Cart.component';

export const mapStateToProps = (state) => ({
	cartOverlayVisible: state.cart.cartOverlayVisible,
	currencyOverlayVisible: state.cart.currencyOverlayVisible,
	products: state.cart.products
});

export const mapDispatchToProps = (dispatch) => {
	return {
		resetCart: bindActionCreators(() => CartSlice.actions.resetCart(), dispatch),
		increment: bindActionCreators((id) => CartSlice.actions.increment(id), dispatch),
		decrement: bindActionCreators((id) => CartSlice.actions.decrement(id), dispatch)
	};
};

export class CartContainer extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			categoryList: []
		};

		this.navBarRef = React.createRef();
	}

	containerFunctions = {
		handleIconCartClick: this.handleIconCartClick.bind(this),
		openCurrencyModal: this.openCurrencyModal.bind(this)
	};

	containerProps() {
		const { increment, decrement, products } = this.props;
		const { categoryList } = this.state;

		return { increment, decrement, categoryList, products };
	}

	handleIconCartClick() {
		const { toggleCartOverlayVisibility } = this.props;
		toggleCartOverlayVisibility();
	}

	openCurrencyModal() {
		const { toggleCurrencyOverlayVisibility } = this.props;
		toggleCurrencyOverlayVisibility();
	}

	render() {
		return (
			<Cart
				ref={(ref) => { this.navBarRef = ref }}
				{...this.containerProps()}
				{...this.containerFunctions}
			/>
		);
	}
}

CartContainer.propTypes = {
	decrement: PropTypes.func,
	increment: PropTypes.func,
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
	),
	toggleCartOverlayVisibility: PropTypes.func,
	toggleCurrencyOverlayVisibility: PropTypes.func
};

CartContainer.defaultProps = {
	products: []
};

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
