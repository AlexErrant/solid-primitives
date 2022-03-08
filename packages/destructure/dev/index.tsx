import { destructure, wrapGetters } from "../src";
import { Component, createEffect, createSignal } from "solid-js";
import { render } from "solid-js/web";
import "uno.css";

const Inner: Component<{ seconds: number; count: number; list: { n?: number }[] }> = props => {
  const { seconds, count } = destructure(props);

  createEffect(() => console.log("Seconds", seconds()));
  createEffect(() => console.log("Count", count()));

  const list = destructure(() => props.list, { lazy: true, deep: true });
  const [{ n: n0 }, { n: n1 }] = list;

  createEffect(() => console.log("0:", n0()));
  createEffect(() => console.log("1:", n1()));
  createEffect(() => console.log("2:", list[2].n()));
  // createEffect(() => console.log("3:", list[3]()));

  return <></>;
};

const App: Component = () => {
  const [seconds, setSeconds] = createSignal(0);
  setInterval(() => setSeconds(p => ++p), 1000);

  const [count, setCount] = createSignal(0);

  const [list, setList] = createSignal<{ n?: number }[]>([{}, {}, {}]);
  const shuffle = () => {
    console.log("~shuffle~");
    setList(p => p.slice().sort(() => Math.random() - 0.5));
  };
  setInterval(shuffle, 2000);

  const [n0, n1, n2] = wrapGetters(list, { deep: true });

  createEffect(() => console.log("0:", n0.n));
  createEffect(() => console.log("1:", n1.n));
  createEffect(() => console.log("2:", n2.n));

  setTimeout(() => setList([{ n: 1 }, { n: 2 }, { n: 3 }]), 3000);
  // setTimeout(() => setList([{ n: 1 }, { n: 2 }, { n: 3 }]), 6000);
  // setTimeout(() => setList([{ n: 1 }, { n: 2 }, { n: 3 }]), 9000);
  // setTimeout(() => setList([{}, {}, {}]), 6000);

  return (
    <div class="p-24 box-border w-full min-h-screen flex flex-col justify-center items-center space-y-4 bg-gray-800 text-white">
      <div class="wrapper-v" onclick={() => setCount(p => ++p)}>
        <button class="btn">{count()}</button>
      </div>
      {/* <Inner seconds={seconds()} count={count()} list={list()} /> */}
    </div>
  );
};

render(() => <App />, document.getElementById("root")!);
