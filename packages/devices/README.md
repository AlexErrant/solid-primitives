# @solid-primitives/devices

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Creates a primitive to get a list of media devices (microphones, speakers, cameras). There are filtered primitives for convenience reasons.

## How to use it

```ts
const devices = createDevices();

const microphones = createMicrophones();
const speakers = createSpeakers();
const cameras = createCameras();
```

The filtered primitives are build so that they only triggered if the devices of their own kind changed.

## Demo

TODO

## Changelog

<details>
<summary><b>Expand Changelog</b></summary>

0.0.100

Initial release loosely adapted from https://github.com/microcipcip/vue-use-kit/blob/master/src/functions/useMediaDevices/useMediaDevices.ts.

</details>