import { useRef, useCallback, useState, useEffect } from 'react';
import { Colour } from '../utils/colors';

const useCanvas = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [colors, setColors] = useState<{ r: number; g: number; b: number }[]>(
    []
  );
  const [sessionHash, setSessionHash] = useState("");

  useEffect(() => {
    setSessionHash("") // uuid here
  }, [setSessionHash])


  const _setUpCanvas = (video: HTMLVideoElement) => {
    let canvas = ref.current as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const w = video.videoWidth;
    const h = video.videoHeight;

    canvas.width = w;
    canvas.height = h;

    console.log(w, h);

    // draw video image on canvas.
    context.fillRect(0, 0, w, h);
    context.drawImage(video, 0, 0, w, h);

    return { canvas, context, w, h };
  };

  const _getAverageColor = (
    context: CanvasRenderingContext2D,
    w: number,
    h: number
  ) => {
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

    return { r, g, b };
  };

  const _compareColorSimilariy = (
    accumulatedColors: { r: number; g: number; b: number }[]
  ) => {
    let similar: boolean;
    if (colors.length === 0) {
      similar = false;
      setColors([...accumulatedColors]);
    } else {
      const difference = colors.map((color1, i) => {
        const color2 = accumulatedColors[i];

        // convert RGB to LAB
        const [L1, A1, B1] = Colour.rgba2lab(color1.r, color1.g, color1.b);
        const [L2, A2, B2] = Colour.rgba2lab(color2.r, color2.g, color2.b);
        const deltaE = Colour.deltaE00(L1, A1, B1, L2, A2, B2);

        return deltaE;
      });

      const average = difference.reduce((a, b) => a + b, 0) / difference.length;

      console.log(difference);
      console.log(average);

      if (average > 12) {
        similar = false;
      } else {
        similar = true;
      }

      setColors([...accumulatedColors]);
    }

    return { similar };
  };

  const captureVideo = useCallback(
    async (video: HTMLVideoElement, sliced: HTMLDivElement) => {
      try {
        const { canvas, context, w, h } = _setUpCanvas(video);

        // clone full image on canvas.
        const clone = canvas.cloneNode(true) as HTMLCanvasElement;
        clone.getContext('2d')!.drawImage(canvas, 0, 0);

        const col = 8;
        const row = 4;
        const colWidth = canvas.width / col;
        const rowHeight = canvas.height / row;
        const accumulatedColors: { r: number; g: number; b: number }[] = [];

        while (sliced.firstChild) {
          sliced.removeChild(sliced?.lastChild as ChildNode);
        }

        // sub divide image.
        for (var i = 0; i < row; i++) {
          for (var j = 0; j < col; j++) {
            canvas.width = colWidth;
            canvas.height = rowHeight;

            context.clearRect(0, 0, colWidth, rowHeight);
            context.drawImage(
              clone,
              j * colWidth,
              i * rowHeight,
              colWidth,
              rowHeight,
              0,
              0,
              colWidth,
              rowHeight
            );

            const { r, g, b } = _getAverageColor(context, colWidth, rowHeight);

            accumulatedColors.push({ r, g, b });

            sliced.style.width = w + 'px';

            let cell = document.createElement('div');
            cell.style.width = colWidth + 'px';
            cell.style.height = rowHeight + 'px';
            cell.style.backgroundColor = `rgb(${r},${g},${b})`;
            sliced.appendChild(cell);
          }
        }

        const similarity = _compareColorSimilariy(accumulatedColors);


        console.log('Scene just changed? ', !similarity.similar);

        if (!similarity.similar) {
          let headersList = {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json"
          }

          let bodyContent = JSON.stringify({
            base64Image: clone.toDataURL('image/png'),
            sessionHash
          });

          let response = await fetch("http://localhost:3000/api/auto-caption", {
            method: "POST",
            body: bodyContent,
            headers: headersList
          });

          let data = await response.blob();
          console.log(data);
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
    [ref, _compareColorSimilariy, _getAverageColor, _setUpCanvas]
  );

  return { ref, captureVideo };
};

export default useCanvas;
