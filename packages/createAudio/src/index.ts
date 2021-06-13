import { createSignal, batch, onMount, onCleanup, createEffect } from 'solid-js';

// Set of control enums
enum AudioState {
  LOADING = "loading",
  PLAYING = "playing",
  PAUSED = "paused",
  COMPLETE = "complete",
  STOPPED = "stopped",
  READY = "ready"
}

/**
 * Creates an extremely basic audio generator method.
 *
 * @param path URL to the audio file that is to be played
 * @param handlers An array of handlers to bind against the player
 * @return
 *
 */
export const createBaseAudio = (
  path: string | (() => string),
  handlers: Array<[string, EventListener]>,
  audioEngine?: typeof Audio
) => {
  let player: HTMLAudioElement = new (audioEngine || Audio)();
  const [state, setState] = createSignal<AudioState>(AudioState.LOADING);
  // Handle option changes separately
  createEffect(() => {
    if (typeof path === "function" && path()) {
      player.src = path();
    } else {
      player.src = path as string;
    }
  });
  // Handle management on create and clean-up
  onMount(() =>
    handlers.forEach(([evt, handler]) => player.addEventListener(evt, handler))
  );
  onCleanup(() =>
    handlers.forEach(([evt, handler]) =>
      player.removeEventListener(evt, handler)
    )
  );
  return { player, state, setState };
};

/**
 * Creates a simple audio manager with basic pause and play.
 *
 * @param path URL to the audio file that is to be played
 * @return options - @type Object
 * @return options.start - Start playing
 * @return options.stop - Stop playing
 * @return options.state - Current state of the player as a Symbol
 * @return Returns a location signal and one-off async query callback
 *
 * @example
 * ```ts
 * const [start, pause] = createAudio('./example1.mp3);
 * ```
 */
export const createAudio = (path: string | (() => string)) => {
  const { player, state, setState } = createBaseAudio(path, [
    ["loadeddata", () => batch(() => setState(AudioState.READY))],
    ["loadstart", () => setState(AudioState.LOADING)],
    ["playing", () => setState(AudioState.PLAYING)],
    ["pause", () => setState(AudioState.PAUSED)]
  ]);
  // Audio controls
  const play = () => player.play();
  const pause = () => player.pause();
  return { play, pause, state };
};

/**
 * Creates a simple audio manager with most control actions.
 *
 * @param path URL to the audio file that is to be played
 * @param volume Volume setting for the audio file
 * @return options - @type Object
 * @return options.start - Start playing
 * @return options.stop - Stop playing
 * @return options.currentTime - Current time that the player is at
 * @return options.state - Current state of the player as a Symbol
 * @return options.duration - Duration of the audio clip
 * @return options.seek - A function to support seeking
 * @return options.setVolume - A function to change the volume setting
 * @return Returns a location signal and one-off async query callback
 *
 * @example
 * ```ts
 * const [start, pause, seek, currentTime, duration] = createAudioManager('./example1.mp3);
 * ```
 */
export const createAudioManager = (
  path: string | (() => string),
  volume: number = 1
) => {
  const [currentTime, setCurrentTime] = createSignal<number>(0);
  const [duration, setDuration] = createSignal<number>(0);
  // Bind recording events to the player
  const { player, state, setState } = createBaseAudio(path, [
    [
      "loadeddata",
      () =>
        batch(() => {
          setState(AudioState.READY);
          setDuration(player.duration);
        })
    ],
    ["loadstart", () => setState(AudioState.LOADING)],
    ["playing", () => setState(AudioState.PLAYING)],
    ["pause", () => setState(AudioState.PAUSED)],
    ["loadstart", () => setState(AudioState.LOADING)],
    ["playing", () => setState(AudioState.PLAYING)],
    ["pause", () => setState(AudioState.PAUSED)],
    ["timeupdate", () => setCurrentTime(player.currentTime)]
  ]);
  // Audio controls
  const play = () => player.play();
  const pause = () => player.pause();
  const seek = (time: number) => player.fastSeek(time);
  const setVolume = (volume: number) => (player.volume = volume);

  createEffect(() => (player.volume = volume));

  return { play, pause, currentTime, state, duration, seek, setVolume };
};