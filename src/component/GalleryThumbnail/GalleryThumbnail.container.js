import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import GalleryThumbnail from './GalleryThumbnail.component';

export const mapStateToProps = (state) => ({
	currentImageIndex: state.product.currentImageIndex
});

export class GalleryThumbnailContainer extends PureComponent {

	containerProps() {
		const { currentImageIndex, i, src, handleClick } = this.props;

		return { currentImageIndex, i, src, handleClick };
	}

	render() {
		return <GalleryThumbnail {...this.containerProps()} />;
	}
}

GalleryThumbnailContainer.propTypes = {
	currentImageIndex: PropTypes.number,
	handleClick: PropTypes.func,
	i: PropTypes.number,
	src: PropTypes.string
};

GalleryThumbnailContainer.defaultProps = {
	currentImageIndex: 0,
	i: 0,
	src: ''
};

export default connect(mapStateToProps, null)(GalleryThumbnailContainer);
