import usePollingEffect from "@/utils/usePollingEffect";
import useStateCallback from "@/utils/useStateCallback";
import { useEffect, useRef, useState } from "react";
import { Colour } from "../utils/colors";

const useCanvas = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const slicedRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const colorsRef = useRef<{ r: number; g: number; b: number }[]>([]);

  const [audioState, setAudioState] = useStateCallback<{
    audioContext: AudioContext | null;
    sources: any[];
  }>({
    audioContext: null,
    sources: [],
  });
  const [sessionHash, setSessionHash] = useState("");

  useEffect(() => {
    setSessionHash(""); // uuid here
  }, [setSessionHash]);

  const loop = async () => {
    if (
      !videoRef.current ||
      !slicedRef.current ||
      !canvasRef.current ||
      !canvasRef2.current
    )
      return;

    const video = videoRef.current;
    const sliced = slicedRef.current;
    const canvas = canvasRef.current;
    const canvas2 = canvasRef2.current;

    try {
      if (!video.videoHeight) return;

      const context = canvas.getContext("2d", {
        willReadFrequently: true,
      }) as CanvasRenderingContext2D;
      const context2 = canvas2.getContext("2d", {
        willReadFrequently: true,
      }) as CanvasRenderingContext2D;

      const w = video.videoWidth;
      const h = video.videoHeight;
      canvas.width = w;
      canvas.height = h;

      // Draw video image on canvas.
      context.fillRect(0, 0, w, h);
      context.drawImage(video, 0, 0, w, h);

      const col = 8;
      const row = 4;
      const colWidth = canvas.width / col;
      const rowHeight = canvas.height / row;
      const accumulatedColors: { r: number; g: number; b: number }[] = [];

      while (sliced.firstChild) {
        sliced.removeChild(sliced?.lastChild as ChildNode);
      }

      // Divide image into blocks.
      for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
          canvas2.width = w;
          canvas2.height = h;

          context2.clearRect(0, 0, colWidth, rowHeight);
          context2.drawImage(
            canvas,
            j * colWidth,
            i * rowHeight,
            colWidth,
            rowHeight,
            0,
            0,
            colWidth,
            rowHeight
          );

          // Get colors.
          const a = colWidth * rowHeight;

          const data = context2.getImageData(0, 0, colWidth, rowHeight).data;
          let r = 0;
          let g = 0;
          let b = 0;

          for (let i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
          }

          r = ~~(r / a);
          g = ~~(g / a);
          b = ~~(b / a);

          accumulatedColors.push({ r, g, b });

          sliced.style.width = w + "px";

          let cell = document.createElement("div");
          cell.style.width = colWidth + "px";
          cell.style.height = rowHeight + "px";
          cell.style.backgroundColor = `rgb(${r},${g},${b})`;
          sliced.appendChild(cell);
        }
      }

      // Check color similariy.
      let similar: boolean;
      const colors = colorsRef.current;

      if (colors.length === 0) {
        // init with true to prevent blank canvas caption
        similar = true;
        colorsRef.current = [...accumulatedColors];
      } else {
        const difference = colors.map((color1, i) => {
          const color2 = accumulatedColors[i];

          // convert RGB to LAB
          const [L1, A1, B1] = Colour.rgba2lab(color1.r, color1.g, color1.b);
          const [L2, A2, B2] = Colour.rgba2lab(color2.r, color2.g, color2.b);
          const deltaE = Colour.deltaE00(L1, A1, B1, L2, A2, B2);

          return deltaE;
        });

        const average =
          difference.reduce((a, b) => a + b, 0) / difference.length;

        console.debug(difference);
        console.debug(average);

        if (average > 12) {
          similar = false;
        } else {
          similar = true;
        }

        colorsRef.current = [...accumulatedColors];
      }

      console.debug("Scene just changed? ", !similar);

      // if (audioState.audioContext) {
      //   audioState.audioContext.close();
      //   setAudioState((prev) => {
      //     return { ...prev, audioContext: null };
      //   });
      // }

      if (!similar) {
        let headersList = {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
        };

        let bodyContent = JSON.stringify({
          base64Image: canvas.toDataURL("image/png"),
          sessionHash,
        });

        setAudioState(
          { audioContext: new AudioContext(), sources: [] },
          (audioState) => {
            const audioPlay = async (audioBuffer: AudioBuffer) => {
              if (!audioState.audioContext) return;

              // Stop sound before the next one starts.
              // (() => {
              //   for (let i = 0; i < 8; i++)
              //     if (audioState.sources[i]) audioState.sources[i].stop(0);
              // })();

              const source = audioState.audioContext.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(audioState.audioContext.destination);
              source.start();

              // Save audio source to sources.
              setAudioState((prev) => {
                return { ...prev, sources: [...audioState.sources, source] };
              });
            };

            (async () => {
              await fetch(
                "https://crystalrohr-api-production.up.railway.app/api/auto-caption",
                {
                  method: "POST",
                  body: bodyContent,
                  headers: headersList,
                }
              )
                .then((res) => res.arrayBuffer())
                .then((ArrayBuffer) => {
                  if (!audioState.audioContext) throw Error;
                  return audioState.audioContext.decodeAudioData(ArrayBuffer);
                })
                .then(audioPlay);
            })();
          }
        );
      }

      // clean the canvas.
      context.clearRect(0, 0, w, h);
    } catch (e) {
      console.error(e);
    }
  };

  const [killPoll, respawnPoll] = usePollingEffect(
    async () => await loop(),
    [],
    {
      interval: 1000,
      onCleanUp: () => {},
    }
  );

  return { videoRef, slicedRef, canvasRef, canvasRef2, killPoll, respawnPoll };
};

export default useCanvas;
