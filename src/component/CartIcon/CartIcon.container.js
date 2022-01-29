import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import CartIcon from './CartIcon.component';

export const mapStateToProps = (state) => ({
	products: state.cart.products
});

export class CartIconContainer extends PureComponent {

	containerProps() {
		const { products, handleClick } = this.props;
		const productsLength = products.length;

		return { productsLength, handleClick };
	}

	render() {
		return <CartIcon {...this.containerProps()} />;
	}
}

CartIconContainer.propTypes = {
	handleClick: PropTypes.func,
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

CartIconContainer.defaultProps = {
	products: []
};

export default connect(mapStateToProps, null)(CartIconContainer);
