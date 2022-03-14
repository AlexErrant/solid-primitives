import {
  getOwner,
  onCleanup,
  on,
  createSignal,
  Accessor,
  DEV,
  untrack,
  Signal,
  batch
} from "solid-js";
import type {
  BaseOptions,
  EffectFunction,
  NoInfer,
  OnOptions
} from "solid-js/types/reactive/signal";
import { isServer } from "solid-js/web";
import type {
  AnyClass,
  Fn,
  ItemsOf,
  Keys,
  MaybeAccessor,
  MaybeAccessorValue,
  Noop,
  OnAccessEffectFunction,
  Values,
  Fallback,
  Trigger,
  TriggerCache,
  AnyFunction,
  AnyObject,
  StaticStoreSetter
} from "./types";

export * from "./types";

//
// GENERAL HELPERS:
//

/** no operation */
export const noop = (() => undefined) as Noop;

export const isClient = !isServer;
export { isServer };

/** development environment */
export const isDev = DEV && DEV.hasOwnProperty("writeSignal");
/** production environment */
export const isProd = !isDev;
/** `console.warn` only during development */
export const warn: typeof console.warn = (...a) => isDev && console.warn(...a);

/**
 * `if (typeof value !== "undefined" && value !== null)`
 */
export const isDefined = <T>(value: T | undefined | null): value is T =>
  typeof value !== "undefined" && value !== null;
export const isFunction = <T>(value: T | Function): value is Function =>
  typeof value === "function";
export const isBoolean = (val: any): val is boolean => typeof val === "boolean";
export const isNumber = (val: any): val is number => typeof val === "number";
export const isString = (val: unknown): val is string => typeof val === "string";
export const isObject = (val: any): val is object => toString.call(val) === "[object Object]";
export const isArray = Array.isArray as (val: any) => val is any[];

/**
 * Check if the value is an instance of ___
 */
export const ofClass = (v: any, c: AnyClass): boolean =>
  v instanceof c || (v && v.constructor === c);

export const compare = (a: any, b: any): number => (a < b ? -1 : a > b ? 1 : 0);

/**
 * for creating tuples by inferring type
 * @example
 * const users = tuple(["John", "Jeff", "Joe"]);
 * users // T: [string, string, string]
 */
export const tuple = <T extends [] | any[]>(input: T): T => input;

/**
 * Removes the `null` and `undefined` from the type.
 * @warning **Obviously use with caution**
 */
export const definite = <T>(v: T) => v as NonNullable<T>;

/**
 * Get the value if it is defined, or get the fallback otherwise
 * @param v the value to check
 * @param fallback the fallback value
 */
export function withFallback<T>(v: T, fallback: NonNullable<T>): Fallback<T>;
export function withFallback<T, F>(v: T, fallback: F): Fallback<T, F>;
export function withFallback(v: any, fallback: any): any {
  return isDefined(v) ? v : fallback;
}

/**
 * Get the value if it is defined, or get the fallback otherwise
 * @param v the value to check
 * @param fallback function returning a fallback value
 */
export function withFallbackFn<T>(v: T, fallback: () => NonNullable<T>): Fallback<T>;
export function withFallbackFn<T, F>(v: T, fallback: () => F): Fallback<T, F>;
export function withFallbackFn(v: any, fallback: () => any): any {
  return isDefined(v) ? v : fallback();
}

/** `Array.prototype.includes()` without so strict types. Also allows for checking for multiple items */
export const includes = (arr: any[], ...items: any): boolean => {
  for (const item of arr) {
    if (items.includes(item)) return true;
  }
  return false;
};

/**
 * Accesses the value of a MaybeAccessor
 * @example
 * ```ts
 * access("foo") // => "foo"
 * access(() => "foo") // => "foo"
 * ```
 */
export const access = <T extends MaybeAccessor<any>>(v: T): MaybeAccessorValue<T> =>
  isFunction(v) && !v.length ? v() : v;

/** If value is a function – call it with a given argument – otherwise get the value as is */
export function accessWith<T>(
  v: T,
  args: T extends AnyFunction ? MaybeAccessor<Parameters<T>> : never
): T extends AnyFunction ? ReturnType<T> : T {
  if (!isFunction(v)) return v as any;
  const a = isFunction(args) ? untrack(args) : (args as any);
  return v(...a);
}

/**
 * Accesses the value of a MaybeAccessor, but always returns an array
 * @example
 * ```ts
 * accessAsArray('abc') // => ['abc']
 * accessAsArray(() => 'abc') // => ['abc']
 * accessAsArray([1,2,3]) // => [1,2,3]
 * accessAsArray(() => [1,2,3]) // => [1,2,3]
 * ```
 */
export const accessAsArray = <T extends MaybeAccessor<any>, V = MaybeAccessorValue<T>>(
  value: T
): V extends any[] ? V : V[] => asArray(access(value)) as any;

export const asArray = <T>(value: T): T extends any[] ? T : T[] =>
  Array.isArray(value) ? (value as any) : [value];

/**
 * Access an array of MaybeAccessors
 * @example
 * const list = [1, 2, () => 3)] // T: MaybeAccessor<number>[]
 * const newList = accessArray(list) // T: number[]
 */
export const accessArray = <A extends MaybeAccessor<any>>(
  list: readonly A[]
): MaybeAccessorValue<A>[] => list.map(v => access(v));

/**
 * Run the function if the accessed value is not `undefined` nor `null`
 * @param value
 * @param fn
 */
export const withAccess = <T, A extends MaybeAccessor<T>, V = MaybeAccessorValue<A>>(
  value: A,
  fn: (value: NonNullable<V>) => void
) => {
  const _value = access(value);
  isDefined(_value) && fn(_value as NonNullable<V>);
};

export const asAccessor = <A extends MaybeAccessor<unknown>>(
  v: A
): Accessor<MaybeAccessorValue<A>> => (isFunction(v) ? (v as any) : () => v);

export function onAccess<S extends MaybeAccessor<unknown>[] | [], Next, Init = unknown>(
  deps: S,
  fn: OnAccessEffectFunction<S, Init | Next, Next>,
  options?: OnOptions
): EffectFunction<NoInfer<Init> | NoInfer<Next>, NoInfer<Next>> {
  const source = deps.map(asAccessor);
  return (on as any)(source, fn, options);
}

/**
 * Quickly iterate over an MaybeAccessor<any>
 *
 * @example
 * ```ts
 * const myFunc = (source: MaybeAccessor<string[]>) => {
 *    forEach(source, item => console.log(item))
 * }
 * ```
 */
export const forEach = <A extends MaybeAccessor<any>, V = MaybeAccessorValue<A>>(
  array: A,
  iterator: (
    item: V extends any[] ? ItemsOf<V> : V,
    index: number,
    array: V extends any[] ? V : V[]
  ) => void
): void => accessAsArray(array).forEach(iterator as any);

/**
 * Iterate through object entries.
 */
export const forEachEntry = <A extends MaybeAccessor<object>, O = MaybeAccessorValue<A>>(
  object: A,
  iterator: (
    key: keyof O,
    item: Values<O>,
    index: number,
    pairs: [keyof O, Values<O>][],
    object: O
  ) => void
): void => {
  const obj = access(object);
  Object.entries(obj).forEach(([key, item], index, pairs) =>
    iterator(key as keyof O, item, index, pairs as [keyof O, Values<O>][], obj as O)
  );
};

/**
 * Get `Object.entries()` of an MaybeAccessor<object>
 */
export const entries = <A extends MaybeAccessor<object>, O = MaybeAccessorValue<A>>(
  object: A
): [Keys<O>, Values<O>][] => Object.entries(access(object)) as [Keys<O>, Values<O>][];

/**
 * Get keys of an object
 */
export const keys = Object.keys as <T extends object>(object: T) => (keyof T)[];

/**
 * Creates a promise that resolves *(or rejects)* after given time.
 *
 * @param ms timeout duration in ms
 * @param throwOnTimeout promise will be rejected on timeout if set to `true`
 * @param reason rejection reason
 * @returns Promise<void>
 *
 * @example
 * ```ts
 * await promiseTimeout(1500) // will resolve void after timeout
 * await promiseTimeout(1500, true, 'rejection reason') // will reject 'rejection reason' after timout
 * ```
 */
export const promiseTimeout = (
  ms: number,
  throwOnTimeout = false,
  reason = "Timeout"
): Promise<void> =>
  new Promise((resolve, reject) =>
    throwOnTimeout ? setTimeout(() => reject(reason), ms) : setTimeout(resolve, ms)
  );

/**
 * Combination of `Promise.race()` and `promiseTimeout`.
 *
 * @param promises single promise, or array of promises
 * @param ms timeout duration in ms
 * @param throwOnTimeout promise will be rejected on timeout if set to `true`
 * @param reason rejection reason
 * @returns a promise resulting in value of the first source promises to be resolved
 *
 * @example
 * ```ts
 * // single promise
 * await raceTimeout(new Promise(() => {...}), 3000)
 * // list of promises racing
 * await raceTimeout([new Promise(),new Promise()...], 3000)
 * // reject on timeout
 * await raceTimeout(new Promise(), 3000, true, 'rejection reason')
 * ```
 */
export function raceTimeout<T>(
  promises: T,
  ms: number,
  throwOnTimeout: true,
  reason?: string
): T extends any[] ? Promise<Awaited<T[number]>> : Promise<Awaited<T>>;
export function raceTimeout<T>(
  promises: T,
  ms: number,
  throwOnTimeout?: boolean,
  reason?: string
): T extends any[] ? Promise<Awaited<T[number]> | undefined> : Promise<Awaited<T> | undefined>;
export function raceTimeout(
  input: any,
  ms: number,
  throwOnTimeout = false,
  reason = "Timeout"
): Promise<any> {
  const promises = asArray(input);
  const race = Promise.race([...promises, promiseTimeout(ms, throwOnTimeout, reason)]);
  race.finally(() => {
    promises.forEach(
      // inputted promises can have .dispose() method on them,
      // it will be called when the first promise resolves, to stop the rest
      (p: any) => p && typeof p === "object" && typeof p.dispose === "function" && p.dispose()
    );
  });
  return race;
}

/**
 * Solid's `onCleanup` that is registered only if there is a root.
 */
export const onRootCleanup: typeof onCleanup = fn => (getOwner() ? onCleanup(fn) : fn);

export const createCallbackStack = <A0 = void, A1 = void, A2 = void, A3 = void>(): {
  push: (...callbacks: ((arg0: A0, arg1: A1, arg2: A2, arg3: A3) => void)[]) => void;
  execute: (arg0: A0, arg1: A1, arg2: A2, arg3: A3) => void;
  clear: Fn;
} => {
  let stack: Array<(arg0: A0, arg1: A1, arg2: A2, arg3: A3) => void> = [];
  const clear: Fn = () => (stack = []);
  return {
    push: (...callbacks) => stack.push(...callbacks),
    execute(arg0, arg1, arg2, arg3) {
      stack.forEach(cb => cb(arg0, arg1, arg2, arg3));
      clear();
    },
    clear
  };
};

/**
 * Group synchronous function calls.
 * @param fn
 * @returns `fn`
 */
export function createMicrotask<A extends any[] | []>(fn: (...a: A) => void): (...a: A) => void {
  let calls = 0;
  let args: A;
  return (...a: A) => {
    (args = a), calls++;
    queueMicrotask(() => --calls === 0 && fn(...args));
  };
}

/** WIP: an easier to setup and type Proxy */
export function createProxy<T extends Record<string | symbol, any>>(traps: {
  get: <K extends keyof T>(key: K) => T[K];
  set: <K extends keyof T>(key: K, value: T[K]) => void;
}): T;
export function createProxy<T extends Record<string | symbol, any>>(traps: {
  get: <K extends keyof T>(key: K) => T[K];
  set?: undefined;
}): Readonly<T>;
export function createProxy(traps: {
  get: (key: string | symbol) => any;
  set?: (key: string | symbol, value: any) => void;
}): any {
  return new Proxy(
    {},
    {
      get: (_, k) => traps.get(k),
      set: (_, k, v) => {
        traps.set?.(k, v);
        return false;
      }
    }
  );
}

/**
 * Set listeners in reactive computations and then trigger them when you want.
 * @returns `[track function, dirty function]`
 * @example
 * const [track, dirty] = createTrigger()
 * createEffect(() => {
 *    track()
 *    ...
 * })
 * // later
 * dirty()
 */
export function createTrigger(options?: BaseOptions): Trigger {
  return createSignal(undefined, { equals: false, name: options?.name });
}

/**
 * Set listeners in reactive computations and then trigger them when you want. Cache trackers by a `key`.
 * @returns `{ track, dirty, dirtyAll }` functions
 * `track` and `dirty` are called with a `key` so that each tracker will trigger an update only when his individual `key` would get marked as dirty.
 * @example
 * const { track, dirty } = createTriggerCache()
 * createEffect(() => {
 *    track(1)
 *    ...
 * })
 * // later
 * dirty(1)
 * // this won't cause an update:
 * dirty(2)
 */
export function createTriggerCache<T>(options?: BaseOptions): TriggerCache<T> {
  const cache = new Map<T, Trigger>();
  return {
    dirty: key => cache.get(key)?.[1](),
    dirtyAll: () => cache.forEach(s => s[1]()),
    track(key) {
      let trigger = cache.get(key);
      if (!trigger) {
        trigger = createTrigger(options);
        cache.set(key, trigger);
      }
      trigger[0]();
    }
  };
}

/**
 * A shallow/flat and static store. It behaves similarly to the creatStore, but with limited features to keep it simple. Designed to be used for reactive objects with static keys, but dynamic values, like reactive Event State, location, etc.
 * @param init initial value of the store, put every key you want to use here, you won't be able to delete/add keys later.
 * @returns [reactive-readonly store, store setter]
 */
export function createStaticStore<T extends [] | any[] | AnyObject>(
  init: Readonly<T>
): [access: Readonly<T>, write: StaticStoreSetter<T>] {
  const copy = { ...init };
  const readObj = {} as T;
  const signalCache = new Map<PropertyKey, any>();

  const signalGetter = <K extends keyof T>(key: K): Signal<T[K]> | undefined => {
    const saved = signalCache.get(key);
    if (saved || !copy.hasOwnProperty(key)) return saved;
    const signal = createSignal(copy[key], { name: key + "" });
    signalCache.set(key, signal);
    delete copy[key];
    return signal;
  };

  for (const key of keys(init)) {
    readObj[key] = undefined as any;
    Object.defineProperty(readObj, key, {
      get: () => signalGetter(key)![0]()
    });
  }

  const setter = (a: any, b?: any) => {
    if (typeof a === "object" || isFunction(a))
      batch(() => {
        for (const [key, value] of entries(accessWith(a, () => [{ ...readObj }])))
          signalGetter(key as keyof T)?.[1](() => value);
      });
    else signalGetter(a)?.[1](b);
    return readObj;
  };

  return [readObj, setter];
}
