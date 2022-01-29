import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import CurrencyIcon from './CurrencyIcon.component';

export const mapStateToProps = (state) => ({
	currentCurrency: state.currency.currentCurrency,
	currentSymbol: state.currency.currentSymbol
});

export class CurrencyIconContainer extends PureComponent {

	containerProps() {
		const { currentCurrency, currentSymbol, handleClick } = this.props;

		return { currentCurrency, currentSymbol, handleClick };
	}

	render() {
		return <CurrencyIcon {...this.containerProps()} />;
	}
}

CurrencyIconContainer.propTypes = {
	currentCurrency: PropTypes.string,
	currentSymbol: PropTypes.string,
	handleClick: PropTypes.func
};

CurrencyIconContainer.defaultProps = {
	currentCurrency: 'USD',
	currentSymbol: '$'
};

export default connect(mapStateToProps, null)(CurrencyIconContainer);
