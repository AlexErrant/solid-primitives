<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=Primitives&background=tiles&project=Websocket" alt="Solid Primitives Websocket">
</p>

## Warning: This package is under active development and will change.

# @solid-primitives/websocket

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg?style=for-the-badge)](https://lerna.js.org/)
[![stage](https://img.shields.io/endpoint?style=for-the-badge&url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolidjs-community%2Fsolid-primitives%2Fmain%2Fassets%2Fbadges%2Fstage-0.json)](https://github.com/solidjs-community/solid-primitives#contribution-process)

Primitive to help establish, maintain and operate a websocket connection.

`createWebsocket` - Core primitive that setups up a basic outbound connection.

## How to use it

```ts
const [connect, disconnect] = createWebsocket("http://localhost", "", 3, 5000);
```

## Demo

You may find a semi-functional example here: https://codesandbox.io/s/solid-websocket-65ynu?file=/src/index.tsx

## Changelog

<details>
<summary><b>Expand Changelog</b></summary>

0.0.100

Initial version. Proposed and waiting for feedback.

0.3.0

Fixed package exports.

</details>
