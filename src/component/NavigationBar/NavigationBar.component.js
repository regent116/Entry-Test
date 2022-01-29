/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './NavigationBar.style.css';
import { Link } from 'react-router-dom';
import NavItem from '../NavItem';
import CartIcon from '../CartIcon';
import Cart from '../Cart';
import Modal from '../Modal';
import CurrencyIcon from '../CurrencyIcon';
import CurrencyList from '../CurrencyList';
import Logo from '../../images/logo.svg';

export class NavigationBar extends PureComponent {
	constructor(props) {
		super(props);
		this.modalRef = React.createRef();
	}

	renderAllCategory = () => {
		const { currentCategory, setCurrentCategory } = this.props;

		return (
			<>
				{currentCategory === 'all' ? (
					<NavItem name="all" active="true" handleClick={setCurrentCategory} />
				) : (
					<NavItem name="all" active="false" handleClick={setCurrentCategory} />
				)}
			</>
		);
	};

	renderCategories = () => {
		const { categoryList, currentCategory, setCurrentCategory } = this.props;

		return (
			<>
				{categoryList.map((category, i) => {
					if (currentCategory === category.name)
						return (
							<NavItem key={i} name={category.name} active="true" handleClick={setCurrentCategory} />
						);
					return (
						<NavItem key={i} name={category.name} active="false" handleClick={setCurrentCategory} />
					);
				})}
			</>
		);
	};

	renderLogo = () => {
		return (
			<Link to="/">
				<div className="logo">
					<img src={Logo} />
				</div>
			</Link>
		);
	};

	renderIcons = () => {
		const { handleIconCartClick, openCurrencyModal } = this.props;

		return (
			<div className="actions">
				<CurrencyIcon handleClick={openCurrencyModal} />
				<CartIcon handleClick={handleIconCartClick} />
			</div>
		);
	};

	renderModal = () => {
		return (
			<Modal>
				<Cart />
				<CurrencyList />
			</Modal>
		);
	};

	render() {
		return (
			<div className="navbar-container">
				<div className="navbar-wrapper">
					<div className="nav-items-wrapper">
						{this.renderAllCategory()}
						{this.renderCategories()}
					</div>
					{this.renderLogo()}
					{this.renderIcons()}
					{this.renderModal()}
				</div>
			</div>
		);
	}
}

NavigationBar.propTypes = {
	categoryList: PropTypes.arrayOf(PropTypes.object),
	currentCategory: PropTypes.string,
	handleIconCartClick: PropTypes.func,
	openCurrencyModal: PropTypes.func,
	setCurrentCategory: PropTypes.func
};

NavigationBar.defaultProps = {
	categoryList: [],
	currentCategory: 'all'
};

export default NavigationBar;
