import { immer } from "zustand/middleware/immer";

type State = {
  youTubeLink: string;
  youTubeId: string | null;
};

type Actions = {
  setYouTubeLink: (link: string) => void;
  setYouTubeId: (id: string) => void;
};

export default immer<State & Actions>((set, get) => ({
  youTubeLink: "",
  youTubeId: "",

  setYouTubeLink: (link) =>
    set((state) => {
      state.youTubeLink = link;
    }),
  setYouTubeId: (id) =>
    set((state) => {
      state.youTubeId = id;
    }),
}));
