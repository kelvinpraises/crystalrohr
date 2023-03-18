import NewCard from "@/component/card/NewCard";
import NoteCard from "@/component/card/NoteCard";
import { noteData } from "@/data/data";
import React from "react";

const page = () => {
  return (
    <div className="  w-full h-[calc(100vh-5rem)] overflow-y-scroll flex flex-col items-center">
      <div className="md:w-[750px] h-full">
        <p className=" font-imprima text-4xl mt-5">Notes</p>
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
