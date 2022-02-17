/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import rightArrow from '../../images/arrow-right.png';
import leftArrow from '../../images/arrow-left.png';
import './Carousel.style.css';
import Slide from '../Slide';


export default class Carousel extends PureComponent {
	constructor(props) {
		super(props);
		this.sliderPos = 0;
		this.container = React.createRef();
	}

	componentWillUnmount(){
		this.slideRef = [];
	}

	renderArrow = (direction, handleClick) => {
		const { slides, showArrows } = this.props;

		if (slides.length <= 1) return null;

		return (
			<div
				onClick={handleClick}
				className={`arrow ${direction === 'right' ? 'right ' : 'left '} ${showArrows === true ? 'show' : ''}`}
			>
				{direction === 'right' ? <img src={rightArrow} /> : <img src={leftArrow} />}
			</div>
		);
	};

	renderSlider = () => {
		const { slides, slidePos } = this.props;

		

		return (
			<div className="slider" style={slidePos}>
				{slides.map((image, i) => {
					return (
						<Slide
							src={image}
							key={i}
						/>
					);
				})}
			</div>
		);
	};

	render() {
		const { showArrow, hideArrow, prevSlide, nextSlide, type } = this.props;

		return (
			<div
				className={`gallery-image-wrapper ${type === 'alt' ? 'alt' : ''}`}
				ref={(e) => {
					this.container = e;
				}}
				onMouseEnter={() => {
					showArrow();
				}}
				onMouseLeave={() => {
					hideArrow();
				}}
			>
				{this.renderSlider()}
				{this.renderArrow('left', prevSlide)}
				{this.renderArrow('right', nextSlide)}
			</div>
		);
	}
}

Carousel.propTypes = {
	type: PropTypes.string,
	hideArrow: PropTypes.func,
	nextSlide: PropTypes.func,
	prevSlide: PropTypes.func,
	showArrow: PropTypes.func,
	showArrows: PropTypes.bool,
	slidePos: PropTypes.PropTypes.shape({ transform: PropTypes.string, width: PropTypes.string, transition: PropTypes.string }),
	slides: PropTypes.arrayOf(PropTypes.string)
};

Carousel.defaultProps = {
	type: 'default',
	showArrows: true,
	slidePos: 0,
	slides: []
};
