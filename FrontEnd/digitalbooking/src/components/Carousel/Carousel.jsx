import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
const Carousel = (props) => {
  // if (props) console.log('props carousel', props.children.length);
  const {children, show} = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);
  const [touchPosition, setTouchPosition] = useState(null);

  useEffect(() => {
    setLength(children.length)
  }, [children])

  // Handler for Next and previous button
  const next = () => {
    // console.log('next');
    if (currentIndex < (length)) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  const prev = () => {
    // console.log('prev');
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  // Handlers for touch events in mobile devices
  // OnTouchStart
  const handlerTouchStart = (evt) => {
    const touch = evt.touches[0].clientX;
    setTouchPosition(touch);
  };

  // onTouchMove
  const handlerTouchMove = (evt) => {
    const touch = touchPosition;

    if (touch === null) {
      return;
    }

    const currentTouch = evt.touches[0].clientX;
    const diff = touch - currentTouch;

    if (diff > 5) {next()}
    if (diff < -5) {prev()}
    setTouchPosition(null);

  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {currentIndex > 0 && <button onClick={prev} className="left-arrow">
          &lt;
        </button>}
        <div onTouchStart={handlerTouchStart} onTouchMove={handlerTouchMove} className="carousel-content-wrapper">
          <div className={`carousel-content show-${show}`} style={{transform: `translateX(-${currentIndex * (100/show)}%)`}}>
            {children}
          </div>
        </div>
       {currentIndex < (length) && <button onClick={next} className="right-arrow">
          &gt;
        </button>}
      </div>
    </div>
  )
};

export default Carousel;

Carousel.propTypes = {
  children: PropTypes.array.isRequired,
  length: PropTypes.number,
  show: PropTypes.number.isRequired
}
