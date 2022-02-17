import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import Product from './Product.component';
import { fetchProduct } from '../../model/model';
import ProductSlice from '../../features/ProductSlice';
import CartSlice from '../../features/CartSlice';

export const mapStateToProps = (state) => ({
	currentProduct: state.product.currentProduct
});

export const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentImage: bindActionCreators(
			(id) => ProductSlice.actions.setCurrentImage(id),
			dispatch
		),
		addToCart: bindActionCreators(
			(product) => CartSlice.actions.addToCart(product),
			dispatch
		),
		resetCart: bindActionCreators(() => CartSlice.actions.resetCart(), dispatch)
	};
};

export class ProductContainer extends PureComponent {
	containerFunctions = {
		handleGalleryClick: this.handleGalleryClick.bind(this),
		handleAddToCartClick: this.handleAddToCartClick.bind(this)
	};

	constructor(props) {
		super(props);

		this.state = {
			productData: {},
			isLoading: false
		};

	
		this.productRef = React.createRef();
	}

	handleGalleryClick(i) {
		this.productRef.carouselRef.goToSlide(i);
	}

	componentDidMount() {
		const { currentProduct } = this.props;

		fetchProduct(currentProduct).then((res) => {
			this.setState({
				productData: res.data.product,
				isLoading: res.loading
			});
		});
	}

	handleAddToCartClick() {
		const { addToCart } = this.props;
		const { productData } = this.state;

		const product = {
			product: productData.id,
			brand: productData.brand,
			name: productData.name,
			prices: productData.prices,
			image: productData.gallery,
			attributes: [],
			count: 1
		};

		this.productRef.attributeSetRef.forEach((attribute) => {
			if (attribute.getActivatedAttribute() !== undefined)
				product.attributes.push(attribute.getActivatedAttribute());
		});

		addToCart(product);
	}

	containerProps() {
		const { currentProduct, setCurrentImage } = this.props;
		const { productData, isLoading } = this.state;

		return { productData, isLoading, currentProduct, setCurrentImage };
	}

	handleCartReset() {
		const { resetCart } = this.props;

		resetCart();
	}

	render() {
		return (
			<Product
				ref={(e) => { this.productRef = e }}
				{...this.containerProps()}
				{...this.containerFunctions}
			/>
		);
	}
}

ProductContainer.propTypes = {
	addToCart: PropTypes.func,
	currentProduct: PropTypes.string,
	resetCart: PropTypes.func,
	setCurrentImage: PropTypes.func
};

ProductContainer.defaultProps = {
	currentProduct: ''
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
