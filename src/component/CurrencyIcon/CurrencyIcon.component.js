import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './CurrencyIcon.style.css';
import svg from '../../images/vector-down.svg';

export class CurrencyIcon extends PureComponent {
	render() {
		const { currentSymbol, handleClick } = this.props;

		return (
			<div onClick={handleClick} className="checkout action-items">
				<div className="currency-item-container">
					{currentSymbol}
					<div className="currency-icon-svg-wrapper">
						<img src={svg} />
					</div>
				</div>
			</div>
		);
	}
}

CurrencyIcon.propTypes = {
	currentSymbol: PropTypes.string,
	handleClick: PropTypes.func
};

CurrencyIcon.defaultProps = {
	currentSymbol: '$'
};

export default CurrencyIcon;
