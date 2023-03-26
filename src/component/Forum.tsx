import React from 'react'
import Image from "next/image";


interface IMessageProps {
  avatar: string;
  name: string;
  message: string;
  time: string;
}

const Forum = () => {
  const chatData = [
    {
      avatar:
        "https://images.unsplash.com/flagged/photo-1567400358593-9e6382752ea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YWJzdHJhY3R8fHx8fHwxNjc3ODY3MjE4&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
      name: "Celpas",
      message:
        "Lorem ipsum dolor sit Sint quisquam eos quibusdam rerum quia provident, quidem in fuga eius eveniet...",
      time: "05:00",
    },
  ];
  return (
    <div className=' w-full mt-6 flex flex-col gap-10'>
      <p className=' text-xl font-semibold'>Awarded</p>
      {
        chatData.map((data, i) => (
          <Messages key={i} {...data} />
        ))
      }
      <p className=' text-xl font-semibold mt-3'>Answers</p>
      {
        chatData.map((data, i) => (
          <Messages key={i} {...data} />
        ))
      }
    </div>
  )
}

export default Forum

const Messages = (chat: IMessageProps) => (
  <div className=" flex w-full gap-4">
    <div className=" w-full max-w-[70px] h-[70px] overflow-hidden rounded-full relative">
      <Image
        src={chat.avatar}
        style={{
          objectFit: "cover",
          zIndex: 0,
        }}
        fill
        priority
        alt={`avatar of ${chat.name}`}
      />
    </div>
    <div className=" w-full flex flex-col p-4 bg-[#2B2B30] rounded-lg shadow-[0_0_50px_7px_rgba(0,0,0,0.05)]">
      <p className=" text-xl font-outfit font-medium">{chat.name}</p>
      <p>{chat.message}</p>
      <p className=" text-sm italic text-end">{chat.time}</p>
    </div>
  </div>
)