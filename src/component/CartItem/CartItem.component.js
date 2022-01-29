/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './CartItem.style.css';
import Image from '../Image';
import Button from '../Button';
import AttributeItem from '../AttributeItem';
import Price from '../Price';

const animationLength = 500;

export default class CartItem extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			animate: 0
		};
	}

	startAnimation() {
		const { resetCart } = this.props;

		this.setState({ animate: 1 });

		setTimeout(() => {
			resetCart();
		}, animationLength);
	}

	handleAnimationEnd() {
		this.setState({ animate: 0 });
	}

	renderItem = () => {
		const { type } = this.props;

		switch (type) {
			case 'default':
				return this.renderDefaultLayout();
			case 'mini':
				return this.renderMiniLayout();
			default:
				return null;
		}
	};

	renderDefaultLayout = () => {
		const { product, increment, decrement, id } = this.props;

		return (
			<div className="cart-item-wrapper alt">
				<div className="cart-item-name-wrapper alt">
					<div className="cart-item-name-wrapper__brand">{product.brand}</div>
					<div>{product.name}</div>
				</div>
				<div className="cart-item-btn">
					<Button type="mini-alt" value="+" id={id} handleClickId={increment} />
				</div>
				<div className="cart-item-photo alt">
					<Image src={product.image} />
				</div>
				<div className="cart-item-price alt">
					<Price prices={product.prices} />
				</div>
				<div className="cart-item-count">{product.count}</div>
				<div className="cart-item-attributes">
					{product.attributes.map((attribute, i) => {
						return (
							<AttributeItem key={i} type="default" value={attribute.id} handleClick={() => { }} />
						);
					})}
				</div>
				<div className="cart-item-btn">
					<Button type="mini-alt" value="-" id={id} handleClickId={decrement} />
				</div>
			</div>
		);
	};

	renderMiniLayout = () => {
		const { product, increment, decrement, id } = this.props;
		const { animate } = this.state;

		return (
			<div
				className="cart-item-wrapper"
				animation={animate}
				onAnimationEnd={() => this.handleAnimationEnd()}
			>
				<div className="cart-item-name-wrapper">
					<div>{product.brand}</div>
					<div>{product.name}</div>
				</div>
				<div className="cart-item-btn">
					<Button type="mini" value="+" id={id} handleClickId={increment} />
				</div>
				<div className="cart-item-photo">
					<Image src={product.image} />
				</div>
				<div className="cart-item-price">
					<Price prices={product.prices} />
				</div>
				<div className="cart-item-count">{product.count}</div>
				<div className="cart-item-attributes">
					{product.attributes.map((attribute, i) => {
						return <AttributeItem key={i} type="mini" value={attribute.id} />;
					})}
				</div>
				<div className="cart-item-btn">
					<Button type="mini" value="-" id={id} handleClickId={decrement} />
				</div>
			</div>
		);
	};

	render() {
		return <>{this.renderItem()}</>;
	}
}

CartItem.propTypes = {
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
		name: PropTypes.string,
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

CartItem.defaultProps = {
	product: {},
	type: 'default'
};
