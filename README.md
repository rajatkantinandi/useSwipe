# useSwipe hook

[![NPM](https://img.shields.io/npm/v/use-swipe-hook.svg)](https://www.npmjs.com/package/use-swipe-hook)

> A simple and easy to use tiny library that provides useSwipe hook to use with React that enables swipe gestures for touch screens

## Install

```bash
npm i use-swipe-hook
```

## Usage

``` jsx
import React, { useRef } from "react";
import { useSwipe } from "use-swipe-hook";

function MyAwesomeComponent() {
  const swipeContainerRef = useRef();
  const direction = useSwipe({ ref: swipeContainerRef, thresholdPX: 5 });

  return (
    <div className="App">
      <h1>use-swipe-hook demo</h1>
      <h2>Works on touch devices</h2>
      <div className="swipeContainer" ref={swipeContainerRef}>
        {direction
          ? `You have swiped ${direction}`
          : "Swipe here to see swipe direction"
        }
      </div>
    </div>
  );
}
```

## Params

- __ref__: ref of the container where you want to attach swipe event
- __thresholdPX__(*optional*): no of pixels to move your finger to trigger a swipe event. More this value means less sensitivity. Default value is 5px.

## Returned value

- __direction__: "left" | "right" | "up" | "down"

## Demo
[Codesandbox demo](https://codesandbox.io/s/fervent-volhard-xk4mv?fontsize=14&hidenavigation=1&theme=dark)

© [rajatkantinandi](https://github.com/rajatkantinandi)