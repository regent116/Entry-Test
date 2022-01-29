import React, { PureComponent } from 'react';
import './CurrencyList.style.css';
import { PropTypes } from 'prop-types';
import CurrencyItem from '../CurrencyItem';
import CurrencyData from '../../util/currency/currencyList.json';

export default class CurrencyList extends PureComponent {

	componentDidMount() {
		this.getCurrencySymbol = this.getCurrencySymbol.bind(this);
	}

	getCurrencySymbol = (value) => {
		let symbol = '';
		CurrencyData.forEach((currency) => {
			if (currency.code === value) {
				symbol = currency.symbol;
			}
		});

		return symbol;
	}

	renderItems = () => {
		const { currencies, handleCurrencyChange } = this.props;

		return (
			<>
				{currencies.map((code) => {
					const symbol = this.getCurrencySymbol(code);
					const btnString = `${symbol} ${code}`;

					return (
						<div key={code} className="currency-list-item">
							<CurrencyItem
								value={btnString}
								code={code}
								symbol={symbol}
								handleClick={handleCurrencyChange}
							/>
						</div>
					);
				})}
			</>
		);
	};

	render() {
		const { currencyOverlayVisible } = this.props;

		return (
			<div className={`currency-list-wrapper ${currencyOverlayVisible ? 'visible' : ''}`}>
				{this.renderItems()}
			</div>
		);
	}
}

CurrencyList.propTypes = {
	currencies: PropTypes.arrayOf(PropTypes.string),
	currencyOverlayVisible: PropTypes.bool,
	handleCurrencyChange: PropTypes.func
};

CurrencyList.defaultProps = {
	currencies: [],
	currencyOverlayVisible: false
};
