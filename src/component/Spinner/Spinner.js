import React, { PureComponent } from 'react';
import './Spinner.style.css';
import PropTypes from 'prop-types';

export default class Spinner extends PureComponent {
	render() {
		const { isLoading } = this.props;
		return <div className={`spinner ${isLoading === true ? 'active' : 'inactive'}`} />;
	}
}

Spinner.propTypes = {
	isLoading: PropTypes.bool
};

Spinner.defaultProps = {
	isLoading: false
};
