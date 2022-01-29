import PropTypes from "prop-types"
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import Categories from './Categories.component';
import { fetchProducts } from '../../model/model';
import ProductSlice from '../../features/ProductSlice';
import CartSlice from '../../features/CartSlice';

export const mapStateToProps = (state) => ({
	currentCategory: state.category.currentCategory,
	currentPorduct: state.currentProduct
});

export const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentProduct: bindActionCreators(
			(id) => ProductSlice.actions.setCurrentProduct(id),
			dispatch
		),
		resetCart: bindActionCreators(() => CartSlice.actions.resetCart(), dispatch),
		addToCart: bindActionCreators((product) => CartSlice.actions.addToCart(product), dispatch)
	};
};

export class CategoriesContainer extends PureComponent {
	containerFunctions = {
		handleCartClick: this.handleCartClick.bind(this),
		handleQuickBuyClick: this.handleQuickBuyClick.bind(this)
	};

	constructor(props) {
		super(props);
		this.state = {
			productList: [],
			isLoading: false
		};
	}

	componentDidMount() {
		fetchProducts().then((res) => {
			this.setState({
				productList: res.data.category.products,
				isLoading: res.loading
			});
		});
	}

	handleCartClick(id) {
		const { setCurrentProduct } = this.props;

		setCurrentProduct(id);
	}

	handleQuickBuyClick(productId, brand, name, prices, image) {
		const { addToCart } = this.props;

		const product = {
			product: productId,
			brand,
			name,
			prices,
			image,
			attributes: [],
			count: 1
		};

		addToCart(product);
	}

	handleCartReset() {
		const { resetCart } = this.props;
		resetCart();
	}

	containerProps() {
		const { currentCategory } = this.props;
		const { productList, isLoading } = this.state;

		return { productList, isLoading, currentCategory };
	}

	render() {
		return <Categories {...this.containerProps()} {...this.containerFunctions} />;
	}
}

CategoriesContainer.propTypes = {
	addToCart: PropTypes.func,
	currentCategory: PropTypes.string,
	resetCart: PropTypes.func,
	setCurrentProduct: PropTypes.func
}

CategoriesContainer.defaultProps = {
	currentCategory: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);
