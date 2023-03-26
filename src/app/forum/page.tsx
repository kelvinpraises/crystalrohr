import React from "react";

const page = () => {
  const forumData = [
    {
      topic: "How to learn Git and Github",
      message:
        "dave: what's up guys, it's extremely important we all know how to use github, dave: what's up guys, it's extremely important we all know how to use github,dave: what's up guys, it's extremely important we all know how to use github,dave: what's up guys, it's extremely important we all know how to use github,",
      commentCount: 3,
      date: "March 18, 2023",
    },
    {
      topic: "How to learn Git and Github",
      message:
        "dave: what's up guys, it's extremely important we all know how to use github, dave: what's up guys, it's extremely important we all know how to use github,dave: what's up guys, it's extremely important we all know how to use github,dave: what's up guys, it's extremely important we all know how to use github,",
      commentCount: 3,
      date: "March 18, 2023",
    },
    {
      topic: "How to learn Git and Github",
      message:
        "dave: what's up guys, it's extremely important we all know how to use github, dave: what's up guys, it's extremely important we all know how to use github,dave: what's up guys, it's extremely important we all know how to use github,dave: what's up guys, it's extremely important we all know how to use github,",
      commentCount: 3,
      date: "March 18, 2023",
    },
    {
      topic: "How to learn Git and Github",
      message:
        "dave: what's up guys, it's extremely important we all know how to use github, dave: what's up guys, it's extremely important we all know how to use github,dave: what's up guys, it's extremely important we all know how to use github,dave: what's up guys, it's extremely important we all know how to use github,",
      commentCount: 3,
      date: "March 18, 2023",
    },
    {
      topic: "How to learn Git and Github",
      message:
        "dave: what's up guys, it's extremely important we all know how to use github, dave: what's up guys, it's extremely important we all know how to use github,dave: what's up guys, it's extremely important we all know how to use github,dave: what's up guys, it's extremely important we all know how to use github,",
      commentCount: 3,
      date: "March 18, 2023",
    },
    {
      topic: "How to learn Git and Github",
      message:
        "dave: what's up guys, it's extremely important we all know how to use github, dave: what's up guys, it's extremely important we all know how to use github,dave: what's up guys, it's extremely important we all know how to use github,dave: what's up guys, it's extremely important we all know how to use github,",
      commentCount: 3,
      date: "March 18, 2023",
    },
    {
      topic: "How to learn Git and Github",
      message:
        "dave: what's up guys, it's extremely important we all know how to use github, dave: what's up guys, it's extremely important we all know how to use github,dave: what's up guys, it's extremely important we all know how to use github,dave: what's up guys, it's extremely important we all know how to use github,",
      commentCount: 3,
      date: "March 18, 2023",
    },
    {
      topic: "How to learn Git and Github",
      message:
        "dave: what's up guys, it's extremely important we all know how to use github, dave: what's up guys, it's extremely important we all know how to use github,dave: what's up guys, it's extremely important we all know how to use github,dave: what's up guys, it's extremely important we all know how to use github,",
      commentCount: 3,
      date: "March 18, 2023",
    },
    {
      topic: "How to learn Git and Github",
      message:
        "dave: what's up guys, it's extremely important we all know how to use github, dave: what's up guys, it's extremely important we all know how to use github,dave: what's up guys, it's extremely important we all know how to use github,dave: what's up guys, it's extremely important we all know how to use github,",
      commentCount: 3,
      date: "March 18, 2023",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <div className=" w-[1080px] flex flex-col gap-4">
        <div className=" flex flex-col gap-5 mt-[60px]">
          {forumData.map((data, i) => (
            <ForumCard {...data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;

const ForumCard = (data: {
  topic: string;
  message: string;
  commentCount: number;
  date: string;
}) => (
  <div className=" w-full bg-[#2B2B30] p-4 rounded-lg text-gray-300 gap-3">
    <p className="text-xl font-medium ">{data.topic}</p>
    <p className=" whitespace-nowrap overflow-hidden text-ellipsis max-w-full font-light">
      {data.message}
    </p>
    <div className=" flex gap-6 items-center mt-2">
      <div className=" flex gap-2">
        <img src="Comment.svg" alt="comment" className=" w-4" />
        <p className=" text-sm font-light">{data.commentCount}</p>
      </div>
      <p className=" text-sm font-light text-gray-400">{data.date}</p>
    </div>
  </div>
);
