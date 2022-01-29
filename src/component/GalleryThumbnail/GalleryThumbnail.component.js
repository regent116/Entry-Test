import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './GalleryThumbnail.style.css';
import Image from '../Image';

export default class GalleryThumbnail extends PureComponent {
	render() {
		const { src, i, handleClick, currentImageIndex } = this.props;

		return (
			<div
				onClick={() => handleClick(i)}
				className={`gallery-thumbnail ${currentImageIndex === i ? 'show' : ''}`}
			>
				<Image src={src} />
			</div>
		);
	}
}

GalleryThumbnail.propTypes = {
	currentImageIndex: PropTypes.number,
	handleClick: PropTypes.func,
	i: PropTypes.number,
	src: PropTypes.string
};

GalleryThumbnail.defaultProps = {
	currentImageIndex: 0,
	i: 0,
	src: ''
};
