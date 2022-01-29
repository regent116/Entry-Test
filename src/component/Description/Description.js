import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import JsxParser from 'react-jsx-parser';
import './Description.style.css';

export default class Description extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			clamped: true,
			isLongText: false,
			hadLong: false
		};

		this.descriptionRef = React.createRef();
	}

	setHasLongText = (el) => {
		this.setState({
			isLongText: el.offsetHeight < el.scrollHeight || el.offsetWidth < el.scrollWidth
		});
	};

	setHadLongText = (bool) => {
		this.setState({
			hadLong: bool
		});
	};

	hasLongText = (el) => {
		const { isLongText } = this.state;

		if (el !== null) this.setHasLongText(el);

		if (isLongText) this.setHadLongText(isLongText);
	};

	handleClick = () => {
		const { clamped } = this.state;

		this.setState({
			clamped: !clamped
		});
	};

	renderGradientOverlay = (isLongText) => {
		if (isLongText) return <div className="gradient-end" />;

		return null;
	};

	renderDescription = () => {
		const { html } = this.props;
		const { clamped, isLongText } = this.state;

		return (
			<div
				className={`description-content ${clamped ? ' clamped' : ''}`}
				ref={(ref) => {
					this.hasLongText(ref);
				}}
			>
				<JsxParser jsx={html} clamped={clamped} />
				{this.renderGradientOverlay(isLongText)}
			</div>
		);
	};

	renderReadMoreBtn = (hadLong) => {
		const { clamped } = this.state;

		if (hadLong)
			return (
				<button onClick={() => this.handleClick()}>
					Read
					{clamped ? 'more' : 'less'}
				</button>
			);

		return null;
	};

	render() {
		const { hadLong } = this.state;

		return (
			<div className="description-wrapper-content">
				{this.renderDescription()}
				{this.renderReadMoreBtn(hadLong)}
			</div>
		);
	}
}

Description.propTypes = {
	html: PropTypes.string
};

Description.defaultProps = {
	html: ''
};
