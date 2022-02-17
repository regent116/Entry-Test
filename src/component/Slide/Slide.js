import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './Slide.style.css';

export default class Slide extends PureComponent {
	constructor(props) {
		super(props);
		this.image = new Image();
	}

	componentDidMount() {
		const { src } = this.props;

		this.image.src = src;
	}

	render() {
		const { src } = this.props;
		const slideContent = { backgroundImage: `url('${src}')` };

		return (
			<div onLoad={() => this.handleImageLoaded} className="slide" style={slideContent} />
		);
	}
}

Slide.propTypes = {
	src: PropTypes.string
};

Slide.defaultProps = {
	src: ''
};
