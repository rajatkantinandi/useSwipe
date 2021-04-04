# useSwipe hook

[![NPM](https://img.shields.io/npm/v/use-swipe-hook.svg)](https://www.npmjs.com/package/use-swipe-hook)

> A simple and easy to use tiny library that provides useSwipe hook to use with React that enables swipe gestures for touch screens & non-touch screens via mouse events

## Install

```bash
npm i use-swipe-hook
```

## Usage

``` tsx
import React, { useRef } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { useSwipe } from "use-swipe-hook";

function App() {
  const swipeContainerRef = useRef<HTMLDivElement>(null);
  const direction = useSwipe({ ref: swipeContainerRef, thresholdPX: 5 });

  return (
    <div className="App">
      <h1>use-swipe-hook demo</h1>
      <h2>
        Works on both touch & non touch devices (by dragging mouse over the
        container)
      </h2>
      <div className="swipeContainer" ref={swipeContainerRef}>
        {direction
          ? `You have swiped ${direction}`
          : "Swipe here to see swipe direction"}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
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
