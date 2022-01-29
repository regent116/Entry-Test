import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

export class Price extends PureComponent {
	round = (n, dp) => {
		const h = +'1'.padEnd(dp + 1, '0');
		return Math.round(n * h) / h;
	};

	getPrice() {
		const { prices, currentCurrency } = this.props;
		let amount = 0;

		if (prices === undefined) return 0;

		prices.forEach((price) => {
			if (price.currency === currentCurrency) {
				amount = price.amount;
			}
		});

		return amount;
	}

	render() {
		const { currentSymbol } = this.props;
		let price = this.round(this.getPrice(), 2);

		if (price === undefined) price = 0;

		return <div>{price + currentSymbol}</div>;
	}
}

Price.propTypes = {
	currentCurrency: PropTypes.string,
	currentSymbol: PropTypes.string,
	prices: PropTypes.arrayOf(
		PropTypes.shape({
			amount: PropTypes.number,
			currency: PropTypes.string
		})
	)
};

Price.defaultProps = {
	currentCurrency: 'USD',
	currentSymbol: '$',
	prices: []
};

export default Price;
