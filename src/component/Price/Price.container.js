import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import Price from './Price.component';

export const mapStateToProps = (state) => ({
	currentSymbol: state.currency.currentSymbol,
	currentCurrency: state.currency.currentCurrency
});

export class PriceContainer extends PureComponent {
	containerProps() {
		const { currentSymbol, currentCurrency, prices } = this.props;

		return { currentSymbol, currentCurrency, prices };
	}

	render() {
		return <Price {...this.containerProps()} />;
	}
}

PriceContainer.propTypes = {
	currentCurrency: PropTypes.string,
	currentSymbol: PropTypes.string,
	prices: PropTypes.arrayOf(
		PropTypes.shape({
			amount: PropTypes.number,
			currency: PropTypes.string
		})
	)
};

PriceContainer.defaultProps = {
	currentCurrency: 'USD',
	currentSymbol: '$',
	prices: []
};

export default connect(mapStateToProps, null)(PriceContainer);
