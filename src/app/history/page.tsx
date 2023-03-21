"use client";
import Image from "next/image";

import Card from "@/component/card/VideoCard";
import { homeData } from "@/data/data";
import { SetStateAction, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [src, setSrc] = useState("");

  return (
    <div className="  w-full h-[calc(100vh-5rem)] overflow-y-scroll flex flex-col items-center">
      <div className="md:w-[740px] px-4 h-full">
        <div className=" flex gap-4 items-center my-5">
          <Link href={"/"}>
            <img src="/arrowBack.svg" alt="go back" />
          </Link>
          <p className=" font-imprima text-4xl">History</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {homeData.map((data, i) => (
            <Card setSrc={setSrc} {...data} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
