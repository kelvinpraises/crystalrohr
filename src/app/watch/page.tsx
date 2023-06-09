"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import useCaption from "@/hooks/useCaption";
import { useStore } from "@/store/useStore";

export default function Page() {
  const router = useRouter();

  const youTubeId = useStore((state) => state.youTubeId);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [show, setShow] = useState(false);
  const [startCaption, setStartCaption] = useState(true);
  const [askForum, setAskForum] = useState(false);

  const { videoRef, slicedRef, canvasRef, canvasRef2, killPoll, respawnPoll } =
    useCaption();

  useEffect(() => {
    if (youTubeId) return;
    router.push("/");
  }, [youTubeId]);

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

  const handleCaption = () => {
    setStartCaption((x) => !x);

    if (!startCaption) {
      respawnPoll();
    } else {
      killPoll();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <canvas hidden ref={canvasRef} />
      <canvas hidden ref={canvasRef2} />
      <div className="  w-full h-[calc(100vh-5rem)] overflow-y-scroll flex flex-col items-center">
        <div className=" flex flex-col w-[740px] justify-between gap-5 mt-5">
          <div className="flex gap-4 z-[1] items-center w-full">
            <Link href={"/"}>
              <img src="/arrowBack.svg" alt="go back" />
            </Link>
            <p className=" font-imprima text-4xl text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-[600px]">
              {title}
            </p>
          </div>
          <div className=" flex justify-center w-full relative">
            <div
              className={`absolute`}
              ref={slicedRef}
              style={{ display: "flex", flexWrap: "wrap" }}
            ></div>
            <div
              className={` absolute top-0 w-[830px] h-[450px] overflow-hidden cursor-pointer blur-3xl backdrop-blur-2xl`}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              }}
            />

            <div className=" flex justify-center items-center relative w-full h-[405px] overflow-hidden cursor-pointer rounded-lg">
              <video
                crossOrigin="anonymous"
                ref={videoRef}
                height={405}
                style={{ height: 405 }}
                controls
                preload="metadata"
                poster={"https://web-production-44900.up.railway.app/" + poster}
              >
                <source
                  src={"https://web-production-44900.up.railway.app/" + link}
                />
              </video>
            </div>
          </div>

          <div className=" w-full p-4 gap-4 flex h-[66px] bg-[#2B2B30] items-center backdrop-blur-2xl rounded-lg">
            <div className=" flex gap-4 items-center pr-4 border-r border-black py-1">
              <p>Auto Caption</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={startCaption}
                  onChange={handleCaption}
                  id="autoCaption"
                  name="Auto caption"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-700"></div>
              </label>
            </div>

            {/* <div className=" flex gap-4 items-center pr-4 border-r border-black py-1">
              <p>Query scene</p>
              <div className=" w-[34px] h-[34px] bg-black grid place-items-center rounded-full">
                <img src="/Voice.svg" alt="speak" />
              </div>
            </div> */}

            <div className=" flex gap-4 items-center pr-4 border-r border-black py-1">
              <p>Take a note</p>
              <div className=" w-[34px] h-[34px] bg-black grid place-items-center rounded-full">
                <img src="/Paper.svg" alt="note" />
              </div>
            </div>
            <div className=" flex gap-4 items-center pr-4 border-r border-black py-1">
              <p>Ask on forum</p>
              <div
                className=" w-[34px] h-[34px] bg-black grid place-items-center rounded-full cursor-pointer"
                onClick={() => setAskForum(!askForum)}
              >
                <img src="/Globe.svg" alt="note" />
              </div>
            </div>
          </div>
          {askForum && (
            <div className=" w-full p-4 bg-[#2B2B30] rounded-lg flex flex-col gap-4 mb-20">
              <input
                type="text"
                className=" bg-[#565660] p-2 rounded-lg focus:outline-none"
                placeholder="Please input a topic of what you'll like to know"
              />
              <textarea
                className=" bg-[#565660] p-2 rounded-lg focus:outline-none h-[140px] resize-none"
                placeholder="Please provide more information on what you'll like to know"
              />
              <div className=" flex justify-end">
                <button className=" py-3 px-5 bg-black rounded-lg">Upload</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
