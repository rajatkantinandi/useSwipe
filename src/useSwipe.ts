import { RefObject, useState, useEffect } from 'react';

// SWIPE_DIRECTION can be imported & used for comparison
export enum SWIPE_DIRECTION {
  RIGHT = "right",
  LEFT = "left",
  UP = "up",
  DOWN = "down"
}

interface UseRefOptions {
    // ref of the container where you want to attach swipe event
    ref: RefObject<HTMLElement>;
    // (optional) no of pixels to move your finger to trigger a swipe event. 
    // Larger this value means less sensitivity. Default value is 5 (5px)
    thresholdPX?: number; 
};

const useSwipe = ({ ref, thresholdPX = 5 }: UseRefOptions) => {
  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);
  const [x2, setX2] = useState(0);
  const [y2, setY2] = useState(0);
  const [direction, setDirection] = useState<SWIPE_DIRECTION | null>(null);

  useEffect(() => {
    if (Math.abs(x2 - x1) > Math.abs(y2 - y1) && Math.abs(x2 - x1) > thresholdPX) {
      setDirection(x2 > x1 ? SWIPE_DIRECTION.RIGHT : SWIPE_DIRECTION.LEFT);
    } else if (Math.abs(y2 - y1) > thresholdPX) {
      setDirection(y2 > y1 ? SWIPE_DIRECTION.DOWN : SWIPE_DIRECTION.UP);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [y2]);

  useEffect(() => {
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
    setX1(event.clientX);
    setY1(event.clientY);
  }

  function handleMouseUp(event: MouseEvent) {
    setX2(event.clientX);
    setY2(event.clientY);
  }

  return direction;
};

const isTouchDevice = () => ('ontouchstart' in window);

export default useSwipe;