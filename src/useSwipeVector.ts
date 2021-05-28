import { useState, useEffect } from 'react';
import { radToDeg, square } from './helper';
import { UseSwipeOptions } from './types';
import useSwipePosition from './useSwipePosition';

const useSwipeVector = ({ ref, thresholdPX = 5, unit = 'rad', useRelativeUnits = false }: UseSwipeOptions) => {
  const { x1, y1, x2, y2 } = useSwipePosition({ ref, useRelativeUnits });
  const [direction, setDirection] = useState(0);
  const [magnitude, setMagnitude] = useState(0);

  useEffect(() => {
    const mag = Math.sqrt(square(x2 - x1) + square(y2 - y1));

    if (mag > thresholdPX) {
      // Rounding up to 0 to 2 * PI
      const angleRad = (2 * Math.PI + Math.atan2(y2 - y1, x2 - x1)) % (2 * Math.PI);

      setMagnitude(mag);
      setDirection(unit === 'rad' ? angleRad : radToDeg(angleRad));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [y2]);

  return { direction, magnitude, origin: { x: x1, y: y1 } };
};

export default useSwipeVector;
