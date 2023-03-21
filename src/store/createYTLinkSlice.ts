import { immer } from "zustand/middleware/immer";

type State = {
  youTubeLink: string;
};

type Actions = {
  setYouTubeLink: (link: string) => void;
};

export default immer<State & Actions>((set, get) => ({
  youTubeLink: "",

  setYouTubeLink: (link) =>
    set((state) => {
      state.youTubeLink = link;
    }),
}));
