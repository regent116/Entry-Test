import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import CartItem from './CartItem.component';

export const mapStateToProps = (state) => ({
	products: state.cart.products
});

export class CartItemContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.itemRef = React.createRef();
	}

	containerProps() {
		const { product, increment, decrement, id, type, resetCart } = this.props;

		return { product, increment, decrement, id, type, resetCart };
	}

	// eslint-disable-next-line consistent-return
	startAnimation() {
		const { resetCart } = this.props;

		if (this.itemRef === null) return resetCart();

		this.itemRef.startAnimation();
	}

	render() {
		return (
			<CartItem
				ref={(e) => {
					this.itemRef = e;
				}}
				{...this.containerProps()}
			/>
		);
	}
}

CartItemContainer.propTypes = {
	decrement: PropTypes.func,
	id: PropTypes.number,
	increment: PropTypes.func,
	product: PropTypes.shape({
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
	}),
	resetCart: PropTypes.func,
	type: PropTypes.string
};

CartItemContainer.defaultProps = {
	product: [],
	id: 0,
	type: 'default'
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(
	CartItemContainer
);
