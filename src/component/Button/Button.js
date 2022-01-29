import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Cart from '../../images/cartAlt.svg';
import './Button.style.css';

export default class Button extends PureComponent {
	renderItem = () => {
		const { type } = this.props;

		switch (type) {
			case 'addToCart':
				return this.renderAddToCart();
			case 'addToCartAlt':
				return this.renderAddToCartAlt();
			case 'small':
				return this.renderSmallBtn();
			case 'smallAlt':
				return this.renderSmallAltBtn();
			case 'mini':
				return this.renderMiniBtn();
			case 'mini-alt':
				return this.renderMiniAltBtn();
			case 'text':
				return this.renderTextBtn();
			default:
				return null;
		}
	};

	handleAddToCartClick() {
		const { handleClick, inStock } = this.props;

		if (inStock === false) return;

		handleClick();
	}

	renderAddToCartAlt = () => {
		const { inStock } = this.props;

		return (
			<div
				className={`cart-btn-alt ${inStock === false ? 'cart-btn-alt inactive' : ''}`}
				onClick={() => this.handleAddToCartClick()}
			>
				<div className="inner">+1</div>
				<img src={Cart} />
			</div>
		);
	};

	renderAddToCart = () => {
		const { value, inStock } = this.props;
		const text = inStock ? value : 'OUT OF STOCK';

		return (
			<div
				className={`cart-btn ${inStock === false ? 'cart-btn inactive' : ''}`}
				onClick={() => this.handleAddToCartClick()}
			>
				{text}
			</div>
		);
	};

	renderSmallBtn = () => {
		const { active, handleClick, value } = this.props;

		return (
			<div
				className={`small-btn ${active === 'false' ? ' inactive' : ''}`}
				onClick={() => handleClick()}
			>
				{value}
			</div>
		);
	};

	renderSmallAltBtn = () => {
		const { active, handleClick, value } = this.props;

		return (
			<div
				className={`small-btn alt ${active === 'false' ? ' inactive' : ''}`}
				onClick={() => handleClick()}
			>
				{value}
			</div>
		);
	};

	renderMiniBtn = () => {
		const { active, id, handleClickId, value } = this.props;

		return (
			<div
				className={`mini-btn ${active === 'false' ? ' inactive' : ''}`}
				onClick={() => handleClickId(id)}
			>
				{value}
			</div>
		);
	};

	renderMiniAltBtn = () => {
		const { active, id, handleClickId, value } = this.props;

		return (
			<div
				className={`mini-btn alt ${active === 'false' ? ' inactive' : ''}`}
				onClick={() => handleClickId(id)}
			>
				{value}
			</div>
		);
	};

	renderTextBtn = () => {
		const { handleClick, value } = this.props;

		return (
			<div className="text-btn" onClick={() => handleClick()}>
				{value}
			</div>
		);
	};

	render() {
		return <>{this.renderItem()}</>;
	}
}

Button.propTypes = {
	active: PropTypes.string,
	handleClick: PropTypes.func,
	handleClickId: PropTypes.func,
	id: PropTypes.number,
	type: PropTypes.string,
	value: PropTypes.string,
	inStock: PropTypes.bool
};

Button.defaultProps = {
	active: 'true',
	id: 0,
	type: 'small',
	value: '',
	inStock: false
};
