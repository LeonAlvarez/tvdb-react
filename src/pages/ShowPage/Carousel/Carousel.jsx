import React from 'react';

import Slider from 'react-slick';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import '../../../../node_modules/slick-carousel/slick/slick.css';
import '../../../../node_modules/slick-carousel/slick/slick-theme.css';

const NextArrow = ({ onClick }) => (
  <FontAwesomeIcon
    style={{
      right: '-20px',
      position: 'absolute',
      top: '50%',
      display: 'block',
      width: '3.5rem',
      height: '3.5rem',
      padding: '0',
      transform: 'translate(0, -50%)',
      cursor: 'pointer',
      zIndex: '2',
    }}
    onClick={onClick}
    icon={faCaretRight}
  />
);

const PrevArrow = ({ onClick }) => (
  <FontAwesomeIcon
    onClick={onClick}
    style={{
      left: '-18px',
      position: 'absolute',
      top: '50%',
      display: 'block',
      width: '3.5rem',
      height: '3.5rem',
      padding: '0',
      transform: 'translate(0, -50%)',
      cursor: 'pointer',
      zIndex: '2',
    }}
    icon={faCaretLeft}
  />
);

const Carousel = ({ children, ...props }) => {
  const defaults = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: props.length,
    slidesToScroll: 1,
    accesibility: true,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    variableWidth: false,
  };

  const settings = { ...defaults, ...props };

  return <Slider {...settings}>{children}</Slider>;
};

export default Carousel;
