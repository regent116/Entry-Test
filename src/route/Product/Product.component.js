/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Carousel from '../../component/Carousel';
import GalleryThumbnail from '../../component/GalleryThumbnail';
import Price from '../../component/Price';
import Button from '../../component/Button';
import './Product.style.css';
import Description from '../../component/Description';
import AttributeSet from '../../component/AttributeSet';

export default class Product extends PureComponent {
	constructor(props) {
		super(props);
		this.carouselRef = React.createRef();
		this.attributeSetRef = [];
	}

	componentWillUnmount() {
		this.attributeSetRef = [];
	}

	addToRefs(ref) {
		this.attributeSetRef.push(ref);
	}

	renderGalleryThumbnails = () => {
		const { productData, handleGalleryClick } = this.props;

		if (productData.gallery === undefined) return undefined;

		return (
			<div className="gallery-thumbnails">
				{productData.gallery.map((image, i) => {
					return <GalleryThumbnail key={i} i={i} src={image} handleClick={handleGalleryClick} />;
				})}
			</div>
		);
	};

	renderMainThumbnail = () => {
		const { productData } = this.props;

		if (productData.gallery === undefined) return undefined;

		return (
			<div className="gallery-container">
				<Carousel
					ref={(e) => {
						this.carouselRef = e;
					}}
					slides={productData.gallery}
				/>
			</div>
		);
	};

	renderTitle = () => {
		const { productData } = this.props;

		return (
			<div className="name-wrapper">
				<div className="name-wrapper__brand">{productData.brand}</div>
				<div className="name-wrapper__item">{productData.name}</div>
			</div>
		);
	};

	renderAttributeSet = () => {
		const { productData } = this.props;

		if (productData.attributes === undefined) return undefined;

		return (
			<>
				{productData.attributes.map((attribute, i) => {
					return (
						<AttributeSet
							key={i}
							ref={(ref) => {
								this.addToRefs(ref);
							}}
							attributeData={attribute}
						/>
					);
				})}
			</>
		);
	};

	renderPrice = () => {
		const { productData } = this.props;

		return (
			<div className="price-wrapper">
				<div className="price-wrapper__title">price: </div>
				<div className="price-wrapper__price">
					<Price prices={productData.prices} />
				</div>
			</div>
		);
	};

	renderAddToCart = () => {
		const { handleAddToCartClick, productData } = this.props;

		return (
			<div className="add-to-cart-wrapper">
				<Button
					active="true"
					value="add to cart"
					type="addToCart"
					inStock={productData.inStock}
					handleClick={handleAddToCartClick}
				/>
			</div>
		);
	};

	renderDescription = () => {
		const { productData } = this.props;

		return (
			<div className="desription-wrapper">
				<Description html={productData.description} />
			</div>
		);
	};

	renderActions = () => {
		return (
			<div className="product-actions-wrapper">
				{this.renderTitle()}
				<div className="product-active-actions-wrapper">
					<div className="product-active-actions-scale">
						{this.renderAttributeSet()}
						{this.renderPrice()}
						{this.renderAddToCart()}
					</div>
				</div>
				{this.renderDescription()}
			</div>
		);
	};

	render() {
		return (
			<div className="product-page-container">
				<div className="product-page-wrapper">
					{this.renderGalleryThumbnails()}
					{this.renderMainThumbnail()}
					{this.renderActions()}
				</div>
			</div>
		);
	}
}

Product.propTypes = {
	handleAddToCartClick: PropTypes.func,
	handleGalleryClick: PropTypes.func,
	productData: PropTypes.shape({
		attributes: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				id: PropTypes.string
			})
		),
		brand: PropTypes.string,
		description: PropTypes.string,
		gallery: PropTypes.arrayOf(PropTypes.string),
		prices: PropTypes.arrayOf(
			PropTypes.shape({
				amount: PropTypes.number,
				currency: PropTypes.string
			})
		),
		name: PropTypes.string,
		inStock: PropTypes.bool
	})
};

Product.defaultProps = {
	productData: []
};
