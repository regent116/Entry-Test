import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import NavigationBar from './NavigationBar.component';
import addCategory from '../../features/CategorySlice';
import CartSlice from '../../features/CartSlice';
import { fetchCategories } from '../../model/model';

export const mapStateToProps = (state) => ({
	currentCategory: state.category.currentCategory
});

export const mapDispatchToProps = (dispatch) => {
	return {
		addCategory: bindActionCreators(
			(categoryName) => addCategory.actions.addCategory(categoryName),
			dispatch
		),
		toggleCartOverlayVisibility: bindActionCreators(
			() => CartSlice.actions.toggleCartOverlayVisibility(),
			dispatch
		),
		toggleCurrencyOverlayVisibility: bindActionCreators(
			() => CartSlice.actions.toggleCurrencyOverlayVisibility(),
			dispatch
		)
	};
};

export class NavigationBarContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			categoryList: []
		};
		this.navBarRef = React.createRef();
	}

	containerFunctions = {
		handleIconCartClick: this.handleIconCartClick.bind(this),
		openCurrencyModal: this.openCurrencyModal.bind(this),
		setCurrentCategory: this.setCurrentCategory.bind(this)
	};

	containerProps() {
		const { currentCategory } = this.props;
		const { categoryList } = this.state;
		return { currentCategory, categoryList };
	}

	componentDidMount() {
		fetchCategories().then((res) => {
			this.setState({
				categoryList: res.data.categories
			});
		});
	}

	handleIconCartClick() {
		const { toggleCartOverlayVisibility } = this.props;
		toggleCartOverlayVisibility();
	}

	openCurrencyModal() {
		const { toggleCurrencyOverlayVisibility } = this.props;
		toggleCurrencyOverlayVisibility();
	}

	setCurrentCategory(id) {
		// eslint-disable-next-line no-shadow
		const { addCategory } = this.props;
		addCategory(id);
	}

	render() {
		return (
			<NavigationBar
				ref={(ref) => {
					this.navBarRef = ref;
				}}
				{...this.containerProps()}
				{...this.containerFunctions}
			/>
		);
	}
}

NavigationBarContainer.propTypes = {
	addCategory: PropTypes.func,
	currentCategory: PropTypes.string,
	toggleCartOverlayVisibility: PropTypes.func,
	toggleCurrencyOverlayVisibility: PropTypes.func
};

NavigationBarContainer.defaultProps = {
	currentCategory: 'all'
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBarContainer);
