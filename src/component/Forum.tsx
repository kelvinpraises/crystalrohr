"use client";
import React, { useState } from "react";
import Image from "next/image";

interface IForumProps {
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
}

interface IMessageProps {
  AvatarSource: string;
  creator: string;
  message: string;
  time: string;
}

const Forum = (forum: IForumProps) => {
  const [answers, setAnswers] = useState(forum.answers);
  return (
    <div className=" w-full mt-6 flex flex-col gap-10">
      <p className=" text-xl font-semibold">Awarded</p>
      <Messages {...forum.awardedAnswer} />
      <p className=" text-xl font-semibold mt-3">Answers</p>

      {forum.answers &&
        forum.answers.map((data, i) => <Messages key={i} {...data} />)}

      <div className=" fixed bg-[#2B2B30] p-4 max-w-[650px] w-full mr-4 rounded-lg flex flex-col gap-4 bottom-4 z-20 drop-shadow-[0_35px_7px_rgba(0,0,0,0.5)]">
        <input type="text" className=" bg-[#565660] focus:outline-none p-2 rounded-lg" />
        <div className=" flex justify-end">
          <button className=" bg-black py-3 px-5 rounded-lg">Comment</button>
        </div>
      </div>
    </div>
  );
};

export default Forum;

const Messages = (chat: IMessageProps) => (
  <div className=" flex w-full gap-4">
    {chat.AvatarSource?.length ? (
      <div className=" w-full max-w-[40px] md:max-w-[60px] md:h-[60px] h-[40px] overflow-hidden rounded-full relative">
        <Image
          src={chat.AvatarSource}
          style={{
            objectFit: "cover",
            zIndex: 0,
          }}
          fill
          priority
          alt={`avatar of ${chat.creator}`}
        />
      </div>
    ) : (
      <div className=" w-full max-w-[40px] md:max-w-[60px] md:h-[60px] h-[40px] overflow-hidden rounded-full bg-yellow-400 grid place-items-center">
        <p className=" uppercase text-black text-lg">
          {chat.creator?.split("")[0]}
        </p>
      </div>
    )}
    <div className=" w-full flex flex-col p-4 bg-[#2B2B30] rounded-lg shadow-[0_0_50px_7px_rgba(0,0,0,0.05)]">
      <p className=" text-xl font-outfit font-medium">{chat.creator}</p>
      <p>{chat.message}</p>
      <p className=" text-sm italic text-end">{chat.time}</p>
    </div>
  </div>
);
