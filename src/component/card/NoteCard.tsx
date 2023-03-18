"use client";
import Image from "next/image";

interface ICardProps {
  background: string;
  title: string;
  note: string;
  date: string;
}

const NoteCard = (card: ICardProps) => {
  const bg = "bg-pink-400";
  return (
    <div
      className={`w-full flex flex-col items-center rounded-2xl ${card.background} mb-4 h-full break-inside-avoid`}
    >
      <div className=" p-6 w-full">
        <p className=" font-bold text-white mb-2">{card.title}</p>
        <p className=" font-extralight text-[15px] text-white">{card.note}</p>
      </div>
      <div className=" flex justify-end px-3 pb-3 w-full">
        <p className=" text-sm font-extralight">{card.date}</p>
      </div>
    </div>
  );
};

export default NoteCard;
