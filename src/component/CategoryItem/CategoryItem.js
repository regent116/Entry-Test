import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Price from '../Price';
import './CategoryItem.style.css';
import Image from '../Image';
import Button from '../Button';

export default class CategoryItem extends PureComponent {
	constructor(props) {
		super(props);

		this.state = { showMiniCart: false };

		this.container = React.createRef();
	}

	showMiniCart() {
		this.setState({ showMiniCart: true });
	}

	hideMiniCart() {
		this.setState({ showMiniCart: false });
	}

	handleQuickBuyClick = () => {
		const { handleQuickBuyClick, id, brand, name, prices, gallery } = this.props;

		handleQuickBuyClick(id, brand, name, prices, gallery);
	};

	handleClick = () => {
		const { handleClick, id } = this.props;

		handleClick(id);
	};

	renderThumbnail = () => {
		const { gallery } = this.props;

		return (
			<Link to="/product">
				<div className="product-thumbnail">
					<Image src={gallery[0]} />
					{this.renderOutOfStock()}
				</div>
			</Link>
		);
	};

	renderOutOfStock = () => {
		const { inStock } = this.props;

		if (inStock === true) return null;

		return <div className="out-of-stock">out of stock</div>;
	};

	renderName = () => {
		const { brand, name } = this.props;

		return <div className="product-item-name">{`${brand} ${name}`}</div>;
	};

	renderQuickBuy = () => {
		const { inStock } = this.props;
		const { showMiniCart } = this.state;

		return (
			<div className={`product-item-quick-buy ${showMiniCart ? 'visible' : ''}`}>
				<Button type="addToCartAlt" inStock={inStock} handleClick={this.handleQuickBuyClick} />
			</div>
		);
	};

	renderPrice = () => {
		const { prices } = this.props;

		return (
			<div className="product-item-price">
				<Price prices={prices} />
			</div>
		);
	};

	render() {
		return (
			<div
				className="product-item-wrapper"
				ref={(e) => {
					this.container = e;
				}}
				onClick={() => this.handleClick()}
				onMouseEnter={() => this.showMiniCart()}
				onMouseLeave={() => this.hideMiniCart()}
			>
				{this.renderThumbnail()}
				{this.renderQuickBuy()}
				{this.renderName()}
				{this.renderPrice()}
			</div>
		);
	}
}

CategoryItem.propTypes = {
	brand: PropTypes.string,
	handleQuickBuyClick: PropTypes.func,
	id: PropTypes.string,
	handleClick: PropTypes.func,
	gallery: PropTypes.arrayOf(PropTypes.string),
	name: PropTypes.string,
	inStock: PropTypes.bool,
	prices: PropTypes.arrayOf(
		PropTypes.shape({
			amount: PropTypes.number,
			currency: PropTypes.string
		})
	)
};

CategoryItem.defaultProps = {
	brand: '',
	gallery: [],
	name: '',
	inStock: false,
	prices: []
};
