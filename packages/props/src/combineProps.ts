import { $PROXY, mergeProps, untrack } from "solid-js";
import type { JSX, MergeProps } from "solid-js";
import { type AnyObject, chain } from "@solid-primitives/utils";

const extractCSSregex = /([^:; ]*):\s*([^;]*)/g;

const accessDescriptor = <T>(descriptor: TypedPropertyDescriptor<T>): T | undefined =>
  descriptor.get ? descriptor.get() : descriptor.value;

const isEventListenerKey = (key: string): boolean =>
  key[0] === "o" &&
  key[1] === "n" &&
  key.length > 2 &&
  key[2] !== ":" &&
  !key.startsWith("oncapture:");

/**
 * converts inline string styles to object form
 * @example
 * const styles = stringStyleToObject("margin: 24px; border: 1px solid #121212");
 * styles; // { margin: "24px", border: "1px solid #121212" }
 * */
export function stringStyleToObject(style: string): JSX.CSSProperties {
  const object: Record<string, string> = {};
  let match: RegExpExecArray | null;
  while ((match = extractCSSregex.exec(style))) {
    object[match[1]] = match[2];
  }
  return object;
}

/**
 * Combines two set of styles together. Accepts both string and object styles.\
 * @example
 * const styles = combineStyle("margin: 24px; border: 1px solid #121212", {
 *   margin: "2rem",
 *   padding: "16px"
 * });
 * styles; // { margin: "2rem", border: "1px solid #121212", padding: "16px" }
 */
export function combineStyle(a: string, b: string): string;
export function combineStyle(a: JSX.CSSProperties, b: JSX.CSSProperties): JSX.CSSProperties;
export function combineStyle(
  a: JSX.CSSProperties | string,
  b: JSX.CSSProperties | string
): JSX.CSSProperties;
export function combineStyle(
  a: JSX.CSSProperties | string,
  b: JSX.CSSProperties | string
): JSX.CSSProperties | string {
  if (typeof a === "object" && typeof b === "object") return { ...a, ...b };
  if (typeof a === "string" && typeof b === "string") return `${a};${b}`;

  const objA = typeof a === "object" ? a : stringStyleToObject(a);
  const objB = typeof b === "object" ? b : stringStyleToObject(b);

  return { ...objA, ...objB };
}

type PropsInput = {
  class?: string;
  className?: string;
  classList?: Record<string, boolean | undefined>;
  style?: JSX.CSSProperties | string;
  ref?: Element | ((el: any) => void);
} & AnyObject;

/**
 * A helper that reactively merges multiple props objects together while smartly combining some of Solid's JSX/DOM attributes.
 *
 * Event handlers and refs are chained, class, classNames and styles are combined.
 * For all other props, the last prop object overrides all previous ones. Similarly to {@link mergeProps}
 * @param sources - Multiple sets of props to combine together.
 * @example
 * ```tsx
 * const MyButton: Component<ButtonProps> = props => {
 *    const { buttonProps } = createButton();
 *    const combined = combineProps(props, buttonProps);
 *    return <button {...combined} />
 * }
 * // component consumer can provide button props
 * // they will be combined with those provided by createButton() primitive
 * <MyButton style={{ margin: "24px" }} />
 * ```
 */
export function combineProps<T extends [PropsInput, ...PropsInput[]]>(
  ...sources: T
): MergeProps<T> {
  if (sources.length === 1) {
    return sources[0] as MergeProps<T>;
  }

  return untrack(() => {
    // check if the sources are dynamic (are proxies)
    if (!process.env.SSR && sources.some(s => $PROXY in s)) {
      // create a map of event listeners to be chained
      const listeners: Record<string, ((...args: any[]) => void)[]> = {};

      for (const props of sources) {
        for (const key in props) {
          if (!isEventListenerKey(key)) continue;

          const v = props[key];
          const name = key.toLowerCase();

          let callback: (...args: any[]) => void;
          if (typeof v === "function") callback = v;
          // jsx event listeners also accept a tuple [handler, arg]
          else if (Array.isArray(v)) {
            if (v.length === 1) callback = v[0];
            else callback = v[0].bind(void 0, v[1]);
          } else {
            delete listeners[name];
            continue;
          }

          const callbacks = listeners[name];
          if (!callbacks) listeners[name] = [callback];
          else callbacks.push(callback);
        }
      }

      const reduce = <K extends keyof PropsInput>(
        key: K,
        calc: (a: NonNullable<PropsInput[K]>, b: NonNullable<PropsInput[K]>) => PropsInput[K]
      ) => {
        let v: PropsInput[K] = undefined;
        for (const props of sources) {
          const propV = props[key];
          if (!v) v = propV;
          else if (propV) v = calc(v, propV);
        }
        return v;
      };

      return new Proxy(mergeProps(...sources) as unknown as MergeProps<T>, {
        get(target, key) {
          if (typeof key !== "string") return Reflect.get(target, key);

          // Combine style prop
          if (key === "style") return reduce("style", combineStyle);

          // chain props.ref assignments
          if (key === "ref") {
            const callbacks: ((el: any) => void)[] = [];
            for (const props of sources) {
              const cb = props[key] as ((el: any) => void) | undefined;
              if (typeof cb === "function") callbacks.push(cb);
            }
            return chain(callbacks);
          }

          // Chain event listeners
          if (isEventListenerKey(key)) {
            const callbacks = listeners[key.toLowerCase()];
            return Array.isArray(callbacks) ? chain(callbacks) : Reflect.get(target, key);
          }

          // Merge classes or classNames
          if (key === "class" || key === "className") return reduce(key, (a, b) => `${a} ${b}`);

          // Merge classList objects, keys in the last object overrides all previous ones.
          if (key === "classList") return reduce(key, (a, b) => ({ ...a, ...b }));

          return Reflect.get(target, key);
        }
      });
    }

    type SourcePropList = TypedPropertyDescriptor<any>[];

    const result = {} as any;
    const styleList: SourcePropList = [];
    const refList: SourcePropList = [];
    const classNameList: SourcePropList = [];
    const classListList: SourcePropList = [];
    // const eventListeners: {
    //   [key: string]: PropsInput[];
    // } = {};

    // for (const s of sources) {
    //   for (const key in s) {
    //     if (key === "style") styleList.push([s, key]);
    //     else if (key === "ref") refList.push([s, key]);
    //     else if (key === "class" || key === "className") classNameList.push([s, key]);
    //     else if (key === "calssList") classListList.push([s, key]);
    //     else if (isEventListenerKey(key)) {
    //       const list = eventListeners[key];
    //       if (Array.isArray(list)) list.push(s);
    //       else eventListeners[key] = [s];
    //     }
    //   }
    // }

    // create a map of event listeners to be chained
    const listeners: Record<string, ((...args: any[]) => void)[]> = {};

    const reduce = <T>(
      list: TypedPropertyDescriptor<T>[],
      calc: (a: NonNullable<T>, b: NonNullable<T>) => T
    ): T | undefined => {
      let a: T | undefined = undefined;
      for (const desc of list) {
        const b = accessDescriptor(desc);
        if (!a) a = b;
        else if (b) a = calc(a, b);
      }
      return a;
    };

    for (const s of sources) {
      for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(s))) {
        if (key === "style") styleList.push(descriptor);
        else if (key === "ref") refList.push(descriptor);
        else if (key === "class" || key === "className") classNameList.push(descriptor);
        else if (key === "calssList") classListList.push(descriptor);
        else if (isEventListenerKey(key)) {
          const v = accessDescriptor(descriptor);
          const name = key.toLowerCase();

          let callback: (...args: any[]) => void;
          if (typeof v === "function") callback = v;
          // jsx event listeners also accept a tuple [handler, arg]
          else if (Array.isArray(v)) {
            if (v.length === 1) callback = v[0];
            else callback = v[0].bind(void 0, v[1]);
          } else {
            delete listeners[name];
            continue;
          }

          const callbacks = listeners[name];
          if (!callbacks) listeners[name] = [callback];
          else callbacks.push(callback);
        } else {
          Object.defineProperty(result, key, descriptor);
        }
      }
    }

    if (styleList.length) {
      Object.defineProperty(result, "style", {
        get() {
          return reduce(styleList, combineStyle);
        }
      });
    }

    if (refList.length) {
      Object.defineProperty(result, "ref", {
        get() {
          return reduce(styleList, combineStyle);
        }
      });
    }

    return result;
  });
}

// const com = combineProps(
//   {
//     onSomething: 123,
//     onWheel: (e: WheelEvent) => 213,
//     something: "foo",
//     style: { margin: "24px" },
//     once: true,
//     onMount: (fn: VoidFunction) => undefined
//   },
//   {
//     onSomething: [(n: number, s: string) => "fo", 123],
//     once: "ovv"
//   },
//   {
//     onWheel: false,
//     onMount: (n: number) => void 0
//   }
// );
// com.onSomething; // (s: string) => void;
// com.once; // string;
// com.onWheel; // false;
// com.onMount; // ((fn: VoidFunction) => undefined) & ((n: number) => undefined);
// com.something; // string;
// com.style; // string | JSX.CSSProperties;
