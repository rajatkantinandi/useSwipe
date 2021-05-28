import { useState, useEffect } from 'react';
import { UseSwipeOptions } from './types';

const useSwipePosition = ({ ref, useRelativeUnits = false }: UseSwipeOptions) => {
  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);
  const [x2, setX2] = useState(0);
  const [y2, setY2] = useState(0);

  useEffect(() => {
    const currentElement = ref.current;

    if (currentElement) {
      if (isTouchDevice()) {
        currentElement.addEventListener('touchstart', handleTouchStart);
        currentElement.addEventListener('touchend', handleTouchEnd);
      } else {
        currentElement.addEventListener('mousedown', handleMouseDown);
        currentElement.addEventListener('mouseup', handleMouseUp);
      }
    }

    return () => {
      if (currentElement) {
        if (isTouchDevice()) {
          currentElement.removeEventListener('touchstart', handleTouchStart);
          currentElement.removeEventListener('touchend', handleTouchEnd);
        } else {
          currentElement.removeEventListener('mousedown', handleMouseDown);
          currentElement.removeEventListener('mouseup', handleMouseUp);
        }
      }
    };
  }, [ref]);

  function handleTouchStart(event: TouchEvent) {
    setX1(event.changedTouches[0].clientX);
    setY1(event.changedTouches[0].clientY);
  }

  function handleTouchEnd(event: TouchEvent) {
    if (event.changedTouches && event.changedTouches.length > 0) {
      setX2(event.changedTouches[0].clientX);
      setY2(event.changedTouches[0].clientY);
    }
  }

  function handleMouseDown(event: MouseEvent) {
    const { x, y } = getDimensionsFromEvent(event);
    setX1(x);
    setY1(y);
  }

  function handleMouseUp(event: MouseEvent) {
    const { x, y } = getDimensionsFromEvent(event);
    setX2(x);
    setY2(y);
  }

  function getDimensionsFromEvent(event: MouseEvent) {
    let x = event.clientX,
      y = event.clientY;

    if (useRelativeUnits && ref.current) {
      const { top, left } = ref.current.getBoundingClientRect();
      x -= left;
      y -= top;
    }

    return { x, y };
  }

  return { x1, y1, x2, y2 };
};

const isTouchDevice = () => 'ontouchstart' in window;

export default useSwipePosition;
