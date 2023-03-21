import { useCallback, useRef, useState } from "react";
import { Colour } from "../utils/colors";

const useCanvas = () => {
  const [colors, setColors] = useState<{ r: number; g: number; b: number }[]>(
    []
  );
  const [intervalId, setIntervalId] = useState<any>();
  // const [sessionHash, setSessionHash] = useState("");

  // useEffect(() => {
  //   setSessionHash(""); // uuid here
  // }, [setSessionHash]);

  const autoCaption = useCallback(
    async (
      video: HTMLVideoElement,
      audio: HTMLAudioElement,
      sliced: HTMLDivElement,
      canvas: HTMLCanvasElement,
      canvas2: HTMLCanvasElement
    ) => {
      try {
        const context = canvas.getContext("2d") as CanvasRenderingContext2D;
        const context2 = canvas2.getContext("2d") as CanvasRenderingContext2D;

        const w = video.videoWidth;
        const h = video.videoHeight;
        canvas.width = w;
        canvas.height = h;

        // Draw video image on canvas.
        context.fillRect(0, 0, w, h);
        context.drawImage(video, 0, 0, w, h);

        // Clone image.
        canvas2.width = canvas.width;
        canvas2.height = canvas.height;
        context2.drawImage(canvas, 0, 0);

        // const clone = canvas.cloneNode(true) as HTMLCanvasElement;
        // clone.getContext("2d")?.drawImage(canvas, 0, 0);

        const col = 8;
        const row = 4;
        const colWidth = canvas.width / col;
        const rowHeight = canvas.height / row;
        const accumulatedColors: { r: number; g: number; b: number }[] = [];

        console.log(
          "THIS THIS THIS THIS THIS THIS THIS!!!!!!!!!!!!!!!!!!!!!!!"
        );
        console.log(rowHeight);
        console.log(colWidth);

        while (sliced.firstChild) {
          sliced.removeChild(sliced?.lastChild as ChildNode);
        }

        // Divide image into blocks.
        for (var i = 0; i < row; i++) {
          for (var j = 0; j < col; j++) {
            canvas.width = colWidth;
            canvas.height = rowHeight;

            context.clearRect(0, 0, colWidth, rowHeight);
            context.drawImage(canvas2, 0, 0);

            // Get colors.
            const a = w * h;

            const data = context.getImageData(0, 0, w, h).data;
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

        if (colors.length === 0) {
          similar = false;
          setColors([...accumulatedColors]);
        } else {
          const difference = colors.map((color1, i) => {
            const color2 = accumulatedColors[i];

            console.log("this is color1");
            console.log(color1);
            console.log("this is color2");
            console.log(color2);

            // convert RGB to LAB
            const [L1, A1, B1] = Colour.rgba2lab(color1.r, color1.g, color1.b);
            const [L2, A2, B2] = Colour.rgba2lab(color2.r, color2.g, color2.b);
            const deltaE = Colour.deltaE00(L1, A1, B1, L2, A2, B2);

            return deltaE;
          });

          const average =
            difference.reduce((a, b) => a + b, 0) / difference.length;

          console.log(difference);
          console.log(average);

          if (average > 12) {
            similar = false;
          } else {
            similar = true;
          }

          setColors([...accumulatedColors]);
        }

        console.log("Scene just changed? ", !similar);

        if (!similar) {
          let headersList = {
            Accept: "audio/mpeg",
            "Content-Type": "application/json",
          };

          // let bodyContent = JSON.stringify({
          //   base64Image: clone.toDataURL("image/png"),
          //   sessionHash,
          // });

          // let response = await fetch("https://crystalrohr-api-production.up.railway.app/api/auto-caption", {
          //   method: "POST",
          //   body: bodyContent,
          //   headers: headersList,
          // });

          // let data = await response.blob();
          // console.log(data);

          // const blobUrl = URL.createObjectURL(data);

          // audio.src = blobUrl;
          // audio.play()
          // audio.onload = () => {
          //   URL.revokeObjectURL(blobUrl);
          // };

          console.log("something happens");
        }

        // // append new cell to sliced.
        // sliced.appendChild(clone);

        // console.log(JSON.stringify(colors, null, 2));

        // clean the canvas.
        context.clearRect(0, 0, w, h);
      } catch (e) {
        console.log(e);
      }
    },
    [colors, intervalId, setColors]
  );

  return { autoCaption };
};

export default useCanvas;
