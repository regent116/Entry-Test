import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './NavItem.style.css';
import { Link } from 'react-router-dom';

export default class NavItem extends PureComponent {
	render() {
		const { name, active, handleClick } = this.props;

		return (
			<Link to="/">
				<div
					className={`nav-item ${active === 'true' ? 'active' : ''}`}
					onClick={() => handleClick(name)}
				>
					{name}
				</div>
			</Link>
		);
	}
}

NavItem.propTypes = {
	active: PropTypes.string,
	handleClick: PropTypes.func,
	name: PropTypes.string
};

NavItem.defaultProps = {
	active: 'true',
	name: ''
};
