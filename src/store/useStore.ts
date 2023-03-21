import { create } from "zustand";
import { devtools } from "zustand/middleware";
import createYTLinkSlice from "./createYTLinkSlice";


type StateFromFunctions<T extends [...any]> = T extends [infer F, ...infer R]
  ? F extends (...args: any) => object
  ? StateFromFunctions<R> & ReturnType<F>
  : unknown
  : unknown;

type State = StateFromFunctions<
  [
    typeof createYTLinkSlice,
  ]
>;

export const useStore = create<State>()(
  devtools(
    (set, get, store) => ({
      ...createYTLinkSlice(set, get, store),
    }),
    { name: "crystalrohr" }
  )
);
