import { create } from "zustand";
import { devtools } from "zustand/middleware";
import createYTInfoSlice from "./createYTInfoSlice";


type StateFromFunctions<T extends [...any]> = T extends [infer F, ...infer R]
  ? F extends (...args: any) => object
  ? StateFromFunctions<R> & ReturnType<F>
  : unknown
  : unknown;

type State = StateFromFunctions<
  [
    typeof createYTInfoSlice,
  ]
>;

export const useStore = create<State>()(
  devtools(
    (set, get, store) => ({
      ...createYTInfoSlice(set, get, store),
    }),
    { name: "crystalrohr" }
  )
);
