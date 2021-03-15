# useSwipe hook

[![NPM](https://img.shields.io/npm/v/use-swipe-hook.svg)](https://www.npmjs.com/package/use-swipe-hook)

> A simple and easy to use tiny library that provides useSwipe hook to use with React that enables swipe gestures for touch screens & non-touch screens via mouse events

## Install

```bash
npm i use-swipe-hook
```

## Usage

``` tsx
import React, { useRef } from 'react';
import { useSwipe } from 'use-swipe-hook';

function MyAwesomeComponent() {
  const swipeContainerRef = useRef();
  const direction = useSwipe({ ref: swipeContainerRef, thresholdPX: 5 });

  return (
    <div className="App">
      <h1>use-swipe-hook demo</h1>
      <h2>Works on both touch & non touch devices (by dragging mouse over the container)</h2>
      <div className="swipeContainer" ref={swipeContainerRef}>
        {direction
          ? `You have swiped ${direction}`
          : 'Swipe here to see swipe direction'
        }
      </div>
    </div>
  );
}
```

## Structure

```ts
// SWIPE_DIRECTION can be imported & used for comparison
enum SWIPE_DIRECTION {
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

const useSwipe: ({ ref, thresholdPX }: UseRefOptions) => SWIPE_DIRECTION | null
```

## Demo
[Codesandbox demo](https://codesandbox.io/s/fervent-volhard-xk4mv?fontsize=14&hidenavigation=1&theme=dark)

© [rajatkantinandi](https://github.com/rajatkantinandi)