import { forumData } from "@/data/data";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className=" max-w-[1080px] w-full flex flex-col gap-4 px-4">
        <div className=" flex flex-col gap-5 mt-[10px]">
          {forumData.map((data, i) => (
            <ForumCard key={i} {...data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;

const ForumCard = (data: {
  id: number;
  topic: string;
  answers: {
    message: string;
    creator: string;
    time: string;
    AvatarSource: string;
  }[];
  date: string;
}) => (
  <Link href={`/forum/${data.id}`}>
    <div className=" w-full bg-[#2B2B30] p-4 rounded-lg text-gray-300 gap-3">
      <p className="text-xl font-medium ">{data.topic}</p>
      <p className=" whitespace-nowrap overflow-hidden text-ellipsis max-w-full font-light">
        {data.answers[0].creator}: {data.answers[0].message}
      </p>
      <div className=" flex gap-6 items-center mt-2">
        <div className=" flex gap-2">
          <img src="/Comment.svg" alt="comment" className=" w-4" />
          <p className=" text-sm font-light">{data.answers.length}</p>
        </div>
        <p className=" text-sm font-light text-gray-400">{data.date}</p>
      </div>
    </div>
  </Link>
);
