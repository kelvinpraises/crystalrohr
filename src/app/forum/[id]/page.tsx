"use client";
import Forum from "@/component/Forum";
import VideoComment from "@/component/VideoComment";
import useCanvas from "@/hooks/useCanvas";
import { useStore } from "@/store/useStore";
import poll from "@/utils/poll";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const slicedRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);

  const youTubeId = useStore((state) => state.youTubeId);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [show, setShow] = useState(false);
  const [startCaption, setStartCaption] = useState(true);

  const { autoCaption } = useCanvas();

  useEffect(() => {
    (async () => {
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        videoId: youTubeId,
      });

      let response = await fetch(
        "https://crystalrohr-api-production.up.railway.app/api/get-video",
        {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        }
      );

      let data = await response.json();

      if (data.status && data.msg.playabilityStatus.status === "OK") {
        interface Thumbnails {
          url: string;
          width: number;
          height: number;
        }

        setLink(data.msg.streamingData.formats[0].url);
        setTitle(data.msg.videoDetails.title);

        (data.msg.videoDetails.thumbnail.thumbnails as any[]).map((t) => {});
        const thumbnails = data.msg.videoDetails.thumbnail
          .thumbnails as Thumbnails[];

        const minMax = thumbnails.reduce((acc, val) => {
          acc[0] =
            acc[0] === undefined || val.width < acc[0].width ? val : acc[0];
          acc[1] =
            acc[1] === undefined || val.width > acc[1].width ? val : acc[1];
          return acc;
        }, [] as Thumbnails[]);

        const maxPosterUrl = minMax[1].url;
        setPoster(maxPosterUrl);

        setShow(true);
      }
    })();
  }, []);

  useEffect(() => {
    show &&
      buttonRef.current &&
      poll({
        callFn: async () => buttonRef.current!.click(),
        period: 1000,
        condition: () => !startCaption,
      });
  }, [buttonRef.current, show, startCaption]);

  // if (!show) {
  //   return null;
  // }

  return (
    <>
      <canvas hidden ref={canvasRef} />
      <canvas hidden ref={canvasRef2} />
      <button
        hidden
        ref={buttonRef}
        onClick={async () =>
          await autoCaption(
            videoRef.current!,
            slicedRef.current!,
            canvasRef.current!,
            canvasRef2.current!
          )
        }
      >
        Capture Image
      </button>
      <div className="  w-full pb-8 flex justify-center">
        <div className=" flex gap-4 mt-5 items-start">
          <Link href={"/"} className=" pt-2">
            <img src="/arrowBack.svg" alt="go back" />
          </Link>

          <div className=" flex flex-col gap-5 w-[650px]">
            <div className="flex gap-4 z-[1] items-center w-full">
              <p className=" font-imprima text-4xl text-white ">
                Can anyone tell me what's going on in this video
              </p>
            </div>
            <div className=" flex justify-center w-full relative">
              <div className={`absolute flex flex-wrap`} ref={slicedRef}></div>
              <div
                className={` absolute top-0 w-[830px] h-[450px] overflow-hidden cursor-pointer blur-3xl backdrop-blur-2xl`}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
              />

              <div className=" flex justify-center items-center relative w-full h-[405px] overflow-hidden cursor-pointer rounded-lg bg-red-100">
                <video
                  crossOrigin="anonymous"
                  ref={videoRef}
                  height={405}
                  style={{ height: 405 }}
                  controls
                  preload="metadata"
                  poster={
                    "https://web-production-44900.up.railway.app/" + poster
                  }
                >
                  <source
                    src={"https://web-production-44900.up.railway.app/" + link}
                  />
                </video>
              </div>
            </div>
            <div className=" z-10 bg-[#2B2B30] p-4 rounded-lg">This is where the description is, it is optional so the user can skip if they want to</div>


            <Forum />
          </div>
        </div>
      </div>
    </>
  );
}
