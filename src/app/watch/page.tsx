
"use client";
import Link from "next/link";
import { useState } from "react";

export default function Page() {

  return (
    <div className="  w-full h-[calc(100vh-5rem)] overflow-y-scroll flex flex-col items-center">
      <div className=" flex flex-col w-[740px] justify-between gap-5 mt-5">
        <div className="flex gap-4 z-[1] items-center w-full">
          <Link href={"/"}>
            <img
              src="/arrowBack.svg"
              alt="go back"
            />
          </Link>
          <p className=" font-imprima text-4xl text-white">
            Watching: Do they make us apart?
          </p>
        </div>

        <div className=" flex justify-center w-full relative">
          <div
            className={` absolute top-0 w-[830px] h-[450px] overflow-hidden cursor-pointer blur-3xl backdrop-blur-2xl`}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            }}
          />

          <div className=" relative w-full h-[405px] overflow-hidden cursor-pointer border border-black">
            <video src=""></video>
          </div>
        </div>

        <div className=" w-full p-4 gap-4 flex h-[66px] bg-[#2B2B30] items-center backdrop-blur-2xl">
          <div className=" flex gap-4 items-center pr-4 border-r border-black py-1">
            <p>Auto Caption</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
              // checked
              />
              <div className="w-11 h-6 bg-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-700"></div>
            </label>
          </div>

          <div className=" flex gap-4 items-center pr-4 border-r border-black py-1">
            <p>Query scene</p>
            <div className=" w-[34px] h-[34px] bg-black grid place-items-center rounded-full">
              <img src="/Voice.svg" alt="speak" />
            </div>
          </div>

          <div className=" flex gap-4 items-center pr-4 border-r border-black py-1">
            <p>Take a note</p>
            <div className=" w-[34px] h-[34px] bg-black grid place-items-center rounded-full">
              <img src="/Paper.svg" alt="note" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
