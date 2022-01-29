import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './CurrencyItem.style.css';

export default class CurrencyItem extends PureComponent {
	render() {
		const { value, code, symbol, handleClick } = this.props;

		return (
			<div onClick={() => handleClick(code, symbol)} className="text-btn">
				{value}
			</div>
		);
	}
}

CurrencyItem.propTypes = {
	code: PropTypes.string,
	handleClick: PropTypes.func,
	symbol: PropTypes.string,
	value: PropTypes.string
};

CurrencyItem.defaultProps = {
	code: 'USD',
	symbol: '$',
	value: ''
};
