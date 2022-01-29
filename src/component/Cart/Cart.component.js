/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import CartItem from '../CartItem';
import Price from '../Price';
import './Cart.style.css';

const capacity = 3;

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
			item.startAnimation();
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
		const { products, increment, decrement, resetCart } = this.props;

		if (products.length === 0) return <div className="cart-empty-container">empty</div>;

		return (
			<>
				{products.map((product, i) => {
					if (i < capacity)
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
								type="mini"
								resetCart={resetCart}
							/>
						);

					return null;
				})}
			</>
		);
	};

	renderCapacity = () => {
		const { products, hideOverlays } = this.props;
		const count = products.length - capacity;
		const text = `view ${count} more items`;

		if (products.length > capacity)
			return (
				<div className="cart-capacity">
					<Link to="/cart">
						<Button type="text" value={text} active="true" handleClick={hideOverlays} />
					</Link>
				</div>
			);

		return null;
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
				{this.renderCapacity()}
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
	products: []
};
