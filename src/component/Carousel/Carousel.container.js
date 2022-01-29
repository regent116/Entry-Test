import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import Carousel from './Carousel.component';
import ProductSlice from '../../features/ProductSlice';

const isTouchDevice = 'ontouchstart' in document.documentElement;

export const mapStateToProps = (state) => ({
	currentImageIndex: state.product.currentImageIndex
});

export const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentImage: bindActionCreators(
			(id) => ProductSlice.actions.setCurrentImage(id),
			dispatch
		),
		increment: bindActionCreators(() => ProductSlice.actions.increment(), dispatch),
		decrement: bindActionCreators(() => ProductSlice.actions.decrement(), dispatch),
		reset: bindActionCreators(() => ProductSlice.actions.reset(), dispatch)
	};
};

export class CarouselContainer extends PureComponent {
	constructor(props) {
		super(props);

		const { reset } = this.props;
		this.state = {
			translate: 0,
			showArrows: isTouchDevice,
			dimensions: {}
		};

		reset();
		this.child = React.createRef();
	}

	containerFunctions = {
		prevSlide: this.prevSlide.bind(this),
		nextSlide: this.nextSlide.bind(this),
		showArrow: this.showArrow.bind(this),
		hideArrow: this.hideArrow.bind(this)
	};

	containerProps() {
		const { slides } = this.props;
		const { translate, showArrows } = this.state;

		const slidePos = {
			transform: `translateX(-${translate}px)`,
			width: `${this.getWidth() * slides.length}px`,
			transition: `transform ease-out 0.45s`
		};

		return { slides, slidePos, showArrows };
	}

	componentDidMount() {
		setTimeout(() => this.getContainerDimensions());
	}

	getContainerDimensions() {
		this.setState({
			dimensions: {
				width: this.child.container.offsetWidth,
				height: this.child.container.offsetHeight
			}
		});
	}

	getWidth() {
		const { dimensions } = this.state;
		return dimensions && dimensions.width;
	}

	prevSlide() {
		const { currentImageIndex, decrement } = this.props;

		if (currentImageIndex === 0) {
			return;
		}

		decrement();

		this.setState({
			translate: (currentImageIndex - 1) * this.getWidth(),
		});
	}

	nextSlide() {
		const { slides, currentImageIndex, increment } = this.props;

		if (currentImageIndex === slides.length - 1) return;

		increment();

		this.setState({
			translate: (currentImageIndex + 1) * this.getWidth(),
		});
	}

	goToSlide(i) {
		const { setCurrentImage } = this.props;

		setCurrentImage(i);

		this.setState({
			translate: i * this.getWidth(),
		});
	}

	showArrow() {
		this.setState({ showArrows: true });
	}

	hideArrow() {
		this.setState({ showArrows: false });
	}

	render() {
		return (
			<Carousel
				ref={(e) => {
					this.child = e;
				}}
				{...this.containerProps()}
				{...this.containerFunctions}
			/>
		);
	}
}

CarouselContainer.propTypes = {
	currentImageIndex: PropTypes.number,
	decrement: PropTypes.func,
	increment: PropTypes.func,
	reset: PropTypes.func,
	setCurrentImage: PropTypes.func,
	slides: PropTypes.arrayOf(PropTypes.string)
};

CarouselContainer.defaultProps = {
	currentImageIndex: 0,
	slides: []
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
	CarouselContainer
);
