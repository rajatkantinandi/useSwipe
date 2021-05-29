# useSwipe hook

[![NPM](https://img.shields.io/npm/v/use-swipe-hook.svg)](https://www.npmjs.com/package/use-swipe-hook)

> A simple and easy to use tiny library that provides useSwipe hook to use with React that enables swipe gestures for touch screens & non-touch screens via mouse events

## Install

```bash
npm i use-swipe-hook
```

## Usage

```tsx
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { useSwipe } from 'use-swipe-hook';

function App() {
  const swipeContainerRef = useRef<HTMLDivElement>(null);
  const direction = useSwipe({ ref: swipeContainerRef, thresholdPX: 5 });

  return (
    <div className="App">
      <h1>use-swipe-hook demo</h1>
      <h2>Works on both touch & non touch devices (by dragging mouse over the container)</h2>
      <div className="swipeContainer" ref={swipeContainerRef}>
        {direction ? `You have swiped ${direction}` : 'Swipe here to see swipe direction'}
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

## Advanced Usage

Version 2 introduces 2 new hooks for advanced usage.

### useSwipeVector - Get magnitude & direction of your swipe along with origin

```tsx
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { useSwipeVector } from 'use-swipe-hook';

function UseSwipeVector() {
  const swipeContainerRef = useRef<HTMLDivElement>(null);
  const {
    magnitude,
    direction,
    origin: { x, y },
  } = useSwipeVector({
    ref: swipeContainerRef,
    thresholdPX: 5,
    unit: 'deg',
    useRelativeUnits: true,
  });

  return (
    <div className="swipeContainer vector axis" ref={swipeContainerRef}>
      {magnitude ? (
        <>
          You have swiped {magnitude.toFixed(2)}px towards {direction.toFixed(0)}&deg; starting from ({x.toFixed(0)},{' '}
          {y.toFixed(0)})
        </>
      ) : (
        'Swipe here to see swipe direction'
      )}
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<UseSwipeVector />, rootElement);
```

### useSwipePosition - Get raw co-ordinates of your swipe including start & end position

```tsx
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { useSwipePosition } from 'use-swipe-hook';

function UseSwipePosition() {
  const swipeContainerRef = useRef<HTMLDivElement>(null);
  const { x1, y1, x2, y2 } = useSwipePosition({
    ref: swipeContainerRef,
    thresholdPX: 5,
    useRelativeUnits: true,
  });

  return (
    <div className="swipeContainer position axis" ref={swipeContainerRef}>
      {x1 ? (
        <>
          You have swiped from ({x1.toFixed(0)}, {y1.toFixed(0)}) to ({x2.toFixed(0)}, {y2.toFixed(0)})
        </>
      ) : (
        'Swipe here to see swipe direction'
      )}
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<UseSwipePosition />, rootElement);
```

## Code splitting

The library uses code splitting, so even though 2 new hooks are introduced in version 2 and the overall bundle size is slightly increased, the individual hook bundle size remains small when you use a single hook on you application.
This means more features but still leaner & tiny bundle size.

## Structure

```ts
// SWIPE_DIRECTION can be imported & used for comparison
enum SWIPE_DIRECTION {
  RIGHT = 'right',
  LEFT = 'left',
  UP = 'up',
  DOWN = 'down',
}

interface UseSwipeOptions {
  // ref of the container where you want to attach swipe event
  ref: RefObject<HTMLElement>;
  // (optional) no of pixels to move your finger to trigger a swipe event.
  // Larger this value means less sensitivity. Default value is 5 (5px)
  thresholdPX?: number;
}

const useSwipe: ({ ref, thresholdPX }: UseSwipeOptions) => SWIPE_DIRECTION | null;

interface UseSwipeVectorOptions {
  // ref of the container where you want to attach swipe event
  ref: RefObject<HTMLElement>;
  // (optional) no of pixels to move your finger to trigger a swipe event.
  // Larger this value means less sensitivity. Default value is 5 (5px)
  thresholdPX?: number;
  unit?: 'rad' | 'deg'; // unit of direction for useSwipeVector hook
  // whether to use position units based relative to canvas rather than with respect to window
  useRelativeUnits?: boolean;
}

const useSwipeVector: ({ ref, thresholdPX, unit, useRelativeUnits }: UseSwipeVectorOptions) => SWIPE_DIRECTION | null;

interface UseSwipePositionOptions {
  // ref of the container where you want to attach swipe event
  ref: RefObject<HTMLElement>;
  // (optional) no of pixels to move your finger to trigger a swipe event.
  // Larger this value means less sensitivity. Default value is 5 (5px)
  thresholdPX?: number;
  // whether to use position units based relative to canvas rather than with respect to window
  useRelativeUnits?: boolean;
}

const useSwipePosition: ({ ref, thresholdPX, useRelativeUnits }: UseSwipePositionOptions) => SWIPE_DIRECTION | null;
```

## Demo

[Codesandbox demo](https://codesandbox.io/s/use-swipe-hook-demo-271g4?file=/src/App.tsx&fontsize=14&theme=dark)

## GitHub actions for type-checking, building & auto-publish

This repo uses github actions to publish a package when:

- a new release is created
- a new pull request is merged to master
  - When a pull request is merged or something is pushed to master then if src folder has file changes then only it will publish a version.
  - Additionally the merge commit message should contain `[publish]` keyword otherwise it will not publish on merge & just do build time checks.
  - Also while running the action one needs to increment the version number in package.json before merging the PR otherwise the `npm publish` command will fail.
- can be triggered manually.

On any other branch commits it will run type-check & build checks if src folder files are changed.

© [rajatkantinandi](https://github.com/rajatkantinandi)
