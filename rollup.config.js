import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import typescript from 'rollup-plugin-typescript2';
import packageJSON from "./package.json";

const input = "./src/index.ts";
const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, ".min.js");

export default [
  {
    input,
    output: {
      file: packageJSON.browser,
      format: "umd",
      name: "use-swipe-hook",
      globals: {
        react: "React",
        "@emotion/styled": "styled",
        "@emotion/core": "core"
      },
      sourcemap: true
    },
    plugins: [
      typescript({
        exclude: ["node_modules/**", "lib/**"]
      }),
      external(),
      resolve(),
      commonjs()
    ],
  },
  {
    input,
    output: {
      file: minifyExtension(packageJSON.browser),
      format: "umd",
      name: "use-swipe-hook",
      globals: {
        react: "React",
        "@emotion/styled": "styled",
        "@emotion/core": "core"
      }
    },
    plugins: [
      typescript({
        exclude: ["node_modules/**", "lib/**"]
      }),
      external(),
      resolve(),
      commonjs(),
      terser()
    ],
  },
];
