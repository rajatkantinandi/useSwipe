import { RefObject } from 'react';
export interface UseSwipeOptions {
  // ref of the container where you want to attach swipe event
  ref: RefObject<HTMLElement>;
  // (optional) no of pixels to move your finger to trigger a swipe event.
  // Larger this value means less sensitivity. Default value is 5 (5px)
  thresholdPX?: number;
  unit?: 'rad' | 'deg'; // unit of direction for useSwipeVector hook
  // whether to use position units based relative to canvas rather than with respect to window
  useRelativeUnits?: boolean;
}
