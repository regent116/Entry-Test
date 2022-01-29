/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import CartItem from '../../component/CartItem';
import './Cart.style.css';

export class CartIcon extends PureComponent {
	renderCartItems = () => {
		const { products, increment, decrement } = this.props;

		if (products.length === 0) return <div className="cart-empty-container">empty</div>;

		return (
			<>
				{products.map((product, i) => {
					return (
						<CartItem
							key={i}
							product={product}
							id={i}
							increment={increment}
							decrement={decrement}
							type="default"
						/>
					);
				})}
			</>
		);
	};

	render() {
		return (
			<div className="cart-page-container">
				<h1>Cart</h1>
				<div className="cart-page-wrapper">
					{this.renderCartItems()}
					<div className="cart-page-title" />
				</div>
			</div>
		);
	}
}

CartIcon.propTypes = {
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
	)
};

CartIcon.defaultProps = {
	products: []
};

export default CartIcon;
