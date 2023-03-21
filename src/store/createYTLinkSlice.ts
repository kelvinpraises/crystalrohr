
import { immer } from "zustand/middleware/immer";

type State = {
  accessToken: string | null;
};

type Actions = {
  setAccessToken: (token: string) => void;
};

export default immer<State & Actions>((set, get) => ({
  accessToken: null,

  setAccessToken: (token) =>
    set((state) => {
      state.accessToken = token;
    }),
}));
