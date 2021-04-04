import { useState, useEffect } from 'react';
import { UseSwipeOptions } from './types';
import useSwipePosition from './useSwipePosition';

// SWIPE_DIRECTION can be imported & used for comparison
export enum SWIPE_DIRECTION {
  RIGHT = "right",
  LEFT = "left",
  UP = "up",
  DOWN = "down"
}

const useSwipe = ({ ref, thresholdPX = 5 }: UseSwipeOptions) => {
  const { x1, y1, x2, y2 } = useSwipePosition({ ref });
  const [direction, setDirection] = useState<SWIPE_DIRECTION | null>(null);

  useEffect(() => {
    if (Math.abs(x2 - x1) > Math.abs(y2 - y1) && Math.abs(x2 - x1) > thresholdPX) {
      setDirection(x2 > x1 ? SWIPE_DIRECTION.RIGHT : SWIPE_DIRECTION.LEFT);
    } else if (Math.abs(y2 - y1) > thresholdPX) {
      setDirection(y2 > y1 ? SWIPE_DIRECTION.DOWN : SWIPE_DIRECTION.UP);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [y2]);

  return direction;
};

export default useSwipe;