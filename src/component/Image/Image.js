import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './Image.style.css';

export default class Image extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isValid: true,
			loaded: false
		};

		this.image = React.createRef();
	}

	handleImageLoaded() {
		this.setState({ loaded: true, isValid: true });
	}

	handleError() {
		this.setState({ isValid: false });
	}

	render() {
		const { src } = this.props;
		const { loaded, isValid } = this.state;
		const imageStyle = !loaded ? { display: 'none' } : {};

		if (isValid === false) return <></>;

		return (
			<>
				{!loaded && <div className="placeholder" />}
				<img
					src={src}
					style={imageStyle}
					ref={this.image}
					onLoad={() => this.handleImageLoaded()}
					onError={() => this.handleError()}
				/>
			</>
		);
	}
}

Image.propTypes = {
	src: PropTypes.string
};

Image.defaultProps = {
	src: ''
};
