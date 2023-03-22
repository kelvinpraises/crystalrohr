import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// from https://stackoverflow.com/questions/54954091/how-to-use-callback-with-usestate-hook-in-react/61842546#61842546
export default function <T>(
  initialState: T
): [T, (state: SetStateAction<T>, cb?: (state: T) => void) => void] {
  const [state, setState] = useState(initialState);
  const cbRef = useRef<((state: T) => void) | undefined>(undefined); // init mutable ref container for callbacks

  const setStateCallback = useCallback(
    (state: SetStateAction<T>, cb?: (state: T) => void) => {
      cbRef.current = cb; // store current, passed callback in ref
      setState(state);
    },
    []
  ); // keep object reference stable, exactly like `useState`

  useEffect(() => {
    // cb.current is `undefined` on initial render,
    // so we only invoke callback on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = undefined; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
}
