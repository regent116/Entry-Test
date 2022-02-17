/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import CartItem from '../CartItem';
import Price from '../Price';
import './Cart.style.css';

export default class Cart extends PureComponent {
	constructor(props) {
		super(props);
		this.cartItemRef = [];
	}

	getTotalPrice(p) {
		const { products } = this.props;
		const price = p;

		if (products.length !== 0) {
			products[0].prices.forEach(() => {
				price.push({ currency: '', amount: 0 });
			});

			products.forEach((product) => {
				product.prices.forEach((current, i) => {
					price[i].currency = current.currency;
					price[i].amount += current.amount * product.count;
				});
			});
		}

		return price;
	}

	addToRefs = (el) => {
		if (el === null) return;

		this.cartItemRef.push(el);
	};

	startResetCartAnimation = () => {
		this.cartItemRef.forEach((item) => {
			item.startResetCartAnimation();
		});

		this.cartItemRef = [];
	};

	componentWillUnmount() {
		this.cartItemRef = [];
	}

	renderTitle = () => {
		const { products } = this.props;
		const { length } = products;
		const itemCount = length >= 1 ? `, ${length} items` : '';

		return (
			<div className="cart-title-wrapper">
				<div className="cart-title">My Bag </div>
				<div className="cart-title lowercase">{itemCount}</div>
			</div>
		);
	};

	renderCartProducts = () => {
		const { products, increment, decrement, resetCart, removeCartItem } = this.props;

		if (products.length === 0) return <div className="cart-empty-container">empty</div>;

		return (
			<div className="cart-items-wrapper">
				{products.map((product, i) => {
						return (
							<CartItem
								key={i}
								ref={(e) => {
									this.addToRefs(e);
								}}
								product={product}
								id={i}
								increment={increment}
								decrement={decrement}
								removeCartItem={removeCartItem}
								type="mini"
								resetCart={resetCart}
							/>
						);
				})}
			</div>
		);
	};

	renderTotalPrice = () => {
		let price = [];

		price = this.getTotalPrice(price);

		return (
			<div className="cart-price-wrapper">
				<div className="cart-price-wrapper__total">Total</div>
				<div className="cart-price-wrapper__price">
					<Price prices={price} />
				</div>
			</div>
		);
	};

	renderAction = () => {
		const { hideOverlays } = this.props;

		return (
			<div className="cart-action-wrapper">
				<Button
					type="smallAlt"
					value="reset"
					active="true"
					handleClick={this.startResetCartAnimation}
				/>
				<Link to="/cart">
					<Button type="small" value="view bag" active="true" handleClick={hideOverlays} />
				</Link>
			</div>
		);
	};

	render() {
		const { cartOverlayVisible } = this.props;

		return (
			<div className={`cart-wrapper ${cartOverlayVisible ? 'visible' : ''}`}>
				{this.renderTitle()}
				{this.renderCartProducts()}
				{this.renderTotalPrice()}
				{this.renderAction()}
			</div>
		);
	}
}

Cart.propTypes = {
	cartOverlayVisible: PropTypes.bool,
	decrement: PropTypes.func,
	hideOverlays: PropTypes.func,
	increment: PropTypes.func,
	removeCartItem: PropTypes.func,
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
			image: PropTypes.arrayOf(PropTypes.string),
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
	products: []
};
