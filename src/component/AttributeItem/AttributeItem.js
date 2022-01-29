import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './AttributeItem.style.css';

export default class AttributeItem extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			active: false
		};
	}

	componentDidMount() {}

	checkTextReplacement = () => {
		const { value } = this.props;

		switch (value) {
			case 'Small':
				return 'S';
			case 'Medium':
				return 'M';
			case 'Large':
				return 'L';
			case 'Extra Large':
				return 'XL';
			default:
				if (this.isValidColor(value)) return null;
				return value;
		}
	};

	isValidColor = (strColor) => {
		const s = new Option().style;
		s.color = strColor;

		return s.color === strColor.toLowerCase();
	};

	checkColorReplacement = () => {
		const { value } = this.props;

		if (!this.isValidColor(value)) return null;

		return value.toLowerCase();
	};

	activate = () => {
		this.setState(({ active }) => ({ active: !active }));
	};

	deactivate = () => {
		this.setState({ active: false });
	};

	isActivated() {
		const { active } = this.state;
		return active;
	}

	renderItem = () => {
		const { inStock, handleClick, id, type } = this.props;
		const { active } = this.state;
		const isEmpty = inStock === 'false' ? 'empty' : '';
		const isActive = active === true ? ' fill' : '';
		const style = { backgroundColor: `${this.checkColorReplacement()}` };

		switch (type) {
			case 'default':
				return (
					<div
						onClick={() => handleClick(id)}
						className={`attribute-item${isEmpty}${isActive}`}
						style={style}
					>
						{this.checkTextReplacement()}
					</div>
				);
			case 'mini':
				return (
					<div className="attribute-item mini" style={style}>
						{this.checkTextReplacement()}
					</div>
				);
			default:
				return undefined;
		}
	};

	render() {
		const { value } = this.props;

		if (value === undefined) return null;

		return <>{this.renderItem()}</>;
	}
}

AttributeItem.propTypes = {
	handleClick: PropTypes.func,
	id: PropTypes.number,
	inStock: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string
};

AttributeItem.defaultProps = {
	id: 0,
	inStock: '',
	type: '',
	value: ''
};
