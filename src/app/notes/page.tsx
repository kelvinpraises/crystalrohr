import NewCard from "@/component/card/NewCard";
import NoteCard from "@/component/card/NoteCard";
import { noteData } from "@/data/data";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="  w-full h-[calc(100vh-5rem)] overflow-y-scroll flex flex-col items-center">
      <div className="md:w-[750px] h-full">
        <div className=" flex gap-4 items-center mt-5">
          <Link href={"/"}>
            <img
              src="/arrowBack.svg"
              alt="go back"
            />
          </Link>
          <p className=" font-imprima text-4xl">Notes</p>
        </div>
        <div className=" columns-2 justify-center gap-4 w-full mt-5">
          <NewCard />
          {noteData.map((data, i) => (
            <NoteCard {...data} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
