import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Cart from '../../images/cart.svg';
import './CartIcon.style.css';

export class CartIcon extends PureComponent {
	
	renderItemCount = () => {
		const { productsQuantity } = this.props;
		let visible = false;

		if (productsQuantity > 0) visible = true;

		return (
			<div className={`cart-icon__item-count ${visible ? 'visible' : ''}`}>
				{productsQuantity}
			</div>
		);
	};

	render() {
		const { handleClick } = this.props;

		return (
			<div className="cart-icon action-items" onClick={() => handleClick()}>
				{this.renderItemCount()}
				<img src={Cart} />
			</div>
		);
	}
}

CartIcon.propTypes = {
	handleClick: PropTypes.func,
	productsQuantity: PropTypes.number
};

CartIcon.defaultProps = {
	productsQuantity: 0
};

export default CartIcon;
