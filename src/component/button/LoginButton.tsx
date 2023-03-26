import React from "react";

const LoginButton = ({ children, onClick }: { children: React.ReactNode, onClick: any }) => {
  return (
    <button {...{ onClick }} className=" grid place-items-center py-3 px-8 bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 rounded-lg cursor-pointer text-white">
      {children}
    </button>
  );
};

export default LoginButton;
