import React from "react";

const VideoComment = () => {
  const comment = [
    { name: "crystal", message: "yo! who is there", initial: "C" },
    { name: "crystal", message: "yo! who is there", initial: "C" },
    { name: "crystal", message: "yo! who is there", initial: "C" },
    { name: "crystal", message: "yo! who is there", initial: "C" },
    { name: "crystal", message: "yo! who is there", initial: "C" },
    { name: "crystal", message: "yo! who is there", initial: "C" },
    { name: "crystal", message: "yo! who is there", initial: "C" },
    { name: "crystal", message: "yo! who is there", initial: "C" },
    { name: "crystal", message: "yo! who is there", initial: "C" },
    { name: "crystal", message: "yo! who is there", initial: "C" },
    { name: "crystal", message: "yo! who is there", initial: "C" },
    { name: "crystal", message: "yo! who is there", initial: "C" },
    { name: "crystal", message: "yo! who is there", initial: "C" },
    { name: "crystal", message: "yo! who is there", initial: "C" },
    { name: "crystal", message: "yo! who is there", initial: "C" },
  ];
  return (
    <div className=" z-10 h-[491px] w-[320px] bg-[#2B2B30] rounded-lg py-3 px-4">
      <div className=" flex justify-end pb-2 border-b border-[#4b4b53] overflow-y-scroll">
        <p className=" font-extralight text-lg">x</p>
      </div>
      <div className=" h-[375px] overflow-y-scroll pt-2 flex flex-col gap-3">
        {comment.map((data, i) => (
          <div key={i} className=" flex gap-3">
            <div className=" max-w-[25px] w-full h-[25px] bg-yellow-300 rounded-full grid place-items-center text-black">
              {data.initial}
            </div>
            <div>
              <p className=" font-semibold mb-2 text-sm">{data.name}</p>
              <p className=" font-light">{data.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className=" flex gap-2 mb-3 items-center mt-2">
        <div className=" min-w-[25px] h-[25px] bg-yellow-300 rounded-full grid place-items-center text-black">
          A
        </div>
        <div className=" flex bg-[#39393e] w-full rounded-lg items-center pr-2">
          <textarea
            className=" bg-transparent focus:outline-none w-full p-3 placeholder:text-sm placeholder:font-extralight resize-none"
            placeholder="Reply"
            rows={1}
          />
          <div className=" min-w-[30px] h-[30px] rounded-full grid place-items-center cursor-pointer bg-[#7f7f85]">
            <img src="/sendArrow.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComment;
