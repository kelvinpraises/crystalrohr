"use client";
import Image from "next/image";

import Card from "@/component/card/VideoCard";
import { homeData } from "@/data/data";
import { SetStateAction, useState } from "react";

export default function Home() {
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState("");

  return (
    <div className="  w-full h-[calc(100vh-5rem)] overflow-y-scroll flex flex-col items-center">
      {show ? (
        <div className=" flex w-full justify-between ">
          <div className=" flex justify-center w-full relative">
            <div
              className={` absolute top-0 w-[830px] h-[450px] overflow-hidden cursor-pointer blur-3xl backdrop-blur-2xl`}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backgroundImage: `url(${src})`,
              }}
            ></div>
            <div className=" relative w-[720px] h-[405px] overflow-hidden cursor-pointer mt-4 border border-black">
              <Image
                src={src}
                style={{
                  objectFit: "cover",
                  zIndex: 0,
                }}
                fill
                priority
                alt={""}
              />
            </div>
          </div>
          <div className=" w-[150px] h-[calc(100vh-5rem)] "></div>
        </div>
      ) : (
        <>
          <div className="md:w-[560px] h-full">
            <p className=" font-imprima text-4xl my-5">History</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {homeData.map((data, i) => (
                <Card setSrc={setSrc} setShow={setShow} {...data} key={i} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
