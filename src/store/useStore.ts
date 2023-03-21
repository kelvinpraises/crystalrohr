import { create } from "zustand";
import { devtools } from "zustand/middleware";
import createAccessTokenSlice from "./createAccessTokenSlice";
import createModalSlice from "./createModalSlice";
import createProfileEditSlice from "./createProfileEditSlice";

type StateFromFunctions<T extends [...any]> = T extends [infer F, ...infer R]
  ? F extends (...args: any) => object
    ? StateFromFunctions<R> & ReturnType<F>
    : unknown
  : unknown;

type State = StateFromFunctions<
  [
    typeof createAccessTokenSlice,
    typeof createProfileEditSlice,
    typeof createModalSlice
  ]
>;

export const useStore = create<State>()(
  devtools(
    (set, get, store) => ({
      ...createAccessTokenSlice(set, get, store),
      ...createProfileEditSlice(set, get, store),
      ...createModalSlice(set, get, store),
    }),
    { name: "uveryderiv" }
  )
);
