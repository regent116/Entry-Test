import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import CurrencyList from './CurrencyList.component';
import CurrencySlice from '../../features/CurrencySlice';
import { fetchCurrencies } from '../../model/model';
import CartSlice from '../../features/CartSlice';

export const mapStateToProps = (state) => ({
	currencyOverlayVisible: state.cart.currencyOverlayVisible
});

export const mapDispatchToProps = (dispatch) => {
	return {
		setCurrency: bindActionCreators(
			(code) => CurrencySlice.actions.setCurrency(code),
			dispatch
		),
		hideOverlays: bindActionCreators(() => CartSlice.actions.hideOverlays(), dispatch)
	};
};

export class CurrencyListContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			currencies: []
		};
	}

	containerFunctions = {
		handleCurrencyChange: this.handleCurrencyChange.bind(this)
	};

	componentDidMount() {
		fetchCurrencies().then((res) => {
			this.setState({
				currencies: res.data.currencies
			});
		});
	}

	containerProps() {
		const { currencyOverlayVisible } = this.props;
		const { currencies } = this.state;

		return { currencyOverlayVisible, currencies };
	}

	handleCurrencyChange(code, symbol) {
		const { setCurrency, hideOverlays } = this.props;

		const obj = {
			code,
			symbol
		};

		setCurrency(obj);
		hideOverlays();
	}

	render() {
		return <CurrencyList {...this.containerProps()} {...this.containerFunctions} />;
	}
}

CurrencyListContainer.propTypes = {
	currencyOverlayVisible: PropTypes.bool,
	hideOverlays: PropTypes.func,
	setCurrency: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyListContainer);
