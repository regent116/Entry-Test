/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import AttributeItem from '../AttributeItem';
import './AttributeSet.style.css';

export default class AttributeSet extends PureComponent {
	constructor(props) {
		super(props);
		this.attributeItemRef = [];
	}

	componentWillUnmount() {
		this.attributeItemRef = [];
	}

	addToRefs(ref) {
		this.attributeItemRef.push(ref);
	}

	handleClick = (id) => {
		this.attributeItemRef[id].activate();

		this.attributeItemRef.forEach((item, i) => {
			if (i === id) return;

			item.deactivate();
		});
	};

	// eslint-disable-next-line consistent-return
	getActivatedAttribute = () => {
		const { attributeData } = this.props;

		const activeAttribute = {
			name: attributeData.name,
			id: ''
		};

		this.attributeItemRef.forEach((item) => {
			if (item.isActivated() === true) activeAttribute.id = item.props.value;
		});

		if (activeAttribute.id !== '') return activeAttribute;
	};

	renderTitle = () => {
		const { attributeData } = this.props;

		return <div className="attribute-wrapper__title">{attributeData.name}:</div>;
	};

	renderItems = () => {
		const { attributeData } = this.props;

		return (
			<div className="attribute-wrapper__blocks-wrapper">
				{attributeData.items.map((item, i) => {
					return (
						<AttributeItem
							key={i}
							id={i}
							ref={(ref) => {
								this.addToRefs(ref);
							}}
							value={item.id}
							inStock="true"
							active="false"
							type="default"
							handleClick={this.handleClick}
						/>
					);
				})}
			</div>
		);
	};

	render() {
		return (
			<div className="attribute-wrapper">
				{this.renderTitle()}
				{this.renderItems()}
			</div>
		);
	}
}

AttributeSet.propTypes = {
	attributeData: PropTypes.shape({
		items: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string
			})
		),
		name: PropTypes.string
	})
};

AttributeSet.defaultProps = {
	attributeData: {}
};
