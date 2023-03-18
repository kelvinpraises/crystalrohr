"use client";
import Image from "next/image";

interface ICardProps {
  src: string;
  title: string;
  creator: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setSrc: React.Dispatch<React.SetStateAction<string>>;
}

const Card = (card: ICardProps) => {
  return (
    <div className=" min-w-[270px] w-full  flex flex-col items-center rounded-2xl  bg-[#292621]">
      <div
        className=" relative w-full h-[170px] overflow-hidden rounded-t-2xl cursor-pointer"
        onClick={() => {
          card.setShow(true);
          card.setSrc(card.src);
        }}
      >
        <Image
          src={card.src}
          style={{
            objectFit: "cover",
            zIndex: 0,
          }}
          fill
          priority
          alt={card.title}
        />
      </div>
      <div className=" p-[10px] flex flex-col gap-[4px] w-full rounded-b-2xl h-[93px] overflow-hidden">
        <p className=" text-[#AAAAAA] text-sm">{card.creator}</p>
        <p className=" font-bold">{card.title}</p>
      </div>
    </div>
  );
};

export default Card;
