"use client";
import Forum from "@/component/Forum";
import { forumData } from "@/data/data";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const pathname = usePathname();
  const path = pathname.split("/");
  const id = path[2];

  const youTubeId = useStore((state) => state.youTubeId);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");

  const [forum, setForum] = useState<{
    topic: string;
    message: string;
    answers: {
      message: string;
      creator: string;
      time: string;
      AvatarSource: string;
    }[];
    awardedAnswer: {
      message: string;
      creator: string;
      time: string;
      AvatarSource: string;
    };
    date: string;
  }>();

  useEffect(() => {
    let forum = forumData.find((forum) => forum.id === parseInt(id));

    if (forum) {
      setForum(forum);
    }
  }, [id]);

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
      }
    })();
  }, []);

  return (
    <>
      <div className="  w-full p-4 pb-8 flex justify-center ">
        <div className=" flex gap-4 mt-5 items-start">
          <Link href={"/forum"} className=" pt-2">
            <img src="/arrowBack.svg" alt="go back" />
          </Link>

          <div className=" flex flex-col gap-5 max-w-[650px] w-full">
            <div className="flex gap-4 z-[1] items-center w-full">
              <p className=" font-imprima text-4xl text-white ">
                {forum && forum.topic}
              </p>
            </div>
            <div className=" flex justify-center w-full relative">
              <div className=" flex justify-center items-center relative w-full h-[405px] overflow-hidden cursor-pointer rounded-lg bg-red-100">
                <video
                  crossOrigin="anonymous"
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
            <div className=" z-10 bg-[#2B2B30] p-4 rounded-lg">
              {forum?.message}
            </div>
            <Forum
              awardedAnswer={forum?.awardedAnswer!}
              answers={forum?.answers!}
            />
          </div>
        </div>
      </div>
    </>
  );
}
