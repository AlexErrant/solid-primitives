import { createMemo, createSignal, For } from "solid-js";
import type { Accessor, Component, JSX, Setter } from "solid-js";

export type PropType = "boolean" | "number" | "string" | "object";

export type PropObjectOptions<T> = T[] | Record<string, T> | any;

export type PropOptions<T> = (T extends undefined ? { initialValue?: T } : { initialValue: T }) & {
  min?: T extends number ? number : undefined;
  max?: T extends number ? number : undefined;
  options?: PropObjectOptions<T>;
  type?: PropType;
};

export type PropReturn<T> = [value: Accessor<T>, setValue: Setter<T>, field: Component];

export type PropProps<T> = {
  name: string;
  value: Accessor<T>;
  setValue: Setter<T>;
  min?: T extends number ? number : undefined;
  max?: T extends number ? number : undefined;
};

export const BoolProp: Component<PropProps<boolean>> = props => (
  <label>
    <input
      type="checkbox"
      name={props.name}
      checked={props.value()}
      onChange={ev => props.setValue(ev.currentTarget.checked)}
    />{" "}
    <span>{props.name}</span>{" "}
  </label>
);

export const NumberProp: Component<PropProps<number>> = props => (
  <label>
    <span>{props.name}</span>{" "}
    <input
      type="number"
      name={props.name}
      min={props.min}
      max={props.max}
      value={props.value()}
      onChange={ev => props.setValue(ev.currentTarget.valueAsNumber)}
    />{" "}
  </label>
);

export const StringProp: Component<PropProps<string>> = props => (
  <label>
    <span>{props.name}</span>{" "}
    <input
      type="text"
      name={props.name}
      value={props.value()}
      onChange={ev => props.setValue(ev.currentTarget.value)}
    />{" "}
  </label>
);

const filterEnum = <O extends Record<string, any>>(
  options: O
): [key: string, value: number | string][] => {
  const entries = Object.entries(options);
  if (Object.keys(options).every(key => key === options[options[key] as keyof O].toString())) {
    return entries
      .reduce((items, [key, value]) => {
        if (!items.includes(key)) {
          items.push(value);
        }
        return items;
      }, [] as string[])
      .map(item => [item, options[item]]);
  }
  console.log(":(");
  return entries;
};

export const SelectProp = <T extends any>(
  props: PropProps<T> & { options: PropObjectOptions<T> }
): JSX.Element => {
  const options = createMemo<[boolean | number | string, T][]>(() =>
    Array.isArray(props.options)
      ? props.options.map((option: any) => [option, option])
      : filterEnum(props.options)
  );
  const initialValue = options().findIndex(([_, value]) => value === props.value());
  return (
    <label>
      <span>{props.name}</span>{" "}
      <select
        name={props.name}
        value={initialValue.toString()}
        onChange={ev => props.setValue(options()[ev.currentTarget.selectedIndex][1] as any)}
      >
        <For each={options()} fallback={<option>"options missing"</option>}>
          {([key], index) => <option value={index()}>{key}</option>}
        </For>
      </select>{" "}
    </label>
  );
};

const defaultInitialValues: Record<PropType & string, boolean | number | string | undefined> = {
  boolean: false,
  number: 0,
  string: "",
  object: undefined
};

/**
 * creates a getter, a setter and a form control for a single prop
 *
 * @param name {string} The name of the property
 * @param options initialValue or Options object
 *
 * @example ```ts
 * createProp('value', 'test');
 * createProp('page', { initialValue: 7, min: 1, max: 99 });
 * createProp('language', {
 *   initialValue: 'en',
 *   options: ['en', 'de', 'it', 'jp', 'cn', 'xy']
 * });
 * // => { value: Accessor<string>, setValue: Setter<string>, field: Component }
 * ```
 */
export function createProp<T extends undefined>(
  name: string,
  options?: PropOptions<T>
): PropReturn<T>;
export function createProp<T = boolean>(name: string, options: PropOptions<T> | T): PropReturn<T>;
export function createProp<T = number>(name: string, options: PropOptions<T> | T): PropReturn<T>;
export function createProp<T = string>(name: string, options: PropOptions<T> | T): PropReturn<T>;
export function createProp<T = any>(name: string, options: PropOptions<T>): PropReturn<T>;
export function createProp<T>(
  name: string,
  options: T extends undefined ? never : T extends object ? PropOptions<T> : PropOptions<T> | T
): PropReturn<T>;
export function createProp<T>(name: string, options?: PropOptions<T> | T): PropReturn<T> {
  const initialValue: T | undefined =
    options == null
      ? undefined
      : typeof options !== "object"
      ? (options as T)
      : ((options as PropOptions<T>).initialValue as T | undefined) ??
        (defaultInitialValues[
          ((options as PropOptions<T>).type as keyof typeof defaultInitialValues | undefined) ??
            "object"
        ] as T | undefined);

  if (initialValue == null) {
    throw new Error(`cannot get type for Prop ${name}`);
  }
  const propType = (options as PropOptions<T>)?.options
    ? "object"
    : (options as PropOptions<T>)?.type ?? (typeof initialValue as PropType);

  const [value, setValue] = createSignal<T>(initialValue, { name });
  return [
    value as Accessor<T>,
    setValue as Setter<T>,
    propType === "boolean"
      ? () => BoolProp({ name, value: value as any, setValue: setValue as Setter<boolean> })
      : propType === "number"
      ? () => NumberProp({ name, value: value as any, setValue: setValue as Setter<number> })
      : propType === "string"
      ? () => StringProp({ name, value: value as any, setValue: setValue as Setter<string> })
      : () =>
          SelectProp<T>({
            name,
            value: value as Accessor<T>,
            setValue: setValue as Setter<T>,
            options: (options as PropOptions<T>).options ?? ([initialValue] as PropObjectOptions<T>)
          })
  ];
}

export type CreateProps = <
  Props extends {
    [name: string]: boolean | number | string | PropOptions<boolean | number | string | object>;
  }
>(
  props: Props
) => [
  props: {
    [name in keyof Props]: Accessor<
      Props[name] extends object
        ? Props[name]["options"] extends object
          ? Props[name]["options"][keyof Props[name]["options"]]
          : Props[name]["initialValue"]
        : Props[name] extends boolean
        ? boolean
        : Props[name]
    >;
  } &
    {
      [name in keyof Props as `set${Capitalize<name & string>}`]: Setter<
        Props[name] extends object
          ? Props[name]["options"] extends object
            ? Props[name]["options"][keyof Props[name]["options"]]
            : Props[name]["initialValue"]
          : Props[name] extends boolean
          ? boolean
          : Props[name]
      >;
    },
  fields: JSX.Element[]
];

/**
 * creates reactive props for testing a component
 *
 * @param props {Record<string, PropOptions>}
 * @returns ```ts
 * [
 *   props: { [name: string]: Accessor<T>, [setName: string]: Setter<T> }
 *   fields: JSX.Element[]
 * ]
 * ```
 * You get the fields to render the prop controls and getter and setter names derived from the name in `props` based on common practice, i.e. `count` would automatically translate to
 * ```ts
 * { count: Accessor<T>, getCount: Setter<T> }
 * ```
 * @example ```ts
 * const [props, fields] = createProps({
 *   value: { initialValue: '' },
 *   disabled: { initialValue: false },
 *   invalid: { initialValue: false },
 *   type: { initialValue: 'text', options: ['text', 'password', 'email'] }
 * })
 * return <>
 *   <Input {...props} />
 *   {fields}
 * </>
 * ```
 */
export const createProps: CreateProps = props =>
  Object.entries(props).reduce(
    (result, [name, options]) => {
      const [value, setValue, field] = createProp(name, options as any);
      result[0][name] = value;
      result[0][`set${name.slice(0, 1).toUpperCase()}${name.slice(1)}`] = setValue;
      result[1].push(field({}));
      return result;
    },
    [{} as any, [] as JSX.Element[]]
  );
