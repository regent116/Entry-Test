import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import CategoryItem from '../../component/CategoryItem';
import './Categories.style.css';

export class Categories extends PureComponent {
	constructor(props) {
		super(props);

		this.productRefs = [];
		this.titleRef = React.createRef();

		this.lazyload = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					entry.target.classList.toggle('show', entry.isIntersecting);

					if (entry.isIntersecting) {
						this.lazyload.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 1,
				rootMargin: '200px'
			}
		);
	}

	componentWillUnmount() {
		this.productRefs = [];
	}

	addToRefs = (el) => {
		if (el === null) return;

		const ref = {
			component: el,
			ref: el.container
		};

		this.lazyload.observe(ref.ref);
		this.productRefs.push(ref);
	};

	renderProductList() {
		const { productList, currentCategory, handleQuickBuyClick, handleCartClick } = this.props;

		return (
			<div className="product-wrapper">
				{productList.map((product, i) => {
					if (product.category === currentCategory) {
						return (
							<div key={product.id}>
								<CategoryItem
									key={currentCategory}
									id={product.id}
									ref={(e) => {
										this.addToRefs(e);
									}}
									brand={product.brand}
									name={product.name}
									prices={product.prices}
									inStock={product.inStock}
									gallery={product.gallery}
									handleQuickBuyClick={handleQuickBuyClick}
									handleClick={handleCartClick}
								/>
							</div>
						);
					}
					if (currentCategory === 'all') {
						return (
							<div key={product.id}>
								<CategoryItem
									key={currentCategory}
									id={product.id}
									ref={(e) => {
										this.addToRefs(e, i);
									}}
									brand={product.brand}
									name={product.name}
									prices={product.prices}
									inStock={product.inStock}
									gallery={product.gallery}
									handleQuickBuyClick={handleQuickBuyClick}
									handleClick={handleCartClick}
								/>
							</div>
						);
					}
					return undefined;
				})}
			</div>
		);
	}

	renderTitle() {
		const { currentCategory } = this.props;

		return (
			<h1
				ref={(e) => {
					this.titleRef = e;
				}}
			>
				{currentCategory}
			</h1>
		);
	}

	render() {
		return (
			<div className="product-container">
				{this.renderTitle()}
				{this.renderProductList()}
			</div>
		);
	}
}

Categories.propTypes = {
	currentCategory: PropTypes.string,
	handleCartClick: PropTypes.func,
	handleQuickBuyClick: PropTypes.func,
	productList: PropTypes.arrayOf(
		PropTypes.shape({
			brand: PropTypes.string,
			category: PropTypes.string,
			gallery: PropTypes.arrayOf(PropTypes.string),
			id: PropTypes.string,
			prices: PropTypes.arrayOf(
				PropTypes.shape({
					amount: PropTypes.number,
					currency: PropTypes.string
				})
			)
		})
	)
};

Categories.defaultProps = {
	currentCategory: '',
	productList: []
};

export default Categories;
