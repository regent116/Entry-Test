import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Cart from '../../images/cart.svg';
import './CartIcon.style.css';

export class CartIcon extends PureComponent {
	renderItemCount = () => {
		const { productsLength } = this.props;
		let visible = false;

		if (productsLength > 0) visible = true;

		return (
			<div className={`cart-icon__item-count ${visible ? 'visible' : ''}`}>
				{productsLength}
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
	productsLength: PropTypes.number
};

CartIcon.defaultProps = {
	productsLength: 0
};

export default CartIcon;
