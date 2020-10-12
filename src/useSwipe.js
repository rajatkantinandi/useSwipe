import React from 'react';

const useSwipe = ({ ref, thresholdPX = 5 }) => {
  const [x1, setX1] = React.useState(0);
  const [y1, setY1] = React.useState(0);
  const [x2, setX2] = React.useState(0);
  const [y2, setY2] = React.useState(0);
  const [direction, setDirection] = React.useState(null);

  React.useEffect(() => {
    if (Math.abs(x2 - x1) > Math.abs(y2 - y1) && Math.abs(x2 - x1) > thresholdPX) {
      setDirection(x2 > x1 ? 'right' : 'left');
    } else if (Math.abs(y2 - y1) > thresholdPX) {
      setDirection(y2 > y1 ? 'down' : 'up');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [y2]);

  React.useEffect(() => {
    const currentElement = ref.current;
    if (currentElement) {
      if (isTouchDevice()) {
        currentElement.addEventListener('touchstart', handleTouchStart);
        currentElement.addEventListener('touchend', handleTouchEnd);
      }
      else {
        currentElement.addEventListener('mousedown', handleMouseDown);
        currentElement.addEventListener('mouseup', handleMouseUp);
      }
    }

    return () => {
      if (currentElement) {
        if (isTouchDevice()) {
          currentElement.removeEventListener('touchstart', handleTouchStart);
          currentElement.removeEventListener('touchend', handleTouchEnd);
        }
        else {
          currentElement.removeEventListener('mousedown', handleMouseDown);
          currentElement.removeEventListener('mouseup', handleMouseUp);
        }
      }
    }
  }, [ref]);

  function handleTouchStart(event) {
    setX1(event.changedTouches[0].clientX);
    setY1(event.changedTouches[0].clientY);
  }

  function handleTouchEnd(event) {
    if (event.changedTouches && event.changedTouches.length > 0) {
      setX2(event.changedTouches[0].clientX);
      setY2(event.changedTouches[0].clientY);
    }
  }

  function handleMouseDown(event) {
    setX1(event.clientX);
    setY1(event.clientY);
  }

  function handleMouseUp(event) {
    setX2(event.clientX);
    setY2(event.clientY);
  }

  return direction;
};

const isTouchDevice = () => ('ontouchstart' in window);

export default useSwipe;