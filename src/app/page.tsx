"use client";
import { usePolybase } from "@/hooks/polybase";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function Home() {
  const youTubeLink = useStore((state) => state.youTubeLink);
  const setYouTubeLink = useStore((state) => state.setYouTubeLink);
  const setYouTubeId = useStore((state) => state.setYouTubeId);

  const { createUserRecord } = usePolybase()

  const router = useRouter();

  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const regex1 = /https?:\/\/www\.youtube\.com\/[a-zA-Z0-9]+/;
    const regex2 = /https?:\/\/youtu\.be\/[a-zA-Z0-9_-]{11}/;


    if (regex1.test(youTubeLink)) {
      const params = new URL(youTubeLink).searchParams;
      let v = params.get("v");
      if (v?.length) {
        setYouTubeId(v);
        router.push("/watch");
      } else {
        alert("Please input a valid YouTube link");
      }
    } else if (regex2.test(youTubeLink)) {
      const pathname = new URL(youTubeLink).pathname.split("/")[1];
      if (pathname?.length) {
        setYouTubeId(pathname);
        router.push("/watch");
      } else {
        alert("Please input a valid YouTube link");
      }
    } else {
      alert("Please input a valid YouTube link");
    }
  };

  return (
    <div className="  w-full h-[calc(100vh-5rem)] overflow-y-scroll flex flex-col items-center">
      <div className=" w-[650px] flex flex-col gap-12 mt-5 items-center">
        <button onClick={async () => await createUserRecord()}>create account</button>
        <p className=" font-imprima text-4xl text-white">
          Auto Caption YouTube Videos
        </p>

        <form className=" flex w-full bg-[#404249c3] p-[6px] rounded-lg">
          <input
            type="text"
            className=" w-full h-[60px] bg-[#131314] font-light focus:outline-none px-3 rounded-[3px] placeholder:font-light placeholder:text-gray-300"
            value={youTubeLink}
            onChange={(e) => {
              setYouTubeLink(e.target.value);
            }}
            placeholder="Paste a YouTube link here..."
          />

          <button
            onClick={handleClick}
            className=" w-[120px] grid place-items-center cur"
          >
            <p className=" text-lg">Start</p>
          </button>
        </form>

        <p className=" font-semibold text-sm">
          Login to see your encrypted History and Notes
        </p>

        <div className=" flex gap-[50px] items-center mt-2.5">
          <Link href={"/history"}>
            <div className=" flex items-center gap-[10px]">
              <img src="/Activity.svg" alt="history" />
              <p className=" font-semibold">History</p>
            </div>
          </Link>

          <Link href={"/notes"}>
            <div className=" flex items-center gap-[10px]">
              <img src="/Paper.svg" alt="notes" />
              <p className=" font-semibold">Notes</p>
            </div>
          </Link>
        </div>

        <img
          src="/blur.svg"
          className=" absolute top-5 z-[-10] left-[545.73px]"
          alt=""
        />
      </div>
    </div>
  );
}
